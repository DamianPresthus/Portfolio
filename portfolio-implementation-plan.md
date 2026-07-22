# DAP Portfolio — Dark Bench Implementation Plan (v2, repo-aware)
*Supersedes `portfolio-art-direction.md` as the build spec. Written 2026-07-09 against the actual codebase: Vite 6 + React 18 + react-router 7 (hash router, `/Portfolio/` base) + Tailwind v4 + `motion` 12 + the Working File token system in `src/styles/theme.css`. The old document remains useful as critique (§1, §9); its token table, stack advice, and phasing are obsolete.*

---

## 1. Updated design direction

**"The Working File, benchside."** The Working File semantic survives intact but the surfaces are reassigned: the **homepage is the studio bench** — one continuous dark environment (`--surface-dark` family) where each project sits as a lit artifact — and the **case studies are the file** — paper reading surfaces, unchanged. Paper now first appears at the moment you open a case study. That moves the light/dark seam from mid-scroll (an involuntary pupil event) to a navigation boundary, where a surface change reads as *opening a document*. This is a stronger expression of the existing metaphor, not a replacement of it.

Per-project color converts from **pigment to light**: the 4–10% paper washes die; each project instead owns a light source that answers interaction — an ambient bloom behind the card, a key light inside the mockup well, a hairline that takes the hue. At rest the bench is near-monochrome; orange stays the only color at rest, with one stated exception (a 1px per-project rest rule at ≤30% alpha, defined in §8).

One narrative detail: **Fristil's light is paper-white.** The photography label gets lit like a gallery print — `rgb(240 238 233)` — which fixes the invisible `--proj-fristil: #161A1F` on dark, avoids the old plan's invented violet, and quietly ties the bench back to the paper file.

All existing Working File rules hold: annotations state a decision, a name, or a measurement — never decoration; nothing outside the hero exceeds 600ms; numbers are evidence and never animate; accent hexes live only in `theme.css`.

## 2. What changes from the old plan

- **No new token table.** The old plan's palette (`bg-0 #0E0F12`, `text-hi #F2EFE9`, `accent #F08A2C`) is dropped entirely. Extend the existing `:root` Working File block and `@theme inline` map in `theme.css` (§7). The grep-able invariant — project hues and accent hexes only in `theme.css` — is preserved.
- **Stack corrected.** No GSAP, no Lenis, no Next.js. Everything specced here uses `motion`, CSS, and one small pointer hook. Lenis is rejected outright: it would stack a second scroll-hijack on top of the hash router's existing anchor workaround (`scrollIntoView`, never `href="#id"`).
- **Hero untouched.** The Paper to Product sequence (`HeroSection.tsx`, `hero-sequence.css`, `useHeroSequence.ts`) is not replaced, retimed, or restyled. Blur-to-sharp and the variable-font "evolve" breathe are cut. The only permitted hero change is one additive ambient refinement that runs *after* the sequence completes (§3d) — and it is the first thing to drop if time-boxed.
- **Case studies stay on paper.** The old Phase 5 ("propagate the system to case-study pages") is rejected. `CaseStudyNav`, `EvidenceStrip`, and all four case-study pages are out of scope except for the F1 rename propagation.
- **The grid stays asymmetric 7/5–5/7.** Harmoni is already the flagship; the full-width feature card is deferred until the dark conversion can be judged.
- **Screenshot re-cuts move to pass 2.** Dark cards favor different crops (full-bleed UI is the likely winner for Fristil/F1 over floating laptops); re-cut *after* the bench exists, not before.
- **Grain is a dark variant, not a new layer.** `.paper-surface::before` already carries feTurbulence grain at 3% multiply. The bench gets a mirrored `.bench-surface::before` (§6.3). No site-wide fixed layer — that would double-grain the paper pages.
- **Glass is rejected everywhere in pass 1** (§4).

## 3. New interaction opportunities worth considering

Ranked. (a) is the signature and should ship in pass 1; (b) and (c) are cheap and ship with it; (d) is a stretch item.

**a) Cursor-tracked key light (the signature).** On hover, the light inside the card's mockup well follows the pointer: a large soft radial (`rgb(var(--card-light) / 0.10)`, ~420px, blur baked into the gradient) translates toward the cursor with a ~160ms ease-out chase. The outer bloom behind the card stays static — only the inner key light tracks. This is not a cursor effect (nothing follows the cursor as an object); it is a lighting model — the artifact tilts under your lamp. It is the single clearest "front-end craft" signal on the page, costs one rAF-throttled pointermove handler and a transform, and is desktop/fine-pointer only. Distinct from the magnetic-cursor/tilt-card template tells because the card itself never moves in 3D.

**b) Drawn rules on entry.** The section header's accent tick (`w-5 h-px bg-accent/60` in `ProjectsSection.tsx`) and the section's top hairline draw in left-to-right (scaleX 0→1, transform-origin left, 500ms ease-out, once, `whileInView`). A measurement line being drawn is the most Working-File-native motion possible — it's an annotation happening. Do **not** apply this to the per-card hairlines; four cards of drawing rules is busy.

**c) Footer CTA bloom.** The Let's Connect pill and About Me ghost button adopt the card lighting model: a static radial bloom (accent-hued, pseudo-element, opacity 0→1) behind the pill on hover, replacing nothing — the existing lift/shadow stays. This closes the old plan's "accent skips the middle" complaint from both ends: the same light language now runs hero → cards → footer.

**d) Hero ambient pointer drift (stretch, optional).** The warmth field's two counter-drifting radial gradients (`WarmthField.tsx`) gain a ≤8px lerped translate toward the pointer — transform-only, active only after the sequence completes (`hs-run` finished or replay-visit static state), fine-pointer only, off under reduced motion. This enhances the existing ambience without touching the sequence timeline. It is the first cut if pass 1 runs long.

**e) Focus-light parity (ships as a rule, not a feature).** Keyboard focus produces the same bloom/key-light state as hover (§9). An accessibility requirement that doubles as a craft signal for exactly the reviewer this portfolio targets.

## 4. Glass effect assessment

The test glass must pass: **spatially varying luminance behind the pane that moves relative to it** (via scroll or layered motion). Otherwise `backdrop-filter` samples a flat field and renders as gray mush — decoration with no optical job. Audit of every candidate:

| Candidate | Verdict | Reason |
|---|---|---|
| Nav glass-on-scroll | **Reject** | There is no sticky nav — the nav lives inside `HeroSection.tsx` (line ~99) and scrolls away. Building a sticky nav just to justify glass is backwards. |
| Hero overlays / availability badge as glass chip | **Reject** | Sits on near-black; nothing to refract. Any refraction layer competes with the Paper to Product sequence's own depth story. |
| Card metadata panels | **Reject** | Solid cards on a flat dark bench; zero content behind them. This is the canonical 2022-Dribbble failure mode. |
| Page-transition surfaces | **Reject** | Hash-router page swaps have no shared-element continuity to host a pane. |
| Future sticky nav passing over bright screenshots | **The only candidate that passes the test** — light card screenshots scrolling under a pane would genuinely refract. Not in pass 1; revisit only if a sticky nav is ever justified on its own merits. |

**Conclusion: zero glass in pass 1.** The bench's material language is emitted light + grain + drawn hairlines. A workbench has no pane; adding one reads as borrowed material.

## 5. First-pass implementation plan

Order matters — tokens first, card rebuild before the key light (the hook mounts into the rebuilt well). Estimated 1.5–2 days.

