import { Icon } from '../ui/Icon';
import { SearchInput } from '../ui/SearchInput';

type TopBarProps = {
  searchPlaceholder?: string;
};

export function TopBar({ searchPlaceholder = 'SEARCH SOURCES...' }: TopBarProps) {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-topbar-height w-[calc(100%-256px)] items-center justify-between border-b border-outline-variant bg-surface/90 px-10 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-4">
        <SearchInput placeholder={searchPlaceholder} />
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-on-surface-variant">
          <button className="transition-colors hover:text-primary" type="button" aria-label="Notifications">
            <Icon name="notifications" size={20} />
          </button>
          <button className="transition-colors hover:text-primary" type="button" aria-label="Help">
            <Icon name="help_outline" size={20} />
          </button>
        </div>
        <div className="grid h-8 w-8 place-items-center bg-surface-variant font-mono text-[11px] font-bold text-primary ring-1 ring-outline-variant">
          CC
        </div>
      </div>
    </header>
  );
}
