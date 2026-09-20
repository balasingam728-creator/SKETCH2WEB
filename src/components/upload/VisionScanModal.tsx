import React, { useEffect, useState } from 'react';
import { Sparkles, Scan, CheckCircle2 } from 'lucide-react';
import { DetectedBox } from '../../types';
import { Badge } from '../common/Badge';

interface VisionScanModalProps {
  isOpen: boolean;
  sketchSvg?: string;
  imageUrl?: string;
  detectedBoxes: DetectedBox[];
  isAnalysisReady?: boolean;
  onAnalysisComplete: () => void;
}

export const VisionScanModal: React.FC<VisionScanModalProps> = ({
  isOpen,
  sketchSvg,
  imageUrl,
  detectedBoxes,
  isAnalysisReady = true,
  onAnalysisComplete,
}) => {
  const [progress, setProgress] = useState(15);
  const [activeStep, setActiveStep] = useState(1);
  const [visibleBoxes, setVisibleBoxes] = useState<DetectedBox[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setProgress(15);
      setActiveStep(1);
      setVisibleBoxes([]);
      return;
    }

    // Step 1: Scan image (0-400ms)
    const t1 = setTimeout(() => {
      setProgress(40);
      setActiveStep(2);
      setVisibleBoxes(detectedBoxes.slice(0, 3));
    }, 450);

    // Step 2: Detect UI components (400-850ms)
    const t2 = setTimeout(() => {
      setProgress(75);
      setActiveStep(3);
      setVisibleBoxes(detectedBoxes);
    }, 900);

    // Step 3: Construct AST & Finish (1300ms)
    const t3 = setTimeout(() => {
      setProgress(100);
      setActiveStep(4);
    }, 1350);

    const t4 = isAnalysisReady ? setTimeout(() => onAnalysisComplete(), 1750) : undefined;

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (t4) clearTimeout(t4);
    };
  }, [isOpen, detectedBoxes, isAnalysisReady, onAnalysisComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-lg">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                AI Vision &amp; Layout Analysis
              </h3>
              <p className="text-xs text-slate-400">Scanning wireframe landmarks, typography bounds &amp; component boundaries</p>
            </div>
          </div>
          <Badge variant="primary" size="sm">
            <Sparkles className="w-3 h-3 animate-spin" />
            Scanning in progress
          </Badge>
        </div>

        {/* Visual Scanning Viewport */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Sketch Preview with Laser Scanner & Boxes */}
          <div className="md:col-span-7 relative h-72 sm:h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Background SVG / Image */}
            {sketchSvg ? (
              <div
                className="w-full h-full p-2 opacity-80"
                dangerouslySetInnerHTML={{ __html: sketchSvg }}
              />
            ) : imageUrl ? (
              <img src={imageUrl} alt="Uploaded Sketch" className="w-full h-full object-contain opacity-80 p-2" />
            ) : (
              <div className="text-slate-600 text-sm">No sketch source</div>
            )}

            {/* Animated Laser Scanner Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan pointer-events-none z-10" />

            {/* Detected Bounding Box Overlays */}
            {visibleBoxes.map((box, idx) => {
              const topPct = (box.y / 950) * 100;
              const leftPct = (box.x / 800) * 100;
              const widthPct = (box.width / 800) * 100;
              const heightPct = (box.height / 950) * 100;

              return (
                <div
                  key={box.id}
                  style={{
                    top: `${topPct}%`,
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: `${heightPct}%`,
                  }}
                  className="absolute border-2 border-dashed border-indigo-400 bg-indigo-500/10 rounded pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95"
                >
                  <span className="absolute -top-3 left-1 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                    {box.label} ({Math.round(box.confidence * 100)}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Analysis Stages Checklist */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Neural Processing Pipeline
            </div>

            <div className={`p-3 rounded-lg border transition-all flex items-center gap-3 ${activeStep >= 1 ? 'bg-slate-800/80 border-indigo-500/40 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${activeStep >= 2 ? 'text-emerald-400' : 'text-indigo-400 animate-spin'}`} />
              <div>
                <div className="text-xs font-bold">1. Edge &amp; Landmark Extraction</div>
                <div className="text-[11px] text-slate-400">Bounding spatial coordinates</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg border transition-all flex items-center gap-3 ${activeStep >= 2 ? 'bg-slate-800/80 border-indigo-500/40 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${activeStep >= 3 ? 'text-emerald-400' : activeStep === 2 ? 'text-indigo-400 animate-spin' : 'text-slate-600'}`} />
              <div>
                <div className="text-xs font-bold">2. Component Pattern Classification</div>
                <div className="text-[11px] text-slate-400">{detectedBoxes.length} components tagged</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg border transition-all flex items-center gap-3 ${activeStep >= 3 ? 'bg-slate-800/80 border-indigo-500/40 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              <CheckCircle2 className={`w-4 h-4 ${activeStep >= 4 ? 'text-emerald-400' : activeStep === 3 ? 'text-indigo-400 animate-spin' : 'text-slate-600'}`} />
              <div>
                <div className="text-xs font-bold">3. Intermediate AST Synthesis</div>
                <div className="text-[11px] text-slate-400">Mapping nested Flexbox &amp; Grid nodes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>Synthesizing component tree...</span>
          <span className="font-mono font-bold text-slate-300">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
