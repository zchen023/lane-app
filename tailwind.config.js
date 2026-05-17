/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FDF8F8',
        'on-background': '#1C1B1B',
        surface: '#FDF8F8',
        'surface-container': '#F1EDEC',
        'surface-container-low': '#F7F3F2',
        primary: '#000000',
        'on-primary': '#FFFFFF',
        secondary: '#585F6A',
        outline: '#747878',
        'outline-variant': '#C4C7C7',
        'border-light': '#E5E5E5',
        'on-surface-variant': '#444748',
        'surface-variant': '#E5E2E1',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'grid-unit': '40px',
        'sidebar-width': '256px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
        'topbar-height': '64px',
      },
      fontFamily: {
        display: ['DM Serif Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
