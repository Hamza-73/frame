"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSite } from "@/components/site-provider";
import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";

function DetailPanel({ project, onNavigate }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.querySelectorAll("[data-anim]"), {
          y: 26,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.055,
          ease: EASE.out,
          delay: 0.18,
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex h-full flex-col bg-coal">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-bone/10 px-5 py-4 sm:px-8">
        <p className="label flex items-center gap-3 text-smoke">
          <span className="text-lime">{project.index}</span>
          <span className="hidden sm:inline">{project.category}</span>
        </p>

        <DialogClose asChild>
          <button
            type="button"
            className="label inline-flex items-center gap-2 border border-bone/20 px-3.5 py-2.5 text-bone transition-colors duration-300 hover:border-bone/60"
          >
            <X className="size-3.5" aria-hidden="true" />
            Close
          </button>
        </DialogClose>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div data-anim className="relative aspect-[16/9] w-full bg-void">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="(min-width: 1180px) 1180px, 94vw"
            className="object-cover"
          />
        </div>

        <div className="px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 md:col-start-1">
              <DialogTitle
                data-anim
                className="display-condensed font-display text-display-sm font-extrabold uppercase text-bone"
              >
                {project.title}
              </DialogTitle>

              <DialogDescription
                data-anim
                className="mt-5 max-w-[46ch] font-serif text-xl italic text-ash sm:text-2xl"
              >
                {project.summary}
              </DialogDescription>

              <div data-anim className="mt-10 flex flex-col gap-5">
                {project.description.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="max-w-[62ch] text-base leading-relaxed text-ash"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <dl
              data-anim
              className="flex flex-col gap-8 md:col-span-4 md:col-start-9"
            >
              <div className="flex flex-col gap-2">
                <dt className="label text-smoke">Client</dt>
                <dd className="text-bone">{project.client}</dd>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="label text-smoke">Year &amp; location</dt>
                <dd className="text-bone">
                  {project.year} — {project.location}
                </dd>
              </div>
              <div className="rule" />
              <div className="flex flex-col gap-3">
                <dt className="label text-smoke">Our role</dt>
                <dd>
                  <ul className="flex flex-col gap-2">
                    {project.services.map((service) => (
                      <li key={service} className="text-sm text-ash">
                        {service}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="rule" />
              <div className="flex flex-col gap-3">
                <dt className="label text-smoke">Delivered</dt>
                <dd>
                  <ul className="flex flex-col gap-2">
                    {project.deliverables.map((item) => (
                      <li key={item} className="text-sm text-ash">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-8">
            {project.gallery.map((image) => (
              <div
                key={image.src}
                data-anim
                className="relative aspect-[4/3] w-full overflow-hidden bg-void"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-bone/10 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          className="label group inline-flex items-center gap-2 text-ash transition-colors duration-300 hover:text-bone"
        >
          <ArrowLeft
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Previous
        </button>

        <p className="label hidden text-smoke sm:block">
          Next project in the reel
        </p>

        <button
          type="button"
          onClick={() => onNavigate(1)}
          className="label group inline-flex items-center gap-2 text-ash transition-colors duration-300 hover:text-bone"
        >
          Next
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </footer>
    </div>
  );
}

export default function ProjectDetail() {
  const { projectId, closeProject, openProject } = useSite();

  const index = projects.findIndex((project) => project.id === projectId);
  const project = index >= 0 ? projects[index] : null;

  const navigate = (direction) => {
    if (index < 0) return;
    const next = (index + direction + projects.length) % projects.length;
    openProject(projects[next].id);
  };

  return (
    <Dialog
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) closeProject();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="block h-[min(92svh,960px)] w-[min(1180px,94vw)] max-w-none overflow-hidden rounded-none border border-bone/12 bg-coal p-0 ring-0 duration-300 data-open:fade-in-0 data-open:slide-in-from-bottom-6 data-closed:fade-out-0 data-closed:slide-out-to-bottom-4"
      >
        {project ? (
          <DetailPanel
            key={project.id}
            project={project}
            onNavigate={navigate}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
