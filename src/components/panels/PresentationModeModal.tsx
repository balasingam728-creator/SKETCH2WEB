import React, { useState } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Code,
  Layout,
  Sliders,
  ShieldCheck,
  Download,
  Bot,
  Play,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface PresentationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  step: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  details: string[];
  keyHighlight: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Upload Hand-Drawn Sketch / Screenshot',
    category: 'Input Stage',
    icon: <Layout className="w-6 h-6 text-indigo-400" />,
    summary: 'The user uploads a paper sketch, whiteboard photo, digital doodle, or website screenshot.',
    details: [
      'Accepts drag & drop image uploads or pre-loaded datasets (SaaS Landing, E-Commerce Storefront).',
      'Dual upload pathways with support for rough sketches and high-fidelity screenshots.',
      'Instant demo mode operates 100% locally with zero external API dependencies.',
    ],
    keyHighlight: 'Universal visual input support with instant one-click demo showcase.',
  },
  {
    step: 2,
    title: 'AI Neural Layout & Component Analysis',
    category: 'Vision Pipeline',
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
    summary: 'Computer vision analysis extracts spatial coordinates and classifies UI components.',
    details: [
      'Visual laser scanning animation demonstrates real-time neural edge detection.',
      'Classifies Navbar, Hero, Heading, Buttons, Metrics, Cards, Form inputs, and Footers.',
      'Generates bounding boxes with confidence scores (e.g. 98% Navbar, 97% Hero).',
    ],
    keyHighlight: 'Deterministic bounding box extraction with confidence metrics.',
  },
  {
    step: 3,
    title: 'Intermediate Component Tree (AST) Generation',
    category: 'Core Architecture',
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    summary: 'Constructs a structured AST JSON tree as the central source of truth.',
    details: [
      'Decoupled architecture: Visual edits modify the AST, and the AST compiles to HTML/CSS/JS.',
      'Avoids full-page regeneration jitter upon incremental edits.',
      'Supports nesting, reordering, visibility toggling, renaming, and duplicating.',
    ],
    keyHighlight: 'Component Tree AST serves as the single source of truth.',
  },
  {
    step: 4,
    title: 'AI Architecture Recommendation',
    category: 'Engineering Best Practices',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    summary: 'Analyzes design complexity and recommends optimal layout and styling strategy.',
    details: [
      'Evaluates detected components, sections count, interactive widgets, and responsive complexity.',
      'Recommends Semantic HTML5, CSS Grid + Flexbox, CSS Variables, and Vanilla ES6 JS.',
      'User reviews AI rationale and accepts recommendation with one click.',
    ],
    keyHighlight: 'Guarantees zero framework lock-in with clean, standard web standards.',
  },
  {
    step: 5,
    title: 'Semantic HTML5, CSS3 & ES6 JS Compilation',
    category: 'Compiler Engine',
    icon: <Code className="w-6 h-6 text-amber-400" />,
    summary: 'High-performance compiler converts AST nodes into clean, standards-compliant web code.',
    details: [
      'Emits semantic landmarks (<nav>, <section>, <article>, <footer>, <form>).',
      'Generates CSS custom properties for global color tokens and elevation shadows.',
      'Generates responsive media queries for desktop (1200px), tablet (768px), and mobile (375px).',
    ],
    keyHighlight: 'Produces production-ready, readable code ready for deployment.',
  },
  {
    step: 6,
    title: 'Live Interactive Browser Sandbox Preview',
    category: 'Visual Experience',
    icon: <Layout className="w-6 h-6 text-indigo-400" />,
    summary: 'Renders the compiled site in an isolated, responsive browser frame.',
    details: [
      'Interactive device switcher: Desktop (1200px), Tablet (768px), Mobile (375px).',
      'Original vs Generated comparison via Split Slider, Side-by-Side, and Overlay modes.',
      'Displays estimated Design Fidelity Score breakdown (Layout, Components, Typography, Colors, Spacing).',
    ],
    keyHighlight: 'Fluid responsive testing with interactive split-screen slider.',
  },
  {
    step: 7,
    title: 'Layout-Aware Visual Editing',
    category: 'Visual Editor',
    icon: <Sliders className="w-6 h-6 text-cyan-400" />,
    summary: 'Direct visual editing preserving strict Flexbox & CSS Grid semantics.',
    details: [
      'Click any component on canvas or tree to inspect and adjust typography, colors, padding, and borders.',
      'Double-click text directly inside the canvas for instant inline editing.',
      'Reorder components safely without fragile absolute positioning coordinates.',
    ],
    keyHighlight: 'No absolute positioning; preserves fluid responsive layout rules.',
  },
  {
    step: 8,
    title: 'AI Natural Language Modification & Change Plan',
    category: 'AI Assistant',
    icon: <Bot className="w-6 h-6 text-indigo-400" />,
    summary: 'Modify the website via natural language prompts with step-by-step change planning.',
    details: [
      'Prompt AI: "Add 3-tier pricing section", "Make it dark mode", "Add contact form", "Change buttons to pill shape".',
      'Displays structured AI Change Plan with action steps and affected node tags before applying.',
      'Creates version history restore points automatically.',
    ],
    keyHighlight: 'Safe AI modifications with explicit plan previews and rollback support.',
  },
  {
    step: 9,
    title: 'Automated Quality, A11y & Responsiveness Audit',
    category: 'Quality Assurance',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    summary: 'Audits accessibility (WCAG), code quality, and responsive layout constraints.',
    details: [
      'Detects missing image alt tags, missing form labels, duplicate IDs, and fixed pixel width overflows.',
      'Displays overall Quality Score (e.g. 94/100).',
      'Provides "Fix Automatically" one-click engine that resolves detected issues across the AST.',
    ],
    keyHighlight: 'One-click automated remediation for accessibility and responsive bugs.',
  },
  {
    step: 10,
    title: 'Final Export & Automatic Documentation',
    category: 'Delivery & Deployment',
    icon: <Download className="w-6 h-6 text-emerald-400" />,
    summary: 'Exports standalone project ZIP and comprehensive markdown documentation.',
    details: [
      'Downloads complete ZIP archive with index.html, styles/style.css, scripts/app.js, and README.md.',
      'Generates auto-documentation with ASCII component tree and design token specifications.',
      'Works immediately when double-clicked or deployed to Netlify / GitHub Pages / Vercel.',
    ],
    keyHighlight: 'Complete, self-contained frontend project ready for immediate deployment.',
  },
];

