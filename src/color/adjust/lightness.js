// [[file:../../../README.org::*lightness (=src/color/adjust/lightness.js=)][lightness (=src/color/adjust/lightness.js=):1]]
import { extract } from "../../internals/color/format/hsl.js";
import { normalize } from "../../internals/color/convert/setup.js";
import { hsl } from "../conversion/hsl.js";
import { preserve } from "./setup.js";
import { pipe } from "../../utilities/pipe.js";

/**
 * A function that allows lightness/luminance adjustment of any valid CSS color.
 *
 * ```ts
 * // positive values increase
 * lightness(15, "red");
 *
 * // negative values decrease
 * lightness(-30, "lime");
 * ```
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
// lightness (=src/color/adjust/lightness.js=):1 ends here
