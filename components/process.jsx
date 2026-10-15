"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import SectionHeading from "@/components/section-heading";
import { clipReveal, fadeUp, ruleReveal } from "@/lib/animation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { processStages } from "@/lib/data";

export default function Process() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ruleReveal(root.querySelectorAll("[data-rule]"), { trigger: root });

        root.querySelectorAll("[data-stage]").forEach((stage) => {
          clipReveal(stage.querySelectorAll("[data-stage-media]"), {
            trigger: stage,
            start: "top 84%",
          });
          fadeUp(stage.querySelectorAll("[data-stage-copy]"), {
            trigger: stage,
            start: "top 84%",
            stagger: 0.07,
            y: 28,
          });
        });
      });

      /* The rail tracks whichever stage owns the middle of the viewport. */
      const triggers = [];

      root.querySelectorAll("[data-stage]").forEach((stage, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: stage,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          }),
        );
      });

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="process-title"
      className="relative border-t border-bone/10 bg-ink px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        id="process-title"
        index="05"
        label="The process"
        meta="Pre · Production · Post"
        lines={["Three stages.", "No handovers."]}
      />

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="hidden md:col-span-3 md:block">
          <div className="sticky top-32 flex flex-col gap-6">
            <p className="label text-smoke">Running order</p>
            <ol className="flex flex-col">
              {processStages.map((stage, index) => (
                <li key={stage.id} className="border-t border-bone/10 last:border-b">
                  <span
                    className={`flex items-baseline gap-4 py-4 transition-colors duration-500 ${
                      active === index ? "text-bone" : "text-smoke"
                    }`}
                  >
                    <span
                      className={`label transition-colors duration-500 ${
                        active === index ? "text-lime" : "text-bone/30"
                      }`}
                    >
                      {stage.index}
                    </span>
                    <span className="font-display text-lg font-semibold uppercase tracking-[-0.01em]">
                      {stage.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-px origin-left bg-lime transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active === index ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-20 md:col-span-8 md:col-start-5 md:gap-28">
          {processStages.map((stage) => (
            <article key={stage.id} data-stage className="flex flex-col gap-8">
              <div
                data-stage-media
                className="relative aspect-[16/10] w-full overflow-hidden bg-coal"
              >
                <Image
                  src={stage.image.src}
                  alt={stage.image.alt}
                  fill
                  sizes="(min-width: 768px) 64vw, 92vw"
                  className="object-cover"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-12 sm:gap-8">
                <div data-stage-copy className="sm:col-span-7">
                  <p className="label text-smoke">
                    <span className="text-lime">{stage.index}</span>
                    <span className="mx-2 text-bone/30">/</span>
                    <span>Stage</span>
                  </p>
                  <h3 className="display-condensed mt-4 font-display text-3xl font-extrabold uppercase text-bone sm:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ash sm:text-base">
                    {stage.copy}
                  </p>
                </div>

                <ul
                  data-stage-copy
                  className="flex flex-col gap-3 sm:col-span-5 sm:col-start-8"
                >
                  {stage.detail.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-t border-bone/10 pt-3 text-sm text-ash"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45em] size-1 shrink-0 rounded-full bg-lime/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
