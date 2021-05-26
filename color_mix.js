// [[file:README.org::*mix][mix:1]]
import {
  calcFractionFromPercent,
  calcPercentFromFraction,
  significant,
} from "./internals/color/convert/setup.js";
import { extract } from "./internals/color/format/oklab.js";
import { parseOklab } from "./internals/color/convert/oklab.js";
import { oklab } from "./color_convert.js";
import { preserve } from "./color_adjust.js";
import { pipe } from "./utilities.js";

const precision = significant.bind(null, 5);
// mix:1 ends here

// [[file:README.org::*mix][mix:2]]
function calcMixture(original, target, amount) {
  const [OL, Oa, Ob, Oalpha] = original;
  const [TL, Ta, Tb, Talpha] = target;

  const OA = parseFloat(Oalpha ?? 1);
  const TA = parseFloat(Talpha ?? 1);

  return [
    [OL, TL],
    [Oa, Ta],
    [Ob, Tb],
    [OA, TA],
  ].map(([X, Y]) => X + (Y - X) * amount);
}
// mix:2 ends here

// [[file:README.org::*mix][mix:3]]
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
  // Convert both colors to raw Oklab
  const c1 = pipe(color, oklab, extract, parseOklab);
  const c2 = pipe(target, oklab, extract, parseOklab);

  // calculate the mixture
  const [l, a, b, alpha] = calcMixture(c1, c2, calcFractionFromPercent(amount));

  // Convert result back to Oklab (LCh)
  const [L, C, h] = [
    calcPercentFromFraction(l),
    Math.sqrt(a ** 2 + b ** 2),
    Math.atan2(b, a) * (180 / Math.PI),
  ];

  // Hue correction
  let H = Math.sign(h) === -1 ? h + 360 : h;

  return preserve(
    alpha === 1
      ? `oklab(${L}% ${C} ${H})`
      : `oklab(${L}% ${C} ${H} / ${alpha})`,
    color,
  );
}
// mix:3 ends here
