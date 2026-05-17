import type { ReactNode } from 'react';

type InfoCardProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function InfoCard({ title, children, className = '' }: InfoCardProps) {
  return (
    <aside className={`rounded-none border border-outline-variant bg-surface-container-low p-8 shadow-none ${className}`}>
      <h4 className="metadata mb-8 border-b border-outline-variant pb-2 text-primary">{title}</h4>
      {children}
    </aside>
  );
}
