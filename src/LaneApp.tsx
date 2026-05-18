import { useState } from 'react';
import { ProjectHomePage } from './pages/ProjectHomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { mockProjects } from './data/mockProjects';

export function LaneApp() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = mockProjects.find((project) => project.id === activeProjectId);

  if (activeProject) {
    return <ProjectHomePage project={activeProject} onBackToProjects={() => setActiveProjectId(null)} />;
  }

  return <ProjectsPage onOpenProject={setActiveProjectId} />;
}
