import { motion, MotionConfig } from "motion/react";

import imgV2Home from "figma:asset/8bcf6d47ead6e4a649fc8a16abc1da242b61040f.png";
import imgOnboarding from "../../assets/harmoni/onboarding.png";
import imgFramedOnboarding from "figma:asset/09863dc3638a4cd55c70eb4dbf183102e48dfff3.png";
import imgFramedHome from "figma:asset/0017b3730e543b50eba675afb9ad48715cc403b2.png";
import imgMood from "figma:asset/b90a02378d8c4bf4295101f31ec3c8a0706daef4.png";
import imgProfil from "figma:asset/65a0c25c35deea4988b0c3ac985e3897da830f59.png";
import imgPodcast from "figma:asset/0a9cce5ad50bc3019c72c76b1dcdf40881385c0f.png";
import imgIA from "figma:asset/36e7b634f62b6307b2649df71f4bbefad33e540c.png";
import imgV1Hjem from "../../assets/harmoni/v1-hjem-skjerm.png";
import imgCropScales from "../../assets/harmoni/crop-scales.png";
import imgCropTypeA from "../../assets/harmoni/crop-type-a.png";
import imgCropTypeB from "../../assets/harmoni/crop-type-b.png";
import imgCropTypeButtons from "../../assets/harmoni/crop-type-buttons.png";
import imgCropProgresjon from "../../assets/harmoni/crop-progresjon.png";

import {
  CaseStudyNav,
  CaseStudyHero,
  ResourceLink,
  NextProjectNav,
  caseStudyNav,
  MONO,
  H2,
  H3_ROW,
  H4_STEP,
  SectionEyebrow,
  FigCaption,
  Well,
  drawParent,
  drawRule,
  type CaseStudySection,
} from "../components/case-study/shared";

const HARMONI_LIGHT = "var(--proj-harmoni-light)";

const SECTIONS: CaseStudySection[] = [
  { id: "context", label: "Context" },
  { id: "understanding", label: "Understanding" },
  { id: "moving", label: "Navigation" },
  { id: "flow", label: "Flow" },
  { id: "testing", label: "Testing" },
  { id: "system", label: "System" },
  { id: "outcome", label: "Outcome" },
];

const prototypeUrl =
  "https://www.figma.com/proto/bPH9Iw8WCGkhd2K7J13m7w/Design-Prosjekt?node-id=770-1244&t=WANB5iXtnuuBcMqx-1";
const figmaFileUrl =
  "https://www.figma.com/design/bPH9Iw8WCGkhd2K7J13m7w/Design-Prosjekt?node-id=770-1244&t=WANB5iXtnuuBcMqx-1";

/* Prose measure for the whole page (the case-study reading system's
   580–620px rule). Heading scale (H2/H3/H4) is imported from shared. */
const PROSE_LIGHT = "max-w-[620px] text-[16px] leading-[1.75] text-ink/72";
const PROSE_DARK = "max-w-[620px] text-[16px] leading-[1.75] text-white/64";

const firstSessionFlow = [
  {
    step: "01",
    title: "Welcome",
    description: "A short introduction explains what Harmoni offers.",
    imageSrc: imgOnboarding,
    imageAlt: "Harmoni welcome screen with illustration and Kom i gang button",
  },
  {
    step: "02",
    title: "Browse podcasts",
    description: "The podcast screen uses the same navigation and content hierarchy as the home screen.",
    imageSrc: imgPodcast,
    imageAlt: "Harmoni podcast screen with search, popular episodes, and new releases",
  },
  {
    step: "03",
    title: "Review progress",
    description: "The profile gives users an overview of their recent mood entries and active days.",
    imageSrc: imgProfil,
    imageAlt: "Harmoni profile screen with progress and active-day cards",
  },
  {
    step: "04",
    title: "Track mood",
    description: "The weekly view shows how the user’s recorded mood has changed over time.",
    imageSrc: imgMood,
    imageAlt: "Harmoni mood screen showing recent entries and a weekly chart",
  },
];

