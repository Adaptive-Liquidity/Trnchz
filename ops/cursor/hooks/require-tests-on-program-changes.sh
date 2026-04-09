#!/usr/bin/env bash
# CI-oriented: fail the job if programs/** changed without matching test changes.
# Customize PROGRAM_GLOB and TEST_GLOB for this repo layout (Anchor: programs/holder_arena, tests/program).
#
# Usage (CI): git fetch origin main && BASE=origin/main ./require-tests-on-program-changes.sh
# Local stub: exits 0 with a reminder unless RUN_STRICT=1.

set -euo pipefail

BASE="${BASE:-origin/main}"
RUN_STRICT="${RUN_STRICT:-0}"

if [[ "$RUN_STRICT" != "1" ]]; then
  echo "HOOK: require-tests-on-program-changes — set RUN_STRICT=1 and BASE=<ref> in CI to enforce git diff."
  exit 0
fi

if ! git rev-parse "$BASE" >/dev/null 2>&1; then
  echo "HOOK: base ref $BASE not found; skip strict check." >&2
  exit 0
fi

mapfile -t prog < <(git diff --name-only "$BASE"...HEAD | grep -E '^programs/' || true)
mapfile -t tst < <(git diff --name-only "$BASE"...HEAD | grep -E '^(tests/|.*\.rs$)' || true)

if [[ ${#prog[@]} -gt 0 && ${#tst[@]} -eq 0 ]]; then
  echo "HOOK: program files changed without detected test file changes. Update tests or adjust patterns." >&2
  echo "Changed program files:" >&2
  printf '  %s\n' "${prog[@]}" >&2
  exit 1
fi

exit 0
