import type { ReactNode } from 'react';

type PanelHeaderProps = {
  title: ReactNode;
  actions?: ReactNode;
};

export function PanelHeader({ title, actions }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-8 py-4">
      <span className="metadata text-[11px] tracking-[0.2em] text-on-surface-variant">{title}</span>
      {actions ? <div className="flex items-center gap-4">{actions}</div> : null}
    </div>
  );
}
