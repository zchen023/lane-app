import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { InfoCard } from '../components/ui/InfoCard';
import { MetadataChip } from '../components/ui/MetadataChip';
import { MetadataRow } from '../components/ui/MetadataRow';
import { PageHeader } from '../components/ui/PageHeader';
import { mockProjects } from '../data/mockProjects';

type ProjectsPageProps = {
  onOpenProject: (projectId: string) => void;
};

export function ProjectsPage({ onOpenProject }: ProjectsPageProps) {
  const project = mockProjects[0];

  return (
    <AppShell activeNav="projects" searchPlaceholder="SEARCH PROJECTS...">
      <PageHeader
        eyebrow="Lane Projects"
        title="Project Workspaces"
        metadata={
          <div className="flex flex-wrap items-center gap-6">
            <MetadataChip>Local MVP</MetadataChip>
            <MetadataRow
              items={[
                { icon: 'folder', label: '1 project' },
                { icon: 'bolt', label: 'Frontend mock data', strong: true },
              ]}
            />
          </div>
        }
        actions={
          <Button variant="secondary" icon="add" disabled>
            New Project Later
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-10">
        <section className="col-span-8">
          <button
            type="button"
            onClick={() => onOpenProject(project.id)}
            className="group w-full border border-outline-variant bg-surface-container-low p-10 text-left transition-colors hover:bg-surface-container"
          >
            <div className="mb-10 flex items-start justify-between gap-8">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <MetadataChip>{project.status}</MetadataChip>
                  <MetadataChip variant="outline">{project.type}</MetadataChip>
                </div>
                <h2 className="font-display text-5xl leading-none tracking-[-0.02em] text-primary">{project.name}</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center border border-outline-variant text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <Icon name="arrow_forward" />
              </span>
            </div>

            <p className="mb-10 max-w-3xl font-body text-base leading-7 text-on-surface-variant">{project.description}</p>

            <div className="grid grid-cols-4 border-t border-outline-variant pt-8">
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">LAST UPDATED</span>
                <p className="mt-2 font-display text-xl text-primary">{project.lastUpdated}</p>
              </div>
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">SOURCES</span>
                <p className="mt-2 font-display text-xl text-primary">{project.sourceConversations}</p>
              </div>
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">TICKETS</span>
                <p className="mt-2 font-display text-xl text-primary">{project.tickets}</p>
              </div>
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">CODE EVIDENCE</span>
                <p className="mt-2 font-display text-xl text-primary">{project.codeEvidence}</p>
              </div>
            </div>
          </button>
        </section>

        <aside className="col-span-4 flex flex-col gap-10">
          <InfoCard title="MVP Boundary">
            <p className="text-sm leading-6 text-on-surface-variant">
              This screen only proves that a builder can open a Lane project workspace. Real creation, auth, backend, persistence, chat import, and GitHub connection are intentionally excluded.
            </p>
          </InfoCard>

          <InfoCard title="Next Product Surface">
            <div className="flex flex-col gap-4">
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">CURRENT TICKET</span>
                <p className="mt-2 font-display text-2xl text-primary">MVP-001</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">USER OUTCOME</span>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  A user can land in Lane, see one project, and open it into a project home page.
                </p>
              </div>
            </div>
          </InfoCard>
        </aside>
      </div>
    </AppShell>
  );
}
