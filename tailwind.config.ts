import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#06070B",
        surface: "#0C0E16",
        "surface-2": "#12141F",
        "surface-3": "#181B29",
        hairline: "rgba(245,246,250,0.08)",
        ink: "#F5F6FA",
        "ink-muted": "#9AA1B4",
        "ink-faint": "#5C6178",
        indigo: {
          DEFAULT: "#6E5BFF",
          soft: "#8B7CFF",
          dim: "#3A2FA8",
        },
        cyan: {
          DEFAULT: "#33E6C9",
          soft: "#7BF2DD",
        },
        amber: "#FFB56B",
        coral: "#FF6E6E",
      },
      fontFamily: {
        display: ["var(--font-valorant)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        shell: "1240px",
      },
      borderRadius: {
        xl2: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(110,91,255,0.25), 0 20px 60px -20px rgba(110,91,255,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(6,7,11,0.9) 85%), repeating-linear-gradient(0deg, rgba(245,246,250,0.05) 0px, rgba(245,246,250,0.05) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(245,246,250,0.05) 0px, rgba(245,246,250,0.05) 1px, transparent 1px, transparent 64px)",
        "aurora":
          "radial-gradient(60% 50% at 20% 10%, rgba(110,91,255,0.35), transparent 60%), radial-gradient(45% 40% at 85% 20%, rgba(51,230,201,0.22), transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(110,91,255,0.15), transparent 60%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
