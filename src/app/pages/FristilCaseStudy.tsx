import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ResourceLink, BackToProjects } from "../components/case-study/shared";
import imgFristil from "../../assets/optimized/fristil-records-homepage-1600.webp";
import imgNewsletter from "../../assets/optimized/fristil-records-newsletter-1600.webp";
import imgNyheter from "../../assets/optimized/fristil-records-news-1600.webp";

/* ───────────────────────────────────────────────────
   Shared animation config — mirrors Harmoni exactly
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
interface Insight {
  id: string;
  title: string;
  evidence: string;
  implication: string;
}

const insights: Insight[] = [
  {
    id: "01",
    title: "Unclear positioning",
    evidence:
      "Stakeholders described the label as both an artist collective and a production service. The distinction was not formally articulated.",
    implication:
      "The website needed to separate artist identity from service offering while still presenting them under one brand.",
  },
  {
    id: "02",
    title: "Artists were the primary entry point",
    evidence:
      "When discussing the label externally, conversations began with the artists. Services were secondary.",
    implication:
      "Artist discovery should lead the structure. Services should support, not compete for attention.",
  },
  {
    id: "03",
    title: "Services lacked definition",
    evidence:
      "Production and management were described broadly. Scope and differentiation were not documented.",
    implication:
      "Services required concrete descriptions and clear boundaries.",
  },
  {
    id: "04",
    title: "Growth was expected",
    evidence:
      "Plans were in place to sign additional artists and expand offerings.",
    implication:
      "The architecture needed repeatable templates rather than fixed layouts.",
  },
];

interface StructuralDecision {
  title: string;
  description: string;
}

const decisions: StructuralDecision[] = [
  {
    title: "Limited navigation",
    description:
      "A small set of top level categories prevented fragmentation and reduced cognitive load.",
  },
  {
    title: "Standardized artist profiles",
    description:
      "Each artist page followed the same structure to ensure equal visibility and clarity.",
  },
  {
    title: "Formalized service presentation",
    description:
      "Services were rewritten into concise, concrete descriptions instead of general statements.",
  },
  {
    title: "Designed for expansion",
    description:
      "Templates allowed new artists and services to be added without altering the structure.",
  },
];

interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "1,783", label: "Pageviews" },
  { value: "789", label: "Sessions" },
  { value: "664", label: "Unique Visitors" },
  { value: "2:55", label: "Average Session Duration" },
];

/* ───────────────────────────────────────────────────
   Divider — reused between every section
   ─────────────────────────────────────────────────── */
