import type { ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";
import {
  CaseStudyNav,
  CaseStudyHero,
  ResourceLink,
  NextProjectNav,
  caseStudyNav,
  fadeUp,
  fadeUpCard,
  baseTrans,
  MONO,
  H2,
  H3_ROW,
  H3_CARD,
  H3_SERIF,
  type CaseStudySection,
} from "../components/case-study/shared";
import imgDashboard from "../../assets/corruption-fighter/Dashboardet - Hovedsiden.png";
import imgProfile from "../../assets/corruption-fighter/Min profil.png";
import imgOwnerForm from "../../assets/corruption-fighter/Eierinteresse - registreringsskjema.png";
import imgOwnerComplete from "../../assets/corruption-fighter/Eierinteresser - fullført.png";
import imgRelationsComplete from "../../assets/corruption-fighter/Relasjoner - fullført.png";
import imgReportComplete from "../../assets/corruption-fighter/Fullført selvrapportering.png";
import imgComponents from "../../assets/corruption-fighter/Frame 11.png";

const SECTIONS: CaseStudySection[] = [
  { id: "brief", label: "Brief" },
  { id: "research", label: "Research" },
  { id: "direction", label: "Direction" },
  { id: "experience", label: "Experience" },
  { id: "outcome", label: "Outcome" },
];

const prototypeUrl =
  "https://www.figma.com/design/08elcpG59bA3DvHJN3qPoq/Prototype?node-id=0-1&t=9BE54rSFGwTh15XW-1";

function Eyebrow({ index, children, dark = false }: { index: string; children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`${MONO} mb-8 text-[11px] font-medium uppercase tracking-[0.08em] tabular-nums ${
        dark ? "text-white/48" : "text-ink/48"
      }`}
    >
      {index}&ensp;·&ensp;{children}
    </p>
  );
}

function Caption({ fig, children, dark = false }: { fig: string; children: ReactNode; dark?: boolean }) {
  return (
    <figcaption
      className={`${MONO} mt-4 text-[11px] leading-[1.65] tracking-[0.04em] ${
        dark ? "text-white/48" : "text-ink/48"
      }`}
    >
      <span className={dark ? "text-white/58" : "text-ink/58"}>FIG {fig}</span>
      &ensp;·&ensp;{children}
    </figcaption>
  );
}

function Figure({
  src,
  alt,
  fig,
  caption,
  className = "",
  dark = false,
  eager = false,
}: {
  src: string;
  alt: string;
  fig: string;
  caption: ReactNode;
  className?: string;
  dark?: boolean;
  eager?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={`overflow-hidden rounded-[12px] border ${
          dark ? "bg-ink-well border-white/[0.07]" : "bg-paper-well border-ink/8"
        }`}
      >
        <img
          src={src}
          alt={alt}
          width={1512}
          height={982}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <Caption fig={fig} dark={dark}>{caption}</Caption>
    </figure>
  );
}

const findings = [
  {
    index: "01",
    title: "Users may not remember the process",
    text: "Because users may return only when their circumstances change, the interface could not rely on them remembering the process. Each visit therefore needed clear instructions and an obvious starting point.",
  },
  {
    index: "02",
    title: "Users have different levels of experience",
    text: "KPMG described users across different ages, roles, and sectors. We therefore avoided assuming prior knowledge when writing instructions and structuring the flow. Participants with different backgrounds were included in the testing sessions.",
  },
  {
    index: "03",
    title: "Participants needed more guidance",
    text: "Testing showed that first-time users needed clearer explanations inside the forms and clearer next steps.",
  },
];

const principles = [
  {
    index: "01",
    title: "Show all disclosure categories",
    text: "This gives users an overview of the reporting process and helps them see where to begin and what remains.",
  },
  {
    index: "02",
    title: "Provide clear next actions",
    text: "Use clearly labelled actions so users know whether they are adding another item, continuing to the next step, or returning to the dashboard.",
  },
  {
    index: "03",
    title: "Provide guidance in context",
    text: "Place short explanations before each disclosure category and beside fields that may need clarification.",
  },
];

