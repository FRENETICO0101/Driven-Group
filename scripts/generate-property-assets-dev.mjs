import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "assets", "properties");
const publicRoot = path.join(root, "public", "property-assets");
const manifestPath = path.join(root, "src", "lib", "generated", "property-catalog.json");
const generatorPath = path.join(root, "scripts", "generate-property-assets.mjs");

function newestModifiedTime(directory) {
  if (!existsSync(directory)) return 0;
  return readdirSync(directory).reduce((newest, entry) => {
    const entryPath = path.join(directory, entry);
    const stats = statSync(entryPath);
    return Math.max(newest, stats.isDirectory() ? newestModifiedTime(entryPath) : stats.mtimeMs);
  }, statSync(directory).mtimeMs);
}

const generatedAt = existsSync(manifestPath) ? statSync(manifestPath).mtimeMs : 0;
const sourceChangedAt = Math.max(newestModifiedTime(sourceRoot), statSync(generatorPath).mtimeMs);
if (existsSync(publicRoot) && generatedAt >= sourceChangedAt) {
  console.log("Property assets are unchanged; reusing generated files.");
} else {
  await import("./generate-property-assets.mjs");
}
