import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import imgF1Hero from "../../assets/optimized/f1-platform-overview-1600.webp";
import imgTeams from "../../assets/optimized/f1-teams-screen-1600.webp";
import imgDrivers from "../../assets/optimized/f1-drivers-screen-1600.webp";
import imgQuiz from "../../assets/optimized/f1-quiz-screen-1600.webp";

/* ───────────────────────────────────────────────────
   Shared animation config — mirrors portfolio system
   ─────────────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 12 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
};
const fadeUpCard = {
  ...fadeUp,
  viewport: { once: true, margin: "-40px" } as const,
};
const ease = [0.25, 0.1, 0.25, 1] as const;
const baseTrans = { duration: 0.5, ease };
const stagger = (i: number, base = 0.07) => ({
  ...baseTrans,
  delay: base * i,
});

/* ───────────────────────────────────────────────────
   Data
   ─────────────────────────────────────────────────── */
const systemRequirements = [
  "Display structured data about drivers and races",
  "Support full CRUD operations",
  "Handle image uploads",
  "Prevent UI blocking during API calls",
  "Remain responsive across devices",
];

interface TechnicalDecision {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
}

const technicalDecisions: TechnicalDecision[] = [
  {
    id: "A",
    title: "Async Handling",
    problem:
      "API calls blocked rendering. Layout shifts occurred as components rendered before data was ready.",
    solution:
      "Refactored endpoints with async/await. Implemented loading states and skeleton placeholders in React to maintain layout stability during fetch cycles.",
    outcome:
      "UI remained predictable during fetch cycles. Perceived responsiveness improved without changing actual response times.",
  },
  {
    id: "B",
    title: "Image Upload Strategy",
    problem:
      "Base64 image handling increased payload size, causing inconsistent load times and degraded performance on slower connections.",
    solution:
      "Moved to file storage with path references. Images stored server-side, API returns lightweight path strings instead of encoded blobs.",
    outcome:
      "Reduced response weight. Improved load time consistency across connection speeds.",
  },
  {
    id: "C",
    title: "State Coordination",
    problem:
      "CRUD operations caused inconsistent UI states. Components fetched data independently, leading to duplicate requests and update jitter.",
    solution:
      "Introduced centralized state sharing using Context API. Reduced duplicate fetch cycles and unnecessary re-renders.",
    outcome:
      "Reduced update jitter. Simplified component logic and made data flow predictable.",
  },
];

/* ───────────────────────────────────────────────────
   Layout helpers
   ─────────────────────────────────────────────────── */
function SectionDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 right-0 h-px"
      style={{
        background: light
          ? "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 95%)"
          : "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 95%)",
      }}
    />
  );
}

