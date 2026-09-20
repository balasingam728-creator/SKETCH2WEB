import React from 'react';
import { History, RotateCcw, Check, Clock, Sparkles } from 'lucide-react';
import { VersionHistoryEntry } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: VersionHistoryEntry[];
  currentVersion: number;
  onRestoreVersion: (version: VersionHistoryEntry) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  currentVersion,
  onRestoreVersion,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <span>Version History &amp; Timeline</span>
        </div>
      }
      subtitle="Restore previous states or review modifications applied by visual edits &amp; AI"
      maxWidth="lg"
    >
      <div className="space-y-3 text-xs">
        {history.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No snapshot history recorded yet.</div>
        ) : (
          history.map((entry) => {
            const isCurrent = entry.version === currentVersion;
            return (
              <div
                key={entry.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isCurrent
                    ? 'bg-indigo-950/30 border-indigo-500/50'
                    : 'bg-slate-950/60 border-slate-850 hover:bg-slate-850/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    v{entry.version}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-200">
                      <span>{entry.label}</span>
                      {isCurrent && <Badge variant="primary" size="sm">Current Active</Badge>}
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{entry.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                {!isCurrent && (
                  <button
                    onClick={() => {
                      onRestoreVersion(entry);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white font-semibold transition-colors shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
};
