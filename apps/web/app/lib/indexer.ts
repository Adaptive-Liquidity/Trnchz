import {
  ArenaDetailResponseSchema,
  ArenaListResponseSchema,
  DEMO_ARENA_LIST,
  DEMO_ARENAS,
  type ArenaDetailResponse,
  type ArenaListResponse,
  getArenaDetailResponse,
} from "@holder-v-holder/shared";

const indexerBase =
  process.env.INDEXER_URL ??
  process.env.NEXT_PUBLIC_INDEXER_URL ??
  "http://127.0.0.1:8080";

async function fetchJson<T>(
  path: string,
  parse: (value: unknown) => T,
  fallback: T
): Promise<T> {
  try {
    const response = await fetch(new URL(path, indexerBase), {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });

    if (!response.ok) {
      return fallback;
    }

    return parse(await response.json());
  } catch {
    return fallback;
  }
}

export async function getArenaList(): Promise<ArenaListResponse> {
  return fetchJson(
    "/api/arenas",
    (value) => ArenaListResponseSchema.parse(value),
    DEMO_ARENA_LIST
  );
}

export async function getArenaDetail(arenaId: string): Promise<ArenaDetailResponse> {
  const fallbackTemplate = DEMO_ARENAS[0];
  const fallback = getArenaDetailResponse(arenaId) ?? {
    source: DEMO_ARENA_LIST.source,
    updatedAt: DEMO_ARENA_LIST.updatedAt,
    arena: {
      ...fallbackTemplate,
      arenaId,
      name: `Arena ${arenaId}`,
      synopsis: "Fallback projection row used while the live indexer route is unavailable.",
      topography: "Projection fallback board",
      boardNotes: [
        "Indexer detail endpoint unavailable.",
        "UI fell back to shared projection data.",
      ],
      lifecycleLabel: "Projection fallback / launch shell diagnostics",
      launchNotes: [
        "The detail endpoint is unavailable, so the web app is rendering the shared fallback arena.",
      ],
      protocolPulse: [
        { id: `fallback-${arenaId}-1`, label: "projection", value: "fallback active", tone: "rose" },
        { id: `fallback-${arenaId}-2`, label: "mode", value: fallbackTemplate.launchMode, tone: "violet" },
      ],
    },
  };

  return fetchJson(
    `/api/arenas/${arenaId}`,
    (value) => ArenaDetailResponseSchema.parse(value),
    fallback
  );
}
