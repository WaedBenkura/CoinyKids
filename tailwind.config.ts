import type { Config } from "tailwindcss"
import aspectRatio from "@tailwindcss/aspect-ratio"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        }
      }
    },
  },
  plugins: [aspectRatio],
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config
