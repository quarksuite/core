// [[file:../../README.org::*scheme (=color/scheme/custom.js=)][scheme (=color/scheme/custom.js=):1]]
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
 * @example Creating a five tone color scheme
 *
 * ```ts
 * scheme({ hues: 5, arc: 72 }, "#e33a00");
 * ```
 *
 * @example Creating a six tone color scheme
 *
 * ```ts
 * scheme({ hues: 6, arc: 60 }, "hsl(320grad, 75%, 50%)");
 * ```
 * @example  Creating an accented split complementary
 *
 * ```ts
 * scheme({ hues: 4, arc: 30, offset: 150 }, "royalblue");
 * ```
 *
 * @remarks
 * This function is for generating schemes beyond basic configuration.
 *
 * It allows setting any number of hues but will only generate unique colors.
 * The arc is the distance between each color on the wheel. The offset defines
 * degree of rotation for the generated hues from the origin.
 *
 * @param {{ hues: number, arc: number, offset?: number }} attrs - A configuration object defining desired hues (minus overlapping values), arc distance between each hue from the origin, and optional rotation offset
 * @param {string} color - the base color to generate scheme
 * @returns {string[]} A collection of base hues for a custom scheme
 */
export const scheme = (attrs, color) => generate(attrs, color);
// scheme (=color/scheme/custom.js=):1 ends here
