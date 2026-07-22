import { motion, MotionConfig } from "motion/react";

import imgHandlelisteVisning from "../../assets/matspar/handleliste-visning.webp";
import imgFramedHjem from "figma:asset/2725c4cc5e8b21295821c9bfcd4d6ee4b35b016f.png";
import imgFramedHandleliste from "figma:asset/d0851995c5ff43e23af849b5a4cf32224e13b4f2.png";
import imgNyMatplan from "../../assets/matspar/ny-matplan-budsjett.png";
import imgLeggTil from "../../assets/matspar/legg-til-skjerm.webp";
import imgOversikt from "../../assets/matspar/oversikt-skjerm.webp";
import imgWfNyMatplan from "../../assets/matspar/wf-ny-matplan.png";
import imgWfLeggTil from "../../assets/matspar/wf-legg-til.png";
import imgWfOversikt from "../../assets/matspar/wf-oversikt.png";
import imgPainOversikt from "../../assets/matspar/pain-oversikt.png";
import imgPainUtgifter from "../../assets/matspar/pain-utgifter.png";
import imgPainPorsjoner from "../../assets/matspar/pain-porsjoner.png";
import imgCropBudsjett from "../../assets/matspar/crop-budsjett-priser.webp";
import imgCropRest from "../../assets/matspar/crop-rest-forslag.webp";
import imgCropButikker from "../../assets/matspar/crop-butikker-liste.webp";
import imgCropMengder from "../../assets/matspar/crop-mengder-testing.webp";

import {
  CaseStudyNav,
  CaseStudyHero,
  ResourceLink,
  NextProjectNav,
  caseStudyNav,
  MONO,
  H2,
  H3_CARD,
  H4_STEP,
  SectionEyebrow,
  FigCaption,
  Well,
  drawParent,
  drawRule,
  type CaseStudySection,
} from "../components/case-study/shared";

const MATSPAR_LIGHT = "var(--proj-matspar-light)";
const prototypeUrl =
  "https://www.figma.com/proto/ObFSRwwNMJGFbuidoVTQcM/MatSpar?node-id=420-3691&t=0hFbH7kNJmOqYqhd-1";
const figmaFileUrl =
  "https://www.figma.com/design/ObFSRwwNMJGFbuidoVTQcM/MatSpar?node-id=420-3691&t=0hFbH7kNJmOqYqhd-1";

const SECTIONS: CaseStudySection[] = [
  { id: "brief", label: "Brief" },
  { id: "research", label: "Research" },
  { id: "direction", label: "Direction" },
  { id: "wireframes", label: "Wireframes" },
  { id: "testing", label: "Testing" },
  { id: "prototype", label: "Prototype" },
  { id: "outcome", label: "Outcome" },
];

/* Heading scale (H2/H3/H4) is imported from shared. */
const PROSE_LIGHT = "max-w-[620px] text-[16px] leading-[1.75] text-ink/72";
const PROSE_DARK = "max-w-[620px] text-[16px] leading-[1.75] text-white/64";

const interviewNote = {
  label: "From the interviews",
  text: "Food already at home is easy to lose track of.",
  detail:
    "This could lead to buying ingredients people already had or purchasing more than they needed.",
};

const surveyNotes = [
  {
    value: "100%",
    text: "Food cost was a concern",
    detail: "Every survey respondent identified finances as a challenge when planning food.",
  },
  {
    value: "78%",
    text: "People wanted a clearer overview of existing food.",
    detail: "This suggested a need for better organisation before shopping.",
  },
  {
    value: "61%",
    text: "People wanted more variety in their meals.",
    detail:
      "We used this finding to include recipe suggestions within the meal planning flow rather than as a separate feature.",
  },
];

const researchArtifacts = [
  {
    src: imgPainOversikt,
    alt: "Original Norwegian research note reading 'Manglende oversikt over matvarer' — users forget what is in the fridge, leading to unnecessary purchases and food waste",
  },
  {
    src: imgPainUtgifter,
    alt: "Original Norwegian research note reading 'Ukontrollerte matutgifter' — uncontrolled food expenses",
  },
  {
    src: imgPainPorsjoner,
    alt: "Original Norwegian research note reading 'For store porsjoner' — portions that are too large",
  },
];

