import { motion, MotionConfig } from "motion/react";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { PROJECTS } from "../data/projects";

const revealViewport = { once: true, margin: "-80px" } as const;

/**
 * Project index — the dark studio bench. The hero's studio
 * atmosphere continues here; each project sits as a lit artifact
 * (see ProjectShowcaseCard for the lighting model). A faint column
 * grid echoes the hero sketch grid at the seam, then fades out.
 * Rules draw in like measurement lines; cards rise once on entry.
 * MotionConfig reducedMotion="user" collapses transforms for
 * reduced-motion users — fades only, rules render complete.
 */
export function ProjectsSection() {
  return (
    <section
      id="selected-projects"
      className="bench-surface relative w-full overflow-hidden px-8 md:px-12 lg:px-16 pt-14 md:pt-16 lg:pt-[72px] pb-20 md:pb-24 lg:pb-28"
    >
      {/* Grid echo carried over from the hero sketch, dissolving downward */}
      <div aria-hidden="true" className="bench-grid-echo" />

      <MotionConfig reducedMotion="user">
        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Section header. The viewport trigger sits on the row, not
              the tick — a scaleX(0) element is zero-width and
              IntersectionObserver never reports it intersecting. */}
          <div className="mb-14 md:mb-16">
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[16px] tracking-[0.08em] uppercase text-white/58 font-medium leading-[18px]">
              CASE STUDIES
            </span>
          </div>

          {/* Project grid — asymmetric 2x2 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            {/* Row 1: Harmoni (7 cols) + Fristil Records (5 cols) */}
            <motion.div
              className="md:col-span-7 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectShowcaseCard project={PROJECTS[0]} />
            </motion.div>
            <motion.div
              className="md:col-span-5 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.07 }}
            >
              <ProjectShowcaseCard project={PROJECTS[1]} />
            </motion.div>

            {/* Row 2: Corruption Fighter (5 cols) + MatSpar (7 cols) */}
            <motion.div
              className="md:col-span-5 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectShowcaseCard project={PROJECTS[2]} />
            </motion.div>
            <motion.div
              className="md:col-span-7 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.07 }}
            >
              <ProjectShowcaseCard project={PROJECTS[3]} />
            </motion.div>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
