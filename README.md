# FRAME — Cinematic Creative Production Studio

A single-page, client-presentation-ready marketing site for a fictional cinematic creative production studio. Built with Next.js (App Router), JavaScript (no TypeScript), Tailwind CSS, GSAP + ScrollTrigger + `@gsap/react`, Motion for React, Lenis, and shadcn/ui.

## Stack

- [Next.js 16.4.1](https://nextjs.org/) (App Router, Turbopack, React 19.3.0, JavaScript-only)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [`@gsap/react`](https://gsap.com/docs/v3/React/) for smooth, coordinated animations
- [Motion for React](https://motion.dev/) for lightweight UI transitions (mobile menu)
- [Lenis](https://lenis.darkroom.engineering/) (ticker-driven, synced to ScrollTrigger)
- [shadcn/ui](https://ui.shadcn.com/) — dialog + form primitives
- [Lucide React](https://lucide.dev/) icons

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build
npm run start
```

## Key features

- Preloader with GSAP timeline + CSS-only fallback (dismisses even with JS disabled)
- Fixed navigation with scroll-direction retreat, mobile fullscreen menu, "Start a project" CTA that smooth-scrolls to the contact section
- Asymmetric work grid with accessible stretched hit areas opening a keyed project detail modal
- Opt-in horizontal storytelling (pinned, scroll-driven) for large screens; vertical fallback on mobile and when reduced-motion
- Lenis synchronized to ScrollTrigger with `gsap.ticker`; reduced-motion disables Lenis entirely
- Scroll locking centralized in `SiteProvider` (only `menuOpen` or open project lock the document)
- Magnetic CTAs, split-line masked reveals, clip-mask image reveals, parallax, and cursor-aware service hover previews
- A11y: skip link, landmark headings/ids resolved, all images have alt text, focus-visible styles, prefers-reduced-motion respected
- Responsive at 1440/1280/768/390/360; no horizontal overflow; no console or hydration errors

## Architecture

- `app/` — layout, global styles, single page composition
- `components/` — site sections and reusable UI primitives (`split-lines`, `magnetic`, `ticker`, shadcn `dialog/input/textarea/button`)
- `lib/` — `gsap` registry (`ScrollTrigger`, `useGSAP` via `@gsap/react`), `animation` helpers, `data` (all copy + projects/services/process + placeholder contact details), `hooks` (`useMediaQuery`, `useHasPointer`)
- `public/media/` — 29 local curated images (no remote runtime dependency)

## Known limitations

- **No video assets.** The "reel" callouts (`SITE.showreelNote`) and hero are image-based (unsplash). A real showreel would replace the hero media and update copy.
- **Demo contact form.** Submitting does **not** send an email; the success state explicitly states nothing was sent. Integrate a form handler (e.g. Resend, Formspree, server action) to go live.
- **Placeholder contact.** `lib/data.js` contains placeholder `mailto:` and social URLs (`https://instagram.com/`, `https://vimeo.com/`, `https://linkedin.com/`). Replace before client handoff.
- **Single-tone cinematic palette.** A monochrome-lean palette is deliberate; no elaborate light mode. Focus states are high contrast and meet in-page needs.
- **No dedicated lightbox gallery.** Project detail uses a Dialog (with navigation) rather than a full image lightbox.

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Notes on Next.js 16

This version uses Turbopack by default, `cacheComponents: true` and `partialPrefetching: true` in `next.config.mjs`. Images are optimized via `next/image` with local assets. No TypeScript.

## Audit

Four Playwright audit scripts (`audit.js`, `audit2.js`, `audit3.js`, `audit4.js`) live under `/tmp/opencode/pw/`. They verify responsive overflow, preloader behavior (JS + no-JS), horizontal story pinning, a11y, mobile menu, modal, and reduced motion. Run against a built/served instance with `BASE=<url> node <script>.js`.

## License

Private demo project for client presentation only.
