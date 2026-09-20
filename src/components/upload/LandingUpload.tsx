import React, { useRef, useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Layout, ArrowRight, Play, Presentation, Palette, ShoppingBag } from 'lucide-react';
import { Badge } from '../common/Badge';

interface LandingUploadProps {
  onSelectSample: (key: 'saas' | 'ecommerce' | 'agency') => void;
  onUploadImage: (file: File, type: 'sketch' | 'screenshot') => void;
  onOpenPresentation: () => void;
}

export const LandingUpload: React.FC<LandingUploadProps> = ({
  onSelectSample,
  onUploadImage,
  onOpenPresentation,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadType, setUploadType] = useState<'sketch' | 'screenshot'>('sketch');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0], uploadType);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadImage(e.dataTransfer.files[0], uploadType);
    }
  };

  const triggerUpload = (type: 'sketch' | 'screenshot') => {
    setUploadType(type);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-slate-850 bg-slate-925/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-tight">Sketch2Web</h1>
              <Badge variant="primary" size="sm">AI Visual IDE</Badge>
            </div>
            <p className="text-xs text-slate-400">Turn hand-drawn sketches & screenshots into responsive HTML/CSS/JS</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all hover:scale-105"
          >
            <Presentation className="w-3.5 h-3.5 text-indigo-400" />
            <span>Judge Presentation Tour</span>
          </button>
          <button
            onClick={() => onSelectSample('saas')}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Try Demo Mode</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
        {/* Tagline */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Visual Web Engineering</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          From your sketch to a <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            working website.
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">
          Sketch it. Analyze it. Build it. Edit it. Talk to it. Export it. <br className="hidden sm:inline" />
          Zero framework lock-in — exports 100% clean, responsive <strong className="text-slate-200 font-semibold">HTML5, CSS3 &amp; ES6 JavaScript</strong>.
        </p>

        {/* Upload Action Area */}
        <div className="mt-10 w-full max-w-2xl flex flex-col gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => triggerUpload('sketch')}
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-indigo-500/30 hover:border-indigo-500/70 shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col items-center gap-3 text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                <Layout className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-300 transition-colors">
                  Upload Hand-Drawn Sketch
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Photos of paper sketches, whiteboard drawings, or digital doodles
                </p>
              </div>
              <Badge variant="primary" size="sm">Supports Wireframes</Badge>
            </button>

            <button
              onClick={() => triggerUpload('screenshot')}
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-cyan-500/30 hover:border-cyan-500/70 shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col items-center gap-3 text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-inner">
                <ImageIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                  Upload Website Screenshot
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Screenshots of existing websites or UI Figma mockups
                </p>
              </div>
              <Badge variant="info" size="sm">High Fidelity</Badge>
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 transition-all flex items-center justify-center gap-3 ${
              dragOver
                ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <Upload className="w-5 h-5 text-slate-400 animate-bounce" />
            <span className="text-xs text-slate-400 font-medium">
              or drag &amp; drop any PNG, JPG, or SVG image file directly here
            </span>
          </div>
        </div>

        {/* Demo Samples Section (3 Distinct Presets) */}
        <div className="mt-14 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-5 px-2">
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Instant Demo Showcases (No Upload Needed)
              </h3>
              <p className="text-xs text-slate-400">Click any pre-loaded sketch dataset to experience the entire workflow instantly</p>
            </div>
            <Badge variant="neutral" size="sm">3 Distinct Presets</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* SaaS Sample */}
            <div
              onClick={() => onSelectSample('saas')}
              className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all text-left cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <Badge variant="primary" size="sm">SaaS Platform</Badge>
                <h4 className="text-base font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                  NovaSaaS AI Platform
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Navigation, hero with badges, 3 metric counters, 3-column features grid, and footer.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>22 Components</span>
                <span className="text-emerald-400 font-semibold">93% Fidelity</span>
              </div>
            </div>

            {/* E-Commerce Sample */}
            <div
              onClick={() => onSelectSample('ecommerce')}
              className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 transition-all text-left cursor-pointer hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <Badge variant="info" size="sm">E-Commerce</Badge>
                <h4 className="text-base font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                  UrbanAura Storefront
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Promo bar, search input, cart button, 4-product responsive card grid, and newsletter form.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>20 Components</span>
                <span className="text-emerald-400 font-semibold">91% Fidelity</span>
              </div>
            </div>

            {/* Creative Agency / Portfolio Sample */}
            <div
              onClick={() => onSelectSample('agency')}
              className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/60 transition-all text-left cursor-pointer hover:shadow-xl hover:shadow-rose-500/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <Badge variant="danger" size="sm">Creative Portfolio</Badge>
                <h4 className="text-base font-bold text-white mt-2 group-hover:text-rose-400 transition-colors">
                  Studio Kinetic Agency
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Split hero, 2-column work project showcase, 3-column capabilities list, and contact banner.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>16 Components</span>
                <span className="text-emerald-400 font-semibold">94% Fidelity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850">
            <div className="text-indigo-400 font-bold text-sm">1. Visual AST Core</div>
            <p className="text-xs text-slate-400 mt-1">Intermediate Component Tree as true source of truth.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850">
            <div className="text-cyan-400 font-bold text-sm">2. Layout-Aware Inference</div>
            <p className="text-xs text-slate-400 mt-1">No absolute positioning; strict Flexbox &amp; Grid semantics.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850">
            <div className="text-emerald-400 font-bold text-sm">3. Visual ↔ Code Sync</div>
            <p className="text-xs text-slate-400 mt-1">Real-time compilation with instant live preview updates.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-850">
            <div className="text-amber-400 font-bold text-sm">4. Pure HTML/CSS/JS</div>
            <p className="text-xs text-slate-400 mt-1">Exportable standalone ZIP ready to run in any browser.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
