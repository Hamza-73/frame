"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const SiteContext = createContext(null);

/** Access shared site state (scroll, preloader, overlays). */
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite() must be called inside <SiteProvider>");
  }
  return context;
}

/**
 * In-page anchors stop short of the viewport top so section headings are never
 * hidden underneath the fixed header.
 */
const ANCHOR_OFFSET = -88;

export default function SiteProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const lenisRef = useRef(null);
  const locksRef = useRef(0);

  /* ------------------------------------------------------------------ *
   * Smooth scrolling: Lenis drives the scroll position, GSAP's ticker
   * drives Lenis, and ScrollTrigger listens to Lenis. This is the
   * integration documented by both libraries.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      // Native touch scrolling is left alone; hijacking it hurts mobile UX.
      syncTouch: false,
    });

    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    const raf = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Re-measure once webfonts and imagery have settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 700);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Keep pinned/scrubbed triggers honest when an overlay opens or closes. */
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => window.clearTimeout(id);
  }, [projectId, menuOpen]);

  const lockScroll = useCallback(() => {
    locksRef.current += 1;
    document.documentElement.classList.add("is-scroll-locked");
    lenisRef.current?.stop();
  }, []);

  const unlockScroll = useCallback(() => {
    locksRef.current = Math.max(0, locksRef.current - 1);
    if (locksRef.current === 0) {
      document.documentElement.classList.remove("is-scroll-locked");
      lenisRef.current?.start();
    }
  }, []);

  const performScroll = useCallback((target) => {
    const isTop = target === 0 || target === "top";
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(isTop ? 0 : target, {
        duration: 1.15,
        lock: false,
        offset: isTop ? 0 : ANCHOR_OFFSET,
      });
      return;
    }

    if (isTop) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET,
      behavior: "auto",
    });
  }, []);

  /**
   * Scroll to a section or the top of the page. If an overlay currently owns
   * the scroll position we wait one tick for it to release, otherwise the
   * browser silently ignores the jump.
   */
  const scrollTo = useCallback(
    (target) => {
      if (locksRef.current > 0) {
        window.setTimeout(() => performScroll(target), 60);
        return;
      }
      performScroll(target);
    },
    [performScroll],
  );

  const openProject = useCallback((id) => {
    setMenuOpen(false);
    setProjectId(id);
  }, []);

  const closeProject = useCallback(() => setProjectId(null), []);

  /* A single lock covers the preloader, the mobile menu and the project sheet. */
  const locked = !ready || menuOpen || Boolean(projectId);

  useEffect(() => {
    if (!locked) return undefined;
    lockScroll();
    return () => unlockScroll();
  }, [locked, lockScroll, unlockScroll]);

  const value = useMemo(
    () => ({
      ready,
      setReady,
      menuOpen,
      setMenuOpen,
      projectId,
      openProject,
      closeProject,
      scrollTo,
      lockScroll,
      unlockScroll,
    }),
    [
      ready,
      menuOpen,
      projectId,
      openProject,
      closeProject,
      scrollTo,
      lockScroll,
      unlockScroll,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
