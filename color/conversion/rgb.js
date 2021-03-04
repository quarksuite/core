// [[file:../../README.org::*rgb (=color/conversion/rgb.js=)][rgb (=color/conversion/rgb.js=):1]]
import { rgb as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to RGB.
 *
 * ```ts
 * rgb("#deaded");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to RGB
 */
export const rgb = (color) => target(color);
// rgb (=color/conversion/rgb.js=):1 ends here