const principles = [
  {
    title: "See cost while choosing",
    text: "Estimated prices and budget filters appear before the plan is confirmed.",
    src: imgCropBudsjett,
    alt: "MatSpar Ny Matplan screen cropped to the Budsjett filter — Lavt, Gjevnt, and Høyt levels — with dinner options priced from 149,- to 187,-",
  },
  {
    title: "Reuse ingredients across meals",
    text: "Recipe suggestions highlight meals that reuse ingredients already included in the weekly plan.",
    src: imgCropRest,
    alt: "MatSpar Legg til screen with the message 'Spar lommeboka og miljøet med å bruke rest-ingrediensene til disse rettene' and an omelette suggestion at 49,-",
  },
  {
    title: "Turn the meal plan into a shopping list",
    text: "The shopping list groups ingredients, quantities, and suggested stores.",
    src: imgCropButikker,
    alt: "MatSpar shopping list crop showing the Cheesy Pasta ingredient checklist and the recommended stores REMA 1000 and EXTRA",
  },
];

const wireframes = [
  {
    src: imgWfNyMatplan,
    alt: "MatSpar wireframe for creating a new meal plan with budget filters",
    title: "Ny matplan · New meal plan",
    caption: "Budget levels and meal choices in one view",
  },
  {
    src: imgWfLeggTil,
    alt: "MatSpar wireframe for adding meals that reuse leftover ingredients",
    title: "Legg til · Add",
    caption: "Suggestions based on ingredient overlap",
  },
  {
    src: imgWfOversikt,
    alt: "MatSpar wireframe for reviewing the selected weekly meal plan",
    title: "Oversikt · Overview",
    caption: "A final review before activating the plan",
  },
];

/* Accent underlines drawn beneath the two quantity strings visible in
   the tested shopping-list crop. Percentages locate the strings inside
   the 860×560 source image; values are read from the frame. */
const quantityMarks = [
  { left: "37.8%", width: "11.6%", top: "35.2%" },
  { left: "31.6%", width: "10.2%", top: "57.0%" },
];

const prototypeFlow = [
  {
    index: "01",
    title: "Choose meals",
    src: imgNyMatplan,
    alt: "MatSpar new meal plan screen with budget filters and prices",
    caption: "Meal prices stay visible while the plan is being built.",
  },
  {
    index: "02",
    title: "Reuse ingredients",
    src: imgLeggTil,
    alt: "MatSpar add-meal screen suggesting recipes with overlapping ingredients",
    caption: "Suggested recipes show where ingredients can be reused across several meals.",
  },
  {
    index: "03",
    title: "Review the week",
    src: imgOversikt,
    alt: "MatSpar weekly meal overview with the selected meals",
    caption: "The weekly plan can be checked before it is activated.",
  },
  {
    index: "04",
    title: "Shop from the list",
    src: imgHandlelisteVisning,
    alt: "MatSpar shopping list with ingredient quantities and recommended stores",
    caption: "The final list includes quantities and store suggestions.",
  },
];

