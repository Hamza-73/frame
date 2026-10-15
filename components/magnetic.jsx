"use client";

import { useRef } from "react";

import { EASE, gsap, useGSAP } from "@/lib/gsap";

/**
 * Magnetic pull on desktop pointers only. The wrapper is a plain inline
 * element, so it never affects layout, and it degrades to nothing on touch
 * devices or when reduced motion is requested.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.28,
  as: Tag = "span",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const shiftX = gsap.quickTo(element, "x", { duration: 0.45, ease: EASE.out });
        const shiftY = gsap.quickTo(element, "y", { duration: 0.45, ease: EASE.out });

        const onMove = (event) => {
          const rect = element.getBoundingClientRect();
          shiftX((event.clientX - (rect.left + rect.width / 2)) * strength);
          shiftY((event.clientY - (rect.top + rect.height / 2)) * strength);
        };

        const onLeave = () => {
          shiftX(0);
          shiftY(0);
        };

        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        element.addEventListener("blur", onLeave);

        return () => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
          element.removeEventListener("blur", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
