import { Icon } from '../ui/Icon';

type SidebarNavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
};

export function SidebarNavItem({ icon, label, active = false, href = '#', onClick }: SidebarNavItemProps) {
  const classes = active
    ? 'bg-primary text-on-primary'
    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary';

  return (
    <a
      href={href}
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick();
        }
      }}
      className={`metadata flex items-center gap-4 rounded-none px-3 py-3 transition-colors ${classes}`}
    >
      <Icon name={icon} size={20} />
      <span>{label}</span>
    </a>
  );
}
