import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors : {
        primary : {
          1 : '#F5F5F5',
          2 : "#fff9",
          3 : "#ffffff24",
          4 : "#282828",
          5 : "#1A1A1A",
        },
        secondary : {
          1 : "#ffa1161f",
          2 : "#ffa116",
        },
        green : "#2cbb5e",
      }
    },
  },
  plugins: [],
} satisfies Config;
