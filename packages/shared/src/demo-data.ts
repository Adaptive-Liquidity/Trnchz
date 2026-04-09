import type {
  ArenaDetail,
  ArenaDetailResponse,
  ArenaListResponse,
  ArenaTickerItem,
  PositionRow,
  PositionsResponse,
} from "./schemas.js";
import {
  TOKEN_PROGRAM_ID,
} from "./constants.js";

export const PROJECTION_SOURCE = "projection-demo";

const updatedAt = "2026-04-08T00:00:00.000Z";
const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
const TREASURY_OWNER = "J7gM3q1PgVwWQ7wYQjD9o6j3VMeUNsXQdKx4mUMrA6Wh";

const ticker: ArenaTickerItem[] = [
  { id: "tick-1", label: "shadefall", value: "11 still holding", tone: "emerald" },
  { id: "tick-2", label: "cathedral", value: "recruiting 28 / 64", tone: "cyan" },
  { id: "tick-3", label: "neon", value: "three left, finalize live", tone: "violet" },
  { id: "tick-4", label: "custody", value: "wallet-signed only", tone: "rose" },
];

export const DEMO_ARENAS: ArenaDetail[] = [
  {
    arenaPubkey: "6jA7iZerfPjF4hQ4s7r4xNwh8Z9k4bEHpz1d2b3a4c5d",
    arenaId: "siege-of-shadefall",
    name: "Siege of Shadefall",
    status: "active",
    battleLotToken: "FROG",
    battleLotUi: "25,000 FROG",
    usdcStakeUi: "250 USDC",
    joinedCount: 64,
    activeCount: 11,
    survivorsTarget: 3,
    location: "Ash trench / green floodplain",
    synopsis:
      "The main spectacle board: toxic marsh on one flank, bone-line siegeworks on the other.",
    art: "/theme/generated/hero-panorama-bg.png",
    boardFrame: "/theme/generated/arena-board-bg.png",
    ctaLabel: "View board",
    potUi: "2,750 USDC",
    lifecycleLabel: "Active arena / surrender-only elimination",
    topography:
      "Split battlefield with toxic runoff, skull embankments, and a central kill corridor.",
    boardNotes: [
      "Join and surrender remain wallet-signed actions only.",
      "Projection can lag; chain state settles money paths.",
      "Finalization opens only when three live positions remain.",
    ],
    commands: {
      join: { enabled: false, label: "Join arena", reason: "Public shell keeps write actions gated." },
      leaveRecruiting: { enabled: false, label: "Leave recruiting", reason: "Arena is already live." },
      surrender: { enabled: false, label: "Surrender live", reason: "Requires a connected live position." },
      finalize: { enabled: false, label: "Finalize", reason: "Still above the final-three survivor threshold." },
      claim: { enabled: false, label: "Claim winnings", reason: "Only available to winners after finalize." },
    },
    accounts: {
      trackedMintPubkey: "6M4v8w6mLnaTr8xvYAKsEkP7QeDzM4F5moC6Tqu4sP6b",
      stakeMintPubkey: DEVNET_USDC_MINT,
      trackedTokenProgram: TOKEN_PROGRAM_ID,
      stakeTokenProgram: TOKEN_PROGRAM_ID,
      treasuryOwnerPubkey: TREASURY_OWNER,
    },
    finalizeWitnesses: [],
    launchMode: "shell",
    launchNotes: [
      "Frontend is polished for public viewing, but write actions stay behind a feature flag.",
      "Join and surrender flows become live only after real deployment metadata replaces demo projection rows.",
    ],
    protocolPulse: [
      { id: "shade-1", label: "pot", value: "2,750 USDC", tone: "violet" },
      { id: "shade-2", label: "battle lot", value: "25,000 FROG", tone: "emerald" },
      { id: "shade-3", label: "survivors", value: "11 / 3", tone: "rose" },
    ],
  },
  {
    arenaPubkey: "8sP8wvu9mE9m2Kn6n7g4WkA7bV9fL2rN6qJ1tY4o6p7x",
    arenaId: "cathedral-breach",
    name: "Cathedral Breach",
    status: "recruiting",
    battleLotToken: "BONK",
    battleLotUi: "80,000 BONK",
    usdcStakeUi: "100 USDC",
    joinedCount: 28,
    activeCount: 0,
    survivorsTarget: 3,
    location: "Blue gate / cathedral yard",
    synopsis:
      "A colder board with fortress framing for slower-burn recruiting and policy-safe onramp copy.",
    art: "/theme/generated/command-center-backplate.png",
    boardFrame: "/theme/generated/hero-shell-frame.png",
    ctaLabel: "Join queue",
    potUi: "2,800 USDC",
    lifecycleLabel: "Recruiting / leave allowed until the board fills",
    topography:
      "Collapsed gatehouse, fogged approach lane, and an interior command chamber for the read model.",
    boardNotes: [
      "Recruiting view should explain lot size and stake clearly.",
      "No timer language or offchain urgency cues.",
      "Arena creation remains a client-built transaction flow.",
    ],
    commands: {
      join: { enabled: true, label: "Join arena" },
      leaveRecruiting: { enabled: false, label: "Leave recruiting", reason: "Only available after this wallet has joined." },
      surrender: { enabled: false, label: "Surrender live", reason: "Arena has not activated yet." },
      finalize: { enabled: false, label: "Finalize", reason: "Arena must be live and reduced to three survivors." },
      claim: { enabled: false, label: "Claim winnings", reason: "No claimable winners in recruiting state." },
    },
    accounts: {
      trackedMintPubkey: "8B1gzjQX7dHNh4tW7xAB6qMtbZJvvQbQ2M9jx7oP8P1f",
      stakeMintPubkey: DEVNET_USDC_MINT,
      trackedTokenProgram: TOKEN_PROGRAM_ID,
      stakeTokenProgram: TOKEN_PROGRAM_ID,
      treasuryOwnerPubkey: TREASURY_OWNER,
    },
    finalizeWitnesses: [],
    launchMode: "shell",
    launchNotes: [
      "This board is the cleanest recruiting-state demo for a first public shell launch.",
      "When write mode turns on, the first happy path to validate is join then leave while still recruiting.",
    ],
    protocolPulse: [
      { id: "cat-1", label: "queue", value: "28 / 64", tone: "cyan" },
      { id: "cat-2", label: "entry", value: "100 USDC", tone: "emerald" },
      { id: "cat-3", label: "state", value: "recruiting", tone: "violet" },
    ],
  },
  {
    arenaPubkey: "C3rY1mfk8t6sV6L2m8p4rN7q4cB2xW5z9uQ1vT7aK2p",
    arenaId: "neon-no-mercy",
    name: "Neon No Mercy",
    status: "finalizable",
    battleLotToken: "WIF",
    battleLotUi: "12,500 WIF",
    usdcStakeUi: "500 USDC",
    joinedCount: 21,
    activeCount: 3,
    survivorsTarget: 3,
    location: "Crowd trench / neon board",
    synopsis:
      "A louder, busier board used as the finalizable showcase once the live count reaches three.",
    art: "/theme/generated/arena-board-bg.png",
    boardFrame: "/theme/generated/hero-shell-frame.png",
    ctaLabel: "Finalize view",
    potUi: "10,500 USDC",
    lifecycleLabel: "Finalizable / winners can be marked and claims can open",
    topography:
      "Crowd-lined embankments, neon signage, and a central projection slab for last-three state.",
    boardNotes: [
      "Finalizable means the survivor threshold has been met.",
      "Claim and finalize still need chain confirmation.",
      "Use this route for pressure-tested transaction UX.",
    ],
    commands: {
      join: { enabled: false, label: "Join arena", reason: "Arena is past recruiting." },
      leaveRecruiting: { enabled: false, label: "Leave recruiting", reason: "Arena is no longer recruiting." },
      surrender: { enabled: false, label: "Surrender live", reason: "Only valid for an active position owner." },
      finalize: { enabled: true, label: "Finalize" },
      claim: { enabled: false, label: "Claim winnings", reason: "Claims open after finalization." },
    },
    accounts: {
      trackedMintPubkey: "C8yeX4hWCNm3Ujo6mLQePeV2thh5Xx2VfRWW2mQpL3sm",
      stakeMintPubkey: DEVNET_USDC_MINT,
      trackedTokenProgram: TOKEN_PROGRAM_ID,
      stakeTokenProgram: TOKEN_PROGRAM_ID,
      treasuryOwnerPubkey: TREASURY_OWNER,
    },
    finalizeWitnesses: [
      {
        ownerPubkey: "4J5Q5XfNRzkYVx6Q4pQqmwQdJ1W2dgxqD31uB4j7hZeg",
        positionPubkey: "67xT7wKdJZKps9yLa8n3NQ6Wr5h12b1FQh3J6rZ8M9NP",
      },
      {
        ownerPubkey: "3sa7q2JgVhCzV1Q7rwPbw1jS53u1Xzc8YvYg15o1q8hj",
        positionPubkey: "D2WYJm5LpVt5f8Q2Kg2rK4EvE1VPEPMN3U5QJvN5zBke",
      },
      {
        ownerPubkey: "7kmUrFMi5jsw4jv1ZL8w8tW8Y2iW7fSyD31gW8gUx1DN",
        positionPubkey: "9QjM6nS8r3jPC35s8Pp3f9k2t6xC7vN4pW4eQj1mL6Q4",
      },
    ],
    launchMode: "shell",
    launchNotes: [
      "This is the release-candidate board for finalize/claim wiring.",
      "The transaction panel can build protocol instructions now, but shell launch keeps them off by default.",
    ],
    protocolPulse: [
      { id: "neon-1", label: "pot", value: "10,500 USDC", tone: "violet" },
      { id: "neon-2", label: "survivors", value: "3 / 3", tone: "emerald" },
      { id: "neon-3", label: "command", value: "finalize queued", tone: "cyan" },
    ],
  },
];

