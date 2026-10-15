"use client";

import Image from "next/image";
import { useRef } from "react";

import SplitLines from "@/components/split-lines";
import { clipReveal, fadeUp } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import { STORY_PANELS } from "@/lib/data";

export default function HorizontalStory() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return undefined;

      const headingLines = section.querySelectorAll("[data-story-heading] [data-line]");
      const panels = gsap.utils.toArray(track.querySelectorAll("[data-story-panel]"));

      const mm = gsap.matchMedia();

      /* Desktop: pin the section, pan the track sideways, reveal each panel as
         it slides into frame via `containerAnimation`. The horizontal layout
         itself is opted into here so it can never strand content off-screen. */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          section.dataset.storyMode = "horizontal";

          /**
           * The track sits inside the wrapper's horizontal padding, so the pan
           * distance has to carry that gutter at both ends; otherwise the last
           * panel's right edge is clipped and the first panel starts off-grid.
           */
          const gutter = () => {
            const parent = track.parentElement;
            if (!parent) return 0;
            return parseFloat(getComputedStyle(parent).paddingRight) || 0;
          };

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + gutter() * 2);

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.from(headingLines, {
            yPercent: 130,
            duration: 1.2,
            stagger: 0.045,
            ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });

          panels.forEach((panel) => {
            gsap.from(panel.querySelectorAll("[data-story-media]"), {
              clipPath: "inset(0% 0% 100% 0%)",
              scale: 1.1,
              transformOrigin: "50% 100%",
              duration: 1,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 90%",
                once: true,
              },
            });

            gsap.from(panel.querySelectorAll("[data-story-copy]"), {
              y: 28,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 90%",
                once: true,
              },
            });
          });

          return () => {
            tween.kill();
            delete section.dataset.storyMode;
          };
        },
      );

      /* Tablet and phone: the track stacks and the reveals are ordinary. */
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(headingLines, {
            yPercent: 130,
            duration: 1.2,
            stagger: 0.045,
            ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          });

          panels.forEach((panel) => {
            clipReveal(panel.querySelectorAll("[data-story-media]"), {
              trigger: panel,
              start: "top 88%",
            });
            fadeUp(panel.querySelectorAll("[data-story-copy]"), {
              trigger: panel,
              start: "top 88%",
              y: 26,
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-title"
      className="story relative overflow-hidden border-y border-bone/10 bg-ink"
    >
      <div className="flex h-full flex-col justify-center gap-12 px-5 py-24 sm:px-8 lg:gap-14 lg:py-24">
        <div className="flex items-start justify-between gap-6">
          <p className="label flex items-center gap-3 text-smoke">
            <span className="text-lime">03</span>
            <span>How the work gets made</span>
          </p>
          <p className="label hidden text-smoke lg:block">
            Keep scrolling: the reel moves sideways
          </p>
        </div>

        <div
          ref={trackRef}
          className="story-track"
        >
          <div
            data-story-heading
            className="story-heading shrink-0"
          >
            <SplitLines
              as="h2"
              id="story-title"
              lines={["From the first", "idea to the", "final frame."]}
              splitWords
              className="display-condensed max-w-[14ch] font-display text-display-sm font-extrabold uppercase text-bone"
            />
            <p className="mt-6 max-w-[34ch] text-sm text-smoke lg:text-base">
              One team from the first treatment to the last delivery. Nothing is
              handed over, because nothing gets lost that way.
            </p>
          </div>

          {STORY_PANELS.map((panel) => (
            <article
              key={panel.id}
              data-story-panel
              className="story-panel shrink-0"
            >
              <p className="label text-smoke">
                <span className="text-lime">{panel.index}</span>
                <span className="mx-2 text-bone/30">/</span>
                <span>{panel.title}</span>
              </p>

              <div
                data-story-media
                className="story-media"
              >
                <Image
                  src={panel.image.src}
                  alt={panel.image.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover"
                />
              </div>

              <div data-story-copy className="lg:pb-1">
                <h3 className="display-condensed font-display text-2xl font-extrabold uppercase text-bone">
                  {panel.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-ash lg:text-base">
                  {panel.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
