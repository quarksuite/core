// [[file:../../../README.org::*tints (=src/color/palette/tints.js=)][tints (=src/color/palette/tints.js=):1]]
import { pipe } from "../../utilities/pipe.js";
import { generate } from "./setup.js";
import { extract } from "../../internals/color/format/hwb.js";
import { hwb } from "../conversion/hwb.js";
import { preserve } from "../adjust/setup.js";

/**
 * Generates tints from any valid CSS color.
 *
 * ```ts
 * tints(4, 98, "royalblue");
 * ```
 *
 * @param {number} count - number of tints to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of tints
 */
export const tints = (count, contrast, color) =>
  generate(color, "white", contrast, count)
    .map((color) => pipe(color, hwb, extract))
    .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
    .map(([H, W, B, A]) => `hwb(${H} ${W} ${B} / ${A ?? 1})`)
    .map((target) => preserve(target, color));
// tints (=src/color/palette/tints.js=):1 ends here
