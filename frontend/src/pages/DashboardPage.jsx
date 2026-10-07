import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import ProjectCard from '../components/dashboard/ProjectCard';
import NewProjectModal from '../components/dashboard/NewProjectModal';
import DeleteConfirmModal from '../components/dashboard/DeleteConfirmModal';
import {
  Plus,
  Search,
  Globe,
  LayoutGrid,
  LogOut,
  User,
  RefreshCw,
  FolderPlus
} from 'lucide-react';

export default function DashboardPage({ onOpenProject, onGoHome }) {
  const { user, logout } = useAuth();
  const { projects, loadProjects, deleteProject } = useProject();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'deployed'
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteProject(projectToDelete._id || projectToDelete.id);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeployQuick = async (id) => {
    onOpenProject(id, 'deploy');
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      (p.projectName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.originalPrompt || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'deployed') return p.status === 'deployed' && !!p.deploymentUrl;
    return true;
  });

  const deployedCount = projects.filter((p) => p.status === 'deployed').length;

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col md:flex-row selection:bg-[#FF00A8] selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-[#1a1a1a] bg-[#080808] flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onGoHome}>
            <div className="w-9 h-9 rounded-lg bg-black border border-[#262626] flex items-center justify-center text-white shadow-md relative overflow-hidden group-hover:border-[#FF00A8] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h8a4 4 0 0 1 0 8H6V3z" />
                <path d="M6 11h9a4 4 0 0 1 0 8H6V11z" />
                <circle cx="15" cy="11" r="1.5" fill="#FF00A8" stroke="none" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold font-display text-lg tracking-tight text-white">
                BRAHMA
              </span>
              <span className="text-[10px] uppercase font-mono px-1 py-0.5 rounded bg-[#181818] border border-[#262626] text-[#FF00A8] font-bold">
                2.0
              </span>
            </div>
          </div>

          {/* New Project CTA */}
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Website
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setFilterType('all')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition ${
                filterType === 'all'
                  ? 'bg-[#141414] text-white border border-[#2a2a2a]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#111111]'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className={`w-4 h-4 ${filterType === 'all' ? 'text-[#FF00A8]' : 'text-neutral-500'}`} />
                <span>All Projects</span>
              </div>
              <span className="text-[11px] bg-[#1a1a1a] text-neutral-400 px-2 py-0.5 rounded-full font-mono">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setFilterType('deployed')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition ${
                filterType === 'deployed'
                  ? 'bg-[#141414] text-white border border-[#2a2a2a]'
                  : 'text-neutral-400 hover:text-white hover:bg-[#111111]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className={`w-4 h-4 ${filterType === 'deployed' ? 'text-emerald-400' : 'text-neutral-500'}`} />
                <span>Live Deployed</span>
              </div>
              <span className="text-[11px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                {deployedCount}
              </span>
            </button>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-[#1a1a1a] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center font-bold text-xs text-[#FF00A8]">
              {user?.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Creator'}</h4>
              <p className="text-[11px] text-neutral-500 truncate font-mono">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-rose-400 hover:bg-rose-950/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 border-b border-[#1a1a1a] px-6 sm:px-8 flex items-center justify-between gap-4 bg-[#070707]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites by name or prompt..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0f0f0f] border border-[#222222] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF00A8] transition"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadProjects()}
              title="Refresh projects"
              className="p-2.5 rounded-xl border border-[#222222] hover:border-neutral-700 text-neutral-400 hover:text-white bg-[#0f0f0f] transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-md shadow-[#FF00A8]/20 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Project
            </button>
          </div>
        </header>

        {/* Projects Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">Your AI Websites</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Manage, edit, export, and deploy your generated web applications.
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Showing {filteredProjects.length} of {projects.length} websites
            </div>
          </div>

          {/* Project Grid / Empty State */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id || project.id}
                  project={project}
                  onOpen={(id) => onOpenProject(id)}
                  onDelete={(proj) => setProjectToDelete(proj)}
                  onDeploy={(id) => handleDeployQuick(id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#1f1f1f] bg-[#0c0c0c] p-12 text-center max-w-lg mx-auto space-y-5 my-12">
              <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto text-[#FF00A8]">
                <FolderPlus className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white font-display">No websites generated yet</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Start by typing a natural language prompt describing your dream website. BRAHMA handles the rest!
                </p>
              </div>
              <button
                onClick={() => setIsNewModalOpen(true)}
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FF00A8] hover:bg-[#D9008F] text-white shadow-lg shadow-[#FF00A8]/20 transition inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Generate Your First Website
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onProjectCreated={(project) => {
          setIsNewModalOpen(false);
          onOpenProject(project._id || project.id);
        }}
      />

      <DeleteConfirmModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteConfirm}
        project={projectToDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
