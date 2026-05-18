import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { InfoCard } from '../components/ui/InfoCard';
import { MetadataChip } from '../components/ui/MetadataChip';
import { MetadataRow } from '../components/ui/MetadataRow';
import { PageHeader } from '../components/ui/PageHeader';
import type { LaneProject } from '../data/mockProjects';

type ProjectHomePageProps = {
  project: LaneProject;
  onBackToProjects: () => void;
};

export function ProjectHomePage({ project, onBackToProjects }: ProjectHomePageProps) {
  return (
    <AppShell activeNav="projects" searchPlaceholder="SEARCH WORKSPACE...">
      <nav className="mb-10">
        <button className="metadata group flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary" type="button" onClick={onBackToProjects}>
          <Icon name="arrow_back" size={18} />
          <span>BACK TO PROJECTS</span>
        </button>
      </nav>

      <PageHeader
        eyebrow="Project Home"
        title={project.name}
        metadata={
          <div className="flex flex-wrap items-center gap-6">
            <MetadataChip>{project.status}</MetadataChip>
            <MetadataChip variant="outline">{project.type}</MetadataChip>
            <MetadataRow
              items={[
                { icon: 'calendar_today', label: `Updated ${project.lastUpdated}` },
                { icon: 'fact_check', label: `${project.tickets} ticket`, strong: true },
              ]}
            />
          </div>
        }
        actions={
          <>
            <Button variant="secondary" icon="description" disabled>
              Import Chat Later
            </Button>
            <Button variant="primary" icon="arrow_forward" disabled>
              Continue Later
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-10">
        <section className="col-span-8">
          <div className="mb-10 border border-outline-variant bg-surface-container-low p-10">
            <span className="metadata text-[10px] text-on-surface-variant">WORKSPACE PURPOSE</span>
            <p className="mt-4 max-w-4xl font-body text-lg leading-8 text-on-surface-variant">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {project.sections.map((section) => (
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
                <p className="mt-2 font-display text-2xl text-primary">{project.sourceConversations}</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">TICKETS</span>
                <p className="mt-2 font-display text-2xl text-primary">{project.tickets}</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">CODE EVIDENCE</span>
                <p className="mt-2 font-display text-2xl text-primary">{project.codeEvidence}</p>
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
