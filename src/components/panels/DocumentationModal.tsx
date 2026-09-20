import React, { useState } from 'react';
import { FileText, Copy, Download, Check } from 'lucide-react';
import { Project } from '../../types';
import { generateDocumentation } from '../../core/documentationGenerator';
import { downloadSingleFile } from '../../utils/exportZip';
import { Modal } from '../common/Modal';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [copied, setCopied] = useState(false);
  const docMarkdown = generateDocumentation(project);

  const handleCopy = () => {
    navigator.clipboard.writeText(docMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadSingleFile('DOCUMENTATION.md', docMarkdown, 'text/markdown');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>Auto-Generated Technical Documentation</span>
        </div>
      }
      subtitle="Complete structural blueprint, design tokens, and deployment guide"
      maxWidth="4xl"
    >
      <div className="space-y-4 text-xs">
        {/* Actions Bar */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download DOCUMENTATION.md</span>
          </button>
        </div>

        {/* Markdown View Area */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-h-[60vh] overflow-y-auto font-mono text-slate-300 whitespace-pre-wrap leading-relaxed custom-scrollbar">
          {docMarkdown}
        </div>
      </div>
    </Modal>
  );
};