function SectionDivider({ position = "top", light = false }: { position?: "top" | "bottom"; light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute ${position}-0 left-0 right-0 h-px`}
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
  width = "1000px",
  height = "600px",
}: {
  top?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        top,
        width,
        height,
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(140,170,210,0.02) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
}

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
export default function FristilCaseStudy() {
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
              "radial-gradient(circle, rgba(120,180,255,0.08) 0%, transparent 70%)",
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
                Fristil Records
              </h1>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/72 text-[20px] md:text-[22px] leading-[1.4] tracking-[-0.01em] mb-10">
                Artist label website design and implementation
              </h2>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-white/72 text-[16px] md:text-[17px] leading-[1.65] max-w-[540px] mb-14">
                Fristil Records was entering a growth phase and needed a
                centralized digital presence. I designed and built a website
                that introduced the label, structured its offering, and created
                a foundation for expansion.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTrans, delay: 0.15 }}
                className="mt-10 max-w-[460px] flex flex-col gap-[15px]"
              >
                {[
                  { label: "Role", value: "UX Designer & Developer" },
                  { label: "Focus", value: "IA Definition · Design System · Launch" },
                  { label: "Duration", value: "3 month project" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-5">
                    <span className="w-[80px] shrink-0 text-[12px] uppercase tracking-[2px] text-white/48 font-medium">
                      {row.label}
                    </span>
                    <span className="text-[15px] md:text-[16px] text-white/72 font-medium tracking-[-0.01em]">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-baseline gap-5">
                  <span className="w-[80px] shrink-0 text-[12px] uppercase tracking-[2px] text-white/48 font-medium">
                    Outcome
                  </span>
                  <span className="text-[15px] md:text-[16px] text-white/75 font-medium tracking-[-0.01em]">
                    Centralized <span className="text-white/92">digital presence for growth</span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...baseTrans, delay: 0.22 }}
                className="mt-10"
              >
                <ResourceLink
                  href="https://www.fristilrecords.no/"
                  label="Visit live site"
                  icon={ExternalLink}
                  variant="solid"
                />
              </motion.div>
            </motion.div>

            {/* Right Column: MacBook Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...baseTrans, delay: 0.08 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[520px]">
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
                        src={imgFristil}
                        alt="Fristil Records website showing artist showcase and editorial layout"
                        width={1600}
                        height={965}
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
                    {/* Front edge highlight */}
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
                    {/* Trackpad hint */}
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

                {/* Ambient light behind mockup */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                  style={{
                    width: "140%",
                    height: "130%",
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,200,230,0.06) 0%, rgba(140,170,210,0.03) 40%, transparent 75%)",
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
          Core Challenge (Problem)
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <SectionDivider position="top" />
        <AmbientGlow top="40%" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Core Challenge
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            {/* Left — Problem statement */}
            <div className="lg:col-span-12">
              {/* Headline with left accent */}
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
                  Fristil Records operated{" "}
                  <span className="text-white/58">without a dedicated website.</span>
                </h2>
              </motion.div>

              <motion.p
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.1 }}
                className="text-white/48 text-[15px] md:text-[16px] italic tracking-[-0.005em] mb-12 md:mb-16 max-w-[600px]"
              >
                Artists were promoted through social media and streaming platforms. Services such as production and management were communicated through direct contact.
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.12 }}
                className="max-w-[640px] space-y-5"
              >
                <p className="text-white/58 text-[15px] md:text-[16px] leading-[1.75]">
                  There was no single place that explained what the label
                  represented. The challenge was not visual expression. It was
                  defining how the label should present itself publicly.
                </p>
                <p className="text-white/58 text-[15px] md:text-[16px] leading-[1.75]">
                  The platform needed to:
                </p>
              </motion.div>

              {/* Requirements list */}
              <motion.div
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.15 }}
                className="mt-6 max-w-[640px] space-y-3.5"
              >
                {[
                  "Present artists clearly",
                  "Describe services without ambiguity",
                  "Signal credibility to partners",
                  "Allow future artists and services to be added without restructuring",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                    <p className="text-white/58 text-[14px] md:text-[15px] leading-[1.55]">
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                {...fadeUp}
                transition={{ ...baseTrans, delay: 0.18 }}
                className="mt-10 text-white/58 text-[15px] md:text-[16px] leading-[1.75] max-w-[640px]"
              >
                This required building both hierarchy and positioning from the
                ground up.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Research & Strategic Insights — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider position="top" light />

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
            Defining structure through{" "}
            <span className="text-[#161A1F]/58">stakeholder input and industry review</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.75] max-w-[640px] mb-10 md:mb-12"
          >
            To understand how the label should be represented, I
            conducted stakeholder interviews, reviewed comparable independent
            labels, and clarified internal priorities.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.1 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] md:text-[13px] uppercase tracking-[2px] font-medium mb-20 md:mb-28"
          >
            <span className="text-[#161A1F]/58">Stakeholder Interviews</span>
            <div className="w-px h-3 bg-[#161A1F]/10" aria-hidden="true" />
            <span className="text-[#161A1F]/58">Comparative Analysis</span>
            <div className="w-px h-3 bg-[#161A1F]/10" aria-hidden="true" />
            <span className="text-[#161A1F]/58">Goal Definition</span>
          </motion.div>

          {/* Insight Cards — 2x2 grid matching Harmoni research */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                {...fadeUpCard}
                transition={stagger(index)}
                className="relative group"
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

        <SectionDivider position="bottom" light />
      </section>

      {/* ══════════════════════════════════════════════════
          Information Architecture — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Information Architecture
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            Building the structure{" "}
            <span className="text-[#161A1F]/58">from zero</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[600px] mb-16 md:mb-20"
          >
            With no existing platform, the information architecture was defined
            from scratch. I structured the site around three primary categories:
          </motion.p>

          {/* Top-level categories */}
          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-16 md:mb-20"
          >
            {["Artists", "Services", "About"].map((cat) => (
              <span
                key={cat}
                className="px-5 py-2.5 rounded-md border border-[#161A1F]/[0.08] bg-white text-[#161A1F]/72 text-[14px] md:text-[15px] font-medium tracking-[-0.005em]"
              >
                {cat}
              </span>
            ))}
          </motion.div>

          {/* Before / After comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {/* Before */}
            <motion.div
              {...fadeUpCard}
              transition={stagger(0)}
            >
              <div className="relative h-full rounded-lg border border-[#161A1F]/[0.06] bg-white overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-[#161A1F]/[0.05]">
                  <p className="text-[10px] uppercase tracking-[2.4px] text-[#161A1F]/48 font-medium mb-2">
                    Before
                  </p>
                  <h3 className="text-[#161A1F]/72 text-[17px] md:text-[18px] font-medium leading-[1.35]">
                    Unclear hierarchy
                  </h3>
                </div>
                <div className="px-7 md:px-9 py-6 space-y-3.5">
                  {[
                    "Information distributed across external channels",
                    "No centralized presentation",
                    "No navigation logic",
                    "No standardized artist or service format",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#161A1F]/15 mt-2 shrink-0" />
                      <p className="text-[#161A1F]/48 text-[14px] md:text-[15px] leading-[1.55]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              {...fadeUpCard}
              transition={stagger(1)}
            >
              <div className="relative h-full rounded-lg border border-[#161A1F]/[0.08] bg-white overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="px-7 md:px-9 pt-7 md:pt-8 pb-5 border-b border-[#161A1F]/[0.05]">
                  <p className="text-[10px] uppercase tracking-[2.4px] text-[#161A1F]/48 font-medium mb-2">
                    After
                  </p>
                  <h3 className="text-[#161A1F]/92 text-[17px] md:text-[18px] font-medium leading-[1.35]">
                    Defined structure
                  </h3>
                </div>
                <div className="px-7 md:px-9 py-6 space-y-3.5">
                  {[
                    "Dedicated artist section with consistent profile structure",
                    "Defined service pages with clear scope",
                    "Company information consolidated under About",
                    "Repeatable templates for future additions",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#161A1F]/25 mt-2 shrink-0" />
                      <p className="text-[#161A1F]/72 text-[14px] md:text-[15px] leading-[1.55]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.15 }}
            className="mt-14 md:mt-16 text-[#161A1F]/48 text-[15px] md:text-[16px] leading-[1.65] max-w-[560px]"
          >
            Each section was intentionally separated to remove ambiguity and
            clarify what the label offers.
          </motion.p>
        </div>

        <SectionDivider position="bottom" light />
      </section>

      {/* ══════════════════════════════════════════════════
          Structural Decisions
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <AmbientGlow top="30%" height="700px" />

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
            Structural choices that{" "}
            <span className="text-white/58">defined the platform</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-white/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px] mb-20 md:mb-28"
          >
            Each decision addressed a positioning question rather than a visual preference.
          </motion.p>

          <div className="space-y-6 md:space-y-7">
            {decisions.map((decision, index) => (
              <motion.div
                key={decision.title}
                {...fadeUpCard}
                transition={stagger(index, 0.08)}
              >
                <div
                  className="relative rounded-lg border border-white/[0.06] bg-white/[0.015] transition-colors duration-300 hover:bg-white/[0.025] hover:border-white/[0.09] overflow-hidden"
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  <div className="px-7 md:px-9 py-7 md:py-8 flex items-start gap-5 md:gap-6">
                    <span className="font-['Lora',serif] text-white/10 text-[48px] md:text-[56px] leading-none tracking-[-0.03em] shrink-0 -mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-2 pt-1 flex-1">
                      <div className="relative pl-5 border-l-2 border-white/[0.12]">
                        <h3 className="text-white/92 text-[18px] md:text-[20px] font-medium leading-[1.35] tracking-[-0.01em]">
                          {decision.title}
                        </h3>
                      </div>
                      <p className="text-white/58 text-[14px] md:text-[15px] leading-[1.6] pl-5 mt-1">
                        {decision.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionDivider position="bottom" />
      </section>

      {/* ══════════════════════════════════════════════════
          Design System & UI
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <AmbientGlow top="25%" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Design System
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-white/92 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            A restrained visual system{" "}
            <span className="text-white/58">supporting credibility</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-white/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px] mb-20 md:mb-28"
          >
            The visual language supported hierarchy and professionalism rather
            than stylistic experimentation.
          </motion.p>

          {/* Design system subsections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20">
            {[
              {
                label: "Typography",
                title: "Controlled type scale",
                description:
                  "Artist names, section titles, and supporting text were clearly differentiated to guide scanning.",
              },
              {
                label: "Layout",
                title: "Consistent grid system",
                description:
                  "A unified grid structured all page types. Artist and service pages followed repeatable patterns.",
              },
              {
                label: "Color",
                title: "Minimal color use",
                description:
                  "Color highlighted navigation and calls to action. Neutral tones supported readability and kept focus on content.",
              },
            ].map((sub, index) => (
              <motion.div
                key={sub.label}
                {...fadeUpCard}
                transition={stagger(index, 0.06)}
                className="relative group"
              >
                <div className="relative h-full rounded-lg p-6 md:p-7 border border-white/[0.06] bg-white/[0.015]">
                  <p className="text-[11px] uppercase tracking-[2.4px] text-white/48 font-medium mb-5">
                    {sub.label}
                  </p>
                  <h3 className="text-white/92 text-[15px] md:text-[16px] font-medium leading-[1.45] mb-3">
                    {sub.title}
                  </h3>
                  <p className="text-white/48 text-[13px] md:text-[14px] leading-[1.65]">
                    {sub.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUpCard}
            transition={baseTrans}
            className="text-white/48 text-[15px] md:text-[16px] leading-[1.65] max-w-[560px]"
          >
            Reusable components included navigation, artist cards, service
            sections, and footer, ensuring consistency as the site grows.
          </motion.p>

          {/* Screen examples — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-16 md:mt-20">
            <motion.div
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.06 }}
            >
              <div
                className="w-full rounded-lg overflow-hidden border border-white/[0.06]"
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                }}
              >
                <img
                  src={imgNyheter}
                  alt="Nyheter section — live concert photography with artists performing on stage under purple lighting"
                  width={1600}
                  height={932}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.12 }}
            >
              <div
                className="w-full rounded-lg overflow-hidden border border-white/[0.06]"
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                }}
              >
                <img
                  src={imgNewsletter}
                  alt="Newsletter signup section — bold headline over blue gradient with email input"
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

        <SectionDivider position="bottom" />
      </section>

      {/* ══════════════════════════════════════════════════
          Development & Implementation — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">
        <SectionDivider position="top" light />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Development
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            From concept to{" "}
            <span className="text-[#161A1F]/58">launch</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[600px] mb-20 md:mb-28"
          >
            After defining the structure in Figma, I implemented the site and
            prepared it for launch.
          </motion.p>

          {/* Dev subsections — structured card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {[
              {
                id: "01",
                title: "Template based content",
                description:
                  "Artist and service pages used repeatable layouts, reducing duplication and simplifying updates.",
              },
              {
                id: "02",
                title: "Responsive logic",
                description:
                  "Mobile first approach. Navigation adapted to smaller screens. Grids converted to vertical stacks while preserving hierarchy.",
              },
              {
                id: "03",
                title: "Content refinement",
                description:
                  "Text was shortened and clarified. Artist pages emphasized identity and key releases rather than dense descriptions.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.id}
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
                      Implementation
                    </span>
                    <span className="font-['Lora',serif] text-[#161A1F]/15 text-[28px] md:text-[32px] leading-none tracking-[-0.02em]">
                      {item.id}
                    </span>
                  </div>
                  <h3 className="text-[#161A1F]/92 text-[16px] md:text-[17px] font-medium leading-[1.45] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#161A1F]/48 text-[13px] md:text-[14px] leading-[1.65]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionDivider position="bottom" light />
      </section>

      {/* ══════════════════════════════════════════════════
          Measured Impact — Light
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F4F3F0] overflow-hidden">

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-[#161A1F]/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Measured Impact
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[820px] mb-8 md:mb-10"
          >
            First month after{" "}
            <span className="text-[#161A1F]/58">launch</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.08 }}
            className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px] mb-16 md:mb-20"
          >
            The site launched in April 2025. During the first measured month,
            the platform recorded:
          </motion.p>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-20">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                {...fadeUpCard}
                transition={stagger(index, 0.06)}
              >
                <div className="relative rounded-lg border border-[#161A1F]/[0.06] bg-white p-6 md:p-7 text-center transition-colors duration-300 hover:bg-white/80 hover:border-[#161A1F]/[0.09]" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                  <p className="font-['Lora',serif] text-[#161A1F]/92 text-[36px] md:text-[42px] leading-none tracking-[-0.02em] mb-3">
                    {metric.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[2px] text-[#161A1F]/48 font-medium">
                    {metric.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUpCard}
            transition={{ ...baseTrans, delay: 0.06 }}
            className="text-[#161A1F]/48 text-[14px] md:text-[15px] leading-[1.65] max-w-[520px] mb-6"
          >
            Visitors moved beyond the homepage and explored both artist and
            service pages within the same session.
          </motion.p>

          <motion.p
            {...fadeUpCard}
            transition={baseTrans}
            className="text-[#161A1F]/48 text-[14px] md:text-[15px] leading-[1.65] max-w-[520px]"
          >
            These metrics reflect early engagement. Inquiry conversion and long
            term retention were not measured at this stage.
          </motion.p>

          <motion.div {...fadeUpCard} transition={{ ...baseTrans, delay: 0.08 }} className="mt-12 md:mt-14">
            <ResourceLink
              href="https://www.fristilrecords.no/"
              label="See the live site"
              icon={ExternalLink}
              variant="solid"
            />
          </motion.div>
        </div>

        <SectionDivider position="bottom" light />
      </section>

      {/* ══════════════════════════════════════════════════
          Reflection
          ══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#161A1F] overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-28 md:py-36 lg:py-44">
          <motion.p
            {...fadeUp}
            transition={baseTrans}
            className="text-[11px] md:text-[12px] uppercase tracking-[2.8px] text-white/48 font-medium mb-10 md:mb-14"
          >
            Case Study&ensp;&middot;&ensp;Reflection
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="font-['Lora',serif] font-normal text-white/92 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] max-w-[700px] mb-16 md:mb-20"
          >
            Deciding what to{" "}
            <span className="text-white/58">lead with</span>
          </motion.h2>

          <div className="max-w-[600px] space-y-10 md:space-y-12">
            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.08 }}
              className="text-white/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              The most difficult part of this project was deciding what Fristil
              Records should lead with.
            </motion.p>

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.11 }}
              className="text-white/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              Artists, services, and company information all mattered. Giving
              them equal weight made the message unclear. Prioritizing{" "}
              <span className="text-white/75 font-medium">
                artist discovery
              </span>{" "}
              required reducing emphasis elsewhere and formalizing how services
              were described.
            </motion.p>

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.14 }}
              className="text-white/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              Because there was no existing structure, every navigation choice
              defined how the label would be perceived.
            </motion.p>

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.17 }}
              className="text-white/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              Creating{" "}
              <span className="text-white/72 font-medium">
                templates early
              </span>{" "}
              forced consistency and prevented ad hoc content decisions as new
              artists were added.
            </motion.p>

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.20 }}
              className="text-white/58 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              If the project continued, I would measure how visitors move
              between artist profiles and service pages, and whether service
              views translate into direct inquiries.
            </motion.p>

            {/* Thin divider before takeaway */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...baseTrans, delay: 0.23 }}
              aria-hidden="true"
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              }}
            />

            <motion.p
              {...fadeUpCard}
              transition={{ ...baseTrans, delay: 0.26 }}
              className="text-white/72 text-[15px] md:text-[16px] leading-[1.8] tracking-[-0.005em]"
            >
              This project reinforced that{" "}
              <span className="text-white/75 font-medium">
                structure shapes perception
              </span>
              . Visual styling supports credibility, but hierarchy defines it.
            </motion.p>
          </div>

          <BackToProjects />
        </div>
      </section>
    </div>
  );
}
