import imgPortrait from "../../assets/optimized/damian-portrait-1200.webp";
import svgPaths from "../../imports/svg-fa3xoaab76";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PortraitResolve } from "./hero/PortraitResolve";
import { SketchLayer } from "./hero/SketchLayer";
import { WarmthField } from "./hero/WarmthField";
import { getInitialHeroMode, useMarkPlayedOnComplete } from "./hero/useHeroSequence";

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

  // "Paper to Product" sequence state. Mode is decided once, before
  // first paint: sequence on first visit, static on replay/reduced motion.
  const [mode] = useState(getInitialHeroMode);
  const [run, setRun] = useState(false);
  const isSeq = mode === "sequence";

  // Portrait layers only exist md+ (the column is hidden on mobile) —
  // don't spend mobile bandwidth on wireframe/mid-fi.
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

  // Parallax for portrait
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, -18]);

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

          {/* Grid echo — carries structure through the paper→dark transition */}
          {isSeq && (
            <div className="hsGrid" aria-hidden="true">
              <div className="hsGrid__cols px-8 md:px-12 lg:px-16" />
            </div>
          )}

          {/* Paper sketch — Phases 1–3, lifts at 1500ms */}
          {isSeq && <SketchLayer />}

          {/* Content layer */}
          <div className="relative z-10 h-full flex flex-col px-8 md:px-12 lg:px-16">
            {/* Navigation */}
            <nav aria-label="Site navigation" className="w-full max-w-[1200px] mx-auto flex items-center justify-between pt-8 shrink-0">
              <Link
                to="/"
                aria-label="Damian A Præsthus — home"
                className="hs-in group inline-flex items-end gap-[3px] no-underline rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[#F98E1F]"
                style={{ "--hs-delay": "2300ms" } as CSSProperties}
              >
                <span className="font-['Lora',serif] font-medium text-[23px] leading-[0.9] tracking-[0.05em] text-white/92 transition-colors duration-300 group-hover:text-white">
                  DAP
                </span>
                <span
                  aria-hidden="true"
                  className="mb-[3px] h-[5px] w-[5px] rounded-full bg-[#F98E1F] transition-transform duration-300 ease-out group-hover:scale-125"
                />
              </Link>
              <span aria-hidden="true" />
            </nav>

            {/* Main content area — fills remaining space */}
            <div className="flex-1 w-full max-w-[1200px] mx-auto flex items-end">
              {/* Two-column layout */}
              <div className="w-full grid grid-cols-1 md:grid-cols-12 items-end h-full">
                {/* Left column — Portrait (bottom padding matches the right
                    column so the portrait base aligns with the CTA row) */}
                <div className="hidden md:flex md:col-span-5 items-end self-end h-full md:pb-12 lg:pb-[48px]">
                  <motion.div
                    className="heroPortrait w-full max-w-[400px] lg:max-w-[430px] flex items-end"
                    style={{ y: prefersReducedMotion ? 0 : portraitY }}
                  >
                    <PortraitResolve
                      mode={hasPortrait ? mode : "static"}
                      photoSrc={imgPortrait}
                      twoStep={twoStepPortrait}
                      roughen={roughenWireframe}
                      onWireSettled={() => setRun(true)}
                    />
                  </motion.div>
                </div>

                {/* Right column — Text content */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-center pb-10 md:pb-16 lg:pb-20 md:pl-8 lg:pl-10">
                  {/* Availability indicator */}
                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      })
                    }
                    className="hs-in inline-flex items-center gap-[6px] cursor-pointer group mt-10 md:mt-14 mb-1 md:mb-2.5 w-fit no-underline bg-transparent border-0 p-0"
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
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.14em] uppercase text-white/72 font-medium leading-[18px] transition-all duration-300 group-hover:text-white/75">
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

                  {/* Identity line */}
                  <p
                    className="hs-in hidden md:block font-['Plus_Jakarta_Sans',sans-serif] text-[14px] tracking-[0.08em] uppercase text-white/92 font-medium leading-[21px]"
                    style={{ "--hs-delay": "2450ms" } as CSSProperties}
                  >
                    DAMIAN A PR&AElig;STHUS{" "}
                    <span>
                      <span className="text-white/58 mx-1">/</span>{" "}
                      <span className="font-normal text-white/58">
                        UX DESIGNER + FRONT-END
                      </span>
                    </span>
                  </p>

                  {/* 22px spacer */}
                  <div className="h-2 md:h-[22px]" />

                  {/* Headline — real h1 in the DOM from t=0, rises once the
                      canvas has settled */}
                  <div className="max-w-[560px]">
                    {/* Orange accent dots */}
                    <div
                      className="hs-in hidden md:flex items-center gap-[6px] mb-4"
                      style={{ "--hs-delay": "2400ms" } as CSSProperties}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-[5px] h-[5px] rounded-full bg-[#F98E1F]/30"
                        />
                      ))}
                    </div>
                    <h1
                      className="hs-in font-['Lora',serif] font-normal text-white"
                      style={
                        {
                          lineHeight: "1.06",
                          letterSpacing: "-0.7px",
                          "--hs-delay": "2300ms",
                        } as CSSProperties
                      }
                    >
                      <span className="block text-[32px] md:text-[48px] lg:text-[60px]">
                        Designing systems
                      </span>
                      <span className="block text-[32px] md:text-[48px] lg:text-[60px]">
                        that <span className="text-[#F98E1F]">evolve</span>
                      </span>
                      <span className="block text-[32px] md:text-[48px] lg:text-[60px]">
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
                  <div className="h-8 md:h-10" />

                  {/* CTA buttons — in the DOM and clickable from t=0 */}
                  <div
                    className="hs-in flex flex-wrap items-center gap-3 sm:gap-4"
                    style={{ "--hs-delay": "2700ms" } as CSSProperties}
                  >
                    {/* Primary — VIEW WORK with expanding dark pill hover */}
                    <button className="relative h-12 rounded-full cursor-pointer group overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F98E1F]"
                      style={{ width: '167px' }}
                      onClick={handleViewWork}
                    >
                      {/* Orange base */}
                      <div className="absolute inset-0 bg-[#F98E1F] rounded-full" />

                      {/* Dark expanding pill — circle on right → full cover on hover */}
                      <div
                        className="absolute top-[2px] bottom-[2px] right-[2px] rounded-full bg-[rgba(11,15,20,0.92)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[44px] group-hover:w-[calc(100%-4px)]"
                      />

                      {/* Content layer */}
                      <div className="relative z-10 flex items-center h-full pl-5 pr-[2px]">
                        <span className="font-['Inter',sans-serif] font-normal text-[13px] text-[#1e1e1e] tracking-[0.5px] leading-normal whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-white">
                          View Work
                        </span>
                        <span className="ml-auto w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 opacity-80">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            className="block"
                          >
                            <path
                              clipRule="evenodd"
                              d={svgPaths.pf577b40}
                              fill="white"
                              fillRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </button>

                    {/* Secondary — About me */}
                    <Link
                      to="/about"
                      className="h-12 min-w-[118px] rounded-full px-6 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[15px] text-white/72 tracking-[0.2px] leading-[14px] hover:text-white/92 hover:border-white/35 transition-colors cursor-pointer bg-transparent inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F98E1F]"
                      style={{
                        border: "1.5px solid rgba(255,255,255,0.2)",
                      }}
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

      {/* Scroll indicator */}
      <div className="flex justify-center pt-5 pb-5">
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown
            className="w-6 h-6 text-white/20"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
