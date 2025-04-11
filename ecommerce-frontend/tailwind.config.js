/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ff7700", // Vibrant orange
          foreground: "#ffffff",
          light: "#ff9a3c", // Lighter orange
          dark: "#e56b00", // Darker orange
        },
        secondary: {
          DEFAULT: "#ff9a3c", // Lighter orange
          foreground: "#ffffff",
          light: "#ffb366", // Even lighter orange
          dark: "#ff8c1a", // Slightly darker orange
        },
        destructive: {
          DEFAULT: "#ff4d4d", // Red for destructive actions
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f1f1",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#ffffff", // White accent
          foreground: "#333333",
          light: "#ffffff",
          dark: "#f0f0f0",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#333333",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      spacing: {
        container: "2rem",
        section: "4rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}
