import imgPortrait from "../../assets/optimized/damian-portrait-1200.webp";
import svgPaths from "../../imports/svg-fa3xoaab76";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HeroSection() {
  const [availHovered, setAvailHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
    <section ref={heroRef} className="relative w-full overflow-hidden">
      {/* Hero container + line wrapper */}
      <div className="relative">
        {/* Hero container — fixed height, no border-radius */}
        <div className="hero w-full" style={{ height: "clamp(560px, 60vw, 715px)" }}>
          {/* Light bloom overlay — animates on load */}
          <div className="heroBloom" aria-hidden="true">
            <motion.div
              className="heroBloom__inner"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.04, 1], opacity: [1, 0.7, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>

          {/* Content layer */}
          <div className="relative z-10 h-full flex flex-col px-8 md:px-12 lg:px-16">
            {/* Navigation */}
            <nav aria-label="Site navigation" className="w-full max-w-[1200px] mx-auto flex items-center justify-between pt-8 shrink-0">
              <Link
                to="/"
                aria-label="Damian A Præsthus home"
                className="text-white/90 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] leading-[27px] tracking-[0.4px] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F98E1F]"
              >
                DAP
              </Link>
              <span aria-hidden="true" />
            </nav>

            {/* Main content area — fills remaining space */}
            <div className="flex-1 w-full max-w-[1200px] mx-auto flex items-end">
              {/* Two-column layout */}
              <div className="w-full grid grid-cols-1 md:grid-cols-12 items-end h-full">
                {/* Left column — Portrait */}
                <div className="hidden md:flex md:col-span-5 items-end self-end h-full">
                  <motion.div
                    className="heroPortrait heroEntrance--portrait w-full max-w-[360px] lg:max-w-[380px] flex items-end"
                    style={{ y: prefersReducedMotion ? 0 : portraitY }}
                  >
                    <div className="heroPortrait__frame">
                      <img
                        src={imgPortrait}
                        alt="Damian A Præsthus"
                        width={1200}
                        height={1600}
                        loading="eager"
                        decoding="async"
                        className="heroPortrait__image w-full h-auto block object-contain max-h-[400px] lg:max-h-[450px]"
                      />
                    </div>
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
                    className="heroEntrance--availability inline-flex items-center gap-[6px] cursor-pointer group mt-10 md:mt-14 mb-1 md:mb-2.5 w-fit no-underline bg-transparent border-0 p-0"
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
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] tracking-[0.14em] uppercase text-white/60 font-medium leading-[18px] transition-all duration-300 group-hover:text-white/75">
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
                      <ArrowRight className="w-3 h-3 text-white/50 shrink-0" strokeWidth={1.5} />
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] tracking-[0.06em] text-white/50 whitespace-nowrap">
                        Contact
                      </span>
                    </span>
                  </button>

                  {/* Identity line */}
                  <p className="heroEntrance--meta hidden md:block font-['Plus_Jakarta_Sans',sans-serif] text-[14px] tracking-[0.08em] uppercase text-white/80 font-medium leading-[21px]">
                    DAMIAN A PR&AElig;STHUS{" "}
                    <span>
                      <span className="text-white/45 mx-1">/</span>{" "}
                      <span className="font-normal text-white/55">
                        UX DESIGNER + FRONT-END
                      </span>
                    </span>
                  </p>

                  {/* 22px spacer */}
                  <div className="h-2 md:h-[22px]" />

                  {/* Headline */}
                  <div className="heroEntrance--headline max-w-[560px]">
                    {/* Orange accent dots */}
                    <div className="hidden md:flex items-center gap-[6px] mb-4">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-[5px] h-[5px] rounded-full bg-[#F98E1F]/30"
                          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { delay: 0.5 + i * 0.1, duration: 0.4 }
                          }
                        />
                      ))}
                    </div>
                    <h1
                      className="font-['Lora',serif] font-normal text-white"
                      style={{ lineHeight: "1.06", letterSpacing: "-0.7px" }}
                    >
                      {["Building systems", null, "with human", "behaviour."].map(
                        (line, i) => (
                          <motion.span
                            key={i}
                            className="block text-[32px] md:text-[48px] lg:text-[60px]"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: prefersReducedMotion ? 0 : 0.45 + i * 0.12,
                              duration: prefersReducedMotion ? 0 : 0.55,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          >
                            {line === null ? (
                              <>
                                that{" "}
                                <motion.span
                                  className="text-[#F98E1F] inline-block"
                                  initial={
                                    prefersReducedMotion
                                      ? false
                                      : {
                                          opacity: 0,
                                        }
                                  }
                                  animate={{
                                    opacity: 1,
                                  }}
                                  transition={{
                                    delay: prefersReducedMotion ? 0 : 1.0,
                                    duration: prefersReducedMotion ? 0 : 0.9,
                                    ease: "easeOut",
                                  }}
                                >
                                  evolve
                                </motion.span>
                              </>
                            ) : (
                              line
                            )}
                          </motion.span>
                        )
                      )}
                    </h1>
                  </div>

                  {/* Subline — concrete role clarity */}
                  <motion.p
                    className="mt-6 max-w-[480px] font-['Plus_Jakarta_Sans',sans-serif] text-[15px] md:text-[16px] leading-[1.6] text-white/60"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 1.15,
                      duration: prefersReducedMotion ? 0 : 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    UX/UI designer combining{" "}
                    <span className="text-white/80">research</span>,{" "}
                    <span className="text-white/80">interface design</span>, and{" "}
                    <span className="text-white/80">implementation</span>{" "}
                    to create clear products people actually use.
                  </motion.p>

                  {/* 40px spacer */}
                  <div className="h-8 md:h-10" />

                  {/* CTA buttons */}
                  <div className="heroEntrance--cta flex flex-wrap items-center gap-3 sm:gap-4">
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
                      className="h-12 min-w-[118px] rounded-full px-6 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[15px] text-white/60 tracking-[0.2px] leading-[14px] hover:text-white/80 hover:border-white/35 transition-colors cursor-pointer bg-transparent inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F98E1F]"
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
