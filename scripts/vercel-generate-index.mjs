import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const serverBuild = await import(pathToFileURL(resolve("dist/server/index.js")).href);
const app = serverBuild.default;

if (!app || typeof app.fetch !== "function") {
  console.error("Could not load server fetch handler from dist/server/index.js");
  process.exit(1);
}

const response = await app.fetch(new Request("https://vercel.local/"));
if (!response.ok) {
  console.error(`Failed to render index.html: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const html = await response.text();
await writeFile(resolve("dist/client/index.html"), html, "utf8");

console.log("Generated dist/client/index.html for Vercel static deployment.");
