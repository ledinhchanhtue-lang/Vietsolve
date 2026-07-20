/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px mobile
        sm: "1.5rem", // 24px
        md: "2rem", // 32px tablet
        lg: "3rem", // 48px
        xl: "4.5rem", // 72px desktop
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        /* ---- VietSolve brand palette ---- */
        obsidian: "#07090D",
        graphite: "#11141A",
        ivory: "#F4F1EA",
        vs: {
          red: "#E21B2D",
          coral: "#FF4D58",
          steel: "#A7AFBC",
          muted: "#6B7280",
        },

        /* ---- shadcn semantic tokens (kept for ui/ components) ---- */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        /* fluid display scale */
        h1: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        h2: ["clamp(2rem, 4vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        h3: ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.16", letterSpacing: "-0.015em" }],
        "body-lg": ["clamp(1rem, 1.2vw, 1.25rem)", { lineHeight: "1.6" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 10rem)", // 72px → 160px
        "section-sm": "clamp(3rem, 6vw, 6rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "20px",
        stage: "24px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        hover: "180ms",
        ui: "300ms",
        reveal: "650ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "node-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.12)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "node-pulse": "node-pulse 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "dash-flow": "dash-flow 1.2s linear infinite",
        "fade-up": "fade-up 0.65s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
