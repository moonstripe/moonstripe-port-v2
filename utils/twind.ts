import { IS_BROWSER } from "fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      cube: 'Inter'
    },
    extend: {
      colors: {
        'neutral': "#9DB4C0",
        'bg-dark': "#253237",
        'bg-light': "#E0FBFC",
        'bump-start': "#2596be",
        'bump-end': "#d22cae",
      },
    },
  },
};
if (IS_BROWSER) setup(config);
