# Prompt for Fable 5 — Portfolio Hero: "From System to Human"


Act as an elite UX/UI designer, front end developer, motion interaction thinker, and portfolio art director.

Help me rethink and optimize my portfolio hero so it does not just introduce me, but demonstrates my design ability immediately. The goal is to create a hero that feels visually memorable, emotionally warm, technically polished, and strategically useful for hiring.

Evaluate the hero through visual hierarchy, storytelling, interaction design, accessibility, motion behavior, front end feasibility, and recruiter perception. Push beyond generic portfolio advice. Surface the highest leverage improvements that would make the first impression feel more creative, intentional, and premium without becoming excessive or gimmicky.

## Context

I'm building the hero section for my UX/UI + front-end portfolio at damianpresthus.com. Current hero: dark background, portrait of me on the left, headline "Building systems that evolve with human behaviour" on the right, with subhead and two CTAs (View Work, About). It's competent but static — nothing in the hero demonstrates the promise the headline makes.

I want you to design and implement a hero load sequence and ambient interaction that makes the headline *perform itself* — a small design system resolves into a human portrait, then responds to the visitor. The concept is called **"From System to Human."**

You have creative latitude on timing curves, easing, exact grid weights, and how the layers interact — the beats below are the intent, not a strict spec. Where you see a better way to hit the intent, take it.

## The concept in one line

The hero opens as if we're looking inside a Figma file mid-design — wireframe, grid, missing word — and resolves into a warm, human, finished state. Then it quietly responds to the cursor. Once per session.

## Assets I will provide

1. **`portrait-final.jpg`** — the real photograph of me (existing hero image).
2. **`portrait-midfi.png`** — a Higgsfield-generated grayscale mid-fidelity render of the same pose and crop, for the intermediate cross-fade state. Registered to the final photo within ~8px.
3. **`portrait-wireframe.svg`** — hand-drawn wireframe of the figure. Off-white strokes on transparent background. Deliberately imperfect. Same crop as the photo.
4. **`warmth-field.mp4` / `.webm`** — a 12s seamless ambient warm light loop (Higgsfield-generated, no subjects, no particles).

All four are pre-registered to the same frame. Your job is composition, timing, interaction, and code.

## The load sequence (once per session, gated by `sessionStorage.heroPlayed`)

**Beat 1 — "Design file" state (0 → ~400ms)**

- The wireframe portrait is visible in the portrait slot.
- A faint 8-column layout grid sits over the hero area. Hairline strokes, very low opacity (~4–6%). The grid is the **structure signal** — it should quietly suggest layout discipline, systems thinking, and implementation awareness without becoming decorative.
- The headline is visible from the start at reduced opacity, but the word **"evolve"** is missing. Reserve the word width so the layout does not shift when it appears later.
- Subhead and CTAs are not yet visible.
- The warmth field is not visible yet. It may be preloaded or playing invisibly if that improves smoothness.

Hold this state long enough to read as intentional, not as a flash of unstyled content.

**Beat 2 — Resolution (~400 → ~1300ms)**

- Cross-fade wireframe → mid-fidelity grayscale → final photograph. Use two overlapping cross-fades, not three obvious slides. It should feel like fidelity increasing.
- The grid dissolves in parallel with the mid-fi → photo transition. By the time the color photo is fully visible, the grid is gone.
- The warmth field fades in behind the hero at ~30% opacity. Use `mix-blend-mode: screen` or a cleaner equivalent if needed.

**Beat 3 — Layout settles (~1300 → ~2400ms)**

- Headline settles to full opacity, still with the reserved gap where "evolve" belongs.
- Subhead and CTAs fade in. Stagger subtly only if it feels calmer than a single fade.
- Nothing else should be asking for attention.

**Beat 4 — Final word (~2400 → ~2700ms)**

- The missing word resolves through whole-word swaps: **adapt → respond → learn → evolve**.
- Each word appears for ~250ms. The final word "evolve" settles in the existing orange accent color.
- No typing effect. No glitch. No character animation. No loop.
- Set `sessionStorage.heroPlayed = true`.

**Ongoing**

- The warmth field keeps looping.
- Simulate cursor response by gently translating or masking the warmth field layer, or by layering a CSS radial warmth overlay above the video. Use heavy damping (~800ms ease-out) with a maximum offset around 40px. Choose the cleaner implementation.
- The response should be barely perceptible. The visitor should feel the hero is alive, not notice an interactive gradient.
- Nothing else responds to cursor movement.

## Design intent (read this before deciding the details)

- **Believable, not impressive.** If a visitor thinks "cool effect," I've lost. If they think the headline is true and scroll, I've won.
- **The wireframe should look hand-drawn.** If the SVG I provide looks too clean, feel free to add a subtle roughen filter or slight stroke jitter — but do not stylize it into looking generated.
- **Motion budget is 2.7 seconds total.** After that, only the ambient warmth field moves. If you find yourself adding a fifth beat, cut something instead.
- **Respect `prefers-reduced-motion`.** Skip straight to final state: color portrait, full headline with "evolve" in place, warmth field replaced by a single still frame, no cursor tracking.

