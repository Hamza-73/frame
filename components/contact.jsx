"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import ContactForm from "@/components/contact-form";
import SectionHeading from "@/components/section-heading";
import { fadeUp, ruleReveal } from "@/lib/animation";
import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT, SITE } from "@/lib/data";

export default function Contact() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ruleReveal(root.querySelectorAll("[data-rule]"), { trigger: root });
        fadeUp(root.querySelectorAll("[data-contact-block]"), {
          trigger: root,
          stagger: 0.08,
          y: 26,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-bone/10 px-5 py-24 sm:px-8 md:py-36"
    >
      <SectionHeading
        id="contact-title"
        index="07"
        label="Contact"
        meta="Replies within two working days"
        lines={["Tell us what", "you're making."]}
      />

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-10 md:col-span-5 md:col-start-1">
          <div data-contact-block className="flex flex-col gap-4">
            <p className="label text-smoke">Email</p>
            <a
              href={CONTACT.emailHref}
              className="link-underline display-condensed w-fit font-display text-2xl font-extrabold tracking-[-0.02em] text-bone sm:text-3xl"
            >
              {CONTACT.email}
            </a>
          </div>

          <div data-contact-block className="flex flex-col gap-6">
            <p className="label text-smoke">Studios</p>
            <ul className="flex flex-col gap-5">
              {CONTACT.studios.map((studio) => (
                <li key={studio.city} className="flex flex-col gap-1.5">
                  <span className="font-display text-lg font-semibold uppercase tracking-[-0.01em] text-bone">
                    {studio.city}
                  </span>
                  <span className="text-sm text-ash">{studio.line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-contact-block className="flex flex-col gap-5">
            <p className="label text-smoke">Elsewhere</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {CONTACT.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label group inline-flex items-center gap-2 text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {social.label}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p
            data-contact-block
            className="max-w-[40ch] border-t border-bone/10 pt-6 text-sm text-smoke"
          >
            {SITE.name} — {SITE.descriptor.toLowerCase()}, {SITE.locations}.
          </p>
        </div>

        <div data-contact-block className="md:col-span-6 md:col-start-7">
          <p className="label mb-6 text-smoke">Start a brief</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
