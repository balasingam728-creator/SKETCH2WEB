import React from 'react';
import { Sparkles, CheckCircle2, X, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { AiChangeOperation, AiChangePlan } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface AiChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AiChangePlan | null;
  onApplyPlan: (plan: AiChangePlan) => void;
}

export const AiChangePlanModal: React.FC<AiChangePlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  onApplyPlan,
}) => {
  if (!plan) return null;

  const operationLabel = (operation: AiChangeOperation): string => {
    switch (operation.type) {
      case 'add': return `ADD: ${operation.component.name}`;
      case 'remove': return `REMOVE: ${operation.nodeId}`;
      case 'replace': return `REPLACE: ${operation.nodeId} with ${operation.component.name}`;
      case 'create_page': return `CREATE PAGE: ${operation.page.name}`;
      case 'project_update': return 'UPDATE: project settings';
      case 'duplicate': return `DUPLICATE: ${operation.nodeId}`;
      case 'move': return `MOVE: ${operation.nodeId}`;
      case 'reorder': return `REORDER: ${operation.nodeId}`;
      default: return `${operation.type.toUpperCase()}: ${operation.nodeId}`;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>AI Modification Plan</span>
        </div>
      }
      subtitle={`Proposed AST changes for prompt: "${plan.prompt}"`}
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Plan Header Card */}
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-indigo-300">{plan.title}</h4>
            <Badge variant="primary" size="sm">
              {plan.steps.length} Actions
            </Badge>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{plan.summary}</p>
          {plan.warning && <p className="text-amber-300 text-[11px]">{plan.warning}</p>}
        </div>

        {/* Action Steps Checklist */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Execution Steps
          </div>
          <div className="space-y-1.5">
            {plan.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-850 text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affected Target Nodes */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Affected Targets
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plan.affectedNodes.map((node, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700"
              >
                {node}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Structured AST Operations</div>
          <div className="space-y-1.5">
            {plan.operations.length > 0 ? plan.operations.map((operation, index) => (
              <div key={`${operation.type}-${index}`} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850 text-slate-200 font-mono text-[10px]">
                {operationLabel(operation)}
              </div>
            )) : <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">No safe structural change detected.</div>}
          </div>
        </div>

        {/* Responsive & Clean Guarantee */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 flex items-center gap-2 text-slate-400 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Preserves Flexbox &amp; Grid layout semantics and responsive breakpoints.</span>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onApplyPlan(plan)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Apply Changes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
