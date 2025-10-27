/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1",
          foreground: "#111827",
        },
        surface: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}
