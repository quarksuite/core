// [[file:../../README.org::*complementary (=color/scheme/complementary.js=)][complementary (=color/scheme/complementary.js=):1]]
import { hue } from "../adjust/hue.js";

/**
 * Creates a complementary color scheme from any valid CSS color.
 *
 * @example Creating a complementary scheme
 *
 * ```ts
 * complementary("coral");
 * ```
 *
 * @remarks
 * A complementary color scheme is composed of a base color and its
 * opposite on the color wheel. It is a scheme with the highest possible
 * warm/cool color contrast.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string]} The base hues for a complementary color scheme
 */
export const complementary = (color) => [hue(0, color), hue(180, color)];
// complementary (=color/scheme/complementary.js=):1 ends here