export const PresentationModeModal: React.FC<PresentationModeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentIdx];

  const handleNext = () => {
    if (currentIdx < TOUR_STEPS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Presentation className="w-5 h-5 text-indigo-400" />
          <span>Sketch2Web — Judge Presentation Tour</span>
        </div>
      }
      subtitle="Complete 10-step guided architectural walkthrough of the Sketch2Web platform"
      maxWidth="4xl"
    >
      <div className="space-y-6 text-xs select-none">
        {/* Step Progress Pills */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentIdx(idx)}
              className={`py-1.5 rounded-lg text-center font-mono font-bold text-[11px] transition-all ${
                idx === currentIdx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                  : idx < currentIdx
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-950 text-slate-500 border border-slate-850 hover:text-slate-300'
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>

        {/* Step Content Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center shadow-lg">
                {currentStep.icon}
              </div>
              <div>
                <Badge variant="primary" size="sm">
                  {currentStep.category}
                </Badge>
                <h3 className="font-extrabold text-lg text-white mt-1">
                  Step {currentStep.step}: {currentStep.title}
                </h3>
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-indigo-400">
              {currentStep.step} / 10
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{currentStep.summary}</p>

          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Technical Implementation Highlights
            </div>
            <div className="space-y-1.5">
              {currentStep.details.map((detail, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-850 text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 font-semibold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Key Value: {currentStep.keyHighlight}</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-slate-400 text-xs">
            Use <strong className="text-white">Next</strong> to step through the entire judge demo
          </div>

          <button
            onClick={handleNext}
            disabled={currentIdx === TOUR_STEPS.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
