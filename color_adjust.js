// [[file:README.org::*Properties Adjustment (=color_adjust.js=)][Properties Adjustment (=color_adjust.js=):1]]
import * as format from "./internals/color/format/index.js";
import * as revert from "./color_convert.js";

// Secondary format validation
export const preserve = (target, color) =>
  Object.values({
    hex: format.hex.validate(color) && revert.hex(target),
    named: format.named.validate(color) && revert.hex(target),
    rgb: format.rgb.validate(color) && revert.rgb(target),
    hsl: format.hsl.validate(color) && revert.hsl(target),
    cmyk: format.cmyk.validate(color) && revert.cmyk(target),
    hwb: format.hwb.validate(color) && revert.hwb(target),
    lab: format.lab.validate(color) && revert.lab(target),
    lch: format.lch.validate(color) && revert.lch(target),
  })
    .filter((matched) => !!matched)
    .toString();
// Properties Adjustment (=color_adjust.js=):1 ends here

// [[file:README.org::*hue][hue:1]]
import { extract } from "./internals/color/format/hsl.js";
import {
  correctHueClockwise,
  correctHueCounterClockwise,
} from "./internals/color/convert/setup.js";
import { hsl } from "./color_convert.js";
import { pipe } from "./utilities.js";

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
// hue:1 ends here

// [[file:README.org::*saturation][saturation:1]]
import { normalize } from "./internals/color/convert/setup.js";

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
// saturation:1 ends here

// [[file:README.org::*lightness][lightness:1]]
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
// lightness:1 ends here

// [[file:README.org::*alpha][alpha:1]]
import {
  calcFractionFromPercent,
  calcPercentFromFraction,
} from "./internals/color/convert/setup.js";

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
// alpha:1 ends here
