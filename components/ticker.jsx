"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TICKER } from "@/lib/data";

/**
 * Editorial discipline strip.
 *
 * The CSS keyframes in `globals.css` run it by default, so the strip still
 * drifts with no JavaScript at all. Once JS is available that animation is
 * handed to GSAP instead, which lets the strip lean into the scroll: flicking
 * the page skews the type and spins the marquee up, then both decay back.
 */
export default function Ticker() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const previousAnimation = track.style.animation;
        track.style.animation = "none";

        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 42,
          ease: "none",
          repeat: -1,
        });

        const lean = gsap.quickTo(track, "skewX", {
          duration: 0.4,
          ease: "power2.out",
        });

        const speed = { value: 1 };
        const setSpeed = gsap.quickTo(speed, "value", {
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => loop.timeScale(speed.value),
        });

        let reset;

        const trigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const velocity = self.getVelocity();

            lean(gsap.utils.clamp(-4.5, 4.5, velocity / -1400));
            setSpeed(gsap.utils.clamp(1, 6, 1 + Math.abs(velocity) / 1400));

            window.clearTimeout(reset);
            reset = window.setTimeout(() => {
              lean(0);
              setSpeed(1);
            }, 170);
          },
        });

        return () => {
          window.clearTimeout(reset);
          trigger.kill();
          loop.kill();
          track.style.animation = previousAnimation;
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const items = [...TICKER, ...TICKER];

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden border-y border-bone/10 bg-ink py-5"
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee-track flex w-max items-center">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="label flex items-center gap-8 whitespace-nowrap px-8 text-smoke"
          >
            {item}
            <span className="inline-block size-1 rounded-full bg-lime/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
