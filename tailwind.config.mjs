/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#090a0f',
          900: '#0d1117',
          850: '#131620',
          800: '#161b26',
          700: '#212638',
          600: '#2d3348',
        },
        brand: {
          50: '#f0fdf4',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
      }
    },
  },
  plugins: [],
};
