import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain client-side SPA: `vite build` emits static files to dist/.
// Deep links (e.g. /app) are rewritten to index.html by vercel.json.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
});
