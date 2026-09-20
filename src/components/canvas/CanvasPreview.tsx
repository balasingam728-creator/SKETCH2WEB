import React, { useEffect, useRef, useState } from 'react';
import {
  Lock,
  RotateCw,
  Sparkles,
  Layers,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit3,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { ComponentNode, Project, ViewportMode } from '../../types';
import { compileProject } from '../../core/compiler';
import { SplitSliderComparison } from './SplitSliderComparison';

interface CanvasPreviewProps {
  project: Project;
  viewport: ViewportMode;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNodeText: (nodeId: string, text: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
  onOpenAiForNode: (nodeId: string) => void;
  comparisonMode: 'none' | 'side-by-side' | 'split-slider' | 'overlay';
  overlayOpacity: number;
  sketchSvg?: string;
  onOpenPreviewTab: () => void;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  project,
  viewport,
  selectedNodeId,
  onSelectNode,
  onUpdateNodeText,
  onDuplicateNode,
  onDeleteNode,
  onMoveNode,
  onOpenAiForNode,
  comparisonMode,
  overlayOpacity,
  sketchSvg,
  onOpenPreviewTab,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];
  const compiled = compileProject(activePage.rootComponent, project.designSystem, activePage.name);

  // Injected JavaScript inside iframe to handle clicks, hover bounds & selection
  const interactiveScript = `
    <script>
      (function() {
        let selectedEl = null;

        document.addEventListener('click', function(e) {
          // Find nearest element with an ID
          let target = e.target.closest('[id]');
          if (target && target.id && target.id.startsWith('s2w-') || (target && target.id && !target.id.startsWith('__'))) {
            e.preventDefault();
            e.stopPropagation();
            window.parent.postMessage({ type: 'S2W_SELECT_NODE', id: target.id }, '*');
          }
        }, true);

        // Double click inline text editing
        document.addEventListener('dblclick', function(e) {
          let target = e.target.closest('h1, h2, h3, h4, p, span, a, button');
          if (target) {
            e.preventDefault();
            e.stopPropagation();
            const originalText = target.innerText;
            const newText = prompt('Edit content text:', originalText);
            if (newText !== null && newText !== originalText) {
              const nodeEl = target.closest('[id]');
              if (nodeEl) {
                window.parent.postMessage({ type: 'S2W_UPDATE_TEXT', id: nodeEl.id, text: newText }, '*');
              }
            }
          }
        }, true);

        // Highlight selected node on message from parent
        window.addEventListener('message', function(event) {
          if (event.data && event.data.type === 'S2W_HIGHLIGHT') {
            if (selectedEl) {
              selectedEl.style.outline = '';
              selectedEl.style.outlineOffset = '';
            }
            if (event.data.id) {
              const el = document.getElementById(event.data.id);
              if (el) {
                el.style.outline = '2px solid #6366f1';
                el.style.outlineOffset = '2px';
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                selectedEl = el;
              }
            }
          }
        });
      })();
    </script>
  `;

  const augmentedHtml = compiled.fullDocument.replace('</body>', `${interactiveScript}</body>`);

  // Listen for iframe messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data) return;
      if (e.data.type === 'S2W_SELECT_NODE' && e.data.id) {
        onSelectNode(e.data.id);
      } else if (e.data.type === 'S2W_UPDATE_TEXT' && e.data.id) {
        onUpdateNodeText(e.data.id, e.data.text);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSelectNode, onUpdateNodeText]);

  // Synchronize selection highlight to iframe
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'S2W_HIGHLIGHT', id: selectedNodeId },
        '*'
      );
    }
  }, [selectedNodeId, augmentedHtml]);

  // Viewport widths
  const viewportWidthClass = {
    desktop: 'w-full max-w-[1240px]',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  }[viewport];

  if (comparisonMode === 'split-slider') {
    return (
      <SplitSliderComparison
        sketchSvg={sketchSvg}
        imageUrl={project.originalImage}
        compiledHtml={augmentedHtml}
      />
    );
  }

  return (
    <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden relative select-none">
      {/* Browser Chrome Bar */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-10 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-md border border-slate-800 text-slate-400 font-mono text-[11px] w-64 sm:w-80 truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>https://sketch2web.app{activePage.path}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="font-mono text-slate-400">
            {viewport === 'desktop' ? '1240px' : viewport === 'tablet' ? '768px' : '375px'} × Auto
          </span>
          <button
            onClick={() => {
              if (iframeRef.current) {
                iframeRef.current.srcdoc = augmentedHtml;
              }
            }}
            className="p-1 hover:text-white rounded"
            title="Refresh Live Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar flex items-start justify-center relative">
        {/* Side-by-side mode layout */}
        {comparisonMode === 'side-by-side' ? (
          <div className="grid grid-cols-2 gap-4 w-full max-w-[1400px] h-[85vh]">
            {/* Left: Original Sketch */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
              <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Original Sketch / Screenshot</span>
              </div>
              <div className="flex-1 p-3 overflow-y-auto bg-slate-950 flex items-center justify-center">
                {sketchSvg ? (
                  <div
                    className="w-full h-auto"
                    dangerouslySetInnerHTML={{ __html: sketchSvg }}
                  />
                ) : project.originalImage ? (
                  <img src={project.originalImage} alt="Sketch" className="w-full h-auto object-contain" />
                ) : (
                  <div className="text-slate-600">No original sketch image</div>
                )}
              </div>
            </div>

            {/* Right: Generated Live Site */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
              <div className="px-3 py-2 bg-slate-950 border-b border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generated Responsive Website</span>
              </div>
              <div className="flex-1 overflow-hidden bg-white">
                <iframe
                  ref={iframeRef}
                  srcDoc={augmentedHtml}
                  title="Live Website Sandbox"
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-modals"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Normal & Overlay Modes */
          <div
            className={`relative ${viewportWidthClass} transition-all duration-300 rounded-xl overflow-hidden border border-slate-800 shadow-2xl min-h-[750px] flex flex-col bg-white`}
          >
            {/* Overlay Mode Sketch */}
            {comparisonMode === 'overlay' && (
              <div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-difference"
              >
                {sketchSvg ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: sketchSvg }}
                  />
                ) : project.originalImage ? (
                  <img src={project.originalImage} alt="Overlay" className="w-full h-full object-cover" />
                ) : null}
              </div>
            )}

            {/* Live Interactive Iframe */}
            <iframe
              ref={iframeRef}
              srcDoc={augmentedHtml}
              title="Live Website Sandbox"
              className="w-full flex-1 min-h-[750px] border-0 bg-white z-10"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        )}
      </div>
    </div>
  );
};
