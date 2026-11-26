// Arunika — program penyerahan untuk make.fun.
// Menyalin app/ dan screenshots/ dari repositori ke direktori keluaran
// lalu menulis dossier.json dengan buildDossier dari
// vendor/makefun-frontend.ts. Hanya pustaka standar Node.
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output.
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

function copyTree(name: string): void {
  const from = join(repoRoot, name);
  const to = join(outputDir, name);
  if (!existsSync(from)) {
    throw new Error("missing directory in repository: " + name);
  }
  mkdirSync(to, { recursive: true });
  const entries = readdirSync(from, { withFileTypes: true }).sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
  for (const entry of entries) {
    if (entry.isDirectory()) {
      copyTree(join(name, entry.name));
    } else if (entry.isFile()) {
      cpSync(join(from, entry.name), join(to, entry.name));
    }
  }
}

mkdirSync(outputDir, { recursive: true });
copyTree("app");
copyTree("screenshots");

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});
writeFileSync(join(outputDir, "dossier.json"), dossier);
console.log("wrote " + join(outputDir, "dossier.json") + " (" + dossier.length + " bytes)");
