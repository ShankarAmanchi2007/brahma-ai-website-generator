import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';

/**
 * Parses app-level routes from both HTML5 path and URL hash.
 * Returns null if the URL change is an in-page anchor (e.g. #about, #menu, #contact, #)
 * to ensure that internal website interactions never hijack the parent application.
 */
function parseAppRoute(pathname, hash) {
  // 1. Check HTML5 pathname routes
  if (pathname) {
    const pathEditorMatch = pathname.match(/^\/projects\/([^\/]+)(?:\/editor)?\/?$/i);
    if (pathEditorMatch) {
      return { page: 'editor', projectId: pathEditorMatch[1] };
    }
    if (pathname === '/dashboard') {
      return { page: 'dashboard', projectId: null };
    }
  }

  // 2. Check hash-based routes
  if (hash) {
    if (hash.startsWith('#/editor/')) {
      const id = hash.replace('#/editor/', '').split('?')[0].split('#')[0];
      if (id) return { page: 'editor', projectId: id };
    }
    if (hash.startsWith('#/projects/')) {
      const parts = hash.replace('#/projects/', '').split('/');
      const id = parts[0].split('?')[0].split('#')[0];
      if (id) return { page: 'editor', projectId: id };
    }
    if (hash === '#/dashboard' || hash.startsWith('#/dashboard')) {
      return { page: 'dashboard', projectId: null };
    }
    if (hash === '#/' || hash === '' || hash === '#') {
      return { page: 'landing', projectId: null };
    }
  }

  // 3. If hash does NOT start with '#/' (for example, #about, #contact, #pricing, #hero),
  // it is an in-page section anchor. Return null so the parent router IGNORES it!
  return null;
}

function AppContent() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [currentPage, setCurrentPage] = useState(() => {
    const route = parseAppRoute(window.location.pathname, window.location.hash);
    if (route) return route.page;
    const saved = sessionStorage.getItem('brahma_active_project_id') || sessionStorage.getItem('webcraft_active_project_id');
    if (saved) return 'editor';
    return 'landing';
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const route = parseAppRoute(window.location.pathname, window.location.hash);
    if (route && route.page === 'editor' && route.projectId) {
      return route.projectId;
    }
    return sessionStorage.getItem('brahma_active_project_id') || sessionStorage.getItem('webcraft_active_project_id') || null;
  });

  const [editorInitialAction, setEditorInitialAction] = useState(null);

  // Sync route events (both hashchange and popstate)
  useEffect(() => {
    const handleRouteChange = () => {
      const route = parseAppRoute(window.location.pathname, window.location.hash);

      // CRITICAL FIX: If route is null (e.g. an in-page anchor like #about, #menu, #contact),
      // DO NOT navigate away from the current page! Keep the editor/page active.
      if (!route) {
        return;
      }

      if (route.page === 'editor' && route.projectId) {
        setActiveProjectId(route.projectId);
        setCurrentPage('editor');
        sessionStorage.setItem('brahma_active_project_id', route.projectId);
      } else if (route.page === 'dashboard') {
        setCurrentPage('dashboard');
      } else if (route.page === 'landing') {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Programmatic navigation helper
  const navigateTo = useCallback((page, projectId = null, initialAction = null) => {
    setCurrentPage(page);
    setEditorInitialAction(initialAction);

    if (page === 'editor' && projectId) {
      setActiveProjectId(projectId);
      sessionStorage.setItem('brahma_active_project_id', projectId);
      window.location.hash = `#/editor/${projectId}`;
    } else if (page === 'dashboard') {
      window.location.hash = '#/dashboard';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Authentication guard: Only redirect if authentication is completely resolved and user is invalid
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      if (currentPage === 'dashboard' || currentPage === 'editor') {
        navigateTo('landing');
      }
    }
  }, [isAuthenticated, authLoading, currentPage, navigateTo]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  if (currentPage === 'editor' && activeProjectId) {
    return (
      <EditorPage
        projectId={activeProjectId}
        onBack={() => navigateTo('dashboard')}
        initialAction={editorInitialAction}
      />
    );
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return (
      <DashboardPage
        onOpenProject={(id, action) => navigateTo('editor', id, action)}
        onGoHome={() => navigateTo('landing')}
      />
    );
  }

  return (
    <LandingPage
      onNavigateDashboard={() => navigateTo('dashboard')}
      onOpenEditorWithProject={(id) => navigateTo('editor', id)}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}
