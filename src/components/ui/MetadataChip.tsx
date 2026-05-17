import type { ReactNode } from 'react';

type MetadataChipProps = {
  children: ReactNode;
  variant?: 'solid' | 'outline';
};

export function MetadataChip({ children, variant = 'solid' }: MetadataChipProps) {
  const classes =
    variant === 'solid'
      ? 'bg-primary text-on-primary border-primary'
      : 'bg-transparent text-primary border-outline-variant';

  return <span className={`metadata inline-flex border px-3 py-1 text-[11px] ${classes}`}>{children}</span>;
}
