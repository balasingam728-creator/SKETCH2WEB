import React from 'react';
import { Palette, Sun, Moon, Type, Layers, RefreshCw } from 'lucide-react';
import { DesignSystem } from '../../types';
import { defaultDesignSystem, lightDesignSystem } from '../../core/defaultDesignSystem';

interface DesignSystemPanelProps {
  designSystem: DesignSystem;
  onUpdateDesignSystem: (updatedDs: DesignSystem) => void;
}

export const DesignSystemPanel: React.FC<DesignSystemPanelProps> = ({
  designSystem,
  onUpdateDesignSystem,
}) => {
  const updateColor = (key: keyof DesignSystem['colors'], value: string) => {
    onUpdateDesignSystem({
      ...designSystem,
      colors: {
        ...designSystem.colors,
        [key]: value,
      },
    });
  };

  const toggleThemeMode = () => {
    if (designSystem.themeMode === 'dark') {
      onUpdateDesignSystem({ ...lightDesignSystem, themeMode: 'light' });
    } else {
      onUpdateDesignSystem({ ...defaultDesignSystem, themeMode: 'dark' });
    }
  };

  const buttonStyles: Array<DesignSystem['buttonStyle']> = ['rounded', 'pill', 'square', 'glass'];

  return (
    <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar h-full text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
          Design System Tokens
        </span>
        <button
          onClick={toggleThemeMode}
          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors"
        >
          {designSystem.themeMode === 'dark' ? (
            <>
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3 h-3 text-indigo-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Color Tokens Palette */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Color Palette
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {/* Primary */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Primary Brand</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.primary}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.primary}
              onChange={(e) => updateColor('primary', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>

          {/* Secondary / Accent */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Accent</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.accent}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.accent}
              onChange={(e) => updateColor('accent', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>

          {/* Background */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Background</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.background}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.background}
              onChange={(e) => updateColor('background', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>

          {/* Surface */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Card Surface</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.surface}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.surface}
              onChange={(e) => updateColor('surface', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>

          {/* Text */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Text</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.text}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.text}
              onChange={(e) => updateColor('text', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>

          {/* Border */}
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-850 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-slate-300">Border</div>
              <div className="text-[10px] text-slate-500 font-mono">{designSystem.colors.border}</div>
            </div>
            <input
              type="color"
              value={designSystem.colors.border}
              onChange={(e) => updateColor('border', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
          </div>
        </div>
      </div>

      {/* Button Presets */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Button Styling Shape
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {buttonStyles.map((style) => (
            <button
              key={style}
              onClick={() => {
                const radius = style === 'pill' ? '9999px' : style === 'square' ? '0px' : '10px';
                onUpdateDesignSystem({
                  ...designSystem,
                  buttonStyle: style,
                  spacing: { ...designSystem.spacing, radius },
                });
              }}
              className={`p-2 rounded-lg border text-center font-semibold capitalize transition-all ${
                designSystem.buttonStyle === style
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Typography Tokens */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Typography Stack
        </h4>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-2">
          <div>
            <label className="text-[10px] text-slate-500 block">Font Family</label>
            <select
              value={designSystem.typography.fontFamily.split(',')[0].replace(/'/g, '')}
              onChange={(e) =>
                onUpdateDesignSystem({
                  ...designSystem,
                  typography: {
                    ...designSystem.typography,
                    fontFamily: `'${e.target.value}', -apple-system, sans-serif`,
                    headingFontFamily: `'${e.target.value}', -apple-system, sans-serif`,
                  },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-1"
            >
              <option value="Inter">Inter (Clean Modern)</option>
              <option value="Roboto">Roboto (Google Standard)</option>
              <option value="Poppins">Poppins (Geometric Display)</option>
              <option value="JetBrains Mono">JetBrains Mono (Developer)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 block">Base Font Size</label>
            <select
              value={designSystem.typography.baseFontSize}
              onChange={(e) =>
                onUpdateDesignSystem({
                  ...designSystem,
                  typography: { ...designSystem.typography, baseFontSize: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-1"
            >
              <option value="14px">14px (Compact)</option>
              <option value="16px">16px (Standard Recommended)</option>
              <option value="18px">18px (Large / High Legibility)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
