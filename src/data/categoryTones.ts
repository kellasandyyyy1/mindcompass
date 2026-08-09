/**
 * Category hues shared by the homepage suggestion tags, the citation type tags
 * and the three-roots icons. Colour values live in tokens.css §4b.
 *
 * The class strings are spelled out in full rather than built as
 * `bg-cat-${tone}-tint`, because Tailwind scans source text for complete class
 * names — an interpolated name is never generated.
 */

export type CategoryTone =
  | "blue"
  | "purple"
  | "green"
  | "amber"
  | "red"
  | "magenta"
  | "teal"
  | "neutral";

/** Tinted background + matching ink, for tag chips. */
export const TONE_CHIP: Record<CategoryTone, string> = {
  blue: "bg-cat-blue-tint text-cat-blue",
  purple: "bg-cat-purple-tint text-cat-purple",
  green: "bg-cat-green-tint text-cat-green",
  amber: "bg-cat-amber-tint text-cat-amber",
  red: "bg-cat-red-tint text-cat-red",
  magenta: "bg-cat-magenta-tint text-cat-magenta",
  teal: "bg-cat-teal-tint text-cat-teal",
  neutral: "bg-cat-neutral-tint text-cat-neutral"
};
