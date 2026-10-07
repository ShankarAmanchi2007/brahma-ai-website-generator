import React, { useState } from 'react';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Rocket,
  Edit2,
  Check,
  Code2,
  Eye,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function EditorTopBar({ onBack, onOpenDeployModal }) {
  const {
    currentProject,
    deviceMode,
    setDeviceMode,
    activeTab,
    setActiveTab,
    updateProjectName,
    downloadProjectZip,
    previewHtml
  } = useProject();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(currentProject?.projectName || 'My Project');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSaveName = async () => {
    if (nameVal.trim() && nameVal !== currentProject?.projectName) {
      await updateProjectName(currentProject._id || currentProject.id, nameVal.trim());
    }
    setIsEditingName(false);
  };

  const handleDownload = async () => {
    if (!currentProject) return;
    try {
      setIsDownloading(true);
      await downloadProjectZip(currentProject._id || currentProject.id, currentProject.projectName);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenFullscreen = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(previewHtml);
      newWindow.document.close();
    }
  };

  return (
    <header className="h-16 border-b border-[#1a1a1a] bg-[#070707] px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-20">
      {/* Left: Back & Project Name */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#141414] border border-[#222222] transition shrink-0"
          title="Back to Workspace"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {isEditingName ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              className="px-2.5 py-1 text-xs bg-[#141414] border border-[#FF00A8] rounded-lg text-white focus:outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
            />
            <button onClick={handleSaveName} className="p-1 rounded bg-[#FF00A8] text-white">
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingName(true)}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF00A8]"></span>
              <h1 className="text-xs sm:text-sm font-bold font-display text-white truncate max-w-[140px] sm:max-w-xs">
                {currentProject?.projectName || 'Untitled Website'}
              </h1>
            </div>
            <Edit2 className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-100 transition shrink-0" />
          </div>
        )}
      </div>

      {/* Center: View Switcher (Preview vs Files) & Device Selector */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[#0f0f0f] border border-[#222222] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-mono transition ${
              activeTab === 'preview'
                ? 'bg-[#181818] border border-[#2c2c2c] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 ${activeTab === 'preview' ? 'text-[#FF00A8]' : ''}`} />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-mono transition ${
              activeTab === 'code'
                ? 'bg-[#181818] border border-[#2c2c2c] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className={`w-3.5 h-3.5 ${activeTab === 'code' ? 'text-[#FF00A8]' : ''}`} />
            <span className="hidden sm:inline">Files</span>
          </button>
        </div>

        {/* Device Switcher (Visible in preview tab) */}
        {activeTab === 'preview' && (
          <div className="hidden md:flex items-center p-1 rounded-xl bg-[#0f0f0f] border border-[#222222] text-xs">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === 'desktop' ? 'bg-[#181818] text-[#FF00A8]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === 'tablet' ? 'bg-[#181818] text-[#FF00A8]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === 'mobile' ? 'bg-[#181818] text-[#FF00A8]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions (Fullscreen, Download, Deploy) */}
      <div className="flex items-center gap-2">
        {activeTab === 'preview' && (
          <button
            onClick={handleOpenFullscreen}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#141414] border border-transparent hover:border-[#222222] transition hidden sm:flex"
            title="Open preview in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#111111] hover:bg-[#181818] border border-[#222222] text-neutral-300 hover:text-white transition"
          title="Download complete ZIP"
        >
          {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Export ZIP</span>
        </button>

        <button
          onClick={onOpenDeployModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-md shadow-[#FF00A8]/20 transition hover:scale-[1.02]"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Deploy</span>
        </button>
      </div>
    </header>
  );
}
