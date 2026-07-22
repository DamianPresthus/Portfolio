/**
 * Single source of truth for project metadata.
 *
 * Consumed by:
 *  - ProjectsSection (home index cards — the dark bench)
 *  - case-study/shared.tsx NextProjectNav (pagination thumbnails — paper)
 *
 * Per-project identity is ambient only. On the bench, `light` is a
 * channel triplet (theme.css) that arrives exclusively as light —
 * bloom, key light, 1px rule. On paper, `tint` washes the pagination
 * thumbnail zones (4–10% alpha, from the product's own palette).
 * Neither ever colors chrome, typography, or buttons — the one UI
 * accent stays var(--accent).
 */

import imgHarmoniHome from "figma:asset/0017b3730e543b50eba675afb9ad48715cc403b2.png";
import imgHarmoniOnboarding from "figma:asset/09863dc3638a4cd55c70eb4dbf183102e48dfff3.png";
import imgMatSparHome from "figma:asset/2725c4cc5e8b21295821c9bfcd4d6ee4b35b016f.png";
import imgMatSparList from "figma:asset/d0851995c5ff43e23af849b5a4cf32224e13b4f2.png";
import imgFristil from "../../assets/optimized/fristil-records-homepage-1600.webp";
import imgCorruptionFighter from "../../assets/corruption-fighter/Dashboardet - Hovedsiden.png";

import type { ProjectData } from "../components/ProjectShowcaseCard";

export const PROJECTS: ProjectData[] = [
  {
    slug: "harmoni",
    index: "01",
    title: "Harmoni",
    type: "Mental health app prototype",
    role: "UX research, UI design",
    outcome: "First-session task initiation rose from 3/5 to 5/5 in testing",
    image: imgHarmoniOnboarding,
    imageAlt:
      "Harmoni app onboarding screen showing a friendly wave illustration",
    mockupType: "dualPhone",
    secondImage: imgHarmoniHome,
    secondImageAlt: "Harmoni app homepage showing daily exercise overview",
    tint: "var(--proj-harmoni-tint)",
    light: "var(--proj-harmoni-light)",
    href: "/work/harmoni",
  },
  {
    slug: "fristil",
    index: "02",
    title: "Fristil Records",
    type: "Artist label website",
    role: "UX, UI, front-end implementation",
    outcome: "1,783 pageviews and 2:55 avg session in launch month",
    image: imgFristil,
    imageAlt: "Fristil Records artist showcase website displayed on a MacBook",
    imageWidth: 1600,
    imageHeight: 965,
    mockupType: "laptop",
    tint: "var(--proj-fristil-tint)",
    light: "var(--proj-fristil-light)",
    href: "/work/fristil",
  },
  {
    slug: "corruption-fighter",
    index: "03",
    title: "Corruption Fighter",
    type: "Compliance portal concept",
    role: "UX research, prototyping · student team",
    outcome: "A tested Figma concept for a guided self-reporting flow",
    image: imgCorruptionFighter,
    imageAlt:
      "Corruption Fighter dashboard concept with four self-reporting categories",
    imageWidth: 1512,
    imageHeight: 982,
    mockupType: "laptop",
    tint: "var(--proj-corruption-fighter-tint)",
    light: "var(--proj-corruption-fighter-light)",
    href: "/work/corruption-fighter",
  },
  {
    slug: "matspar",
    index: "04",
    title: "MatSpar",
    type: "Meal planning app",
    role: "UX research, interaction design · group project",
    outcome: "All 5 testers completed a weekly meal plan without help",
    image: imgMatSparHome,
    imageAlt: "MatSpar app home screen showing weekly meal plan and recipe cards",
    mockupType: "dualPhone",
    secondImage: imgMatSparList,
    secondImageAlt: "MatSpar app shopping list screen with recipe ingredients",
    tint: "var(--proj-matspar-tint)",
    light: "var(--proj-matspar-light)",
    href: "/work/matspar",
  },
];

export function projectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
