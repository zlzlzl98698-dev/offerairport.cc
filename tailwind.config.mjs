/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          page: 'var(--bg-page)',
          surface: 'var(--bg-surface)',
          dark: 'var(--bg-observatory)',
          'dark-card': 'var(--bg-observatory-card)',
        },
        text: {
          title: 'var(--text-title)',
          body: 'var(--text-body)',
          muted: 'var(--text-muted)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          soft: 'var(--brand-soft)',
        },
        border: {
          subtle: 'var(--border-subtle)',
        },
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [typography],
};
