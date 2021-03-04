// [[file:../../README.org::*analogous (=color/scheme/analogous.js=)][analogous (=color/scheme/analogous.js=):1]]
import { hue } from "../adjust/hue.js";

const construct = (arc, color) => [
  hue(0, color),
  hue(-arc, color),
  hue(arc, color),
];

/**
 * Creates an analogous color scheme from any valid CSS color.
 *
 * @example Creating an analogous color scheme
 *
 * ```ts
 * analogous("coral");
 * ```
 *
 * @remarks
 * An analogous color scheme is composed of a color and its directly
 * adjacent counterparts on the color wheel; hues about 30° apart from
 * the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a analogous color scheme
 */
export const analogous = (color) => construct(30, color);
// analogous (=color/scheme/analogous.js=):1 ends here
