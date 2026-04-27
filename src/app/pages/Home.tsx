import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";

export default function Home() {
  return (
    <div className="home-page relative min-h-screen overflow-hidden bg-[#161A1F] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <div className="home-atmosphere" aria-hidden="true" />
      <div className="relative z-10">
        <HeroSection />
        <ProjectsSection />
      </div>
    </div>
  );
}
