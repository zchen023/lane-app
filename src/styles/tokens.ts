export const colors = {
  background: '#FDF8F8',
  onBackground: '#1C1B1B',
  surface: '#FDF8F8',
  surfaceContainer: '#F1EDEC',
  surfaceContainerLow: '#F7F3F2',
  primary: '#000000',
  onPrimary: '#FFFFFF',
  secondary: '#585F6A',
  outline: '#747878',
  outlineVariant: '#C4C7C7',
  borderLight: '#E5E5E5',
  onSurfaceVariant: '#444748',
  surfaceVariant: '#E5E2E1',
} as const;

export const fonts = {
  display: 'DM Serif Display, serif',
  body: 'Inter, sans-serif',
  mono: 'JetBrains Mono, monospace',
} as const;

export const layout = {
  sidebarWidth: '256px',
  topBarHeight: '64px',
  pageMaxWidth: '1152px',
  desktopMargin: '40px',
  mobileMargin: '16px',
  gridGap: '40px',
} as const;

export const radius = {
  none: '0px',
  full: '9999px',
} as const;
