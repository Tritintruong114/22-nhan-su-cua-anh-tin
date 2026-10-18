#!/usr/bin/env bash
# scaffold-workspace.sh — create an OpenClaw Use-Case Factory workspace.
# Usage: scaffold-workspace.sh <slug> [output-root]

set -euo pipefail

SLUG="${1:-}"
ROOT="${2:-/home/node/.openclaw/workspace/content/usecases}"

if [[ -z "$SLUG" ]]; then
  echo "usage: scaffold-workspace.sh <slug> [output-root]" >&2
  exit 2
fi

if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "invalid slug: $SLUG" >&2
  echo "use lowercase letters, numbers, and hyphens only" >&2
  exit 2
fi

WS_DIR="$ROOT/ws-$SLUG"
RESEARCH_DIR="$WS_DIR/_research"

mkdir -p "$RESEARCH_DIR"

if [[ ! -f "$WS_DIR/brief.md" ]]; then
  cat > "$WS_DIR/brief.md" <<EOF
# Brief: $SLUG

- Idea:
- Target market:
- Target user / buyer hypothesis:
- Problem / pain hypothesis:
- Core loop, if already known:
- MVP cut line, if already known:
EOF
fi

touch "$RESEARCH_DIR/worker-A-market-sizing.md"
touch "$RESEARCH_DIR/worker-B-jtbd-pain.md"
touch "$RESEARCH_DIR/worker-C-competitor-substitute.md"
touch "$RESEARCH_DIR/worker-D-persona-wtp.md"

echo "$WS_DIR"
