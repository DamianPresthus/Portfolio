import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161A1F] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <HeroSection />
      <ProjectsSection />
    </div>
  );
}
