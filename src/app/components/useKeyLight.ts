import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Cursor-tracked key light for the bench cards' mockup wells.
 *
 * rAF-throttled pointermove writes translate targets to the light
 * element; the 160ms CSS transition on `.card-keylight` provides the
 * lamp-chase (the light never snaps to the cursor). Inert on coarse
 * pointers and under prefers-reduced-motion — CSS falls back to a
 * static centred light on hover/focus.
 */
export function useKeyLight() {
  const lightRef = useRef<HTMLDivElement | null>(null);
  const activeWell = useRef<HTMLElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const enabled = useRef(false);

  const updatePosition = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!enabled.current || !lightRef.current || !activeWell.current) return;

      // Read the live viewport rect inside the animation frame. A cached
      // rect drifts as soon as the page scrolls beneath a stationary pointer.
      const rect = activeWell.current.getBoundingClientRect();
      const x = pointer.current.x - rect.left - rect.width / 2;
      const y = pointer.current.y - rect.top - rect.height / 2;
      lightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );
    const update = () => {
      enabled.current = fine.matches && motionOk.matches;
    };
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (activeWell.current) updatePosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updatePosition]);

  const onPointerEnter = (e: ReactPointerEvent<HTMLElement>) => {
    if (!enabled.current) return;
    activeWell.current = e.currentTarget;
    pointer.current = { x: e.clientX, y: e.clientY };
    updatePosition();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!enabled.current || !lightRef.current) return;
    activeWell.current = e.currentTarget;
    pointer.current = { x: e.clientX, y: e.clientY };
    updatePosition();
  };

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    activeWell.current = null;
    if (lightRef.current) {
      lightRef.current.style.transform = "";
    }
  };

  return {
    lightRef,
    wellProps: { onPointerEnter, onPointerMove, onPointerLeave },
  };
}
