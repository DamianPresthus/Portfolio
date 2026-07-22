import imgIDCard from "../../assets/id-card-front.webp";
import svgPaths from "../../imports/svg-fa3xoaab76";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { useReducedMotion } from "motion/react";
import { SketchLayer } from "./hero/SketchLayer";
import { WarmthField } from "./hero/WarmthField";
import {
  getInitialHeroMode,
  HERO_TIMING,
  useMarkPlayedOnComplete,
} from "./hero/useHeroSequence";

const loadIDCard = () => import("./IDCard");
const IDCard = lazy(loadIDCard);
const ID_CARD_REVEAL_LEAD_MS = 2000;
const ID_CARD_REVEAL_DELAY_MS = Math.max(
  0,
  HERO_TIMING.total - ID_CARD_REVEAL_LEAD_MS,
);

function supportsWebGL() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

interface HeroSectionProps {
  /**
   * Fallback switch: if portrait-midfi.png doesn't register cleanly against
   * the photo, set true to run the two-step wireframe → photo sequence.
   */
  twoStepPortrait?: boolean;
  /** Roughen the wireframe SVG slightly if the provided asset reads too clean. */
  roughenWireframe?: boolean;
}

export function HeroSection({
  twoStepPortrait = false,
  roughenWireframe = false,
}: HeroSectionProps = {}) {
  const [availHovered, setAvailHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webGLAvailable] = useState(supportsWebGL);

  // "Paper to Product" sequence state. Mode is decided once, before
  // first paint: sequence on first visit, static on replay/reduced motion.
  const [mode] = useState(getInitialHeroMode);
  const [run, setRun] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const isSeq = mode === "sequence";

  // Portrait layers only exist md+ (the column is hidden on mobile).
  const [hasPortrait] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches,
  );

  // Start the clock when the wireframe is ready; 600ms safety cap so a
  // slow asset can never hold the page hostage. Mobile starts immediately.
  useEffect(() => {
    if (!isSeq || run) return;
    const cap = window.setTimeout(() => setRun(true), hasPortrait ? 600 : 30);
    return () => window.clearTimeout(cap);
  }, [isSeq, run, hasPortrait]);

  useMarkPlayedOnComplete(mode, run);

  // Fetch the 3D chunk after the initial paint, then mount it shortly before
  // the paper lift so the card can begin dropping during the choreography.
  useEffect(() => {
    if (prefersReducedMotion || !webGLAvailable) return;
    const preload = window.setTimeout(() => void loadIDCard(), 0);
    return () => window.clearTimeout(preload);
  }, [prefersReducedMotion, webGLAvailable]);

  useEffect(() => {
    if (!isSeq) {
      setShowCard(true);
      return;
    }

    if (!run) return;
    const reveal = window.setTimeout(
      () => setShowCard(true),
      ID_CARD_REVEAL_DELAY_MS,
    );
    return () => window.clearTimeout(reveal);
  }, [isSeq, run]);

  // Handle smooth scroll to projects section
  const handleViewWork = () => {
    const projectsSection = document.getElementById('selected-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      className={`relative w-full overflow-hidden hs ${isSeq ? "hs--seq" : "hs--static"}${run ? " hs-run" : ""}`}
    >
      {/* Hero container + line wrapper */}
      <div className="relative">
        {/* Hero container — fixed height, no border-radius */}
        <div className="hero w-full" style={{ height: "clamp(560px, 60vw, 715px)" }}>
          {/* Light bloom overlay — static ambience; the warmth field owns motion */}
          <div className="heroBloom" aria-hidden="true">
            <div className="heroBloom__inner" />
          </div>

          {/* Ambient warmth loop — lazy-mounted after LCP */}
          <WarmthField heroRef={heroRef} />

          {/* Soft dot matrix texture — m51.no inspired */}
          <div className="hero-dot-grid" aria-hidden="true" />

          {/* Grid echo — carries structure through the paper→dark transition */}
          {isSeq && (
            <div className="hsGrid" aria-hidden="true">
              <div className="hsGrid__cols px-8 md:px-12 lg:px-16" />
            </div>
          )}

          {/* Paper sketch — Phases 1–3, lifts at 1500ms */}
          {isSeq && <SketchLayer />}

          {/* Mobile uses the same live lanyard simulation as desktop, but the
              canvas is fully touch-transparent. Reduced-motion and no-WebGL
              devices keep the lightweight static fallback. */}
          {!hasPortrait && showCard && (prefersReducedMotion || !webGLAvailable ? (
            <div className="heroMobileCard heroMobileCard--static" aria-hidden="true">
              <img src={imgIDCard} alt="" />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="heroMobileCard heroMobileCard--static" aria-hidden="true">
                  <img src={imgIDCard} alt="" />
                </div>
              }
            >
              {/* IDCard's root div sets an inline width/height: 100% style,
                  which would beat a CSS class trying to resize it directly
                  (inline styles always win over stylesheet rules). Sizing
                  the box on this wrapper instead lets IDCard fill 100% of
                  it as intended. */}
              <div className="heroMobilePhysics">
                <IDCard
                  frontImage={imgIDCard}
                  gravity={[0, -10.5, 0]}
                  interactive={false}
                  anchorXFactor={0.06}
                  entryIntensity={0.35}
                />
              </div>
            </Suspense>
          ))}

          {/* Hero-wide interaction plane. It sits above the ambient field but
              below every piece of navigation and copy. The hero itself remains
              the clipping boundary, so the card can roam the full composition
              without escaping into the next section. */}
          {hasPortrait && showCard && (
            <div
              className="absolute inset-0 z-[5] hidden md:block"
              data-id-card-layer
            >
              {prefersReducedMotion || !webGLAvailable ? (
                <img
                  src={imgIDCard}
                  alt="Damian Aaby Præsthus ID card"
                  className="absolute left-[28%] top-1/2 h-[48%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              ) : (
                <Suspense
                  fallback={
                    <img
                      src={imgIDCard}
                      alt=""
                      aria-hidden="true"
                      className="absolute left-[28%] top-1/2 h-[48%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
                    />
                  }
                >
                  <IDCard frontImage={imgIDCard} gravity={[0, -10.5, 0]} />
                </Suspense>
              )}
            </div>
          )}

          {/* Content layer */}
          <div className="pointer-events-none relative z-10 h-full flex flex-col px-8 md:px-12 lg:px-16">
            {/* Navigation */}
            <nav aria-label="Site navigation" className="pointer-events-auto relative z-50 w-full max-w-[1200px] mx-auto flex items-center justify-between pt-8 shrink-0">
              <Link
                to="/"
                aria-label="Damian Aaby Præsthus, home"
                className="hs-in group inline-flex items-end gap-[3px] no-underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-accent"
                style={{ "--hs-delay": "2300ms" } as CSSProperties}
              >
                <span className="font-['Lora',serif] font-semibold text-[23px] leading-[0.9] tracking-[0.02em] text-white/92 transition-colors duration-300 group-hover:text-white">
                  DAP
                </span>
                <span
                  aria-hidden="true"
                  className="mb-[3px] h-[5px] w-[5px] rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-125"
                />
              </Link>

              {/* Top nav — Work / About / Contact */}
              <div
                className="hs-in flex items-center gap-5 sm:gap-7"
                style={{ "--hs-delay": "2300ms" } as CSSProperties}
              >
                <button
                  type="button"
                  onClick={handleViewWork}
                  className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.08em] uppercase font-medium text-white/58 hover:text-white/92 transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Work
                </button>
                <Link
                  to="/about"
                  className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.08em] uppercase font-medium text-white/58 hover:text-white/92 transition-colors duration-200 no-underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  About
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                  className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.08em] uppercase font-medium text-white/58 hover:text-white/92 transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Contact
                </button>
              </div>
            </nav>

            {/* Main content area — fills remaining space */}
            <div className="flex-1 w-full max-w-[1200px] mx-auto flex items-end">
              {/* Two-column layout */}
              <div className="w-full grid grid-cols-1 md:grid-cols-12 items-end h-full">
                {/* Empty grid track preserves the existing headline measure
                    while the card is free to move across the full hero. */}
                <div className="hidden md:block md:col-span-5" aria-hidden="true" />

                {/* Right column — Text content */}
                <div className="heroCopy col-span-1 md:col-span-7 flex flex-col justify-center pb-10 md:pb-16 lg:pb-20 md:pl-8 lg:pl-10 md:-translate-y-7 lg:-translate-y-14">
                  {/* Availability indicator */}
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    className="heroAvailability hs-in pointer-events-auto inline-flex items-center gap-[6px] cursor-pointer group mt-10 md:mt-14 mb-7 md:mb-8 w-fit no-underline bg-transparent border-0 p-0"
                    style={{ "--hs-delay": "2400ms" } as CSSProperties}
                    aria-label="Available for UX roles — scroll to contact footer"
                    onMouseEnter={() => setAvailHovered(true)}
                    onMouseLeave={() => setAvailHovered(false)}
                  >
                    {/* Green dot */}
                    <span
                      className="relative w-[6px] h-[6px] rounded-full bg-[#22C55E] shrink-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-[dotPulse_2.8s_ease-in-out_infinite]" />
                    </span>
                    {/* Text */}
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.08em] uppercase text-white/72 font-medium leading-[18px] transition-all duration-300 group-hover:text-white/75">
                      Available for UX Roles
                    </span>
                    {/* Hover arrow + "Contact" hint */}
                    <span
                      className="inline-flex items-center gap-1 overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxWidth: availHovered ? '80px' : '0px',
                        opacity: availHovered ? 0.6 : 0,
                      }}
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3 h-3 text-white/58 shrink-0" strokeWidth={1.5} />
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[0.06em] text-white/58 whitespace-nowrap">
                        Contact
                      </span>
                    </span>
                  </button>

                  {/* Headline — real h1 in the DOM from t=0, rises once the
                      canvas has settled */}
                  <div className="max-w-[600px]">
                    <h1
                      className="hs-in font-['EB_Garamond',serif] font-bold text-white leading-[1.08] tracking-[-0.015em]"
                      style={{ "--hs-delay": "2300ms" } as CSSProperties}
                    >
                      <span className="block whitespace-nowrap text-[32px] md:text-[42px] lg:text-[52px]">
                        Designing systems
                      </span>
                      <span className="block text-[32px] md:text-[42px] lg:text-[52px]">
                        that <span className="text-accent">evolve</span>
                      </span>
                      <span className="block text-[32px] md:text-[42px] lg:text-[52px]">
                        through real use.
                      </span>
                    </h1>
                  </div>

                  {/* Subline — concrete role clarity */}
                  <p
                    className="hs-in mt-6 max-w-[480px] font-['Plus_Jakarta_Sans',sans-serif] text-[15px] md:text-[16px] leading-[1.6] text-white/72"
                    style={{ "--hs-delay": "2550ms" } as CSSProperties}
                  >
                    UX/UI designer combining{" "}
                    <span className="text-white/92">research</span>,{" "}
                    <span className="text-white/92">interface design</span>, and{" "}
                    <span className="text-white/92">React implementation</span>{" "}
                    to turn early ideas into usable product experiences.
                  </p>

                  {/* 40px spacer */}
                  <div className="heroCtaSpacer h-8 md:h-10" />

                  {/* CTA buttons — in the DOM and clickable from t=0 */}
                  <div
                    className="hs-in flex flex-wrap items-center gap-3 sm:gap-4"
                    style={{ "--hs-delay": "2700ms" } as CSSProperties}
                  >
                    {/* Primary — expanding dark wipe preserves the orange outline */}
                    <button
                      type="button"
                      className="hero-cta hero-cta--primary pointer-events-auto"
                      onClick={handleViewWork}
                    >
                      <span className="hero-cta__label">View Work</span>
                      <span className="hero-cta__arrow" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path
                            clipRule="evenodd"
                            d={svgPaths.pf577b40}
                            fill="white"
                            fillRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Secondary — About me */}
                    <Link
                      to="/about"
                      className="hero-cta hero-cta--secondary pointer-events-auto"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
