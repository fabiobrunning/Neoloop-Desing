/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue': ['"Neue Einstellung"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
        'pt-sans': ['"PT Sans"', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'sarala': ['Sarala', 'sans-serif'],
        'monda': ['Monda', 'sans-serif'],
        'jura': ['Jura', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