export default function CorruptionFighterCaseStudy() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink font-['Plus_Jakarta_Sans',sans-serif] antialiased">
        <CaseStudyNav sections={SECTIONS} />

        <CaseStudyHero
          lightVar="--proj-corruption-fighter-light"
          eyebrow="Student collaboration · KPMG"
          title="Corruption Fighter"
          lede="A portal concept designed to make sensitive disclosures easier to understand and complete."
          body="KPMG asked our student team to explore ideas for a new version of its Corruption Fighter portal. We developed and tested a Figma prototype covering ownership interests, organisational roles, personal relationships, and other disclosures. The project ended with design recommendations rather than a production build."
          stats={[
            { value: "4", label: "Disclosure categories", targetId: "direction" },
            { value: "ITERATIVE", label: "Usability testing", targetId: "research" },
            { value: "Figma", label: "Prototype deliverable", targetId: "outcome" },
          ]}
          actions={
            <ResourceLink href={prototypeUrl} label="View test prototype" tone="dark" />
          }
          media={
            <Figure
              src={imgDashboard}
              alt="Corruption Fighter dashboard concept showing four disclosure categories and a start registration action"
              fig="01"
              caption="The proposed dashboard before the user begins a disclosure."
              dark
              eager
            />
          }
        />

        <section id="brief" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="paper-grid-echo" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-20 md:px-12 md:py-28 lg:px-16">
            <Eyebrow index="01">Project brief</Eyebrow>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <motion.div {...fadeUp} transition={baseTrans} className="lg:col-span-7">
                <h2 className={`max-w-[760px] ${H2} text-ink`}>
                  Clarifying what to disclose and why
                </h2>
              </motion.div>
              <motion.div {...fadeUpCard} transition={{ ...baseTrans, delay: 0.08 }} className="space-y-6 lg:col-span-5">
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  Corruption Fighter supports self-reporting of circumstances that may affect a person&rsquo;s impartiality. The portal is intended for employees, leaders, and board members across public and private organisations who may need to disclose ownership interests, organisational roles, or personal relationships.
                </p>
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  Users needed more than a set of forms. They needed to understand why each question was asked, what information was relevant, and when their disclosure was complete.
                </p>
              </motion.div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                ["Team", "Student team working with KPMG as the project stakeholder"],
                ["Project work", "Research, wireframes, Figma prototyping, and iterative usability testing"],
                ["Project scope", "Figma prototype and design recommendations"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  {...fadeUpCard}
                  transition={{ ...baseTrans, delay: index * 0.06 }}
                  className="rounded-[10px] border border-ink/8 bg-paper-raised p-6"
                >
                  <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>{label}</p>
                  <p className="text-[15px] leading-[1.65] text-ink/72">{value}</p>
                </motion.div>
              ))}
            </div>

            <motion.p {...fadeUp} transition={{ ...baseTrans, delay: 0.1 }} className="mt-10 max-w-[850px] text-[15px] leading-[1.75] text-ink/58">
              This was a shared team project, so I use &ldquo;we&rdquo; throughout when describing the design work.
            </motion.p>
          </div>
        </section>

        <section id="research" className="relative w-full scroll-mt-20 overflow-hidden bg-ink">
          <div className="mx-auto max-w-[1200px] px-8 py-20 md:px-12 md:py-28 lg:px-16">
            <Eyebrow index="02" dark>Research and testing</Eyebrow>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <motion.div {...fadeUp} transition={baseTrans} className="lg:col-span-5">
                <h2 className={`${H2} text-white`}>
                  Designing for infrequent use
                </h2>
                <p className="mt-6 text-[16px] leading-[1.75] text-white/64">
                  We developed wireframes for the landing page, dashboard, profile, and disclosure forms. During each sprint, every team member tested the clickable prototype with between one and three participants. We asked participants to think aloud as they moved through the flow.
                </p>
              </motion.div>
              <div className="grid gap-4 lg:col-span-7">
                {findings.map((finding, index) => (
                  <motion.div
                    key={finding.index}
                    {...fadeUpCard}
                    transition={{ ...baseTrans, delay: index * 0.07 }}
                    className="grid grid-cols-[44px_1fr] gap-5 rounded-[10px] border border-white/[0.08] bg-white/[0.025] p-6"
                  >
                    <span className={`${MONO} text-[11px] tabular-nums text-white/36`}>{finding.index}</span>
                    <div>
                      <h3 className={`mb-2 ${H3_ROW} text-white/92`}>{finding.title}</h3>
                      <p className="text-[15px] leading-[1.7] text-white/58">{finding.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="direction" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-8 py-20 md:px-12 md:py-28 lg:px-16">
            <Eyebrow index="03">Design response</Eyebrow>
            <motion.div {...fadeUp} transition={baseTrans} className="max-w-[820px]">
              <h2 className={`${H2} text-ink`}>
                Three changes shaped by testing
              </h2>
              <p className="mt-6 max-w-[720px] text-[16px] leading-[1.75] text-ink/72">
                We reorganised the dashboard, clarified the available actions inside each form, and made saved information visible.
              </p>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.index}
                  {...fadeUpCard}
                  transition={{ ...baseTrans, delay: index * 0.07 }}
                  className="border-t border-ink/12 pt-5"
                >
                  <p className={`${MONO} mb-5 text-[11px] tabular-nums text-ink/36`}>{principle.index}</p>
                  <h3 className={`mb-3 ${H3_CARD} text-ink/92`}>{principle.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-ink/64">{principle.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-7 lg:grid-cols-2">
              <motion.div {...fadeUp} transition={baseTrans}>
                <Figure
                  src={imgDashboard}
                  alt="Dashboard showing four disclosure categories with zero items and a start registration button"
                  fig="02"
                  caption="Item counts and completion states show what has been saved and what remains."
                />
              </motion.div>
              <motion.div {...fadeUp} transition={{ ...baseTrans, delay: 0.08 }}>
                <Figure
                  src={imgProfile}
                  alt="Separate profile page with personal details and employer information"
                  fig="03"
                  caption="Profile information moved away from the dashboard so the main view could focus on reporting status."
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" className="relative w-full scroll-mt-20 overflow-hidden bg-ink">
          <div className="mx-auto max-w-[1200px] px-8 py-20 md:px-12 md:py-28 lg:px-16">
            <Eyebrow index="04" dark>Proposed portal experience</Eyebrow>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <motion.div {...fadeUp} transition={baseTrans} className="lg:col-span-5">
                <h2 className={`${H2} text-white`}>
                  A consistent structure across disclosure categories
                </h2>
                <p className="mt-6 text-[16px] leading-[1.75] text-white/64">
                  Each disclosure category follows the same structure. Users first receive a short explanation of what the category covers and what information may be relevant. They complete the form and choose whether to add another item, return, or continue. Saved information and category status appear on the dashboard.
                </p>
              </motion.div>
              <motion.div {...fadeUp} transition={{ ...baseTrans, delay: 0.08 }} className="lg:col-span-7">
                <Figure
                  src={imgOwnerForm}
                  alt="Ownership interest form with explanatory text, required fields, and three explicit completion actions"
                  fig="04"
                  caption="The ownership form combines contextual guidance with three clear actions: return, add another item, or continue."
                  dark
                />
              </motion.div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
              <Figure
                src={imgOwnerComplete}
                alt="Ownership interests category showing one saved item and a completion check"
                fig="05A"
                caption="A saved ownership item with updated category status."
                dark
              />
              <Figure
                src={imgRelationsComplete}
                alt="Relationships category showing a completed saved relationship"
                fig="05B"
                caption="A saved relationship disclosure using the same status pattern."
                dark
              />
              <Figure
                src={imgReportComplete}
                alt="Confirmation dialog thanking the user for updating the disclosure register"
                fig="05C"
                caption="The confirmation shown after the disclosure is submitted."
                dark
              />
            </div>

            <motion.div {...fadeUp} transition={{ ...baseTrans, delay: 0.08 }} className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-white/48`}>Component system</p>
                <h3 className={`${H3_SERIF} text-white`}>
                  Reusable components for forms, guidance, and status
                </h3>
                <p className="mt-5 text-[15px] leading-[1.75] text-white/58">
                  The prototype used KPMG&rsquo;s blue palette for navigation, buttons, and category states. We reused the same form controls and information panels for all four disclosure types, while reserving red for warnings.
                </p>
              </div>
              <div className="lg:col-span-7">
                <figure>
                  <div className="max-h-[560px] overflow-hidden rounded-[12px] border border-white/[0.07] bg-white/[0.03]">
                    <img
                      src={imgComponents}
                      alt="Corruption Fighter component board showing colours, typography, buttons, category states, and warning patterns"
                      width={1780}
                      height={3204}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </div>
                  <Caption fig="06" dark>Components and visual rules used across the prototype.</Caption>
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="outcome" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-8 py-20 md:px-12 md:py-28 lg:px-16">
            <Eyebrow index="05">Outcome and next steps</Eyebrow>
            <motion.div {...fadeUp} transition={baseTrans} className="max-w-[760px]">
              <h2 className={`${H2} text-ink`}>
                Outcome and remaining questions
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-ink/72">
                We delivered a clickable Figma prototype and a set of design recommendations. Testing suggested that participants could move through the main reporting flow, but some still needed more help completing the detailed disclosure forms.
              </p>
              <p className="mt-5 text-[16px] leading-[1.75] text-ink/72">
                Because the task is sensitive and may be completed infrequently, the guidance needs to explain what information is relevant and what users should do next. The next round should test whether those explanations appear at the right point and help users complete the forms without additional support.
              </p>
              <div className="mt-8 max-w-[600px] border-t border-ink/10 pt-6">
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Limitations</p>
                <p className="text-[15px] leading-[1.7] text-ink/64">
                  Because the project ended with a Figma prototype, we could not measure business outcomes, client adoption, or real world use. Participant numbers were recorded during each sprint but were not totalled across the full project.
                </p>
              </div>
            </motion.div>

            <NextProjectNav {...caseStudyNav("/work/corruption-fighter")} light />
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
