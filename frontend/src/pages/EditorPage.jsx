import React, { useEffect, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import EditorTopBar from '../components/editor/EditorTopBar';
import AIChatPanel from '../components/editor/AIChatPanel';
import LivePreview from '../components/editor/LivePreview';
import FileExplorer from '../components/editor/FileExplorer';
import DeployModal from '../components/editor/DeployModal';
import { Loader2 } from 'lucide-react';

export default function EditorPage({ projectId, onBack, initialAction }) {
  const { loadProjectDetails, currentProject, activeTab, projectDetailLoading, projectError } = useProject();
  const [isDeployOpen, setIsDeployOpen] = useState(initialAction === 'deploy');

  // Verify whether the currently cached project matches the requested projectId
  const isCurrentProjectLoaded = currentProject && (currentProject._id === projectId || currentProject.id === projectId);

  useEffect(() => {
    if (projectId) {
      // Only fetch if not already loaded or to refresh in background
      loadProjectDetails(projectId).catch((err) => {
        console.error('Error loading project details:', err);
      });
    }
  }, [projectId, loadProjectDetails]);

  // Only show full-screen loader if we have NO project data at all and are currently loading
  if (projectDetailLoading && !isCurrentProjectLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-neutral-400">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#FF00A8]/20 border-t-[#FF00A8] animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-neutral-700/30 border-b-white animate-spin" style={{ animationDirection: 'reverse' }} />
        </div>
        <p className="text-xs font-mono tracking-wider uppercase text-neutral-400">Loading BRAHMA Architecture & Assets...</p>
      </div>
    );
  }

  // Handle case where project does not exist
  if (projectError && !isCurrentProjectLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-rose-400 flex items-center justify-center text-xl">⚠️</div>
        <h2 className="text-lg font-bold text-white font-display">Project Not Found</h2>
        <p className="text-xs text-neutral-400 max-w-sm">The requested project could not be found or you do not have permission to access it.</p>
        <button
          onClick={onBack}
          className="mt-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#FF00A8] hover:bg-[#D9008F] text-white transition"
        >
          Return to Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden selection:bg-[#FF00A8] selection:text-white">
      {/* Top Header */}
      <EditorTopBar
        onBack={onBack}
        onOpenDeployModal={() => setIsDeployOpen(true)}
      />

      {/* Main Split Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: AI Chat / Iteration Co-Pilot */}
        <AIChatPanel />

        {/* Right: Live Preview or Code Explorer */}
        {activeTab === 'preview' ? <LivePreview /> : <FileExplorer />}
      </div>

      {/* Deploy Modal */}
      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
      />
    </div>
  );
}
