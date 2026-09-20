import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Code, ShieldCheck, Layers } from 'lucide-react';
import { ArchitectureRecommendation } from '../../types';
import { Badge } from '../common/Badge';

interface ArchitectureRecommendationModalProps {
  isOpen: boolean;
  recommendation: ArchitectureRecommendation;
  onAccept: () => void;
}

export const ArchitectureRecommendationModal: React.FC<ArchitectureRecommendationModalProps> = ({
  isOpen,
  recommendation,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">AI Architecture Recommendation</h3>
                <Badge variant="success" size="sm">Optimized for Production</Badge>
              </div>
              <p className="text-xs text-slate-400">AI analysis of design complexity &amp; responsive frontend architecture</p>
            </div>
          </div>
        </div>

        {/* Complexity & Metrics Stats */}
        <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Layout Complexity</div>
            <div className="text-base font-bold text-indigo-400 mt-0.5">{recommendation.complexity}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Detected Nodes</div>
            <div className="text-base font-bold text-cyan-400 mt-0.5">{recommendation.detectedComponentsCount} Elements</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Sections</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">{recommendation.sectionsCount} Sections</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Responsiveness</div>
            <div className="text-base font-bold text-amber-400 mt-0.5">{recommendation.responsiveComplexity} Adaptability</div>
          </div>
        </div>

        {/* Architecture Details Box */}
        <div className="p-5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Code className="w-4 h-4 text-indigo-400" />
            <span>Recommended Frontend Architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Semantic HTML5:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">{recommendation.recommendedHtml}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">CSS Layout Strategy:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">{recommendation.recommendedCss}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">JavaScript Requirements:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">{recommendation.recommendedJs}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">CSS Variables Tokens:</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">Scoped design tokens for colors, typography &amp; radius</p>
              </div>
            </div>
          </div>

          {/* AI Rationale */}
          <div className="mt-2 pt-3 border-t border-indigo-500/20 text-xs text-indigo-200/90 leading-relaxed italic bg-indigo-950/40 p-3 rounded-lg">
            "{recommendation.rationale}"
          </div>
        </div>

        {/* Guaranteed Export Guarantee */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Zero Framework Lock-in:</strong> Output is guaranteed clean, standard, standalone <span className="text-slate-200 font-semibold">HTML + CSS + JS</span> exportable as a downloadable ZIP package.
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onAccept}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Accept Architecture &amp; Generate Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
