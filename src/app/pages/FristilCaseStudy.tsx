import { ExternalLink } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import {
  CaseStudyNav,
  CaseStudyHero,
  ResourceLink,
  NextProjectNav,
  caseStudyNav,
  MONO,
  H2,
  H3_ROW,
  H3_SERIF,
  SectionEyebrow,
  FigCaption,
  Well,
  drawParent,
  drawRule,
  type CaseStudySection,
} from "../components/case-study/shared";

// Launch-era screenshots (April 2025)
import imgFristil from "../../assets/optimized/fristil-records-homepage-1600.webp";
import imgNewsletter from "../../assets/optimized/fristil-records-newsletter-1600.webp";
import imgNyheter from "../../assets/optimized/fristil-records-news-1600.webp";
// Evidence assets — see src/assets/fristil/manifest.md for provenance
// and capture dates. Wireframes are the team's Figma exports; live-*
// captures are from the production site.
import imgWfHome from "../../assets/fristil/wireframe-home.webp";
import imgWfLive from "../../assets/fristil/wireframe-live.webp";
import imgWfMarked from "../../assets/fristil/wireframe-markedsforing.webp";
import imgWfHomeViewport from "../../assets/fristil/wireframe-home-viewport.webp";
import imgLiveHome from "../../assets/fristil/live-home.webp";
import imgLiveArtisterGrid from "../../assets/fristil/live-artister-grid.webp";
import imgLiveMobile from "../../assets/fristil/live-mobile-home.webp";

const FRISTIL_LIGHT = "var(--proj-fristil-light)";

/** Skim-nav anchors, ids live on the matching <section> elements below. */
const SECTIONS: CaseStudySection[] = [
  { id: "challenge", label: "Challenge" },
  { id: "research", label: "Research" },
  { id: "structure", label: "Structure" },
  { id: "system", label: "System" },
  { id: "build", label: "Build" },
  { id: "impact", label: "Results" },
];

/* Prose measure for the whole page (the case-study reading system's
   580–620px rule). Heading scale (H2/H3) is imported from shared. */
const PROSE_LIGHT = "max-w-[620px] text-[16px] leading-[1.75] text-ink/72";

/* ───────────────────────────────────────────────────
   Data
   ─────────────────────────────────────────────────── */
const insights = [
  {
    id: "01",
    title: "The site needed a clearer story",
    evidence:
      "Stakeholders described Fristil in several ways: as a label, a creative collective, and a production service. The roles overlapped in the existing communication, making it difficult to define a clear structure for the website.",
    implication:
      "The site needed to explain Fristil as one label while giving artists and services clearly defined sections.",
  },
  {
    id: "02",
    title: "Artists emerged as the clearest starting point",
    evidence:
      "In stakeholder conversations, artists and releases were usually mentioned before the label's services.",
    implication:
      "We therefore prioritised artist discovery on the homepage and in the navigation, while keeping services visible as supporting content.",
  },
  {
    id: "03",
    title: "The services needed clearer explanations",
    evidence:
      "Production and management were described in broad terms. The scope was hard to understand from the outside.",
    implication:
      "Each service needed a short description that said what it covered and who it was for.",
  },
];

/* Launch structure, verified against the April 2025 homepage capture
   and the project description. Artister leads. */
const siteMap = [
  { label: "Artister", gloss: "Artist profiles and releases", lead: true },
  { label: "Om oss", gloss: "The label story and contact information" },
  { label: "Markedsføring", gloss: "Marketing services and their scope" },
  { label: "Live", gloss: "Concerts, events, and booking information" },
];

const wireframePlates = [
  {
    src: imgWfHome,
    alt: "Full-page wireframe of the Fristil homepage with sections for artists, releases, live, and marketing",
    label: "Hjem",
  },
  {
    src: imgWfLive,
    alt: "Full-page wireframe of the Live page with event listings and booking information",
    label: "Live",
  },
  {
    src: imgWfMarked,
    alt: "Full-page wireframe of the Markedsføring page describing promotion services",
    label: "Markedsføring",
  },
];

const metrics = [
  { value: "1,783", label: "Pageviews" },
  { value: "789", label: "Sessions" },
  { value: "664", label: "Unique visitors" },
  { value: "2:55", label: "Average session duration" },
];

