// [[file:README.org::*Color Scales (=color_scale.js=)][Color Scales (=color_scale.js=):1]]
import { mix } from "./color_mix.js";

const generate = (color, target, contrast, count) =>
  Array.from(Array(count).fill(color)).map((base, index) =>
    mix(contrast - (contrast / count) * index, target, base)
  );
// Color Scales (=color_scale.js=):1 ends here

// [[file:README.org::*tints][tints:1]]
import { pipe } from "./utilities.js";
import { extract } from "./internals/color/format/hwb.js";
import { hwb } from "./color_convert.js";
import { preserve } from "./color_adjust.js";

/**
 * Generates tints from any valid CSS color.
 *
 * @example Generating 4 high contrast tints
 *
 * ```ts
 * tints(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure white creates a tint of that color.
 *
 * @param {number} count - number of tints to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of tints
 */
export const tints = (
  count,
  contrast,
  color,
) => [
  ...new Set([
    ...generate(color, "white", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// tints:1 ends here

// [[file:README.org::*tones][tones:1]]
/**
 * Generates tones from any valid CSS color.
 *
 * @example Generating 4 high contrast tones
 *
 * ```ts
 * tones(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure gray creates a tone of that color.
 *
 * Be aware that tone is also another way of referring to the hue.
 *
 * @param {number} count - number of tones to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of tones
 */
export const tones = (
  count,
  contrast,
  color,
) => [
  ...new Set([
    ...generate(color, "gray", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort(
        (a, b) =>
          parseFloat(a[1]) +
          parseFloat(a[2]) -
          (parseFloat(b[1]) + parseFloat(b[2])),
      )
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// tones:1 ends here

// [[file:README.org::*shades][shades:1]]
/**
 * Generates shades from any valid CSS color.
 *
 * @example Generating 4 high contrast shades
 *
 * ```ts
 * shades(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure black creates a shade of that color.
 *
 * @param {number} count - number of shades to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of shades
 */
export const shades = (
  count,
  contrast,
  color,
) => [
  ...new Set([
    ...generate(color, "black", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort((a, b) => parseFloat(a[2]) - parseFloat(b[2]))
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// shades:1 ends here
