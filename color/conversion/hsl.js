// [[file:../../README.org::*hsl (=color/conversion/hsl.js=)][hsl (=color/conversion/hsl.js=):1]]
import { hsl as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to HSL.
 *
 * @example Converting Device CMYK to HSL
 *
 * ```ts
 * hsl("device-cmyk(30% 0 60% 0)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to HSL
 */
export const hsl = (color) => target(color);
// hsl (=color/conversion/hsl.js=):1 ends here
