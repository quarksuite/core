// [[file:../../../README.org::*lch (=src/color/conversion/lch.js=)][lch (=src/color/conversion/lch.js=):1]]
import { lch as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to CIE LCH.
 *
 * ```ts
 * lch("#face");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIE LCH
 */
export const lch = (color) => target(color);
// lch (=src/color/conversion/lch.js=):1 ends here
