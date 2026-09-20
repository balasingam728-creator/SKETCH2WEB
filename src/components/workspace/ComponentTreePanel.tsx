import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Layout,
  Type,
  Square,
  Image as ImageIcon,
  Columns,
  Sparkles,
  Plus,
  Edit2,
  Lock,
  Unlock,
} from 'lucide-react';
import { ComponentNode, ComponentType } from '../../types';

interface ComponentTreePanelProps {
  rootNode: ComponentNode;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNode: (updatedNode: ComponentNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
  onAddChild: (parentNodeId: string, type: ComponentType) => void;
}

const getComponentIcon = (type: ComponentType) => {
  switch (type) {
    case 'page':
    case 'section':
    case 'container':
      return <Layout className="w-3.5 h-3.5 text-indigo-400" />;
    case 'navbar':
    case 'footer':
      return <Layout className="w-3.5 h-3.5 text-cyan-400" />;
    case 'hero':
      return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    case 'grid':
    case 'card':
      return <Columns className="w-3.5 h-3.5 text-emerald-400" />;
    case 'heading':
    case 'text':
    case 'badge':
      return <Type className="w-3.5 h-3.5 text-purple-400" />;
    case 'button':
      return <Square className="w-3.5 h-3.5 text-blue-400" />;
    case 'image':
    case 'video':
      return <ImageIcon className="w-3.5 h-3.5 text-rose-400" />;
    default:
      return <Layout className="w-3.5 h-3.5 text-slate-400" />;
  }
};

const TreeNode: React.FC<{
  node: ComponentNode;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNode: (updatedNode: ComponentNode) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
  onAddChild: (parentNodeId: string, type: ComponentType) => void;
  depth?: number;
}> = ({
  node,
  selectedNodeId,
  onSelectNode,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  onMoveNode,
  onAddChild,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);

  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNodeId === node.id;

  const handleNameSave = () => {
    setIsEditing(false);
    if (editName.trim() && editName !== node.name) {
      onUpdateNode({ ...node, name: editName.trim() });
    }
  };

  const toggleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateNode({ ...node, hidden: !node.hidden });
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateNode({ ...node, locked: !node.locked });
  };

  return (
    <div className="flex flex-col select-none text-xs">
      <div
        onClick={() => onSelectNode(node.id)}
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
        className={`group flex items-center justify-between py-1.5 pr-2 rounded-lg cursor-pointer transition-colors ${
          isSelected
            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
            : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
        } ${node.hidden ? 'opacity-40' : ''}`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-0.5 text-slate-500 hover:text-slate-300 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <span className="w-4" />
          )}

          {getComponentIcon(node.type)}

          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
              autoFocus
              className="bg-slate-950 text-white px-1 py-0.5 rounded border border-indigo-500 text-xs w-28"
            />
          ) : (
            <span
              onDoubleClick={() => setIsEditing(true)}
              className="truncate font-medium"
              title={`${node.name} (${node.type}) - Double click to rename`}
            >
              {node.name}
            </span>
          )}
        </div>

        {/* Action icons on hover */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
          <button
            onClick={toggleHide}
            className="p-1 hover:text-white rounded"
            title={node.hidden ? 'Show element' : 'Hide element'}
          >
            {node.hidden ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveNode(node.id, 'up');
            }}
            className="p-1 hover:text-white rounded"
            title="Move Up"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveNode(node.id, 'down');
            }}
            className="p-1 hover:text-white rounded"
            title="Move Down"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicateNode(node.id);
            }}
            className="p-1 hover:text-white rounded"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>
          {node.type !== 'page' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNode(node.id);
              }}
              className="p-1 hover:text-rose-400 rounded text-slate-400"
              title="Delete Component"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
              onUpdateNode={onUpdateNode}
              onDeleteNode={onDeleteNode}
              onDuplicateNode={onDuplicateNode}
              onMoveNode={onMoveNode}
              onAddChild={onAddChild}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ComponentTreePanel: React.FC<ComponentTreePanelProps> = (props) => {
  return (
    <div className="p-3 flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Component Tree (AST Core)
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Source of Truth</span>
      </div>

      <div className="flex-1 space-y-0.5">
        <TreeNode {...props} node={props.rootNode} depth={0} />
      </div>
    </div>
  );
};
