// [[file:README.org::*create][create:1]]
/**
 * Create a new modular scale.
 *
 * @example Create a 6 value scale from base of 1 with ratio of 1.5
 *
 * ```ts
 * create(6, 1.5, 1);
 * ```
 *
 * @param {number} values - the number of values to include (output range)
 * @param {number} ratio - the ratio maintained between each value
 * @param {number} base - the initial scale value
 * @returns {number[]} An array of raw modular scale values
 */
export const create = (values, ratio, base) =>
  Array(values).fill(base).map((base, index) => base * ratio ** index);
// create:1 ends here

// [[file:README.org::*update][update:1]]
import { ErrorTemplate } from "./internals/error.js";

const ScaleError = (output) =>
  ErrorTemplate({
    message: "not a modular scale",
    reason: `
This error triggers when the value passed in as scale is not actually
a modular scale.
`,
    suggestion: `
Ensure that you only use scale modification functions on modular scales.
Create one with create()

Example:

create(8, 2, 1);

  `,
    output,
  });

function unlessMS(body, data) {
  if (
    Array.isArray(data) && data.length &&
    data.every((n) => typeof n === "number")
  ) {
    return body;
  }

  return ScaleError(data);
}

/**
 * Update a scale with a calculation mapping to each value.
 *
 * @example Add ten to each scale value
 *
 * ```ts
 * update(n => n + 10, create(4, 2, 1));
 * ```
 *
 * @param {(n: number) => number} calc - the desired calculation to modify each scale value
 * @param {number[]} scale - the scale to update
 * @returns {number[]} A new scale with updated values
 */
export const update = (calc, scale) =>
  unlessMS(scale.map((n) => calc(n)), scale);
// update:1 ends here

// [[file:README.org::*merge][merge:1]]
/**
 * Merge two or more scales into a scale of their unique values.
 *
 * @example Merge scale a with scale b
 *
 * ```ts
 * merge(create(5, 1.5, 1), create(8, 1.25, 1));
 * ```
 *
 * @param {number[][]} scales - the scales to merge
 * @returns {number[]} A new scale of unique values
 */
export const merge = (...scales) =>
  scales.every((scale) => unlessMS(scale, scale)) && [
    ...new Set(scales.reduce((acc, scale) => [...acc, ...scale], [])),
  ].sort((a, b) => a - b);
// merge:1 ends here

// [[file:README.org::*chunk][chunk:1]]
/**
 * Splits a scale into smaller scales of a given size.
 *
 * @example Split a 30 value scale into 6 chunks of 5 values
 *
 * ```ts
 * chunk(6, create(30, 1.414, 1));
 * ```
 *
 * @param {number} size - the number of values in each chunk
 * @param {number[]} scale - the scale to chunk
 * @returns {number[][]} A new scale of chunked scale values
 */
export const chunk = (size, scale) =>
  unlessMS(
    Array.from(scale).reduceRight(
      (acc, _v, _i, arr) => [...acc, arr.splice(0, size)],
      [],
    ),
    scale,
  );
// chunk:1 ends here

// [[file:README.org::*units][units:1]]
import { significant } from "./internals/color/convert/setup.js";

const precision = significant.bind(null, 4);

/**
 * Attach units to a raw scale to create a CSS-ready modular scale.
 *
 * @example Output a scale as rems
 *
 * ```ts
 * units("rem", create(7, 1.25, 1));
 * ```
 *
 * @param { "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px" | "em" | "ex" | "ch" | "rem" | "lh" | "vw" | "vh" | "vmin" | "vmax" } unit - any valid relative or absolute CSS unit
 * @param {number[]} scale - the raw scale to generate from
 * @returns {string[]} A finished modular scale now ready to use
 */
export const units = (unit, scale) =>
  unlessMS(scale.map((n) => `${precision(n)}${unit}`), scale);
// units:1 ends here
