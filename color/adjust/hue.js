// [[file:../../README.org::*hue (=color/adjust/hue.js=)][hue (=color/adjust/hue.js=):1]]
import { extract } from "../../internals/color/format/hsl.js";
import {
  correctHueClockwise,
  correctHueCounterClockwise,
} from "../../internals/color/convert/setup.js";
import { hsl } from "../conversion/hsl.js";
import { preserve } from "./setup.js";
import { pipe } from "../../utilities/pipe.js";

/**
 * A function that allows hue adjustment of any valid CSS color.
 *
 * @example Positive values adjust clockwise
 *
 * ```ts
 * hue(30, "red");
 * ```
 *
 * @example Negative values adjust counterclockwise
 *
 * ```ts
 * // negative vallues adjust counterclockwise
 * hue(-45, "lime");
 * ```
 *
 * @remarks
 * The hue is bound to one full revolution (360°) and automatically
 * corrects an adjustment value to the expected output if out of range.
 *
 * It corrects clockwise if value after calculation is < 0;
 * counterclockwise if value after calculation is > 360.
 *
 * @param {number} offset - the rotational offset from current hue
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function hue(offset, color) {
  const [h, S, L, alpha] = pipe(color, hsl, extract);
  const hue = parseFloat(h) + offset;

  // Hue correction
  let H;
  if (hue > 360) {
    H = correctHueClockwise(hue);
  } else if (Math.sign(hue) === -1) {
    H = pipe(hue, correctHueClockwise, correctHueCounterClockwise);
  } else {
    H = hue;
  }

  const A = (alpha && (alpha ?? 1)) || 1;

  return preserve(
    A === 1 ? `hsl(${H}, ${S}, ${L})` : `hsla(${H}, ${S}, ${L}, ${A})`,
    color,
  );
}

/** Shorthand for `hue()` */
export const h = hue;
// hue (=color/adjust/hue.js=):1 ends here
