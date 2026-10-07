import React, { useState } from 'react';
import { ExternalLink, Download, Rocket, Trash2, Edit3, Check, X, Calendar, Globe, Code2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function ProjectCard({ project, onOpen, onDelete, onDeploy }) {
  const { updateProjectName, downloadProjectZip } = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [nameVal, setNameVal] = useState(project.projectName || 'Untitled');
  const [downloading, setDownloading] = useState(false);

  const handleSaveName = async () => {
    if (nameVal.trim() && nameVal !== project.projectName) {
      await updateProjectName(project._id || project.id, nameVal.trim());
    }
    setIsEditing(false);
  };

  const handleCancelName = () => {
    setNameVal(project.projectName || 'Untitled');
    setIsEditing(false);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      setDownloading(true);
      await downloadProjectZip(project._id || project.id, project.projectName);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const formattedDate = new Date(project.updatedAt || project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isDeployed = project.status === 'deployed' && project.deploymentUrl;

  return (
    <div className="rounded-2xl border border-[#222222] bg-[#0c0c0c] hover:border-[#FF00A8]/50 hover:bg-[#0f0f0f] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg group">
      {/* Top Banner / Status */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          {/* Title or inline edit */}
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                className="w-full px-2.5 py-1 text-xs bg-[#141414] border border-[#FF00A8] rounded-lg text-white focus:outline-none"
                autoFocus
              />
              <button onClick={handleSaveName} className="p-1 rounded bg-[#FF00A8] text-white">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleCancelName} className="p-1 rounded bg-[#222222] text-neutral-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3 className="font-bold text-base text-white font-display truncate" title={project.projectName}>
                {project.projectName}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-neutral-300 transition"
                title="Rename Project"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Status Badge */}
          <div>
            {isDeployed ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#181818] border border-[#2a2a2a] text-neutral-400">
                Ready
              </span>
            )}
          </div>
        </div>

        {/* Original Prompt snippet */}
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed bg-[#121212] p-3 rounded-xl border border-[#1f1f1f] italic">
          "{project.originalPrompt}"
        </p>

        {/* Metadata info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FF00A8]">
            <Code2 className="w-3.5 h-3.5" />
            <span>React • Tailwind</span>
          </div>
        </div>

        {/* Live URL Link if deployed */}
        {isDeployed && (
          <div className="pt-1">
            <a
              href={project.deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-mono truncate group/link"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{project.deploymentUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="px-6 py-4 border-t border-[#1a1a1a] bg-[#080808] flex items-center justify-between gap-2">
        <button
          onClick={() => onOpen(project._id || project.id)}
          className="flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-md shadow-[#FF00A8]/20 transition text-center"
        >
          Open Editor
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="p-2 rounded-xl border border-[#222222] hover:border-neutral-700 bg-[#121212] text-neutral-300 hover:text-white transition"
          title="Download ZIP archive"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeploy(project._id || project.id);
          }}
          className="p-2 rounded-xl border border-[#222222] hover:border-neutral-700 bg-[#121212] text-neutral-300 hover:text-emerald-400 transition"
          title="Deploy live"
        >
          <Rocket className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project);
          }}
          className="p-2 rounded-xl border border-[#222222] hover:border-rose-900/50 bg-[#121212] text-neutral-400 hover:text-rose-400 transition"
          title="Delete Project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