1. **Tokens + mono font** — extend `theme.css`, add JetBrains Mono to the fonts import. (~0.5h)
2. **Bench surfaces** — `.bench-surface` + `.bench-grid-echo` in `index.css`; convert `ProjectsSection.tsx` to dark. (~1h)
3. **Card rebuild** — `ProjectShowcaseCard.tsx`: surfaces, well, rest rule, bloom, hover border, dark shadow re-tune, arrow chip. (0.5–1 day; 60% of the perceived upgrade)
4. **Key-light hook** — `useKeyLight.ts` + tracked element in the well. (~2–3h)
5. **Mono metadata** — labels, eyebrows, 96px column. (~1h)
6. **Renames** — `projects.ts` + grep propagation. (~0.5h)
7. **Footer blooms** — `SiteFooter.tsx` CTA pseudo-elements. (~1–2h)
8. **Entrance reveals + drawn rules** — `motion` `whileInView` in `ProjectsSection.tsx`. (~1h)
9. **Reduced-motion + touch + focus audit** per §9. (~1h)
10. **Verify**: `npm run typecheck`, `npm run build`, preview on **port 5199** (5173 is occupied by Damian's own dev server) at desktop and 375px widths. The headless preview browser captures only the top-left ~400×260 CSS-px corner at dpr 2 — trust DOM measurements over full-frame screenshots for layout checks.

Stretch (only if 1–9 land): hero ambient pointer drift (§3d).

## 6. File-by-file build instructions

### 6.1 `src/styles/fonts.css`
Append `&family=JetBrains+Mono:wght@400;500` to the existing Google Fonts `@import` URL. No other loading mechanism — this matches how Lora and Plus Jakarta Sans already load.

### 6.2 `src/styles/theme.css`
Add the token block from §7 inside the existing `:root` Working File section (after the `--proj-*` tokens), and the two surface mappings inside `@theme inline`. Touch nothing else. Note `--color-ink-raised` already exists — cards reuse it.

### 6.3 `src/styles/index.css`
- **`.bench-surface`** — mirror `.paper-surface` (lines ~76–90): `background-color: var(--surface-dark)`; `::before` reuses the *same* feTurbulence SVG data-URI but with `mix-blend-mode: overlay` (not multiply) and `opacity: 0.05` as the starting value — tune between 0.035 and 0.06 against visible banding at 100% zoom.
- **`.bench-grid-echo`** — mirror `.paper-grid-echo` (lines ~94–110) including its height (420px) and downward dissolve/mask, substituting `var(--annotation-rule-dark)` for the light rule and dropping the layer opacity so the effective line value is ≤5% white (rule-dark is 14% white → layer opacity ≈ 0.35).
- **Card lighting CSS** (plain CSS classes; these compose custom props and can't be expressed as Tailwind utilities):
  - `.card-shell` — `position: relative; display: flex; width: 100%;`
  - `.card-shell::before` — the ambient bloom: `content: ""; position: absolute; inset: -48px; z-index: 0; pointer-events: none; border-radius: 32px; opacity: 0; background: radial-gradient(closest-side, rgb(var(--card-light) / 0.28), transparent 72%); transition: opacity 250ms ease-out;` and `.card-shell:hover::before, .card-shell:focus-within::before { opacity: 1; }`
  - `.card-keylight` — the tracked inner light: absolutely positioned 420×420 circle, `background: radial-gradient(closest-side, rgb(var(--card-light) / 0.10), transparent 70%); opacity: 0; transition: opacity 250ms ease-out; will-change: transform; pointer-events: none;` shown at opacity 1 while hovered.
  - `.bench-card-rule` — the rest-state presence: `height: 1px; background: rgb(var(--card-light) / 0.28);` (sits at the top edge of the card).
  - Reduced-motion overrides per §9.

### 6.4 `src/app/data/projects.ts`
- Add field `light: string` to each entry holding the channel-triplet var: `"var(--proj-harmoni-light)"`, `"var(--proj-fristil-light)"`, `"var(--proj-f1-light)"`, `"var(--proj-matspar-light)"`. Update the `ProjectData` interface in `ProjectShowcaseCard.tsx` accordingly. If `hue`/`glowColor` have no remaining consumers after the card rebuild (grep first), delete them.
- The paper `tint` values become unused by the homepage card — leave the tokens in `theme.css` (case-study/paper contexts may use them) but remove `tint` usage from the card.
- **Renames** (entry 3 / F1): `title: "F1.Event"` (matches the product branding visible in the mockup — verify against the case-study heading and use whichever product name the case study establishes), `type: "Fullstack event platform"`. Entry 4 (MatSpar): `type: "Meal planning app"`, and fold the attribution into `role: "UX research, interaction design · 5-person team"` (adjust headcount to fact). "Inspired," "Study," and the parenthetical "(group project)" must not survive.

### 6.5 `src/app/components/ProjectsSection.tsx`
- Section root: replace `paper-surface` with `bench-surface`; replace `paper-grid-echo` div with `bench-grid-echo`.
- Header text moves to dark tiers: eyebrow `text-ink/58` → `text-white/58`, paragraph `text-ink/72` → `text-white/72`. The accent tick stays `bg-accent/60`.
- Wrap each `ProjectShowcaseCard` grid cell content in the card shell if the shell isn't internal to the card component (prefer internal — see 6.6).
- Entrance: wrap cards in `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.07 }}`. Drawn rules per §3b on the header tick and the section's top hairline only.

### 6.6 `src/app/components/ProjectShowcaseCard.tsx`
The core rebuild. Return structure becomes: `<div className="card-shell group" style={{ "--card-light": project.light }}>` wrapping the existing `Link`/`a` (which keeps `overflow-hidden` and rounded corners; the bloom pseudo-element lives on the shell so it can extend beyond the clipped card). Then:

- **Card ground**: `bg-paper-raised border-ink/8` → `bg-ink-raised border` with `border-color: var(--hairline-dark)`; on hover, background to `var(--surface-dark-hover)` (background-color transition is permitted, §8). Add the `.bench-card-rule` div as the first child inside the card (above the mockup zone).
- **Shadow discipline**: remove `hover:shadow-[…]` and the `transition-all` that animates it. Pre-render the hover shadow on a card `::after` (or a dedicated absolutely-positioned div) at `box-shadow: 0 24px 48px -16px rgba(0,0,0,0.5)` and fade its `opacity` 0→1 on hover. Keep `hover:-translate-y-1`.
- **Mockup well**: the zone behind devices becomes `background: var(--surface-dark-well)` (replaces the `tint` wash and its hover-deepen twin — delete both tint divs). Devices/screenshots are now the bright objects in a recess.
- **Device shadows**: the ink-toned values (`rgba(22,26,31,…)`) vanish on dark. Replace both `deviceShadowFilter` and `deviceShadowBox` with black-based: `0 18px 40px -12px rgba(0,0,0,0.55), 0 6px 16px -8px rgba(0,0,0,0.40)`. Do **not** change dualPhone sizing — images clip at the zone top above ~176px max-width (known gotcha).
- **Hover border**: on hover the card's top border segment takes the project light — simplest robust approach: the `.bench-card-rule` brightens to `rgb(var(--card-light) / 0.55)` and gains a subtle horizontal gradient fade at both ends. Skip full four-side gradient borders; one lit edge under a bloom reads cleaner than a glowing outline.
- **Key light**: mount `.card-keylight` inside the mockup well; wire to `useKeyLight` (6.7).
- **Caption zone**: `px-7 pt-5 pb-7` stays; text flips to dark tiers — title `text-ink/92` → `text-white/92`, description `/72`, hairlines `border-ink/8` → `border-white/[0.07]` (= `--hairline-dark`).
- **Eyebrow + meta labels go mono**: `font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.08em] uppercase tabular-nums`; eyebrow at `text-white/48`, values keep Plus Jakarta at `/92` (outcome) and `/72` (role). Meta grid `grid-cols-[78px_1fr]` → `grid-cols-[96px_1fr]` — same fixed width in every card so labels align site-wide across the 7-col and 5-col variants.
- **Arrow chip**: `border-ink/12 bg-ink/[0.03]` → `border-white/12 bg-white/[0.04]`; on hover, border takes `rgb(var(--card-light) / 0.5)` and the icon goes `text-white/48` → `text-white/92`. The icon does **not** take accent orange or the project hue — hue never colors glyphs (§8).

### 6.7 `src/app/components/useKeyLight.ts` (new, ~40 lines)
Hook returning `{ wellProps, lightRef }`: `onPointerMove` on the well container, rAF-throttled, writes `transform: translate3d(x,y,0)` to the light element centered on the pointer (offset by half the light's size); `onPointerLeave` fades opacity out. Guard: `matchMedia("(pointer: fine)")` and `matchMedia("(prefers-reduced-motion: reduce)")` — when either fails, the hook is inert and the light renders as a static centered radial on hover (CSS handles that fallback). The 160ms chase comes from a CSS `transition: transform 160ms ease-out` on the light element — rAF writes targets, CSS eases toward them.

### 6.8 `src/app/components/SiteFooter.tsx`
- Both CTAs get a bloom pseudo-element (accent-hued for the pill: `radial-gradient(closest-side, rgba(249,142,31,0.30), transparent 72%)`, inset −24px; white at 0.12 for the ghost button), opacity 0→1 at 200ms on hover, behind the button (`z-index: -1` on a relative parent). Existing lift, shadow, and icon micro-motions stay as-is.
- Ghost button hover border: `border-white/45` → add a touch of accent: `hover:border-accent/40`.
- No headline scale change (deferred, §11).

### 6.9 Rename propagation
`grep -rn "F1 Inspired\|Engineering Study\|engineering study\|(group project)" src/` and update every hit — case-study page headings, `<title>`/document titles, pagination labels (pagination pulls from `projects.ts`, so most propagate automatically), and alt text. Note there are two pages directories (`src/pages/` and `src/app/pages/`) — check `src/app/routes.ts` for which is live and update the live one; flag the other as legacy in the PR notes rather than editing blind.

### 6.10 Optional stretch — `WarmthField.tsx` / hero ambient
Per §3d. Implementation mirrors `useKeyLight` but lerps a container translate (max 8px) and only mounts its listener once the sequence has completed (read the same completion state `useHeroSequence.ts` exposes). Zero changes to `hero-sequence.css` timings.

## 7. Token additions (existing `theme.css` logic)

Inside the `:root` Working File block, after the `--proj-*` tokens:

```css
/* ───────────────────────────────────────────────────────────
   Dark bench — homepage artifact presentation (July 2026
   amendment). The project index leaves paper and joins the
   studio: cards are lit artifacts on the dark bench. Paper
   remains the reading surface (case studies).
   Per-project light: channel triplets consumed only through
   rgb(var(--card-light) / <alpha>) in the card layer — alphas
   live in one place (styles/index.css), hues live only here.
   Fristil's light is deliberately paper-white: the photography
   label is lit like a gallery print.
   ─────────────────────────────────────────────────────────── */
--surface-dark-well: #14171A;   /* mockup recess inside cards  */
--surface-dark-hover: #20252C;  /* card ground, raised on hover */

--proj-harmoni-light: 217 139 115;  /* = --proj-harmoni          */
--proj-fristil-light: 240 238 233;  /* paper-white gallery light */
--proj-f1-light: 224 72 60;         /* #D40000 softened; full
                                       signal red overpowers as
                                       emitted light             */
--proj-matspar-light: 82 191 122;   /* #34B36F lifted; the paper
                                       value muddies on dark     */
```

Inside `@theme inline`, alongside `--color-ink-raised`:

```css
--color-ink-well: var(--surface-dark-well);
--color-ink-hover: var(--surface-dark-hover);
```

No changes to accent tokens, contrast tiers, hairlines, or the existing `--proj-*` paper tokens. The old plan's table is not imported. Invariant extended: *all* project hues — paper tints and bench lights — exist only in `theme.css`.

## 8. Interaction rules

1. **Animate transform and opacity.** Background-color may transition (one-step surface raise, cheap paint). Never animate `box-shadow`, `filter`, blur, or layout properties — shadows are pre-rendered and opacity-faded.
2. **Durations**: hover in 250ms ease-out, out ≤300ms; entrances 500ms, once, no re-trigger; nothing outside the hero exceeds 600ms (standing Working File rule).
3. **Orange is the only color at rest**, with exactly one exception: the 1px per-project rest rule at ≤30% alpha — light residue, not pigment. If anything else wants color at rest, the answer is no.
4. **Hue is light, never ink**: project light appears only in blooms, key lights, and hairlines. It never colors text, icons, or fills. The arrow chip icon brightens to white; its border may take the light.
5. **One light at full strength at a time**: hover states are naturally exclusive; if any future addition could put two full-strength blooms on screen simultaneously, dim one.
6. **Key light is fine-pointer only** and chases at 160ms — never snaps to the cursor (a snapping light reads as a cursor effect; a chasing light reads as a lamp).
7. **Numbers never animate** — outcomes are evidence, not counters (standing rule).
8. **Focus equals hover**: every hover light state has a `:focus-within`/`:focus-visible` twin (§9).

## 9. Accessibility and reduced motion

- **`prefers-reduced-motion: reduce`**: entrance reveals collapse to opacity-only (200ms) or render complete; drawn rules render complete; key-light tracking off (static centered light on hover is acceptable — it's a state change, not motion); hero ambient drift off; card lift (`-translate-y-1`) off, bloom fades opacity only. The hero sequence's existing reduced-motion branch is untouched.
- **`pointer: coarse`**: the rest state must communicate fully — rest rule, complete metadata, no information behind hover. Hover effects simply never fire; nothing is lost.
- **Keyboard**: card focus (`:focus-within` on the shell) triggers the same bloom and lit edge as hover, *in addition to* the existing `focus-visible:outline-accent/50` ring — the ring is the accessibility affordance, the light is the parity detail. Footer CTAs keep their existing focus outlines.
- **Contrast**: all readable text on new dark surfaces uses the existing `text-on-dark-*` tiers; nothing readable below the 0.48 label floor. Mono labels sit at `white/48` on `#1B2026` per the documented convention; values stay at `/92` and `/72`.
- **Grain and light layers** are `aria-hidden="true"` and `pointer-events: none` (grain is a pseudo-element; the bloom, key light, and rules need the attributes).

## 10. Definition of done

- No cream visible anywhere on the homepage; hero → projects → footer is one continuous dark environment with no luminance jump; the homepage → case-study transition has been viewed and reads as opening a document.
- All four cards sit on `ink-raised`/`ink-well` tokens with the rest rule as their only color; each answers hover with its own light within 300ms; a DevTools performance trace of hover + key-light tracking shows no paint storms (transform/opacity only on continuous updates).
- Metadata labels and index eyebrows are JetBrains Mono, aligned on a 96px column in every card; `grep -rn "F1 Inspired\|Engineering Study\|(group project)" src/` returns nothing in live code.
- No visible gradient banding on the bench at 100% zoom on a real display (grain variant doing its job; tune opacity 0.035–0.06 if banding shows).
- Reduced-motion, coarse-pointer, and keyboard-focus behaviors verified per §9; all readable text passes the tier floors.
- Hero sequence, case-study pages, and `CaseStudyNav` behave exactly as before — zero diffs to `hero-sequence.css` timings and case-study page surfaces (rename strings excepted).
- `npm run typecheck` and `npm run build` pass; built site verified under the `/Portfolio/` base path; visual check on dev port **5199** at desktop and 375px (DOM measurements, not headless screenshots, for layout).

## 11. What to defer or cut

**Cut (do not build):** all glass (§4); Lenis/GSAP/Next.js anything; blur-to-sharp headline; variable-font "evolve" breathe; Fristil violet; case-study dark conversion; sticky nav; four-side gradient card borders.

**Defer (real ideas, wrong pass):**
- *Screenshot re-cuts and staging decisions* → pass 2, after the bench exists; full-bleed UI crops replacing floating laptops for Fristil/F1 is the leading candidate.
- *Harmoni full-width feature card* → judge against the darkened 7/5 grid first; it may already be enough hierarchy.
- *Footer headline scale-up and footer top-hairline treatment* → pass 3 polish (specced below).
- *"How I work" bridge section* → needs real artifacts; fold into the existing Working File phase-3 backlog (evidence-forward case-study work) rather than running as a separate track.
- *Hero ambient pointer drift* → stretch item inside pass 1; first thing cut if the card rebuild runs long.

---

# Pass 3 — Footer alignment (planned 2026-07-09; pass 1 shipped)

Pass 1 gave the footer the CTA blooms; three parts of the bench language still stop at its top border, and one loop from the hero never closes. Scope: `SiteFooter.tsx` + small additions to `styles/index.css`. The footer is shared by every page (mounted once in `SiteLayout`), so everything below must read correctly after paper case studies too — it does, because the footer stays dark everywhere and all changes are self-contained.

## Gap analysis

1. **No grain.** Hero (0.26 soft-light) and bench (0.05 overlay) carry the feTurbulence grain; the footer is flat `bg-ink` — the only grainless dark surface on the homepage.
2. **Eyebrow diverges.** "Get in touch" is 11px / 0.26em tracking with a `w-6 bg-accent/45` tick; the projects section eyebrow is 16px / 1.8px with a `w-5 bg-accent/60` tick that *draws in*. Two section-eyebrow styles on one page.
3. **Utility row skipped the mono conversion.** Email, phone, LinkedIn, GitHub, location, and copyright are exactly "calibration markings" — the role the cards now give JetBrains Mono — but they're still Plus Jakarta.
4. **Headline undersized.** 28/40/48 Lora reads smaller in feel than the hero headline, inverting the page's emotional arc (flagged in the original assessment; deferred to this pass).
5. **The availability loop never closes.** The hero badge ("Available for UX Roles", pulsing dot) links *to the footer* — but the footer never restates availability. A recruiter who jumps to the end gets the ask without the status.
6. **Hairline token drift.** Footer top border is `white/[0.06]`; the bench standardized on `--hairline-dark` (`white/[0.07]`).

## Changes (all in `SiteFooter.tsx` unless noted)

- **Surface**: `bg-ink` → `bench-surface` (grain arrives for free); top border to `border-white/[0.07]`.
- **Eyebrow**: adopt the projects-section treatment verbatim — `w-5 h-px bg-accent/60` tick + 16px / `tracking-[1.8px]` / `text-white/58` label — and give the tick the same once-only scaleX draw (`motion.div`, 500ms ease-out, `whileInView` once, inside `MotionConfig reducedMotion="user"`). This is the only motion added.
- **Headline**: one optical step up — `text-[32px] md:text-[44px] lg:text-[56px]`, keep `lineHeight 1.08`, `-0.5px` tracking, `max-w-[14ch]`. Hero stays larger; the arc reads hero > footer > cards.
- **Utility row goes mono**: contact link labels (email, phone, "LinkedIn", "GitHub") → `font-['JetBrains_Mono',monospace] text-[12px] tabular-nums` (phone digits align); location + copyright → same at `text-white/48`. Icon hover-to-accent behavior unchanged. No uppercase — an email address in caps is noise, and mono alone carries the instrument voice.
- **Availability line** (closes the hero loop): prepend to the utility row list — green dot (reuse the hero's `dotPulse` keyframe, `motion-safe:animate-[dotPulse_2.8s_ease-in-out_infinite]`, static dot under reduced motion) + mono label "Available for UX roles" at `text-white/58`. Not a link; it's a status reading, the answer to the hero badge that pointed here.
- **Layout**: untouched. The 7/5 copy/buttons grid already echoes the card grid's proportions — leave it.

## Do not

No glass; no per-project hues (the footer is brand-accent territory only); no extra blooms beyond the pass-1 CTAs; no oversized-wordmark or marquee footer trend; no animation on the headline or numbers.

## Definition of done

Grain visible on the footer at 100% zoom with no banding; eyebrow + tick pixel-identical in style to the projects section, tick draws once on first view and renders complete under reduced motion; entire utility row in JetBrains Mono with tabular digits; headline one step larger at all three breakpoints; availability dot pulses (`motion-safe` only) and reads correctly to screen readers as text; footer still correct at 375px and at the bottom of paper case-study pages; `typecheck` + `build` pass; the pass-1 verify script extended with footer checks (grain pseudo present, mono font stack on utility row, tick `scaleX(1)` after scroll, bloom regression). Effort: ~1–2h.

---

# Pass 4 — Case-study reading system (planned 2026-07-09; passes 1 & 3 shipped)

Measured against the live pages (1440×900): Harmoni **12,635px = 14.0 viewports**, Fristil **12,060 = 13.4**, MatSpar **11,770 = 13.1**, F1 **6,855 = 7.6**. No image on any page exceeds 700px wide (max 651px). MatSpar has a **4,685px continuous paper run**; Fristil scatters **16 pure-#FFFFFF plates** on its paper; 16 sections across the four pages use `py-28 md:py-36 lg:py-44` — **352px of empty surface per section** at desktop. Case-study `bg-paper`/`bg-ink` sections carry **no grain** (only the homepage `.paper-surface`/`.bench-surface` do). Shared components exist for nav/evidence/pagination but there are **no Figure/Section primitives** — every page hand-rolls its figures, which is where the white plates and inconsistency come from.

## 1. Verdict

The bones are already expert-grade — hybrid ink/paper rhythm, skim nav with progress, evidence-first hero strips — but the execution leaks both light and scroll. The diagnosis in the brief ("oversized images") is measurably wrong: images are fine; the pages feel zoomed-in because of **one-idea-per-viewport pacing** — 352px padding cliffs, half-empty paper viewports (text pinned to a 600px left column with the right half of the screen as dead luminance), and figures stacked vertically instead of clustered. Luminance fatigue and scroll fatigue have the same root: **empty bright surface**. The fix is density, not darkness.

## 2. Recommended visual direction

**"The file gets denser, not darker."** Keep the Working File hybrid; re-proportion it. Paper remains the reading surface but stops wasting itself: two-column editorial grid (measure + margin-note rail), figures recessed into wells instead of glaring on white plates, sections separated by drawn rules instead of padding cliffs. Dark sections stop being generic dark slabs and adopt the bench language — screens staged in `ink-well` recesses under the project's own static light. A generic portfolio would flip the whole page dark and blow up the mockups; an expert reading system tunes luminance by removing *empty* brightness and gives every image an information job.

## 3. Reading surface decision: hybrid, kept — re-proportioned and tuned

Paper stays for prose (halation on dark grounds punishes long-form reading; light UI screenshots need a light context to read as documents; and the dark→paper seam at the click *is* the designed "opening the document" moment). Three tuning rules:
1. **Cap continuous paper at ~2 viewports (~1,800px).** MatSpar's research+structure slab and Fristil's build+impact slab must be broken by a dark artifact interlude or condensed.
2. **Kill pure white as a field.** `--surface-paper-raised #FFFFFF` is demoted to small chips only. Figures sit directly on paper with hairline borders, or in a new `--surface-paper-well` recess (#ECEAE4-family) — the paper mirror of `--surface-dark-well`.
3. **Both surfaces get grain.** Case-study paper sections adopt `.paper-surface`, ink sections adopt `.bench-surface` — currently neither has it, which is why they feel flatter than the homepage.

## 4. Section-by-section redesign plan

**Shared pattern (every section, both surfaces):** mono index eyebrow (`01 · CHALLENGE` — same idiom as the homepage cards) → decision-led headline (the one-line takeaway; skimming six headlines = the 90-second read) → body at 620px measure → figures clustered, not stacked. Two-column grid on desktop: content column + 280–320px right rail for margin notes (mono annotations: a measurement, an artifact reference, a test quote). The rail fills today's dead right half with the scan layer.

**Per study:**
- **Harmoni (template):** rhythm already alternates correctly; normalize paddings, cluster the 4-phone rows into captioned grids, recess the white system-plates into paper wells, stage `redesign`/`flow` screens in ink wells with `--proj-harmoni-light` as static ambient. `outcome` (2,678px) condenses — the evidence strip already made these points once.
- **Fristil:** merge the research→structure paper slab's rhythm with one dark interlude staging the live site; convert all 16 white plates to paper wells/hairline figures.
- **MatSpar:** `structure` (3,283px — the single worst section in the portfolio) splits into structure (paper, condensed) + a dark interlude staging the app flow under `--proj-matspar-light`.
- **F1:** already the density reference (7.6 viewports). Padding normalization plus the phase-3 drawn diagrams (loading timeline, system flow); otherwise leave it alone.

## 5. Image, mockup, illustration, and diagram strategy

- **Widths stay** (data says they're right); stacking goes. `FigureGrid` clusters 2–3 phones per row with per-figure captions.
- **Caption idiom:** mono 11px, `FIG 04 · First-run task list — one primary action` — every caption states a decision, a name, or a measurement (standing annotation rule). No orphan images.
- **Detail crops over blow-ups:** where a screen matters, show it modest + one annotated crop of the region that carries the decision. The crop is the expert move — it proves you know where the design lives. (Defer the annotation overlay tooling; start with plain crops + captions.)
- **Diagrams drawn in the site idiom** — hairlines, mono labels, accent ticks — never pasted Figma/Miro exports. The F1 loading-timeline and system-flow diagrams from the phase-3 backlog are the first two.
- **Illustrations stay inside device frames.** Harmoni's brand illustration is evidence of the product's voice, not page decoration.

## 6. Typography, spacing, width, hierarchy rules

- Body 15–16px/1.7 at **max 620px measure**; Lora headlines keep 32/40/46; mono for every eyebrow, caption, stat label, margin note (11–12px, 0.08em, tabular).
- **Section padding: `py-16 md:py-20 lg:py-24`** (96px lg) — down from 176px. Consecutive same-surface sections separate with a drawn hairline + the next mono index, not a padding cliff.
- Figure-to-prose gap 40–56px; figure-grid internal gap 20–24px.
- Hierarchy: index eyebrow < headline < body < figures < margin rail. Numbers are evidence — no count-ups (standing rule).

## 7. Scroll fatigue reduction — quantified

Padding normalization returns ~2 viewports per page; figure clustering ~1.5–2 more; outcome/structure condensation ~1. **Targets: Harmoni ≤ 9.5 viewports, Fristil ≤ 9.5, MatSpar ≤ 9, F1 ≤ 7.** Verify with the same measurement script that produced the baseline numbers.

## 8. Alignment with the landing page — without overdesign

Shared: mono metadata idiom, grain on both surfaces, drawn rules at seams, accent-only-at-rest, per-project hue only as light and only in dark interludes (static — **no hover lighting, no key-light tracking, no blooms in the reading flow**; reading surfaces don't flirt). Not shared, deliberately: bench card hover model, availability status, glass (still rejected everywhere). `EvidenceStrip`, `CaseStudyNav`, `NextProjectNav` keep their roles; NextProjectNav's paper tints are correct as-is.

## 9. File-level implementation plan

1. **`src/styles/theme.css`** — add `--surface-paper-well: #ECEAE4` + `@theme` mapping `--color-paper-well`. Nothing else; all other tokens exist.
2. **`src/styles/index.css`** — nothing new needed if sections adopt the existing `.paper-surface` / `.bench-surface` classes (grain arrives free). Add a `.figure-well-light` / `.figure-well-dark` pair only if the Figure component can't express it with utilities.
3. **`src/app/components/case-study/shared.tsx`** — new primitives beside the existing ones:
   - `SectionShell` — surface variant (`paper`/`ink` → `.paper-surface`/`.bench-surface`), standardized padding, mono index eyebrow + headline slot, optional `rail` slot (margin notes; collapses inline on mobile).
   - `Figure` — image + mono caption; variants `paper-well` (bg `paper-well`, hairline-light border), `ink-well` (bg `ink-well`, hairline-dark border, optional static `light` tint), `bare` (hairline only). Kills every hand-rolled white plate.
   - `FigureGrid` — 2/3-up cluster with shared caption row.
   - `MarginNote` — mono rail annotation.
4. **`src/app/pages/HarmoniCaseStudy.tsx`** — full retrofit onto the primitives (it's the flagship and has every pattern: phone rows, white plates, ink showcases, long outcome).
5. **All four pages** — mechanical padding swap (`py-28 md:py-36 lg:py-44` → shell values) even before their full retrofits; it's the cheapest 2-viewport win and is pure find/replace once `SectionShell` exists.
6. **Fristil → MatSpar → F1** retrofits in that order (white-plate count, then worst-section, then diagrams).

## 10. First pass scope (Antigravity)

Steps 1–5 above: token, primitives, Harmoni retrofit, global padding normalization. Measurable exit: Harmoni ≤ 9.5 viewports with zero `#FFFFFF` plates and grain on every section; other three pages ≤ 11 viewports from padding alone; nav/evidence/pagination regression-clean. Effort: ~1.5–2 days.

## 11. Defer

Margin-rail *content* beyond 2–3 notes per page (needs real artifacts — test quotes, measurements; ship the primitive, fill incrementally); drawn F1 diagrams (design work, not layout work); annotated detail-crop overlays; MatSpar structure-section content rewrite (condense mechanically first, re-write prose separately); any prose editing beyond section moves; dark-interlude additions to Fristil/MatSpar if the padding + clustering pass already brings their paper runs under the 2-viewport cap.

## 12. Definition of done

Baseline script re-run shows every page under its §7 target and no paper run over ~1,800px; zero computed `rgb(255,255,255)` backgrounds larger than a chip; grain pseudo present on every case-study section; every figure has a mono caption in the decision/measurement idiom; measure ≤ 620px everywhere prose runs; CaseStudyNav active states, EvidenceStrip jumps, and NextProjectNav unaffected; reduced-motion behavior unchanged; `typecheck` + `build` pass; before/after screenshots reviewed at 1440 and 375 for the Harmoni template.

---

# Pass 4A — MatSpar MCP asset rebuild addendum (planned 2026-07-09 · **revised v2 2026-07-10**)

**v2 revision summary.** The v1 addendum's extraction discipline (direct frame exports, node table, no board crops) and Higgsfield boundaries stand. v2 adds what v1 lacked — a storytelling spine and a signature figure — and *narrows* Higgsfield further: (a) the page gets one explicit editorial through-line, **"right information, right moment"**, which already exists in the copy ("Cost was checked too late" is the first research insight; the reflection ends on timing) but is never used to organize the page; (b) the `#1/#2/#3` frame sequences in the node table are inspected as candidate **state progressions** — if they show one screen changing through the task, they become the strongest single figure available; (c) the flow strip is promoted to a **dark-interlude signature moment** built site-native; (d) Higgsfield shrinks from five asset classes to one — v1's generated containers (tabletop scene, comparison frames, mockup scene) are cut because the site's own wells and hairlines do that job crisper, theme-aware, and without credibility risk.

This addendum builds on Pass 4's case-study reading system and narrows the first MCP-enabled slice to **MatSpar only**: `src/app/pages/MatSparCaseStudy.tsx`, the MatSpar asset imports, and any shared figure primitives needed to stage those assets cleanly. The immediate job is to use the confirmed Figma file (`ObFSRwwNMJGFbuidoVTQcM`, checked node `420:3691`) as the source of truth for stronger MatSpar evidence, then use Higgsfield only for controlled support visuals that explain a real design decision.

The legacy MatSpar page (`src/pages/MatSparCaseStudy.tsx`) shows the asset problem clearly: many full-width exports (`MatSparCase.png`, `MatSparScreens1.png`, `MatSparScreens2.png`, `MatSparSpacing.png`, `MatSparDulting.png`) are large composite plates or repeated single-screen mockups. The newer page (`src/app/pages/MatSparCaseStudy.tsx`) is cleaner, but it still leans on repeated phone staging, text-only insight cards, and a long `structure` section instead of showing the intermediate design evidence.

## 1. Verdict on the current MatSpar asset quality

MatSpar does not need larger visuals; it needs sharper evidence. The current asset set has six hidden problems:

1. **Weak screenshot selection.** The page shows final screens but rarely the moment that proves the design decision: cost before commitment, ingredient overlap, portion feedback, list generation, or navigation recovery.
2. **Oversized mockup logic.** Full phone screens repeat across hero, structure, and interface details, so the reader keeps reprocessing the same object instead of learning the flow.
3. **Missing intermediate evidence.** Research cards summarize findings, but wireframes, failed/changed states, and iteration deltas are mostly absent from the newer page.
4. **Unclear user-flow explanation.** The four-step flow is textual and vertical. It explains the order but not the decision dependencies between screens.
5. **Repeated device staging.** Alternating single phones at ~220–240px creates scroll rhythm without adding much information density.
6. **No compact explanatory diagrams.** The page lacks small, authored diagrams that connect user need → design choice → UI evidence.

The asset rebuild should make MatSpar feel like a designer's working file: real product evidence first, tight crops second, generated support only where it clarifies a decision already present in Figma.

## 2. Figma MCP asset extraction plan for MatSpar

Use Figma MCP to inspect/export MatSpar artifacts, not to produce decorative screenshots. The output should be a curated asset set with captions and intended page placement.

**Correct extraction method:** export real Figma frame nodes directly. Do **not** crop individual phone screens from a full-board screenshot. The broad board render is acceptable only as an orientation/reference image for finding nodes; it is not a production asset source.

Working discovery path:

1. Start from file `ObFSRwwNMJGFbuidoVTQcM`, page `420:3691` (`Prototype`).
2. Inspect the `Prototype screens` section, node `584:1685`, with `use_figma` to list direct child frame IDs and names.
3. Export each needed phone screen with `get_screenshot` using the frame's own node ID. Example: `Hjemside/middagsplan #1` is node `460:4694`; direct export returns a clean `430×932` PNG.
4. Save direct exports under a screen-specific folder such as `src/assets/matspar/figma-screens/`, with filenames based on the frame name and state.
5. Use board/section screenshots only to understand flow relationships or to rebuild a site-native diagram; do not ship them as cropped UI screens.

Known direct screen nodes from `584:1685`:

| Figma frame | Node ID | Export name |
|---|---:|---|
| `Hjemside/middagsplan #1` | `460:4694` | `hjemside-middagsplan-01.png` |
| `Hjemside/middagsplan #2` | `849:5222` | `hjemside-middagsplan-02.png` |
| `Hjemside/middagsplan #3` | `849:5301` | `hjemside-middagsplan-03.png` |
| `Hjemside/frokostplan #1` | `827:3360` | `hjemside-frokostplan-01.png` |
| `Hjemside/frokostplan #2` | `849:5074` | `hjemside-frokostplan-02.png` |
| `Hjemside/frokostplan #3` | `849:5148` | `hjemside-frokostplan-03.png` |
| `Hjemside/lunsjplan #1` | `827:4186` | `hjemside-lunsjplan-01.png` |
| `Hjemside/lunsjrett #2` | `849:4899` | `hjemside-lunsjplan-02.png` |
| `Hjemside/lunsjrett #3` | `849:4994` | `hjemside-lunsjplan-03.png` |
| `Middagsrett/Oppskrift` | `460:4724` | `oppskrift-middag.png` |
| `Frokostrett/Oppskrift` | `783:1271` | `oppskrift-frokost.png` |
| `Lunsjrett/Oppskrift` | `783:1354` | `oppskrift-lunsj.png` |
| `Handleliste` | `1071:6644` | `handleliste.png` |
| `Profile` | `492:2422` | `profil.png` |
| `Innstillinger` | `1089:2956` | `innstillinger.png` |
| `Matplan #1` | `621:595` | `matplan-01.png` |
| `Matplan #2` | `908:9402` | `matplan-02.png` |
| `Matplan #3` | `908:9474` | `matplan-03.png` |
| `Ny Matplan` | `506:2479` | `ny-matplan-01.png` |
| `Ny Matplan` | `908:2093` | `ny-matplan-02.png` |
| `Ny Matplan` | `908:2264` | `ny-matplan-03.png` |
| `Legg til` | `421:3954` | `legg-til.png` |
| `Oversikt` | `531:4724` | `oversikt.png` |

Extract these groups from Figma:

0. **State progressions (inspect first — highest-value unknown).** The node table shows `#1/#2/#3` sequences for `Hjemside/middagsplan`, `Matplan`, and `Ny Matplan`. Open all three of each and determine what the numbering means. **If they are task states** (e.g. empty plan → meals added with running cost → activated plan), export the trio and build the page's strongest figure: *one screen shown three times as use fills it in* — the interface answering use, which is literally the portfolio's hero claim. **If they are only meal-type variants** (middag/frokost/lunsj duplicates), export one representative and never stage near-identical screens side by side. Record the finding in the asset manifest either way.
1. **Prototype spine.** Four final screens that represent the actual task path: meal-plan start/home, add or reuse-ingredient suggestion, review/activate plan, consolidated shopping list. Replace repeated one-phone staging with one compact 4-step strip and two detailed UI moments.
2. **Wireframe-to-final pairs.** For each of the three stated decisions in the current page (`Portion control`, `Cost shown during planning`, `Leftover suggestions`), export one wireframe or earlier iteration plus the final UI crop. These become before/after evidence, not standalone gallery images.
3. **Flow map.** Export or reconstruct the actual prototype flow around node `420:3691`: entry screen, branch/action, confirmation/review, list outcome. If Figma's connector lines are too noisy, use the node positions and screen labels as the source for a site-native diagram.
4. **UI states.** Pull specific states only if they exist in the file: selected meal, changed portion count, added dish confirmation, savings/cost indicator, active plan/list state. Do not invent missing states.
5. **Design iterations.** Find any frames whose names or placement indicate assumptions, pain points, low-fi, mid-fi, testing changes, spacing, or interaction notes. Export compact crops, not full boards. If a claimed artifact is not present in Figma, mark it absent and remove the claim from the page.
6. **Existing large plates for triage.** Revisit `MatSparWireframes.png`, `MatSparFunksjoner.png`, `MatSparAntagelser.png`, `PainPoints.png`, `MatSparSpacing.png`, and `MatSparDulting.png` as sources to crop from, not as final page images.

Extraction rules:

- Direct-export full screen frames first. If a detail crop is needed, crop from the direct frame export, not from a board screenshot.
- Export at native node size unless a higher-resolution render is genuinely needed for annotation. Final browser display width should usually be 180–360px for phones, 420–680px for clustered figures, and 760px max for a full process strip.
- Name screen assets by frame/state, and derived detail assets by decision: `hjemside-middagsplan-01.png`, `oppskrift-middag-cost-detail.png`, `leftover-suggestion-before-after.png`.
- Every extracted asset must receive a caption in the Working File idiom: `FIG 03 · Cost moved into meal selection before plan activation`.
- Keep a small manifest listing Figma frame name, node ID, local filename, intended page placement, and caption candidate.
- If an asset only says "we made screens" and not "this decision changed comprehension," cut it.

## 3. Higgsfield MCP visual generation plan for MatSpar

**v2 narrowing: Higgsfield produces exactly one asset class for MatSpar.** v1's five classes collapse because three of them were *containers* (tabletop scene, comparison frames, mockup scene) — and containers are the design system's job. A generated PNG frame can't follow the theme, can't stay crisp at every DPR, and reads as staging; the site's paper/ink wells, hairlines, and mono captions already do this work and match the homepage. The mini decision diagram (ingredient overlap) also moves out of Higgsfield: thin rules + mono labels *is* the site's native idiom — build it as inline SVG/HTML so it themes, scales, and reads as authored rather than generated.

The one Higgsfield asset:

1. **Graphite process sketch, in the hero's own idiom.** A small paper-toned pencil/graphite sketch of the planning loop (choose meals → compare cost → reuse ingredients → generate list), drawn in the same construction-line language as the homepage's "Paper to Product" sketch layer — which was itself produced with this tool from the portrait, so the visual lineage is already established sitewide. Placement: `Challenge` section, modest scale (≤420px), paper well, mono caption. It orients the loop before the real screens carry the evidence. Generate 2–3 candidates, pick one, and skip it entirely if the site-native flow strip already orients the reader — the sketch is an *opening image*, not a requirement.

Do **not** use Higgsfield for:

- Research notes, interview evidence, test results, quotes, metrics, grocery receipts, pantry contents, or any artifact that would imply it existed in the project.
- New UI screens, UI states, app copy, data, charts, or Figma frames.
- Decorative vegetables, shopping bags, supermarket aisles, lifestyle scenes, or food photography. Those would push the case study toward marketing and away from UX evidence.
- Replacing Figma exports with AI-redrawn interfaces. Product credibility depends on showing the actual prototype.

## 4. Recommended MatSpar page asset sequence

**The through-line (v2).** Every section answers one editorial question: **when does the user learn what?** The copy already contains it — "Cost was checked too late" (research), "Budget information sat outside the meal planning flow" (design change), timing-of-information (reflection) — but the page never states it as its spine. Skimming the section headlines alone must now read as one argument: *cost arrived too late → I moved information to the moment of decision → testers completed the task unaided.* No new claims; the existing ones, sequenced.

1. **Hero, dark surface.** Replace the two-phone hero with the **outcome pair**: planned week ↔ generated shopping list (the product's entire point is plan→list), joined by one drawn annotation rule and a mono caption on the cost/list relationship, with the real estimated-cost value read from the exported frame — never invented. The hero previews the argument, not the product tour.
2. **Challenge.** The graphite process sketch (§3), if kept, plus one real Figma crop showing where cost/planning originally sat apart — only if such an iteration exists.
3. **Research.** Keep the three insight cards; add one compact real artifact strip beneath (assumption/pain-point crops that support exactly those three insights). No full boards.
4. **Structure — the signature moment (v2).** The vertical four-screen march becomes a **dark artifact interlude**: a site-native `FlowStrip` — four real exports in ink wells at 180–220px, hairline connectors, one-line mono decision captions, `--proj-matspar-light` as the static rest rule. If §2's inspection confirms the `#1→#3` frames are task states, add the **state-progression figure** here: one screen, three states, the running cost filling in — the interface answering use, which is the portfolio's hero claim made visible. One detailed transition crop (meal choice → plan review → list) closes the section on paper.
5. **Design Changes.** Text-only cards become three before/after rows: early/wireframe crop + final crop + the existing problem/change/outcome copy. Both states always visible — no hover reveals in the reading flow.
6. **Testing.** Keep `5/5` only if true. Add real changed-state crops if Figma contains them; if not, stay text-led — never generate substitutes.
7. **Interface Details.** Two annotated UI moments (`estimated cost before activation`, `leftover suggestion without pantry logging`): modest crop + 2–3 rule-line annotations. Annotation values (kr amounts, counts) are read from the frames.
8. **Reflection.** Pays off the through-line explicitly — the lesson *is* "right information, right moment." One small final crop only if it reinforces it. End on comprehension, not a mockup.

## 5. Layout and readability rules for the new visuals

- MatSpar target length: **≤ 9 viewports at 1440×900** after the asset pass. The current page's long sections come from vertical repetition, not missing scale.
- Section padding should move toward `py-16 md:py-20 lg:py-24`; do not keep `py-28 md:py-36 lg:py-44` on every section.
- Use clusters over stacks: 3–4 thumbnails in a row, one caption line, one short explanation. A figure cluster should teach a step in under 10 seconds.
- Max prose measure remains 580–620px. Use a 280–320px rail for notes or captions when it prevents dead paper space.
- Phone screenshots display at 180–260px unless they are the single hero object. Detail crops can be larger because they remove device chrome and show the actual decision.
- Use paper wells for Figma process artifacts and ink wells for final-product moments. Apply `--proj-matspar-light` only as a static dark-surface accent; no hover lighting or key-light tracking in the reading flow.
- Annotations must point to a decision, label, or measurement. Do not annotate obvious controls. Annotation values (kr amounts, counts, states) are read from the exported frames — never invented.
- Captions are mandatory. No orphan screenshots, no image grids without interpretive labels.
- **Motion (v2):** the only animation in the reading flow is annotation rules drawing in (`scaleX` 0→1, ≤600ms, once, viewport trigger on a parent with real area — see the zero-width IO gotcha from Pass 3). Images never animate; no hover lighting, no key-light tracking, no crossfades that hide a state behind hover.
- **Diagrams are site-native (v2):** flow strips, connectors, and the ingredient-overlap mini diagram are inline SVG/HTML in the site idiom (hairlines, mono labels, accent ticks) — themeable, crisp at every DPR, and authored rather than generated.

## 6. What to replace, keep, cut, or regenerate

**Replace**

- Replace the repeated final-screen phone march in `structure` with a compact Figma-derived flow strip plus one detailed transition crop.
- Replace text-only `Design Changes` cards with Figma before/after evidence for portion control, cost visibility, and leftover suggestions.
- Replace large legacy composite plates (`MatSparScreens1.png`, `MatSparScreens2.png`, `MatSparSpacing.png`, `MatSparDulting.png`) with cropped decision moments if they still appear in the implemented page.

**Keep**

- Keep the current MatSpar positioning: grocery planning, estimated cost, ingredient reuse, shopping list generation.
- Keep the shared `CaseStudyNav`, `EvidenceStrip`, `ResourceLink`, and `NextProjectNav` roles.
- Keep `5/5`, `4 planning steps`, and `3 design changes` only if the corresponding evidence remains present and visible.

**Cut**

- Cut duplicate phone mockups that repeat home/list screens without adding a new decision.
- Cut generic UI-detail bullets once the annotated crops explain those details.
- Cut any full-board Figma export that requires the reader to zoom mentally.
- Cut any AI-generated lifestyle or fake research visual.

**Regenerate**

- Regenerate one restrained hero or interlude composition only after real Figma screens are selected.
- Regenerate one process sketch only if the Figma flow strip still feels too abstract.
- Regenerate comparison frames only as containers for real Figma before/after crops.

## 7. Exact updates to make in `portfolio-implementation-plan.md`

This section extends the broad Pass 4 rather than replacing it. Keep the homepage/footer passes and the Pass 4 reading-system plan intact. The implementation plan should now say:

1. Pass 4 remains the portfolio-wide reading-system plan.
2. Pass 4A is the MatSpar-first MCP asset slice inside that plan.
3. Figma is the source of truth for real screens, wireframes, flows, UI states, and design iterations.
4. Higgsfield is limited to support visuals that clarify already-documented MatSpar decisions.
5. The main page problem is weak evidence sequencing and scroll-heavy staging, not a need for bigger images.
6. The required page change is asset selection + compact layout + annotated crops, not a marketing redesign.
7. Antigravity should implement the first asset/layout slice in `src/app/pages/MatSparCaseStudy.tsx` and avoid editing unrelated case studies unless it needs an already-planned shared primitive from Pass 4.

## 8. First pass Antigravity implementation scope

Antigravity should do one bounded pass:

1. **Audit Figma assets.** Use the Figma connector on file `ObFSRwwNMJGFbuidoVTQcM`, starting from node `420:3691`, and list candidate screens/frames for: prototype spine, wireframes, flow map, UI states, design changes. **First deliverable of the audit: resolve the `#1/#2/#3` question (§2 group 0)** — task states or meal variants — and record it in the manifest, because it decides whether the state-progression figure exists.
2. **Export direct screen assets.** Use `get_screenshot` on individual frame nodes from `584:1685` first. Produce clean PNGs for the core screen set (`Hjemside/middagsplan #1`, `Handleliste`, `Legg til`, `Oversikt`, and the relevant recipe/detail screens) before making any detail crops.
3. **Create derived explanatory assets only after direct exports.** Produce 3 before/after decision pairs or detail crops from the direct frame PNGs, the site-native `FlowStrip` (SVG/HTML, not an image), the state-progression trio if confirmed, and 1–2 annotated UI moments. Board screenshots may be used as reference for flow relationships but should not ship as cropped UI screens.
4. **Patch the page sequence.** Update only `src/app/pages/MatSparCaseStudy.tsx` plus asset imports. The `structure` section becomes the dark `FlowStrip` interlude (§4.4); design changes become `BeforeAfterDecision` rows; interface details become `AnnotatedMoment` figures. Implement locally in the page first unless an existing shared primitive already fits. Re-lead section headlines so skimming them reads the through-line.
5. **Use Higgsfield for at most one asset.** The graphite process sketch in the hero's sketch idiom (§3), 2–3 candidates, one kept — or none, if the flow strip already orients. No generated containers, frames, or scenes.
6. **Normalize MatSpar spacing.** Reduce section padding and figure gaps on MatSpar only. Do not start a global section-shell refactor.
7. **Verify reading rhythm.** Measure page height before/after at 1440×900 and inspect 375px. The page should feel denser, not cramped.

Out of scope for this MatSpar-first pass: editing Harmoni, Fristil, F1; replacing the Pass 4 primitive strategy; adding fake research; changing the MatSpar narrative claims without evidence; adding decorative AI art.

## 9. Definition of done

- MatSpar uses Figma-derived evidence for the prototype flow, at least two real UI decision moments, and at least two intermediate process/iteration artifacts.
- **Skimming only the section headlines reads as one argument** — cost arrived too late → information moved to the decision moment → task completed unaided. (The through-line test.)
- The `structure` section is a dark interlude with the site-native flow strip — and the state-progression figure if §2 group 0 confirmed it — not a long vertical phone gallery.
- At most one Higgsfield asset ships, in the hero's graphite idiom; zero generated containers, frames, or scenes.
- The `Design Changes` section shows visual before/after or iteration evidence for each retained decision, or the decision is cut/rewritten.
- Every visual has a mono caption that states a decision, name, or measurement.
- Higgsfield outputs, if used, are clearly support visuals and do not imply fake research, fake UI states, fake grocery behavior, or fake metrics.
- The page is ≤ 9 viewports at 1440×900, or the remaining overage is explained by real evidence that cannot be condensed without losing comprehension.
- No single MatSpar visual forces the reader to scroll a full viewport before understanding its point.
- The page remains a case study, not a marketing landing page: no lifestyle grocery scenes, no decorative hero art, no invented product screenshots.
- `npm run typecheck` and `npm run build` pass; desktop and 375px screenshots show no overlapping annotations, cropped labels, or dead half-screen paper fields.

## 10. Implemented — visual refinement outcome (2026-07-17)

The MatSpar page now uses **semantic surfaces instead of mechanical alternation**:
dark (`bench-surface`) is reserved for product evidence (hero + final-prototype
interlude), paper is the continuous reading spine (brief → research → direction →
testing → outcome), and the wireframes strip is a `--surface-paper-well` tonal band
inside the spine — 3 surface changes instead of 7. **This is the template rule for
Pass 4B/4C: dark is punctuation for the product reveal, never parity.** Supporting
decisions shipped with it: one h2 scale (34/44) and one 620px prose measure;
findings' percentages set at evidence scale (30px numerals) with the real pain-point
stickies as the artifact strip (no more CSS Post-it pastiche); direction principles
paired with real UI crops (FIG 03); the testing key finding proven with an annotated
Handleliste crop (FIG 05, drawn accent underlines); motion reduced to the hero
entrance + drawn rules (no scroll-fade on prose or figures); radii consolidated to
12/16px; FigCaption contrast raised to white/58·ink/55. The `Matplan #1/#2/#3`
state question resolved negative (saved-plan slots), so no state-progression figure
exists — see `src/assets/matspar/manifest.md` for the export/crop provenance.

---

# Pass 4B — Harmoni MCP asset rebuild addendum (planned 2026-07-10)

Harmoni-only slice, parallel to Pass 4A: `src/app/pages/HarmoniCaseStudy.tsx`, its asset imports, and shared figure primitives only where an already-planned Pass 4 primitive fits. **Pass 4A v2's shared rules apply unchanged and are not repeated here**: direct-frame extraction discipline (export real frame nodes, never crop boards), Higgsfield narrowed to at most one graphite-idiom asset, motion limited to drawn annotation rules (≤600ms, once, parent-area viewport trigger — see the Pass 3 zero-width IO gotcha), site-native diagrams (inline SVG/HTML, never generated containers), mandatory mono captions in the decision/name/measurement idiom, annotation values read from frames never invented.

**One difference from 4A: there is no confirmed Figma file key for Harmoni yet.** No node IDs appear below because none have been verified. The audit's first deliverable is the node manifest itself (file key, page structure, frame IDs) — the equivalent of 4A's table — produced through the Figma connector before any layout work starts.

## 1. Verdict on the current Harmoni asset quality

Harmoni is the flagship and already has the strongest evidence structure in the portfolio — a real V1/V2 redesign story with wireframe evidence (`imgWireframes`), an evidence-strip hero (3/5 → 5/5, 5 participants), labeled screen-job figures, and a measured-changes grid. Its problems are the opposite of MatSpar's:

1. **The story is told twice.** The `redesign` section (2,016px) presents V1 competing entry points → V2 single primary action; the `outcome` section (2,678px) then re-litigates it as a V1/Design Change/V2 grid. This duplication is most of why Harmoni is the tallest page (12,635px / 14 viewports).
2. **The V1 evidence is one baked composite PNG.** `imgWireframes` is a single figma:asset export holding multiple wireframes — it can't be recut, scaled per-screen, or staged at equal scale with the V2 final. The before/after pair — the page's core evidence — deserves clean per-frame exports.
3. **Naked palette scales.** The `system` section shows alfa/step swatch rows on a white plate — the single most recognizable student-portfolio artifact, and it contradicts the page's own copy, which already states the expert version: "Red was used only for urgent support. Green marked completion." Show those two moments in the real UI instead.
4. **Full-phone staging where crops would teach faster.** The experience section's four labeled screens (Home / Podcast / Profile / Mood) each show an entire phone to make a one-region point ("each screen has one job").
5. **Seven pure-white plates** on paper, per the Pass 4 audit — same fix as everywhere: wells and hairlines.

What Harmoni does *not* need: new narrative claims, new sections, or much Higgsfield. The evidence exists; it needs deduplication, recutting, and restaging.

## 2. Figma MCP asset extraction plan for Harmoni

Discovery first: locate the Harmoni file through the connector, map its pages (lo-fi/wireframes, prototype screens, design system, testing iterations), and write the node manifest. Then extract, in priority order:

0. **The V1/V2 pair (highest value).** The real V1 home frame(s) currently trapped inside the composite `imgWireframes`, plus the V2 final home — exported per-frame so both can be staged at identical scale and crop. This pair carries the 3/5 → 5/5 claim; it must be the cleanest figure on the page.
1. **Prototype spine.** The four flow steps as direct exports: Welcome/onboarding → Start the session → Reflect/mood → See progress.
2. **Screen-job crops.** For Home / Podcast / Profile / Mood: the region that constitutes each screen's "one job," cropped from direct frame exports — not four full phones.
3. **Color-by-function moments.** The urgent-support (red) UI moment and a completion (green) moment, as modest crops — these replace the palette scales. A small token-sheet crop may survive in a paper well as a supporting artifact only.
4. **Measured-change states.** For each row of the outcome grid's V1/Change/V2 story: the actual changed frames between test rounds, if they exist in the file. Where no frame evidence exists, the row stays text-led — do not fabricate deltas.
5. **UI states** only if present: exercise start states, mood selection states, progress after multiple sessions.

If the file lacks an artifact the page currently implies (e.g. a wireframe for a claimed iteration), flag it in the manifest and adjust the page copy rather than generating a stand-in.

## 3. Higgsfield MCP visual generation plan for Harmoni

At most one asset, same as 4A v2: a **graphite process sketch in the hero's Paper-to-Product idiom** — for Harmoni, the choice-burden reduction: many competing paths converging to one first step. Placement: `challenge` section, ≤420px, paper or ink well, mono caption. Generate 2–3 candidates, keep one or none — if the V1/V2 pair already lands the argument, skip it.

**Harmoni-specific do-nots, beyond the standing rules:**
- **No generated illustration that resembles the product's own brand illustration.** Harmoni has a warm in-app illustration language (the Hello hand, Velkommen). A generated lookalike is fake product art and brand confusion in one move. Product illustration appears only inside real screen exports.
- **No mental-health mood imagery**: no people in distress, therapy scenes, meditation/mindfulness lifestyle stock, or "calm" decorative gradients. Tone-deaf and instantly reads as filler.
- **No fake mood data, emotional journey maps, or affect curves.** Feelings are not chart fodder unless the product actually measured them; it didn't.

## 4. Recommended Harmoni page asset sequence

**Through-line: "One clear first step."** It's already in the copy — users "unsure what to do first," V2's "one dominant Start action," 3/5 → 5/5 starting unaided. The skim test: headlines alone must read *users couldn't start → each screen got one job → the first session was rebuilt around one action → 5/5 started unaided.*

1. **Hero (ink).** Keep — the evidence strip and framing already work. Optionally restage the two phones as onboarding + V2 home so the hero previews the argument.
2. **Challenge (ink).** Short; optional graphite sketch (many paths → one).
3. **Experience (paper).** The four full phones become a `FigureGrid` of four annotated job crops — each showing the region that is that screen's one job, mono-captioned (`FIG 02 · Home leads with today's exercise — one primary action`).
4. **Redesign (ink) — the signature moment and the page's center of gravity.** The clean V1/V2 pair at equal scale under `--proj-harmoni-light` rest rule, one drawn annotation rule marking the single primary action. **The outcome section's V1/Change/V2 grid merges in here** as compact measured-change rows beneath the pair (frame evidence where it exists, text where it doesn't). One story, told once, with its measurements attached.
5. **Flow (ink).** Tighten the existing four-step figure toward the `FlowStrip` idiom: 180–220px screens, hairline connectors, one-line mono decision captions.
6. **System (paper).** Palette scales out; in their place, two annotated UI moments (red = urgent support only, green = completion) plus at most one small token crop in a paper well. The section now proves "color by function" instead of asserting it.
7. **Outcome (ink).** Shrinks to results + what changed in testing + reflection — target roughly 1,100–1,300px, down from 2,678px. It reports; it no longer re-argues.

## 5. Layout and readability rules

4A v2's rules apply verbatim (measure, wells, caption idiom, phone widths 180–260px, motion, site-native diagrams). One addition: **the V1/V2 pair must share scale, crop, and vertical alignment exactly** — before/after evidence read at a glance dies the moment the two sides need mental normalization.

## 6. What to replace, keep, cut, or regenerate

**Replace:** the composite `imgWireframes` with per-frame exports; four full phones in experience with job crops; palette scales with color-in-use moments; white plates with wells.
**Keep:** hero framing + evidence strip; the V1/V2 narrative and all measured claims (3/5 → 5/5, 5 participants, 3 measured changes); the flow section's step structure; product illustration inside real screens.
**Cut:** the outcome section's duplicate V1/Change/V2 grid (merged into redesign); any full-height phone that makes a one-region point; padding cliffs per Pass 4.
**Regenerate:** nothing except (optionally) the one graphite sketch.

## 7. Exact updates to this plan

Pass 4B added (this section); Pass 4 §4's Harmoni line is superseded by this addendum where they differ (the redesign/outcome merge is new); Passes 1–4A untouched. MatSpar (4A) and Harmoni (4B) are independent slices — either can ship first; shared primitives (`FigureGrid`, `FlowStrip`, `BeforeAfterDecision`, `AnnotatedMoment`) belong to whichever slice builds them first, the other reuses.

## 8. First pass Antigravity implementation scope

1. **Figma audit** — find the Harmoni file, produce the node manifest (the 4A-style table), and resolve group 0: are the V1 frames individually exportable? That answer shapes the redesign section.
2. **Export** the prototype spine, V1/V2 pair, screen-job source frames, and color-moment frames as clean PNGs under `src/assets/harmoni/figma-screens/`.
3. **Derive** the job crops, color moments, and measured-change pairs from direct exports only.
4. **Patch `src/app/pages/HarmoniCaseStudy.tsx` only**: merge outcome's grid into redesign, restage experience as the crop grid, rebuild system around color-in-use, normalize Harmoni's padding. No global refactor; reuse 4A primitives if they exist by then.
5. **Higgsfield**: at most the one sketch, or none.
6. **Measure** before/after at 1440×900 and 375px. Target ≤9.5 viewports (from 14).

Out of scope: other case studies, homepage, narrative changes beyond the merge, anything that adds a claim the file can't evidence.

## 9. Definition of done

- The V1→V2 story is told exactly once, with the pair staged at identical scale from per-frame exports, measured changes attached beneath it.
- Skimming the section headlines reads the through-line: couldn't start → one job per screen → one first action → 5/5 unaided.
- No naked palette scales anywhere; the system section shows color doing its job in the real UI.
- Every figure mono-captioned in the idiom; no white plates; no full phone where a crop teaches faster.
- ≤9.5 viewports at 1440×900 or the overage justified by real evidence; no visual requires a full viewport of scrolling before its point lands.
- At most one generated asset (graphite idiom); zero brand-lookalike illustration, mood imagery, or fabricated process artifacts.
- `npm run typecheck` + `npm run build` pass; desktop and 375px screenshots reviewed; CaseStudyNav/EvidenceStrip/NextProjectNav regression-clean.

## 10. Implemented — visual refinement outcome (2026-07-17, existing-assets path)

Pass 4B shipped via the MatSpar (§4A.10) semantic-surface template using **only
assets already in the repo** — the Figma extraction plan above (§2) was not
executed and is superseded; §1's remaining verdict items are resolved as follows.
Surfaces: dark = hero + Key screens interlude (bench grain + terracotta wash);
paper spine elsewhere; **two** `--surface-paper-well` tonal bands for reference
material (App structure/IA, Visual system) — 3 polarity flips. The naked palette
boards were replaced by curated crops (semantic scale rows; a three-column type
specimen; the green "Status 60% Fremgang" Profil crop as in-situ colour proof).
The V1/V2 pair is annotated with two drawn accent marks — Dagens øvelse and the
Råd & Tips tab (finding 01 made visible; V1 shows Hjelp venn in that slot). Hero
restaged flat from existing exports (framed 327×675 pair retired). MatSpar
constants applied (H2 34/44, 620px measure, py-16/20/24, 12/16 radii, motion =
hero + drawn rules). No Higgsfield assets. Desktop ≈9.3 viewports at 1440×900.
Crop provenance: `src/assets/harmoni/manifest.md`.

---

# Pass 4C — Fristil visual refinement (implemented 2026-07-17)

No planning addendum preceded this pass; it applied the ratified semantic-surface
template (§4A.10) directly, with one Fristil-specific inversion: the page's
failure was **under-papering, not over-alternation** (5 of 7 surfaces were dark,
double-dark runs at hero→Challenge and Structure→System). Shipped: dark reserved
for the hero and the Visual-system gallery (which keeps its distinctive centered
`--proj-fristil-light` gallery glow rather than the top wash the other pages
use); Challenge/Research/Build/Results on paper; Structure on the well band with
the re-inked sitemap and the three full-length wireframe plates (the "full page
length" FIG 04 caption bars cropping them). Conformance: Challenge opens with a
20px standfirst (its finalized text has no h2), two-tone h2 spans flattened to
solid H2 34/44, insight cards raised with ghost numerals removed, metrics in
Jakarta semibold tabular with `bg-ink/25` drawn rules, next-step as the raised
honesty card, solid ResourceLink kept (only shipped product in the portfolio),
pagination flipped light, motion stripped to hero + drawn rules, wireframe strip
snap-scrolls on mobile. Zero asset changes; zero Higgsfield. ~10.8 viewports at
1440×900 (from 11.1) — the remaining length is dated real evidence. All four
case studies now share one visual grammar.

---

# Pass 4C — Fristil Records evidence rebuild (planned 2026-07-12)

Fristil-only slice: `src/app/pages/FristilCaseStudy.tsx` and its assets. **Pass 4A v2's shared rules and the Harmoni audit canon apply from day one** (extraction discipline, mono idiom via the shared primitives in `case-study/shared.tsx`, drawn rules only, wells not plates, no rendered em dashes, one term per thing, every count and date defined, no hover states or glass in the reading flow). Baseline (Pass 4 audit): **12,060px = 13.4 viewports, 16 pure-white plates, two paper slabs (2,789px and 2,191px), and only 3 images on the whole page.**

What makes 4C different from 4A/4B: **the evidence is external and real.** The BAO302 project description (bachelor, group 38) documents the client brief, the five-page scope, the platform decision, the timeline, and a published-literature foundation. The site is live at fristilrecords.no and can be screenshotted directly. Launch-month analytics exist. No Higgsfield asset is justified anywhere on this page; the plan's generation budget is zero.

## 1. Verdict on the current page

The inverse of MatSpar's failure. MatSpar showed too much screen per point; Fristil shows almost none. A website case study whose 1,285 lines contain three screenshots is arguing from assertion: "standardized artist profiles," "reusable templates," "mobile layout," "controlled type scale," "consistent grid," "minimal color" are all *claims in white text-cards with no pictures*. The before/after card pair compares bullet lists (and the "before" is a site that never existed, so the frame itself is wrong). The unnamed Design Decisions section restates the structure and build sections in four more text cards. Meanwhile the page sits on real, verifiable material it never uses.

**Factual risks surfaced by BAO302 (verify, then correct):**
1. **Team attribution is absent.** The bachelor project was three people (Henrik Løvdal Bjørbekk, Mark Daniel Reyes, Damian Aaby Præsthus); the page reads as solo ("I designed and built"). A reviewer who finds the thesis reads that as inflation. Fix as on MatSpar/F1: state the team once, then own the parts that were Damian's.
2. **Navigation mismatch.** The page claims three categories ("Artists, Services, About"); BAO302 specifies five subpages (Artister, Nyheter, Kontakt/Om oss, Markedsføring, Live), and the live-site screenshot shows a Norwegian nav closer to the latter. The structure section must show the shipped structure, in its real language.
3. **Platform honesty.** BAO302 records Wix as the development/publishing choice, made *with the client* after weighing publishing systems for post-handoff sustainability; the GANTT also lists a VS Code development phase. The page says "I built the responsive site" with no platform named — one View Source on the live site reveals it. State what was actually used and why; the documented client-driven rationale makes this a strength (pragmatic delivery for a client who must maintain it), not a confession.
4. **Duration.** "3 month project" / "3 mo design to launch" vs the GANTT's 13 Jan–15 May (≈4 months) and "launched April 2025" in the impact section. One timeline, verified, used everywhere.
5. **User testing is missing entirely.** BAO302 documents a 17-day user-testing phase (14–31 Mar) with participants; the case study never mentions testing. If findings exist in the final thesis, they belong in research; if they can't be sourced, the method row stays interviews + comparable labels and no testing claim is added.

**The unused asset:** BAO302's literature review. Söderström et al. 2019 (62.5% of young users found maximalist sites more engaging for creative purposes), Goree et al. 2021 (2007–2019 homogenization of web design), Farrell 2024 (SEO, mobile, testing for young audiences). This is a real, citable research foundation for the design direction — the exact thing that separates a bachelor project from a portfolio piece — and the page never mentions it.

## 2. Through-line

**"Structure first, so the artists can be loud."** The audience (17–20, russ culture) responds to bold, maximalist expression; the homogenized web pushes everything toward the same quiet templates; the resolution is a deliberately neutral, reusable structure where the artists' own photography supplies the energy. Every section feeds this: the label had no structure → research (stakeholders + literature) set the tension → the sitemap resolved it → the visual system keeps UI quiet and photography loud → templates prove it scales → launch numbers show people actually explored it.

## 3. Evidence extraction plan

**I can produce (no user input):**
- **Fresh live-site captures** via headless browser at fristilrecords.no: homepage, artist index, *two artist profiles* (side by side = the template claim made visible), Markedsføring/services page, and a 375px mobile capture (nav + stacked grid). These replace six text-card claims with pictures.
- **A site-map diagram** in the site idiom (inline SVG/HTML, hairlines + mono labels, accent tick on the artist path) — drawn from the *shipped* nav, verified against the live site, replacing the category chips and the before/after cards.
- **Literature strip**: three one-line citation rows (author, year, finding, → the decision it shaped), typeset in the mono idiom. Content verbatim-traceable to BAO302.

**From the user (blockers marked):**
- Figma wireframe exports (BAO302 confirms a Jan–Feb wireframe phase; no file key known — same connector/manual route as 4A/4B). Wanted for one before/after pair: wireframe → shipped page. Not a blocker; the section works without it.
- The **final thesis or test report** if user-testing findings should appear (blocker for any testing claim).
- One-sentence answers: actual platform story (Wix, Velo, custom?), actual launch month, actual total duration, and which parts Damian personally owned vs. the team's.
- Optional: analytics screenshot for the results section provenance.

## 4. Section-by-section plan

1. **Hero (ink, bench-surface, 85vh).** Keep the MacBook + evidence strip. Fix duration once verified; role line becomes honest ("UX, UI, site build · 3-person bachelor project" or per user's answer); outcome line gets a number ("1,783 pageviews in the first measured month"). Glow → `--proj-fristil-light` (paper-white gallery light; current glow is off-brand blue).
2. **01 Challenge (ink).** Keep, tightened. Absorbs the "before" facts (no site, social-only presence) so the fake before/after frame can die.
3. **02 Research (paper).** Insight cards onto `paper-well` (kills 4 plates), then the **literature strip** with a mono caption crediting the sources. Method row updated only if testing evidence arrives.
4. **03 Structure (paper).** The **site-map figure** (shipped nav, Norwegian labels, one-line English gloss per the language-note rule, stated once for the page) + a short paragraph on why Artister leads. Category chips and both before/after cards deleted.
5. **Design Decisions section: deleted.** Its four cards are restatements; "limited navigation" and "standardized profiles" live in structure, "clear service pages" and "room for new content" live in build. Also removes the page's `backdropFilter: blur(4px)` (glass ban). Saves ~1,100px and one unanchored section.
6. **04 System (ink interlude, the signature).** Live screens staged in ink wells under the fristil light: homepage, Nyheter (concert photography carries the section), newsletter. The three empty text-cards (type/grid/color) become two or three mono annotations drawn against the real screens ("UI neutral; photography supplies the energy", "one grid, three page types"). Copy rewritten around the Söderström/Goree tension in two sentences, no name-dropping in body text (names live in the research strip).
7. **05 Build (paper).** The **two-artist-profile pair** (template proof) + **mobile capture** + the honest platform paragraph (client-driven choice, sustainability rationale per BAO302 §1.2). The three build text-cards die; their one real fact each (templates, mobile, content cuts) becomes the captions.
8. **06 Results (ink).** Metric tiles → drawn-rule mono stat rows (Harmoni outcome pattern): 1,783 pageviews · 789 sessions · 664 unique visitors · 2:55 avg session, "first measured month, <verified month> 2025". Keep the honest scope line (inquiries/retention unmeasured). Reflection folds in beneath (as Harmoni), ending on "structure shapes perception". Frees another section header.
9. **Nav ids**: 6 anchors keep working; reflection lives under `impact`.

## 5. Layout and readability rules

Everything from 4A v2/4B: mono eyebrows `01…06`, FIG captions in the decision/name/measurement idiom, wells not plates (16 → 0), section padding `py-16 md:py-20 lg:py-24`, `bench-surface`/`paper-surface` grain, MotionConfig reducedMotion, no hovers on reading surfaces, drawn rules with parent-area viewport triggers, no rendered em dashes. Screenshots of a *website* are landscape: stage at 560–720px wide in wells, never full-bleed; the two-profile pair shares scale and crop exactly (Harmoni pair rule).

## 6. Replace / keep / cut / verify

**Replace:** insight plates → wells; chips + before/after cards → site-map figure; system text-cards → annotated live screens; build text-cards → template pair + mobile capture; metric tiles → stat rows.
**Keep:** all copy that survives fact-check (most body copy is honest and calm), the MacBook hero, EvidenceStrip, both live-site links, the reflection's substance.
**Cut:** Design Decisions section, the fake before/after, hover states, backdropFilter, one of the two live-site CTA duplicates if spacing wants it.
**Verify before writing (blocking):** team attribution wording, platform statement, duration, launch month, nav labels against the live site.

## 7. First-pass Antigravity scope

1. Capture the live site (desktop 1440 + mobile 375: home, artist index, two profiles, services page) into `src/assets/fristil/`; write `manifest.md` with provenance.
2. Build the site-map figure and literature strip.
3. Rebuild `FristilCaseStudy.tsx` per §4 on the shared primitives.
4. Resolve the five §1 factual items with the user's answers; nothing unverified ships.
5. Measure: target **≤9 viewports** (from 13.4), paper runs ≤1,800px, zero white plates, zero em dashes; typecheck + build; 1440/375 screenshots; MatSpar/Harmoni regression untouched.

## 8. Definition of done

Every visual claim on the page has a picture or is deleted; the five factual risks are resolved with verified statements (team, platform, duration, launch month, navigation); the literature foundation appears once, correctly attributed, tied to decisions; metrics are defined (which month, which tool if known) and keep the honest-scope caveat; ≤9 viewports at 1440×900 or overage justified by evidence; zero `#FFFFFF` plates, grain on every section, FIG numbering sequential; `npm run typecheck` + `build` green; live-site captures dated in the manifest (sites change; provenance matters).
