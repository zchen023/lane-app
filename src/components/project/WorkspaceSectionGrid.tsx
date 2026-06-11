import { Icon } from '../ui/Icon';
import { MetadataChip } from '../ui/MetadataChip';

export type WorkspaceSection = {
  title: string;
  description: string;
  status: string;
  icon: string;
};

type WorkspaceSectionGridProps = {
  sections: WorkspaceSection[];
};

export function WorkspaceSectionGrid({ sections }: WorkspaceSectionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {sections.map((section) => (
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
  );
}