// [[file:../../../README.org::*scheme (=src/color/scheme/custom.js=)][scheme (=src/color/scheme/custom.js=):1]]
import { hue } from "../adjust/hue.js";

function generate({ hues, arc, offset = 0 }, color) {
  const values = Array(offset ? hues - 1 : hues + 1).fill(arc);
  const half = Math.ceil(values.length / 2);
  const [leftOfOrigin, rightOfOrigin] = [
    values.slice(0, half),
    values.slice(half, values.length),
  ];
  return offset
    ? [
      ...new Set([
        hue(0, color),
        ...leftOfOrigin.map((v, i) => hue(-(v * i) - offset, color)),
        ...rightOfOrigin.map((v, i) => hue(v * i + offset, color)),
      ]),
    ] // Must preserve the origin with offset
    : [
      ...new Set([
        ...leftOfOrigin.map((v, i) => hue(-(v * i) - offset, color)),
        ...rightOfOrigin.map((v, i) => hue(v * i + offset, color)),
      ]),
    ]; // Must add an extra hue to generate from origin
}

/**
 * A function for creating advanced schemes from any valid CSS color.
 *
 * ```ts
 * // pentad
 * scheme({ hues: 5, arc: 72 }, "#e33a00");
 *
 * // hexad
 * scheme({ hues: 6, arc: 60 }, "hsl(320grad, 75%, 50%)");
 *
 * // octad
 * scheme({ hues: 8, arc: 45}, "rgb(120, 230, 72)");
 *
 * // with offset
 * scheme({ hues: 4, arc: 30, offset: 180}, "royalblue");
 * ```
 *
 * @param {{hues: number, arc: number, offset?: number}} attrs - A configuration object defining desired hues (minus overlapping values), arc distance between each hue from the origin, and optional rotation offset
 * @param {string} color - the base color to generate scheme
 * @returns {string[]} A collection of base hues for a custom scheme
 */
export const scheme = (attrs, color) => generate(attrs, color);
// scheme (=src/color/scheme/custom.js=):1 ends here
