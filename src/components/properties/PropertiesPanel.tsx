import React from 'react';
import {
  Type,
  Square,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Bot,
  Sliders,
  Palette,
  Layers,
} from 'lucide-react';
import { ComponentNode, ComponentStyles, ComponentType } from '../../types';
import { Badge } from '../common/Badge';

interface PropertiesPanelProps {
  selectedNode: ComponentNode | null;
  onUpdateNode: (updatedNode: ComponentNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
  onOpenAiForNode: (nodeId: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  onMoveNode,
  onOpenAiForNode,
}) => {
  if (!selectedNode) {
    return (
      <aside className="w-80 border-l border-slate-800 bg-slate-900/70 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-slate-500 text-xs shrink-0 select-none">
        <Sliders className="w-8 h-8 text-slate-700 mb-2" />
        <div className="font-bold text-slate-400">No Component Selected</div>
        <p className="text-[11px] text-slate-600 mt-1 max-w-[200px]">
          Click any element on the visual preview or layers tree to inspect and customize its properties.
        </p>
      </aside>
    );
  }

  const updateProp = (key: string, val: any) => {
    onUpdateNode({
      ...selectedNode,
      props: {
        ...selectedNode.props,
        [key]: val,
      },
    });
  };

  const updateStyle = (key: keyof ComponentStyles, val: any) => {
    onUpdateNode({
      ...selectedNode,
      styles: {
        ...selectedNode.styles,
        [key]: val,
      },
    });
  };

  const styles = selectedNode.styles || {};
  const props = selectedNode.props || {};
  const componentTypes: ComponentType[] = ['section', 'container', 'grid', 'navbar', 'hero', 'heading', 'text', 'button', 'image', 'card', 'input', 'form', 'footer', 'badge', 'divider', 'video', 'accordion', 'pricing-table', 'testimonial'];

  return (
    <aside className="w-80 border-l border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col shrink-0 z-20 overflow-hidden select-none text-xs">
      {/* Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="primary" size="sm" className="capitalize">
            {selectedNode.type}
          </Badge>
          <input
            type="text"
            value={selectedNode.name}
            onChange={(e) => onUpdateNode({ ...selectedNode, name: e.target.value })}
            className="bg-transparent text-white font-bold text-xs truncate focus:outline-none border-b border-transparent focus:border-indigo-500 w-32"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicateNode(selectedNode.id)}
            className="p-1 hover:text-white text-slate-400 rounded hover:bg-slate-800"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {selectedNode.type !== 'page' && (
            <button
              onClick={() => onDeleteNode(selectedNode.id)}
              className="p-1 hover:text-rose-400 text-slate-400 rounded hover:bg-slate-800"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Properties List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
        {/* 1. Content & Text Props */}
        {(props.text !== undefined || ['heading', 'text', 'button', 'badge'].includes(selectedNode.type)) && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Content Text
            </label>
            <textarea
              value={props.text || ''}
              onChange={(e) => updateProp('text', e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="Element text content..."
            />
          </div>
        )}

        {/* Image Source & Alt */}
        {selectedNode.type === 'image' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Image URL (src)</label>
              <input
                type="text"
                value={props.src || ''}
                onChange={(e) => updateProp('src', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Alt Description (A11y)</label>
              <input
                type="text"
                value={props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* Input Placeholder & Aria */}
        {selectedNode.type === 'input' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Placeholder</label>
              <input
                type="text"
                value={props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Aria Label</label>
              <input
                type="text"
                value={props.ariaLabel || ''}
                onChange={(e) => updateProp('ariaLabel', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* 2. Layout & Alignment */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Detected Component Type</label>
          <select
            value={selectedNode.type}
            onChange={(e) => onUpdateNode({ ...selectedNode, type: e.target.value as ComponentType })}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {componentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        {selectedNode.sourceBounds && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Source Geometry</label>
            <div className="grid grid-cols-2 gap-2">
              {(['x', 'y', 'width', 'height'] as const).map((key) => (
                <label key={key} className="text-[10px] text-slate-500">
                  {key.toUpperCase()}
                  <input
                    type="number"
                    value={Math.round(selectedNode.sourceBounds?.[key] || 0)}
                    onChange={(e) => {
                      const sourceBounds = { ...selectedNode.sourceBounds!, [key]: Number(e.target.value) };
                      onUpdateNode({ ...selectedNode, sourceBounds });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 2. Layout & Alignment */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Layout &amp; Flexbox
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Display</label>
              <select
                value={styles.display || 'flex'}
                onChange={(e: any) => updateStyle('display', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-0.5"
              >
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
                <option value="block">Block</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Direction</label>
              <select
                value={styles.flexDirection || 'column'}
                onChange={(e: any) => updateStyle('flexDirection', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-0.5"
              >
                <option value="row">Row (Horizontal)</option>
                <option value="column">Column (Vertical)</option>
              </select>
            </div>
          </div>

          {styles.display === 'grid' && (
            <div>
              <label className="text-[10px] text-slate-500 block">Grid Columns</label>
              <input
                type="text"
                value={styles.gridColumns || 'repeat(3, 1fr)'}
                onChange={(e) => updateStyle('gridColumns', e.target.value)}
                placeholder="repeat(3, 1fr)"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Align Items</label>
              <select
                value={styles.alignItems || 'stretch'}
                onChange={(e: any) => updateStyle('alignItems', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-0.5"
              >
                <option value="flex-start">Start</option>
                <option value="center">Center</option>
                <option value="flex-end">End</option>
                <option value="stretch">Stretch</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Justify Content</label>
              <select
                value={styles.justifyContent || 'flex-start'}
                onChange={(e: any) => updateStyle('justifyContent', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-0.5"
              >
                <option value="flex-start">Start</option>
                <option value="center">Center</option>
                <option value="flex-end">End</option>
                <option value="space-between">Between</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 block">Gap Spacing</label>
            <input
              type="text"
              value={styles.gap || ''}
              onChange={(e) => updateStyle('gap', e.target.value)}
              placeholder="e.g. 1rem, 1.5rem"
              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
            />
          </div>
        </div>

        {/* 3. Dimensions & Padding */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Dimensions &amp; Spacing
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Width</label>
              <input
                type="text"
                value={styles.width || ''}
                onChange={(e) => updateStyle('width', e.target.value)}
                placeholder="100%, 900px"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Max Width</label>
              <input
                type="text"
                value={styles.maxWidth || ''}
                onChange={(e) => updateStyle('maxWidth', e.target.value)}
                placeholder="1100px"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Padding</label>
              <input
                type="text"
                value={styles.padding || ''}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="1.5rem 2rem"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Margin</label>
              <input
                type="text"
                value={styles.margin || ''}
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="0 auto"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* 4. Typography & Appearance */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Typography &amp; Colors
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Font Size</label>
              <input
                type="text"
                value={styles.fontSize || ''}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                placeholder="1rem, 2rem"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Font Weight</label>
              <select
                value={styles.fontWeight || '400'}
                onChange={(e: any) => updateStyle('fontWeight', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 mt-0.5"
              >
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi-Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Text Color</label>
              <input
                type="text"
                value={styles.color || ''}
                onChange={(e) => updateStyle('color', e.target.value)}
                placeholder="#f8fafc"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Background</label>
              <input
                type="text"
                value={styles.backgroundColor || ''}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                placeholder="#151c2c"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-500 block">Border Radius</label>
              <input
                type="text"
                value={styles.borderRadius || ''}
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                placeholder="8px, 12px, 9999px"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Border Color</label>
              <input
                type="text"
                value={styles.borderColor || ''}
                onChange={(e) => updateStyle('borderColor', e.target.value)}
                placeholder="#243048"
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white mt-0.5"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5">
          <button
            onClick={() => onOpenAiForNode(selectedNode.id)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/40 transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Edit this Component</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
