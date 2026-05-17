type IconProps = {
  name: string;
  size?: 16 | 18 | 20 | 24;
  className?: string;
};

export function Icon({ name, size = 20, className = '' }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-flex select-none items-center justify-center ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