export default function MatSparCaseStudy() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink font-['Plus_Jakarta_Sans',sans-serif] antialiased">
        <CaseStudyNav sections={SECTIONS} />

        <CaseStudyHero
          lightVar="--proj-matspar-light"
          eyebrow="Group school project · Interaction design"
          title="MatSpar"
          lede="A meal-planning concept that connects meal choices, budget, and the shopping list."
          body="MatSpar was a group school project for students and families. We explored how meal planning becomes harder when people must remember what they already have, keep spending under control, and decide what to buy at the same time. The prototype was designed in Norwegian, with key interface labels translated throughout the case study."
          stats={[
            { value: "5", label: "Research interviews", targetId: "research" },
            { value: "4", label: "Screens in the final flow", targetId: "prototype" },
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
                  src={imgFramedHjem}
                  alt="MatSpar app home screen showing weekly meal plan and recipe cards"
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
                  src={imgFramedHandleliste}
                  alt="MatSpar app shopping list screen with recipe ingredients"
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

        {/* ── The paper spine: brief → research → direction → wireframes
            (well band) → testing. One continuous reading surface; dark
            returns only for the final prototype. ── */}

        <section id="brief" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="01" label="Project brief" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className={`${H2} text-ink`}>
                  Bringing meals, ingredients, and budget into one plan
                </h2>
              </div>
              <div className="space-y-5 lg:col-span-5">
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  Meal planning involved several connected decisions. People needed to choose meals, keep track of food already at home, manage a budget, and prepare a shopping list. Losing track of one part could make it easier to buy items twice, exceed the planned budget, or leave ingredients unused.
                </p>
                <p className="text-[16px] leading-[1.75] text-ink/72">
                  We developed a mobile concept that connected weekly meal planning with estimated prices and ingredient reuse. The final shopping list also included suggested quantities and stores.
                </p>
              </div>
            </div>

            {/* Project metadata as a colophon strip, not content cards. */}
            <div className="mt-14 grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {[
                ["Audience", "Students and families managing food cost, variety, and household needs"],
                ["Project work", "Survey, interviews, comparable product review, wireframing, prototyping, and usability testing"],
                ["Team", "Shared group school project"],
                ["Project scope", "Figma prototype; not implemented or launched"],
              ].map(([label, value]) => (
                <div key={label} className="py-5 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <p className={`${MONO} mb-2.5 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>{label}</p>
                  <p className="text-[14px] leading-[1.6] text-ink/72">{value}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-[620px] text-[14px] leading-[1.7] text-ink/58">
              The project was developed collaboratively, so I use &ldquo;we&rdquo; when describing the research, design work, and testing.
            </p>
          </div>
        </section>

        <section id="research" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="02" label="Research" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h2 className={`${H2} text-ink`}>
                  Food cost and difficulty tracking what was already at home
                </h2>
                <p className={`mt-6 ${PROSE_LIGHT}`}>
                  We conducted a paper survey and five semi-structured interviews. We interviewed four students and one parent aged 40. We asked about participants&rsquo; meal planning habits, food budgets, how they organised ingredients at home, and their experience with food apps.
                </p>
                <p className={`mt-5 ${PROSE_LIGHT}`}>
                  The final report did not record the survey sample size, so these percentages should be read as signals rather than representative results.
                </p>
              </div>

              <div className="lg:col-span-7">
                {/* Claims: findings set typographically, percentages at
                    evidence scale. */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <article className="rounded-[12px] border border-ink/8 bg-paper-raised p-6 sm:col-span-3">
                    <p className={`${MONO} text-[10px] uppercase tracking-[0.08em] text-ink/48`}>
                      {interviewNote.label}
                    </p>
                    <div className="mt-3 flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-baseline">
                      <p className="shrink-0 text-[18px] font-semibold leading-[1.4] tracking-[-0.015em] text-ink/92 sm:max-w-[46%]">
                        {interviewNote.text}
                      </p>
                      <p className="text-[13px] leading-[1.65] text-ink/58">{interviewNote.detail}</p>
                    </div>
                  </article>
                  {surveyNotes.map((note) => (
                    <article key={note.value} className="rounded-[12px] border border-ink/8 bg-paper-raised p-5">
                      <p className={`${MONO} text-[10px] uppercase tracking-[0.08em] text-ink/48`}>
                        Survey finding
                      </p>
                      <p className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ink/92">
                        {note.value}
                      </p>
                      <p className="mt-3 text-[15px] font-semibold leading-[1.45] tracking-[-0.01em] text-ink/85">
                        {note.text}
                      </p>
                      <p className="mt-2 text-[12.5px] leading-[1.6] text-ink/58">{note.detail}</p>
                    </article>
                  ))}
                </div>

                {/* Evidence: the original pain-point notes from the
                    research board. */}
                <Well className="mt-5 p-4">
                  <div className="flex gap-3 md:gap-4">
                    {researchArtifacts.map((artifact) => (
                      <img
                        key={artifact.src}
                        src={artifact.src}
                        alt={artifact.alt}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-1/3 min-w-0 rounded-[6px]"
                      />
                    ))}
                  </div>
                </Well>
                <FigCaption fig="02" className="mt-4">
                  Selected findings from the survey and interviews, translated into English for the case study.
                </FigCaption>
              </div>
            </div>
          </div>
        </section>

        <section id="direction" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="03" label="Product direction" />
            <div>
              <h2 className={`${H2} max-w-[820px] text-ink`}>
                Connecting meals, cost, and shopping
              </h2>
              <p className={`mt-6 ${PROSE_LIGHT}`}>
                We reviewed AllRecipes, Mealime, Yummly, and HelloFresh to understand how existing products handled recipes, weekly planning, shopping lists, and personalisation. None connected meal choice, cost, ingredient reuse, and shopping preparation in one flow, so we designed MatSpar to keep those decisions together.
              </p>
            </div>

            {/* Principle + proof: each claim sits above the interface
                moment that implements it. */}
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-5 lg:gap-6">
              {principles.map((principle) => (
                <figure key={principle.title} className="relative m-0 border-t border-ink/12 pt-5">
                  <div aria-hidden="true" className="absolute left-0 top-[-1px] h-px w-8 bg-accent" />
                  <h3 className={`${H3_CARD} text-ink/92`}>
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-ink/64">{principle.text}</p>
                  <Well className="mt-5 p-1.5">
                    <img
                      src={principle.src}
                      alt={principle.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto max-h-[240px] w-full rounded-[8px] object-cover object-top md:max-h-none"
                    />
                  </Well>
                </figure>
              ))}
            </div>
            <FigCaption fig="03" className="mt-5 max-w-[760px]">
              Budsjett levels with per-dish prices in Ny Matplan, rest-ingredienser suggestions at 49,- in Legg til, and recommended stores in the generated Handleliste.
            </FigCaption>
          </div>
        </section>

        {/* Process interlude: a recessed paper-well band, not a polarity
            flip — wireframes read as the working file's early pages. */}
        <section
          id="wireframes"
          className="paper-surface relative w-full scroll-mt-20 overflow-hidden"
          style={{ backgroundColor: "var(--surface-paper-well)" }}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-14 md:px-12 md:py-16 lg:px-16">
            <SectionEyebrow index="04" label="Wireframes" />
            <div>
              <h2 className={`${H2} max-w-[800px] text-ink`}>
                Defining the meal planning flow
              </h2>
              <p className={`mt-6 ${PROSE_LIGHT}`}>
                We used low-fidelity wireframes during ideation to work through meal selection, ingredient reuse, and weekly review. They were not included in the documented usability test.
              </p>
            </div>

            <div className="mt-10 flex max-w-none snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:max-w-[820px] sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
              {wireframes.map((frame) => (
                <figure key={frame.title} className="m-0 w-[64vw] max-w-[240px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                  <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-3">
                    <img
                      src={frame.src}
                      alt={frame.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-[4px]"
                    />
                  </div>
                  <p className={`${MONO} mt-3 text-[10px] uppercase tracking-[0.08em] text-ink/58`}>{frame.title}</p>
                  <p className="mt-1 text-[13px] leading-[1.6] text-ink/48">{frame.caption}</p>
                </figure>
              ))}
            </div>
            <FigCaption fig="04" className="mt-5 max-w-[760px]">
              Three wireframes from the concept phase. They define the intended order for selecting, adding, and reviewing meals.
            </FigCaption>
          </div>
        </section>

        <section id="testing" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="05" label="User testing" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className={`${H2} text-ink`}>
                  One usability test near the end of the project
                </h2>
                <p className={`mt-6 ${PROSE_LIGHT}`}>
                  We tested the prototype with five people: four students and one parent aged 45, using a clickable prototype. We observed how they interacted with it and recorded their reactions. The final report does not specify whether the tested version was the completed high-fidelity design shown here.
                </p>
                <p className={`mt-5 ${PROSE_LIGHT}`}>
                  The final report does not include the test tasks, completion rates, or session length, so we cannot draw conclusions about independent task completion.
                </p>

                <div className="mt-8 rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7">
                  <p className={`${MONO} mb-4 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Key finding</p>
                  <h3 className={`${H3_CARD} text-ink/92`}>
                    The shopping list needed quantity recommendations
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-ink/64">
                    Testing exposed one detail we had overlooked: the shopping list did not tell users how much of each ingredient to buy. Quantity guidance was intended to help users plan purchases more accurately and avoid buying more than necessary. We added quantities in grams and units to the final shopping list.
                  </p>
                </div>
              </div>

              {/* The change itself: quantity strings in the final list,
                  underlined with drawn accent rules. */}
              <div className="lg:col-span-6">
                <motion.figure {...drawParent} className="m-0 lg:sticky lg:top-28">
                  <Well className="p-2">
                    <div className="relative">
                      <img
                        src={imgCropMengder}
                        alt="MatSpar shopping list crop showing the Kylling Sandwich checklist with quantities — Kyllingfilet 500g and Paprika 1 stk."
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full rounded-[8px]"
                      />
                      {quantityMarks.map((mark) => (
                        <motion.div
                          key={mark.top}
                          variants={drawRule}
                          className="absolute h-[2px] origin-left rounded-full bg-accent"
                          style={{ left: mark.left, width: mark.width, top: mark.top }}
                        />
                      ))}
                    </div>
                  </Well>
                  <FigCaption fig="05" className="mt-4">
                    The final Handleliste with quantity guidance added after testing — Kyllingfilet (500g), Paprika (1 stk.).
                  </FigCaption>
                </motion.figure>
              </div>
            </div>
          </div>
        </section>

        {/* ── The one dark interlude: the finished product under studio
            light. ── */}
        <section id="prototype" className="bench-surface relative w-full scroll-mt-20 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 45% at 50% 0%, rgb(var(--proj-matspar-light) / 0.06), transparent 65%)`,
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="06" label="Final prototype" dark />
            <div>
              <h2 className={`${H2} max-w-[760px] text-white`}>
                From meal choices to a prepared shopping list
              </h2>
              <p className={`mt-6 ${PROSE_DARK}`}>
                The final flow connects meal selection directly to the weekly overview and shopping list. Users can filter meals by budget, add recipes that reuse ingredients, review the week, and open a shopping list with quantities and suggested stores.
              </p>
            </div>

            <motion.div {...drawParent} className="mt-12">
              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-0 lg:overflow-visible lg:pb-0">
                {prototypeFlow.map((step, index) => (
                  <div key={step.index} className="contents">
                    {index > 0 && (
                      <div aria-hidden="true" className="hidden items-center self-center px-3 lg:flex xl:px-4">
                        <motion.div
                          variants={drawRule}
                          className="h-px w-8 origin-left xl:w-10"
                          style={{ background: "rgb(var(--proj-matspar-light) / 0.35)" }}
                        />
                      </div>
                    )}
                    <div className="w-[62vw] max-w-[225px] shrink-0 snap-center lg:w-auto lg:max-w-none">
                      <p className={`${MONO} mb-3 text-[10px] tabular-nums tracking-[0.08em] text-white/40`}>{step.index}</p>
                      <Well dark light={MATSPAR_LIGHT} className="w-full max-w-[235px] p-2 xl:max-w-[252px]">
                        <img
                          src={step.src}
                          alt={step.alt}
                          loading="lazy"
                          decoding="async"
                          className="block h-auto w-full rounded-[8px]"
                        />
                      </Well>
                      <h3 className={`mt-4 ${H4_STEP} text-white/92`}>{step.title}</h3>
                      <p className="mt-2 max-w-[235px] text-[12px] leading-[1.65] text-white/48">{step.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
              <FigCaption fig="06" dark className="mt-8">
                The final prototype flow, from choosing meals to creating the shopping list.
              </FigCaption>
            </motion.div>
          </div>
        </section>

        <section id="outcome" className="paper-surface relative w-full scroll-mt-20 overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[1200px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="07" label="Outcome and next steps" />
            <div>
              <h2 className={`${H2} max-w-[760px] text-ink`}>
                What we delivered and what still needed testing
              </h2>
              <p className={`mt-6 ${PROSE_LIGHT}`}>
                We delivered a clickable Figma prototype connecting weekly meal planning with budget filters and a generated shopping list. Testing exposed the need to include quantities for each item.
              </p>
              <p className={`mt-5 ${PROSE_LIGHT}`}>
                The next step would be to test the final prototype using realistic meal planning tasks and check whether users can create a plan and understand the generated shopping list without help. A later field study could examine whether the concept affects grocery spending or food waste. Neither outcome was measured during this project.
              </p>

              <div className="mt-10 max-w-[620px] rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7">
                <p className={`${MONO} mb-3 text-[10px] uppercase tracking-[0.08em] text-ink/48`}>Testing limitations</p>
                <p className="text-[15px] leading-[1.7] text-ink/64">
                  The survey sample size was not recorded, and the usability test did not include detailed task results or a second testing round. The project ended with a Figma prototype, so savings and food-waste outcomes were not measured.
                </p>
              </div>
            </div>

            <NextProjectNav {...caseStudyNav("/work/matspar")} light />
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
