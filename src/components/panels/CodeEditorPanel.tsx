import React, { useState } from 'react';
import { Copy, Download, Check, Code2, Sparkles, X } from 'lucide-react';
import { ComponentNode, DesignSystem } from '../../types';
import { compileProject } from '../../core/compiler';
import { downloadSingleFile } from '../../utils/exportZip';
import { Badge } from '../common/Badge';

interface CodeEditorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  rootNode: ComponentNode;
  designSystem: DesignSystem;
  pageName: string;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  isOpen,
  onClose,
  rootNode,
  designSystem,
  pageName,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'bundle'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const compiled = compileProject(rootNode, designSystem, pageName);

  const getCode = () => {
    switch (activeTab) {
      case 'html':
        return compiled.html;
      case 'css':
        return compiled.css;
      case 'js':
        return compiled.js;
      case 'bundle':
        return compiled.fullDocument;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : activeTab === 'js' ? 'app.js' : 'standalone.html';
    const mime = activeTab === 'html' || activeTab === 'bundle' ? 'text/html' : activeTab === 'css' ? 'text/css' : 'text/javascript';
    downloadSingleFile(filename, getCode(), mime);
  };

  const codeString = getCode();
  const lineCount = codeString.split('\n').length;

  return (
    <div className="fixed inset-x-0 bottom-0 h-[42vh] bg-slate-950 border-t border-slate-800 shadow-2xl z-40 flex flex-col animate-in slide-in-from-bottom duration-200">
      {/* Header Tabs */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mr-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Synchronized Code</span>
          </div>

          <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'html' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTML5
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'css' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CSS3
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'js' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Vanilla JS (ES6)
            </button>
            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                activeTab === 'bundle' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unified Bundle
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="neutral" size="sm">
            {lineCount} lines
          </Badge>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-[#0d1117] selection:bg-indigo-600 selection:text-white flex">
        {/* Line Numbers */}
        <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800 font-mono text-xs shrink-0">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code View */}
        <pre className="pl-4 overflow-x-auto flex-1 font-mono whitespace-pre text-indigo-200/90">
          <code>{codeString}</code>
        </pre>
      </div>
    </div>
  );
};
