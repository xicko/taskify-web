import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fontWeightChange: {
          "0%, 100%": { fontWeight: "800" },
          "50%": { fontWeight: "200" },
        },
        fontWeightChange2: {
          "0%, 100%": { fontWeight: "700" },
          "50%": { fontWeight: "400" },
        },
      },
      animation: {
        fontWeightPulse: "fontWeightChange 4s ease-in-out infinite",
        fontWeightPulse2: "fontWeightChange2 7s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
