import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import {
  DEMO_ARENA_LIST,
  HealthResponseSchema,
  PROJECTION_SOURCE,
  getArenaDetailResponse,
  getDemoPositions,
} from "@holder-v-holder/shared";

function writeJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,OPTIONS",
    "access-control-allow-headers": "content-type",
    "content-type": "application/json",
  });
  res.end(JSON.stringify(body));
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  if (req.method === "OPTIONS") {
    writeJson(res, 200, { ok: true });
    return;
  }

  const url = new URL(req.url ?? "/", "http://127.0.0.1");

  if (req.method === "GET" && url.pathname === "/health") {
    const payload = HealthResponseSchema.parse({
      ok: true,
      service: "holder-v-holder-indexer",
      source: PROJECTION_SOURCE,
    });
    writeJson(res, 200, payload);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/arenas") {
    writeJson(res, 200, DEMO_ARENA_LIST);
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/arenas/")) {
    const arenaId = url.pathname.replace("/api/arenas/", "");
    const payload = getArenaDetailResponse(arenaId);

    if (!payload) {
      writeJson(res, 404, { error: "arena_not_found" });
      return;
    }

    writeJson(res, 200, payload);
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/wallet/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const wallet = parts[2];
    const resource = parts[3];

    if (!wallet || resource !== "positions") {
      writeJson(res, 404, { error: "not_found" });
      return;
    }

    writeJson(res, 200, getDemoPositions(wallet));
    return;
  }

  writeJson(res, 404, { error: "not_found" });
}

/**
 * Minimal HTTP surface for health checks and read-only projection APIs.
 * No settlement or winner logic - chain + DB projection only.
 */
export function startHealthServer(port: number): void {
  const server = createServer(handleRequest);
  server.listen(port, () => {
    console.log(`[indexer] http listening on :${port} (/health, /api/arenas, /api/wallet/:wallet/positions)`);
  });
}
