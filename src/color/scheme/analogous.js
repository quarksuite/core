// [[file:../../../README.org::*analogous (=src/color/scheme/analogous.js=)][analogous (=src/color/scheme/analogous.js=):1]]
import { hue } from "../adjust/hue.js";

const construct = (arc, color) => [
  hue(0, color),
  hue(-arc, color),
  hue(arc, color),
];

/**
 * Creates an analogous color scheme from any valid CSS color.
 *
 * ```ts
 * analogous("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a analogous color scheme
 */
export const analogous = (color) => construct(30, color);
// analogous (=src/color/scheme/analogous.js=):1 ends here
