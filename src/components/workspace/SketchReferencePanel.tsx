import React from 'react';
import { Eye, SplitSquareVertical, Layers, Image as ImageIcon } from 'lucide-react';
import { Project } from '../../types';

interface SketchReferencePanelProps {
  project: Project;
  sketchSvg?: string;
  comparisonMode: 'none' | 'side-by-side' | 'split-slider' | 'overlay';
  onComparisonModeChange: (mode: 'none' | 'side-by-side' | 'split-slider' | 'overlay') => void;
  overlayOpacity: number;
  onOverlayOpacityChange: (opacity: number) => void;
}

export const SketchReferencePanel: React.FC<SketchReferencePanelProps> = ({
  project,
  sketchSvg,
  comparisonMode,
  onComparisonModeChange,
  overlayOpacity,
  onOverlayOpacityChange,
}) => {
  return (
    <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar h-full text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
          Correction Reference
        </span>
        <span className="text-[10px] text-indigo-400 font-mono">{project.fidelityBreakdown ? `Fidelity: ${project.fidelityBreakdown.overall}%` : 'Visual comparison available'}</span>
      </div>

      {/* Comparison Modes */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Comparison Mode
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onComparisonModeChange('none')}
            className={`p-2 rounded-lg border text-center transition-colors ${
              comparisonMode === 'none'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850'
            }`}
          >
            Normal Canvas
          </button>
          <button
            onClick={() => onComparisonModeChange('split-slider')}
            className={`p-2 rounded-lg border text-center transition-colors flex items-center justify-center gap-1 ${
              comparisonMode === 'split-slider'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => onComparisonModeChange('side-by-side')}
            className={`p-2 rounded-lg border text-center transition-colors ${
              comparisonMode === 'side-by-side'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => onComparisonModeChange('overlay')}
            className={`p-2 rounded-lg border text-center transition-colors flex items-center justify-center gap-1 ${
              comparisonMode === 'overlay'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overlay Mode</span>
          </button>
        </div>
      </div>

      {/* Overlay Opacity Slider (when in overlay mode) */}
      {comparisonMode === 'overlay' && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-1.5 animate-in fade-in">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Sketch Overlay Opacity</span>
            <span className="font-mono text-indigo-400">{Math.round(overlayOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={overlayOpacity}
            onChange={(e) => onOverlayOpacityChange(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      )}

      {/* Original Image / SVG Preview Thumbnail */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Wireframe Source
        </label>
        <div className="h-64 bg-slate-950 rounded-xl border border-slate-850 p-2 overflow-hidden flex items-center justify-center shadow-inner">
          {sketchSvg ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: sketchSvg }}
            />
          ) : project.originalImage ? (
            <img src={project.originalImage} alt="Reference" className="w-full h-full object-contain" />
          ) : (
            <div className="text-slate-600">No sketch source available</div>
          )}
        </div>
      </div>
    </div>
  );
};
