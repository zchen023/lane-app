import type { ReactNode } from 'react';
import { MainCanvas } from './MainCanvas';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type ActiveNav = 'projects' | 'sources' | 'product-brief' | 'context' | 'tickets' | 'code-evidence' | 'settings';

type AppShellProps = {
  activeNav: ActiveNav;
  searchPlaceholder?: string;
  children: ReactNode;
};

export function AppShell({ activeNav, searchPlaceholder, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar activeNav={activeNav} />
      <TopBar searchPlaceholder={searchPlaceholder} />
      <MainCanvas>{children}</MainCanvas>
    </div>
  );
}
