import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        farm: {
          bg: "#0E0E0E",
          card: "#171717",
          text: "#FFFFFF",
          subtext: "#B5B5B5",
          muted: "#7A7A7A",
          red: "#B11226",
        },
      },
      borderRadius: {
        xl: "16px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
