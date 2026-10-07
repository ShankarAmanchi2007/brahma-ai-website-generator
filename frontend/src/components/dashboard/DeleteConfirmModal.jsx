import React from 'react';
import Modal from '../common/Modal';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, project, loading }) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Project">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <p>
            Are you sure you want to permanently delete <strong className="text-white">"{project.projectName}"</strong>? All generated code, message history, and file records will be deleted.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1a1a1a]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold text-neutral-300 hover:text-white hover:bg-[#141414] transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete Project
          </button>
        </div>
      </div>
    </Modal>
  );
}
