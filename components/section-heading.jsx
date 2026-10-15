import SplitLines from "@/components/split-lines";

/**
 * Shared editorial section header: hairline, small uppercase index label,
 * oversized display heading, and optional meta on the right.
 */
export default function SectionHeading({
  index,
  label,
  lines,
  meta,
  splitWords = true,
  headingClassName = "font-display text-display-md font-extrabold tracking-[-0.03em]",
  className = "",
  id,
}) {
  return (
    <header className={className}>
      <div className="rule" data-rule />

      <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-start md:justify-between">
        <p className="label flex items-center gap-3 text-smoke">
          {index ? <span className="text-lime">{index}</span> : null}
          <span>{label}</span>
        </p>
        {meta ? <p className="label text-smoke">{meta}</p> : null}
      </div>

      <SplitLines
        as="h2"
        id={id}
        lines={lines}
        splitWords={splitWords}
        className={`mt-10 max-w-[18ch] text-balance text-bone ${headingClassName}`}
      />
    </header>
  );
}
