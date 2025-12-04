import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Temporary fix for noisy PostCSS deprecation warning:
// "[postcss] Replace color-adjust to print-color-adjust. The color-adjust shorthand is currently deprecated."
// Define a proper PostCSS plugin function so Vite/PostCSS can call it.
const fixColorAdjustPlugin = () => ({
  postcssPlugin: "fix-color-adjust",
  Declaration(decl) {
    if (decl.prop === "color-adjust") {
      decl.prop = "print-color-adjust";
    }
  },
});
fixColorAdjustPlugin.postcss = true;

export default {
  plugins: [fixColorAdjustPlugin, tailwindcss, autoprefixer],
};
