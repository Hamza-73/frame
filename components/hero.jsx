"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import Magnetic from "@/components/magnetic";
import SplitLines from "@/components/split-lines";
import { useSite } from "@/components/site-provider";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { HERO_IMAGE, SITE } from "@/lib/data";

const HEADLINE = ["We make", "brands", "impossible", "to ignore."];

const CREDITS = [
  { label: "Est.", value: SITE.founded },
  { label: "Studios", value: SITE.locations },
  { label: "Reel", value: "2026" },
];

export default function Hero() {
  const { ready, scrollTo } = useSite();
  const rootRef = useRef(null);

  /* Coordinated entrance — held until the preloader starts to lift. */
  useGSAP(
    () => {
      if (!ready) return undefined;
      const root = rootRef.current;
      if (!root) return undefined;

      const media = root.querySelector("[data-hero-media]");
      const lines = root.querySelectorAll("[data-line]");
      const meta = root.querySelectorAll("[data-hero-meta]");
      const actions = root.querySelectorAll("[data-hero-action]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: EASE.out } });

        timeline
          .from(media, {
            clipPath: "inset(6% 6% 6% 6%)",
            scale: 1.16,
            duration: 1.7,
            ease: EASE.expo,
            clearProps: "clipPath",
          })
          .from(
            lines,
            { yPercent: 118, duration: 1.5, stagger: 0.085, ease: EASE.expo },
            0.1,
          )
          .from(
            meta,
            { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.07 },
            0.55,
          )
          .from(
            actions,
            { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.08 },
            0.75,
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  );

  /* Slow vertical drift on the backdrop only. */
  useGSAP(
    () => {
      const root = rootRef.current;
      const image = root?.querySelector("[data-hero-image]");
      if (!image) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          image,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void"
    >
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <div data-hero-image className="absolute inset-0">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-center opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-void/55" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-16 px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p data-hero-meta className="label max-w-[22ch] text-ash">
            {SITE.descriptor}
          </p>
          <dl
            data-hero-meta
            className="flex items-start gap-6 sm:gap-10"
          >
            {CREDITS.map((credit) => (
              <div key={credit.label} className="flex flex-col gap-2">
                <dt className="label text-smoke">{credit.label}</dt>
                <dd className="label text-bone">{credit.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SplitLines
            as="h1"
            id="hero-title"
            lines={HEADLINE}
            className="display-condensed max-w-[16ch] font-display text-display-lg font-extrabold uppercase text-bone"
            lineClassName="uppercase"
          />

          <div className="flex flex-col gap-6 lg:pb-3">
            <p data-hero-action className="max-w-[34ch] text-sm text-ash sm:text-base">
              An independent studio in London and Los Angeles, making films for
              brands that would rather be remembered than liked.
            </p>

            <div data-hero-action className="flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollTo("#work")}
                  className="group inline-flex items-center gap-3 border border-bone bg-bone px-6 py-3.5 text-void transition-colors duration-300 hover:bg-lime hover:border-lime"
                >
                  <span className="label">Selected work</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>

              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="label link-underline text-ash transition-colors duration-300 hover:text-bone"
              >
                Start a project
              </button>
            </div>
          </div>
        </div>

        <button
          data-hero-action
          type="button"
          onClick={() => scrollTo("#work")}
          className="group inline-flex items-center gap-3 self-start text-left"
        >
          <ArrowDown
            className="size-4 text-lime transition-transform duration-500 group-hover:translate-y-1"
            aria-hidden="true"
          />
          <span className="label text-smoke transition-colors duration-300 group-hover:text-bone">
            Scroll
          </span>
          <span
            aria-hidden="true"
            className="h-px w-16 origin-left bg-bone/25 transition-transform duration-500 group-hover:scale-x-150"
          />
        </button>
      </div>
    </section>
  );
}
