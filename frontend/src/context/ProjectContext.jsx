import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewHtml, setPreviewHtml] = useState('');

  // UI Editor states
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code' | 'deploy'

  // Loading / Async states
  const [loading, setLoading] = useState(false); // projects list loading
  const [projectDetailLoading, setProjectDetailLoading] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [iterating, setIterating] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null); // { step: 'building' | 'uploading' | 'deploying' | 'live', url: '' }

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getProjects();
      if (res.success) {
        setProjects(res.projects || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProjectDetails = useCallback(async (id) => {
    if (!id) return;
    try {
      setProjectDetailLoading(true);
      setProjectError(null);
      sessionStorage.setItem('brahma_active_project_id', id);

      const [projRes, msgsRes, filesRes] = await Promise.all([
        api.getProject(id),
        api.getMessages(id),
        api.getFiles(id)
      ]);

      if (projRes.success && projRes.project) {
        setCurrentProject(projRes.project);
        setPreviewHtml(projRes.project.generatedCode || '');
      } else {
        setProjectError('Project not found');
      }
      if (msgsRes.success) {
        setMessages(msgsRes.messages || []);
      }
      if (filesRes.success) {
        setFiles(filesRes.files || []);
      }
      return projRes.project;
    } catch (err) {
      console.error('Failed to fetch project details:', err);
      setProjectError(err.message || 'Failed to load project details');
      throw err;
    } finally {
      setProjectDetailLoading(false);
    }
  }, []);

  const createProject = async (prompt, projectName = '') => {
    try {
      setGenerating(true);
      const res = await api.createProject(prompt, projectName);
      if (res.success && res.project) {
        setCurrentProject(res.project);
        setPreviewHtml(res.previewHtml || res.project.generatedCode);
        setProjects(prev => [res.project, ...prev]);
        return res.project;
      }
      throw new Error(res.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const modifyWithPrompt = async (projectId, message) => {
    try {
      setIterating(true);

      // Optimistically push user message to UI
      const optimisticMsg = {
        _id: 'temp-' + Date.now(),
        role: 'user',
        message,
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, optimisticMsg]);

      const res = await api.chatAndModify(projectId, message);
      if (res.success) {
        setCurrentProject(res.project);
        setPreviewHtml(res.previewHtml);

        // Update messages with real response from server
        if (res.assistantMessage) {
          setMessages(prev => [...prev.filter(m => m._id !== optimisticMsg._id), optimisticMsg, res.assistantMessage]);
        }

        // Refresh files
        const filesRes = await api.getFiles(projectId);
        if (filesRes.success) {
          setFiles(filesRes.files || []);
        }

        return res;
      }
      throw new Error(res.message || 'Update failed');
    } finally {
      setIterating(false);
    }
  };

  const updateProjectName = async (projectId, newName) => {
    try {
      const res = await api.updateProject(projectId, { projectName: newName });
      if (res.success) {
        setCurrentProject(prev => prev ? { ...prev, projectName: newName } : null);
        setProjects(prev => prev.map(p => (p._id === projectId || p.id === projectId) ? { ...p, projectName: newName } : p));
      }
    } catch (err) {
      console.error('Failed to update project name:', err);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const res = await api.deleteProject(projectId);
      if (res.success) {
        setProjects(prev => prev.filter(p => p._id !== projectId && p.id !== projectId));
        if (currentProject && (currentProject._id === projectId || currentProject.id === projectId)) {
          setCurrentProject(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
      throw err;
    }
  };

  const deployWebsite = async (projectId) => {
    try {
      setDeploying(true);
      setDeployStatus({ step: 'validating', progress: 20 });
      await new Promise(r => setTimeout(r, 600));

      setDeployStatus({ step: 'building', progress: 50 });
      await new Promise(r => setTimeout(r, 800));

      setDeployStatus({ step: 'uploading', progress: 75 });
      await new Promise(r => setTimeout(r, 600));

      setDeployStatus({ step: 'deploying', progress: 90 });
      const res = await api.deployProject(projectId);

      if (res.success) {
        setDeployStatus({
          step: 'live',
          progress: 100,
          url: res.deploymentUrl,
          deploymentId: res.deploymentId
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (currentProject) {
          setCurrentProject(prev => ({
            ...prev,
            status: 'deployed',
            deploymentUrl: res.deploymentUrl
          }));
        }

        return res;
      }
      throw new Error(res.message || 'Deployment failed');
    } catch (err) {
      setDeployStatus({ step: 'failed', error: err.message });
      throw err;
    } finally {
      setDeploying(false);
    }
  };

  const downloadProjectZip = async (projectId, projectName) => {
    await api.downloadZip(projectId, projectName || currentProject?.projectName || 'my-website');
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProject,
        messages,
        files,
        previewHtml,
        setPreviewHtml,
        deviceMode,
        setDeviceMode,
        activeTab,
        setActiveTab,
        loading,
        projectDetailLoading,
        projectError,
        generating,
        iterating,
        deploying,
        deployStatus,
        setDeployStatus,
        loadProjects,
        loadProjectDetails,
        createProject,
        modifyWithPrompt,
        updateProjectName,
        deleteProject,
        deployWebsite,
        downloadProjectZip
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
