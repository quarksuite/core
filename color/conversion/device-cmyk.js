// [[file:../../README.org::*cmyk (=color/conversion/device-cmyk.js=)][cmyk (=color/conversion/device-cmyk.js=):1]]
import { cmyk as target } from "./setup.js";

/**
 * A function that converts any valid CSS color to CMYK
 *
 * ```ts
 * cmyk("hsl(97, 63%, 81%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CMYK
 */
export const cmyk = (color) => target(color);
// cmyk (=color/conversion/device-cmyk.js=):1 ends here
