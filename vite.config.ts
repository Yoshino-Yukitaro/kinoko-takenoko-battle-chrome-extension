import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
	root: resolve(__dirname, "src"),
	plugins: [react(), crx({ manifest })],
});
