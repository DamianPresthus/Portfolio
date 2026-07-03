import imgPortrait from "../../assets/optimized/damian-portrait-1200.webp";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import {
  fadeUp,
  fadeUpDelay,
  fadeUpCard,
  baseTrans,
  stagger,
  SectionDivider,
  AmbientGlow,
} from "../components/case-study/shared";

/* ───────────────────────────────────────────────────
   Nav
   ─────────────────────────────────────────────────── */

function AboutNav() {
  return (
    <nav
      aria-label="About page navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-[#161A1F]/80 backdrop-blur-md border-b border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/72 hover:text-white/92 transition-colors duration-200 group"
        >
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <span className="text-[14px] font-medium tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
            Back to home
          </span>
        </Link>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────────────
   Data
   ─────────────────────────────────────────────────── */

const PROFILE_COLUMNS = [
  {
    label: "Role",
    items: ["UX Designer", "Interaction Designer", "Product Designer"],
  },
  {
    label: "Focus",
    items: ["Product structure", "User behaviour", "Interaction clarity"],
  },
  {
    label: "Tools",
    items: ["Figma", "React", "HTML / CSS"],
  },
];

const EXPERIENCE = [
  {
    company: "Apple",
    role: "AIML Data Operations Annotation Analyst",
    meta: "Cork, Ireland \u00b7 Oct 2025 \u2013 Present",
    description:
      "Contribute to improving user experience across Apple\u2019s AI and machine learning products through data annotation and quality evaluation. Analyze language and interaction data to help ensure AI systems interpret user intent accurately.",
  },
  {
    company: "Fristil Records",
    role: "Web Design & Development Intern",
    meta: "Oslo, Norway \u00b7 Jan 2025 \u2013 May 2025",
    description:
      "Designed and developed the first website for the record label, structuring artist presentation and services into a scalable digital platform. The project included user testing, interaction design, and implementation of a responsive website.",
  },
  {
    company: "City Self Storage",
    role: "Customer Service Representative",
    meta: "Oslo, Norway \u00b7 Aug 2022 \u2013 Nov 2024",
    description:
      "Handled customer inquiries and operational issues, developing strong communication and problem-solving skills through direct interaction with users.",
  },
  {
    company: "Prospera Foundation",
    role: "Administrative Assistant",
    meta: "Oslo, Norway \u00b7 Jan 2019 \u2013 Jan 2021",
    description:
      "Worked with website updates, graphic design tasks, and user testing activities. Gained practical experience in UI design, digital content management, and improving user-facing systems.",
  },
];

const PRINCIPLES = [
  {
    title: "Collaboration",
    description:
      "Strong digital products emerge through collaboration between designers, developers, and stakeholders. Working in multidisciplinary teams leads to better decisions and more robust solutions.",
  },
  {
    title: "Accessibility",
    description:
      "Accessibility is a structural requirement of good design. I follow WCAG guidelines and write semantic code so interfaces remain usable for people with different abilities and technologies.",
  },
  {
    title: "Clarity",
    description:
      "Interfaces should guide users without requiring explanation. I focus on hierarchy, navigation structure, and interaction patterns that make it easy to understand what to do next.",
  },
  {
    title: "Evidence",
    description:
      "Design decisions should be grounded in user insight. Through interviews, usability testing, and iteration, I base design changes on observed behaviour rather than assumption.",
  },
];

/* ───────────────────────────────────────────────────
   Page
   ─────────────────────────────────────────────────── */

export default function About() {
  const location = useLocation();

  // Smooth scroll to hash target on mount or hash change
  useEffect(() => {
    if (location.hash) {
      // Small delay to let the page render before scrolling
      const timeout = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#161A1F] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <AboutNav />

      {/* ── SECTION 1 — Intro (Dark) ──────────────────── */}
      <section className="relative pt-32 md:pt-40 pb-0 overflow-hidden">
        <AmbientGlow top="18%" color="rgba(140,170,210,0.012)" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          {/* Eyebrow */}
          <motion.div
            {...fadeUp}
            transition={{ ...baseTrans, delay: 0.05 }}
            className="flex items-center gap-3 mb-16 md:mb-20"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] tracking-[2.4px] uppercase text-white/48 font-medium">
              About
            </p>
          </motion.div>

          {/* Two-column: text + portrait */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-start">
            {/* Left — Headline + Intro */}
            <div className="md:col-span-7 lg:col-span-7 order-2 md:order-1">
              <motion.h1
                {...fadeUpDelay(0.08)}
                className="font-['Lora',serif] font-normal text-white text-[26px] md:text-[36px] lg:text-[44px]"
                style={{ lineHeight: "1.12", letterSpacing: "-0.4px" }}
              >
                Systems should adapt
                <br className="hidden md:block" />
                {" "}to people, not the other
                <br className="hidden md:block" />
                {" "}way around.
              </motion.h1>

              <div className="max-w-[620px] mt-6">
                {/* Lead paragraph — slightly larger, brighter */}
                <motion.p
                  {...fadeUpDelay(0.14)}
                  className="text-white/75 text-[16px] md:text-[17px] leading-[30px]"
                >
                  I design digital products where structure makes it clear what to do next, without explanation.
                </motion.p>

                {/* Body copy */}
                <motion.p
                  {...fadeUpDelay(0.18)}
                  className="text-white/58 text-[15px] md:text-[16px] leading-[28px] mt-4"
                >
                  Working with real interaction data has shaped how I approach design. At Apple, I analyze how people communicate with AI systems, how intent is expressed through language, and how small differences in phrasing change system interpretation.
                </motion.p>
                <motion.p
                  {...fadeUpDelay(0.22)}
                  className="text-white/58 text-[15px] md:text-[16px] leading-[28px] mt-4"
                >
                  Users rarely behave the way systems expect. They adapt, retry, and work around limitations. Observing that has reinforced a simple principle.
                </motion.p>

                {/* Pull quote */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.24 }}
                  className="my-12 border-l-2 border-[#F98E1F]/25 pl-6"
                >
                  <p
                    className="font-['Lora',serif] font-normal text-white/92 text-[20px] md:text-[23px] max-w-[540px]"
                    style={{ lineHeight: "1.45", letterSpacing: "-0.3px" }}
                  >
                    The next step should always be clear.
                  </p>
                </motion.blockquote>

                {/* Continued body copy */}
                <motion.p
                  {...fadeUpDelay(0.28)}
                  className="text-white/58 text-[15px] md:text-[16px] leading-[28px]"
                >
                  My process starts by identifying what the user is trying to achieve, then defining a clear entry point and reducing competing actions. Each flow should feel predictable, intuitive, and easy to navigate.
                </motion.p>
              </div>
            </div>

            {/* Right — Portrait */}
            <div className="md:col-span-5 lg:col-span-5 order-1 md:order-2 flex md:justify-end">
              <motion.div
                {...fadeUpDelay(0.12)}
                className="relative w-full max-w-[390px]"
              >
                {/* Subtle ambient glow behind image */}
                <div
                  className="absolute -inset-8 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, rgba(140,160,190,0.08) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  aria-hidden="true"
                />
                {/* Image container with elevated treatment */}
                <motion.div
                  className="relative rounded-[18px] pt-4 px-4 pb-0 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="rounded-t-xl overflow-hidden">
                    <ImageWithFallback
                      src={imgPortrait}
                      alt="Damian A Praesthus portrait"
                      width={1200}
                      height={1600}
                      loading="eager"
                      className="w-full h-auto object-cover object-top aspect-[3/4] block"
                    />
                  </div>
                </motion.div>

                {/* Name label beneath portrait */}
                <motion.div
                  {...fadeUpDelay(0.2)}
                  className="mt-4 text-center"
                >
                  <p className="text-white/92 text-[15px] font-medium font-['Plus_Jakarta_Sans',sans-serif] tracking-wide">
                    Damian Aaby Præsthus
                  </p>
                  <p className="text-white/48 text-[12px] tracking-[1.6px] uppercase mt-1">
                    UX Designer &amp; Developer
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* ── SECTION 2 — Capabilities (Dark) ─────────── */}
      <section className="relative pt-12 md:pt-16 pb-24 md:pb-32 overflow-hidden">

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">

          {/* Capabilities card */}
          <motion.div
            {...fadeUpDelay(0.2)}
            className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.025) 100%)",
              boxShadow: "0 0 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Top accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            
            <div className="p-8 md:p-10 lg:p-12">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-5 h-px bg-[#F98E1F]/40" />
                <p className="text-[10px] tracking-[2.4px] uppercase text-white/48 font-medium">
                  Capabilities
                </p>
              </div>

              {/* 3-column profile grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
                {PROFILE_COLUMNS.map((col, i) => (
                  <motion.div
                    key={col.label}
                    {...fadeUpCard}
                    transition={stagger(i, 0.08)}
                    className={`${i > 0 ? "sm:border-l sm:border-white/[0.06] sm:pl-10 md:pl-12" : ""} ${i < PROFILE_COLUMNS.length - 1 ? "sm:pr-10 md:pr-12" : ""}`}
                  >
                    <p className="text-[10px] tracking-[2.4px] uppercase text-white/48 font-medium mb-5">
                      {col.label}
                    </p>
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="text-white/72 text-[15px] md:text-[16px] cursor-default"
                          style={{ lineHeight: "1.5" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </motion.div>
        </div>

      </section>

      {/* ── SECTION 3 — Experience (Light) ────────────── */}
      <section className="relative bg-[#F4F3F0] py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-5 h-px bg-[#F98E1F]/30" />
            <p className="text-[11px] tracking-[2.4px] uppercase text-[#161A1F]/48 font-medium">
              Experience
            </p>
          </motion.div>
          <motion.h2
            {...fadeUpDelay(0.06)}
            className="font-['Lora',serif] font-normal text-[#161A1F] text-[24px] md:text-[32px] lg:text-[36px] mb-6"
            style={{ lineHeight: "1.2", letterSpacing: "-0.3px" }}
          >
            Professional background
          </motion.h2>

          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                {...fadeUpCard}
                transition={stagger(i)}
                className="group rounded-xl px-0 md:px-1 py-1"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start">
                  {/* Left — Meta block */}
                  <div className="md:col-span-5">
                    <h3
                      className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[#161A1F] text-[17px] md:text-[18px]"
                      style={{ lineHeight: "1.35" }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      className="text-[14px] md:text-[15px] text-[#161A1F]/58 mt-[5px]"
                      style={{ lineHeight: "1.4" }}
                    >
                      {exp.role}
                    </p>
                    {exp.meta && (
                      <p className="text-[12px] md:text-[13px] text-[#161A1F]/48 mt-[4px]">
                        {exp.meta}
                      </p>
                    )}
                  </div>

                  {/* Right — Description */}
                  <div className="md:col-span-7">
                    <p className="text-[#161A1F]/58 text-[15px] md:text-[16px] leading-[28px] max-w-[540px]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ── SECTION 4 — Education (Dark) ──────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AmbientGlow top="30%" color="rgba(140,170,210,0.01)" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] tracking-[2.4px] uppercase text-white/48 font-medium">
              Education
            </p>
          </motion.div>
          <motion.h2
            {...fadeUpDelay(0.06)}
            className="font-['Lora',serif] font-normal text-white text-[24px] md:text-[32px] lg:text-[36px] mb-6"
            style={{ lineHeight: "1.2", letterSpacing: "-0.3px" }}
          >
            Educational grounding
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16">
            {/* Left — Bachelor */}
            <motion.div
              {...fadeUpDelay(0.12)}
              className="md:col-span-6"
            >
              <p className="text-[11px] tracking-[2.4px] uppercase text-white/48 font-medium mb-6">
                Degree
              </p>
              <h3
                className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-white text-[17px] md:text-[18px]"
                style={{ lineHeight: "1.35" }}
              >
                Bachelor in IT &mdash; Interaction Design
              </h3>
              <p
                className="text-[14px] md:text-[15px] text-white/58 mt-[5px]"
                style={{ lineHeight: "1.4" }}
              >
                Kristiania University of Applied Sciences
              </p>
              <p className="text-[12px] md:text-[13px] text-white/48 mt-[4px]">
                Oslo, Norway &middot; 2022 &ndash; 2025
              </p>
              <p className="text-white/58 text-[15px] md:text-[16px] leading-[28px] mt-5 max-w-[500px]">
                The program focused on user-centred design, interaction design, and front-end development. Coursework included usability testing, digital product development, and information security.
              </p>
            </motion.div>

            {/* Right — Selected Courses */}
            <motion.div
              {...fadeUpDelay(0.18)}
              className="md:col-span-6 md:border-l md:border-white/[0.06] md:pl-16"
            >
              <p className="text-[11px] tracking-[2.4px] uppercase text-white/48 font-medium mb-6">
                Selected Courses
              </p>

              <div className="space-y-7">
                <div>
                  <h4
                    className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/92 text-[15px] md:text-[16px]"
                    style={{ lineHeight: "1.4" }}
                  >
                    AI Data Fairness and Bias
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-white/48 mt-[4px]">
                    LearnQuest &middot; 2026
                  </p>
                </div>

                <div>
                  <h4
                    className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/92 text-[15px] md:text-[16px]"
                    style={{ lineHeight: "1.4" }}
                  >
                    AI, Business &amp; the Future of Work
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-white/48 mt-[4px]">
                    Lund University &middot; 2026
                  </p>
                </div>

                <div>
                  <h4
                    className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/92 text-[15px] md:text-[16px]"
                    style={{ lineHeight: "1.4" }}
                  >
                    AI: Ethics &amp; Societal Challenges
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-white/48 mt-[4px]">
                    Lund University &middot; 2025
                  </p>
                </div>

                <div>
                  <h4
                    className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-white/92 text-[15px] md:text-[16px]"
                    style={{ lineHeight: "1.4" }}
                  >
                    Google UX Design Certificate
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-white/48 mt-[4px]">
                    Coursera &middot; 2023
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <SectionDivider position="inline" />
        </div>
      </section>

      {/* ── SECTION 5 — Design Principles (Dark) ─────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AmbientGlow top="40%" color="rgba(140,170,210,0.01)" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
          <motion.div
            {...fadeUp}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <p className="text-[11px] tracking-[2.4px] uppercase text-white/48 font-medium">
              Principles
            </p>
          </motion.div>
          <motion.h2
            {...fadeUpDelay(0.06)}
            className="font-['Lora',serif] font-normal text-white text-[24px] md:text-[32px] lg:text-[36px] mb-6"
            style={{ lineHeight: "1.2", letterSpacing: "-0.3px" }}
          >
            How I approach design
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUpCard}
                transition={stagger(i, 0.08)}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 md:p-8"
              >
                <div className="w-8 h-8 rounded-full bg-[#F98E1F]/[0.08] border border-[#F98E1F]/[0.12] flex items-center justify-center mb-5">
                  <span className="text-[12px] font-medium text-[#F98E1F]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="font-['Lora',serif] font-normal text-white text-[18px] md:text-[20px] mb-3"
                  style={{ lineHeight: "1.3" }}
                >
                  {p.title}
                </h3>
                <p className="text-white/58 text-[14px] leading-[24px]">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <SectionDivider position="inline" />
        </div>
      </section>

    </div>
  );
}
