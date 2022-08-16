import { IS_BROWSER } from "fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif']
    }
    
  }
};
if (IS_BROWSER) setup(config);
