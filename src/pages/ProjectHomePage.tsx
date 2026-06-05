import { useEffect, useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Icon } from '../components/ui/Icon';
import { InfoCard } from '../components/ui/InfoCard';
import { MetadataChip } from '../components/ui/MetadataChip';
import { MetadataRow } from '../components/ui/MetadataRow';
import { PageHeader } from '../components/ui/PageHeader';
import { formatReadableDate } from '../lib/dateFormat';
import { deleteProject, getProjectById, type Project } from '../lib/projects';

type ProjectHomePageProps = {
  projectId: string;
  onBackToProjects: () => void;
};

type WorkspaceSection = {
  title: string;
  description: string;
  status: string;
  icon: string;
};

const workspaceSections: WorkspaceSection[] = [
  {
    title: 'Source Conversations',
    description: 'Future imported AI product conversations will belong to this project workspace.',
    status: 'Not started',
    icon: 'description',
  },
  {
    title: 'Product Brief',
    description: 'The living product brief will collect approved product truth and suggested updates.',
    status: 'Not started',
    icon: 'article',
  },
  {
    title: 'Product Context',
    description: 'Structured users, painful moments, goals, constraints, and scope boundaries will appear here.',
    status: 'Not started',
    icon: 'hub',
  },
  {
    title: 'Feature Map',
    description: 'Feature areas extracted from source conversations will be grouped here.',
    status: 'Not started',
    icon: 'account_tree',
  },
  {
    title: 'Tickets / Specs',
    description: 'Lightweight tickets and build specs will connect product intent to execution.',
    status: 'Not started',
    icon: 'fact_check',
  },
  {
    title: 'Code Evidence',
    description: 'GitHub or codebase snapshot evidence will appear here after connection.',
    status: 'Not connected',
    icon: 'code_blocks',
  },
  {
    title: 'Built vs Missing',
    description: 'Evidence-based implementation status will show what exists, what is missing, and what needs review.',
    status: 'Waiting for evidence',
    icon: 'rule',
  },
];

export function ProjectHomePage({ projectId, onBackToProjects }: ProjectHomePageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      setIsLoading(true);
      setError('');

      try {
        const savedProject = await getProjectById(projectId);

        if (!isMounted) {
          return;
        }

        if (!savedProject) {
          setError('Project not found or you do not have access to it.');
          setProject(null);
          return;
        }

        setProject(savedProject);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load project.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  async function handleDeleteProject() {
    if (!project || isDeleting) {
      return;
    }

    const confirmed = window.confirm(`Delete "${project.name}"? This will remove the project workspace. This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setError('');
    setIsActionsMenuOpen(false);
    setIsDeleting(true);

    try {
      await deleteProject(project.id);
      onBackToProjects();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete project.');
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <AppShell activeNav="projects" searchPlaceholder="SEARCH WORKSPACE...">
        <nav className="mb-10">
          <button className="metadata group flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary" type="button" onClick={onBackToProjects}>
            <Icon name="arrow_back" size={18} />
            <span>BACK TO PROJECTS</span>
          </button>
        </nav>

        <div className="border border-outline-variant bg-surface-container-low p-10">
          <p className="metadata text-on-surface-variant">LOADING PROJECT WORKSPACE...</p>
        </div>
      </AppShell>
    );
  }

  if (error || !project) {
    return (
      <AppShell activeNav="projects" searchPlaceholder="SEARCH WORKSPACE...">
        <nav className="mb-10">
          <button className="metadata group flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary" type="button" onClick={onBackToProjects}>
            <Icon name="arrow_back" size={18} />
            <span>BACK TO PROJECTS</span>
          </button>
        </nav>

        <div className="border border-outline-variant bg-surface-container-low p-10">
          <MetadataChip>Needs review</MetadataChip>
          <h1 className="mt-6 font-display text-5xl leading-none tracking-[-0.02em] text-primary">Project unavailable</h1>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-on-surface-variant">
            {error || 'Project not found or you do not have access to it.'}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeNav="projects" searchPlaceholder="SEARCH WORKSPACE...">
      <nav className="mb-10">
        <button className="metadata group flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary" type="button" onClick={onBackToProjects}>
          <Icon name="arrow_back" size={18} />
          <span>BACK TO PROJECTS</span>
        </button>
      </nav>

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <PageHeader
            eyebrow="Project Home"
            title={project.name}
            metadata={
              <div className="flex flex-wrap items-center gap-6">
                <MetadataChip>Active</MetadataChip>
                <MetadataChip variant="outline">Builder Context Layer</MetadataChip>
                <MetadataRow
                  items={[
                    { icon: 'calendar_today', label: `Created ${formatReadableDate(project.created_at)}` },
                    { icon: 'cloud_done', label: 'Saved project', strong: true },
                  ]}
                />
              </div>
            }
          />
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            className="grid h-12 w-12 place-items-center border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Open project actions"
            aria-expanded={isActionsMenuOpen}
            disabled={isDeleting}
            onClick={() => setIsActionsMenuOpen((isOpen) => !isOpen)}
          >
            <Icon name="more_horiz" size={20} />
          </button>

          {isActionsMenuOpen ? (
            <div className="absolute right-0 top-full z-10 mt-3 w-56 border border-outline-variant bg-surface-container-low shadow-lg">
              <button
                type="button"
                className="metadata flex w-full items-center gap-3 px-4 py-4 text-left text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isDeleting}
                onClick={handleDeleteProject}
              >
                <Icon name={isDeleting ? 'hourglass_empty' : 'delete'} size={18} />
                <span>{isDeleting ? 'DELETING...' : 'DELETE PROJECT'}</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <section className="col-span-8">
          <div className="mb-10 border border-outline-variant bg-surface-container-low p-10">
            <span className="metadata text-[10px] text-on-surface-variant">WORKSPACE PURPOSE</span>
            <p className="mt-4 max-w-4xl font-body text-lg leading-8 text-on-surface-variant">
              {project.description || 'No description yet. Add one later when project settings exist.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {workspaceSections.map((section) => (
              <article key={section.title} className="border border-outline-variant bg-surface-container-low p-8">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <span className="grid h-10 w-10 place-items-center border border-outline-variant text-primary">
                    <Icon name={section.icon} size={20} />
                  </span>
                  <MetadataChip variant="outline">{section.status}</MetadataChip>
                </div>
                <h3 className="mb-4 font-display text-3xl leading-tight text-primary">{section.title}</h3>
                <p className="text-sm leading-6 text-on-surface-variant">{section.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="col-span-4 flex flex-col gap-10">
          <InfoCard title="Workspace Snapshot">
            <div className="flex flex-col gap-6">
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">SOURCE CONVERSATIONS</span>
                <p className="mt-2 font-display text-2xl text-primary">0</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">TICKETS</span>
                <p className="mt-2 font-display text-2xl text-primary">0</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">CODE EVIDENCE</span>
                <p className="mt-2 font-display text-2xl text-primary">Not connected</p>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Evidence Language Reminder">
            <p className="text-sm leading-6 text-on-surface-variant">
              Lane should show implementation evidence, not claim code is verified working. Future statuses should use language like evidence found, needs review, confirmed by user, and tested manually.
            </p>
          </InfoCard>
        </aside>
      </div>
    </AppShell>
  );
}