## Layout & responsive

- Desktop (>1024px): match current hero composition — portrait left, text right.
- Tablet: your call, but the sequence should still play. Consider stacking with the portrait above the text.
- Mobile (<768px): I'd rather see a simplified sequence than a broken one. Acceptable to skip the mid-fi step on mobile and cross-fade wireframe → photo directly. The "evolve" word cycle should still run. Warmth field can be a static image on mobile to save bandwidth.

## Technical constraints

- Stack: React + Vite + Tailwind (existing project). TypeScript.
- Do not add heavy animation libraries if CSS + a small hook can do it. Framer Motion is acceptable if it materially helps.
- Total added page weight budget: **6MB max** across all assets. Lazy-load the warmth field video *after* LCP fires — the initial paint must not wait on it.
- The hero must be interactive (CTAs clickable) by ~800ms even if the sequence is still animating. Don't block interaction on animation completion.
- Preserve current accessibility: headline remains a real `<h1>` in the DOM at all times, even during the "evolve" cycle. Screen readers should read the final version. Use `aria-live="off"` on the animating word.

## What I want back from you

1. **A short design memo (under 200 words)** describing the specific timing curves, easing, opacity values, and grid specifications you chose, and why. If you deviate from the beats above, say where and why.
2. **The implementation.** Component code for the hero, any hooks or utilities, CSS/Tailwind, and integration notes for wiring it into the existing hero section. Assume I can plug the four assets in myself.
3. **A fallback plan** for the case where `portrait-midfi.png` doesn't register cleanly (the Higgsfield asset is the highest-risk piece). Show me the two-step wireframe → photo version as a code path I can switch on with a prop.
4. **One thing you'd cut or change** if I gave you another day. I want your judgment, not just execution.

## Failure modes to avoid

- Any motion that feels like an "AI reveal" — no shimmer, no scanning line, no morph glow, no particle dissolve.
- The grid pulsing, breathing, or reappearing after Beat 2.
- The "evolve" cycle running more than once, or ever looping.
- Cursor-response on the warmth field that's visible enough to look like a Tailwind template gradient.
- Any animation that continues past 2.7s except the ambient warmth field.
- Layout shift when "evolve" arrives. Reserve the width up front.

## Success test

Load the page cold. Watch once. Does the headline feel *demonstrated* rather than *claimed*? Does the hero feel like it belongs to a specific person who thinks in systems and ships code, or does it feel like a template? If the answer to the first is yes and the second is "belongs to a specific person," we're done.

---

## Refactor Prompt: Replace Video Warmth Field with Pure-CSS Counter-Drifting Gradients

Please modify the hero implementation to completely remove the video assets (`warmth-field.webm`/`mp4`) and fallback image poster (`warmth-poster.jpg`) dependencies. Instead, build a zero-byte, high-performance, pure-CSS ambient "warmth field" background that mimics the organic shifting glow.

### Requirements

1. **Pure-CSS Ambient Animation:**
   - Define two slowly counter-drifting CSS radial gradients inside the background.
   - Use long, non-repeating periods (e.g., `25s` and `35s`) with smooth looping keyframe transitions so the ambient lighting shifts organically over time.
   - Blend these using `mix-blend-mode: screen` or `mix-blend-mode: soft-light` against the `#0b0f12` background, keeping opacity subtle (~6–12%) so it feels cinematic and quiet.

2. **Refactor Components & Styles:**
   - Clean up [WarmthField.tsx](file:///Users/damian/Projects/DesignPortfolio/src/app/components/hero/WarmthField.tsx): Remove the `<video>`, `<img>` elements, asset URLs (`VIDEO_WEBM`, `VIDEO_MP4`, `POSTER`), and loading states/error handlers.
   - Retain the damped mouse-tracking radial overlay (`hsWarmth__cursor`) which uses the `pointer: fine` pointer tracking hook.
   - In [hero-sequence.css](file:///Users/damian/Projects/DesignPortfolio/src/styles/hero-sequence.css), define the CSS variables, animations, and keyframes for the two drifting ambient gradients.

3. **Performance & Accessibility:**
   - Ensure the new pure-CSS warmth field still mounts *after* LCP (using the `useAfterLCP` hook) to ensure the initial critical rendering path is completely unblocked.
   - Support `prefers-reduced-motion`: When reduced motion is preferred, pause the CSS drifting animation completely, leaving them as static overlay gradients.

4. **Testing & Code Cleanliness:**
   - Ensure it compiles and typechecks cleanly.
   - Remove unused CSS rules and variables related to the video media state (`.is-live`, etc.).

