import { SidebarNavItem } from './SidebarNavItem';

type ActiveNav = 'projects' | 'sources' | 'product-brief' | 'context' | 'tickets' | 'code-evidence' | 'settings';

type SidebarProps = {
  activeNav: ActiveNav;
};

const navItems: Array<{ id: ActiveNav; label: string; icon: string }> = [
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'sources', label: 'Sources', icon: 'description' },
  { id: 'product-brief', label: 'Product Brief', icon: 'article' },
  { id: 'context', label: 'Context', icon: 'hub' },
  { id: 'tickets', label: 'Tickets', icon: 'fact_check' },
  { id: 'code-evidence', label: 'Code Evidence', icon: 'code_blocks' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export function Sidebar({ activeNav }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-sidebar-width flex-col border-r border-outline-variant bg-surface p-6">
      <div className="mb-12">
        <span className="font-display text-3xl tracking-tight text-primary">Lane</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <SidebarNavItem key={item.id} icon={item.icon} label={item.label} active={activeNav === item.id} />
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-outline-variant pt-6">
        <div className="grid h-8 w-8 place-items-center bg-surface-variant font-mono text-[11px] font-bold text-primary ring-1 ring-outline-variant">
          L1
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold uppercase tracking-tight">Workspace One</span>
          <span className="metadata text-[11px] lowercase text-on-surface-variant">Local Build</span>
        </div>
      </div>
    </aside>
  );
}
