import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import imgMatSparHome from "figma:asset/2725c4cc5e8b21295821c9bfcd4d6ee4b35b016f.png";
import imgMatSparList from "figma:asset/d0851995c5ff43e23af849b5a4cf32224e13b4f2.png";
import { ResourceLink, NextProjectNav, caseStudyNav } from "../components/case-study/shared";
import imgLeggTil from "../../assets/MatSparLeggTil.png";
import imgOversikt from "../../assets/MatSparMatplan.png";

/* ───────────────────────────────────────────────────
   Shared animation config
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

/* ────────────────────
   Data
   ──────────────────── */
interface Insight {
  id: string;
  title: string;
  evidence: string;
  implication: string;
}

const insights: Insight[] = [
  {
    id: "01",
    title: "Ingredient visibility drives waste",
    evidence:
      "Participants bought duplicates because planning happened separately from inventory awareness.",
    implication:
      "Meal selection needed to account for previously chosen ingredients.",
  },
  {
    id: "02",
    title: "Budget awareness happens too late",
    evidence:
      "Most users checked spending after shopping, not during planning.",
    implication:
      "Projected cost must be visible before confirming the plan.",
  },
  {
    id: "03",
    title: "Editing lists created friction",
    evidence:
      "Manual ingredient adjustments caused hesitation and confusion.",
    implication:
      "Portion changes must automatically recalculate ingredient totals.",
  },
];

interface DesignDecision {
  id: string;
  title: string;
  problem: string;
  change: string;
  outcome: string;
}

