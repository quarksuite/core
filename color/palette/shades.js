// [[file:../../README.org::*shades (=color/palette/shades.js=)][shades (=color/palette/shades.js=):1]]
import { pipe } from "../../utilities/pipe.js";
import { generate } from "./setup.js";
import { extract } from "../../internals/color/format/hwb.js";
import { hwb } from "../conversion/hwb.js";
import { preserve } from "../adjust/setup.js";

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
export const shades = (count, contrast, color) =>
  generate(color, "black", contrast, count)
    .map((color) => pipe(color, hwb, extract))
    .sort((a, b) => parseFloat(a[2]) - parseFloat(b[2]))
    .map(([H, W, B, A]) => `hwb(${H} ${W} ${B} / ${A ?? 1})`)
    .map((target) => preserve(target, color));
// shades (=color/palette/shades.js=):1 ends here
