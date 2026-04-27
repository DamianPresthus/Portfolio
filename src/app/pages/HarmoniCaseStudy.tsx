import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

// Hero — colored home screen (Dagens øvelse)
import imgHeroScreen from "figma:asset/8bcf6d47ead6e4a649fc8a16abc1da242b61040f.png";
// Project card screens (dual phone hero)
import imgHarmoniOnboarding from "figma:asset/09863dc3638a4cd55c70eb4dbf183102e48dfff3.png";
import imgHarmoniHome from "figma:asset/0017b3730e543b50eba675afb9ad48715cc403b2.png";
// IA diagram
import imgIA from "figma:asset/36e7b634f62b6307b2649df71f4bbefad33e540c.png";
// Hi-fi screens
import imgPodcast from "figma:asset/0a9cce5ad50bc3019c72c76b1dcdf40881385c0f.png";
import imgProfile from "figma:asset/c02c5cb093af8e033599dcd2e7daabb0bf93121d.png";
import imgMood from "figma:asset/b90a02378d8c4bf4295101f31ec3c8a0706daef4.png";
// Wireframes (used in before/after)
import imgWireframes from "figma:asset/ca1766a3e9a634b2e20b5692fa8ba865652106be.png";
// All four screens overview
import imgProfilScreen from "figma:asset/65a0c25c35deea4988b0c3ac985e3897da830f59.png";
// Design system
import imgColors from "figma:asset/32c9691357f95709704a14b42cc7f9796a4b5293.png";
import imgTypography from "figma:asset/45b12c0c244867215ba66a150274b72142d34951.png";
// Figma-imported Profil screen component
import ProfilScreen from "../../imports/Group82";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
};

const fadeUpDelay = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

function SectionDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="h-px"
      style={{
        background: light
          ? "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 95%)"
          : "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 95%)",
      }}
    />
  );
}

