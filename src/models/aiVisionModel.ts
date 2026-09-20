import { ArchitectureRecommendation, DetectedBox, LayoutRelationship, Project } from '../types';
import { sampleProjects } from '../data/sampleSketches';
import { defaultDesignSystem, lightDesignSystem } from '../core/defaultDesignSystem';
import { inferLayoutFromDetections } from '../core/layoutInference';

export interface VisionAnalysisResult {
  detectedBoxes: DetectedBox[];
  layoutRelationships: LayoutRelationship[];
  architectureRecommendation: ArchitectureRecommendation;
  project: Project;
  processingTimeMs: number;
  provider?: 'openai' | 'local';
  warning?: string;
}

interface RemoteVisionAnalysis {
  pageType: string;
  imageWidth: number;
  imageHeight: number;
  components: DetectedBox[];
  relationships: Array<{ parentId: string; childId: string; relationship: string }>;
  designTokens?: { primaryColor?: string; backgroundColor?: string; textColor?: string; borderRadius?: string; spacingScale?: string };
}

async function requestRemoteVision(imageDataUrl: string, imageType: 'sketch' | 'screenshot'): Promise<RemoteVisionAnalysis> {
  const response = await fetch('/api/analyze-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageDataUrl, imageType }) });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || `AI Vision request failed (${response.status})`);
  return response.json() as Promise<RemoteVisionAnalysis>;
}

function buildCustomResult(imageDataUrl: string, imageType: 'sketch' | 'screenshot', boxes: DetectedBox[], provider: 'openai' | 'local', warning?: string, tokens?: RemoteVisionAnalysis['designTokens']): VisionAnalysisResult {
  const base = tokens?.backgroundColor && isLightColor(tokens.backgroundColor) ? lightDesignSystem : defaultDesignSystem;
  const ds = tokens ? { ...base, colors: { ...base.colors, primary: tokens.primaryColor || base.colors.primary, background: tokens.backgroundColor || base.colors.background, surface: tokens.backgroundColor || base.colors.surface, text: tokens.textColor || base.colors.text }, spacing: { ...base.spacing, radius: tokens.borderRadius || base.spacing.radius } } : base;
  const inferred = inferLayoutFromDetections(boxes, ds, 'Custom Uploaded Project');
  if (boxes.length === 0 && imageDataUrl) {
    inferred.rootComponent.children = [{
      id: 'uploaded-image-reference',
      type: 'image',
      name: 'Uploaded UI Reference',
      props: { src: imageDataUrl, alt: 'Uploaded UI reference image' },
      styles: { width: '100%', maxWidth: '100%', objectFit: 'contain' },
    }];
  }
  const now = new Date().toISOString();
  const project: Project = {
    id: `proj-custom-${Date.now()}`, name: 'Custom Web Design', createdAt: now, updatedAt: now,
    pages: [{ id: 'page-custom-home', name: 'Home', path: '/', icon: '🎨', rootComponent: inferred.rootComponent, seoTitle: 'Custom Web Design — Generated with Sketch2Web', seoDescription: 'Generated responsive website created from analyzed custom sketch.' }],
    activePageId: 'page-custom-home', designSystem: ds, originalImage: imageDataUrl, originalType: imageType,
    architectureRecommendation: inferred.architectureRecommendation, detectedBoxes: boxes, layoutRelationships: inferred.layoutRelationships,
    analysisProvider: provider, analysisWarning: warning,
  };
  return { detectedBoxes: boxes, layoutRelationships: inferred.layoutRelationships, architectureRecommendation: inferred.architectureRecommendation, project, processingTimeMs: 0, provider, warning };
}

// Browser-local visual analysis. It intentionally returns only regions found in the bitmap.
async function scanCanvasImage(imageDataUrl: string): Promise<{
  detectedBoxes: DetectedBox[];
  isDarkTheme: boolean;
  primaryColor?: string;
}> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 800;
      const height = 1000;
      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        resolve({ detectedBoxes: [], isDarkTheme: true });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const pixels = ctx.getImageData(0, 0, width, height).data;

      let totalBrightness = 0;
      let red = 0;
      let green = 0;
      let blue = 0;
      let sampleCount = 0;
      const rowActivity = new Array<number>(height).fill(0);
      const columnActivity = new Array<number>(width).fill(0);
      const luminance = (x: number, y: number) => {
        const offset = (y * width + x) * 4;
        return (pixels[offset] * 299 + pixels[offset + 1] * 587 + pixels[offset + 2] * 114) / 1000;
      };

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const offset = (y * width + x) * 4;
          const brightness = luminance(x, y);
          totalBrightness += brightness;
          red += pixels[offset];
          green += pixels[offset + 1];
          blue += pixels[offset + 2];
          sampleCount += 1;

          if (x === 0 || y === 0) continue;
          const edge = Math.max(
            Math.abs(brightness - luminance(x - 1, y)),
            Math.abs(brightness - luminance(x, y - 1)),
          );
          if (edge > 24) {
            rowActivity[y] += 1;
            columnActivity[x] += 1;
          }
        }
      }

      const averageBrightness = totalBrightness / Math.max(sampleCount, 1);
      const averageColor = `rgb(${Math.round(red / Math.max(sampleCount, 1))}, ${Math.round(green / Math.max(sampleCount, 1))}, ${Math.round(blue / Math.max(sampleCount, 1))})`;

      const smooth = (values: number[], radius: number) => values.map((_, index) => {
        let total = 0;
        let count = 0;
        for (let cursor = Math.max(0, index - radius); cursor <= Math.min(values.length - 1, index + radius); cursor += 1) {
          total += values[cursor];
          count += 1;
        }
        return total / count;
      });

      const rowScores = smooth(rowActivity, 5);
      const activeRows = rowScores
        .map((score, index) => ({ score, index }))
        .filter(({ score }) => score >= 3);
      const rowBands: Array<{ start: number; end: number }> = [];
      for (const row of activeRows) {
        const previous = rowBands[rowBands.length - 1];
        if (!previous || row.index > previous.end + 18) {
          rowBands.push({ start: row.index, end: row.index });
        } else {
          previous.end = row.index;
        }
      }

      const columnScores = smooth(columnActivity, 3);
      const boxes: DetectedBox[] = [];
      let boxIndex = 0;
      for (const band of rowBands.filter(({ start, end }) => end - start >= 8)) {
        const columns: Array<{ start: number; end: number }> = [];
        for (let x = 0; x < width; x += 1) {
          if (columnScores[x] < 2) continue;
          const previous = columns[columns.length - 1];
          if (!previous || x > previous.end + 14) {
            columns.push({ start: x, end: x });
          } else {
            previous.end = x;
          }
        }

        const regions = columns.filter(({ start, end }) => end - start >= 18);
        for (const region of regions) {
          const x = region.start;
          const y = band.start;
          const regionWidth = region.end - region.start;
          const regionHeight = band.end - band.start;
          const isTop = y < 150;
          const isBottom = y > 760;
          const isCompact = regionWidth < 280 && regionHeight < 100;
          const isColumn = regionWidth < 360 && regionHeight > 90;
          let type: DetectedBox['type'] = 'section';
          let label = 'Detected Visual Region';

          if (isTop && regionHeight < 150) {
            type = 'navbar';
            label = 'Detected Navigation Region';
          } else if (isBottom && regionHeight < 180) {
            type = 'footer';
            label = 'Detected Footer Region';
          } else if (isColumn) {
            type = 'card';
            label = 'Detected Card Region';
          } else if (isCompact) {
            type = 'button';
            label = 'Detected Action Region';
          } else if (regionWidth > 500 && regionHeight < 120) {
            type = 'heading';
            label = 'Detected Text Region';
          } else if (y < 420 && regionHeight > 120) {
            type = 'hero';
            label = 'Detected Hero Region';
          }

          boxes.push({
            id: `detected-${boxIndex++}`,
            label,
            type,
            confidence: Math.min(0.94, 0.55 + Math.min(0.35, (regionWidth * regionHeight) / 800000)),
            x,
            y,
            width: regionWidth,
            height: regionHeight,
            bgColor: averageColor,
          });
        }
      }

      const textDetector = (window as Window & { TextDetector?: new () => { detect: (source: HTMLCanvasElement) => Promise<Array<{ rawValue?: string; boundingBox: DOMRect }>> } }).TextDetector;
      if (textDetector) {
        try {
          const textRegions = await new textDetector().detect(canvas);
          textRegions.forEach((region, index) => {
            const text = region.rawValue?.trim();
            if (!text) return;
            boxes.push({
              id: `detected-text-${index}`,
              label: 'Detected Text',
              type: text.length > 32 ? 'heading' : 'text',
              confidence: 0.78,
              x: Math.round(region.boundingBox.x),
              y: Math.round(region.boundingBox.y),
              width: Math.round(region.boundingBox.width),
              height: Math.round(region.boundingBox.height),
              text,
            });
          });
        } catch {
          // Browser OCR support is optional.
        }
      }

      resolve({
        detectedBoxes: boxes,
        isDarkTheme: averageBrightness < 128,
        primaryColor: averageColor,
      });
    };

    img.onerror = () => {
      resolve({ detectedBoxes: [], isDarkTheme: true });
    };

    img.src = imageDataUrl;
  });
}