const designDecisions: DesignDecision[] = [
  {
    id: "A",
    title: "Portion Adjustment",
    problem: "Manual ingredient editing caused confusion.",
    change:
      "Dynamic portion controls recalculated ingredients in real time.",
    outcome: "Removed ambiguity and reduced editing friction.",
  },
  {
    id: "B",
    title: "Budget Placement",
    problem: "Budget screen separated from planning flow.",
    change: "Moved projected weekly cost into meal selection flow.",
    outcome:
      "Shifted budgeting from retrospective review to proactive control.",
  },
  {
    id: "C",
    title: "Leftover Utilization",
    problem: "Users resisted logging full pantry inventories.",
    change:
      "Designed lightweight meal suggestions based on overlap instead of full tracking.",
    outcome:
      "Reduced interaction cost while still addressing waste.",
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
  height = "600px",
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
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,140,255,0.015) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
export default function MatSparCaseStudy() {
  return (
    <div className="min-h-screen bg-[#161A1F] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* ── Navigation ── */}
      <nav aria-label="Case study navigation" className="fixed top-0 left-0 right-0 z-50 bg-[#161A1F]/80 backdrop-blur-md border-b border-white/[0.06]">
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

      {/* ══════════════════════════════════════════════════
          Hero Section
          ══════════════════════════════════════════════════ */}
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
              "radial-gradient(circle, rgba(180,140,255,0.06) 0%, transparent 70%)",
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
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={baseTrans}
              className="flex flex-col"
            >
              <h1 className="font-['Lora',serif] font-normal text-white text-[56px] md:text-[68px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-7">
                MatSpar
              </h1>

              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/72 text-[20px] md:text-[22px] leading-[1.4] tracking-[-0.01em] mb-10">
                Meal planning and budgeting app prototype
              </h2>

              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-white/72 text-[16px] md:text-[17px] leading-[1.65] max-w-[540px] mb-14">
                A mobile concept designed to reduce food waste and grocery
                overspending by connecting meal planning, ingredient awareness,
                and real-time budget visibility.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTrans, delay: 0.15 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] md:text-[13px] uppercase tracking-[2px] font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-white/48 tracking-[2.2px]">Role</span>
                  <span className="text-white/72">Product Designer</span>
                </div>
                <div
                  className="w-px h-3 bg-white/10"
                  aria-hidden="true"
                />
                <span className="text-white/58">User Research</span>
                <div
                  className="w-px h-3 bg-white/10"
                  aria-hidden="true"
                />
                <span className="text-white/58">Interaction Design</span>
                <div
                  className="w-px h-3 bg-white/10"
                  aria-hidden="true"
                />
                <span className="text-white/58">Group Project</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTrans, delay: 0.22 }}
                className="mt-10"
              >
                <ResourceLink
                  href="https://www.figma.com/proto/ObFSRwwNMJGFbuidoVTQcM/MatSpar?node-id=420-3691&t=0hFbH7kNJmOqYqhd-1"
                  label="Open Figma prototype"
                  variant="ghost"
                  tone="dark"
                />
              </motion.div>
            </motion.div>

            {/* Right Column: Dual Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...baseTrans, delay: 0.08 }}
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
                  {/* Phone 1 — Home */}
                  <div className="w-[46%]">
                    <img
                      src={imgMatSparHome}
                      alt="MatSpar app home screen showing weekly meal plan and recipe cards"
                      className="w-full h-auto block rounded-[12px] sm:rounded-[14px]"
                      style={{
                        boxShadow:
                          "0 14px 44px -10px rgba(0,0,0,0.22), 0 6px 18px -6px rgba(0,0,0,0.10)",
                      }}
                    />
                  </div>
                  {/* Phone 2 — Shopping List (raised for depth) */}
                  <div
                    className="w-[46%]"
                    style={{
                      transform: "translateY(-24px) scale(0.975)",
                      transformOrigin: "bottom center",
                    }}
                  >
                    <img
                      src={imgMatSparList}
                      alt="MatSpar app shopping list screen with recipe ingredients"
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
                      "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,160,230,0.06) 0%, rgba(160,140,210,0.03) 40%, transparent 75%)",
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

      {/* ══════════════════════════════════════════════════
          Core Challenge
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider />
        <AmbientGlow top="40%" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Core Challenge
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="relative pl-6 md:pl-8 mb-14 md:mb-18 max-w-[820px]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-[0.15em] bottom-[0.15em] w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            />
            <h2 className="font-['Lora',serif] font-normal text-white/92 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em]">
              Connecting planning, inventory, and cost{" "}
              <span className="text-white/58">
                into one predictable flow
              </span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.12 }}
            className="max-w-[640px] space-y-5"
          >
            <p className="text-white/58 text-[15px] md:text-[16px] leading-[1.75]">
              Interviews revealed two recurring problems: users forgot what
              ingredients they already had, and grocery spending felt
              unpredictable.
            </p>
            <p className="text-white/58 text-[15px] md:text-[16px] leading-[1.75]">
              Participants described buying duplicates and realizing
              overspending only after checkout. Planning and budgeting happened
              in separate mental spaces, never connected.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════��════════════════════════════
          Research & Insights — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider light />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Research
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-12 md:mb-16"
          >
            Behavioral patterns{" "}
            <span className="text-[#161A1F]/58">behind grocery waste</span>
          </motion.h2>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] md:text-[13px] uppercase tracking-[2px] font-medium mb-20 md:mb-28"
          >
            <span className="text-[#161A1F]/58">5 Interviews</span>
            <div className="w-px h-3 bg-[#161A1F]/10" aria-hidden="true" />
            <span className="text-[#161A1F]/58">Behavior Mapping</span>
            <div className="w-px h-3 bg-[#161A1F]/10" aria-hidden="true" />
            <span className="text-[#161A1F]/58">Flow Analysis</span>
          </motion.div>

          {/* Insight Cards — matching Harmoni pattern */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                {...fadeUpCard}
                transition={stagger(index)}
                className={`relative group ${index === 2 ? "md:col-span-2 md:max-w-[calc(50%-0.625rem)]" : ""}`}
              >
                <div
                  className="relative h-full rounded-lg p-7 md:p-8 border border-[#161A1F]/[0.06] bg-white transition-colors duration-300 hover:bg-white/80 hover:border-[#161A1F]/[0.09]"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] uppercase tracking-[2.4px] text-[#161A1F]/48 font-medium">
                      Insight
                    </span>
                    <span className="font-['Lora',serif] text-[#161A1F]/15 text-[28px] md:text-[32px] leading-none tracking-[-0.02em]">
                      {insight.id}
                    </span>
                  </div>

                  <h3 className="text-[#161A1F]/92 text-[16px] md:text-[17px] font-medium leading-[1.45] mb-5">
                    {insight.title}
                  </h3>

                  <div className="mb-5">
                    <p className="text-[10px] uppercase tracking-[2px] text-[#161A1F]/48 font-medium mb-2">
                      Evidence
                    </p>
                    <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                      {insight.evidence}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#161A1F]/[0.06]">
                    <p className="text-[10px] uppercase tracking-[2px] text-[#161A1F]/48 font-medium mb-2">
                      Implication
                    </p>
                    <p className="text-[#161A1F]/72 text-[14px] md:text-[15px] leading-[1.55] font-medium">
                      {insight.implication}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 95%)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          Product Structure — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Product Structure
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            Four connected{" "}
            <span className="text-[#161A1F]/58">flows</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[620px] mb-20 md:mb-28"
          >
            The system reduced manual coordination by connecting meal planning,
            leftover optimization, overview, and grocery generation into one
            continuous structure.
          </motion.p>

          <motion.div {...fadeUpCard} transition={{ ...baseTrans, delay: 0.1 }} className="-mt-12 mb-20 md:mb-28">
            <ResourceLink
              href="https://www.figma.com/proto/ObFSRwwNMJGFbuidoVTQcM/MatSpar?node-id=420-3691&t=0hFbH7kNJmOqYqhd-1"
              label="Walk through the prototype"
              variant="ghost"
              tone="light"
            />
          </motion.div>

          {/* ── Flow 01: Create Meal Plan ── */}
          <motion.div
            {...fadeUpCard}
            transition={stagger(0, 0.08)}
            className="mb-12 md:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
              {/* Text — left */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-['Lora',serif] text-[#161A1F]/10 text-[48px] md:text-[56px] leading-none tracking-[-0.03em]">
                    01
                  </span>
                  <h3 className="text-[#161A1F]/92 text-[20px] md:text-[22px] font-medium leading-[1.3] tracking-[-0.01em]">
                    Create Meal Plan
                  </h3>
                </div>
                <div className="space-y-4 max-w-[540px]">
                  <p className="text-[#161A1F]/58 text-[14px] md:text-[15px] leading-[1.7]">
                    Users build a weekly plan by selecting dishes across
                    categories such as Dinner, Lunch, and Breakfast.
                  </p>
                  <p className="text-[#161A1F]/58 text-[13px] md:text-[14px] leading-[1.65]">
                    Suggestions can be filtered by budget level, allowing users
                    to control cost before committing to a plan.
                  </p>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                    Each selected meal contributes its ingredients to a shared
                    ingredient pool, forming the structural foundation for the
                    rest of the system.
                  </p>
                </div>
              </div>
              {/* Phone mockup — right */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="w-[220px] md:w-[240px] rounded-2xl overflow-hidden">
                  <img
                    src={imgMatSparHome}
                    alt="MatSpar weekly meal plan screen (Ukens Matplan) with recipe cards and budget overview"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector line */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.06 }}
            aria-hidden="true"
            className="h-px mb-12 md:mb-16 max-w-[200px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)",
            }}
          />

          {/* ── Flow 02: Leftover Suggestions ── */}
          <motion.div
            {...fadeUpCard}
            transition={stagger(1, 0.08)}
            className="mb-12 md:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
              {/* Phone mockup — left on desktop for alternation */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="w-[220px] md:w-[240px] rounded-2xl overflow-hidden">
                  <img
                    src={imgLeggTil}
                    alt="Legg til screen (Legg til) suggesting extra dishes that reuse leftover ingredients from the plan"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              {/* Text — right */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-['Lora',serif] text-[#161A1F]/10 text-[48px] md:text-[56px] leading-none tracking-[-0.03em]">
                    02
                  </span>
                  <h3 className="text-[#161A1F]/92 text-[20px] md:text-[22px] font-medium leading-[1.3] tracking-[-0.01em]">
                    Leftover Suggestions
                  </h3>
                </div>
                <div className="space-y-4 max-w-[540px]">
                  <p className="text-[#161A1F]/58 text-[14px] md:text-[15px] leading-[1.7]">
                    While building the plan, the system identifies ingredient
                    overlap and suggests additional dishes that reuse ingredients
                    already selected.
                  </p>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65] italic">
                    &ldquo;Save your wallet and the environment by using
                    leftover ingredients for these dishes&rdquo;
                  </p>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                    Instead of requiring users to log their entire pantry, the
                    system highlights meals that require only a few additional
                    ingredients to become complete. This lowers interaction cost
                    while still addressing food waste.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector line */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.08 }}
            aria-hidden="true"
            className="h-px mb-12 md:mb-16 max-w-[200px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)",
            }}
          />

          {/* ── Flow 03: Overview ── */}
          <motion.div
            {...fadeUpCard}
            transition={stagger(2, 0.08)}
            className="mb-12 md:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
              {/* Text — left */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-['Lora',serif] text-[#161A1F]/10 text-[48px] md:text-[56px] leading-none tracking-[-0.03em]">
                    03
                  </span>
                  <h3 className="text-[#161A1F]/92 text-[20px] md:text-[22px] font-medium leading-[1.3] tracking-[-0.01em]">
                    Overview
                  </h3>
                </div>
                <div className="space-y-4 max-w-[540px]">
                  <p className="text-[#161A1F]/58 text-[14px] md:text-[15px] leading-[1.7]">
                    The overview aggregates selected meals and total ingredient
                    quantities before activation.
                  </p>
                  <p className="text-[#161A1F]/58 text-[13px] md:text-[14px] leading-[1.65]">
                    Users see how dishes connect through shared ingredients and
                    how portion adjustments affect the full plan.
                  </p>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                    This step creates clarity before generating the final
                    grocery list.
                  </p>
                </div>
              </div>
              {/* Phone mockup — right */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="w-[220px] md:w-[240px] rounded-2xl overflow-hidden">
                  <img
                    src={imgOversikt}
                    alt="Oversikt screen (Oversikt) showing selected meals with an Aktiver Matplan action before generating the list"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector line */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.10 }}
            aria-hidden="true"
            className="h-px mb-12 md:mb-16 max-w-[200px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)",
            }}
          />

          {/* ── Flow 04: Shopping List ── */}
          <motion.div
            {...fadeUpCard}
            transition={stagger(3, 0.08)}
            className="mb-16 md:mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
              {/* Phone mockup — left on desktop for alternation */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="w-[220px] md:w-[240px] rounded-2xl overflow-hidden">
                  <img
                    src={imgMatSparList}
                    alt="MatSpar shopping list screen (Handleliste) with consolidated grocery ingredients"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              {/* Text — right */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-['Lora',serif] text-[#161A1F]/10 text-[48px] md:text-[56px] leading-none tracking-[-0.03em]">
                    04
                  </span>
                  <h3 className="text-[#161A1F]/92 text-[20px] md:text-[22px] font-medium leading-[1.3] tracking-[-0.01em]">
                    Shopping List
                  </h3>
                </div>
                <div className="space-y-4 max-w-[540px]">
                  <p className="text-[#161A1F]/58 text-[14px] md:text-[15px] leading-[1.7]">
                    The system consolidates required ingredients into a
                    structured grocery list.
                  </p>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                    Quantities reflect portion adjustments and overlapping use
                    across meals.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Flow diagram — minimal connector */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.14 }}
            className="flex items-center gap-3 md:gap-4 flex-wrap"
          >
            {[
              "Meal Plan Created",
              "Ingredients Connected",
              "Plan Reviewed",
              "Shopping List Generated",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                {i > 0 && (
                  <svg
                    width="16"
                    height="8"
                    viewBox="0 0 16 8"
                    fill="none"
                    className="text-[#161A1F]/[0.12] shrink-0"
                  >
                    <path
                      d="M0 4h14M11 1l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                )}
                <span
                  className={`text-[11px] md:text-[12px] uppercase tracking-[2px] font-medium ${
                    i === 0
                      ? "text-[#161A1F]/48"
                      : i === 1
                        ? "text-[#161A1F]/48"
                        : i === 2
                          ? "text-[#161A1F]/48"
                          : "text-[#161A1F]/58"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 95%)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          Iteration & Design Decisions
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider />
        <AmbientGlow top="25%" height="700px" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Design Decisions
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-white/92 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            Structural changes that{" "}
            <span className="text-white/58">reduced friction</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-white/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px] mb-20 md:mb-28"
          >
            Each decision addressed a specific coordination failure identified
            during research.
          </motion.p>

          <div className="space-y-6 md:space-y-7">
            {designDecisions.map((decision, index) => (
              <motion.div
                key={decision.id}
                {...fadeUpCard}
                transition={stagger(index, 0.08)}
              >
                <div
                  className="relative rounded-lg border border-white/[0.06] bg-white/[0.015] transition-colors duration-300 hover:bg-white/[0.025] hover:border-white/[0.09] overflow-hidden"
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  {/* Header */}
                  <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <span className="font-['Lora',serif] text-white/10 text-[40px] md:text-[48px] leading-none tracking-[-0.03em]">
                        {decision.id}
                      </span>
                      <h3 className="text-white/92 text-[18px] md:text-[20px] font-medium leading-[1.35] tracking-[-0.01em]">
                        {decision.title}
                      </h3>
                    </div>
                  </div>

                  {/* Problem → Change → Outcome */}
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                      <p className="text-[10px] uppercase tracking-[2px] text-white/48 font-medium mb-2.5">
                        Problem
                      </p>
                      <p className="text-white/48 text-[14px] md:text-[15px] leading-[1.6]">
                        {decision.problem}
                      </p>
                    </div>

                    <div className="px-7 md:px-9 py-5 md:py-6 md:border-r border-b md:border-b-0 border-white/[0.04]">
                      <p className="text-[10px] uppercase tracking-[2px] text-white/48 font-medium mb-2.5">
                        Change
                      </p>
                      <p className="text-white/58 text-[14px] md:text-[15px] leading-[1.6]">
                        {decision.change}
                      </p>
                    </div>

                    <div className="px-7 md:px-9 py-5 md:py-6">
                      <p className="text-[10px] uppercase tracking-[2px] text-white/48 font-medium mb-2.5">
                        Outcome
                      </p>
                      <p className="text-white/72 text-[14px] md:text-[15px] leading-[1.6] font-medium">
                        {decision.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          Testing & Refinement
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <AmbientGlow top="30%" height="500px" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Testing
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-white/92 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            Five participants,{" "}
            <span className="text-white/58">three adjustments</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-white/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px] mb-16 md:mb-20"
          >
            Prototype testing revealed navigation assumptions that didn&rsquo;t
            match actual behavior.
          </motion.p>

          {/* Findings */}
          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.1 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-[10px] uppercase tracking-[2.4px] text-white/48 font-medium mb-6">
              Observed Issues
            </p>
            <div className="max-w-[580px] space-y-3.5">
              {[
                "Shopping list accessed earlier than expected",
                "Savings indicators were visually overlooked",
                "Portion changes needed clearer numeric confirmation",
              ].map((finding, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-white/15 mt-2 shrink-0" />
                  <p className="text-white/58 text-[14px] md:text-[15px] leading-[1.55]">
                    {finding}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Adjustments */}
          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.14 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-[10px] uppercase tracking-[2.4px] text-white/48 font-medium mb-6">
              Adjustments
            </p>
            <div className="max-w-[580px] space-y-3.5">
              {[
                "Moved shopping list to primary navigation",
                "Increased contrast on savings indicators",
                "Added immediate numeric feedback for portion updates",
              ].map((adjustment, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-white/25 mt-2 shrink-0" />
                  <p className="text-white/72 text-[14px] md:text-[15px] leading-[1.55]">
                    {adjustment}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Outcome */}
          <motion.div
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.18 }}
            className="relative rounded-lg border border-white/[0.08] bg-white/[0.02] px-7 md:px-9 py-6 md:py-7 max-w-[580px]"
          >
            <p className="text-[10px] uppercase tracking-[2.4px] text-white/48 font-medium mb-3">
              Result
            </p>
            <p className="text-white/75 text-[15px] md:text-[16px] leading-[1.6] font-medium">
              All participants completed a weekly meal plan without
              clarification questions.
            </p>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent 95%)",
          }}
        />
      </section>

      {/* ═════════════════════════════════════════════════
          Visual & Interaction Design (brief) — Light
          ═════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider light />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Visual Design
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-12 md:mb-16"
          >
            Decisions shaped by{" "}
            <span className="text-[#161A1F]/58">behavior, not aesthetics</span>
          </motion.h2>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.1 }}
            className="max-w-[600px] space-y-3.5"
          >
            {[
              "Home screen displays projected weekly cost, estimated savings, and active meal plan",
              "Large touch targets for meal selection and portion adjustment",
              "Clear separation between planning and budgeting views",
              "Micro-interactions confirm additions and removals to prevent accidental overrides",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-[#161A1F]/20 mt-2 shrink-0" />
                <p className="text-[#161A1F]/58 text-[14px] md:text-[15px] leading-[1.6]">
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Reflection — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Reflection
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-16 md:mb-20"
          >
            Coordination determines{" "}
            <span className="text-[#161A1F]/58">usability</span>
          </motion.h2>

          <div className="max-w-[600px] space-y-10 md:space-y-12">
            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.08 }}
              className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              Meal planning is a{" "}
              <span className="text-[#161A1F]/75 font-medium">
                coordination problem
              </span>
              , not a content problem. Users need clearer relationships between
              meals, cost, and ingredients, not more recipes.
            </motion.p>

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.14 }}
              className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              Small structural decisions, when cost appears, how portions
              update, whether ingredients auto-calculate, determine whether the
              system feels{" "}
              <span className="text-[#161A1F]/72 font-medium">
                helpful or complicated
              </span>
              .
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...baseTrans, delay: 0.18 }}
              aria-hidden="true"
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 100%)",
              }}
            />

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.22 }}
              className="text-[#161A1F]/48 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              If continued, the next step would be measuring real grocery
              savings over multiple weeks to validate behavioral impact.
            </motion.p>
          </div>

          <NextProjectNav {...caseStudyNav("/work/matspar")} light />
        </div>
      </section>
    </div>
  );
}
