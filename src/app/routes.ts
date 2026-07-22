import { createHashRouter } from "react-router";
import { Suspense, lazy, createElement } from "react";
import { SiteLayout } from "./components/SiteLayout";

const Home = lazy(() => import("./pages/Home"));
const HarmoniCaseStudy = lazy(() => import("./pages/HarmoniCaseStudy"));
const FristilCaseStudy = lazy(() => import("./pages/FristilCaseStudy"));
const CorruptionFighterCaseStudy = lazy(
  () => import("./pages/CorruptionFighterCaseStudy"),
);
const MatSparCaseStudy = lazy(() => import("./pages/MatSparCaseStudy"));
const About = lazy(() => import("./pages/About"));

const fallback = createElement(
  "div",
  { className: "min-h-screen bg-ink flex items-center justify-center" },
  createElement("div", {
    className:
      "w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin",
  })
);

function wrap(Comp: React.ComponentType) {
  return function Wrapped() {
    return createElement(Suspense, { fallback }, createElement(Comp));
  };
}

export const router = createHashRouter([
  {
    Component: SiteLayout,
    children: [
      { path: "/", Component: wrap(Home) },
      { path: "/work/harmoni", Component: wrap(HarmoniCaseStudy) },
      { path: "/work/fristil", Component: wrap(FristilCaseStudy) },
      {
        path: "/work/corruption-fighter",
        Component: wrap(CorruptionFighterCaseStudy),
      },
      /* Compatibility alias for previously shared portfolio links. */
      {
        path: "/work/f1-platform",
        Component: wrap(CorruptionFighterCaseStudy),
      },
      { path: "/work/matspar", Component: wrap(MatSparCaseStudy) },
      { path: "/about", Component: wrap(About) },
    ],
  },
]);
