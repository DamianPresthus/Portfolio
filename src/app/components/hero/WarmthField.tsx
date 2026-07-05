import { useEffect, useRef, useState, type RefObject } from "react";
import { useAfterLCP } from "./useHeroSequence";

/** Max cursor-follow offset in px — kept well under perceptibility. */
const MAX_X = 28;
const MAX_Y = 20;

interface WarmthFieldProps {
  /** The hero section — pointer movement is tracked across it. */
  heroRef: RefObject<HTMLElement | null>;
}

/**
 * Ambient warmth behind the hero content — zero assets.
 * Two counter-drifting radial gradients (25s / 35s loops, transform-only,
 * screen blend) stand in for a light loop; hero-sequence.css owns the look.
 * - Mounts nothing until LCP has fired (initial paint never waits on it).
 * - Reduced motion: the drift keyframes are disabled in CSS, leaving the
 *   gradients as a static overlay.
 * - Fine pointers get a heavily damped radial warmth overlay that drifts
 *   toward the cursor (800ms ease-out, ±28px) — felt, not seen.
 */
export function WarmthField({ heroRef }: WarmthFieldProps) {
  const afterLCP = useAfterLCP();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [cursorOk] = useState(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!cursorOk || !afterLCP) return;
    const el = heroRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        overlayRef.current?.style.setProperty(
          "transform",
          `translate3d(${(nx * MAX_X).toFixed(1)}px, ${(ny * MAX_Y).toFixed(1)}px, 0)`,
        );
      });
    };
    const onLeave = () => {
      overlayRef.current?.style.setProperty("transform", "translate3d(0, 0, 0)");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [cursorOk, afterLCP, heroRef]);

  if (!afterLCP) return null;

  return (
    <div className="hsWarmth" aria-hidden="true">
      <div className="hsWarmth__drift hsWarmth__drift--a" />
      <div className="hsWarmth__drift hsWarmth__drift--b" />
      {cursorOk && <div ref={overlayRef} className="hsWarmth__cursor" />}
    </div>
  );
}
