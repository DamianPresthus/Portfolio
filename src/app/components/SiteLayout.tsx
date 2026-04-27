import { Outlet } from "react-router";
import { SiteFooter } from "./SiteFooter";
import { ScrollToTop } from "./ScrollToTop";

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-sm focus:bg-[#F98E1F] focus:px-4 focus:py-3 focus:font-['Plus_Jakarta_Sans',sans-serif] focus:text-[14px] focus:font-medium focus:text-[#161A1F] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
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
