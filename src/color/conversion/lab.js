// [[file:../../../README.org::*lab (=src/color/conversion/lab.js=)][lab (=src/color/conversion/lab.js=):1]]
import { lab as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to CIE Lab.
 *
 * ```ts
 * lab("hwb(90 25% 10%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIE Lab
 */
export const lab = (color) => target(color);
// lab (=src/color/conversion/lab.js=):1 ends here
