import React, { useState } from 'react';
import { Terminal, Layers, Code, CheckCircle2, Copy, Check, Eye } from 'lucide-react';
import { ComponentNode, DesignSystem, DetectedBox, LayoutRelationship } from '../../types';
import { compileProject } from '../../core/compiler';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface DebugPipelinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  detectedBoxes?: DetectedBox[];
  layoutRelationships?: LayoutRelationship[];
  rootNode: ComponentNode;
  designSystem: DesignSystem;
  pageName: string;
  analysisProvider?: 'openai' | 'local';
  analysisWarning?: string;
}

export const DebugPipelinePanel: React.FC<DebugPipelinePanelProps> = ({
  isOpen,
  onClose,
  detectedBoxes = [],
  layoutRelationships = [],
  rootNode,
  designSystem,
  pageName,
  analysisProvider,
  analysisWarning,
}) => {
  const [activeTab, setActiveTab] = useState<'detections' | 'relationships' | 'ast' | 'html' | 'css'>('detections');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const compiled = compileProject(rootNode, designSystem, pageName);

  const handleCopyJson = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          <span>Pipeline &amp; Architecture Inspector (Debug)</span>
        </div>
      }
      subtitle="Inspect live data transformations from visual input → detection → layout inference → AST → compiler"
      maxWidth="4xl"
    >
      <div className="space-y-4 text-xs select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800"><div className="text-slate-500">AI Provider</div><div className="text-indigo-300 font-semibold">{analysisProvider === 'openai' ? 'OpenAI' : 'Local fallback'}</div></div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800"><div className="text-slate-500">Detected</div><div className="text-slate-200 font-semibold">{detectedBoxes.length} components</div></div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800"><div className="text-slate-500">Confidence</div><div className="text-slate-200 font-semibold">{detectedBoxes.length ? `${Math.round((detectedBoxes.reduce((total, box) => total + box.confidence, 0) / detectedBoxes.length) * 100)}% avg` : 'n/a'}</div></div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800"><div className="text-slate-500">Warning</div><div className="text-amber-300 font-semibold truncate" title={analysisWarning}>{analysisWarning || 'None'}</div></div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab('detections')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'detections' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Raw Detections</span>
            <Badge variant="neutral" size="sm">{detectedBoxes.length}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('relationships')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'relationships' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>2. Layout Inference</span>
            <Badge variant="neutral" size="sm">{layoutRelationships.length || 'Auto'}</Badge>
          </button>

          <button
            onClick={() => setActiveTab('ast')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ast' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>3. AST Tree JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'html' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>4. Generated HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'css' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>5. Generated CSS</span>
          </button>
        </div>

        {/* Tab 1: Raw Detections */}
        {activeTab === 'detections' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] text-slate-400 px-1">
              <span>{detectedBoxes.length} Bounding Boxes Detected</span>
              <span className="font-mono text-indigo-400">Confidence Threshold: ≥ 85%</span>
            </div>
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="p-2.5">Component Type</th>
                    <th className="p-2.5">Label / Content</th>
                    <th className="p-2.5">Confidence</th>
                    <th className="p-2.5">Coordinates (X, Y)</th>
                    <th className="p-2.5">Dimensions (W × H)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 font-mono text-[11px]">
                  {detectedBoxes.map((b, i) => (
                    <tr key={i} className="hover:bg-slate-900/50 text-slate-300">
                      <td className="p-2.5">
                        <Badge variant="primary" size="sm">{b.type}</Badge>
                      </td>
                      <td className="p-2.5 font-sans font-medium text-slate-200">{b.label}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">{Math.round(b.confidence * 100)}%</td>
                      <td className="p-2.5 text-slate-400">({b.x}, {b.y})</td>
                      <td className="p-2.5 text-slate-400">{b.width} × {b.height}px</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Layout Inference */}
        {activeTab === 'relationships' && (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400 px-1">
              Inferred Structural Hierarchy &amp; Responsive Web Constraints
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
              {layoutRelationships.length === 0 ? (
                <div className="p-6 text-center text-slate-500 bg-slate-950 rounded-xl border border-slate-800">
                  Layout relationships automatically compiled into active Component Tree.
                </div>
              ) : (
                layoutRelationships.map((rel, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">{rel.type.toUpperCase()}</Badge>
                        <span className="font-bold text-slate-200">Alignment: {rel.alignment}</span>
                      </div>
                      <span className="font-mono text-slate-500 text-[10px]">
                        Bounds: {rel.bounds.width}×{rel.bounds.height}px
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Contains {rel.items.length} child element(s): {rel.items.map(i => i.label).join(', ')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: AST JSON Tree */}
        {activeTab === 'ast' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Source of Truth Intermediate AST Model</span>
              <button
                onClick={() => handleCopyJson(JSON.stringify(rootNode, null, 2))}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied JSON' : 'Copy AST JSON'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-indigo-200/90 max-h-[50vh] overflow-auto custom-scrollbar">
              {JSON.stringify(rootNode, null, 2)}
            </pre>
          </div>
        )}

        {/* Tab 4: Generated HTML */}
        {activeTab === 'html' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Compiled Semantic HTML5 Body</span>
              <button
                onClick={() => handleCopyJson(compiled.html)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy HTML</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-cyan-200/90 max-h-[50vh] overflow-auto custom-scrollbar">
              {compiled.html}
            </pre>
          </div>
        )}

        {/* Tab 5: Generated CSS */}
        {activeTab === 'css' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Compiled Scoped CSS3 Variables &amp; Responsive Rules</span>
              <button
                onClick={() => handleCopyJson(compiled.css)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy CSS</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 font-mono text-[11px] text-amber-200/90 max-h-[50vh] overflow-auto custom-scrollbar">
              {compiled.css}
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
};