export async function analyzeUploadedImage(
  imageDataUrl: string,
  imageType: 'sketch' | 'screenshot',
  sampleKey?: 'saas' | 'ecommerce' | 'agency'
): Promise<VisionAnalysisResult> {
  // Simulate realistic neural processing latency
  await new Promise((resolve) => setTimeout(resolve, 1100));

  // If a pre-loaded sample is selected, load its calibrated dataset
  if (sampleKey && sampleProjects[sampleKey]) {
    const data = sampleProjects[sampleKey];
    return {
      detectedBoxes: data.detectedBoxes,
      layoutRelationships: [
        { type: 'navbar', bounds: { x: 40, y: 30, width: 720, height: 60 }, alignment: 'space-between', items: data.detectedBoxes.filter(b => b.type === 'navbar') },
        { type: 'hero', bounds: { x: 40, y: 110, width: 720, height: 260 }, alignment: 'center', items: data.detectedBoxes.filter(b => b.type === 'hero') },
        { type: 'grid', bounds: { x: 40, y: 400, width: 720, height: 250 }, alignment: 'center', items: data.detectedBoxes.filter(b => b.type === 'grid') },
        { type: 'footer', bounds: { x: 40, y: 800, width: 720, height: 60 }, alignment: 'space-between', items: data.detectedBoxes.filter(b => b.type === 'footer') },
      ],
      architectureRecommendation: data.project.architectureRecommendation,
      project: {
        ...data.project,
        originalImage: imageDataUrl || `data:image/svg+xml;utf8,${encodeURIComponent(data.sketchSvg)}`,
        originalType: imageType,
      },
      processingTimeMs: 1150,
    };
  }

  const startedAt = performance.now();
  try {
    const remote = await requestRemoteVision(imageDataUrl, imageType);
    const result = buildCustomResult(imageDataUrl, imageType, remote.components, 'openai', undefined, remote.designTokens);
    return { ...result, processingTimeMs: Math.round(performance.now() - startedAt) };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown OpenAI Vision error';
    const scanResult = await scanCanvasImage(imageDataUrl);
    const result = buildCustomResult(imageDataUrl, imageType, scanResult.detectedBoxes, 'local', `AI Vision unavailable — using local analysis. (${reason})`);
    return { ...result, processingTimeMs: Math.round(performance.now() - startedAt) };
  }
}

function isLightColor(color: string): boolean {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (!hex) return false;
  const value = parseInt(hex[1], 16);
  return (((value >> 16) * 299) + (((value >> 8) & 255) * 587) + ((value & 255) * 114)) / 1000 >= 128;
}
