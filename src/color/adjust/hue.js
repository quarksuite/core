// [[file:../../../README.org::*hue (=src/color/adjust/hue.js=)][hue (=src/color/adjust/hue.js=):1]]
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
 * ```ts
 * // positive values adjust clockwise
 * hue(30, "red");
 *
 * // negative vallues adjust counterclockwise
 * hue(-45, "lime");
 * ```
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
// hue (=src/color/adjust/hue.js=):1 ends here
