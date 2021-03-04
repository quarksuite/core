// [[file:../../README.org::*saturation (=color/adjust/saturation.js=)][saturation (=color/adjust/saturation.js=):1]]
import { extract } from "../../internals/color/format/hsl.js";
import { normalize } from "../../internals/color/convert/setup.js";
import { hsl } from "../conversion/hsl.js";
import { preserve } from "./setup.js";
import { pipe } from "../../utilities/pipe.js";

/**
 * A function that allows saturation adjustment of any valid CSS color.
 *
 * @example Positive values increase
 *
 * ```ts
 * saturation(15, "red");
 * ```
 *
 * @example Negative values decrease
 *
 * ```ts
 * saturation(-30, "lime");
 * ```
 *
 * @remarks
 * As a percentage value, amount is locked to a range of 0-100%. If
 * the calculation would yield a value out of bounds, the minimum or
 * maximum is returned.
 *
 * At 0%, a color is achromatic (gray). At 100%, a color is fully saturated.
 *
 * @param {number} amount - the amount to adjust saturation (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function saturation(amount, color) {
  const [H, s, L, alpha] = pipe(color, hsl, extract);

  const S = `${normalize(0, parseFloat(s) + amount, 100)}%`;
  const A = (alpha && (alpha ?? 1)) || 1;

  return preserve(
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`,
    color,
  );
}

/** An alias for `saturation()` */
export const sat = saturation;

/** Shorthand for `saturation()` */
export const s = saturation;
// saturation (=color/adjust/saturation.js=):1 ends here
