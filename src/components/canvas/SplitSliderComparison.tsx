import React, { useState, useRef, useEffect } from 'react';
import { SplitSquareVertical } from 'lucide-react';
import { Badge } from '../common/Badge';

interface SplitSliderComparisonProps {
  sketchSvg?: string;
  imageUrl?: string;
  compiledHtml: string;
}

export const SplitSliderComparison: React.FC<SplitSliderComparisonProps> = ({
  sketchSvg,
  imageUrl,
  compiledHtml,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-slate-950 select-none overflow-hidden flex flex-col"
    >
      {/* Top Slider Header Bar */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-20 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            <SplitSquareVertical className="w-3 h-3" />
            Comparison Slider
          </Badge>
          <span className="text-slate-400 font-medium">Drag divider to compare visual fidelity</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-indigo-400 font-mono">ORIGINAL SKETCH ({Math.round(sliderPos)}%)</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-mono">GENERATED WEBSITE ({Math.round(100 - sliderPos)}%)</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* Right Side: Generated Website (Full Width underneath) */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
          <iframe
            srcDoc={compiledHtml}
            title="Generated Website Preview"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts"
          />
        </div>

        {/* Left Side: Original Sketch (Clipped at sliderPos) */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute inset-y-0 left-0 h-full bg-slate-950 border-r-2 border-indigo-500 overflow-hidden shadow-2xl z-10"
        >
          <div className="w-[100vw] max-w-[1280px] h-full p-4 overflow-y-auto">
            {sketchSvg ? (
              <div
                className="w-full h-auto min-h-[900px]"
                dangerouslySetInnerHTML={{ __html: sketchSvg }}
              />
            ) : imageUrl ? (
              <img src={imageUrl} alt="Original" className="w-full h-auto object-contain" />
            ) : (
              <div className="text-slate-500 text-center py-20">No original sketch image</div>
            )}
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          style={{ left: `calc(${sliderPos}% - 16px)` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="absolute top-1/2 -translate-y-1/2 z-30 w-8 h-14 bg-indigo-600 hover:bg-indigo-500 border-2 border-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform hover:scale-110 active:scale-95"
          title="Drag left or right"
        >
          <div className="flex gap-0.5 text-white font-bold text-[10px]">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
};
