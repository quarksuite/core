// [[file:../../README.org::*mix][mix:1]]
import {
  calcChannelFromFraction,
  calcFractionFromChannel,
  calcFractionFromPercent,
  calcPercentFromFraction,
  normalize,
  significant,
} from "../../internals/color/convert/setup.js";
import { extract } from "../../internals/color/format/rgb.js";
import { rgb } from "../conversion/rgb.js";
import { preserve } from "../adjust/setup.js";
import { pipe } from "../../utilities/pipe.js";

const precision = significant.bind(null, 5);

/** Calculate the difference between original and target */
const calcChannelDifference = (original, target, p) =>
  precision(((1 - p) * original ** 2 + p * target ** 2) ** 0.5);
// mix:1 ends here

// [[file:../../README.org::*mix][mix:2]]
function calcMixture(original, target, amount) {
  const [OR, OG, OB] = original;
  const [TR, TG, TB] = target;

  return [
    [OR, TR],
    [OG, TG],
    [OB, TB],
  ].map(([X, Y]) => calcChannelDifference(X, Y, amount));
}
// mix:2 ends here

// [[file:../../README.org::*mix][mix:3]]
/**
 * A function for mixing colors of any valid CSS format.
 *
 *
 * @example Even mixture
 *
 * ```ts
 * mix(50, 'red', 'blue');
 * ```
 *
 * @example Farther from target
 *
 * ```ts
 * mix(34, 'green', 'blue');
 * ```
 *
 * @example Closer to target
 *
 * ```ts
 * mix(75, 'blue', 'white');
 * ```
 *
 * @remarks
 * As a percentage, the amount is bound to a range of 0-100%. At 0%
 * it yields the input color. And at 100%, it yields the target color
 *
 * @param {number} amount - the amount to mix with target (as a percentage)
 * @param {string} target - the mixture target
 * @param {string} color - the input color
 * @returns {string} The mixture result
 */
export function mix(amount, target, color) {
  const [OR, OG, OB, OA] = pipe(color, rgb, extract);
  const [TR, TG, TB, TA] = pipe(target, rgb, extract);
  const p = calcFractionFromPercent(normalize(0, amount, 100));

  // Mix the channels
  const [R, G, B] = calcMixture([OR, OG, OB], [TR, TG, TB], p).map((V) =>
    Math.round(V)
  );

  // If one or both colors have an alpha value, calculate difference
  const [A1, A2] = [OA, TA].map((V) =>
    V != null ? calcChannelFromFraction(V) : 255
  );

  const A = calcFractionFromChannel(
    normalize(0, calcChannelDifference(A1, A2, p), 255),
  );

  return preserve(
    A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`,
    color,
  );
}
// mix:3 ends here
