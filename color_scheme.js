// [[file:README.org::*complementary][complementary:1]]
import { hue } from "./color_adjust.js";

/**
 * Creates a complementary color scheme from any valid CSS color.
 *
 * @example Creating a complementary scheme
 *
 * ```ts
 * complementary("coral");
 * ```
 *
 * @remarks
 * A complementary color scheme is composed of a base color and its
 * opposite on the color wheel. It is a scheme with the highest possible
 * warm/cool color contrast.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string]} The base hues for a complementary color scheme
 */
export const complementary = (color) => [hue(0, color), hue(180, color)];
// complementary:1 ends here

// [[file:README.org::*analogous][analogous:1]]
/**
 * Creates an analogous color scheme from any valid CSS color.
 *
 * @example Creating an analogous color scheme
 *
 * ```ts
 * analogous("coral");
 * ```
 *
 * @remarks
 * An analogous color scheme is composed of a color and its directly
 * adjacent counterparts on the color wheel; hues about 30° apart from
 * the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a analogous color scheme
 */
export const analogous = (color) => [
  hue(0, color),
  hue(-30, color),
  hue(30, color),
];
// analogous:1 ends here

// [[file:README.org::*splitComplementary][splitComplementary:1]]
function tri(arc, color) {
  const complement = hue.bind(null, 180);

  return [
    hue(0, color),
    hue(arc, complement(color)),
    hue(-arc, complement(color)),
  ];
}

/**
 * Creates a split complementary color scheme from any valid CSS color.
 *
 * @example Creaing a split complementary scheme
 *
 * ```ts
 * splitComplementary("coral");
 * ```
 *
 * @remarks
 * A split complementary scheme is composed of a base color and a bisection
 * of colors directly next to its opposite; hues about 30° apart.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a split complementary color scheme
 */
export const splitComplementary = (color) => tri(30, color);
// splitComplementary:1 ends here

// [[file:README.org::*triadic][triadic:1]]
/**
 * Creates a triadic color scheme from any valid CSS color.
 *
 * @example Creating a triadic color scheme
 *
 * ```ts
 * triadic("coral");
 * ```
 *
 * @remarks
 * A triadic color scheme is composed of three colors evenly spaced around
 * the color wheel; the origin and two hues 60° apart from the complement.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a triadic color scheme
 */
export const triadic = (color) => tri(60, color);
// triadic:1 ends here

// [[file:README.org::*tetradic][tetradic:1]]
function quad(offset, color) {
  const origin = hue(0, color);
  const complement = hue(180, color);

  return [origin, hue(-offset, origin), complement, hue(-offset, complement)];
}

/**
 * Creates a tetradic color scheme from any valid CSS color.
 *
 * @example Creating a tetradic color scheme
 *
 * ```ts
 * tetradic("coral");
 * ```
 *
 * @remarks
 * A tetradic color scheme consists of a color, its opposite, and a
 * second complementary pair of colors. They are also called dual
 * complementary schemes.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a tetradic color scheme
 */
export const tetradic = (color) => quad(60, color);

/** An alias for `tetradic()` */
export const dualComplementary = tetradic;
// tetradic:1 ends here

// [[file:README.org::*square][square:1]]
/**
 * Creates a square color scheme from any valid CSS color.
 *
 * @example Creating a square color scheme
 *
 * ```ts
 * square("coral");
 * ```
 *
 * @remarks
 * A square color scheme consists of four colors positioned equally
 * around the color wheel; hues 90° apart from the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a square color scheme
 */
export const square = (color) => quad(90, color);
// square:1 ends here

// [[file:README.org::*custom][custom:1]]
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
 * custom({ hues: 5, arc: 72 }, "#e33a00");
 * ```
 *
 * @example Creating a six tone color scheme
 *
 * ```ts
 * custom({ hues: 6, arc: 60 }, "hsl(320grad, 75%, 50%)");
 * ```
 * @example  Creating an accented split complementary
 *
 * ```ts
 * custom({ hues: 4, arc: 30, offset: 150 }, "royalblue");
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
export const custom = (attrs, color) => generate(attrs, color);
// custom:1 ends here
