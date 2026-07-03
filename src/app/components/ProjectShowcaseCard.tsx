import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface ProjectData {
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
  /** Optional accent hue for the subtle aurora glow (CSS color) */
  glowColor?: string;
  /** Optional link to case study page */
  href?: string;
}

export function ProjectShowcaseCard({ project }: { project: ProjectData }) {
  const isPhone = project.mockupType === "phone";
  const isDualPhone = project.mockupType === "dualPhone";
  const isLaptop = project.mockupType === "laptop";
  const isWideDevice = isDualPhone || isLaptop;
  const glow = project.glowColor || "rgba(249,88,31,0.04)";

  /*
   * Unified shadow system — shared by all device types.
   * Soft studio-lit look: same blur, opacity, and vertical offset everywhere.
   */
  const deviceShadowFilter =
    "drop-shadow(0 14px 44px rgba(0,0,0,0.22)) drop-shadow(0 6px 18px rgba(0,0,0,0.10))";
  const deviceShadowBox =
    "0 14px 44px -10px rgba(0,0,0,0.22), 0 6px 18px -6px rgba(0,0,0,0.10)";

  /* For wide devices, soften glow alpha while keeping intensity balanced across card types */
  const softGlow = isWideDevice
    ? glow.replace(/[\d.]+\)$/, (m) => `${Math.max(parseFloat(m) * 0.75, 0.025)})`)
    : glow;

  const cardClassName =
    "group relative w-full flex flex-col rounded-[16px] overflow-hidden bg-[#1b2026] border border-[rgba(255,255,255,0.07)] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]/50 outline-none";

  const cardContent = (
    <>
      {/* Mockup zone */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: isDualPhone
            ? "16 / 9"
            : isPhone
            ? "4 / 3.5"
            : "16 / 9",
          maxHeight: "300px",
        }}
      >
        {/* Background surface */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#1d2229]"
        />

        {/* Subtle aurora radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isWideDevice
              ? `radial-gradient(ellipse 90% 38% at 50% 62%, ${softGlow}, transparent 80%)`
              : `radial-gradient(ellipse 60% 50% at 50% 60%, ${glow}, transparent 70%)`,
          }}
        />

        {/* Aurora glow on top — intensifies on hover */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isWideDevice
              ? "opacity-40 group-hover:opacity-65"
              : "opacity-60 group-hover:opacity-100"
          }`}
          style={{
            background: isWideDevice
              ? `radial-gradient(ellipse 85% 35% at 50% 60%, ${softGlow}, transparent 80%)`
              : `radial-gradient(ellipse 55% 45% at 50% 55%, ${glow}, transparent 70%)`,
          }}
        />

        {/* Device mockup image */}
        {isPhone ? (
          <div className="relative z-10 flex items-end justify-center h-full pt-8 md:pt-10 px-8">
            <div className="w-[55%] max-w-[200px] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
              <ImageWithFallback
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                className="w-full h-auto block rounded-[12px] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        ) : isDualPhone ? (
          <div className="project-card-dual-phone-shell relative z-10 flex items-end justify-center h-full px-8 sm:px-12 md:px-14 lg:px-16">
            <div className="flex items-end justify-center gap-2 md:gap-3 transition-transform duration-300 ease-out group-hover:scale-[1.015]">
              {/* Phone 1 — Onboarding (natural baseline, primary) */}
              <div className="w-[30%] sm:w-[34%] md:w-[37%] max-w-[165px]">
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
                className="project-card-dual-phone-secondary w-[30%] sm:w-[34%] md:w-[37%] max-w-[165px]"
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
          <div className="relative z-10 flex items-end justify-center h-full px-6 sm:px-10 md:px-12 pt-4 md:pt-5 pb-0">
            <div
              className="w-[84%] max-w-[400px] transition-transform duration-300 ease-out group-hover:scale-[1.015]"
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
                  background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.18) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex items-end justify-center h-full pt-6 md:pt-8 px-6 md:px-10">
            <div className="w-[92%] max-w-[520px] transition-transform duration-300 ease-out group-hover:scale-[1.015] overflow-hidden">
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
                  className="w-full h-auto block shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle separator line between mockup and text */}
      <div
        aria-hidden="true"
        className="w-full border-t border-[rgba(255,255,255,0.07)]"
      />

      {/* Info zone */}
      <div className="flex flex-col px-7 pt-5 pb-7 gap-0 flex-1">
        {/* Type eyebrow */}
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[1.4px] uppercase text-[rgba(255,255,255,0.58)] font-medium leading-[16px]">
          {project.type}
        </span>

        <div className="h-2.5" />

        {/* Title + arrow row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-['Lora',serif] font-normal text-[rgba(255,255,255,0.92)] text-[22px] md:text-[24px] leading-[30px] tracking-[-0.2px]">
            {project.title}
          </h3>
          <span
            className="shrink-0 mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[#F98E1F]/45 group-hover:bg-[#F98E1F]/10"
            aria-hidden="true"
          >
            <ArrowUpRight
              className="w-[18px] h-[18px] transition-all duration-300 text-white/48 group-hover:text-[#F98E1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </span>
        </div>

        {project.description ? (
          <>
            <div className="h-2" />
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[rgba(255,255,255,0.72)] text-[14px] md:text-[15px] leading-[23.25px] max-w-[420px]">
              {project.description}
            </p>
          </>
        ) : null}

        {/* Meta block — Role + Outcome */}
        <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-[78px_1fr] gap-x-5 gap-y-[10px] max-w-[460px]">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[1.4px] uppercase text-white/48 leading-[18px]">
            Role
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] md:text-[14px] text-white/72 leading-[20px]">
            {project.role}
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[1.4px] uppercase text-white/48 leading-[18px]">
            Outcome
          </span>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] md:text-[14px] text-white/92 leading-[20px]">
            {project.outcome}
          </span>
        </div>
      </div>
    </>
  );

  return project.href ? (
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
  );
}
