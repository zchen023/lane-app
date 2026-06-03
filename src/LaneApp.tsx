import { useEffect, useState } from 'react';
import { ProjectHomePage } from './pages/ProjectHomePage';
import { ProjectsPage } from './pages/ProjectsPage';

const projectHashPrefix = '#/projects/';

function getProjectIdFromHash() {
  if (!window.location.hash.startsWith(projectHashPrefix)) {
    return null;
  }

  const projectId = window.location.hash.slice(projectHashPrefix.length).trim();
  return projectId || null;
}

function navigateToProjects() {
  window.location.hash = '#/projects';
}

function navigateToProject(projectId: string) {
  window.location.hash = `${projectHashPrefix}${projectId}`;
}

export function LaneApp() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => getProjectIdFromHash());

  useEffect(() => {
    function handleHashChange() {
      setActiveProjectId(getProjectIdFromHash());
    }

    if (!window.location.hash) {
      window.location.hash = '#/projects';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (activeProjectId) {
    return <ProjectHomePage projectId={activeProjectId} onBackToProjects={navigateToProjects} />;
  }

  return <ProjectsPage onOpenProject={navigateToProject} />;
}
