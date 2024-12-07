import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest";
import { join, resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
	root: resolve(__dirname, "src"),
	publicDir: resolve(__dirname, "public"),
	build: {
		outDir: resolve(__dirname, "dist"),
		rollupOptions: {
			input: {
				// see web_accessible_resources in the manifest config
				welcome: join(__dirname, "src/welcome/welcome.html"),
			},
			output: {
				chunkFileNames: "assets/chunk-[hash].js",
			},
		},
	},
	plugins: [react(), crx({ manifest })],
});
