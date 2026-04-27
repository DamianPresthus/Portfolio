import { Link } from "react-router";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { contact } from "../data/contact";

export function SiteFooter() {
  return (
    <footer className="bg-[#161A1F] border-t border-white/[0.06]">
      <div
        aria-labelledby="footer-cta-heading"
        className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16"
      >
        {/* ── Lead composition ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          {/* Copy */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden="true" className="w-6 h-px bg-[#F98E1F]/45" />
              <span className="text-[11px] tracking-[0.26em] uppercase text-white/45 font-medium">
                Get in touch
              </span>
            </div>

            <h2
              id="footer-cta-heading"
              className="font-['Lora',serif] text-white text-[28px] md:text-[40px] lg:text-[48px] mb-7 max-w-[14ch]"
              style={{ lineHeight: "1.08", letterSpacing: "-0.5px" }}
            >
              Have a role or
              <br className="hidden sm:block" />
              <span className="sm:inline"> project in mind?</span>
            </h2>

            <p className="text-white/65 text-[15px] md:text-[16px] leading-[1.7] max-w-[520px]">
              Based in Cork, open to relocation opportunities across Europe
              and remote roles.
            </p>
          </div>

          {/* Buttons */}
          <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3 sm:gap-4 md:items-center">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Damian on LinkedIn (opens in new tab)"
              className="
                group inline-flex items-center justify-center gap-2
                h-12 min-h-[44px] px-7 rounded-full
                bg-[#F98E1F] text-[#161A1F]
                text-[12px] tracking-[0.2em] uppercase font-medium
                shadow-[0_8px_24px_-12px_rgba(249,142,31,0.55)]
                transition-all duration-[180ms] ease-out
                hover:bg-[#FFA13E] hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-10px_rgba(249,142,31,0.7)]
                active:translate-y-0 active:scale-[0.985]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]
              "
            >
              <Linkedin
                className="w-[16px] h-[16px] transition-transform duration-[180ms] ease-out group-hover:-rotate-6"
                strokeWidth={1.75}
              />
              Let&rsquo;s connect
            </a>
            <Link
              to="/about"
              aria-label="About me"
              className="
                group inline-flex items-center justify-center gap-2
                h-12 min-h-[44px] px-7 rounded-full
                border border-white/20 text-white/75
                text-[12px] tracking-[0.2em] uppercase font-medium
                transition-all duration-[180ms] ease-out
                hover:text-white hover:border-white/45 hover:-translate-y-[1px]
                active:translate-y-0 active:scale-[0.985]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45
              "
            >
              About me
              <ArrowUpRight
                className="w-[16px] h-[16px] transition-transform duration-[180ms] ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>

        {/* ── Quiet utility row ── */}
        <div className="mt-20 md:mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-7 gap-y-1">
            <li>
              <a
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.email}`}
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/50 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]/60 rounded-sm"
              >
                <Mail
                  className="w-[15px] h-[15px] text-white/35 transition-colors duration-[180ms] ease-out group-hover:text-[#F98E1F]"
                  strokeWidth={1.5}
                />
                <span className="text-[13px]">{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                aria-label={`Call ${contact.phone}`}
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/50 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]/60 rounded-sm"
              >
                <Phone
                  className="w-[15px] h-[15px] text-white/35 transition-colors duration-[180ms] ease-out group-hover:text-[#F98E1F]"
                  strokeWidth={1.5}
                />
                <span className="text-[13px]">{contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/50 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]/60 rounded-sm"
              >
                <Linkedin
                  className="w-[15px] h-[15px] text-white/35 transition-colors duration-[180ms] ease-out group-hover:text-[#F98E1F]"
                  strokeWidth={1.5}
                />
                <span className="text-[13px]">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="group inline-flex items-center gap-2 min-h-[44px] py-2 text-white/50 hover:text-white transition-colors duration-[180ms] ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F98E1F]/60 rounded-sm"
              >
                <Github
                  className="w-[15px] h-[15px] text-white/35 transition-colors duration-[180ms] ease-out group-hover:text-[#F98E1F]"
                  strokeWidth={1.5}
                />
                <span className="text-[13px]">GitHub</span>
              </a>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[12px] text-white/40">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-[13px] h-[13px]" strokeWidth={1.5} />
              {contact.location}
            </span>
            <span>{contact.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
