import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { ContentFrame } from '../components/ui/ContentFrame';
import { Icon } from '../components/ui/Icon';
import { InfoCard } from '../components/ui/InfoCard';
import { MetadataChip } from '../components/ui/MetadataChip';
import { MetadataRow } from '../components/ui/MetadataRow';
import { PageHeader } from '../components/ui/PageHeader';

export function SourceDetailPage() {
  return (
    <AppShell activeNav="sources" searchPlaceholder="SEARCH SOURCES...">
      <nav className="mb-10">
        <button className="metadata group flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary" type="button">
          <Icon name="arrow_back" size={18} />
          <span>BACK TO PROJECT</span>
        </button>
      </nav>

      <PageHeader
        title="Imported Product Conversation.md"
        metadata={
          <div className="flex flex-wrap items-center gap-6">
            <MetadataChip>Imported</MetadataChip>
            <MetadataRow
              items={[
                { icon: 'calendar_today', label: 'Created May 14, 2026' },
                { icon: 'topic', label: 'Lane 1.0 MVP', strong: true },
              ]}
            />
          </div>
        }
        actions={
          <>
            <Button variant="secondary" icon="download">
              Export
            </Button>
            <Button variant="primary" icon="edit">
              Edit Source
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <ContentFrame
            title="Source Text Content"
            className="h-[calc(100vh-400px)]"
            actions={
              <>
                <button className="text-on-surface-variant transition-colors hover:text-primary" type="button" aria-label="Copy source">
                  <Icon name="content_copy" />
                </button>
                <button className="text-on-surface-variant transition-colors hover:text-primary" type="button" aria-label="Zoom source">
                  <Icon name="zoom_in" />
                </button>
              </>
            }
          >
            <p className="mb-10 font-body">
              This imported conversation contains early Lane 1.0 product decisions, UI direction, MVP scope notes, and build sequencing for the Builder Context Layer.
            </p>
            <h3 className="mb-6 font-display text-3xl text-primary">1. Product Intent</h3>
            <p className="mb-10 font-body">
              Lane helps AI builders stay oriented by turning messy AI product conversations into structured product intent, lightweight execution artifacts, and implementation evidence. Ticket creation is part of the workflow, but the deeper value is preserving product thinking and connecting it to execution.
            </p>
            <h3 className="mb-6 font-display text-3xl text-primary">2. UI Foundation Decision</h3>
            <p className="mb-10 font-body">
              The best Google Stitch page should become a reusable UI foundation instead of a one-off page. The sidebar, top bar, typography, buttons, metadata, panels, and content frame should be extracted into shared React/Tailwind components.
            </p>
            <h3 className="mb-6 font-display text-3xl text-primary">3. Build Boundary</h3>
            <p className="mb-10 font-body">
              UI Kit v0 does not build chat import, extraction, ticket generation, GitHub connection, or code evidence mapping. It only creates the visual foundation required to make future Lane pages feel consistent.
            </p>
            <p className="border-l-4 border-primary py-4 pl-8 font-body text-base italic text-outline">
              Note: Lane UI should use evidence-based language. Do not claim code is verified working. Use terms like “Evidence found,” “Needs review,” and “Tested manually.”
            </p>
          </ContentFrame>
        </div>

        <div className="col-span-4 flex flex-col gap-10">
          <InfoCard title="Project Context">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="metadata text-[10px] text-on-surface-variant">ACTIVE PROJECT</span>
                <span className="font-display text-lg">Lane 1.0 MVP</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="metadata text-[10px] text-on-surface-variant">SOURCES IN PROJECT</span>
                <span className="font-display text-lg">1 Conversation</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="metadata text-[10px] text-on-surface-variant">CURRENT TICKET</span>
                <span className="font-display text-lg">UI-001</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Extraction Preview">
            <div className="flex flex-col gap-6">
              <div>
                <span className="metadata text-[10px] text-on-surface-variant">STATUS</span>
                <p className="mt-2 font-display text-2xl leading-tight text-primary">Ready for UI Foundation Build</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <span className="metadata text-[10px] text-on-surface-variant">NEXT ACTION</span>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  Reuse AppShell, Sidebar, TopBar, PageHeader, ContentFrame, and InfoCard before creating any new Lane page.
                </p>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </AppShell>
  );
}
