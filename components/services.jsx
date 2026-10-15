"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import SectionHeading from "@/components/section-heading";
import { fadeUp, lineReveal, ruleReveal } from "@/lib/animation";
import { useHasPointer } from "@/lib/hooks";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/data";

export default function Services() {
  const rootRef = useRef(null);
  const previewRef = useRef(null);
  const [active, setActive] = useState(null);
  const hasPointer = useHasPointer();

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
        fadeUp(root.querySelectorAll("[data-row]"), {
          trigger: root,
          stagger: 0.08,
          y: 30,
        });
      });

      /* The floating preview trails the cursor. Only the translation is
         animated here; opacity lives in CSS so there is nothing to revert. */
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const preview = previewRef.current;
          const list = root.querySelector("[data-service-list]");
          if (!preview || !list) return undefined;

          gsap.set(preview, { xPercent: -50, yPercent: -50 });

          const shiftX = gsap.quickTo(preview, "x", { duration: 0.55, ease: EASE.out });
          const shiftY = gsap.quickTo(preview, "y", { duration: 0.55, ease: EASE.out });

          const onMove = (event) => {
            shiftX(event.clientX);
            shiftY(event.clientY - 28);
          };

          list.addEventListener("pointermove", onMove);
          return () => list.removeEventListener("pointermove", onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const enter = (index) => () => {
    if (hasPointer) setActive(index);
  };

  const leave = (index) => () => {
    if (!hasPointer) return;
    setActive((current) => (current === index ? null : current));
  };

  return (
    <section
      ref={rootRef}
      id="services"
      aria-labelledby="services-title"
      className="relative px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        id="services-title"
        index="04"
        label="What we do"
        meta="Five disciplines, one crew"
        lines={["Everything a", "film needs,", "under one roof."]}
      />

      <ul data-service-list className="mt-16 md:mt-24">
        {services.map((service, index) => (
          <li
            key={service.name}
            data-row
            onPointerEnter={enter(index)}
            onPointerLeave={leave(index)}
            className="group border-t border-bone/10 last:border-b"
          >
            <div className="grid grid-cols-1 items-start gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <p className="label text-smoke transition-colors duration-500 group-hover:text-lime md:col-span-1">
                {service.number}
              </p>

              <h3 className="display-condensed font-display text-3xl font-extrabold uppercase leading-[1.05] text-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 sm:text-4xl md:col-span-5">
                {service.name}
              </h3>

              <p className="max-w-[46ch] text-sm leading-relaxed text-ash md:col-span-4 md:col-start-7 md:text-base">
                {service.copy}
              </p>

              {/* Touch devices get an inline thumbnail instead of the preview. */}
              <div className="relative mt-2 aspect-[4/3] w-full max-w-[220px] overflow-hidden bg-coal md:hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[54ch] text-sm text-smoke">
        Need something that is not on the list? Say so; the studio was built on
        briefs that did not fit a box.
      </p>

      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden w-[clamp(200px,22vw,300px)] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${
          active === null ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden bg-coal shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            active === null ? "scale-95" : "scale-100"
          }`}
        >
          {services.map((service, index) => (
            <Image
              key={service.image.src}
              src={service.image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 300px, 0px"
              className={`object-cover transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <p className="label mt-3 text-center text-smoke">
          {active !== null ? services[active].name : ""}
        </p>
      </div>
    </section>
  );
}
