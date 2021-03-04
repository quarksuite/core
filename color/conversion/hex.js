// [[file:../../README.org::*hex (=color/conversion/hex.js=)][hex (=color/conversion/hex.js=):1]]
import { hex as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to RGB hex.
 *
 * @example Converting RGB to RGB Hex
 *
 * ```ts
 * hex("rgb(0, 0, 0)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to RGB hex
 */
export const hex = (color) => target(color);
// hex (=color/conversion/hex.js=):1 ends here
