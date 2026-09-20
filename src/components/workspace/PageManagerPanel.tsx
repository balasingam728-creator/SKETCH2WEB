import React, { useState } from 'react';
import { Plus, Trash2, Copy, Sparkles, FileText, Globe } from 'lucide-react';
import { Page, Project } from '../../types';

interface PageManagerPanelProps {
  project: Project;
  onSelectPage: (pageId: string) => void;
  onAddPage: (name: string, template: 'blank' | 'duplicate' | 'ai-about' | 'ai-pricing' | 'ai-contact') => void;
  onDeletePage: (pageId: string) => void;
  onRenamePage: (pageId: string, newName: string) => void;
}

export const PageManagerPanel: React.FC<PageManagerPanelProps> = ({
  project,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onRenamePage,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'blank' | 'duplicate' | 'ai-about' | 'ai-pricing' | 'ai-contact'>('blank');

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageName.trim()) {
      onAddPage(newPageName.trim(), selectedTemplate);
      setNewPageName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar h-full text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
          Pages Manager
        </span>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>Add Page</span>
        </button>
      </div>

      {/* Add Page Modal / Form */}
      {isAdding && (
        <form onSubmit={handleCreatePage} className="p-3 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3 animate-in fade-in">
          <div className="font-bold text-slate-200">Create New Page</div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Page Name</label>
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="e.g. About, Pricing, Contact"
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Template Strategy</label>
            <select
              value={selectedTemplate}
              onChange={(e: any) => setSelectedTemplate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="blank">Start from Blank Template</option>
              <option value="duplicate">Duplicate Active Page</option>
              <option value="ai-about">✨ AI Generate: "About Us" Page</option>
              <option value="ai-pricing">✨ AI Generate: "Pricing" Page</option>
              <option value="ai-contact">✨ AI Generate: "Contact" Page</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              Create Page
            </button>
          </div>
        </form>
      )}

      {/* Pages List */}
      <div className="space-y-1.5">
        {project.pages.map((p) => {
          const isActive = p.id === project.activePageId;
          return (
            <div
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                isActive
                  ? 'bg-indigo-600/15 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-950/40 border-slate-850 text-slate-300 hover:bg-slate-850/60'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">{p.icon || '📄'}</span>
                <div>
                  <div className="font-semibold text-slate-200 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{p.path || '/'}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.pages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePage(p.id);
                    }}
                    className="p-1 hover:text-rose-400 rounded text-slate-500"
                    title="Delete Page"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-850 text-[11px] text-slate-400 space-y-1">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>Global Design System Inheritance</span>
        </div>
        <p className="leading-relaxed">
          All pages automatically inherit the project's color palette, typography hierarchy, and spacing tokens.
        </p>
      </div>
    </div>
  );
};
