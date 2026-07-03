/**
 * Shared case study layout primitives and animation presets.
 *
 * Every case study page imports from here instead of re-declaring
 * identical helpers locally. This keeps the design system in one
 * place and makes cross-page consistency trivial to maintain.
 */

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
          className="inline-flex items-center gap-2 text-white/72 hover:text-white/92 transition-colors duration-200 group"
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
   ResourceLink — external proof link (live site / prototype / source)

   One shared pill so every case study links out with identical
   spacing, focus ring, and hover behaviour.
     • variant "solid" — filled orange, for the strongest proof
       (a shipped, live product). Reads well on light or dark.
     • variant "ghost" — bordered, secondary. Pass `tone` to match
       the background it sits on ("dark" = white border/text,
       "light" = ink border/text).
   ─────────────────────────────────────────────────── */

interface ResourceLinkProps {
  href: string;
  label: string;
  /** Optional leading icon (a trailing ↗ is always appended). */
  icon?: LucideIcon;
  variant?: "solid" | "ghost";
  /** Background the ghost link sits on. Ignored for the solid variant. */
  tone?: "dark" | "light";
  className?: string;
}

export function ResourceLink({
  href,
  label,
  icon: Icon,
  variant = "ghost",
  tone = "dark",
  className = "",
}: ResourceLinkProps) {
  const isSolid = variant === "solid";

  const solidClasses =
    "bg-[#F98E1F] text-[#161A1F] shadow-[0_8px_24px_-12px_rgba(249,142,31,0.55)] hover:bg-[#FFA13E] hover:-translate-y-[1px]";
  const ghostDark =
    "border border-white/20 text-white/75 hover:text-white hover:border-white/40 hover:-translate-y-[1px]";
  const ghostLight =
    "border border-[#161A1F]/20 text-[#161A1F]/72 hover:text-[#161A1F] hover:border-[#161A1F]/40 hover:-translate-y-[1px]";

  const variantClasses = isSolid
    ? solidClasses
    : tone === "light"
      ? ghostLight
      : ghostDark;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — opens in new tab`}
      className={`group inline-flex items-center gap-2.5 h-12 rounded-full px-6 font-['Plus_Jakarta_Sans',sans-serif] text-[14px] font-medium tracking-[0.2px] no-underline transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F98E1F] ${variantClasses} ${className}`}
    >
      {Icon ? (
        <Icon className="w-[16px] h-[16px] shrink-0" strokeWidth={1.75} />
      ) : null}
      <span>{label}</span>
      <ArrowUpRight
        className={`w-[15px] h-[15px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] ${
          isSolid ? "" : "opacity-70"
        }`}
        strokeWidth={1.75}
      />
    </a>
  );
}

/* ───────────────────────────────────────────────────
   BackToProjects — footer CTA link
   ─────────────────────────────────────────────────── */

export function BackToProjects({ light = false }: { light?: boolean }) {
  const baseColor = light ? "text-[#161A1F]/48" : "text-white/48";
  const hoverColor = light ? "hover:text-[#161A1F]/72" : "hover:text-white/72";
  const borderColor = light
    ? "border-[#161A1F]/[0.05]"
    : "border-white/[0.05]";

  return (
    <div className={`mt-24 md:mt-32 pt-12 md:pt-16 border-t ${borderColor}`}>
      <Link
        to="/"
        className={`group inline-flex items-center gap-3 ${baseColor} ${hoverColor} transition-colors duration-300`}
      >
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
          className="transition-transform duration-200 group-hover:-translate-x-1"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        <span className="text-[13px] md:text-[14px] tracking-wide font-medium">
          Back to Projects
        </span>
      </Link>
    </div>
  );
}
