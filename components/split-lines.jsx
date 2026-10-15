"use client";

/**
 * Renders text as individually maskable lines.
 *
 * The markup is intentionally static — lines are only translated by GSAP, so
 * they remain visible (and selectable, and crawlable) with no JavaScript.
 * Pair with `lineReveal()` from `lib/animation`.
 */
export default function SplitLines({
  lines,
  as: Tag = "span",
  className = "",
  lineClassName = "",
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((line, index) => (
        <span className="line-mask" key={`${line}-${index}`}>
          <span className={`block ${lineClassName}`} data-line>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
