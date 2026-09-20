import React, { useState } from 'react';
import { Layers, PlusCircle, Files, Palette, Image as ImageIcon } from 'lucide-react';
import { ComponentNode, ComponentType, DesignSystem, Project } from '../../types';
import { ComponentTreePanel } from './ComponentTreePanel';
import { AddComponentsPanel } from './AddComponentsPanel';
import { PageManagerPanel } from './PageManagerPanel';
import { DesignSystemPanel } from './DesignSystemPanel';
import { SketchReferencePanel } from './SketchReferencePanel';

interface LeftSidebarProps {
  project: Project;
  activeTab: 'tree' | 'add' | 'pages' | 'theme' | 'reference';
  onTabChange: (tab: 'tree' | 'add' | 'pages' | 'theme' | 'reference') => void;
  rootNode: ComponentNode;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNode: (updatedNode: ComponentNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
  onAddComponent: (type: ComponentType) => void;
  onSelectPage: (pageId: string) => void;
  onAddPage: (name: string, template: 'blank' | 'duplicate' | 'ai-about' | 'ai-pricing' | 'ai-contact') => void;
  onDeletePage: (pageId: string) => void;
  onRenamePage: (pageId: string, newName: string) => void;
  onUpdateDesignSystem: (updatedDs: DesignSystem) => void;
  sketchSvg?: string;
  comparisonMode: 'none' | 'side-by-side' | 'split-slider' | 'overlay';
  onComparisonModeChange: (mode: 'none' | 'side-by-side' | 'split-slider' | 'overlay') => void;
  overlayOpacity: number;
  onOverlayOpacityChange: (opacity: number) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  project,
  activeTab,
  onTabChange,
  rootNode,
  selectedNodeId,
  onSelectNode,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  onMoveNode,
  onAddComponent,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onRenamePage,
  onUpdateDesignSystem,
  sketchSvg,
  comparisonMode,
  onComparisonModeChange,
  overlayOpacity,
  onOverlayOpacityChange,
}) => {
  const tabs = [
    { id: 'tree', label: 'AST Layers', icon: <Layers className="w-4 h-4" /> },
    { id: 'add', label: 'Add Element', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'pages', label: 'Pages', icon: <Files className="w-4 h-4" /> },
    { id: 'theme', label: 'Design System', icon: <Palette className="w-4 h-4" /> },
    { id: 'reference', label: 'Correction', icon: <ImageIcon className="w-4 h-4" /> },
  ] as const;

  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col shrink-0 z-20 overflow-hidden select-none">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/80 p-1 gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex-1 py-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all ${
              activeTab === t.id
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title={t.label}
          >
            {t.icon}
            <span className="truncate">{t.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tree' && (
          <ComponentTreePanel
            rootNode={rootNode}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            onUpdateNode={onUpdateNode}
            onDeleteNode={onDeleteNode}
            onDuplicateNode={onDuplicateNode}
            onMoveNode={onMoveNode}
            onAddChild={(parentId, type) => onAddComponent(type)}
          />
        )}
        {activeTab === 'add' && <AddComponentsPanel onAddComponent={onAddComponent} />}
        {activeTab === 'pages' && (
          <PageManagerPanel
            project={project}
            onSelectPage={onSelectPage}
            onAddPage={onAddPage}
            onDeletePage={onDeletePage}
            onRenamePage={onRenamePage}
          />
        )}
        {activeTab === 'theme' && (
          <DesignSystemPanel
            designSystem={project.designSystem}
            onUpdateDesignSystem={onUpdateDesignSystem}
          />
        )}
        {activeTab === 'reference' && (
          <SketchReferencePanel
            project={project}
            sketchSvg={sketchSvg}
            comparisonMode={comparisonMode}
            onComparisonModeChange={onComparisonModeChange}
            overlayOpacity={overlayOpacity}
            onOverlayOpacityChange={onOverlayOpacityChange}
          />
        )}
      </div>
    </aside>
  );
};
