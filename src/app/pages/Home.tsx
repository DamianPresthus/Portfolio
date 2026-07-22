import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ChevronDown } from "lucide-react";

function scrollToProjects() {
  document.getElementById("selected-projects")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function Home() {
  return (
    <div className="home-page relative min-h-screen overflow-hidden bg-ink font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* One continuous dark environment — hero, bench, footer. Paper
          first appears when a case study is opened. */}
      <div className="home-hero-shell relative bg-ink">
        <div className="home-atmosphere" aria-hidden="true" />
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      {/* A short editorial threshold between the warm hero field and the
          gridded studio bench. It replaces the accidental viewport-height
          spacer and makes the scroll affordance genuinely interactive. */}
      <div className="home-transition">
        <div className="home-transition__grid" aria-hidden="true" />
        <button
          type="button"
          onClick={scrollToProjects}
          className="home-transition__cue"
          aria-label="Scroll to selected projects"
        >
          <ChevronDown aria-hidden="true" strokeWidth={1.5} />
        </button>
      </div>

      <ProjectsSection />
    </div>
  );
}
