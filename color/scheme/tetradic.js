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
 * ```ts
 * tetradic("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a tetradic color scheme
 */
export const tetradic = (color) => construct(60, color);

/** An alias for `tetradic()` */
export const dualComplementary = tetradic;
// tetradic (=color/scheme/tetradic.js=):1 ends here
