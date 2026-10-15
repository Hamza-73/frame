"use client";

/**
 * Reusable GSAP recipes. Every helper is designed to be called from inside a
 * `useGSAP()` callback (or a `gsap.matchMedia()` branch) so the tweens and
 * ScrollTriggers it creates are automatically reverted on unmount.
 *
 * All of them animate *away* from a state that never exists in the CSS, which
 * means the content is fully visible if JavaScript or an animation fails.
 */

import { EASE, gsap } from "@/lib/gsap";

/** Masked line-by-line headline reveal. Targets the inner spans of SplitLines. */
export function lineReveal(targets, options = {}) {
  const {
    stagger = 0.075,
    duration = 1.15,
    delay = 0,
    trigger,
    start = "top 88%",
  } = options;

  return gsap.from(targets, {
    yPercent: 118,
    duration,
    delay,
    stagger,
    ease: EASE.expo,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}

/** Restrained fade + rise. The default microinteraction across the site. */
export function fadeUp(targets, options = {}) {
  const {
    stagger = 0.07,
    duration = 1,
    delay = 0,
    y = 26,
    trigger,
    start = "top 90%",
  } = options;

  return gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration,
    delay,
    stagger,
    ease: EASE.out,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}

/** Wipes an image in from the bottom edge — used for media, never for text. */
export function clipReveal(targets, options = {}) {
  const {
    stagger = 0.1,
    duration = 1.35,
    delay = 0,
    scale = 1.14,
    trigger,
    start = "top 88%",
  } = options;

  return gsap
    .timeline({
      scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
    })
    .fromTo(
      targets,
      { clipPath: "inset(0% 0% 100% 0%)", scale, transformOrigin: "50% 100%" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration,
        delay,
        stagger,
        ease: EASE.expo,
        clearProps: "clipPath",
      },
    );
}

/** Gentle scroll-linked drift for select images only. */
export function parallax(target, options = {}) {
  const {
    from = -5,
    to = 5,
    trigger,
    start = "top bottom",
    end = "bottom top",
  } = options;

  return gsap.fromTo(
    target,
    { yPercent: from },
    {
      yPercent: to,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? target,
        start,
        end,
        scrub: 0.8,
      },
    },
  );
}

/** Draws a hairline from left to right. */
export function ruleReveal(targets, options = {}) {
  const { stagger = 0.06, duration = 1, trigger, start = "top 92%" } = options;

  return gsap.from(targets, {
    scaleX: 0,
    transformOrigin: "0% 50%",
    duration,
    stagger,
    ease: EASE.out,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}
