// [[file:../../../README.org::*triadic (=src/color/scheme/triadic.js=)][triadic (=src/color/scheme/triadic.js=):1]]
import { hue } from "../adjust/hue.js";
import { construct } from "./split.js";

/**
 * Creates a triadic color scheme from any valid CSS color.
 *
 * ```ts
 * triadic("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a triadic color scheme
 */
export const triadic = (color) => construct(60, color);
// triadic (=src/color/scheme/triadic.js=):1 ends here