const testingFindings = [
  {
    title: "Råd og tips was difficult to find",
    text: "Four of the five participants struggled to find the section about signs of mental health difficulties. We moved Råd og tips to a more visible position in the main navigation.",
  },
  {
    title: "Static screens appeared scrollable",
    text: "Several participants tried to scroll screens that did not move. We made longer screens scrollable and arranged related content vertically on the same page.",
  },
  {
    title: "The opening screens needed more guidance",
    text: "Participants asked for a clearer introduction, more imagery, and more spacing. We added a short introduction and gave the content more room in the final prototype.",
  },
];

/* Accent underlines drawn on the revised home screen. Percentages
   locate the marks on the 786×1704 export: the Råd & Tips tab that
   moved into the main navigation, and the Dagens øvelse headline the
   redesign made dominant. Both labels are visible in the frame. */
const v2Marks = [
  { left: "76.8%", width: "18%", top: "12.9%" },
  { left: "4.2%", width: "50%", top: "21.4%" },
];

export default function HarmoniCaseStudy() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink font-['Plus_Jakarta_Sans',sans-serif] antialiased">
        <CaseStudyNav sections={SECTIONS} />

        <CaseStudyHero
          lightVar="--proj-harmoni-light"
          eyebrow="Four-person school project · Kristiania"
          title="Harmoni"
          lede="A mental health concept for small, manageable steps in everyday life."
          body="Harmoni was a school project I worked on together with three other students. We explored how a mental health app could support young adults experiencing mild to moderate mental health difficulties. We researched the concept, created the information architecture, and designed a clickable Figma prototype that we tested with five participants."
          stats={[
            { value: "4", label: "Student team members", targetId: "context" },
            { value: "5", label: "Usability test participants", targetId: "testing" },
            { value: "Figma", label: "Prototype deliverable", targetId: "outcome" },
          ]}
          actions={
            <>
              <ResourceLink href={prototypeUrl} label="Open Figma prototype" tone="dark" />
              <ResourceLink href={figmaFileUrl} label="View Figma file" tone="dark" />
            </>
          }
          media={
            <div className="flex items-center justify-center gap-3 md:gap-5 lg:gap-6">
              <div className="w-[42%] max-w-[280px]">
                <img
                  src={imgFramedOnboarding}
                  alt="Harmoni app onboarding screen showing a friendly wave illustration"
                  loading="eager"
                  decoding="async"
                  className="block h-auto w-full"
                  style={{
                    filter:
                      "drop-shadow(0 24px 48px rgba(0,0,0,0.5)) drop-shadow(0 8px 18px rgba(0,0,0,0.35))",
                  }}
                />
              </div>
              <div className="w-[44%] max-w-[300px] -translate-y-5 scale-[0.975] md:-translate-y-8">
                <img
                  src={imgFramedHome}
                  alt="Harmoni app homepage showing daily exercise overview"
                  loading="eager"
                  decoding="async"
                  className="block h-auto w-full"
                  style={{
                    filter:
                      "drop-shadow(0 24px 48px rgba(0,0,0,0.5)) drop-shadow(0 8px 18px rgba(0,0,0,0.35))",
                  }}
                />
              </div>
            </div>
          }
        />

        {/* ── The paper spine: context → IA band → home-screen evidence.
            Dark returns only for the key-screens reveal; reference
            material (IA, design system) sits on recessed well bands. ── */}

        <section id="context" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="01" label="Project methods and process" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className={`${H2} text-ink`}>
                  A user-centred, iterative process
                </h2>
              </div>
              <div className="space-y-5 lg:col-span-5">
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  We used a user-centred design process throughout the project. Before moving into visual detail, we used conceptual modelling to define the app&apos;s content, functions, and navigation. This gave us a shared structure to build the prototype from.
                </p>
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  We then tested the prototype with five participants through task-based usability sessions. I helped document interviews, time spent, clicks, and navigation issues, then used the findings with the team to refine the flow, add scrolling where it was expected, and make the navigation clearer.
                </p>
              </div>
            </div>

            {/* Project metadata as a colophon strip, not content cards. */}
            <div className="mt-14 grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {[
                ["Audience", "Young adults with mild to moderate mental health difficulties, plus people supporting a friend"],
                ["Project work", "Research, wireframes, information architecture, high-fidelity prototyping, and usability testing"],
                ["Project scope", "School project ending in a high-fidelity Figma prototype"],
                ["Team", "Damian Præsthus, Mark Daniel Reyes, Elin Halvorsen, Henrik Bjørbekk"],
              ].map(([label, value]) => (
                <div key={label} className="py-5 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <p className={`${MONO} mb-2.5 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>{label}</p>
                  <p className="text-[14px] leading-[1.6] text-ink/72">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reference interlude: the IA map recessed into the file — a
            tonal band, not a polarity flip. */}
        <section
          id="understanding"
          className="paper-surface relative w-full scroll-mt-20 overflow-hidden"
          style={{ backgroundColor: "var(--surface-paper-well)" }}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-14 md:px-12 md:py-16 lg:px-16">
            <SectionEyebrow index="02" label="App structure" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className={`${H2} text-ink`}>
                  Introducing Harmoni without overwhelming the user
                </h2>
                <p className={`mt-6 ${PROSE_LIGHT}`}>
                  Harmoni included exercises, articles, podcasts, mood tracking, peer support, and advice for helping a friend. With several features competing for attention, the opening screens needed to communicate what the app offered and where the user should begin. We grouped the features into clear sections and used the home screen as the main starting point for the daily exercise.
                </p>
                <div className="mt-8 border-l-2 border-[rgb(var(--proj-harmoni-light)/0.55)] pl-5">
                  <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Interface language</p>
                  <p className="text-[14px] leading-[1.75] text-ink/58">
                    The prototype was designed in Norwegian. Key labels shown in the case study include “Dagens øvelse” for Today’s exercise, “Råd og tips” for Advice and tips, and “Hjelp en venn” for Help a friend.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-4 md:p-5">
                  <img
                    src={imgIA}
                    alt="Harmoni information architecture diagram showing onboarding, home, exercises, support, and profile areas"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px]"
                  />
                </div>
                <FigCaption fig="02" className="mt-4">
                  The information architecture connects onboarding, the home screen, support, exercises, and profile tools.
                </FigCaption>
              </div>
            </div>
          </div>
        </section>

        <section id="moving" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="03" label="Home screen" />
            <div>
              <h2 className={`${H2} max-w-[820px] text-ink`}>
                Making the starting point clearer
              </h2>
              <p className={`mt-6 ${PROSE_LIGHT}`}>
                In the tested wireframe, the daily exercise, activities, and support chat competed for attention. Participants also tried to scroll screens that were static. In the revised design, we made the daily exercise more prominent and allowed the home screen to scroll, placing secondary content further down the page.
              </p>
            </div>

            {/* The core evidence: the tested wireframe beside the
                revised design, with drawn marks on what changed — the
                dominant Dagens øvelse and the Råd & Tips tab that moved
                into the main navigation. */}
            <motion.div {...drawParent} className="mt-12 grid max-w-[760px] grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Tested wireframe</p>
                <Well className="p-2.5 md:p-3">
                  <img
                    src={imgV1Hjem}
                    alt="Tested Harmoni home wireframe"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px]"
                  />
                </Well>
              </div>
              <div>
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Revised home screen</p>
                <Well light={HARMONI_LIGHT} className="p-2.5 md:p-3">
                  <div className="relative">
                    <img
                      src={imgV2Home}
                      alt="Revised Harmoni home screen with Dagens øvelse as the dominant action and Råd & Tips in the main navigation"
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-[6px]"
                    />
                    {v2Marks.map((mark) => (
                      <motion.div
                        key={mark.top}
                        variants={drawRule}
                        className="absolute h-[2px] origin-left rounded-full bg-accent"
                        style={{ left: mark.left, width: mark.width, top: mark.top }}
                      />
                    ))}
                  </div>
                </Well>
              </div>
            </motion.div>
            <FigCaption fig="03" className="mt-5 max-w-[760px]">
              The tested home screen wireframe and the revised high-fidelity design.
            </FigCaption>
          </div>
        </section>

        {/* ── The one dark interlude: the finished screens under studio
            light. ── */}
        <section id="flow" className="bench-surface relative w-full scroll-mt-20 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgb(var(--proj-harmoni-light) / 0.06), transparent 65%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="04" label="Key screens" dark />
            <div>
              <h2 className={`${H2} max-w-[760px] text-white`}>
                From introduction to mood tracking
              </h2>
              <p className={`mt-6 ${PROSE_DARK}`}>
                These screens show how users are introduced to Harmoni, then move into the podcast, profile, and mood tools using the same navigation and content hierarchy as the home screen.
              </p>
            </div>

            <motion.div {...drawParent} className="mt-12">
              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-0 lg:overflow-visible lg:pb-0">
                {firstSessionFlow.map((step, index) => (
                  <div key={step.step} className="contents">
                    {index > 0 && (
                      <div aria-hidden="true" className="hidden items-center self-center px-3 lg:flex xl:px-4">
                        <motion.div
                          variants={drawRule}
                          className="h-px w-8 origin-left xl:w-10"
                          style={{ background: "rgb(var(--proj-harmoni-light) / 0.35)" }}
                        />
                      </div>
                    )}
                    <div className="w-[62vw] max-w-[225px] shrink-0 snap-center lg:w-auto lg:max-w-none">
                      <p className={`${MONO} mb-3 text-[10px] tabular-nums tracking-[0.08em] text-white/40`}>{step.step}</p>
                      <Well dark light={HARMONI_LIGHT} className="w-full max-w-[235px] p-2">
                        <img
                          src={step.imageSrc}
                          alt={step.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="block h-auto w-full rounded-[8px]"
                        />
                      </Well>
                      <h3 className={`mt-4 ${H4_STEP} text-white/92`}>{step.title}</h3>
                      <p className="mt-2 max-w-[235px] text-[12px] leading-[1.65] text-white/48">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <FigCaption fig="04" dark className="mt-8">
                Welcome, podcast, profile, and mood screens shown in full.
              </FigCaption>
            </motion.div>
          </div>
        </section>

        <section id="testing" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="05" label="User testing" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className={`${H2} text-ink`}>
                  Where participants hesitated
                </h2>
                <p className={`mt-6 ${PROSE_LIGHT}`}>
                  We tested the wireframes with five participants aged 19 to 44. Each session lasted around 20 minutes and focused on whether participants understood the app’s purpose, could find its main features, and could complete common tasks without help.
                </p>
                <p className={`mt-5 ${PROSE_LIGHT}`}>
                  Participants completed ten tasks across onboarding, content discovery, support features, the daily exercise, and mood tracking. One team member moderated while the rest of us observed and documented where participants hesitated or needed help.
                </p>
              </div>

              <div className="grid content-start gap-4 lg:col-span-7">
                {testingFindings.map((finding, index) => (
                  <div
                    key={finding.title}
                    className="grid grid-cols-[40px_1fr] gap-5 rounded-[12px] border border-ink/8 bg-paper-raised p-6"
                  >
                    <span className={`${MONO} text-[11px] tabular-nums text-ink/36`}>0{index + 1}</span>
                    <div>
                      <h3 className={`mb-2 ${H3_ROW} text-ink/92`}>{finding.title}</h3>
                      <p className="text-[14px] leading-[1.7] text-ink/64">{finding.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 max-w-[620px] rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7">
              <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Testing limitations</p>
              <p className="text-[15px] leading-[1.7] text-ink/64">
                The participant group was small and did not include mental health professionals. Because we only tested the wireframes once, the changes in the high-fidelity prototype were not validated in a second round.
              </p>
            </div>
          </div>
        </section>

        {/* Second reference interlude: the design system as curated
            specimens on the recessed band — not full boards. */}
        <section
          id="system"
          className="paper-surface relative w-full scroll-mt-20 overflow-hidden"
          style={{ backgroundColor: "var(--surface-paper-well)" }}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-14 md:px-12 md:py-16 lg:px-16">
            <SectionEyebrow index="06" label="Visual system" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className={`${H2} text-ink`}>
                  A colourful but calm visual system
                </h2>
                <p className={`mt-6 ${PROSE_LIGHT}`}>
                  Participants asked for more imagery, colour, and spacing. In the high-fidelity prototype, we responded with a softer palette, nature photography, and more room between elements.
                </p>
                <p className={`mt-5 ${PROSE_LIGHT}`}>
                  We used blue as the primary interface colour, green for progress, yellow for warnings, and red only for emergency information. Most screens use neutral backgrounds so the semantic colours stand out clearly.
                </p>
                <p className={`mt-5 ${PROSE_LIGHT}`}>
                  Clarendon is used for the main headings, while Space Grotesk is used throughout the interface. Differences in size and weight create a clear hierarchy between headings, body text, labels, and buttons.
                </p>

                {/* Colour doing its job in the product: the green
                    progress card from the Profil screen. */}
                <figure className="mt-8 m-0 max-w-[340px]">
                  <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-2.5">
                    <img
                      src={imgCropProgresjon}
                      alt="Målinger for psykisk helse cards from the Profil screen — a green Status card showing 60% Fremgang beside the Humør card"
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-[6px]"
                    />
                  </div>
                  <FigCaption fig="05" className="mt-3">
                    Progress cards from the Profil screen — green marks Fremgang (progress).
                  </FigCaption>
                </figure>
              </div>

              <div className="lg:col-span-7">
                <div>
                  <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-4 md:p-5">
                    <img
                      src={imgCropScales}
                      alt="Harmoni colour scales — primary, grey, green for success, red for danger, and yellow for warning"
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-[6px]"
                    />
                  </div>
                  <FigCaption fig="06" className="mt-3">
                    Neutral, primary, and semantic colour scales used in the prototype.
                  </FigCaption>
                </div>

                <div className="mt-8">
                  <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-4 md:p-5">
                    <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-start sm:gap-5 md:gap-7">
                      <img
                        src={imgCropTypeA}
                        alt="Harmoni headline styles H1 to H5 with sizes"
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full min-w-0 rounded-[4px] sm:w-auto sm:flex-1"
                      />
                      <img
                        src={imgCropTypeB}
                        alt="Harmoni subtitle, body, caption, and label styles with sizes"
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full min-w-0 rounded-[4px] sm:w-auto sm:flex-1"
                      />
                      <img
                        src={imgCropTypeButtons}
                        alt="Harmoni button text styles from Giant to Tiny with sizes"
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full min-w-0 rounded-[4px] sm:w-auto sm:flex-1"
                      />
                    </div>
                  </div>
                  <FigCaption fig="07" className="mt-3">
                    Heading, body, label, caption, and button styles.
                  </FigCaption>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outcome" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="07" label="Final prototype" />
            <div>
              <h2 className={`${H2} max-w-[760px] text-ink`}>
                What we delivered
              </h2>
              <p className={`mt-6 ${PROSE_LIGHT}`}>
                We finished the project with a high-fidelity Figma prototype based on the issues found during wireframe testing. In the completed design, we moved Råd og tips to a more prominent position, added scrolling where participants expected it, and made the daily exercise the main action on the home screen.
              </p>

              <div className="mt-10 max-w-[620px] rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7">
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Next step</p>
                <p className="text-[15px] leading-[1.7] text-ink/64">
                  Test the high-fidelity prototype with a broader participant group and check whether users can find Råd og tips, understand the introduction, and begin the daily exercise without guidance.
                </p>
              </div>
            </div>

            <NextProjectNav {...caseStudyNav("/work/harmoni")} light />
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