function DeviceMockup({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter:
          "drop-shadow(0 24px 64px rgba(0,0,0,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.18))",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "390 / 844",
          background:
            "linear-gradient(135deg, #2a2d32 0%, #1f2227 50%, #1a1d22 100%)",
          borderRadius: "52px",
          padding: "3px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "52px",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
        <div
          className="relative w-full h-full bg-black overflow-hidden"
          style={{ borderRadius: "49px" }}
        >
          <div
            aria-hidden="true"
            className="absolute top-[12px] left-1/2 -translate-x-1/2 z-30"
            style={{
              width: "120px",
              height: "35px",
              background: "#000",
              borderRadius: "20px",
            }}
          />
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

/** Renders the Figma Profil component scaled to fill its parent width */
function ScaledProfilScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateScale = () => {
      setScale(el.clientWidth / 393);
    };
    updateScale();
    const observer = new ResizeObserver(() => updateScale());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg bg-[#fbf4f1]"
      style={{ aspectRatio: "393 / 852" }}
      role="img"
      aria-label="Final profile screen — mood check-in, health metrics, and activity tracking"
    >
      <div
        className="absolute top-0 left-0 w-[393px] h-[852px]"
        style={{
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <ProfilScreen />
      </div>
    </div>
  );
}

export default function HarmoniCaseStudy() {
  return (
    <div className="min-h-screen font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* Navigation */}
      <nav aria-label="Case study navigation" className="fixed top-0 left-0 right-0 z-50 bg-[#161A1F]/80 backdrop-blur-md border-b border-white/[0.06]">
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

      {/* ═══════════════════════════════════════
          1. HERO — Dark
          ═══════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#161A1F] via-[#1a1f26] to-[#161A1F]"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(120,170,240,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-20 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="flex flex-col"
            >
              <h1 className="font-['Lora',serif] font-normal text-white text-[56px] md:text-[68px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-7">
                Harmoni
              </h1>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/70 text-[20px] md:text-[22px] leading-[1.4] tracking-[-0.01em] mb-10">
                Mental health app focused on daily habit activation
              </h2>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-white/65 text-[16px] md:text-[17px] leading-[1.65] max-w-[540px] mb-14">
                A mental health concept app designed to help users start one
                meaningful daily action with less friction. Usability testing
                revealed hesitation during onboarding and unclear next steps,
                leading to a simplified structure, clearer hierarchy, and
                stronger first-session activation.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="mt-10 max-w-[460px] flex flex-col gap-[15px]"
              >
                {[
                  { label: "Role", value: "Product Designer" },
                  { label: "Focus", value: "UX Research · Interaction Design · Usability Testing" },
                  { label: "Year", value: "2024" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-5">
                    <span className="w-[80px] shrink-0 text-[12px] uppercase tracking-[2px] text-white/40 font-medium">
                      {row.label}
                    </span>
                    <span className="text-[15px] md:text-[16px] text-white/65 font-medium tracking-[-0.01em]">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-baseline gap-5">
                  <span className="w-[80px] shrink-0 text-[12px] uppercase tracking-[2px] text-white/40 font-medium">
                    Outcome
                  </span>
                  <span className="text-[15px] md:text-[16px] text-white/75 font-medium tracking-[-0.01em]">
                    Improved <span className="text-white/85">first-session activation</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Dual phone mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-[460px]">
                <div
                  className="flex items-end justify-center gap-3 md:gap-4"
                  style={{
                    filter:
                      "drop-shadow(0 14px 44px rgba(0,0,0,0.22)) drop-shadow(0 6px 18px rgba(0,0,0,0.10))",
                  }}
                >
                  {/* Phone 1 — Onboarding */}
                  <div className="w-[46%]">
                    <img
                      src={imgHarmoniOnboarding}
                      alt="Harmoni app onboarding screen showing a friendly wave illustration"
                      className="w-full h-auto block rounded-[12px] sm:rounded-[14px]"
                      style={{
                        boxShadow:
                          "0 14px 44px -10px rgba(0,0,0,0.22), 0 6px 18px -6px rgba(0,0,0,0.10)",
                      }}
                    />
                  </div>
                  {/* Phone 2 — Home (raised for depth) */}
                  <div
                    className="w-[46%]"
                    style={{
                      transform: "translateY(-24px) scale(0.975)",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <img
                      src={imgHarmoniHome}
                      alt="Harmoni app homepage showing daily exercise overview"
                      className="w-full h-auto block rounded-[12px] sm:rounded-[14px]"
                      style={{
                        boxShadow:
                          "0 14px 44px -10px rgba(0,0,0,0.22), 0 6px 18px -6px rgba(0,0,0,0.10)",
                      }}
                    />
                  </div>
                </div>

                {/* Ambient glow behind devices */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                  style={{
                    width: "140%",
                    height: "130%",
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,170,240,0.06) 0%, rgba(100,150,220,0.03) 40%, transparent 75%)",
                    filter: "blur(50px)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(200,210,220,0.02) 0%, transparent 100%)",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════
          2. PROBLEM & STRUCTURAL CHALLENGE — Dark
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/50 font-medium">
              Problem &amp; Structure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            {/* Left — Problem statement */}
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                className="font-['Lora',serif] font-normal text-white/90 text-[32px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] mb-8"
              >
                The challenge was structural,{" "}
                <span className="text-white/55">not visual.</span>
              </motion.h2>

              <motion.p
                {...fadeUpDelay(0.08)}
                className="text-white/50 text-[15px] md:text-[16px] leading-[1.75] max-w-[460px]"
              >
                Retention in mental health products often depends on whether
                users take action in the first session. If the first interaction
                feels unclear, routine rarely forms. In early testing, Harmoni
                failed in the first minute.
              </motion.p>

              <motion.p
                {...fadeUpDelay(0.11)}
                className="text-white/55 text-[15px] md:text-[16px] leading-[1.75] max-w-[460px] mt-5"
              >
                Users opened the app and did not know where to begin. The home
                screen displayed multiple tools without indicating priority.
                There was no defined entry point. Participants paused, explored
                without direction, and in several cases abandoned the task
                before starting an exercise.
              </motion.p>

              <motion.p
                {...fadeUpDelay(0.13)}
                className="text-white/50 text-[14px] md:text-[15px] leading-[1.65] max-w-[460px] mt-5 italic"
              >
                Five moderated usability tests using ten task scenarios
                confirmed the pattern.
              </motion.p>

              {/* Friction points */}
              <motion.div
                {...fadeUpDelay(0.16)}
                className="mt-10 space-y-4"
              >
                {[
                  "No primary action defined on the home screen",
                  "Users attempted to scroll on static layouts",
                  "Onboarding did not communicate purpose clearly",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
                    <p className="text-white/40 text-[14px] leading-[1.6]">
                      {point}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                {...fadeUpDelay(0.18)}
                className="mt-14 md:mt-16 text-white/60 text-[15px] md:text-[16px] leading-[1.75] max-w-[580px]"
              >
                The issue was not missing functionality. It was hierarchy.
              </motion.p>
            </div>

            {/* Right — IA diagram */}
            <motion.div
              {...fadeUpDelay(0.1)}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[600px] bg-white rounded-lg p-6 md:p-8">
                <img
                  src={imgIA}
                  alt="Information architecture diagram — Welcome, Sign Up, Home, Profile navigation structure"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. CORE PRODUCT EXPERIENCE — Light
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/30" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/55 font-medium">
              Core Experience
            </p>
          </motion.div>

          <motion.h2
            {...fadeUpDelay(0.04)}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] max-w-[640px] mb-6"
          >
            Designing a structured, supportive experience.
          </motion.h2>

          <motion.p
            {...fadeUpDelay(0.08)}
            className="text-[#161A1F]/65 text-[15px] md:text-[16px] leading-[1.7] max-w-[520px] mb-16 md:mb-20"
          >
            I redefined the product around one measurable goal: first session
            task initiation. Each screen was assigned one primary purpose.
            Home focused on starting the daily exercise. Podcast supported
            content exploration. Profile tracked consistency and progress.
            Mood enabled reflection. Secondary modules were moved below the
            first viewport. The daily exercise became the only dominant action
            on the home screen. Cognitive load was reduced by limiting what
            appeared at each level and clarifying progression.
          </motion.p>

          {/* 4-screen grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                src: imgHeroScreen,
                alt: "Home screen — Today's Exercise with start button and popular activities",
                label: "Home",
              },
              {
                src: imgPodcast,
                alt: "Podcast discovery screen with episode listings",
                label: "Podcast",
              },
              {
                src: imgProfilScreen,
                alt: "User profile showing active days and mood statistics",
                label: "Profile",
              },
              {
                src: imgMood,
                alt: "Mood check-in screen with emotional summary",
                label: "Mood",
              },
            ].map((screen, i) => (
              <motion.div
                key={screen.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * i,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-full rounded-2xl overflow-hidden bg-white"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-4 text-[12px] md:text-[13px] tracking-[1.6px] uppercase text-[#161A1F]/55 font-medium">
                  {screen.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. BEFORE / AFTER — Dark
          From early wireframes to resolved interface
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(140,170,210,0.025) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/50 font-medium">
              Process
            </p>
          </motion.div>

          <motion.h2
            {...fadeUp}
            className="font-['Lora',serif] font-normal text-white/90 text-[32px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] max-w-[680px] mb-6"
          >
            From early structure{" "}
            <span className="text-white/55">to resolved interface.</span>
          </motion.h2>

          <motion.p
            {...fadeUpDelay(0.06)}
            className="text-white/55 text-[15px] md:text-[16px] leading-[1.7] max-w-[540px] mb-16 md:mb-24"
          >
            Wireframes defined layout decisions before visual styling began.
            Structure was tested before polish.
          </motion.p>

          {/* Before / After comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Before — Wireframes */}
            <motion.div
              {...fadeUpDelay(0.08)}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-white/15" />
                <p className="text-[11px] md:text-[12px] uppercase tracking-[2.4px] text-white/30 font-medium">
                  Early exploration
                </p>
              </div>
              <div
                className="w-full rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.06] p-4 md:p-6"
              >
                <img
                  src={imgWireframes}
                  alt="Early wireframe explorations — home, emergency, activities, and profile screens in grayscale"
                  className="w-full h-auto rounded opacity-85"
                />
              </div>
              <p className="text-white/30 text-[13px] md:text-[14px] leading-[1.65] mt-5 max-w-[480px]">
                The first version exposed multiple features at once. The layout
                assumed users would explore freely. Testing showed hesitation
                instead. I defined first session task initiation as the primary
                success metric and deprioritized feature exposure until that
                metric improved.
              </p>
            </motion.div>

            {/* After — Final UI */}
            <motion.div
              {...fadeUpDelay(0.14)}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <p className="text-[11px] md:text-[12px] uppercase tracking-[2.4px] text-white/50 font-medium">
                  Resolved interface
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div
                  className="rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                >
                  <img
                    src={imgHeroScreen}
                    alt="Final home screen — single daily action, clear primary CTA"
                    className="w-full h-auto"
                  />
                </div>
                <div
                  className="rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                >
                  <img
                    src={imgProfilScreen}
                    alt="Harmoni profile screen — mood check-in, health metrics, and activity tracking"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              <p className="text-white/55 text-[13px] md:text-[14px] leading-[1.65] mt-5 max-w-[480px]">
                The home screen was reduced to one clear action. Other features
                remained accessible but were visually secondary. I chose
                clarity over immediate discoverability. Some content became less
                prominent, but hesitation disappeared in testing.
              </p>
            </motion.div>
          </div>

          {/* Iteration insight */}
          <motion.div
            {...fadeUpDelay(0.1)}
            className="mt-16 md:mt-20 pt-10 border-t border-white/[0.05] max-w-[580px]"
          >
            <p className="text-white/35 text-[14px] md:text-[15px] leading-[1.7] italic border-l-2 border-[#F98E1F]/25 pl-6">
              What changed most was not visual polish. It was removal of
              competing actions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5A. COLOR SYSTEM — Light
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/30" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/35 font-medium">
              Design System &middot; Color
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] mb-8"
              >
                Semantic color system.
              </motion.h2>

              <motion.div
                {...fadeUpDelay(0.08)}
                className="space-y-5 max-w-[440px]"
              >
                <p className="text-[#161A1F]/50 text-[15px] md:text-[16px] leading-[1.75]">
                  Color was assigned by function rather than preference. Red
                  was reserved exclusively for emergency support. Green
                  indicated completion or progress.
                </p>
                <p className="text-[#161A1F]/50 text-[15px] md:text-[16px] leading-[1.75]">
                  Neutral tones carried the majority of content to reduce
                  emotional overload. Contrast ratios were tested to meet
                  accessibility guidelines while maintaining warmth.
                </p>
              </motion.div>
            </div>

            <motion.div
              {...fadeUpDelay(0.1)}
              className="lg:col-span-7"
            >
              <div
                className="w-full rounded-lg overflow-hidden bg-white p-5 md:p-8"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={imgColors}
                  alt="Semantic color palette — primary, grey, success, danger, warning, info scales"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <SectionDivider light />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5B. TYPOGRAPHY SCALE — Light
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/30" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/35 font-medium">
              Design System &middot; Typography
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.02em] mb-8"
              >
                Typography scale.
              </motion.h2>

              <motion.div
                {...fadeUpDelay(0.08)}
                className="space-y-5 max-w-[440px]"
              >
                <p className="text-[#161A1F]/50 text-[15px] md:text-[16px] leading-[1.75]">
                  The type system reinforces hierarchy in emotionally
                  sensitive contexts. Headlines guide focus. Body text remains
                  readable at minimum supported sizes.
                </p>
                <p className="text-[#161A1F]/50 text-[15px] md:text-[16px] leading-[1.75]">
                  Line height was increased to reduce visual density on
                  smaller screens. Accessibility informed minimum sizing and
                  contrast decisions.
                </p>
              </motion.div>
            </div>

            <motion.div
              {...fadeUpDelay(0.1)}
              className="lg:col-span-7 flex justify-center"
            >
              <div
                className="w-full max-w-[520px] rounded-lg overflow-hidden bg-white p-5 md:p-8"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={imgTypography}
                  alt="Typography scale — headlines, subtitles, body, captions, labels"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. OUTCOME — Dark, dominant
          ═══════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        {/* Warm ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(200,160,110,0.03) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-40 lg:py-48">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-10 md:mb-14"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/30 font-medium">
              Outcome
            </p>
          </motion.div>

          <motion.h2
            {...fadeUpDelay(0.04)}
            className="font-['Lora',serif] font-normal text-white/90 text-[32px] md:text-[42px] lg:text-[50px] leading-[1.1] tracking-[-0.02em] max-w-[780px] mb-6 md:mb-8"
          >
            Three behavioral shifts{" "}
            <span className="text-white/45">
              between version one and version two.
            </span>
          </motion.h2>

          <motion.p
            {...fadeUpDelay(0.08)}
            className="text-white/40 text-[15px] md:text-[16px] leading-[1.7] max-w-[580px] mb-20 md:mb-28"
          >
            Each change in the interface was tested against a specific
            behavioral metric. The following results reflect what five
            participants did during their first session with the revised
            prototype.
          </motion.p>

          {/* ── Behavioral comparison blocks ── */}
          <div className="space-y-8 md:space-y-10 mb-24 md:mb-32">
            {/* Behavior 1: Task Initiation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="rounded-lg border border-white/[0.07] bg-white/[0.015] overflow-hidden"
            >
              {/* Header */}
              <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="font-['Lora',serif] text-white/10 text-[36px] md:text-[42px] leading-none tracking-[-0.03em]">
                    01
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2.4px] text-white/20 font-medium mb-1">
                      Behavior
                    </p>
                    <h3 className="text-white/85 text-[17px] md:text-[19px] font-medium leading-[1.35] tracking-[-0.01em]">
                      Task Initiation
                    </h3>
                  </div>
                </div>
              </div>

              {/* V1 / Design Change / V2 grid */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    Version One
                  </p>
                  <p className="text-white/35 text-[14px] md:text-[15px] leading-[1.6]">
                    2 of 5 participants hesitated on the home screen. Multiple
                    elements competed for attention and no single action was
                    visually prioritized.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    What Changed
                  </p>
                  <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.6]">
                    Reduced the home screen to one primary action. Secondary
                    modules were moved below the first viewport.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-3">
                    Version Two
                  </p>
                  <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.6] font-medium">
                    5 of 5 participants started the daily exercise without
                    prompting.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Behavior 2: Layout Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.06,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="rounded-lg border border-white/[0.07] bg-white/[0.015] overflow-hidden"
            >
              <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="font-['Lora',serif] text-white/10 text-[36px] md:text-[42px] leading-none tracking-[-0.03em]">
                    02
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2.4px] text-white/20 font-medium mb-1">
                      Behavior
                    </p>
                    <h3 className="text-white/85 text-[17px] md:text-[19px] font-medium leading-[1.35] tracking-[-0.01em]">
                      Layout Navigation
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    Version One
                  </p>
                  <p className="text-white/35 text-[14px] md:text-[15px] leading-[1.6]">
                    3 of 5 participants attempted to scroll on static screens
                    and encountered dead ends in the layout.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    What Changed
                  </p>
                  <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.6]">
                    Converted static screen layouts to scroll based flows with
                    continuous content hierarchy.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-3">
                    Version Two
                  </p>
                  <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.6] font-medium">
                    0 layout related navigation errors were observed across all
                    five sessions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Behavior 3: Onboarding Comprehension */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="rounded-lg border border-white/[0.07] bg-white/[0.015] overflow-hidden"
            >
              <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="font-['Lora',serif] text-white/10 text-[36px] md:text-[42px] leading-none tracking-[-0.03em]">
                    03
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2.4px] text-white/20 font-medium mb-1">
                      Behavior
                    </p>
                    <h3 className="text-white/85 text-[17px] md:text-[19px] font-medium leading-[1.35] tracking-[-0.01em]">
                      Onboarding Comprehension
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    Version One
                  </p>
                  <p className="text-white/35 text-[14px] md:text-[15px] leading-[1.6]">
                    2 of 5 participants could not describe the app's core
                    purpose after completing onboarding.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-3">
                    What Changed
                  </p>
                  <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.6]">
                    Shortened the onboarding sequence and introduced a live
                    preview of the daily exercise before requiring commitment.
                  </p>
                </div>

                <div className="px-7 md:px-9 py-5 md:py-6">
                  <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-3">
                    Version Two
                  </p>
                  <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.6] font-medium">
                    4 of 5 participants accurately described the app's purpose
                    after onboarding.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scope */}
          <motion.div
            {...fadeUpDelay(0.12)}
            className="mb-16 max-w-[580px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#F98E1F]/40" />
              <p className="text-[10px] uppercase tracking-[2.4px] text-white/20 font-medium">
                Scope
              </p>
            </div>
            <p className="text-white/30 text-[14px] md:text-[15px] leading-[1.65]">
              Testing measured first session usability only. Participants
              completed one guided session with the revised prototype. Long
              term retention and repeat engagement were not tested.
            </p>
          </motion.div>

          {/* Divider */}
          <SectionDivider />

          {/* Reflection */}
          <div className="pt-20 md:pt-28 max-w-[580px]">
            <motion.div
              {...fadeUp}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-5 h-px bg-[#F98E1F]/40" />
              <h3 className="font-['Lora',serif] font-normal text-white/80 text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.01em]">
                What changed in my approach
              </h3>
            </motion.div>
            <motion.div {...fadeUpDelay(0.06)} className="space-y-6">
              <p className="text-white/50 text-[15px] md:text-[16px] leading-[1.8]">
                I initially assumed clear layout and labeling would be
                sufficient. Testing showed that{" "}
                <span className="text-white/70 font-medium">
                  hierarchy and action priority
                </span>{" "}
                mattered more than visual clarity alone.
              </p>

              <p className="text-white/50 text-[15px] md:text-[16px] leading-[1.8]">
                Defining one primary action per screen reduced hesitation more
                effectively than adding explanation. I now define the primary
                behavioral metric before designing additional features and
                validate structure before layering functionality.
              </p>

              <p className="text-white/40 text-[15px] md:text-[16px] leading-[1.8]">
                If the project continued, the next step would be measuring
                repeat engagement across multiple sessions rather than focusing
                solely on first use.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
