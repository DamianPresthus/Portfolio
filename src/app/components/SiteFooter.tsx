import { motion, MotionConfig } from "motion/react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { contact } from "../data/contact";

export function SiteFooter() {
  return (
    <footer className="bench-surface border-t border-white/[0.07]">
      <div
        aria-labelledby="footer-cta-heading"
        className="relative px-8 md:px-12 lg:px-16 pt-24 md:pt-32 pb-12 md:pb-16"
      >
        <div className="max-w-[1200px] mx-auto">
        <MotionConfig reducedMotion="user">
        {/* ── Lead composition ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          {/* Copy */}
          <div className="md:col-span-7">
            {/* Viewport trigger on the row, not the tick — a scaleX(0)
                element is zero-width and IntersectionObserver never
                reports it intersecting. */}
            <div className="mb-6">
              <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[16px] tracking-[0.08em] uppercase text-white/58 font-medium leading-[18px]">
                Get in touch
              </span>
            </div>

            <h2
              id="footer-cta-heading"
              className="font-['EB_Garamond',serif] font-bold text-white text-[32px] md:text-[44px] lg:text-[56px] mb-7 max-w-[14ch] leading-[1.08] tracking-[-0.02em]"
            >
              Have a role or
              <br className="hidden sm:block" />
              <span className="sm:inline"> project in mind?</span>
            </h2>

            <p className="text-white/72 text-[15px] md:text-[16px] leading-[1.7] max-w-[520px]">
              Based in Cork, Ireland, open to relocation opportunities across
              Europe and remote roles.
            </p>
          </div>

          {/* Buttons */}
          <div className="md:col-span-5 flex flex-col items-start sm:flex-row sm:items-center md:justify-end gap-3 sm:gap-4">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Damian on LinkedIn (opens in new tab)"
              className="hero-cta footer-cta--linkedin"
            >
              <Linkedin
                className="footer-cta__linkedin-icon h-[16px] w-[16px]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="hero-cta__label">Let&rsquo;s connect</span>
            </a>
            <Link
              to="/about"
              aria-label="About me"
              className="hero-cta hero-cta--secondary"
            >
              About me
            </Link>
          </div>
        </div>

        {/* ── Quiet utility row — calibration markings ── */}
        <div className="mt-20 md:mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-7 gap-y-1">
            {/* Status reading — answers the hero badge that links here */}
            <li className="inline-flex items-center gap-2 min-h-[44px] py-2">
              <span
                className="relative w-[6px] h-[6px] rounded-full bg-[#22C55E] shrink-0"
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full bg-[#22C55E] motion-safe:animate-[dotPulse_2.8s_ease-in-out_infinite]" />
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-[12px] tabular-nums text-white/58">
                Open to Product Design &amp; Front End roles
              </span>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.email}`}
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/58 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 rounded-sm"
              >
                <Mail
                  className="w-[15px] h-[15px] text-white/48 transition-colors duration-[180ms] ease-out group-hover:text-accent"
                  strokeWidth={1.5}
                />
                <span className="font-['JetBrains_Mono',monospace] text-[12px] tabular-nums">{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                aria-label={`Call ${contact.phone}`}
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/58 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 rounded-sm"
              >
                <Phone
                  className="w-[15px] h-[15px] text-white/48 transition-colors duration-[180ms] ease-out group-hover:text-accent"
                  strokeWidth={1.5}
                />
                <span className="font-['JetBrains_Mono',monospace] text-[12px] tabular-nums">{contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/58 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 rounded-sm"
              >
                <Linkedin
                  className="w-[15px] h-[15px] text-white/48 transition-colors duration-[180ms] ease-out group-hover:text-accent"
                  strokeWidth={1.5}
                />
                <span className="font-['JetBrains_Mono',monospace] text-[12px] tabular-nums">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/58 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 rounded-sm"
              >
                <Github
                  className="w-[15px] h-[15px] text-white/48 transition-colors duration-[180ms] ease-out group-hover:text-accent"
                  strokeWidth={1.5}
                />
                <span className="font-['JetBrains_Mono',monospace] text-[12px] tabular-nums">GitHub</span>
              </a>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 font-['JetBrains_Mono',monospace] text-[12px] tabular-nums text-white/48">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-[13px] h-[13px]" strokeWidth={1.5} />
              {contact.location}
            </span>
            <span>{contact.copyright}</span>
          </div>
        </div>
        </MotionConfig>
        </div>
      </div>
    </footer>
  );
}
