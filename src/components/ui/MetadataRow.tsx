import type { ReactNode } from 'react';
import { Icon } from './Icon';

type MetadataRowItem = {
  icon?: string;
  label: ReactNode;
  strong?: boolean;
};

type MetadataRowProps = {
  items: MetadataRowItem[];
};

export function MetadataRow({ items }: MetadataRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {items.map((item, index) => (
        <div key={index} className="metadata flex items-center gap-2 text-[11px] text-on-surface-variant">
          {item.icon ? <Icon name={item.icon} size={16} /> : null}
          <span className={item.strong ? 'font-bold text-primary' : ''}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
