"use client";

import { useEffect, useRef, useState } from "react";

import { useSite } from "@/components/site-provider";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/data";

/**
 * The preloader runs once per page load (module-level guard, so client-side
 * navigation never replays it) and doubles as the loading cover for the hero's
 * priority image. A hard fallback timer guarantees it can never trap a visitor
 * on a broken or blocked GSAP.
 */
let hasPlayed = false;
const FALLBACK_MS = 4200;

export default function Preloader() {
  const { setReady } = useSite();
  const rootRef = useRef(null);
  const [hidden, setHidden] = useState(() => hasPlayed);

  /* Belt and braces: whatever happens to the timeline, the site opens. */
  useEffect(() => {
    const id = window.setTimeout(() => {
      hasPlayed = true;
      setReady(true);
      setHidden(true);
    }, FALLBACK_MS);

    return () => window.clearTimeout(id);
  }, [setReady]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || hasPlayed) return undefined;

      const word = root.querySelector("[data-word]");
      const percent = root.querySelector("[data-percent]");
      const bar = root.querySelector("[data-bar]");
      const meta = root.querySelectorAll("[data-meta]");

      const finish = () => {
        hasPlayed = true;
        setReady(true);
        setHidden(true);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (percent) percent.textContent = "100";
        if (bar) bar.style.transform = "scaleX(1)";
        const id = window.setTimeout(finish, 400);
        return () => window.clearTimeout(id);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { value: 0 };

        const timeline = gsap.timeline({ onComplete: finish });

        timeline
          .from(word, { yPercent: 116, duration: 1.05, ease: EASE.expo })
          .from(
            meta,
            { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08, ease: EASE.out },
            0.15,
          )
          .to(
            counter,
            {
              value: 100,
              duration: 1.5,
              ease: "power2.inOut",
              onUpdate: () => {
                const rounded = Math.round(counter.value);
                if (percent) percent.textContent = String(rounded).padStart(3, "0");
                if (bar) bar.style.transform = `scaleX(${counter.value / 100})`;
              },
            },
            0.25,
          )
          .to(
            [word, percent, ...meta],
            { autoAlpha: 0, y: -26, duration: 0.5, stagger: 0.04, ease: EASE.out },
            "+=0.08",
          )
          .addLabel("lift", "-=0.12")
          .to(root, { yPercent: -100, duration: 1.15, ease: EASE.inOut }, "lift")
          .call(finish, undefined, "lift+=0.1");
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="preloader-fallback fixed inset-0 z-[120] flex flex-col justify-between bg-void px-5 py-6 sm:px-8 sm:py-8"
    >
      <div data-meta className="flex items-start justify-between gap-6">
        <span className="label text-smoke">{SITE.descriptor}</span>
        <span className="label text-right text-smoke">{SITE.locations}</span>
      </div>

      <div className="flex flex-col gap-7">
        <h1 className="line-mask">
          <span
            data-word
            className="display-condensed block font-display text-[clamp(3.75rem,17vw,13rem)] font-extrabold uppercase leading-[0.82] text-bone"
          >
            {SITE.name}
          </span>
        </h1>

        <div className="h-px w-full bg-bone/15">
          <div
            data-bar
            className="h-px w-full origin-left scale-x-0 bg-lime"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <div data-meta className="flex items-end justify-between gap-6">
        <span className="label text-smoke">{SITE.showreelNote}</span>
        <span
          data-percent
          className="label tabular-nums text-bone"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          000
        </span>
      </div>
    </div>
  );
}
