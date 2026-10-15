"use client";

/**
 * Renders text as individually maskable lines.
 *
 * The markup is intentionally static: lines are only translated by GSAP, so
 * they remain visible (and selectable, and crawlable) with no JavaScript.
 * Pair with `lineReveal()` from `lib/animation`.
 *
 * `splitWords` nests each word inside the same line mask as its own inline
 * block, so a reveal can stagger word by word while the line still clips the
 * whole thing. The words keep `data-line`, which means every existing reveal
 * helper picks them up without changes.
 */
export default function SplitLines({
  lines,
  as: Tag = "span",
  className = "",
  lineClassName = "",
  splitWords = false,
  ...rest
}) {
  return (
    <Tag className={className} {...rest}>
      {lines.map((line, index) => (
        <span className="line-mask" key={`${line}-${index}`}>
          {splitWords ? (
            <span className={`block ${lineClassName}`}>
              {line.split(" ").map((word, wordIndex, words) => (
                <span key={`${word}-${wordIndex}`}>
                  <span className="inline-block" data-line>
                    {word}
                  </span>
                  {wordIndex < words.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          ) : (
            <span className={`block ${lineClassName}`} data-line>
              {line}
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
