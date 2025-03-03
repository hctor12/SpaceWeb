import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        space: {
          dark: "#0B0E17",
          accent: "#4C9EE8",
          light: "#DDE8FF",
          nebula: "#68B5FF",
          star: "#FFD700",
          meteor: "#FF5E5B"
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(110, 86, 207, 0)" 
          },
          "50%": { 
            boxShadow: "0 0 0 15px rgba(110, 86, 207, 0.2)" 
          }
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "meteor": {
          "0%": { transform: "translateX(0) translateY(0) rotate(0deg)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { 
            transform: "translateX(1000px) translateY(1000px) rotate(45deg)", 
            opacity: "0" 
          }
        },
        "cursor-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.6s ease-out",
        "fade-in-left": "fade-in-left 0.6s ease-out",
        "star-twinkle": "star-twinkle 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 15s linear infinite",
        "meteor": "meteor 5s linear infinite",
        "cursor-pulse": "cursor-pulse 2s ease-in-out infinite"
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
