import React, { useState, useCallback } from 'react';
import {
  AiChangePlan,
  ComponentNode,
  ComponentType,
  DesignSystem,
  DetectedBox,
  Page,
  Project,
  VersionHistoryEntry,
  ViewportMode,
} from './types';
import { sampleProjects } from './data/sampleSketches';
import { defaultDesignSystem } from './core/defaultDesignSystem';
import { compileProject } from './core/compiler';
import { evaluateDesignFidelity } from './core/fidelityEvaluator';
import { analyzeUploadedImage } from './models/aiVisionModel';
import { planAiModification, generatePricingSection, generateContactSection } from './models/aiChangePlanner';

// Components
import { LandingUpload } from './components/upload/LandingUpload';
import { VisionScanModal } from './components/upload/VisionScanModal';
import { ArchitectureRecommendationModal } from './components/upload/ArchitectureRecommendationModal';
import { WorkspaceHeader } from './components/workspace/WorkspaceHeader';
import { LeftSidebar } from './components/workspace/LeftSidebar';
import { CanvasPreview } from './components/canvas/CanvasPreview';
import { PropertiesPanel } from './components/properties/PropertiesPanel';

// Modals
import { CodeEditorPanel } from './components/panels/CodeEditorPanel';
import { AiAssistantPanel } from './components/panels/AiAssistantPanel';
import { AiChangePlanModal } from './components/panels/AiChangePlanModal';
import { QualityCheckerModal } from './components/panels/QualityCheckerModal';
import { DocumentationModal } from './components/panels/DocumentationModal';
import { ExportModal } from './components/panels/ExportModal';
import { VersionHistoryModal } from './components/panels/VersionHistoryModal';
import { PresentationModeModal } from './components/panels/PresentationModeModal';
import { DebugPipelinePanel } from './components/panels/DebugPipelinePanel';

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function genId(type: string): string {
  return `${type}-${Math.random().toString(36).substring(2, 7)}`;
}

// Tree helper functions
function findNode(node: ComponentNode, id: string): ComponentNode | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

function updateNodeInTree(root: ComponentNode, updated: ComponentNode): ComponentNode {
  if (root.id === updated.id) return { ...updated };
  if (!root.children) return root;
  return {
    ...root,
    children: root.children.map((child) => updateNodeInTree(child, updated)),
  };
}

function deleteNodeInTree(root: ComponentNode, id: string): ComponentNode {
  if (!root.children) return root;
  return {
    ...root,
    children: root.children
      .filter((child) => child.id !== id)
      .map((child) => deleteNodeInTree(child, id)),
  };
}

function duplicateNodeInTree(root: ComponentNode, id: string): ComponentNode {
  if (!root.children) return root;
  const newChildren: ComponentNode[] = [];
  for (const child of root.children) {
    newChildren.push(duplicateNodeInTree(child, id));
    if (child.id === id) {
      const duplicated: ComponentNode = cloneDeep(child);
      duplicated.id = genId(child.type);
      duplicated.name = `${child.name} (Copy)`;
      newChildren.push(duplicated);
    }
  }
  return { ...root, children: newChildren };
}

function moveNodeInTree(root: ComponentNode, id: string, direction: 'up' | 'down'): ComponentNode {
  if (!root.children) return root;
  const idx = root.children.findIndex((c) => c.id === id);
  if (idx >= 0) {
    const newChildren = [...root.children];
    if (direction === 'up' && idx > 0) {
      const temp = newChildren[idx - 1];
      newChildren[idx - 1] = newChildren[idx];
      newChildren[idx] = temp;
    } else if (direction === 'down' && idx < newChildren.length - 1) {
      const temp = newChildren[idx + 1];
      newChildren[idx + 1] = newChildren[idx];
      newChildren[idx] = temp;
    }
    return { ...root, children: newChildren };
  }
  return {
    ...root,
    children: root.children.map((c) => moveNodeInTree(c, id, direction)),
  };
}

