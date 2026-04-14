import { cp, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const sourceAssets = resolve("dist/client/assets");
const targetAssets = resolve("public/assets");

const sourceExists = await stat(sourceAssets).then(() => true).catch(() => false);

if (!sourceExists) {
  console.error("Missing dist/client/assets. Run build first.");
  process.exit(1);
}

await rm(targetAssets, { recursive: true, force: true });
await cp(sourceAssets, targetAssets, { recursive: true });

console.log("Copied dist/client/assets to public/assets for Vercel static serving.");
