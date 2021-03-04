// [[file:../../README.org::*tetradic (=color/scheme/tetradic.js=)][tetradic (=color/scheme/tetradic.js=):1]]
import { hue } from "../adjust/hue.js";

export function construct(offset, color) {
  const origin = hue(0, color);
  const complement = hue(180, color);

  return [origin, hue(-offset, origin), complement, hue(-offset, complement)];
}

/**
 * Creates a tetradic color scheme from any valid CSS color.
 *
 * @example Creating a tetradic color scheme
 *
 * ```ts
 * tetradic("coral");
 * ```
 *
 * @remarks
 * A tetradic color scheme consists of a color, its opposite, and a
 * second complementary pair of colors. They are also called dual
 * complementary schemes.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a tetradic color scheme
 */
export const tetradic = (color) => construct(60, color);

/** An alias for `tetradic()` */
export const dualComplementary = tetradic;
// tetradic (=color/scheme/tetradic.js=):1 ends here
