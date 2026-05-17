import type { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = '' }: PanelProps) {
  return <section className={`rounded-none border border-outline-variant bg-white shadow-none ${className}`}>{children}</section>;
}
