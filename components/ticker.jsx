import { TICKER } from "@/lib/data";

/**
 * Thin editorial discipline strip. Pure CSS animation (see globals.css) so it
 * costs nothing on the main thread, and it stops entirely for reduced motion.
 */
export default function Ticker() {
  const items = [...TICKER, ...TICKER];

  return (
    <div
      className="relative overflow-hidden border-y border-bone/10 bg-ink py-5"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="label flex items-center gap-8 whitespace-nowrap px-8 text-smoke"
          >
            {item}
            <span className="inline-block size-1 rounded-full bg-lime/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
