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
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useScroll } from "motion/react";
import { PROJECTS } from "../../data/projects";

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
   Type scale — single source of truth, the typographic
   mirror of the color tokens in theme.css. Each constant
   carries font, size, weight, leading, and tracking only;
   color is applied per use (text-ink/NN · text-white/NN).
   Tracking is em-based so it scales across breakpoints.
   Serif (Lora) = editorial voice · Sans (Plus Jakarta) =
   interface · Mono (JetBrains) = evidence/metadata.
   ─────────────────────────────────────────────────── */

/** Section heading — the one h2 scale for every page. */
export const H2 =
  "font-['EB_Garamond',serif] font-semibold text-[34px] leading-[1.12] tracking-[-0.025em] md:text-[44px]";

/** Minor serif heading — reflections, closing statements. */
export const H3_SERIF =
  "font-['EB_Garamond',serif] font-semibold text-[24px] leading-[1.2] tracking-[-0.01em] md:text-[28px]";

/** Prominent card sub-heading — sans semibold. */
export const H3_CARD =
  "font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[19px] leading-[1.3] tracking-[-0.015em]";

/** Dense list-row sub-heading — sans semibold. */
export const H3_ROW =
  "font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[17px] leading-[1.35] tracking-[-0.01em]";

/** Flow-step / small caption heading — sans medium. */
export const H4_STEP =
  "font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[15px] leading-[1.4]";

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
   CaseStudyNav — fixed bar: back link, skim links, progress

   The skim layer for long case studies. Section links (md+) jump
   to anchored sections and track the reading position via one
   IntersectionObserver; a 1px accent hairline along the bar's
   bottom edge shows overall scroll progress. Max 5–6 sections —
   labels short enough to never wrap.
   ─────────────────────────────────────────────────── */

export interface CaseStudySection {
  /** DOM id of the target <section> (give it scroll-mt so the fixed bar clears it). */
  id: string;
  label: string;
}

