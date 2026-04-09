# Shell Image Prompt Pack

These prompts are for **original, non-derivative**, UI-safe shell/background assets for the Holder v. Holder frontend.

Design intent:

- premium meme-native collectible energy
- dark tactical trench warfare
- polished enough for landing-page and command-center use
- strong edges, controlled center, and generous negative space for overlay UI
- no direct reuse of user-provided reference art

Global avoid list:

`text`, `logos`, `watermarks`, `captions`, `UI labels`, `countdowns`, `timers`, `scoreboards`, `gameplay HUD`, `token price charts`, `offchain settlement cues`, `wallet screenshots`, `real-world brands`, `exact BAYC/MAYC lookalikes`, `direct ape clones`, `photorealism`, `flat vector art`, `busy center composition`, `cluttered typography`, `blurry edges`, `low detail`, `bad anatomy`, `extra limbs`, `oversaturated rainbow wash`, `cheap meme filters`

## 1. Hero panorama background

- Filename: `hero-panorama-bg.png`
- Ratio: `2:1` or `16:9`
- Usage: landing page hero background in [`apps/web/app/page.tsx`](/c:/Users/Benna/Downloads/trenchz/apps/web/app/page.tsx)
- Prompt:

```text
Ultra-wide cinematic trench battlefield at dusk for a premium meme-native Solana survival arena, original collectible mascots and armored silhouettes framing the far left and right edges, empty central corridor of smoky negative space for headline and CTA, obsidian soil, violet storm sky, toxic green fissures, subtle neon rim light, painterly 3D illustration, collectible-toy polish, dramatic depth layers, atmospheric fog, premium dark tactical mood, no text, no logos, no gameplay UI
```

- Extra avoid:

```text
center clutter, close-up mascot faces, readable signs, countdown energy, timer motifs, scoreboard motifs
```

## 2. Hero shell frame

- Filename: `hero-shell-frame.png`
- Ratio: `2:1`
- Usage: home hero callout card / featured landing shell
- Prompt:

```text
A hollow premium hero frame built from battle-worn gunmetal, chipped stone, neon slime seams, and subtle gold reward accents, thick ornamental corners, soft glow bleed, recessed center intentionally left empty for web copy, collectible-quality surface detail, strong silhouette, dark tactical trench aesthetic, original mascot-world language without characters in the center, polished and UI-friendly
```

- Extra avoid:

```text
full scene painting, filled center, busy props across the middle, text baked into art
```

## 3. Arena board background

- Filename: `arena-board-bg.png`
- Ratio: `16:9`
- Usage: arena detail hero / battle board background in [`apps/web/app/arena/[arenaId]/page.tsx`](/c:/Users/Benna/Downloads/trenchz/apps/web/app/arena/[arenaId]/page.tsx)
- Prompt:

```text
Large empty arena board background with a dark trench war vista behind it, layered stone and metal frame, subtle smoke plumes, distant fortress lights, low-intensity neon leaks, original mascot factions only at the far perimeter, central field kept clean for dynamic arena content, high-end collectible illustration, moody and premium, designed for readable overlays and status modules
```

- Extra avoid:

```text
central battle chaos, dense character pileups, readable faction names, game-over vibes
```

## 4. Command center backplate

- Filename: `command-center-backplate.png`
- Ratio: `16:10` or `4:3`
- Usage: command-center shell for [`apps/web/app/me/page.tsx`](/c:/Users/Benna/Downloads/trenchz/apps/web/app/me/page.tsx) and [`apps/web/app/admin/page.tsx`](/c:/Users/Benna/Downloads/trenchz/apps/web/app/admin/page.tsx)
- Prompt:

```text
Futuristic trench command center backplate, industrial wall panels, glowing map-table energy, cables, vents, warning lights, frost-dark metal and purple-green accent lighting, a large clean recessed center area for widgets and analytics, premium dark sci-fi tactility, original mascot-universe feel, polished but restrained, no characters blocking the interface area
```

- Extra avoid:

```text
full-screen clutter, dramatic character action, text labels, tactical map icons inside the usable center
```

## 5. Stat card backplate

- Filename: `stat-card-backplate.png`
- Ratio: `4:3` or `1:1`
- Usage: smaller metric shells across arena, wallet, and summary cards
- Prompt:

```text
Compact hollow card backplate for metrics and wallet panels, translucent obsidian shell, beveled neon edge, subtle stone-grain texture, tiny decorative bolts, controlled inner glow, clean readable center space, collectible object finish, premium meme-native polish, suited to small dashboards and status blocks
```

- Extra avoid:

```text
too much scenery, character art, text, numbers, icons in the middle
```

## 6. Ticker rail / status strip

- Filename: `ticker-rail-shell.png`
- Ratio: `5:1` or `8:1`
- Usage: ops ticker rail / status strip
- Prompt:

```text
Long horizontal status rail with a recessed center lane for scrolling ops text, dark trench metal, thin neon border, subtle slime drip accents at the corners, minimal ornamentation, high contrast but low visual noise, premium collectible UI component, original mascot-world styling, built to sit above navigation or below hero sections
```

- Extra avoid:

```text
busy scene, big character art, large logo marks, embedded text, chart lines
```
