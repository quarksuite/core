// [[file:../../README.org::*tones (=color/palette/tones.js=)][tones (=color/palette/tones.js=):1]]
import { pipe } from "../../utilities/pipe.js";
import { generate } from "./setup.js";
import { extract } from "../../internals/color/format/hwb.js";
import { hwb } from "../conversion/hwb.js";
import { preserve } from "../adjust/setup.js";

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
// tones (=color/palette/tones.js=):1 ends here
