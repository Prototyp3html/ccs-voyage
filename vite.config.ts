import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ command, mode }) => {
	const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
	const envDefine = Object.fromEntries(
		Object.entries(loadedEnv).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
	);

	const config = {
		define: envDefine,
		resolve: {
			alias: {
				"@": `${process.cwd()}/src`,
			},
			dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
		},
		plugins: [
			tailwindcss(),
			tsconfigPaths({ projects: ["./tsconfig.json"] }),
			tanstackStart(),
			react(),
			...(command === "build" ? [cloudflare({ viteEnvironment: { name: "ssr" } })] : []),
		],
		server: {
			host: "::",
			port: 8080,
		},
	};

	return mergeConfig(config, {});
});
