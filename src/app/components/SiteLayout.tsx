import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { SiteFooter } from "./SiteFooter";
import { ScrollToTop } from "./ScrollToTop";

export function SiteLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollToTop />
      {/* Progressive Top-Edge Blur Layer — m51.no inspired */}
      <div
        className={`nav-blur-overlay transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div />
        <div />
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-3 focus:font-['Plus_Jakarta_Sans',sans-serif] focus:text-[14px] focus:font-medium focus:text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
