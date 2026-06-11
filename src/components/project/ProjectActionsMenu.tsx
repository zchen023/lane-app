import { Icon } from '../ui/Icon';

type ProjectActionsMenuProps = {
  isOpen: boolean;
  isDeleting: boolean;
  onToggle: () => void;
  onDeleteProject: () => void;
};

export function ProjectActionsMenu({ isOpen, isDeleting, onToggle, onDeleteProject }: ProjectActionsMenuProps) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        className="grid h-12 w-12 place-items-center border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Open project actions"
        aria-expanded={isOpen}
        disabled={isDeleting}
        onClick={onToggle}
      >
        <Icon name="more_horiz" size={20} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-10 mt-3 w-56 border border-outline-variant bg-surface-container-low shadow-lg">
          <button
            type="button"
            className="metadata flex w-full items-center gap-3 px-4 py-4 text-left text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDeleting}
            onClick={onDeleteProject}
          >
            <Icon name={isDeleting ? 'hourglass_empty' : 'delete'} size={18} />
            <span>{isDeleting ? 'DELETING...' : 'DELETE PROJECT'}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}