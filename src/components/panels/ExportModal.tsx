import React, { useState } from 'react';
import { Download, FileCode, Check, ExternalLink, Sparkles, FolderArchive, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../../types';
import { exportProjectAsZip, downloadSingleFile } from '../../utils/exportZip';
import { compileProject } from '../../core/compiler';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onOpenPreviewTab: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  onOpenPreviewTab,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];
  const compiled = compileProject(activePage.rootComponent, project.designSystem, activePage.name);

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      await exportProjectAsZip(project);
      setExported(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => setExported(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-400" />
          <span>Export Production Website</span>
        </div>
      }
      subtitle="Ready-to-run package with zero external build tools or framework lock-in"
      maxWidth="2xl"
    >
      <div className="space-y-5 text-xs">
        {/* Main ZIP Download Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Complete Project ZIP Archive</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Includes semantic HTML5, scoped CSS3, vanilla ES6 JS, documentation &amp; assets.
                </p>
              </div>
            </div>
            <Badge variant="success" size="sm">
              Recommended
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-850">
              <div className="text-slate-500">Markup</div>
              <div className="font-mono font-bold text-indigo-300">index.html</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-850">
              <div className="text-slate-500">Styles</div>
              <div className="font-mono font-bold text-cyan-300">styles/style.css</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-850">
              <div className="text-slate-500">Scripts</div>
              <div className="font-mono font-bold text-amber-300">scripts/app.js</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-850">
              <div className="text-slate-500">Docs</div>
              <div className="font-mono font-bold text-emerald-300">DOCUMENTATION.md</div>
            </div>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Compiling &amp; Bundling ZIP...</span>
              </>
            ) : exported ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>ZIP Download Complete!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Standalone ZIP Archive</span>
              </>
            )}
          </button>
        </div>

        {/* Individual File Downloads */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Download Individual Files
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => downloadSingleFile('index.html', compiled.html, 'text/html')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-indigo-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-200">index.html</div>
                <div className="text-[10px] text-slate-500">Semantic HTML5</div>
              </div>
              <Download className="w-4 h-4 text-indigo-400" />
            </button>

            <button
              onClick={() => downloadSingleFile('style.css', compiled.css, 'text/css')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-200">style.css</div>
                <div className="text-[10px] text-slate-500">Modular CSS3</div>
              </div>
              <Download className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => downloadSingleFile('app.js', compiled.js, 'text/javascript')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-amber-500/40 text-left transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-200">app.js</div>
                <div className="text-[10px] text-slate-500">Vanilla ES6 JS</div>
              </div>
              <Download className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Open Standalone Preview */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 text-[11px]">Want to preview without downloading?</span>
          <button
            onClick={onOpenPreviewTab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Standalone Preview</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
