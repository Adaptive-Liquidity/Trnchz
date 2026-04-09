export const ARENA_TX_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ARENA_TX === "true";
export const LAUNCH_MODE = ARENA_TX_ENABLED ? "live" : "shell";
