// [[file:../../README.org::*triadic (=color/scheme/triadic.js=)][triadic (=color/scheme/triadic.js=):1]]
import { hue } from "../adjust/hue.js";
import { construct } from "./split.js";

/**
 * Creates a triadic color scheme from any valid CSS color.
 *
 * @example Creating a triadic color scheme
 *
 * ```ts
 * triadic("coral");
 * ```
 *
 * @remarks
 * A triadic color scheme is composed of three colors evenly spaced around
 * the color wheel; the origin and two hues 120° apart from the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a triadic color scheme
 */
export const triadic = (color) => construct(60, color);
// triadic (=color/scheme/triadic.js=):1 ends here
