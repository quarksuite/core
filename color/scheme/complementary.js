// [[file:../../README.org::*complementary (=color/scheme/complementary.js=)][complementary (=color/scheme/complementary.js=):1]]
import { hue } from "../adjust/hue.js";

/**
 * Creates a complementary color scheme from any valid CSS color.
 *
 * ```ts
 * complementary("coral");
 * ```
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string]} The base hues for a complementary color scheme
 */
export const complementary = (color) => [hue(0, color), hue(180, color)];
// complementary (=color/scheme/complementary.js=):1 ends here
