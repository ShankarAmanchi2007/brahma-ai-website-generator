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
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Space Grotesk"', '"Outfit"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
