"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import Magnetic from "@/components/magnetic";
import FlipText from "@/components/flip-text";
import { useSite } from "@/components/site-provider";
import { EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/data";

export default function Navigation() {
  const { menuOpen, setMenuOpen, scrollTo } = useSite();
  const headerRef = useRef(null);
  const menuOpenRef = useRef(false);
  const retreatRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  /* Escape closes the menu; the trigger gets focus back from Radix-free state. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  /* Hairline appears once the hero has been left behind. */
  useGSAP(
    () => {
      const element = headerRef.current;
      if (!element) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const y = self.scroll();
            setScrolled(y > 24);

            // Retreat on the way down, return on the way up. Never while the
            // fullscreen menu is open. Only tween on the transition, not on
            // every scroll frame.
            const shouldRetreat =
              self.direction === 1 && y > 560 && !menuOpenRef.current;

            if (shouldRetreat === retreatRef.current) return;
            retreatRef.current = shouldRetreat;

            gsap.to(element, {
              yPercent: shouldRetreat ? -112 : 0,
              duration: 0.5,
              ease: EASE.out,
              overwrite: "auto",
            });
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: headerRef },
  );

  /* The header must be present whenever the menu is. */
  useEffect(() => {
    if (!menuOpen || !headerRef.current) return;
    retreatRef.current = false;
    gsap.to(headerRef.current, { yPercent: 0, duration: 0.35, ease: EASE.out });
  }, [menuOpen]);

  const go = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo(href);
  };

  const startProject = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollTo("#contact");
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-bone/10 bg-void/85 supports-[backdrop-filter]:bg-void/70 supports-[backdrop-filter]:backdrop-blur-sm"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
          <a
            href="#main"
            onClick={(event) => go(event, 0)}
            className="display-condensed shrink-0 font-display text-xl font-extrabold uppercase leading-none tracking-[-0.02em] text-bone"
            aria-label={`${SITE.name}: back to top`}
          >
            {SITE.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => go(event, link.href)}
                    className="link-underline label text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden md:inline-flex">
              <a
                href="#contact"
                onClick={startProject}
                className="flip-host group inline-flex items-center gap-2 border border-bone/25 px-4 py-2.5 text-bone transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-void"
              >
                <FlipText text="Start a project" className="label" />
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="label inline-flex items-center gap-2 border border-bone/20 px-3.5 py-2.5 text-bone transition-colors duration-300 hover:border-bone/50 md:hidden"
            >
              {menuOpen ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="site-menu"
            key="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-void px-5 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-bone/10"
                  >
                    <a
                      href={link.href}
                      onClick={(event) => go(event, link.href)}
                      className="display-condensed flex items-baseline justify-between gap-4 py-5 font-display text-4xl font-extrabold uppercase text-bone"
                    >
                      {link.label}
                      <span className="label text-smoke">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-col gap-5"
            >
              <a
                href="#contact"
                onClick={startProject}
                className="flip-host inline-flex items-center justify-between gap-3 border border-lime bg-lime px-5 py-4 text-void"
              >
                <FlipText text="Start a project" className="label" />
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <a href={CONTACT.emailHref} className="label text-ash">
                  {CONTACT.email}
                </a>
                <span className="label text-smoke">{SITE.locations}</span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
