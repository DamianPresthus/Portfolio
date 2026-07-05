import { useEffect, useState } from "react";

/**
 * "Paper to Product" — hero intro sequence timing model.
 *
 * The full timeline lives in CSS (hero-sequence.css) as animation delays,
 * started by the `hs-run` class. These hooks own only what CSS can't:
 * session gating, completion marking, and LCP-gated mounting.
 *
 * Master clock (ms from `hs-run`):
 *   0     Phase 1 — warm paper + grain visible immediately
 *   100   Phase 2 — pencil grid strokes draw in (staggered, done ~800)
 *   250   construction lines (wireframe, ink-dark) fade onto the paper
 *   400   loose interface rectangles sketch in (staggered, done ~1100)
 *   1000  Phase 3 — rough grid aligns: wobble/rotation resolves to a
 *         straight hairline grid (crossfade, done 1500)
 *   1500  Phase 4 — paper lifts to the dark canvas (800ms); construction
 *         lines lose their ink filter; wire → mid-fi → photo crossfades
 *         (1600–2600); a faint white grid echoes through the transition
 *         and dissolves by ~2500; warm/cool color arrives with the dark bg
 *   2300  Phase 5 — headline rises; meta/subhead/CTAs stagger in
 *   3200  done — sessionStorage.heroPlayed set; only the ambient warmth
 *         drift moves after this
 */
export const HERO_TIMING = {
  paperLift: 1500,
  headline: 2300,
  total: 3200,
} as const;

export type HeroMode = "sequence" | "static";

export function markHeroPlayed() {
  try {
    sessionStorage.setItem("heroPlayed", "true");
  } catch {
    // Storage unavailable (private mode) — sequence simply replays next visit.
  }
}

/**
 * Decide once, before first paint, whether to play the sequence.
 * Static = final state instantly (replay visits + reduced motion).
 */
export function getInitialHeroMode(): HeroMode {
  if (typeof window === "undefined") return "static";
  try {
    if (sessionStorage.getItem("heroPlayed") === "true") return "static";
  } catch {
    // fall through — treat as first visit
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }
  return "sequence";
}

/** Marks the session as played once the sequence completes. */
export function useMarkPlayedOnComplete(mode: HeroMode, run: boolean) {
  useEffect(() => {
    if (mode !== "sequence" || !run) return;
    const t = window.setTimeout(markHeroPlayed, HERO_TIMING.total);
    return () => window.clearTimeout(t);
  }, [mode, run]);
}

/**
 * True once LCP has been reported (or after a fallback window on browsers
 * without the LCP entry type, e.g. Safari). Gates the ambient warmth layer
 * so the initial paint never waits on it.
 */
export function useAfterLCP(): boolean {
  const [after, setAfter] = useState(false);

  useEffect(() => {
    let fired = false;
    let observer: PerformanceObserver | undefined;
    const fire = () => {
      if (fired) return;
      fired = true;
      observer?.disconnect();
      setAfter(true);
    };

    try {
      observer = new PerformanceObserver(fire);
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // LCP entry type unsupported — rely on the fallbacks below.
    }

    const onLoad = () => window.setTimeout(fire, 250);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const cap = window.setTimeout(fire, 3000);

    return () => {
      observer?.disconnect();
      window.removeEventListener("load", onLoad);
      window.clearTimeout(cap);
    };
  }, []);

  return after;
}
