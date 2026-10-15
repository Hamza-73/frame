"use client";

/**
 * Single place where GSAP and its plugins are created and registered.
 * Importing from the narrow entry points keeps ScrollTrigger as the only
 * plugin in the bundle.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Mobile browsers resize the viewport when the URL bar hides; without this
  // ScrollTrigger re-measures on every one of those events.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared easing vocabulary so every section moves with the same character. */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  soft: "power2.out",
  expo: "expo.out",
};

export { gsap, ScrollTrigger, useGSAP };
