#!/usr/bin/env bash
# Deprecated name: forwards to require-tests-on-program-changes.sh
# Prefer calling require-tests-on-program-changes.sh directly in new configs.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$SCRIPT_DIR/require-tests-on-program-changes.sh" "$@"
