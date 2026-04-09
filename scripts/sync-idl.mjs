/**
 * Copies Anchor artifacts from `target/` into `packages/sdk` after `anchor build`.
 * Canonical JSON IDL name follows the `#[program]` module name: `hvh.json`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(fileURLToPath(new URL(".", import.meta.url)), "..");
const idlSrc = path.join(root, "target", "idl", "hvh.json");
const idlDst = path.join(root, "packages", "sdk", "src", "idl", "hvh.json");
const typesSrc = path.join(root, "target", "types", "hvh.ts");
const typesDst = path.join(root, "packages", "sdk", "src", "generated", "hvh.ts");

function copyIfMissing(src, dst, label) {
  if (!fs.existsSync(src)) {
    console.error(`[sync-idl] Missing ${label}: ${src}`);
    console.error("Run `anchor build` from the repo root (WSL/Linux recommended on Windows).");
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  console.log(`[sync-idl] ${label}: ${src} -> ${dst}`);
}

copyIfMissing(idlSrc, idlDst, "IDL");
if (fs.existsSync(typesSrc)) {
  copyIfMissing(typesSrc, typesDst, "TS types");
} else {
  console.warn(`[sync-idl] Optional ${typesSrc} not found; skipping types copy.`);
}
