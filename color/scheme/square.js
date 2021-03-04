// [[file:../../README.org::*square (=color/scheme/square.js=)][square (=color/scheme/square.js=):1]]
import { hue } from "../adjust/hue.js";
import { construct } from "./tetradic.js";

/**
 * Creates a square color scheme from any valid CSS color.
 *
 * @example Creating a square color scheme
 *
 * ```ts
 * square("coral");
 * ```
 *
 * @remarks
 * A square color scheme consists of four colors positioned equally
 * around the color wheel; hues 90° apart from the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a square color scheme
 */
export const square = (color) => construct(90, color);
// square (=color/scheme/square.js=):1 ends here
