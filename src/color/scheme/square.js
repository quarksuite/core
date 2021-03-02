// [[file:../../../README.org::*square (=src/color/scheme/square.js=)][square (=src/color/scheme/square.js=):1]]
import { hue } from "../adjust/hue.js";
import { construct } from "./tetradic.js";

/**
 * Creates a square color scheme from any valid CSS color.
 *
 * ```ts
 * square("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a square color scheme
 */
export const square = (color) => construct(90, color);
// square (=src/color/scheme/square.js=):1 ends here
