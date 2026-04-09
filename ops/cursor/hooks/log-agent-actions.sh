#!/usr/bin/env bash
# Append one JSON line per invocation for local audit. Set LOG_DIR.
set -euo pipefail

LOG_DIR="${AGENT_LOG_DIR:-${TMPDIR:-/tmp}/holder-v-holder-agent-logs}"
mkdir -p "$LOG_DIR"
echo "{\"ts\":\"$(date -Iseconds)\",\"event\":\"agent_hook\",\"msg\":\"${1:-ping}\"}" >>"$LOG_DIR/actions.log"
