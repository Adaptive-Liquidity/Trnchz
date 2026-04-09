import { z } from "zod";

export const ArenaStatusSchema = z.enum([
  "recruiting",
  "active",
  "finalizable",
  "settled",
]);

export const ArenaTickerToneSchema = z.enum(["emerald", "violet", "rose", "cyan"]);

export const ArenaTickerItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  tone: ArenaTickerToneSchema,
});

export const ActionStateSchema = z.object({
  enabled: z.boolean(),
  label: z.string(),
  reason: z.string().optional(),
});

export const ArenaCommandSetSchema = z.object({
  join: ActionStateSchema,
  leaveRecruiting: ActionStateSchema,
  surrender: ActionStateSchema,
  finalize: ActionStateSchema,
  claim: ActionStateSchema,
});

export const ArenaAccountSetSchema = z.object({
  trackedMintPubkey: z.string(),
  stakeMintPubkey: z.string(),
  trackedTokenProgram: z.string(),
  stakeTokenProgram: z.string(),
  treasuryOwnerPubkey: z.string(),
});

export const FinalizeWitnessSchema = z.object({
  ownerPubkey: z.string(),
  positionPubkey: z.string(),
});

export const ArenaRowSchema = z.object({
  arenaPubkey: z.string(),
  arenaId: z.string(),
  name: z.string(),
  status: ArenaStatusSchema,
  battleLotToken: z.string(),
  battleLotUi: z.string(),
  usdcStakeUi: z.string(),
  joinedCount: z.number().int().nonnegative(),
  activeCount: z.number().int().nonnegative(),
  survivorsTarget: z.number().int().positive(),
  location: z.string(),
  synopsis: z.string(),
  art: z.string(),
  boardFrame: z.string(),
  ctaLabel: z.string(),
  potUi: z.string(),
  lifecycleLabel: z.string(),
});

export const ArenaListResponseSchema = z.object({
  source: z.string(),
  updatedAt: z.string(),
  arenas: z.array(ArenaRowSchema),
  ticker: z.array(ArenaTickerItemSchema),
});

export const ArenaDetailSchema = ArenaRowSchema.extend({
  topography: z.string(),
  boardNotes: z.array(z.string()),
  commands: ArenaCommandSetSchema,
  accounts: ArenaAccountSetSchema,
  finalizeWitnesses: z.array(FinalizeWitnessSchema),
  launchMode: z.enum(["shell", "live"]),
  launchNotes: z.array(z.string()),
  protocolPulse: z.array(ArenaTickerItemSchema),
});

export const ArenaDetailResponseSchema = z.object({
  source: z.string(),
  updatedAt: z.string(),
  arena: ArenaDetailSchema,
});

export const PositionRowSchema = z.object({
  positionPubkey: z.string(),
  arenaId: z.string(),
  arenaName: z.string(),
  status: z.enum(["live", "surrendered", "claimable"]),
  battleLotUi: z.string(),
  usdcStakeUi: z.string(),
  lastAction: z.string(),
  actionLabel: z.string(),
  canClaim: z.boolean(),
});

export const PositionsResponseSchema = z.object({
  source: z.string(),
  updatedAt: z.string(),
  wallet: z.string(),
  positions: z.array(PositionRowSchema),
});

export const HealthResponseSchema = z.object({
  ok: z.boolean(),
  service: z.string(),
  source: z.string().optional(),
});

export type ArenaStatus = z.infer<typeof ArenaStatusSchema>;
export type ArenaTickerTone = z.infer<typeof ArenaTickerToneSchema>;
export type ArenaTickerItem = z.infer<typeof ArenaTickerItemSchema>;
export type ActionState = z.infer<typeof ActionStateSchema>;
export type ArenaCommandSet = z.infer<typeof ArenaCommandSetSchema>;
export type ArenaAccountSet = z.infer<typeof ArenaAccountSetSchema>;
export type FinalizeWitness = z.infer<typeof FinalizeWitnessSchema>;
export type ArenaRow = z.infer<typeof ArenaRowSchema>;
export type ArenaListResponse = z.infer<typeof ArenaListResponseSchema>;
export type ArenaDetail = z.infer<typeof ArenaDetailSchema>;
export type ArenaDetailResponse = z.infer<typeof ArenaDetailResponseSchema>;
export type PositionRow = z.infer<typeof PositionRowSchema>;
export type PositionsResponse = z.infer<typeof PositionsResponseSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
