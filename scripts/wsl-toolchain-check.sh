#!/usr/bin/env bash
# Run inside WSL (Ubuntu) from the repo root. Verifies versions expected by docs/TOOLCHAIN.md.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

need() { command -v "$1" >/dev/null 2>&1 || { echo "MISSING: $1"; exit 1; }; }

echo "== Repo =="
echo "ROOT=$ROOT"
test -f Anchor.toml || { echo "FAIL: Anchor.toml not found (run from repo root)"; exit 1; }
echo "OK Anchor.toml"

echo ""
echo "== Commands =="
need rustc
need cargo
need solana
need anchor

echo ""
echo "== Versions (expected: rustc 1.85.0, solana 1.18.26, anchor-cli 0.30.1) =="
RUST_V="$(rustc --version)"
echo "rustc: $RUST_V"
echo "cargo: $(cargo --version)"
echo "solana: $(solana --version | head -n1)"
echo "anchor: $(anchor --version)"

echo ""
echo "== Cargo.lock (expect first line 'version = 3' for Solana 1.18 SBF) =="
LOCK="$ROOT/programs/holder_arena/Cargo.lock"
if [[ -f "$LOCK" ]]; then
  head -n 4 "$LOCK"
else
  echo "WARN: no programs/holder_arena/Cargo.lock"
fi

echo ""
FAIL=0
echo "$RUST_V" | grep -q '1.85.0' || { echo "WARN: rustc is not 1.85.0 (rust-toolchain.toml may still override in repo)"; }
solana --version | head -n1 | grep -q '1.18.26' || { echo "FAIL: solana should be 1.18.26"; FAIL=1; }
anchor --version | grep -q '0.30.1' || { echo "FAIL: anchor should be 0.30.1"; FAIL=1; }

if [[ "$FAIL" -ne 0 ]]; then
  echo ""
  echo "Fix versions per docs/TOOLCHAIN.md and docs/runbooks/wsl-anchor-setup.md"
  exit 1
fi

echo ""
echo "OK — try: anchor build"
