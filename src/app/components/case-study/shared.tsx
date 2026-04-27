/**
 * Shared case study layout primitives and animation presets.
 *
 * Every case study page imports from here instead of re-declaring
 * identical helpers locally. This keeps the design system in one
 * place and makes cross-page consistency trivial to maintain.
 */

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

/* ───────────────────────────────────────────────────
   Animation presets
   ─────────────────────────────────────────────────── */

export const ease = [0.25, 0.1, 0.25, 1] as const;

/** Standard scroll-triggered fade + slide. */
export const fadeUp = {
  initial: { opacity: 0, y: 12 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
};

/** Tighter viewport margin variant for cards/blocks. */
export const fadeUpCard = {
  ...fadeUp,
  viewport: { once: true, margin: "-40px" } as const,
};

/** Helper: returns fadeUp with a custom delay. */
export const fadeUpDelay = (delay: number) => ({
  ...fadeUp,
  transition: { duration: 0.55, ease, delay },
});

/** Shared base transition config. */
export const baseTrans = { duration: 0.5, ease };

/** Staggered delay helper for lists / grids. */
export const stagger = (index: number, base = 0.07) => ({
  ...baseTrans,
  delay: base * index,
});

/* ───────────────────────────────────────────────────
   SectionDivider
   ─────────────────────────────────────────────────── */

interface SectionDividerProps {
  /** Whether this divider sits on a light (#F4F3F0) background. */
  light?: boolean;
  /**
   * Positioning mode.
   *  - `"absolute-top"` — absolutely positioned at the top of the parent section (default).
   *  - `"absolute-bottom"` — absolutely positioned at the bottom.
   *  - `"inline"` — static flow (no absolute positioning), useful inside content areas.
   */
  position?: "absolute-top" | "absolute-bottom" | "inline";
}

export function SectionDivider({
  light = false,
  position = "absolute-top",
}: SectionDividerProps) {
  const gradient = light
    ? "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 95%)"
    : "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 95%)";

  const positionClasses =
    position === "inline"
      ? "h-px"
      : position === "absolute-bottom"
        ? "absolute bottom-0 left-0 right-0 h-px"
        : "absolute top-0 left-0 right-0 h-px";

  return (
    <div
      aria-hidden="true"
      className={positionClasses}
      style={{ background: gradient }}
    />
  );
}

/* ───────────────────────────────────────────────────
   AmbientGlow
   ─────────────────────────────────────────────────── */

interface AmbientGlowProps {
  top?: string;
  width?: string;
  height?: string;
  /** CSS color for the glow centre. Defaults to a subtle neutral. */
  color?: string;
}

export function AmbientGlow({
  top = "25%",
  width = "900px",
  height = "600px",
  color = "rgba(140,170,210,0.015)",
}: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        top,
        width,
        height,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}

/* ───────────────────────────────────────────────────
   CaseStudyNav — fixed back-bar at the top
   ─────────────────────────────────────────────────── */

export function CaseStudyNav() {
  return (
    <nav
      aria-label="Case study navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#161A1F]/80 backdrop-blur-md border-b border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-200 group"
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <span className="text-[14px] font-medium tracking-wide">
            Back to work
          </span>
        </Link>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────────────
   BackToProjects — footer CTA link
   ─────────────────────────────────────────────────── */

export function BackToProjects({ light = false }: { light?: boolean }) {
  const baseColor = light ? "text-[#161A1F]/40" : "text-white/40";
  const hoverColor = light ? "hover:text-[#161A1F]/70" : "hover:text-white/70";
  const borderColor = light
    ? "border-[#161A1F]/[0.05]"
    : "border-white/[0.05]";

  return (
    <div className={`mt-24 md:mt-32 pt-12 md:pt-16 border-t ${borderColor}`}>
      <Link
        to="/"
        className={`group inline-flex items-center gap-3 ${baseColor} ${hoverColor} transition-colors duration-300`}
      >
        <span className="text-[13px] md:text-[14px] tracking-wide font-medium">
          Back to Projects
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
