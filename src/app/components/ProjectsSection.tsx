import imgHarmoniHome from "figma:asset/0017b3730e543b50eba675afb9ad48715cc403b2.png";
import imgHarmoniOnboarding from "figma:asset/09863dc3638a4cd55c70eb4dbf183102e48dfff3.png";
import imgMatSparHome from "figma:asset/2725c4cc5e8b21295821c9bfcd4d6ee4b35b016f.png";
import imgMatSparList from "figma:asset/d0851995c5ff43e23af849b5a4cf32224e13b4f2.png";
import imgFristil from "../../assets/optimized/fristil-records-homepage-1600.webp";
import imgNordlys from "../../assets/optimized/f1-platform-overview-1600.webp";
import {
  ProjectShowcaseCard,
  type ProjectData,
} from "./ProjectShowcaseCard";

const PROJECTS: ProjectData[] = [
  {
    title: "Harmoni",
    type: "Mental health app prototype",
    role: "UX research, UI design",
    outcome: "Task completion improved from 2/5 to 5/5 after iteration",
    image: imgHarmoniOnboarding,
    imageAlt: "Harmoni app onboarding screen showing a friendly wave illustration",
    mockupType: "dualPhone",
    secondImage: imgHarmoniHome,
    secondImageAlt: "Harmoni app homepage showing daily exercise overview",
    glowColor: "rgba(120,180,255,0.05)",
    href: "/work/harmoni",
  },
  {
    title: "Fristil Records",
    type: "Artist label website",
    role: "UX, UI, front-end implementation",
    outcome: "1,783 pageviews and 2:55 avg session in launch month",
    image: imgFristil,
    imageAlt: "Fristil Records artist showcase website displayed on a MacBook",
    imageWidth: 1600,
    imageHeight: 965,
    mockupType: "laptop",
    glowColor: "rgba(249,88,31,0.04)",
    href: "/work/fristil",
  },
  {
    title: "F1 Inspired Platform",
    type: "Fullstack engineering study",
    role: "UX, UI, .NET / React implementation",
    outcome: "Async loading model improved perceived responsiveness without latency change",
    image: imgNordlys,
    imageAlt: "F1 inspired website displayed on a MacBook",
    imageWidth: 1600,
    imageHeight: 880,
    mockupType: "laptop",
    glowColor: "rgba(100,220,180,0.04)",
    href: "/work/f1-platform",
  },
  {
    title: "MatSpar",
    type: "Meal planning app (group project)",
    role: "UX research, interaction design",
    outcome: "All 5 testers completed a weekly meal plan without help",
    image: imgMatSparHome,
    imageAlt: "MatSpar app home screen showing weekly meal plan and recipe cards",
    mockupType: "dualPhone",
    secondImage: imgMatSparList,
    secondImageAlt: "MatSpar app shopping list screen with recipe ingredients",
    glowColor: "rgba(180,140,255,0.05)",
    href: "/work/matspar",
  },
];

export function ProjectsSection() {
  return (
    <section id="selected-projects" className="relative w-full overflow-hidden px-8 md:px-12 lg:px-16 pt-8 md:pt-12 lg:pt-14 pb-20 md:pb-24 lg:pb-28">
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-[#F98E1F]/40" />
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[16px] tracking-[1.8px] uppercase text-[rgba(255,255,255,0.5)] font-medium leading-[18px]">
              Selected Projects
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[rgba(255,255,255,0.65)] text-[16px] md:text-[18px] leading-[28px] max-w-[440px]">
            Digital products shaped through structure, testing, and implementation.
          </p>
        </div>

        {/* Project grid — asymmetric 2x2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {/* Row 1: Harmoni (7 cols) + Fristil Records (5 cols) */}
          <div className="md:col-span-7 flex">
            <ProjectShowcaseCard project={PROJECTS[0]} />
          </div>
          <div className="md:col-span-5 flex">
            <ProjectShowcaseCard project={PROJECTS[1]} />
          </div>

          {/* Row 2: Nordlys Studio (5 cols) + MatSpar (7 cols) */}
          <div className="md:col-span-5 flex">
            <ProjectShowcaseCard project={PROJECTS[2]} />
          </div>
          <div className="md:col-span-7 flex">
            <ProjectShowcaseCard project={PROJECTS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