function createNewComponentNode(type: ComponentType): ComponentNode {
  const id = genId(type);
  switch (type) {
    case 'heading':
      return { id, type: 'heading', name: 'New Heading', props: { text: 'New Heading Title', level: 2 }, styles: { fontSize: '2rem', fontWeight: '700', color: '#f8fafc', margin: '0.5rem 0' } };
    case 'text':
      return { id, type: 'text', name: 'New Paragraph', props: { text: 'Add your engaging content description here.' }, styles: { color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' } };
    case 'button':
      return { id, type: 'button', name: 'New Button', props: { text: 'Click Here →' }, styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600' } };
    case 'badge':
      return { id, type: 'badge', name: 'New Badge', props: { text: '✨ Featured' }, styles: { backgroundColor: 'rgba(79, 70, 229, 0.15)', color: '#818cf8', width: 'fit-content' } };
    case 'image':
      return { id, type: 'image', name: 'New Image', props: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', alt: 'Visual Showcase' }, styles: { width: '100%', borderRadius: '12px', margin: '1rem 0' } };
    case 'card':
      return { id, type: 'card', name: 'New Card', props: {}, styles: { backgroundColor: '#151c2c', borderColor: '#243048', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }, children: [
        { id: genId('h'), type: 'heading', name: 'Card Title', props: { text: 'Feature Card Title', level: 3 }, styles: { fontSize: '1.25rem', color: '#f8fafc' } },
        { id: genId('p'), type: 'text', name: 'Card Description', props: { text: 'Concise summary of this product or service feature.' }, styles: { color: '#94a3b8', fontSize: '0.9rem' } },
      ] };
    case 'grid':
      return { id, type: 'grid', name: '3-Column Grid', props: {}, styles: { display: 'grid', gridColumns: 'repeat(3, 1fr)', gap: '1.5rem', margin: '1.5rem 0' }, children: [] };
    case 'section':
      return { id, type: 'section', name: 'New Section', props: {}, styles: { padding: '3rem 1.5rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '90%' }, children: [] };
    case 'container':
      return { id, type: 'container', name: 'Flex Container', props: {}, styles: { display: 'flex', gap: '1rem', alignItems: 'center' }, children: [] };
    case 'divider':
      return { id, type: 'divider', name: 'Divider', props: {}, styles: { borderColor: '#243048', margin: '1.5rem 0' } };
    case 'pricing-table':
      return generatePricingSection();
    case 'form':
      return generateContactSection();
    default:
      return { id, type: 'container', name: 'New Element', props: {}, styles: { padding: '1rem' } };
  }
}

export default function App() {
  // Screen Stage
  const [screen, setScreen] = useState<'upload' | 'workspace'>('upload');
  const [isScanningModalOpen, setIsScanningModalOpen] = useState(false);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);

  // Active Project & AST State
  const [project, setProject] = useState<Project>(sampleProjects.saas.project);
  const [sketchSvg, setSketchSvg] = useState<string>(sampleProjects.saas.sketchSvg);
  const [detectedBoxes, setDetectedBoxes] = useState<DetectedBox[]>(sampleProjects.saas.detectedBoxes);
  const [isAnalysisReady, setIsAnalysisReady] = useState(true);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);

  // Undo / Redo & Version History Stack
  const [history, setHistory] = useState<VersionHistoryEntry[]>([
    {
      id: 'v1-init',
      version: 1,
      timestamp: new Date().toISOString(),
      label: 'Initial Generation',
      description: 'Synthesized from hand-drawn sketch input',
      snapshot: cloneDeep(sampleProjects.saas.project),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Editor Viewport & Selection
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'tree' | 'add' | 'pages' | 'theme' | 'reference'>('tree');
  const [comparisonMode, setComparisonMode] = useState<'none' | 'side-by-side' | 'split-slider' | 'overlay'>('none');
  const [overlayOpacity, setOverlayOpacity] = useState(0.4);

  // Drawer & Modal Panels
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isQualityOpen, setIsQualityOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isPipelineDebugOpen, setIsPipelineDebugOpen] = useState(false);

  // AI Modification Plan State
  const [activeChangePlan, setActiveChangePlan] = useState<AiChangePlan | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Helper: Commit a new project state to undo/redo history
  const commitProjectUpdate = useCallback(
    (newProject: Project, label: string = 'Visual Modification', description: string = 'Updated component tree layout or styling') => {
      const fidelity = evaluateDesignFidelity(newProject);
      const projectWithFidelity = { ...newProject, fidelityBreakdown: fidelity };

      setProject(projectWithFidelity);

      const newVersion = history.length + 1;
      const newEntry: VersionHistoryEntry = {
        id: `v${newVersion}-${Date.now()}`,
        version: newVersion,
        timestamp: new Date().toISOString(),
        label,
        description,
        snapshot: cloneDeep(projectWithFidelity),
      };

      const updatedHistory = [...history.slice(0, historyIndex + 1), newEntry];
      setHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);
    },
    [history, historyIndex]
  );

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const target = historyIndex - 1;
      setHistoryIndex(target);
      setProject(cloneDeep(history[target].snapshot));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const target = historyIndex + 1;
      setHistoryIndex(target);
      setProject(cloneDeep(history[target].snapshot));
    }
  };

  const handleRestoreVersion = (entry: VersionHistoryEntry) => {
    setProject(cloneDeep(entry.snapshot));
    commitProjectUpdate(entry.snapshot, `Restored Version ${entry.version}`, `Rollback to ${entry.label}`);
  };

  // Upload Actions
  const handleSelectSample = async (key: 'saas' | 'ecommerce' | 'agency') => {
    const sample = sampleProjects[key];
    setSketchSvg(sample.sketchSvg);
    setDetectedBoxes(sample.detectedBoxes);
    setProject(sample.project);
    setAnalysisNotice(null);
    setIsAnalysisReady(true);

    setIsScanningModalOpen(true);
  };

  const handleUploadImage = async (file: File, type: 'sketch' | 'screenshot') => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setIsScanningModalOpen(true);
      setIsAnalysisReady(false);
      setAnalysisNotice(null);

      try {
        const analysis = await analyzeUploadedImage(dataUrl, type);
        setDetectedBoxes(analysis.detectedBoxes);
        setProject(analysis.project);
        setSketchSvg('');
        setAnalysisNotice(analysis.warning || null);
      } catch (error) {
        setAnalysisNotice(`Image analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsAnalysisReady(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalysisFinished = () => {
    setIsScanningModalOpen(false);
    setIsRecommendationModalOpen(true);
  };

  const handleAcceptArchitecture = () => {
    setIsRecommendationModalOpen(false);
    setScreen('workspace');
    setHistory([
      {
        id: 'v1-init',
        version: 1,
        timestamp: new Date().toISOString(),
        label: 'Initial Generation',
        description: 'Synthesized from analyzed design sketch',
        snapshot: cloneDeep(project),
      },
    ]);
    setHistoryIndex(0);
  };

  // Active page helpers
  const activePage = project.pages.find((p) => p.id === project.activePageId) || project.pages[0];
  const rootNode = activePage.rootComponent;
  const selectedNode = selectedNodeId ? findNode(rootNode, selectedNodeId) : null;

  // Node Mutations
  const handleUpdateNode = (updatedNode: ComponentNode) => {
    const newRoot = updateNodeInTree(rootNode, updatedNode);
    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: newRoot } : p));
    commitProjectUpdate({ ...project, pages: updatedPages }, `Edited ${updatedNode.name}`, `Modified properties of ${updatedNode.type}`);
  };

  const handleUpdateNodeText = (nodeId: string, text: string) => {
    const target = findNode(rootNode, nodeId);
    if (target) {
      const updated: ComponentNode = {
        ...target,
        props: { ...target.props, text },
      };
      handleUpdateNode(updated);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === rootNode.id) return;
    const target = findNode(rootNode, nodeId);
    const newRoot = deleteNodeInTree(rootNode, nodeId);
    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: newRoot } : p));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
    commitProjectUpdate({ ...project, pages: updatedPages }, `Deleted ${target?.name || 'Component'}`, `Removed node ${nodeId}`);
  };

  const handleDuplicateNode = (nodeId: string) => {
    const target = findNode(rootNode, nodeId);
    const newRoot = duplicateNodeInTree(rootNode, nodeId);
    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: newRoot } : p));
    commitProjectUpdate({ ...project, pages: updatedPages }, `Duplicated ${target?.name || 'Component'}`, `Created duplicate copy of ${nodeId}`);
  };

  const handleMoveNode = (nodeId: string, direction: 'up' | 'down') => {
    const newRoot = moveNodeInTree(rootNode, nodeId, direction);
    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: newRoot } : p));
    commitProjectUpdate({ ...project, pages: updatedPages }, `Reordered Element`, `Moved node ${nodeId} ${direction}`);
  };

  const handleAddComponent = (type: ComponentType) => {
    const newNode = createNewComponentNode(type);
    let newRoot = cloneDeep(rootNode);

    // If an element is selected and is a container/section/grid, insert inside; otherwise append to root
    if (selectedNode && ['section', 'container', 'grid', 'page'].includes(selectedNode.type)) {
      const target = findNode(newRoot, selectedNode.id);
      if (target) {
        target.children = target.children || [];
        target.children.push(newNode);
      }
    } else {
      newRoot.children = newRoot.children || [];
      const footerIdx = newRoot.children.findIndex((c) => c.type === 'footer');
      if (footerIdx >= 0) {
        newRoot.children.splice(footerIdx, 0, newNode);
      } else {
        newRoot.children.push(newNode);
      }
    }

    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: newRoot } : p));
    setSelectedNodeId(newNode.id);
    commitProjectUpdate({ ...project, pages: updatedPages }, `Added ${newNode.name}`, `Inserted new ${type} component`);
  };

  // Page Mutations
  const handleSelectPage = (pageId: string) => {
    setProject((prev) => ({ ...prev, activePageId: pageId }));
    setSelectedNodeId(null);
  };

  const handleAddPage = (name: string, template: 'blank' | 'duplicate' | 'ai-about' | 'ai-pricing' | 'ai-contact') => {
    const newId = genId('page');
    let newRoot: ComponentNode;

    if (template === 'duplicate') {
      newRoot = cloneDeep(rootNode);
      newRoot.id = genId('page-root');
    } else if (template === 'ai-pricing') {
      newRoot = {
        id: genId('pricing-root'),
        type: 'page',
        name: `${name} Page`,
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh', backgroundColor: project.designSystem.colors.background, color: project.designSystem.colors.text },
        children: [
          rootNode.children?.find((c) => c.type === 'navbar') || { id: genId('nav'), type: 'navbar', name: 'Navbar', props: {}, styles: { padding: '1rem' } },
          generatePricingSection(),
          rootNode.children?.find((c) => c.type === 'footer') || { id: genId('foot'), type: 'footer', name: 'Footer', props: {}, styles: { padding: '1rem' } },
        ],
      };
    } else if (template === 'ai-contact') {
      newRoot = {
        id: genId('contact-root'),
        type: 'page',
        name: `${name} Page`,
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh', backgroundColor: project.designSystem.colors.background, color: project.designSystem.colors.text },
        children: [
          rootNode.children?.find((c) => c.type === 'navbar') || { id: genId('nav'), type: 'navbar', name: 'Navbar', props: {}, styles: { padding: '1rem' } },
          generateContactSection(),
          rootNode.children?.find((c) => c.type === 'footer') || { id: genId('foot'), type: 'footer', name: 'Footer', props: {}, styles: { padding: '1rem' } },
        ],
      };
    } else {
      // Blank page
      newRoot = {
        id: genId('page-root'),
        type: 'page',
        name: `${name} Page`,
        props: {},
        styles: { display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh', backgroundColor: project.designSystem.colors.background, color: project.designSystem.colors.text },
        children: [
          rootNode.children?.find((c) => c.type === 'navbar') || { id: genId('nav'), type: 'navbar', name: 'Navbar', props: {}, styles: { padding: '1rem' } },
          { id: genId('sec'), type: 'section', name: 'Main Section', props: {}, styles: { padding: '4rem 1.5rem', textAlign: 'center' }, children: [
            { id: genId('h'), type: 'heading', name: 'Page Title', props: { text: name, level: 1 }, styles: { fontSize: '2.5rem' } },
            { id: genId('p'), type: 'text', name: 'Subtitle', props: { text: `Welcome to the ${name} page.` }, styles: { color: project.designSystem.colors.textMuted } },
          ]},
          rootNode.children?.find((c) => c.type === 'footer') || { id: genId('foot'), type: 'footer', name: 'Footer', props: {}, styles: { padding: '1rem' } },
        ],
      };
    }

    const newPage: Page = {
      id: newId,
      name,
      path: `/${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      icon: template.includes('pricing') ? '💎' : template.includes('contact') ? '📞' : '📄',
      rootComponent: newRoot,
      seoTitle: `${name} — ${project.name}`,
    };

    const updatedPages = [...project.pages, newPage];
    commitProjectUpdate({ ...project, pages: updatedPages, activePageId: newId }, `Created Page "${name}"`, `Template: ${template}`);
  };

  const handleDeletePage = (pageId: string) => {
    if (project.pages.length <= 1) return;
    const remaining = project.pages.filter((p) => p.id !== pageId);
    const nextActive = project.activePageId === pageId ? remaining[0].id : project.activePageId;
    commitProjectUpdate({ ...project, pages: remaining, activePageId: nextActive }, `Deleted Page`, `Removed page ${pageId}`);
  };

  const handleRenamePage = (pageId: string, newName: string) => {
    const updated = project.pages.map((p) => (p.id === pageId ? { ...p, name: newName } : p));
    commitProjectUpdate({ ...project, pages: updated }, `Renamed Page to "${newName}"`);
  };

  const handleUpdateDesignSystem = (updatedDs: DesignSystem) => {
    commitProjectUpdate({ ...project, designSystem: updatedDs }, `Updated Design System`, `Modified theme tokens`);
  };

  // AI Assistant Request Flow
  const handleRequestChangePlan = async (promptText: string) => {
    setIsAiLoading(true);
    try {
      const plan = await planAiModification(promptText, project, {
        selectedNode,
        viewport,
        detectedBoxes: project.detectedBoxes || detectedBoxes,
        referenceImage: project.originalImage,
      });
      setActiveChangePlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyChangePlan = (plan: AiChangePlan) => {
    setActiveChangePlan(null);
    commitProjectUpdate(plan.previewProject, `AI: ${plan.title}`, plan.summary);
  };

  // Quality Auto-fix
  const handleApplyFixedRoot = (fixedRoot: ComponentNode, count: number) => {
    const updatedPages = project.pages.map((p) => (p.id === activePage.id ? { ...p, rootComponent: fixedRoot } : p));
    commitProjectUpdate({ ...project, pages: updatedPages }, `Auto-Fixed Quality Issues`, `Resolved ${count} accessibility & responsive constraints`);
  };

  // Popout Standalone Preview in new browser window
  const handleOpenPreviewTab = () => {
    const compiled = compileProject(activePage.rootComponent, project.designSystem, activePage.name);
    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(compiled.fullDocument);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      {/* 1. Upload & Landing View */}
      {screen === 'upload' && (
        <LandingUpload
          onSelectSample={handleSelectSample}
          onUploadImage={handleUploadImage}
          onOpenPresentation={() => setIsPresentationOpen(true)}
        />
      )}

      {/* 2. Scanning Laser Modal */}
      <VisionScanModal
        isOpen={isScanningModalOpen}
        sketchSvg={sketchSvg}
        imageUrl={project.originalImage}
        detectedBoxes={detectedBoxes}
        isAnalysisReady={isAnalysisReady}
        onAnalysisComplete={handleAnalysisFinished}
      />

      {/* 3. AI Architecture Recommendation Modal */}
      <ArchitectureRecommendationModal
        isOpen={isRecommendationModalOpen}
        recommendation={project.architectureRecommendation}
        onAccept={handleAcceptArchitecture}
      />

      {/* 4. Main IDE Workspace */}
      {screen === 'workspace' && (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {analysisNotice && <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/30 text-amber-200 text-xs">{analysisNotice}</div>}
          {/* Header */}
          <WorkspaceHeader
            project={project}
            viewport={viewport}
            onViewportChange={setViewport}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
            onOpenQualityChecker={() => setIsQualityOpen(true)}
            onOpenDocumentation={() => setIsDocOpen(true)}
            onOpenExportModal={() => setIsExportOpen(true)}
            onOpenPresentation={() => setIsPresentationOpen(true)}
            onOpenDebugPanel={() => setIsPipelineDebugOpen(true)}
            onToggleCode={() => setIsCodeOpen((v) => !v)}
            isCodeOpen={isCodeOpen}
            onToggleAi={() => setIsAiOpen((v) => !v)}
            isAiOpen={isAiOpen}
            comparisonMode={comparisonMode}
            onComparisonModeChange={setComparisonMode}
            onSelectPage={handleSelectPage}
            onAddPage={() => handleAddPage('New Page', 'blank')}
            onRenameProject={(name) => commitProjectUpdate({ ...project, name }, `Renamed Project to "${name}"`)}
            onOpenPreviewTab={handleOpenPreviewTab}
          />

          {/* Core Body: Left Sidebar + Center Canvas + Right Properties */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left Sidebar */}
            <LeftSidebar
              project={project}
              activeTab={activeSidebarTab}
              onTabChange={setActiveSidebarTab}
              rootNode={rootNode}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              onUpdateNode={handleUpdateNode}
              onDeleteNode={handleDeleteNode}
              onDuplicateNode={handleDuplicateNode}
              onMoveNode={handleMoveNode}
              onAddComponent={handleAddComponent}
              onSelectPage={handleSelectPage}
              onAddPage={handleAddPage}
              onDeletePage={handleDeletePage}
              onRenamePage={handleRenamePage}
              onUpdateDesignSystem={handleUpdateDesignSystem}
              sketchSvg={sketchSvg}
              comparisonMode={comparisonMode}
              onComparisonModeChange={setComparisonMode}
              overlayOpacity={overlayOpacity}
              onOverlayOpacityChange={setOverlayOpacity}
            />

            {/* Center Live Canvas Preview */}
            <CanvasPreview
              project={project}
              viewport={viewport}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              onUpdateNodeText={handleUpdateNodeText}
              onDuplicateNode={handleDuplicateNode}
              onDeleteNode={handleDeleteNode}
              onMoveNode={handleMoveNode}
              onOpenAiForNode={(nodeId) => {
                setSelectedNodeId(nodeId);
                setIsAiOpen(true);
              }}
              comparisonMode={comparisonMode}
              overlayOpacity={overlayOpacity}
              sketchSvg={sketchSvg}
              onOpenPreviewTab={handleOpenPreviewTab}
            />

            {/* Right Properties Inspector */}
            <PropertiesPanel
              selectedNode={selectedNode}
              onUpdateNode={handleUpdateNode}
              onDeleteNode={handleDeleteNode}
              onDuplicateNode={handleDuplicateNode}
              onMoveNode={handleMoveNode}
              onOpenAiForNode={(nodeId) => {
                setSelectedNodeId(nodeId);
                setIsAiOpen(true);
              }}
            />
          </div>

          {/* Synchronized Code Editor Drawer */}
          <CodeEditorPanel
            isOpen={isCodeOpen}
            onClose={() => setIsCodeOpen(false)}
            rootNode={rootNode}
            designSystem={project.designSystem}
            pageName={activePage.name}
          />

          {/* AI Assistant Chat Sidebar */}
          <AiAssistantPanel
            isOpen={isAiOpen}
            onClose={() => setIsAiOpen(false)}
            project={project}
            onRequestChangePlan={handleRequestChangePlan}
            isLoading={isAiLoading}
          />
        </div>
      )}

      {/* AI Change Plan Confirmation Modal */}
      <AiChangePlanModal
        isOpen={!!activeChangePlan}
        onClose={() => setActiveChangePlan(null)}
        plan={activeChangePlan}
        onApplyPlan={handleApplyChangePlan}
      />

      {/* Quality & Accessibility Audit Modal */}
      <QualityCheckerModal
        isOpen={isQualityOpen}
        onClose={() => setIsQualityOpen(false)}
        rootNode={rootNode}
        onApplyFixedRoot={handleApplyFixedRoot}
      />

      {/* Auto Documentation Modal */}
      <DocumentationModal
        isOpen={isDocOpen}
        onClose={() => setIsDocOpen(false)}
        project={project}
      />

      {/* Export Website Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        project={project}
        onOpenPreviewTab={handleOpenPreviewTab}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
        history={history}
        currentVersion={history[historyIndex]?.version || 1}
        onRestoreVersion={handleRestoreVersion}
      />

      {/* Presentation Tour Modal */}
      <PresentationModeModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {/* Pipeline Debug Inspector Modal */}
      <DebugPipelinePanel
        isOpen={isPipelineDebugOpen}
        onClose={() => setIsPipelineDebugOpen(false)}
        detectedBoxes={project.detectedBoxes || detectedBoxes}
        layoutRelationships={project.layoutRelationships}
        rootNode={rootNode}
        designSystem={project.designSystem}
        pageName={activePage.name}
        analysisProvider={project.analysisProvider}
        analysisWarning={project.analysisWarning}
      />
    </div>
  );
}