export function CaseStudyNav({ sections }: { sections?: CaseStudySection[] }) {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!sections?.length) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      /* A section is "active" while it crosses the upper-middle band
         of the viewport — stable for both short and screen-filling
         sections. */
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  /* Plain href="#id" anchors would fight the hash router — jump via
     scrollIntoView instead. */
  const jumpTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Case study navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-md border-b border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-6 flex items-center justify-between gap-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/72 hover:text-white/92 transition-colors duration-200 group shrink-0"
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <span className="text-[14px] font-medium tracking-wide">
            Back to work
          </span>
        </Link>

        {sections?.length ? (
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[0.08em] uppercase font-medium leading-[16px] transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                    isActive
                      ? "text-white/92"
                      : "text-white/48 hover:text-white/72"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-[3px] w-[3px] rounded-full bg-accent transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {s.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Reading progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-accent/70 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </nav>
  );
}

/* ───────────────────────────────────────────────────
   EvidenceStrip — the 10-second read in a case-study hero

   Three stats, hairline-divided: tabular numerals over caps
   labels, optionally jumping to the section that substantiates
   them. Numbers never animate — they are evidence, not marketing.
   ─────────────────────────────────────────────────── */

export interface EvidenceStat {
  value: string;
  label: string;
  /** Optional section id to jump to (scrollIntoView — see CaseStudyNav). */
  targetId?: string;
}

export function EvidenceStrip({
  stats,
  tone = "dark",
  className = "",
}: {
  stats: EvidenceStat[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  const valueClass = isLight ? "text-ink/92" : "text-white/92";
  const labelClass = isLight ? "text-ink/48" : "text-white/48";
  const hoverValue = isLight
    ? "group-hover/stat:text-ink"
    : "group-hover/stat:text-white";
  const frame = isLight
    ? "border-ink/10 divide-ink/10"
    : "border-white/10 divide-white/10";

  const jump = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      role="group"
      aria-label="Key evidence"
      className={`flex flex-col sm:flex-row sm:items-stretch border-y divide-y sm:divide-y-0 sm:divide-x ${frame} ${className}`}
    >
      {stats.map((s) => {
        const inner = (
          <>
            <span
              className={`font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.01em] tabular-nums transition-colors duration-200 ${valueClass} ${
                s.targetId ? hoverValue : ""
              }`}
            >
              {s.value}
            </span>
            <span
              className={`font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[0.08em] uppercase font-medium leading-[16px] ${labelClass}`}
            >
              {s.label}
            </span>
          </>
        );
        return s.targetId ? (
          <button
            key={s.label}
            type="button"
            onClick={() => jump(s.targetId!)}
            title={`Jump to ${s.label.toLowerCase()}`}
            className="group/stat flex-1 flex flex-col items-start gap-1.5 py-4 sm:py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0 text-left bg-transparent border-0 cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {inner}
          </button>
        ) : (
          <div
            key={s.label}
            className="flex-1 flex flex-col items-start gap-1.5 py-4 sm:py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────────────────────────────────────
   CaseStudyHero — the canonical case-study opener

   One layout for every case study: a full-height bench
   surface washed with the project's light, a 5/7 grid with
   the mono eyebrow → serif title → lede → body → evidence
   strip → optional proof links (ResourceLink pills) on the
   left and the hero artifact on the right.
   ─────────────────────────────────────────────────── */

export function CaseStudyHero({
  eyebrow,
  title,
  lede,
  body,
  stats,
  lightVar,
  media,
  actions,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  body: ReactNode;
  stats: EvidenceStat[];
  /** Project light CSS variable name, e.g. "--proj-harmoni-light". */
  lightVar: string;
  /** The hero artifact for the right column. */
  media: ReactNode;
  /** Optional proof links (ResourceLink pills) under the evidence strip. */
  actions?: ReactNode;
}) {
  return (
    <section className="bench-surface relative flex min-h-screen w-full items-center overflow-hidden pt-20">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 72% 42%, rgb(var(${lightVar}) / 0.12), transparent 36%), linear-gradient(135deg, #10151d 0%, #161a1f 58%, #0e1218 100%)`,
        }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-8 py-14 md:px-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="lg:col-span-5"
        >
          <p className={`${MONO} mb-6 text-[11px] font-medium uppercase tracking-[0.08em] text-white/48`}>
            {eyebrow}
          </p>
          <h1 className="mb-5 font-['EB_Garamond',serif] text-[48px] font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-[62px] lg:text-[68px]">
            {title}
          </h1>
          <p className="mb-7 max-w-[570px] text-[19px] font-medium leading-[1.45] tracking-[-0.015em] text-white/75 md:text-[21px]">
            {lede}
          </p>
          <p className="max-w-[560px] text-[16px] leading-[1.7] text-white/64">
            {body}
          </p>

          <div className="mt-9 max-w-[560px]">
            <EvidenceStrip stats={stats} />
          </div>

          {actions ? (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease }}
          className="lg:col-span-7"
        >
          {media}
        </motion.div>
      </div>
    </section>
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
    "bg-accent text-ink shadow-[0_8px_24px_-12px_rgba(249,142,31,0.55)] hover:bg-accent-hover hover:-translate-y-[1px]";
  const ghostDark =
    "border border-white/20 text-white/75 hover:text-white hover:border-white/40 hover:-translate-y-[1px]";
  const ghostLight =
    "border border-ink/20 text-ink/72 hover:text-ink hover:border-ink/40 hover:-translate-y-[1px]";

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
      className={`group inline-flex items-center gap-2.5 h-12 rounded-full px-6 font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-medium tracking-[0.2px] no-underline transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variantClasses} ${className}`}
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
  const baseColor = light ? "text-ink/48" : "text-white/48";
  const hoverColor = light ? "hover:text-ink/72" : "hover:text-white/72";
  const borderColor = light
    ? "border-ink/[0.05]"
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

/* ───────────────────────────────────────────────────
   NextProjectNav — previous / next case study + back to work.
   Lets a reviewer move between projects without returning home.
   ─────────────────────────────────────────────────── */

type ProjectNavLink = {
  title: string;
  href: string;
  label: "Previous" | "Next";
  type?: string;
  image?: string;
  imageAlt?: string;
  tint?: string;
};

/** Reading order used for prev/next (cyclic, so nothing dead-ends) —
    derived from the shared project metadata so titles, thumbnails,
    and tints stay in sync with the home index. */
const CASE_STUDY_ORDER = PROJECTS.map((p) => ({
  title: p.title,
  href: p.href ?? "/",
  type: p.type,
  image: p.image,
  imageAlt: p.imageAlt,
  tint: p.tint,
}));

/** Returns the cyclic previous/next links for a given case-study href. */
export function caseStudyNav(current: string): {
  previous: ProjectNavLink;
  next: ProjectNavLink;
} {
  const n = CASE_STUDY_ORDER.length;
  const idx = CASE_STUDY_ORDER.findIndex((p) => p.href === current);
  const i = idx < 0 ? 0 : idx;
  return {
    previous: { ...CASE_STUDY_ORDER[(i - 1 + n) % n], label: "Previous" },
    next: { ...CASE_STUDY_ORDER[(i + 1) % n], label: "Next" },
  };
}

export function NextProjectNav({
  previous,
  next,
  light = false,
}: {
  previous?: ProjectNavLink;
  next?: ProjectNavLink;
  light?: boolean;
}) {
  const cardBorder = light
    ? "border-ink/10 hover:border-ink/25"
    : "border-white/10 hover:border-white/25";
  const labelClass = light ? "text-on-light-label" : "text-on-dark-label";
  const titleClass = light ? "text-on-light-primary" : "text-on-dark-primary";
  const arrowClass = light ? "text-ink/45" : "text-white/45";
  const groupArrow = light
    ? "group-hover:text-ink/75"
    : "group-hover:text-white/75";
  const backColor = light
    ? "text-ink/48 hover:text-ink/72"
    : "text-white/48 hover:text-white/72";
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <nav
      aria-label="Case study pagination"
      className={`mt-24 md:mt-32 pt-10 border-t ${
        light ? "border-ink/10" : "border-white/10"
      }`}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {previous && (
          <Link
            to={previous.href}
            style={{ "--pn-tint": previous.tint ?? "transparent" } as CSSProperties}
            className={`group flex items-center gap-5 rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pn-tint)] no-underline overflow-hidden ${cardBorder} ${focusRing}`}
          >
            {previous.image && (
              <span
                aria-hidden="true"
                className="hidden sm:block w-[72px] h-[56px] shrink-0 rounded-lg overflow-hidden"
                style={{ background: previous.tint ?? "transparent" }}
              >
                <img
                  src={previous.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </span>
            )}
            <span className="flex flex-col min-w-0">
              <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] font-medium ${labelClass}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 group-hover:-translate-x-0.5 ${arrowClass}`} aria-hidden="true">
                  <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
                {previous.label}
                {previous.type ? (
                  <span className="hidden lg:inline normal-case tracking-normal font-normal">
                    · {previous.type}
                  </span>
                ) : null}
              </span>
              <span className={`mt-2 font-['EB_Garamond',serif] font-semibold text-[19px] md:text-[21px] leading-[1.2] tracking-[-0.01em] truncate ${titleClass}`}>
                {previous.title}
              </span>
            </span>
          </Link>
        )}
        {next && (
          <Link
            to={next.href}
            style={{ "--pn-tint": next.tint ?? "transparent" } as CSSProperties}
            className={`group flex items-center gap-5 rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pn-tint)] no-underline overflow-hidden md:flex-row-reverse md:text-right ${cardBorder} ${focusRing}`}
          >
            {next.image && (
              <span
                aria-hidden="true"
                className="hidden sm:block w-[72px] h-[56px] shrink-0 rounded-lg overflow-hidden"
                style={{ background: next.tint ?? "transparent" }}
              >
                <img
                  src={next.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </span>
            )}
            <span className="flex flex-col min-w-0 md:items-end">
              <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] font-medium ${labelClass}`}>
                {next.type ? (
                  <span className="hidden lg:inline normal-case tracking-normal font-normal">
                    {next.type} ·
                  </span>
                ) : null}
                {next.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 group-hover:translate-x-0.5 ${arrowClass} ${groupArrow}`} aria-hidden="true">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              <span className={`mt-2 font-['EB_Garamond',serif] font-semibold text-[19px] md:text-[21px] leading-[1.2] tracking-[-0.01em] truncate ${titleClass}`}>
                {next.title}
              </span>
            </span>
          </Link>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className={`group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium transition-colors duration-300 rounded-sm ${backColor} ${focusRing}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
          Back to all work
        </Link>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────────────
   Working File reading-system primitives (Pass 4).
   Mono metadata, drawn measurement rules, and recessed
   artifact wells — shared by the case-study rebuilds.
   ─────────────────────────────────────────────────── */

export const MONO = "font-['JetBrains_Mono',monospace]";

/* Drawn measurement rules — the only motion inside the reading flow.
   Viewport trigger lives on a parent with real area (a scaleX(0)
   element is zero-width and IntersectionObserver never fires). */
export const drawParent = {
  initial: "hidden",
  whileInView: "drawn",
  viewport: { once: true, margin: "-60px" },
} as const;

export const drawRule = {
  hidden: { scaleX: 0 },
  drawn: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

/** Numbered mono section eyebrow — `01 · Challenge`. */
export function SectionEyebrow({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`${MONO} text-[11px] md:text-[12px] tracking-[0.08em] uppercase font-medium tabular-nums mb-8 md:mb-10 ${
        dark ? "text-white/48" : "text-ink/48"
      }`}
    >
      {index}&ensp;&middot;&ensp;{label}
    </p>
  );
}

/** Mono figure caption — `FIG 03 · states a decision, name, or measurement`. */
export function FigCaption({
  fig,
  children,
  dark = false,
  className = "",
}: {
  fig: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`${MONO} text-[11px] leading-[1.6] tracking-[0.04em] tabular-nums ${
        dark ? "text-white/58" : "text-ink/55"
      } ${className}`}
    >
      <span className={dark ? "text-white/68" : "text-ink/65"}>FIG {fig}</span>
      &ensp;&middot;&ensp;
      {children}
    </p>
  );
}

/** An artifact recessed into the surface. Dark wells may carry a
    project's light as a static 1px rest rule (pass the project's
    `--proj-*-light` var) — no hover model in the reading flow. */
export function Well({
  children,
  dark = false,
  light,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  /** CSS var reference, e.g. "var(--proj-harmoni-light)" */
  light?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[12px] border ${
        dark ? "bg-ink-well border-white/[0.07]" : "bg-paper-well border-ink/8"
      } ${className}`}
      style={light ? ({ "--card-light": light } as CSSProperties) : undefined}
    >
      {light ? <div aria-hidden="true" className="bench-card-rule" /> : null}
      {children}
    </div>
  );
}
