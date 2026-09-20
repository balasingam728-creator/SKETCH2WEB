import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, Wrench } from 'lucide-react';
import { ComponentNode } from '../../types';
import { runQualityAudit, autoFixQualityIssues } from '../../core/qualityAuditor';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface QualityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rootNode: ComponentNode;
  onApplyFixedRoot: (fixedNode: ComponentNode, count: number) => void;
}

export const QualityCheckerModal: React.FC<QualityCheckerModalProps> = ({
  isOpen,
  onClose,
  rootNode,
  onApplyFixedRoot,
}) => {
  const [activeCategory, setActiveCategory] = useState<'accessibility' | 'codeQuality' | 'responsiveness'>('accessibility');
  const [fixedMessage, setFixedMessage] = useState<string | null>(null);

  const auditResult = runQualityAudit(rootNode);

  const handleAutoFix = () => {
    const { fixedRoot, fixCount } = autoFixQualityIssues(rootNode);
    onApplyFixedRoot(fixedRoot, fixCount);
    setFixedMessage(`✓ Successfully fixed ${fixCount} accessibility & responsive issue(s)!`);
    setTimeout(() => setFixedMessage(null), 3500);
  };

  const currentCategoryData = auditResult.categories[activeCategory];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>AI Quality &amp; Accessibility Audit</span>
        </div>
      }
      subtitle="Automated audit of accessibility, code quality, and responsive layout standards"
      maxWidth="2xl"
    >
      <div className="space-y-4 text-xs">
        {/* Overall Score Badge Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
              <span className="font-extrabold text-xl text-cyan-400 font-mono">
                {auditResult.overallScore}
              </span>
            </div>
            <div>
              <div className="font-bold text-sm text-white">Overall Website Quality Score</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Calculated from WCAG accessibility, semantic HTML, and mobile viewport constraints.
              </p>
            </div>
          </div>

          <button
            onClick={handleAutoFix}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Fix Automatically</span>
          </button>
        </div>

        {fixedMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold animate-in fade-in">
            {fixedMessage}
          </div>
        )}

        {/* Category Selector Tabs */}
        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveCategory('accessibility')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeCategory === 'accessibility'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Accessibility</span>
            <Badge variant={auditResult.categories.accessibility.score >= 90 ? 'success' : 'warning'} size="sm">
              {auditResult.categories.accessibility.score}%
            </Badge>
          </button>

          <button
            onClick={() => setActiveCategory('codeQuality')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeCategory === 'codeQuality'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Code Quality</span>
            <Badge variant={auditResult.categories.codeQuality.score >= 90 ? 'success' : 'warning'} size="sm">
              {auditResult.categories.codeQuality.score}%
            </Badge>
          </button>

          <button
            onClick={() => setActiveCategory('responsiveness')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeCategory === 'responsiveness'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Responsiveness</span>
            <Badge variant={auditResult.categories.responsiveness.score >= 90 ? 'success' : 'warning'} size="sm">
              {auditResult.categories.responsiveness.score}%
            </Badge>
          </button>
        </div>

        {/* Category Issues List */}
        <div className="space-y-2 min-h-[160px]">
          {currentCategoryData.issues.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center gap-2 text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <span className="font-bold text-slate-200">No issues found in this category!</span>
              <p className="text-[11px] text-slate-500">Your layout adheres to modern best practice standards.</p>
            </div>
          ) : (
            currentCategoryData.issues.map((issue) => (
              <div
                key={issue.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  {issue.severity === 'critical' ? (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200 flex items-center gap-2">
                      <span>{issue.title}</span>
                      <Badge variant={issue.severity === 'critical' ? 'danger' : 'warning'} size="sm">
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                </div>

                {issue.fixable && (
                  <Badge variant="success" size="sm" className="shrink-0">
                    Auto-Fixable
                  </Badge>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
