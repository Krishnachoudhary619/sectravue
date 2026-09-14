import { cpSync, existsSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");

if (!existsSync(out)) {
  throw new Error("out/ is missing. Run next build first.");
}

for (const name of readdirSync(out)) {
  if (name === "images") continue;
  const from = join(out, name);
  const to = join(root, name);
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

const imagesLink = join(root, "images");
rmSync(imagesLink, { recursive: true, force: true });
symlinkSync("public/images", imagesLink);

console.log("Published static files to repo root for Vercel.");
