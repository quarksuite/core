// [[file:../../../README.org::*hex (=src/color/conversion/hex.js=)][hex (=src/color/conversion/hex.js=):1]]
import { hex as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to RGB hex.
 *
 * ```ts
 * hex("rgb(0, 0, 0)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to RGB hex
 */
export const hex = (color) => target(color);
// hex (=src/color/conversion/hex.js=):1 ends here
