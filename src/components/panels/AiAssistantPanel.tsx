import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';

interface AiAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onRequestChangePlan: (prompt: string) => void;
  isLoading: boolean;
}

export const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({
  isOpen,
  onClose,
  project,
  onRequestChangePlan,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hello! I am your Sketch2Web AI Architect. Tell me how you'd like to refine or extend your website (e.g. "Add a 3-tier pricing section", "Switch to dark mode", or "Add a contact form").`,
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Add a 3-tier pricing section',
    'Make the website dark mode',
    'Add a contact form with validation',
    'Change all buttons to pill shape',
    'Add FAQ accordion section',
    'Create an About Us page matching design system',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMsg = prompt.trim();
    setChatLog((prev) => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    onRequestChangePlan(userMsg);
  };

  const handleQuickPrompt = (text: string) => {
    if (isLoading) return;
    setChatLog((prev) => [...prev, { role: 'user', text }]);
    onRequestChangePlan(text);
  };

  return (
    <div className="fixed inset-y-14 right-0 w-96 bg-slate-900/95 backdrop-blur-lg border-l border-slate-800 shadow-2xl z-40 flex flex-col select-none animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm text-white">
              <span>AI Website Assistant</span>
              <Badge variant="primary" size="sm">NLP</Badge>
            </div>
            <p className="text-[10px] text-slate-400">Talk to modify AST, layout &amp; design tokens</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                  : 'bg-slate-850 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Analyzing AST &amp; generating AI Change Plan...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestion Pills */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Suggested AI Actions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(qp)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-850 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/40 border border-slate-800 text-slate-300 text-left transition-all"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Instruct AI to modify design or layout..."
          disabled={isLoading}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
