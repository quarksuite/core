// [[file:../../README.org::*hwb (=color/conversion/hwb.js=)][hwb (=color/conversion/hwb.js=):1]]
import { hwb as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to HWB.
 *
 * @example Converting CIELCH to HWB
 *
 * ```ts
 * hwb("lch(78.31% 83 210)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to HWB
 */
export const hwb = (color) => target(color);
// hwb (=color/conversion/hwb.js=):1 ends here
