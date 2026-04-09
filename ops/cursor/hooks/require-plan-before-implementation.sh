#!/usr/bin/env bash
# Optional: set CURSOR_PLAN_OK=1 in environment after Plan Mode is approved.
# Integrate with your Cursor hook payload (stdin JSON) for real enforcement.

set -euo pipefail

if [[ "${CURSOR_PLAN_OK:-}" != "1" ]]; then
  echo "HOOK: set CURSOR_PLAN_OK=1 after plan approval, or customize this hook." >&2
  # Uncomment to hard-fail:
  # exit 1
fi

exit 0
