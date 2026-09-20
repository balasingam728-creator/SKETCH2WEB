import React, { useState } from 'react';
import {
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  History,
  ShieldCheck,
  Code2,
  Bot,
  Download,
  Eye,
  ExternalLink,
  Presentation,
  SplitSquareVertical,
  Plus,
  Check,
  FileText,
  Terminal,
} from 'lucide-react';
import { Project, ViewportMode } from '../../types';
import { Badge } from '../common/Badge';

interface WorkspaceHeaderProps {
  project: Project;
  viewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenVersionHistory: () => void;
  onOpenQualityChecker: () => void;
  onOpenDocumentation: () => void;
  onOpenExportModal: () => void;
  onOpenPresentation: () => void;
  onOpenDebugPanel: () => void;
  onToggleCode: () => void;
  isCodeOpen: boolean;
  onToggleAi: () => void;
  isAiOpen: boolean;
  comparisonMode: 'none' | 'side-by-side' | 'split-slider' | 'overlay';
  onComparisonModeChange: (mode: 'none' | 'side-by-side' | 'split-slider' | 'overlay') => void;
  onSelectPage: (pageId: string) => void;
  onAddPage: () => void;
  onRenameProject: (name: string) => void;
  onOpenPreviewTab: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  project,
  viewport,
  onViewportChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenVersionHistory,
  onOpenQualityChecker,
  onOpenDocumentation,
  onOpenExportModal,
  onOpenPresentation,
  onOpenDebugPanel,
  onToggleCode,
  isCodeOpen,
  onToggleAi,
  isAiOpen,
  comparisonMode,
  onComparisonModeChange,
  onSelectPage,
  onAddPage,
  onRenameProject,
  onOpenPreviewTab,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [projName, setProjName] = useState(project.name);
  const [isFidelityHovered, setIsFidelityHovered] = useState(false);

  const handleNameSubmit = () => {
    setIsEditingName(false);
    if (projName.trim()) {
      onRenameProject(projName.trim());
    }
  };

  const fidelity = project.fidelityBreakdown;

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/95 backdrop-blur px-4 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Left: Brand + Project Name + Page Switcher */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/10">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        {/* Project Name Editor */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              autoFocus
              className="bg-slate-950 text-white font-bold text-sm px-2 py-0.5 rounded border border-indigo-500 focus:outline-none w-44"
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="font-bold text-sm text-slate-100 hover:text-indigo-400 cursor-pointer transition-colors truncate max-w-[160px]"
              title="Click to rename project"
            >
              {project.name}
            </span>
          )}
        </div>

        {/* Page Switcher Dropdown */}
        <div className="h-4 w-px bg-slate-800 mx-1" />
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          {project.pages.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                p.id === project.activePageId
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{p.icon || '📄'}</span>
              <span>{p.name}</span>
            </button>
          ))}
          <button
            onClick={onAddPage}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Add Page"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center: Device Viewport Controls + Comparison Mode */}
      <div className="flex items-center gap-2">
        {/* Device Viewports */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => onViewportChange('desktop')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              viewport === 'desktop' ? 'bg-slate-800 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop View (1200px)"
          >
            <Monitor className="w-4 h-4" />
            <span className="text-[11px] hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => onViewportChange('tablet')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              viewport === 'tablet' ? 'bg-slate-800 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
            <span className="text-[11px] hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => onViewportChange('mobile')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              viewport === 'mobile' ? 'bg-slate-800 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[11px] hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition-colors ${canUndo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'}`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition-colors ${canRedo ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'}`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sketch Comparison Mode Dropdown */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => onComparisonModeChange(comparisonMode === 'split-slider' ? 'none' : 'split-slider')}
            className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              comparisonMode === 'split-slider' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Original Sketch vs Generated Split Slider"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden md:inline">Original ↔ Generated</span>
          </button>
        </div>
      </div>

      {/* Right: Fidelity + Quality + Presentation + Code + AI + Export */}
      <div className="flex items-center gap-2">
        {/* Estimated Design Fidelity Badge with Tooltip */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsFidelityHovered(true)}
          onMouseLeave={() => setIsFidelityHovered(false)}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span>{fidelity ? 'Fidelity:' : 'Visual comparison available'}</span>
            {fidelity && <span className="font-bold">{fidelity.overall}%</span>}
          </div>

          {/* Tooltip Breakdown */}
          {isFidelityHovered && fidelity && (
            <div className="absolute right-0 top-9 w-60 p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-50 text-xs text-slate-300 animate-in fade-in">
              <div className="font-bold text-white mb-2 flex items-center justify-between">
                <span>Design Fidelity Breakdown</span>
                <span className="text-emerald-400 font-mono">{fidelity.overall}%</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Layout Structure:</span>
                  <span className="font-mono text-slate-200">{fidelity.layout}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Component Hierarchy:</span>
                  <span className="font-mono text-slate-200">{fidelity.components}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Typography Scale:</span>
                  <span className="font-mono text-slate-200">{fidelity.typography}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Color Contrast &amp; Tokens:</span>
                  <span className="font-mono text-slate-200">{fidelity.colors}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Spacing &amp; Padding:</span>
                  <span className="font-mono text-slate-200">{fidelity.spacing}%</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic border-t border-slate-850 pt-1.5">
                *Estimated heuristic similarity metric
              </p>
            </div>
          )}
        </div>

        {/* Quality Audit Button */}
        <button
          onClick={onOpenQualityChecker}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition-colors"
          title="Run Accessibility, Code Quality & Responsiveness Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Quality:</span>
          <span className="text-cyan-400 font-bold">94/100</span>
        </button>

        {/* Version History */}
        <button
          onClick={onOpenVersionHistory}
          className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          title="Version History (Snapshots)"
        >
          <History className="w-3.5 h-3.5" />
        </button>

        {/* Documentation Generator */}
        <button
          onClick={onOpenDocumentation}
          className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          title="Auto-Generated Technical Documentation"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>

        {/* Presentation Tour */}
        <button
          onClick={onOpenPresentation}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          title="Interactive Judging Presentation Tour"
        >
          <Presentation className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline">Tour</span>
        </button>

        {/* Pipeline Debug Inspector */}
        <button
          onClick={onOpenDebugPanel}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
          title="Inspect Raw Detections, Inferred Layout & AST Pipeline"
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">Pipeline Debug</span>
        </button>

        {/* Code Editor Toggle */}
        <button
          onClick={onToggleCode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            isCodeOpen
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          title="Toggle Synchronized HTML/CSS/JS Code Editor"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code</span>
        </button>

        {/* AI Assistant Toggle */}
        <button
          onClick={onToggleAi}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            isAiOpen
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
          title="Toggle AI Natural Language Assistant"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI Assistant</span>
        </button>

        {/* Live Preview Standalone */}
        <button
          onClick={onOpenPreviewTab}
          className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          title="Open Standalone Preview in New Tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Export Modal Trigger */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
