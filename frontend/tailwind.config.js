/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brahma: {
          black: '#000000',
          dark: '#070707',
          surface: '#0B0B0B',
          card: '#121212',
          cardHover: '#181818',
          border: '#222222',
          borderSubtle: '#1A1A1A',
          borderHighlight: '#333333',
          magenta: '#FF00A8',
          magentaHover: '#D9008F',
          magentaGlow: 'rgba(255, 0, 168, 0.25)',
          muted: '#A1A1AA',
          dim: '#666666',
        }
      },
      fontFamily: {
        sans: ['"Google Sans"', '"Google Sans Text"', 'Geist', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Google Sans"', 'Geist', 'Inter', '"Space Grotesk"', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', '"Google Sans Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
