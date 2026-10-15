"use client";

import { ArrowUp } from "lucide-react";

import { useSite } from "@/components/site-provider";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/data";

export default function Footer() {
  const { scrollTo } = useSite();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelector("[data-wordmark]"), {
          yPercent: 26,
          autoAlpha: 0,
          duration: 1.3,
          ease: EASE.expo,
          scrollTrigger: { trigger: root, start: "top 92%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden border-t border-bone/10 bg-ink px-5 pb-10 pt-16 sm:px-8"
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="link-underline label text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={CONTACT.emailHref}
              className="link-underline label text-bone"
            >
              {CONTACT.email}
            </a>
            <p className="label text-smoke">{SITE.locations}</p>
          </div>
        </div>

        <p
          data-wordmark
          aria-hidden="true"
          className="display-condensed select-none font-display text-[clamp(4rem,21vw,17rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.04em] text-bone"
        >
          {SITE.name}
        </p>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-bone/10 pt-6">
          <p className="label max-w-[36ch] text-smoke">
            © 2026 {SITE.name}. {SITE.descriptor}. All rights reserved.
          </p>

          <p className="label hidden text-smoke sm:block">
            {SITE.showreelNote} · Built as a portfolio demo
          </p>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="label group inline-flex items-center gap-2 border border-bone/20 px-4 py-3 text-bone transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
