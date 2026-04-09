# Runbook — WSL2 + Anchor build (Holder v. Holder)

Use this when you want a **full** `anchor build` (including **IDL**) without Windows-only workarounds. Work happens inside **Ubuntu on WSL2**; the repo should live on the **Linux filesystem** (e.g. `~/dev/trenchz`), not only under `/mnt/c/...`.

**Pinned versions:** see [`../TOOLCHAIN.md`](../TOOLCHAIN.md) — Rust **1.85.0**, Solana **1.18.26**, Anchor **0.30.1**.

---

## Phase A — You: Windows (Admin PowerShell)

Run **Windows PowerShell as Administrator** once.

### A1. Install WSL + Ubuntu (if not already installed)

```powershell
wsl --install
```

If WSL is already installed, ensure a default distro exists:

```powershell
wsl --list --online
wsl --install -d Ubuntu-24.04
```

(Use **Ubuntu-22.04** or **Ubuntu-24.04**; both work. Pick one LTS.)

### A2. Reboot if Windows asks

After first install, restart the PC if prompted.

### A3. Optional: WSL version

```powershell
wsl --version
wsl --set-default-version 2
```

---

## Phase B — You: Ubuntu (first launch)

1. Open **Ubuntu** from the Start menu.
2. Create a UNIX username and password when prompted.
3. Update packages:

```bash
sudo apt update && sudo apt upgrade -y
```

### B1. Base build packages (no admin on Windows; `sudo` in Linux)

```bash
sudo apt install -y build-essential pkg-config libssl-dev libudev-dev protobuf-compiler curl git
```

**Expected noise:** `apt upgrade` on a new Ubuntu may pull **dozens** of security updates; the install step adds **gcc/make/dev headers** and similar so Rust and Solana can compile native code. That volume is normal, not extra “project bloat.”

---

## Phase C — You: Rust, Solana, Anchor (inside Ubuntu)

### C1. Rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env
```

After you clone the repo, `cd` into it — **`rust-toolchain.toml`** will pick **Rust 1.85.0** automatically:

```bash
rustup show
```

### C2. Solana CLI 1.18.26

**Preferred (official installer):**

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.18.26/install)"
```

If that fails with **`SSL_ERROR_SYSCALL`** (or similar) but **GitHub** works in the same WSL session, install from the **GitHub release asset** instead:

```bash
cd ~
curl -sSfL -o /tmp/solana-1.18.26.tar.bz2 \
  https://github.com/solana-labs/solana/releases/download/v1.18.26/solana-release-x86_64-unknown-linux-gnu.tar.bz2
tar jxf /tmp/solana-1.18.26.tar.bz2
# Produces ~/solana-release/bin/solana (and other binaries)
grep -q 'solana-release/bin' ~/.bashrc || echo 'export PATH="$HOME/solana-release/bin:$PATH"' >> ~/.bashrc
export PATH="$HOME/solana-release/bin:$PATH"
solana --version   # expect 1.18.26
```

Close and reopen the Ubuntu terminal after the official installer; for the tarball method, **`export PATH=...`** or `source ~/.bashrc` is enough:

```bash
source ~/.profile
# or: source ~/.bashrc
solana --version   # expect 1.18.26
```

### C3. Anchor via AVM (0.30.1)

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
source ~/.cargo/env
avm install 0.30.1
avm use 0.30.1
anchor --version   # anchor-cli 0.30.1
```

Ensure Cargo bin is on `PATH` (rustup usually adds this; if `anchor` not found):

```bash
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

## Phase D — Repo on the Linux disk

Avoid **only** building from `/mnt/c/Users/...` (slow, occasional toolchain quirks).

### D1. Copy or clone into `$HOME`

```bash
mkdir -p ~/dev
cd ~/dev
```

**Option 1 — Git clone** (if you use a remote):

```bash
git clone <your-remote-url> trenchz
cd trenchz
```

**Option 2 — Copy from Windows download** (one-time; adjust Windows username):

```bash
cp -a /mnt/c/Users/Benna/Downloads/trenchz ~/dev/trenchz
cd ~/dev/trenchz
```

### D2. Git safe directory (if `git status` warns about ownership)

```bash
git config --global --add safe.directory ~/dev/trenchz
```

---

## Phase E — Verify toolchain (script)

From the **repo root** in Ubuntu:

```bash
chmod +x scripts/wsl-toolchain-check.sh
./scripts/wsl-toolchain-check.sh
```

Fix anything it prints before continuing.

---

## Phase F — Anchor build + SDK sync

From **repo root** (`Anchor.toml` visible):

```bash
cd ~/dev/trenchz
export PATH="$HOME/solana-release/bin:$PATH"
source ~/.cargo/env
anchor build
```

Expect artifacts under `target/deploy/`, `target/idl/hvh.json`, and `target/types/hvh.ts`.

**If IDL fails** with **`no method named source_file`** on **`anchor-syn`** / **`proc_macro2::Span`**: Anchor **0.30.1** predates newer **`proc-macro2`** APIs. Build the program **without** IDL (artifacts still land in `target/deploy/`):

```bash
anchor build --no-idl
```

Committed IDL under `packages/sdk` stays valid until you change on-chain instructions; then try a **pinned nightly** for one-off IDL regen (see [`../TOOLCHAIN.md`](../TOOLCHAIN.md)) or upgrade Anchor when the repo does.

### Node (optional, for web + `anchor:idl:sync`)

Install Node **20+** (e.g. [NodeSource](https://github.com/nodesource/distributions) or `nvm`). Then:

```bash
npm install
npm run anchor:idl:sync
```

---

## Phase G — Edit from Windows (optional)

In **Cursor** or **VS Code**, open the WSL path, e.g.:

`\\wsl$\Ubuntu\home\<your-linux-user>\dev\trenchz`

You edit the same files you build in Ubuntu.

---

## Troubleshooting

| Issue | What to try |
|--------|-------------|
| `anchor`: command not found | `source ~/.cargo/env` and ensure `~/.cargo/bin` is on `PATH`. |
| `solana`: wrong version | Re-run the Solana install script for **v1.18.26**; open a new terminal. |
| Lockfile v4 error | From repo root: `rustup run solana cargo generate-lockfile --manifest-path programs/holder_arena/Cargo.toml` (requires `solana` rustup toolchain from Solana install). |
| **`source_file` / `anchor-syn` / IDL failed** | Use `anchor build --no-idl` for the `.so`; see Phase F and [`../TOOLCHAIN.md`](../TOOLCHAIN.md). |
| Out of disk in WSL | `wsl --shutdown` in PowerShell; in Windows: Settings → System → Storage → WSL → clean distros or expand VHD. |

---

## References

- [`../TOOLCHAIN.md`](../TOOLCHAIN.md) — pins, Windows notes, `--no-idl` when staying on Windows only.
- [Solana CLI install](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor install](https://www.anchor-lang.com/docs/installation)
