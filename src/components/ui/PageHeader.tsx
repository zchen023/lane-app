import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  metadata?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, metadata, actions }: PageHeaderProps) {
  return (
    <header className="mb-12 border-b border-outline-variant pb-12">
      {eyebrow ? <div className="metadata mb-4 text-[11px] text-on-surface-variant">{eyebrow}</div> : null}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-6 font-display text-6xl leading-none tracking-[-0.02em] text-primary">{title}</h1>
          {metadata ? <div>{metadata}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-4">{actions}</div> : null}
      </div>
    </header>
  );
}
