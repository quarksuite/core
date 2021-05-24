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
    oklab: format.oklab.validate(color) && revert.oklab(target),
  })
    .filter((matched) => !!matched)
    .toString();
// Properties Adjustment (=color_adjust.js=):1 ends here

// [[file:README.org::*hue][hue:1]]
import { extract } from "./internals/color/format/lch.js";
import {
  correctHueClockwise,
  correctHueCounterClockwise,
} from "./internals/color/convert/setup.js";
import { lch, oklab } from "./color_convert.js";
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
 * As of v0.2.0, hue adjustment is done in the Oklab color space instead of HSL.
 *
 * @param {number} offset - the rotational offset from current hue
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function hue(offset, color) {
  const [L, C, h, alpha] = pipe(color, oklab, extract);
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
    A === 1 ? `oklab(${L} ${C} ${H})` : `lch(${L} ${C} ${H} / ${A})`,
    color,
  );
}

/** Shorthand for `hue()` */
export const h = hue;
// hue:1 ends here

// [[file:README.org::*saturation][saturation:1]]
import {
  calcFractionFromPercent,
  calcPercentFromFraction,
  normalize,
} from "./internals/color/convert/setup.js";

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
 * As a value, amount is locked to a range of 0-100%. If
 * the calculation would yield a value out of bounds, the minimum or
 * maximum is returned.
 *
 * At 0%, a color is achromatic (gray). At 100%, a color is fully saturated.
 *
 * As of v0.2.0, saturation adjustment is done in the Oklab color space instead of HSL.
 *
 * @param {number} amount - the amount to adjust saturation (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function saturation(amount, color) {
  const [L, c, H, alpha] = pipe(color, oklab, extract);

  const chroma = parseFloat(c) + calcFractionFromPercent(amount * 0.5);

  // Chroma should be >0 and <=0.5
  let C;
  if (Math.sign(chroma) === -1) {
    C = 0;
  } else if (chroma > 0.5) {
    C = 0.5;
  } else {
    C = chroma;
  }

  const A = (alpha && (alpha ?? 1)) || 1;

  return preserve(
    A === 1 ? `oklab(${L} ${C} ${H})` : `oklab(${L} ${C} ${H} / ${A})`,
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
 * As of v0.2.0, lightness adjustment is done in the Oklab color space instead of HSL.
 *
 * @param {number} amount - the amount to adjust lightness (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function lightness(amount, color) {
  const [l, C, H, alpha] = pipe(color, oklab, extract);

  const lightness = parseFloat(l) + calcFractionFromPercent(amount * 100);

  let L;
  if (Math.sign(lightness) === -1) {
    L = 0;
  } else if (lightness > 100) {
    L = 100;
  } else {
    L = lightness;
  }

  const A = (alpha && (alpha ?? 1)) || 1;

  return preserve(
    A === 1 ? `oklab(${L}% ${C} ${H})` : `oklab(${L}% ${C} ${H} / ${A})`,
    color,
  );
}

/** An alias for `lightness()` */
export const luminance = lightness;

/** Shorthand for `lightness()` */
export const l = lightness;
// lightness:1 ends here

// [[file:README.org::*alpha][alpha:1]]
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
 * alpha(-30, "lime");
 * ```
 *
 * @remarks
 * As a percentage value, amount is locked to a range of 0-100%. If
 * the calculation would yield a value out of bounds, the minimum or
 * maximum is returned.
 *
 * At 0%, a color is fully transparent. At 100%, fully opaque.
 *
 * As of v0.2.0, alpha adjustment is done in the Oklab color space instead of HSL.
 *
 * @param {number} amount - the amount to adjust transparency (as a percentage)
 * @param {string} color - the color to adjust
 * @returns {string} The adjusted color
 */
export function alpha(amount, color) {
  const [L, C, H, a] = pipe(color, oklab, extract);

  const alpha = parseFloat(a ?? 1) + calcFractionFromPercent(amount);

  let A;
  if (Math.sign(alpha) === -1) {
    A = 0;
  } else if (alpha > 1) {
    A = 1;
  } else {
    A = alpha;
  }

  return preserve(
    A === 1 ? `oklab(${L} ${C} ${H})` : `oklab(${L} ${C} ${H} / ${A})`,
    color,
  );
}

/** An alias for `alpha()` */
export const transparency = alpha;

/** Shorthand for `alpha()` */
export const a = alpha;
// alpha:1 ends here
