import { FormEvent, useEffect, useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { InfoCard } from '../components/ui/InfoCard';
import { MetadataChip } from '../components/ui/MetadataChip';
import { MetadataRow } from '../components/ui/MetadataRow';
import { PageHeader } from '../components/ui/PageHeader';
import { createProject, deleteProject, listProjects, type Project } from '../lib/projects';

type ProjectsPageProps = {
  onOpenProject: (projectId: string) => void;
};

function formatProjectDate(value: string | null) {
  if (!value) {
    return 'Not recorded';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function ProjectsPage({ onOpenProject }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setIsLoading(true);
      setError('');

      try {
        const savedProjects = await listProjects();

        if (isMounted) {
          setProjects(savedProjects);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load projects.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveProject() {
    if (isSaving) {
      return;
    }

    setFormError('');
    setError('');

    if (!name.trim()) {
      setFormError('Project name is required.');
      return;
    }

    setIsSaving(true);

    try {
      const savedProject = await createProject({ name, description });
      setProjects((currentProjects) => [savedProject, ...currentProjects]);
      setName('');
      setDescription('');
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : 'Unable to create project.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveProject();
  }

  async function handleDeleteProject(project: Project) {
    if (deletingProjectId) {
      return;
    }

    const confirmed = window.confirm(`Delete "${project.name}"? This will remove the project workspace. This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setError('');
    setFormError('');
    setDeletingProjectId(project.id);

    try {
      await deleteProject(project.id);
      setProjects((currentProjects) => currentProjects.filter((currentProject) => currentProject.id !== project.id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete project.');
    } finally {
      setDeletingProjectId(null);
    }
  }

  return (
    <AppShell activeNav="projects" searchPlaceholder="SEARCH PROJECTS...">
      <PageHeader
        eyebrow="Lane Projects"
        title="Project Workspaces"
        metadata={
          <div className="flex flex-wrap items-center gap-6">
            <MetadataChip>Real MVP</MetadataChip>
            <MetadataRow
              items={[
                { icon: 'folder', label: `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}` },
                { icon: 'cloud_done', label: 'Saved to Supabase', strong: true },
              ]}
            />
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-10">
        <section className="col-span-8">
          {isLoading ? (
            <div className="border border-outline-variant bg-surface-container-low p-10">
              <p className="metadata text-on-surface-variant">LOADING PROJECTS...</p>
            </div>
          ) : error ? (
            <div className="border border-outline-variant bg-surface-container-low p-10">
              <MetadataChip>Needs review</MetadataChip>
              <p className="mt-6 text-sm leading-6 text-on-surface-variant">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="border border-outline-variant bg-surface-container-low p-10">
              <MetadataChip>Empty</MetadataChip>
              <h2 className="mt-6 font-display text-4xl leading-tight text-primary">Create your first Lane project workspace.</h2>
              <p className="mt-6 max-w-3xl text-sm leading-6 text-on-surface-variant">
                A project keeps one product&apos;s source conversations, product context, tickets, build specs, and code evidence together.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {projects.map((project) => {
                const isDeleting = deletingProjectId === project.id;

                return (
                  <article key={project.id} className="group w-full border border-outline-variant bg-surface-container-low p-10 text-left transition-colors hover:bg-surface-container">
                    <div className="mb-10 flex items-start justify-between gap-8">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                          <MetadataChip>Active</MetadataChip>
                          <MetadataChip variant="outline">Builder Context Layer</MetadataChip>
                        </div>
                        <h2 className="font-display text-5xl leading-none tracking-[-0.02em] text-primary">{project.name}</h2>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <Button variant="ghost" size="sm" icon="delete" disabled={Boolean(deletingProjectId)} onClick={() => handleDeleteProject(project)}>
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                        <button
                          type="button"
                          onClick={() => onOpenProject(project.id)}
                          className="grid h-12 w-12 place-items-center border border-outline-variant text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Open ${project.name}`}
                          disabled={isDeleting}
                        >
                          <Icon name="arrow_forward" />
                        </button>
                      </div>
                    </div>

                    <p className="mb-10 max-w-3xl font-body text-base leading-7 text-on-surface-variant">
                      {project.description || 'No description yet.'}
                    </p>

                    <div className="grid grid-cols-4 border-t border-outline-variant pt-8">
                      <div>
                        <span className="metadata text-[10px] text-on-surface-variant">CREATED</span>
                        <p className="mt-2 font-display text-xl text-primary">{formatProjectDate(project.created_at)}</p>
                      </div>
                      <div>
                        <span className="metadata text-[10px] text-on-surface-variant">SOURCES</span>
                        <p className="mt-2 font-display text-xl text-primary">0</p>
                      </div>
                      <div>
                        <span className="metadata text-[10px] text-on-surface-variant">TICKETS</span>
                        <p className="mt-2 font-display text-xl text-primary">0</p>
                      </div>
                      <div>
                        <span className="metadata text-[10px] text-on-surface-variant">CODE EVIDENCE</span>
                        <p className="mt-2 font-display text-xl text-primary">Not connected</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <aside className="col-span-4 flex flex-col gap-10">
          <InfoCard title="Create Project">
            <form className="flex flex-col gap-5" onSubmit={handleCreateProject}>
              <div>
                <label className="metadata mb-2 block text-[10px] text-on-surface-variant" htmlFor="project-name">
                  PROJECT NAME
                </label>
                <input
                  id="project-name"
                  className="w-full border border-outline-variant bg-surface px-4 py-3 font-body text-sm text-primary outline-none transition-colors focus:border-primary"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Lane 1.0 MVP"
                />
              </div>

              <div>
                <label className="metadata mb-2 block text-[10px] text-on-surface-variant" htmlFor="project-description">
                  DESCRIPTION OPTIONAL
                </label>
                <textarea
                  id="project-description"
                  className="min-h-28 w-full resize-none border border-outline-variant bg-surface px-4 py-3 font-body text-sm leading-6 text-primary outline-none transition-colors focus:border-primary"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What product is this workspace for?"
                />
              </div>

              {formError ? <p className="text-sm leading-6 text-on-surface-variant">{formError}</p> : null}

              <Button variant="primary" icon="add" type="button" disabled={isSaving} onClick={saveProject}>
                {isSaving ? 'Saving...' : 'Create Project'}
              </Button>
            </form>
          </InfoCard>

          <InfoCard title="Workspace Foundation">
            <p className="text-sm leading-6 text-on-surface-variant">
              Projects are now the persisted foundation for future source conversations, extraction runs, tickets, build specs, and code evidence.
            </p>
          </InfoCard>
        </aside>
      </div>
    </AppShell>
  );
}