/* ───────────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────────── */
export default function FristilCaseStudy() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink font-['Plus_Jakarta_Sans',sans-serif] antialiased">
        {/* Navigation, shared skim bar with section links and progress */}
        <CaseStudyNav sections={SECTIONS} />

        {/* ══════════════════════════════════════════════════
            Hero — a shipped site with real first-month numbers
            ══════════════════════════════════════════════════ */}
        <CaseStudyHero
          lightVar="--proj-fristil-light"
          eyebrow="Three-person bachelor team · Launched April 2025"
          title="Fristil Records"
          lede="The first website for an independent music label — artists, services, and the label story in one place."
          body="Fristil Records previously relied on social media, streaming platforms, and direct contact to present its work. In a three-person bachelor team, I worked on the information architecture, interface design, and implementation of the label's first dedicated website. We launched it in April 2025."
          stats={[
            {
              value: "1,783",
              label: "Pageviews, April 2025",
              targetId: "impact",
            },
            { value: "2:55", label: "Average session duration", targetId: "impact" },
            { value: "3 mo", label: "Project duration" },
          ]}
          actions={
            <ResourceLink
              href="https://www.fristilrecords.no/"
              label="See the live site"
              icon={ExternalLink}
              variant="solid"
            />
          }
          media={
            <figure>
              <Well dark light={FRISTIL_LIGHT}>
                <img
                  src={imgFristil}
                  alt="Fristil Records website at launch, showing the artist showcase and editorial layout"
                  width={1600}
                  height={965}
                  loading="eager"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </Well>
              <FigCaption fig="01" dark className="mt-4">
                The launch homepage, April 2025. Artist discovery leads the
                first screen.
              </FigCaption>
            </figure>
          }
        />

        {/* ── The paper spine: challenge → research → structure band.
            The label stays dark inside the frames; the case study
            reads on paper. Dark returns only for the visual-system
            gallery. ── */}

        {/* ══════════════════════════════════════════════════
            01 · Challenge
            ══════════════════════════════════════════════════ */}
        <section
          id="challenge"
          className="paper-surface relative w-full overflow-hidden scroll-mt-20"
        >
          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="01" label="Challenge" />

            {/* No h2 exists in this chapter's finalized text — the
                problem statement itself carries standfirst scale. */}
            <div className="space-y-6">
              <p className="max-w-[680px] text-[18px] font-medium leading-[1.6] tracking-[-0.01em] text-ink/85 md:text-[20px]">
                Artists were promoted through social media and streaming
                platforms, while production and management services were
                explained through direct contact. There was no single place
                where people could understand the label, discover its artists,
                and learn about its services. Artist and service information
                also lacked a consistent format.
              </p>
              <p className={PROSE_LIGHT}>
                The website had to present Fristil's work clearly while
                giving the label a credible online presence. It also
                needed a structure that could accommodate new artists and
                services without requiring a redesign. Before designing
                individual pages, we first had to decide what should lead
                the site and how artists, services, and the label story
                should relate to one another.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            02 · Research — stakeholders plus published research
            ══════════════════════════════════════════════════ */}
        <section
          id="research"
          className="paper-surface relative w-full overflow-hidden scroll-mt-20"
        >
          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="02" label="Research" />

            <h2 className={`${H2} mb-8 max-w-[820px] text-ink md:mb-10`}>
              Turning stakeholder input into a site structure
            </h2>

            <div
              className={`${MONO} mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.08em] md:text-[12px]`}
            >
              <span className="text-ink/58">Stakeholder Interviews</span>
              <div className="h-3 w-px bg-ink/10" aria-hidden="true" />
              <span className="text-ink/58">Comparable Website Review</span>
              <div className="h-3 w-px bg-ink/10" aria-hidden="true" />
              <span className="text-ink/58">Literature Review</span>
            </div>

            <p className={`${PROSE_LIGHT} mb-12 md:mb-14`}>
              We interviewed Fristil stakeholders, reviewed comparable label
              websites, and used relevant literature as additional input when
              considering hierarchy, visual direction, mobile design, and
              performance.
            </p>

            {/* Insight cards — raised evidence records on the paper */}
            <div className="mb-12 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-3 md:gap-6">
              {insights.map((insight) => (
                <article
                  key={insight.id}
                  className="relative h-full rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7"
                >
                  <p
                    className={`${MONO} mb-5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48 tabular-nums`}
                  >
                    Insight {insight.id}
                  </p>
                  <h3 className={`mb-5 ${H3_ROW} text-ink/92`}>
                    {insight.title}
                  </h3>
                  <div className="mb-5">
                    <p
                      className={`${MONO} mb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48`}
                    >
                      Evidence
                    </p>
                    <p className="text-[13px] leading-[1.65] text-ink/58 md:text-[14px]">
                      {insight.evidence}
                    </p>
                  </div>
                  <div className="border-t border-ink/8 pt-5">
                    <p
                      className={`${MONO} mb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48`}
                    >
                      Implication
                    </p>
                    <p className="text-[14px] font-medium leading-[1.55] text-ink/72 md:text-[15px]">
                      {insight.implication}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            03 · Structure — the launch sitemap and its wireframes,
            recessed into the file as a tonal band
            ══════════════════════════════════════════════════ */}
        <section
          id="structure"
          className="paper-surface relative w-full overflow-hidden scroll-mt-20"
          style={{ backgroundColor: "var(--surface-paper-well)" }}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-ink/[0.06]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-14 md:px-12 md:py-16 lg:px-16">
            <SectionEyebrow index="03" label="Structure" />

            <h2 className={`${H2} mb-6 max-w-[820px] text-ink md:mb-8`}>
              Prioritising artist discovery
            </h2>

            <p className={`${PROSE_LIGHT} mb-6`}>
              Because there was no existing website, we first had to decide
              which sections belonged in the main navigation and how they
              should be prioritised. The homepage introduces the label and
              directs visitors to four main sections, with Artister placed
              first in the navigation.
            </p>

            <div className="mb-12 max-w-[620px] border-l-2 border-ink/25 pl-5 md:mb-14">
              <p className={`${MONO} mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48`}>
                Interface language
              </p>
              <p className="text-[14px] leading-[1.75] text-ink/58">
                The website is in Norwegian. “Hjem” means Home, “Artister”
                means Artists, “Om oss” means About us, and “Markedsføring”
                means Marketing.
              </p>
            </div>

            {/* Sitemap — drawn in the site idiom, on the band */}
            <div className="mb-12 md:mb-14">
              <div className="max-w-[880px]">
                <div className="flex flex-col items-start">
                  <div className="inline-flex items-center rounded-[8px] border border-ink/15 bg-paper-raised px-4 py-2">
                    <span
                      className={`${MONO} text-[11px] font-medium uppercase tracking-[0.08em] text-ink/72`}
                    >
                      Hjem
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-8 h-6 w-px bg-ink/20"
                  />
                  <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                    {siteMap.map((node) => (
                      <div key={node.label} className="flex flex-col">
                        <div
                          className={`rounded-[8px] border bg-paper-raised px-4 py-2.5 ${
                            node.lead ? "border-accent/50" : "border-ink/10"
                          }`}
                        >
                          <span
                            className={`${MONO} text-[11px] font-medium uppercase tracking-[0.08em] ${
                              node.lead ? "text-ink/92" : "text-ink/58"
                            }`}
                          >
                            {node.label}
                          </span>
                        </div>
                        <p
                          className={`${MONO} mt-2 text-[10px] leading-[1.6] tracking-[0.04em] text-ink/48`}
                        >
                          {node.gloss}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <FigCaption fig="03" className="mt-5 max-w-[720px]">
                The launched site structure, with artists positioned before
                services and company information.
              </FigCaption>
            </div>

            {/* The wireframes that carried this structure — galley
                proofs of different lengths, pinned to the file */}
            <div className="flex max-w-none snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:max-w-[720px] sm:snap-none sm:grid-cols-3 sm:items-start sm:gap-6 sm:overflow-visible sm:pb-0">
              {wireframePlates.map((wf) => (
                <figure key={wf.label} className="m-0 flex w-[64vw] max-w-[240px] shrink-0 snap-center flex-col sm:w-auto sm:max-w-none">
                  <div className="rounded-[12px] border border-ink/10 bg-paper-raised p-2">
                    <img
                      src={wf.src}
                      alt={wf.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full rounded-[4px]"
                    />
                  </div>
                  <figcaption
                    className={`${MONO} mt-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/58`}
                  >
                    {wf.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <FigCaption fig="04" className="mt-4 max-w-[720px]">
              Wireframes from the Figma phase, February 2025, shown at full
              page length. The homepage follows the same hierarchy as the
              main navigation, introducing artists before the label's
              services.
            </FigCaption>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            04 · Visual system — the one dark interlude: the
            label's photography-led screens under the gallery light
            ══════════════════════════════════════════════════ */}
        <section
          id="system"
          className="bench-surface relative w-full overflow-hidden scroll-mt-20"
        >
          {/* Gallery light behind the screens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "1100px",
              height: "600px",
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgb(var(--proj-fristil-light) / 0.03) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="04" label="Visual system" dark />

            <h2 className={`${H2} mb-6 max-w-[820px] text-white/92 md:mb-8`}>
              A restrained interface built around artist photography
            </h2>

            <div className="mb-12 max-w-[620px] space-y-4 md:mb-14">
              <p className="text-[15px] leading-[1.65] text-white/58 md:text-[16px]">
                The visual direction combines a restrained interface with
                expressive artist photography. Navigation and body text
                remain mostly monochrome, while large display typography and
                a single accent colour add character. This creates
                consistency while allowing each artist's visual identity to
                remain distinct.
              </p>
              <p className="text-[15px] leading-[1.65] text-white/58 md:text-[16px]">
                We used a consistent grid across the main page types so new
                artists, services, and updates could be added without
                creating a new layout each time.
              </p>
            </div>

            {/* Live screens in wells under the gallery light */}
            <div className="grid max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col">
                <Well dark light={FRISTIL_LIGHT} className="p-2.5">
                  <img
                    src={imgNyheter}
                    alt="News section with live concert photography of artists performing under purple lighting"
                    width={1600}
                    height={932}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px]"
                  />
                </Well>
                <FigCaption fig="05" dark className="mt-3">
                  Launch build, April 2025. The news section uses full-width
                  concert photography within a mostly monochrome interface.
                </FigCaption>
              </div>

              <div className="flex flex-col">
                <Well dark light={FRISTIL_LIGHT} className="p-2.5">
                  <img
                    src={imgNewsletter}
                    alt="Newsletter signup section with a bold headline over a blue gradient and an email input"
                    width={1600}
                    height={932}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px]"
                  />
                </Well>
                <FigCaption fig="06" dark className="mt-3">
                  Accent colour is used selectively in sections such as the
                  newsletter panel, while large typography creates visual
                  emphasis.
                </FigCaption>
              </div>

              <div className="flex flex-col md:col-span-2">
                <Well dark light={FRISTIL_LIGHT} className="p-2.5">
                  <img
                    src={imgLiveArtisterGrid}
                    alt="Artister page with a row of artist photography above the Produsenter list, where each producer row repeats the same pattern with a streaming link"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px]"
                  />
                </Well>
                <FigCaption fig="07" dark className="mt-3 max-w-[860px]">
                  The Artister page in July 2026, showing an expanded
                  producer list using the same repeated layout.
                </FigCaption>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            05 · Build — Figma to a site the client can run
            ══════════════════════════════════════════════════ */}
        <section
          id="build"
          className="paper-surface relative w-full overflow-hidden scroll-mt-20"
        >
          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="05" label="Implementation and handoff" />

            <h2 className={`${H2} mb-6 max-w-[820px] text-ink md:mb-8`}>
              From Figma to a maintainable Wix website
            </h2>

            <p className={`${PROSE_LIGHT} mb-12 md:mb-14`}>
              We built the website in Wix and used custom JavaScript for
              the animated artist carousel, which was not supported by the
              standard components. We selected Wix with the client because Fristil
              needed to publish new artists, services, and updates without
              developer support after handoff. Artist and service pages use
              repeatable layouts. We kept the copy concise so artist pages
              could focus on photography, releases, and relevant links.
            </p>

            {/* Wireframe to shipped, first viewport of each */}
            <div className="mb-4 grid max-w-[880px] grid-cols-2 items-start gap-6 md:gap-8">
              <div className="flex flex-col">
                <p
                  className={`${MONO} mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48`}
                >
                  Wireframe · February 2025
                </p>
                <Well className="p-2">
                  <img
                    src={imgWfHomeViewport}
                    alt="First viewport of the homepage wireframe with logo, navigation, and artist block"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[4px]"
                  />
                </Well>
              </div>
              <div className="flex flex-col">
                <p
                  className={`${MONO} mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/58`}
                >
                  Live site · captured July 2026
                </p>
                <Well className="p-2">
                  <img
                    src={imgLiveHome}
                    alt="Live homepage with full-bleed concert photography and the Fristil logotype"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[4px]"
                  />
                </Well>
              </div>
            </div>
            <FigCaption fig="08" className="mb-12 max-w-[720px] md:mb-14">
              The first viewport in the wireframe and launched website.
              The main content order remained consistent while placeholder
              imagery was replaced with final artist photography.
            </FigCaption>

            {/* Mobile — one compact figure with commentary */}
            <div className="grid max-w-[720px] grid-cols-1 items-start gap-8 sm:grid-cols-[200px_1fr]">
              <Well className="w-full max-w-[200px] p-2">
                <img
                  src={imgLiveMobile}
                  alt="Mobile homepage with the Fristil logotype and a hamburger menu"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-[4px]"
                />
              </Well>
              <div className="max-w-[440px]">
                <p className="text-[15px] leading-[1.75] text-ink/72 md:text-[16px]">
                  We considered mobile behaviour from the first wireframes,
                  using stacked layouts, compact navigation, and content
                  blocks that could adapt to narrower screens.
                </p>
                <FigCaption fig="09" className="mt-4">
                  Mobile homepage, captured July 2026. Multi-column layouts
                  stack vertically and the main navigation is placed inside
                  a menu.
                </FigCaption>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            06 · Results — first measured month, then a year on
            ══════════════════════════════════════════════════ */}
        <section
          id="impact"
          className="paper-surface relative w-full overflow-hidden scroll-mt-20"
        >
          <div className="relative z-10 mx-auto max-w-[1400px] px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <SectionEyebrow index="06" label="Results" />

            <h2 className={`${H2} mb-10 max-w-[780px] text-ink md:mb-12`}>
              First measured month: April 2025
            </h2>

            {/* Stat rows with drawn rules */}
            <motion.div
              {...drawParent}
              className="mb-10 grid max-w-[1000px] grid-cols-2 gap-8 md:mb-12 md:gap-10 lg:grid-cols-4"
            >
              {metrics.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <motion.div
                    aria-hidden="true"
                    variants={drawRule}
                    className="mb-4 h-px w-full origin-left bg-ink/25"
                  />
                  <span className="text-[30px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ink/92 md:text-[34px]">
                    {stat.value}
                  </span>
                  <span
                    className={`${MONO} mt-2.5 text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-ink/48`}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="mb-12 max-w-[620px] space-y-5 md:mb-14">
              <p className="text-[14px] leading-[1.65] text-ink/64 md:text-[15px]">
                The site recorded approximately 2.3 pageviews per session in
                April 2025. These figures show how the website was used
                during that period; we did not track inquiries or
                longer-term return visits.
              </p>
              <p className="text-[14px] leading-[1.65] text-ink/64 md:text-[15px]">
                By July 2026, the producer list had expanded while
                continuing to use the same repeated layout.
              </p>
            </div>

            {/* Reflection */}
            <div className="max-w-[620px] border-t border-ink/10 pt-2">
              <div className="mt-8">
                <SectionEyebrow index="07" label="Reflection" />
              </div>
              <h3 className={`mb-6 ${H3_SERIF} text-ink`}>
                Deciding what should lead the website
              </h3>
              <div className="space-y-6">
                <p className="text-[15px] leading-[1.8] text-ink/72 md:text-[16px]">
                  The main design decision was to prioritise{" "}
                  <span className="font-medium text-ink/92">
                    artist discovery
                  </span>{" "}
                  and give services a supporting role. Settling that
                  hierarchy early made the navigation, homepage structure,
                  and repeatable page layouts easier to define.
                </p>
                <p className="text-[15px] leading-[1.8] text-ink/72 md:text-[16px]">
                  Creating the{" "}
                  <span className="font-medium text-ink/92">
                    templates early
                  </span>{" "}
                  also helped keep the content consistent as new artists
                  were added. I learned to resolve the content hierarchy
                  before investing heavily in the visual direction.
                </p>
              </div>

              <div className="mt-8 rounded-[12px] border border-ink/8 bg-paper-raised p-6 md:p-7">
                <p
                  className={`${MONO} mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-ink/48`}
                >
                  Next step
                </p>
                <p className="text-[14px] leading-[1.7] text-ink/64 md:text-[15px]">
                  I would measure how visitors move between artist profiles
                  and service pages, and whether visits to the service pages
                  lead to direct inquiries.
                </p>
              </div>
            </div>

            <NextProjectNav {...caseStudyNav("/work/fristil")} light />
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
