// [[file:../../README.org::*alpha (=color/adjust/alpha.js=)][alpha (=color/adjust/alpha.js=):1]]
import { extract } from "../../internals/color/format/hsl.js";
import {
  calcFractionFromPercent,
  calcPercentFromFraction,
  normalize,
} from "../../internals/color/convert/setup.js";
import { hsl } from "../conversion/hsl.js";
import { preserve } from "./setup.js";
import { pipe } from "../../utilities/pipe.js";

/**
 * A function that allows alpha/transparency adjustment of any valid CSS color.
 *
 * @example Positive values increase
 *
 * ```ts
 * alpha(12, "rgba(255, 0, 0, 0.48)");
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
 * At 0%, a color is fully transparent. At 100%, fully opaque.
 *
 * @param {number} amount - the amount to adjust transparency (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function alpha(amount, color) {
  const [H, S, L, alpha] = pipe(color, hsl, extract);

  const A = calcFractionFromPercent(
    normalize(0, calcPercentFromFraction(alpha ?? 1) + amount, 100),
  );
  return preserve(
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`,
    color,
  );
}

/** An alias for `alpha()` */
export const transparency = alpha;

/** Shorthand for `alpha()` */
export const a = alpha;
// alpha (=color/adjust/alpha.js=):1 ends here