export const DEMO_ARENA_LIST: ArenaListResponse = {
  source: PROJECTION_SOURCE,
  updatedAt,
  arenas: DEMO_ARENAS.map(({ topography, boardNotes, commands, accounts, finalizeWitnesses, launchMode, launchNotes, protocolPulse, ...arena }) => arena),
  ticker,
};

export function getArenaDetailResponse(arenaId: string): ArenaDetailResponse | null {
  const arena = DEMO_ARENAS.find((entry) => entry.arenaId === arenaId) ?? null;

  if (!arena) {
    return null;
  }

  return {
    source: PROJECTION_SOURCE,
    updatedAt,
    arena,
  };
}

export function getDemoPositions(wallet: string): PositionsResponse {
  const compactWallet = `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;

  const positions: PositionRow[] = [
    {
      positionPubkey: `${wallet}-shadefall`,
      arenaId: "siege-of-shadefall",
      arenaName: "Siege of Shadefall",
      status: "live",
      battleLotUi: "25,000 FROG",
      usdcStakeUi: "250 USDC",
      lastAction: `Joined from ${compactWallet}`,
      actionLabel: "Surrender or survive",
      canClaim: false,
    },
    {
      positionPubkey: `${wallet}-neon`,
      arenaId: "neon-no-mercy",
      arenaName: "Neon No Mercy",
      status: "claimable",
      battleLotUi: "12,500 WIF",
      usdcStakeUi: "500 USDC",
      lastAction: "Finalizable board reached survivor threshold",
      actionLabel: "Ready to claim after finalize",
      canClaim: true,
    },
  ];

  return {
    source: PROJECTION_SOURCE,
    updatedAt,
    wallet,
    positions,
  };
}
