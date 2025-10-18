/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        // Corporate Palette
        "deep-navy-blue": "#0D1B2A",
        "bright-teal": "#1B9AAA",
        "warm-gold": "#FFC300",
        "soft-off-white": "#F5F7FA",
        "charcoal-gray": "#343A40",
        "crimson-red": "#E63946",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [forms],
};
