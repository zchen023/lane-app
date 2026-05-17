import { Icon } from './Icon';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function SearchInput({ placeholder = 'SEARCH...', value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Icon name="search" size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-outline" />
      <input
        className="metadata w-full border-none bg-transparent py-2 pl-8 pr-4 text-sm text-primary placeholder:text-outline focus:outline-none focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        type="text"
      />
    </div>
  );
}
