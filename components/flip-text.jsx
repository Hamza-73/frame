/**
 * Hover "roll" for buttons and links.
 *
 * Every character is rendered as its own inline block; a CSS text-shadow
 * paints a duplicate one line above it, so translating the glyph makes the
 * letter appear to flip over while its copy rises into the same slot. The
 * whole effect lives in `globals.css`, which means it costs nothing on the
 * main thread, works with no JavaScript at all, and is switched off entirely
 * under `prefers-reduced-motion`.
 *
 * Characters are real text content, so the accessible name of the button or
 * link is unchanged.
 */
export default function FlipText({ text, className = "" }) {
  return (
    <span className={`flip ${className}`}>
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="flip__char"
          style={{ "--i": index }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
