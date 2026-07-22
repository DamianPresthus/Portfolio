# MatSpar asset manifest (Pass 4A v2)

**Asset cleanup (2026-07-22):** the raw `figma-screens/` 2× exports and the
"reserve" files below (`innstillinger.png`, `hjem-bekreftelse.png`,
`oppskrift.png`) were deleted — none had shipped on the page and none were
tracked in git, so they added weight with no working page depending on them.
`hjem-middagsplan.webp` was also removed; the table below is stale on that
row (superseded by the 2026-07-18 hero amendment, which moved the hero pair
to the `figma:asset` framed-phone imports instead). If any of these are
needed again, re-export from the Figma file (node table above) or the
supplied legacy plates in the git history of `public/assets/`.

Evidence assets, cropped from the legacy plates in `public/assets/` or supplied as
direct Figma exports (all real project artifacts — wireframes, pain-point board,
annotated UI plates, and final screens). Every kr value, label, and state visible in
these assets exists in the source material; captions on the page quote them verbatim.

| File | Source | Content | Page placement |
|---|---|---|---|
| `pain-oversikt.png` | PainPoints.png r1c1 | "Manglende oversikt over matvarer" sticky | Research artifact strip (→ insight 01) |
| `pain-utgifter.png` | PainPoints.png r1c4 | "Ukontrollerte matutgifter" sticky | Research artifact strip (→ insight 02) |
| `pain-porsjoner.png` | PainPoints.png r2c3 | "For store porsjoner" sticky | Research artifact strip (→ insight 03) |
| `wf-ny-matplan.png` | MatSparWireframes.png r2c1 | Ny matplan wireframe with Budsjett filter chips | Before/after row B (cost during planning) |
| `wf-legg-til.png` | MatSparWireframes.png r2c2 | "Legg til — Andre retter med rest ingredienser" wireframe | Before/after row C (leftover suggestions) |
| `wf-oversikt.png` | MatSparWireframes.png r2c3 | Oversikt wireframe (meal rows + Knapp) | Before/after row A (portions → computed amounts) |
| `ny-matplan-budsjett.png` | MatSparSpacing.png left | Ny Matplan final: Budsjett Lavt/Gjevnt/Høyt, per-dish "Legg til 187,-/177,-/149,-…" | FlowStrip step 01 + annotated moment 1 |
| `innstillinger.png` | MatSparSpacing.png right | Innstillinger: household size steppers, monthly budget | reserve (portion basis) |
| `legg-til-flat.png` | MatSparDulting.png right | Legg til frameless: rest-ingredienser suggestions at 49,-/129,-/35,- | Annotated moment 2 |
| `hjem-bekreftelse.png` | MatSparDulting.png left | Hjem with "Sikker?" replace-plan confirmation dialog | reserve (testing nudge) |
| `oversikt-flat.png` | Supplied Figma export `Oversikt.png` | Oversikt final screen with Omelette, Caesarsalat m/ kylling, and Aktiver Matplan | FlowStrip step 03 |
| `oppskrift.png` | Supplied Figma export `Middagsrett/Oppskrift.png` | Cheesy Pasta recipe screen with nutrition, ingredients, and instructions | reserve (recipe/cost detail) |

## Figma 2× exports (completed 2026-07-17, visual refinement pass)

Direct frame exports at `defaultScale: 2` via the Figma MCP, stored under
`figma-screens/` as source archive. The figma:asset hashes (327×675 framed phones)
are no longer referenced by the page.

| File | Node | Size | Notes |
|---|---:|---|---|
| `figma-screens/hjemside-middagsplan-01@2x.png` | 460:4694 | 860×1864 | flat screen, no surround |
| `figma-screens/handleliste@2x.png` | 1071:6644 | 860×2322 | full scroll canvas, both meal blocks |
| `figma-screens/legg-til@2x.png` | 421:3954 | 968×2098 | interior (screen) at (54,34)–(914,1898) |
| `figma-screens/ny-matplan@2x.png` | 506:2479 | 860×2216 | full scroll canvas |
| `figma-screens/oversikt@2x.png` | 531:4724 | 960×2098 | interior (screen) at (50,34)–(910,1898) |

**Open question resolved (2026-07-17):** `Matplan #1/#2/#3` (621:595, 908:9402,
908:9474) are identical saved-plan slot screens — only the title numeral changes.
They are *not* task states, so the one-screen-three-states figure does not exist.
Per Pass 4A §2 group 0, no near-identical screens are staged.

## Derived page assets (WebP, cropped from the 2× exports)

| File | Source region | Content | Page placement |
|---|---|---|---|
| `hjem-middagsplan.webp` | hjemside-middagsplan-01@2x full | Hjem with active plan, Brukt på mat 1000,-/Mat spart 600g | Hero pair left |
| `handleliste-visning.webp` | handleliste@2x y0–1810 | List through Kylling Sandwich checklist (clean cut in white gap) | Hero pair right + flow step 04 |
| `crop-budsjett-priser.webp` | ny-matplan@2x y200–845 | Budsjett Lavt/Gjevnt/Høyt + Middag row, Legg til 187/177/149,- | Direction principle 01 proof |
| `crop-rest-forslag.webp` | legg-til@2x interior y95–740 | "Spar lommeboka…rest-ingrediensene" banner + Omelette 49,- | Direction principle 02 proof |
| `crop-butikker-liste.webp` | handleliste@2x y420–1065 | Cheesy Pasta checklist + Anbefalte butikker REMA 1000/EXTRA | Direction principle 03 proof |
| `crop-mengder-testing.webp` | handleliste@2x y1230–1790 | Kylling Sandwich checklist with (500g)/(1 stk.) quantities | Testing annotated figure (accent underlines) |
| `legg-til-skjerm.webp` | legg-til@2x interior | Full Legg til screen | Flow step 02 (supersedes `legg-til-flat.png`) |
| `oversikt-skjerm.webp` | oversikt@2x interior | Full Oversikt screen with Aktiver Matplan | Flow step 03 (supersedes `oversikt-flat.png`, which had the dark canvas surround baked in) |

Pain-point stickies (`pain-*.png`, 240², ~1.5× at 160px display) now ship on the
page as the research artifact strip; slight softness is acceptable for board
artifacts. Re-crop from a fresh PainPoints board export if it ever surfaces in Figma.
