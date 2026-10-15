"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import SectionHeading from "@/components/section-heading";
import { useSite } from "@/components/site-provider";
import { clipReveal, fadeUp, lineReveal, parallax, ruleReveal } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";

/**
 * The grid is deliberately uneven: literal Tailwind strings (rather than
 * interpolated ones) so the compiler can see every class at build time.
 */
const LAYOUT = {
  apex: {
    item: "md:col-span-7 md:col-start-1",
    ratio: "aspect-[16/10]",
    sizes: "(min-width: 768px) 56vw, 92vw",
  },
  maison: {
    item: "md:col-span-4 md:col-start-9 md:mt-40",
    ratio: "aspect-[3/4]",
    sizes: "(min-width: 768px) 32vw, 92vw",
  },
  "still-form": {
    item: "md:col-span-4 md:col-start-2",
    ratio: "aspect-[3/4]",
    sizes: "(min-width: 768px) 32vw, 92vw",
  },
  "after-hours": {
    item: "md:col-span-6 md:col-start-7 md:mt-28",
    ratio: "aspect-[16/10]",
    sizes: "(min-width: 768px) 48vw, 92vw",
  },
};

const ACCENT = {
  lime: { text: "text-lime", ring: "group-hover:border-lime" },
  ember: { text: "text-ember", ring: "group-hover:border-ember" },
};

export default function WorkSection() {
  const { openProject } = useSite();
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ruleReveal(root.querySelectorAll("[data-rule]"), { trigger: root });

        lineReveal(root.querySelectorAll("[data-line]"), {
          trigger: root,
          stagger: 0.05,
        });

        clipReveal(root.querySelectorAll("[data-media]"), {
          stagger: 0.14,
          duration: 1.45,
        });

        fadeUp(root.querySelectorAll("[data-meta]"), {
          stagger: 0.1,
          y: 28,
        });

        // The image drifts inside its frame, so a still card still moves.
        root.querySelectorAll("[data-parallax]").forEach((target) => {
          parallax(target, { from: -6, to: 6 });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="work"
      aria-labelledby="work-title"
      className="relative px-5 pb-24 pt-24 sm:px-8 md:pb-40 md:pt-36"
    >
      <SectionHeading
        id="work-title"
        index="01"
        label="Selected work"
        meta="2024-2025"
        lines={["Work that", "earns the", "second watch."]}
      />

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-10">
        {projects.map((project) => {
          const layout = LAYOUT[project.id] ?? LAYOUT.apex;
          const accent = ACCENT[project.accent] ?? ACCENT.lime;
          return (
            <article key={project.id} className={`group relative ${layout.item}`}>
              <div className="relative overflow-hidden bg-coal">
                <div data-media className={`relative w-full ${layout.ratio}`}>
                  <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes={layout.sizes}
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                    />
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-void/0 transition-colors duration-500 group-hover:bg-void/25"
                />

                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 border border-bone/30 bg-void/70 px-3.5 py-2.5 text-bone opacity-0 transition-all duration-500 group-hover:opacity-100 ${accent.ring}`}
                >
                  <span className="label">View case study</span>
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>

              <div data-meta className="mt-5">
                <div className="rule" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
                  <h3 className="display-condensed font-display text-3xl font-extrabold uppercase text-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="label text-smoke">{project.year}</p>
                </div>

                <p className="mt-3 text-sm text-ash">
                  <span className={accent.text}>{project.category}</span>
                  <span className="text-smoke"> | {project.client}</span>
                </p>

                <p className="mt-3 max-w-[42ch] font-serif text-lg italic text-smoke">
                  {project.tagline}
                </p>
              </div>

              {/*
                One stretched hit area over the whole card: the copy stays real
                markup (headings, paragraphs) instead of being flattened inside
                a button, and the entire card is still a single target.
              */}
              <button
                type="button"
                onClick={() => openProject(project.id)}
                className="absolute inset-0 z-20 cursor-pointer"
              >
                <span className="sr-only">
                  Open the {project.title} case study | {project.category}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
