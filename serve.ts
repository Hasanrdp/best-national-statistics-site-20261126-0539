// Server statis kecil untuk menguji app/ di peramban lokal.
// Jalankan: node serve.ts [--port 8080]
// Hanya melayani berkas di bawah app/, tanpa jaringan.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "app");
const port = Number(process.argv.find((a, i) => process.argv[i - 1] === "--port") || 8080);

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const server = createServer((req, res) => {
  const path = decodeURIComponent((req.url || "/").split("?")[0]);
  const file = resolve(root, "." + (path === "/" ? "/index.html" : path));
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found\n");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});

server.listen(port, () => {
  console.log("Arunika serves app/ at http://localhost:" + port);
});
