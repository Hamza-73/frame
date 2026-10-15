"use client";

import Image from "next/image";
import { useRef } from "react";

import SplitLines from "@/components/split-lines";
import { clipReveal, fadeUp, lineReveal, parallax, ruleReveal } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import { STUDIO_IMAGES, STUDIO_STATS, SITE } from "@/lib/data";

export default function StudioIntro() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ruleReveal(root.querySelectorAll("[data-rule]"), { trigger: root });

        lineReveal(root.querySelectorAll("[data-headline] [data-line]"), {
          trigger: root,
          stagger: 0.09,
        });

        fadeUp(root.querySelectorAll("[data-copy]"), {
          trigger: root,
          stagger: 0.08,
          y: 30,
        });

        clipReveal(root.querySelectorAll("[data-media]"), {
          trigger: root,
          stagger: 0.16,
        });

        fadeUp(root.querySelectorAll("[data-stat]"), {
          trigger: root.querySelector("[data-stats]"),
          stagger: 0.08,
          y: 24,
        });

        parallax(root.querySelector("[data-parallax='portrait']"), {
          from: -5,
          to: 5,
          trigger: root,
        });
        parallax(root.querySelector("[data-parallax='behind']"), {
          from: 5,
          to: -5,
          trigger: root,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="studio"
      aria-labelledby="studio-title"
      className="relative px-5 py-24 sm:px-8 md:py-36"
    >
      <div data-rule className="rule" />

      <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-start md:justify-between">
        <p className="label flex items-center gap-3 text-smoke">
          <span className="text-lime">02</span>
          <span>The studio</span>
        </p>
        <p className="label text-smoke">{SITE.locations}</p>
      </div>

      <div data-headline className="mt-14 md:mt-20">
        <SplitLines
          as="h2"
          id="studio-title"
          lines={["Every brand", "has a story."]}
          className="display-condensed font-display text-display-md font-extrabold uppercase text-bone"
        />
        <SplitLines
          as="p"
          lines={["We make people feel it."]}
          className="display-condensed mt-2 font-serif text-display-md italic text-outline"
        />
      </div>

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
        <div
          data-copy
          className="flex flex-col gap-5 md:col-span-5 md:col-start-1 md:self-end"
        >
          <p className="text-lg leading-relaxed text-ash sm:text-xl">
            FRAME is a small studio with an unusually long memory. We have made
            films for car makers, couture houses and a chapel in Basel — and the
            brief is always the same underneath: find the one true thing about
            this brand and put a camera in front of it.
          </p>
          <p className="text-base leading-relaxed text-smoke">
            No account layer, no pass-the-parcel. The people who pitch the idea
            are the people who shoot it, cut it and sit in the grade with you.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div
            data-media
            className="relative aspect-[4/5] w-full overflow-hidden bg-coal"
          >
            <div
              data-parallax="portrait"
              className="absolute inset-x-0 -inset-y-[12%]"
            >
              <Image
                src={STUDIO_IMAGES.portrait.src}
                alt={STUDIO_IMAGES.portrait.alt}
                fill
                sizes="(min-width: 768px) 48vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="label mt-4 text-smoke">
            On set — Soho, day three of a four-day build.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-1 md:mt-10 md:self-start">
          <div
            data-media
            className="relative aspect-[3/2] w-full overflow-hidden bg-coal"
          >
            <div
              data-parallax="behind"
              className="absolute inset-x-0 -inset-y-[14%]"
            >
              <Image
                src={STUDIO_IMAGES.behind.src}
                alt={STUDIO_IMAGES.behind.alt}
                fill
                sizes="(min-width: 768px) 33vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:self-end">
          <p className="text-base leading-relaxed text-ash">
            We keep the crew senior and the footprint small, which is why our
            sets stay quiet enough to hear a performance land. It is also why
            our films look like they were shot by people who wanted to be there.
          </p>
        </div>
      </div>

      <dl
        data-stats
        className="mt-20 grid grid-cols-2 gap-y-10 border-t border-bone/10 pt-10 md:mt-28 md:grid-cols-4"
      >
        {STUDIO_STATS.map((stat) => (
          <div key={stat.label} data-stat className="flex flex-col gap-3">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="display-condensed font-display text-4xl font-extrabold text-bone sm:text-5xl">
              {stat.value}
            </dd>
            <p aria-hidden="true" className="label text-smoke">
              {stat.label}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}
