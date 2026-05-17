import type { ReactNode } from 'react';
import { Panel } from './Panel';
import { PanelHeader } from './PanelHeader';

type ContentFrameProps = {
  title: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ContentFrame({ title, actions, children, className = '' }: ContentFrameProps) {
  return (
    <Panel className={`flex flex-col ${className}`}>
      <PanelHeader title={title} actions={actions} />
      <div className="flex-1 overflow-y-auto p-12 text-lg leading-relaxed text-on-surface-variant">{children}</div>
    </Panel>
  );
}
