// [[file:../../README.org::*splitComplementary (=color/scheme/split.js=)][splitComplementary (=color/scheme/split.js=):1]]
import { hue } from "../adjust/hue.js";

export function construct(arc, color) {
  const complement = hue.bind(null, 180);

  return [
    hue(0, color),
    hue(arc, complement(color)),
    hue(-arc, complement(color)),
  ];
}

/**
 * Creates a split complementary color scheme from any valid CSS color.
 *
 * ```ts
 * splitComplementary("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a split complementary color scheme
 */
export const splitComplementary = (color) => construct(30, color);
// splitComplementary (=color/scheme/split.js=):1 ends here