function AmbientGlow({
  top = "25%",
  height = "500px",
}: {
  top?: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        top,
        width: "900px",
        height,
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100,200,170,0.015) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
export default function F1CaseStudy() {
  return (
    <div className="min-h-screen bg-[#161A1F] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* ── Navigation ── */}
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

      {/* ══════════════════════════════════════════════════
          Hero — Dark
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#161A1F] via-[#1a1f26] to-[#161A1F]"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(100,220,180,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-16 md:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={baseTrans}
              className="flex flex-col"
            >
              {/* Project type label */}
              <span className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/25 font-medium mb-8">
                Fullstack System Study
              </span>

              <h1 className="font-['Lora',serif] font-normal text-white text-[48px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-[-0.03em] mb-5">
                F1 Inspired
                <br />
                Web Platform
              </h1>

              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/65 text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em] mb-8">
                Fullstack system experiment
              </h2>

              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-white/50 text-[15px] md:text-[16px] leading-[1.65] max-w-[500px] mb-12">
                A fullstack web platform exploring dynamic data handling, CRUD
                interaction patterns, and frontend performance under
                asynchronous load.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTrans, delay: 0.12 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[12px] md:text-[13px] uppercase tracking-[2px] font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/25 tracking-[2.2px]">Role</span>
                    <span className="text-white/60">
                      Designer & Fullstack Dev
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] md:text-[12px] uppercase tracking-[1.8px] font-medium">
                  <span className="text-white/35">React</span>
                  <div className="w-px h-2.5 bg-white/10" aria-hidden="true" />
                  <span className="text-white/35">.NET 7 Web API</span>
                  <div className="w-px h-2.5 bg-white/10" aria-hidden="true" />
                  <span className="text-white/35">EF Core</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] md:text-[12px] uppercase tracking-[1.8px] font-medium">
                  <span className="text-white/45">Async UX</span>
                  <div className="w-px h-2.5 bg-white/10" aria-hidden="true" />
                  <span className="text-white/45">State Coordination</span>
                  <div className="w-px h-2.5 bg-white/10" aria-hidden="true" />
                  <span className="text-white/45">Performance</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column — MacBook mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...baseTrans, delay: 0.06 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[480px]">
                <div
                  style={{
                    filter:
                      "drop-shadow(0 14px 44px rgba(0,0,0,0.22)) drop-shadow(0 6px 18px rgba(0,0,0,0.10))",
                  }}
                >
                  {/* MacBook display lid */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #303338 0%, #28292e 50%, #232529 100%)",
                      borderRadius: "8px 8px 0 0",
                      padding: "6px 6px 5px 6px",
                    }}
                  >
                    {/* Top edge highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-[8%] right-[8%] z-30"
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent)",
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
                      <div
                        style={{
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle, #1a1c1f 40%, #111214 100%)",
                          boxShadow:
                            "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
                        }}
                      />
                    </div>

                    {/* Screen bezel */}
                    <div
                      className="relative overflow-hidden bg-[#0a0a0b]"
                      style={{
                        borderRadius: "3px",
                        boxShadow:
                          "inset 0 0 0 0.5px rgba(255,255,255,0.03)",
                      }}
                    >
                      {/* Screen reflection */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
                        style={{
                          height: "30%",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)",
                        }}
                      />
                      <img
                        src={imgF1Hero}
                        alt="F1 Inspired Web Platform showing driver data and race information"
                        width={1600}
                        height={880}
                        loading="eager"
                        decoding="async"
                        className="w-full h-auto block relative z-0"
                      />
                    </div>
                  </div>

                  {/* Hinge */}
                  <div
                    className="relative mx-auto"
                    style={{
                      width: "100%",
                      height: "3px",
                      background:
                        "linear-gradient(180deg, #2a2c30 0%, #222427 100%)",
                      borderRadius: "0 0 1px 1px",
                    }}
                  />

                  {/* MacBook base */}
                  <div
                    className="relative mx-auto"
                    style={{
                      width: "104%",
                      marginLeft: "-2%",
                      height: "8px",
                      background:
                        "linear-gradient(180deg, #2d2f34 0%, #27292d 60%, #222427 100%)",
                      borderRadius: "0 0 5px 5px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-[6%] right-[6%]"
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.05) 70%, transparent)",
                        borderRadius: "0 0 5px 5px",
                      }}
                    />
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

                  {/* Contact shadow */}
                  <div
                    aria-hidden="true"
                    className="mx-auto"
                    style={{
                      width: "80%",
                      height: "6px",
                      marginTop: "2px",
                      background:
                        "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.18) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Core Challenge — Dark
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider />
        <AmbientGlow top="35%" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/30 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Core Challenge
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="relative pl-6 md:pl-8 mb-12 md:mb-14 max-w-[760px]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-[0.15em] bottom-[0.15em] w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            />
            <h2 className="font-['Lora',serif] font-normal text-white/90 text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Stabilizing UI behavior{" "}
              <span className="text-white/50">under asynchronous load</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.1 }}
            className="max-w-[580px] space-y-4"
          >
            <p className="text-white/50 text-[15px] md:text-[16px] leading-[1.75]">
              Live data updates caused UI blocking. Early builds exposed layout
              shifts as components rendered before data was ready. The interface
              felt unstable — not because the data was wrong, but because the
              frontend couldn&rsquo;t coordinate timing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          System Requirements — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider light />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/35 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Requirements
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-12 md:mb-16"
          >
            What the platform{" "}
            <span className="text-[#161A1F]/45">needed to do</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[900px]">
            {systemRequirements.map((req, index) => (
              <motion.div
                key={index}
                {...fadeUpCard}
                transition={stagger(index, 0.05)}
              >
                <div className="h-full rounded-md border border-[#161A1F]/[0.08] bg-white/60 px-5 py-4 flex items-start gap-3">
                  <span className="text-[#161A1F]/20 text-[12px] font-mono mt-0.5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#161A1F]/60 text-[13px] md:text-[14px] leading-[1.55]">
                    {req}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Architecture Overview — Light + Teams Image
          ═════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider light />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/35 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Architecture
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Text content */}
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.05 }}
                className="font-['Lora',serif] font-normal text-[#161A1F] text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-6 md:mb-8"
              >
                Separation of{" "}
                <span className="text-[#161A1F]/45">concerns</span>
              </motion.h2>

              <motion.p
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.08 }}
                className="text-[#161A1F]/40 text-[15px] md:text-[16px] leading-[1.65] max-w-[520px] mb-14 md:mb-16"
              >
                Business logic isolated in the API layer. Presentation handled
                entirely by React. Each layer testable and deployable independently.
              </motion.p>

              {/* Architecture blocks */}
              <motion.div
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-4 md:gap-5 max-w-[700px]"
              >
                {/* Backend */}
                <div className="flex-1 rounded-md border border-[#161A1F]/[0.06] bg-white p-5 md:p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                  <p className="text-[10px] uppercase tracking-[2.4px] text-[#161A1F]/20 font-medium mb-4">
                    Backend
                  </p>
                  <div className="space-y-2">
                    <p className="text-[#161A1F]/65 text-[14px] md:text-[15px] font-medium">
                      .NET 7 Web API
                    </p>
                    <p className="text-[#161A1F]/40 text-[13px] md:text-[14px]">
                      Entity Framework Core
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex items-center justify-center md:py-0 py-1">
                  <div className="hidden md:block w-8 h-px bg-[#161A1F]/[0.08]" />
                  <div className="md:hidden h-6 w-px bg-[#161A1F]/[0.08]" />
                </div>

                {/* Frontend */}
                <div className="flex-1 rounded-md border border-[#161A1F]/[0.06] bg-white p-5 md:p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                  <p className="text-[10px] uppercase tracking-[2.4px] text-[#161A1F]/20 font-medium mb-4">
                    Frontend
                  </p>
                  <div className="space-y-2">
                    <p className="text-[#161A1F]/65 text-[14px] md:text-[15px] font-medium">
                      React
                    </p>
                    <p className="text-[#161A1F]/40 text-[13px] md:text-[14px]">
                      Bootstrap
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — Teams screenshot */}
            <motion.div
              {...fadeUp}
              transition={{ ...baseTrans, delay: 0.1 }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={imgTeams}
                  alt="F1 Teams 2023 page showing team cards with car images, driver pairings for Red Bull, Ferrari, Mercedes-AMG, Alpine, McLaren, and Alfa Romeo"
                  width={1600}
                  height={932}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Technical Decisions — Dark
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider />
        <AmbientGlow top="30%" height="600px" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/30 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Technical Decisions
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-white/90 text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] max-w-[760px] mb-6 md:mb-8"
          >
            Architecture choices that{" "}
            <span className="text-white/50">shaped perceived stability</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-white/50 text-[15px] md:text-[16px] leading-[1.65] max-w-[560px] mb-16 md:mb-20"
          >
            Three technical decisions had the most direct impact on how the
            interface felt to use.
          </motion.p>

          {/* Decision blocks */}
          <div className="space-y-6 md:space-y-7">
            {technicalDecisions.map((decision, index) => (
              <motion.div
                key={decision.id}
                {...fadeUpCard}
                transition={stagger(index, 0.08)}
              >
                <div
                  className="relative rounded-lg border border-white/[0.06] bg-white/[0.015] transition-colors duration-300 hover:bg-white/[0.025] hover:border-white/[0.09] overflow-hidden"
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  <div className="px-6 md:px-8 py-6 md:py-7">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-['Lora',serif] text-white/10 text-[40px] md:text-[48px] leading-none tracking-[-0.03em]">
                        {decision.id}
                      </span>
                      <h3 className="text-white/85 text-[17px] md:text-[19px] font-medium leading-[1.35] tracking-[-0.01em]">
                        {decision.title}
                      </h3>
                    </div>

                    {/* Problem / Solution / Outcome grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/25 font-medium mb-2.5">
                          Problem
                        </p>
                        <p className="text-white/45 text-[13px] md:text-[14px] leading-[1.6]">
                          {decision.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/25 font-medium mb-2.5">
                          Solution
                        </p>
                        <p className="text-white/55 text-[13px] md:text-[14px] leading-[1.6]">
                          {decision.solution}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-medium mb-2.5">
                          UX Impact
                        </p>
                        <p className="text-white/65 text-[13px] md:text-[14px] leading-[1.6] font-medium">
                          {decision.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progression visual — Failure → Refactor → Stability */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.15 }}
            className="mt-14 md:mt-16 flex items-center gap-3 md:gap-4 max-w-[500px]"
          >
            {["Instability", "Refactor", "Stability"].map((label, i) => (
              <div key={label} className="flex items-center gap-3 md:gap-4">
                {i > 0 && (
                  <div className="w-6 md:w-8 h-px bg-white/[0.10]" />
                )}
                <span
                  className={`text-[11px] md:text-[12px] uppercase tracking-[2px] font-medium ${
                    i === 0
                      ? "text-white/25"
                      : i === 1
                        ? "text-white/40"
                        : "text-white/60"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Accessibility — Dark + Drivers Image
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider />
        <AmbientGlow top="25%" height="500px" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/30 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Accessibility
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Text content */}
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.05 }}
                className="font-['Lora',serif] font-normal text-white/90 text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-8 md:mb-10"
              >
                Integrated during{" "}
                <span className="text-white/50">development</span>
              </motion.h2>

              <motion.div
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.1 }}
                className="max-w-[560px] space-y-3.5"
              >
                {[
                  "Semantic HTML used throughout all views",
                  "Keyboard navigation supported for all interactive elements",
                  "WCAG contrast minimums met across the interface",
                  "Accessibility integrated during development, not retrofitted",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                    <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.55]">
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Drivers screenshot */}
            <motion.div
              {...fadeUp}
              transition={{ ...baseTrans, delay: 0.1 }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={imgDrivers}
                  alt="F1 Drivers 2023 page showing driver cards with portraits, ages, and nationalities in a responsive grid layout"
                  width={1600}
                  height={932}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Reflection — Light + Quiz Image
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider light />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-24 md:py-28 lg:py-36">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/35 font-medium mb-10 md:mb-12"
          >
            System Study&ensp;&middot;&ensp;Reflection
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Text content */}
            <div className="lg:col-span-5">
              <motion.h2
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.05 }}
                className="font-['Lora',serif] font-normal text-[#161A1F] text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] max-w-[640px] mb-12 md:mb-16"
              >
                System architecture shapes{" "}
                <span className="text-[#161A1F]/45">perceived usability</span>
              </motion.h2>

              <div className="max-w-[560px] space-y-8 md:space-y-10">
                <motion.p
                  {...fadeUpCard}
                  transition={{ ...baseTrans, delay: 0.08 }}
                  className="text-[#161A1F]/55 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
                >
                  Async calls, image handling, and state management directly affect
                  how stable an interface feels. These aren&rsquo;t visual design
                  decisions — they&rsquo;re{" "}
                  <span className="text-[#161A1F]/75 font-medium">
                    engineering decisions with UX consequences
                  </span>
                  .
                </motion.p>

                <motion.p
                  {...fadeUpCard}
                  transition={{ ...baseTrans, delay: 0.12 }}
                  className="text-[#161A1F]/50 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
                >
                  Backend decisions influence frontend trust. When the API layer is
                  predictable, the interface can be too.
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...baseTrans, delay: 0.16 }}
                  aria-hidden="true"
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)",
                  }}
                />

                <motion.p
                  {...fadeUpCard}
                  transition={{ ...baseTrans, delay: 0.18 }}
                  className="text-[#161A1F]/45 text-[14px] md:text-[15px] leading-[1.75] tracking-[-0.005em]"
                >
                  If continued: pagination, caching, and automated API testing would
                  be the next areas of focus.
                </motion.p>
              </div>
            </div>

            {/* Right — Quiz screenshot */}
            <motion.div
              {...fadeUp}
              transition={{ ...baseTrans, delay: 0.1 }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={imgQuiz}
                  alt="F1 Quiz page showing Question 1/50 about the Saudi Arabian Grand Prix with multiple choice answers and a dramatic Ferrari pit stop photograph"
                  width={1600}
                  height={932}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
