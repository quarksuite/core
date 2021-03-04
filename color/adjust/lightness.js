// [[file:../../README.org::*lightness (=color/adjust/lightness.js=)][lightness (=color/adjust/lightness.js=):1]]
import { extract } from "../../internals/color/format/hsl.js";
import { normalize } from "../../internals/color/convert/setup.js";
import { hsl } from "../conversion/hsl.js";
import { preserve } from "./setup.js";
import { pipe } from "../../utilities/pipe.js";

/**
 * A function that allows lightness/luminance adjustment of any valid CSS color.
 *
 * @example Positive values increase
 *
 * ```ts
 * lightness(15, "red");
 * ```
 *
 * @example Negative values decrease
 *
 * ```ts
 * lightness(-30, "lime");
 * ```
 *
 * @remarks
 * As a percentage value, amount is locked to a range of 0-100%. If
 * the calculation would yield a value out of bounds, the minimum or
 * maximum is returned.
 *
 * At 0%, sits pure black. At 100%, pure white.
 *
 * @param {number} amount - the amount to adjust lightness (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function lightness(amount, color) {
  const [H, S, l, alpha] = pipe(color, hsl, extract);

  const L = `${normalize(0, parseFloat(l) + amount, 100)}%`;
  const A = (alpha && (alpha ?? 1)) || 1;

  return preserve(
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`,
    color,
  );
}

/** An alias for `lightness()` */
export const luminance = lightness;

/** Shorthand for `lightness()` */
export const l = lightness;
// lightness (=color/adjust/lightness.js=):1 ends here
