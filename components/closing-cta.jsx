"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import Magnetic from "@/components/magnetic";
import SplitLines from "@/components/split-lines";
import { useSite } from "@/components/site-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { CTA_IMAGE, SITE } from "@/lib/data";

export default function ClosingCta() {
  const { scrollTo } = useSite();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.querySelector("[data-cta-image]"),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        gsap.from(root.querySelectorAll("[data-line]"), {
          yPercent: 118,
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });

        gsap.from(root.querySelectorAll("[data-cta-action]"), {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 60%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden border-t border-bone/10 bg-void"
    >
      <div data-cta-image className="absolute inset-x-0 -inset-y-[12%]">
        <Image
          src={CTA_IMAGE.src}
          alt={CTA_IMAGE.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-void/70" />

      <div className="relative z-10 flex w-full flex-col items-start gap-10 px-5 py-28 sm:px-8 md:py-36">
        <p data-cta-action className="label flex items-center gap-3 text-smoke">
          <span className="text-lime">06</span>
          <span>Next</span>
        </p>

        <SplitLines
          as="h2"
          id="cta-title"
          lines={["Got a story", "worth telling?"]}
          className="display-condensed max-w-[14ch] font-display text-display-lg font-extrabold uppercase text-bone"
        />

        <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p data-cta-action className="max-w-[42ch] text-base text-ash sm:text-lg">
            Bring us the brief, the half-idea or the film you keep describing to
            people and never quite getting across. We will tell you honestly
            whether we are the right studio for it.
          </p>

          <div data-cta-action className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="group inline-flex items-center gap-3 border border-lime bg-lime px-7 py-4 text-void transition-colors duration-300 hover:bg-bone hover:border-bone"
              >
                <span className="label">Start a project</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </Magnetic>

            <p className="label text-smoke">
              {SITE.locations} · {SITE.showreelNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
