import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useKeyLight } from "./useKeyLight";

export interface ProjectData {
  /** Stable slug — also the /work/:slug route segment */
  slug?: string;
  /** Two-digit working-file index, e.g. "01" */
  index?: string;
  title: string;
  /** Short project type, e.g. "Mental health app prototype" */
  type: string;
  /** Comma-separated role(s), e.g. "UX research, UI design" */
  role: string;
  /** One concrete proof point / measured outcome */
  outcome: string;
  description?: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  mockupType: "phone" | "browser" | "dualPhone" | "laptop";
  /** Optional second image for dualPhone mockup */
  secondImage?: string;
  secondImageAlt?: string;
  secondImageWidth?: number;
  secondImageHeight?: number;
  /** Paper-context wash for pagination thumbnails (CSS color) */
  tint?: string;
  /** Bench light — space-separated RGB channel-triplet var (theme.css) */
  light?: string;
  /** Optional link to case study page */
  href?: string;
}

/**
 * Bench card — a lit artifact on the dark studio bench. The mockup
 * well is a recess; the project's hue arrives only as light (ambient
 * bloom, key light, 1px rest rule — see styles/index.css). Chrome,
 * text, and CTAs stay on the shared ink/accent tokens.
 */
export function ProjectShowcaseCard({ project }: { project: ProjectData }) {
  const isPhone = project.mockupType === "phone";
  const isDualPhone = project.mockupType === "dualPhone";
  const isLaptop = project.mockupType === "laptop";
  const light = project.light || "240 238 233";
  const { lightRef, wellProps } = useKeyLight();

  /*
   * Unified shadow system — shared by all device types.
   * Black-based: the old ink-toned paper values vanish on the dark well.
   */
  const deviceShadowFilter =
    "drop-shadow(0 18px 40px rgba(0,0,0,0.5)) drop-shadow(0 6px 16px rgba(0,0,0,0.35))";
  const deviceShadowBox =
    "0 18px 40px -12px rgba(0,0,0,0.55), 0 6px 16px -8px rgba(0,0,0,0.40)";

  const cardClassName =
    "group relative z-10 w-full flex flex-col rounded-[16px] overflow-hidden bg-ink-raised border border-white/[0.07] cursor-pointer transition-[transform,background-color] duration-300 ease-out motion-safe:hover:-translate-y-1 hover:bg-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50 outline-none";

  const cardContent = (
    <>
      {/* Rest rule — the card's only color at rest (light residue) */}
      <div aria-hidden="true" className="bench-card-rule" />

      {/* Mockup well — a recess in the bench; the artifact is the
          bright object. Pointer events feed the key light. */}
      <div
        className="relative w-full overflow-hidden bg-ink-well"
        style={{
          aspectRatio: isDualPhone
            ? "16 / 10"
            : isPhone
            ? "4 / 3.5"
            : "16 / 9",
          maxHeight: isDualPhone ? "360px" : "300px",
        }}
        {...wellProps}
      >
        {/* Key light — chases the pointer; static centred fallback */}
        <div aria-hidden="true" ref={lightRef} className="card-keylight" />

        {/* Device mockup image */}
        {isPhone ? (
          <div className="relative z-10 flex items-end justify-center h-full pt-8 md:pt-10 px-8">
            <div className="w-[58%] max-w-[220px] transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]">
              <ImageWithFallback
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                className="w-full h-auto block rounded-[12px]"
                style={{ boxShadow: deviceShadowBox }}
              />
            </div>
          </div>
        ) : isDualPhone ? (
          <div className="project-card-dual-phone-shell relative z-10 flex items-center justify-center h-full px-6 sm:px-10 md:px-12 lg:px-14 py-8">
            <div className="flex items-center justify-center gap-2 md:gap-3 transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.015]">
              {/* Phone 1 — Onboarding (natural baseline, primary) */}
              <div className="w-[31%] sm:w-[35%] md:w-[37%] max-w-[176px]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  className="w-full h-auto block rounded-[10px] sm:rounded-[12px]"
                  style={{
                    boxShadow: deviceShadowBox,
                  }}
                />
              </div>
              {/* Phone 2 — Homepage (raised + subtly scaled for depth) */}
              <div
                className="project-card-dual-phone-secondary w-[32%] sm:w-[36%] md:w-[39%] max-w-[190px]"
              >
                <ImageWithFallback
                  src={project.secondImage || project.image}
                  alt={project.secondImageAlt || project.imageAlt}
                  width={project.secondImageWidth || project.imageWidth}
                  height={project.secondImageHeight || project.imageHeight}
                  className="w-full h-auto block rounded-[10px] sm:rounded-[12px]"
                  style={{
                    boxShadow: deviceShadowBox,
                  }}
                />
              </div>
            </div>
          </div>
        ) : isLaptop ? (
          <div className="relative z-10 flex items-end justify-center h-full px-5 sm:px-8 md:px-10 pt-4 md:pt-5 pb-0">
            <div
              className="w-[88%] max-w-[460px] transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.015]"
              style={{
                filter: deviceShadowFilter,
              }}
            >
              {/* ── MacBook display lid ── */}
              <div
                className="relative overflow-hidden"
                style={{
                  /* Space gray aluminum gradient */
                  background: "linear-gradient(180deg, #303338 0%, #28292e 50%, #232529 100%)",
                  borderRadius: "8px 8px 0 0",
                  padding: "6px 6px 5px 6px",
                }}
              >
                {/* Top edge studio-light highlight */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-[8%] right-[8%] z-30"
                  style={{
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent)",
                  }}
                />

                {/* Notch with camera */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                  style={{
                    width: "44px",
                    height: "6px",
                    background: "#232529",
                    borderRadius: "0 0 5px 5px",
                  }}
                >
                  {/* Camera dot */}
                  <div
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #1a1c1f 40%, #111214 100%)",
                      boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
                    }}
                  />
                </div>

                {/* Screen bezel inset (simulates display glass edge) */}
                <div
                  className="relative overflow-hidden bg-[#0a0a0b]"
                  style={{
                    borderRadius: "3px",
                    boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Faint screen reflection — top edge only */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 pointer-events-none"
                    style={{
                      height: "30%",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)",
                    }}
                  />
                  <ImageWithFallback
                    src={project.image}
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    className="w-full h-auto block relative z-0"
                  />
                </div>
              </div>

              {/* ── Hinge / lip ── */}
              <div
                className="relative mx-auto"
                style={{
                  width: "100%",
                  height: "3px",
                  background: "linear-gradient(180deg, #2a2c30 0%, #222427 100%)",
                  borderRadius: "0 0 1px 1px",
                }}
              />

              {/* ── MacBook base (keyboard deck, front-facing wedge) ── */}
              <div
                className="relative mx-auto"
                style={{
                  width: "104%",
                  marginLeft: "-2%",
                  height: "8px",
                  background: "linear-gradient(180deg, #2d2f34 0%, #27292d 60%, #222427 100%)",
                  borderRadius: "0 0 5px 5px",
                }}
              >
                {/* Front edge highlight (studio light catch) */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-[6%] right-[6%]"
                  style={{
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.05) 70%, transparent)",
                    borderRadius: "0 0 5px 5px",
                  }}
                />
                {/* Trackpad indent hint */}
                <div
                  aria-hidden="true"
                  className="absolute top-[1px] left-1/2 -translate-x-1/2"
                  style={{
                    width: "28%",
                    height: "1px",
                    background: "rgba(255,255,255,0.025)",
                    borderRadius: "1px",
                  }}
                />
              </div>

              {/* ── Contact shadow (soft ellipse beneath device) ── */}
              <div
                aria-hidden="true"
                className="mx-auto"
                style={{
                  width: "80%",
                  height: "6px",
                  marginTop: "2px",
                  background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.45) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex items-end justify-center h-full pt-6 md:pt-8 px-6 md:px-10">
            <div className="w-[92%] max-w-[520px] transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.015] overflow-hidden">
              {/* Browser chrome hint */}
              <div className="bg-[#1a1e24] rounded-t-[8px] px-3 py-2 flex items-center gap-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
                <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
                <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
                <span className="ml-2 flex-1 h-[16px] rounded-[4px] bg-white/[0.04]" />
              </div>
              <div className="relative overflow-hidden rounded-b-[4px]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  className="w-full h-auto block"
                  style={{ boxShadow: deviceShadowBox }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hairline between mockup and caption */}
      <div aria-hidden="true" className="w-full border-t border-white/[0.07]" />

      {/* Caption zone — calibration markings on the bench card */}
      <div className="flex flex-col px-7 pt-5 pb-7 gap-0 flex-1">
        {/* Index + type eyebrow — mono, reads as instrument labelling */}
        <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.08em] uppercase text-white/48 font-medium leading-[16px] tabular-nums">
          {project.index ? `${project.index} · ` : ""}
          {project.type}
        </span>

        <div className="h-2.5" />

        {/* Title + arrow row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-['EB_Garamond',serif] font-semibold text-white/92 text-[22px] md:text-[24px] leading-[30px] tracking-[-0.01em]">
            {project.title}
          </h3>
          <span
            className="bench-card-chip shrink-0 mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/12 bg-white/[0.04] transition-colors duration-300 group-hover:bg-white/[0.06]"
            aria-hidden="true"
          >
            <ArrowUpRight
              className="w-[18px] h-[18px] transition-all duration-300 text-white/48 group-hover:text-white/92 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </span>
        </div>

        {project.description ? (
          <>
            <div className="h-2" />
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-white/72 text-[14px] md:text-[15px] leading-[23.25px] max-w-[420px]">
              {project.description}
            </p>
          </>
        ) : null}

        {/* Meta block — Outcome leads, Role follows. 96px label column
            is fixed in every card so values align site-wide. */}
        <div className="mt-5 pt-5 border-t border-white/[0.07] grid grid-cols-[96px_1fr] gap-x-5 gap-y-[10px] max-w-[460px]">
          <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.08em] uppercase text-white/48 leading-[18px] tabular-nums">
            Outcome
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] md:text-[14px] text-white/92 leading-[20px] tabular-nums">
            {project.outcome}
          </span>
          <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.08em] uppercase text-white/48 leading-[18px] tabular-nums">
            Role
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] md:text-[14px] text-white/72 leading-[20px]">
            {project.role}
          </span>
        </div>
      </div>
    </>
  );

  /* The shell hosts the lighting pseudo-elements (ambient bloom +
     pre-rendered shadow) so they can extend past the card's
     overflow clip. --card-light feeds every light in the model. */
  return (
    <div
      className="card-shell"
      style={{ "--card-light": light } as CSSProperties}
    >
      {project.href ? (
        <Link
          to={project.href}
          aria-label={`View ${project.title} case study`}
          className={cardClassName}
        >
          {cardContent}
        </Link>
      ) : (
        <a
          href="#"
          aria-label={`View ${project.title} project`}
          className={cardClassName}
        >
          {cardContent}
        </a>
      )}
    </div>
  );
}
