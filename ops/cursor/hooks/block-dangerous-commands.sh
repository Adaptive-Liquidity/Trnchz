#!/usr/bin/env bash
# Block obviously dangerous command patterns passed on stdin or as "$1".
# Extend DENY_REGEX for your environment.

set -euo pipefail

input="${1:-}"
if [[ -z "$input" ]] && [[ ! -t 0 ]]; then
  input="$(cat)"
fi

DENY_REGEX='rm[[:space:]]+-rf[[:space:]]+/|curl[[:space:]]+[^|]*\|[[:space:]]*bash|mkfs\.|dd[[:space:]]+if=|:(){ :|:& };:|> /dev/sd'

if echo "$input" | grep -Eiq "$DENY_REGEX"; then
  echo "HOOK: blocked dangerous command pattern" >&2
  exit 1
fi

exit 0
