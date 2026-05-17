import type { ReactNode } from 'react';

type MainCanvasProps = {
  children: ReactNode;
};

export function MainCanvas({ children }: MainCanvasProps) {
  return (
    <main className="ml-sidebar-width min-h-screen pt-topbar-height">
      <div className="mx-auto max-w-6xl px-10 py-12">{children}</div>
    </main>
  );
}
