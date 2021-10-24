// [[file:Mod.org::*Importing Utility Helpers][Importing Utility Helpers:1]]
import { compose, curry, pipe } from "./lib/utilities/fp.js";
import {
  convert,
  extractor,
  hueCorrection,
  normalize,
  numberFromPercent,
  numberToPercent,
  output,
  parser,
  passthrough,
  precision,
  radToDegrees,
  rgbToLrgb,
  validator,
} from "./lib/utilities/color/index.js";
import {
  bumpVersion,
  cssFormatStructure,
  metadataEmitter,
  MissingProjectMetadataError,
  timestampEmitter,
  tokenStringIdentifier,
  yamlDictScale,
  yamlDictSubcategory,
  yamlDictValue,
} from "./lib/formatters/index.js";
import { QSCError } from "./lib/error.js";
import { A11Y_PALETTE, SYSTEM_FONT_STACKS } from "./lib/data.js";
// Importing Utility Helpers:1 ends here

// [[file:Mod.org::*Compose][Compose:1]]
/**
 * A utility for combining the behavior of other utilities.
 *
 * @template X, FX
 * @template R, Result
 * @template {(x: FX) => R} UnaryFn
 * @template {UnaryFn[]} Pipeline
 * @template {(x : X) => Result} Fn
 *
 * @param {Pipeline} fns - utilities to combine
 * @returns {Fn}
 */
export function utility_compose(...fns) {
  return compose(...fns);
}
// Compose:1 ends here

// [[file:Mod.org::*Curry][Curry:1]]
/**
 * A utility for preloading the modifiers of a binary utility.
 *
 * @template Y, FY
 * @template X, FX
 * @template R, Result
 * @template {(y: FY, x: FX) => R} BinaryFn
 * @template {(x : X) => Result} Fn
 *
 * @param {BinaryFn} fn - utility to transform
 * @param {Y} modifiers - output settings
 * @returns {Fn}
 */
export function utility_curry(fn, modifiers) {
  return curry(fn)(modifiers);
}
// Curry:1 ends here

// [[file:Mod.org::*Pipe][Pipe:1]]
/**
 * A utility for constructing data pipelines.
 *
 * @template X, FX
 * @template R, Result
 * @template {(x: FX) => R} UnaryFn
 * @template {UnaryFn[]} Pipeline
 *
 * @param {X} x - data to pipe
 * @param {Pipeline} fns - pipeline operations
 * @returns {Result}
 */
export function utility_pipe(x, ...fns) {
  return pipe(x, ...fns);
}
// Pipe:1 ends here

// [[file:Mod.org::*Color Conversion][Color Conversion:1]]
/**
 * A utility to convert a valid CSS color to its hexadecimal equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hex(color) {
  return compose(curry(convert)("hex"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `rgb()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_rgb(color) {
  return compose(curry(convert)("rgb"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `hsl()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hsl(color) {
  return compose(curry(convert)("hsl"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `device-cmyk()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cmyk(color) {
  return compose(curry(convert)("cmyk"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `hwb()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hwb(color) {
  return compose(curry(convert)("hwb"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `lab()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cielab(color) {
  return compose(curry(convert)("cielab"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `lch()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cielch(color) {
  return compose(curry(convert)("cielch"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its Oklab (LCh) equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 *
 * @remarks
 * Oklab is non-standard and has no browser support, so convert any Oklab
 * colors to a standard format before using them.
 */
export function color_to_oklab(color) {
  return compose(curry(convert)("oklab"), passthrough)(color);
}
// Color Conversion:1 ends here

// [[file:Mod.org::*Color Inspection][Color Inspection:1]]
/**
 * A utility that allows you to inspect useful data about a color.
 *
 * @param {string} color - the color to inspect
 * @returns {{
 *  original: string,
 *  extracted: string[],
 *  parsed: number[],
 *  to: {
 *    hex: string,
 *    rgb: string,
 *    hsl: string,
 *    cmyk: string,
 *    hwb: string,
 *    cielab: string,
 *    cielch: string,
 *    oklab: string,
 *  }
 * }}
 *
 * @remarks
 * `original` property is the unaltered valid color input.
 *
 * The `extracted` property of the returned object contains the color's raw components,
 * while the `parsed` property contains its calculated values.
 *
 * + hex channels become rgb values
 * + rgb channels are converted to the `0-1` range
 * + degree values converted to radians
 * + etc...
 *
 * `to` is an object containing all the valid color formats the inspected color can convert to.
 */
export function color_inspect(color) {
  const [format, _value] = validator(color);

  // If validated as a named color, convert to hex
  const value = format === "named" ? color_to_hex(_value) : _value;

  return {
    original: _value,
    extracted: extractor(value)[1],
    parsed: parser(value)[1],
    to: {
      hex: color_to_hex(color),
      rgb: color_to_rgb(color),
      hsl: color_to_hsl(color),
      cmyk: color_to_cmyk(color),
      hwb: color_to_hwb(color),
      cielab: color_to_cielab(color),
      cielch: color_to_cielch(color),
      oklab: color_to_oklab(color),
    },
  };
}
// Color Inspection:1 ends here

// [[file:Mod.org::*Color Property Adjustment][Color Property Adjustment:1]]
/**
 * A utility that allows you to adjust the properties of any valid CSS color.
 *
 * @param {object} properties - the properties to adjust
 * @param {number} [properties.lightness] - adjust the color lightness/luminance
 * @param {number} [properties.chroma] - adjust the color chroma/intensity
 * @param {number} [properties.hue] - adjust the hue
 * @param {number} [properties.alpha] - adjust the alpha transparency
 *
 * @param {string} color - the color to adjust
 * @returns {string}
 */
export function color_adjust(properties, color) {
  // Initialize properties
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = properties;

  return pipe(
    color_to_oklab(color),
    extractor,
    ([, [L, C, H, A]]) => [
      normalize(200, 0, parseFloat(L) + lightness),
      normalize(1, 0, parseFloat(C) + numberFromPercent(chroma)),
      hueCorrection(parseFloat(H) + hue),
      parseFloat(A ?? 1) + numberFromPercent(alpha),
    ],
    ([L, C, H, A]) => output(["oklab", [String(L).concat("%"), C, H, A]]),
    curry(revert)(color),
  );
}

function revert(color, output) {
  return pipe(
    output,
    validator,
    ([, output]) => [output, color],
    ([output, color]) =>
      pipe(
        color,
        validator,
        ([format]) =>
          format === "named"
            ? color_to_hex(output)
            : convert(format, output)[1],
      ),
    (output) => validator(output)[1],
  );
}
// Color Property Adjustment:1 ends here

// [[file:Mod.org::*Color Mixture][Color Mixture:1]]
/**
 * A utility for mixing any valid CSS color with a target color.
 *
 * @param {object} modifiers - mixture options
 * @param {number} [modifiers.amount] - amount to mix with target
 * @param {string} [modifiers.target] - the target color to mix
 *
 * @param {string} color - the color to mix
 * @returns {string}
 */
export function color_mix({ amount = 50, target = "black" }, color) {
  return pipe(
    calculateMix(color, target, numberFromPercent(amount)),
    ([L, a, b, A]) => [
      numberToPercent(L).toString().concat("%"),
      Math.sqrt(a ** 2 + b ** 2).toFixed(4),
      hueCorrection(radToDegrees(Math.atan2(b, a))),
      A,
    ],
    (components) => output(["oklab", components]),
    curry(revert)(color),
  );
}

function calculateMix(original, target, amount) {
  const [OL, Oa, Ob, OA] = pipe(
    original,
    color_to_oklab,
    parser,
    ([, components]) => components,
  );
  const [TL, Ta, Tb, TA] = pipe(
    target,
    color_to_oklab,
    parser,
    ([, components]) => components,
  );

  return [
    [OL, TL],
    [Oa, Ta],
    [Ob, Tb],
    [OA, TA],
  ].map(([X, Y]) => X + (Y - X) * amount);
}
// Color Mixture:1 ends here

// [[file:Mod.org::*Interpolation][Interpolation:1]]
/**
 * A utility to create an interpolated color scale from any valid CSS color.
 *
 * @param {object} modifiers - color interpolation options
 * @param {number} [modifiers.lightness] - adjust the color lightness/luminance
 * @param {number} [modifiers.chroma] - adjust the color chroma/intensity
 * @param {number} [modifiers.hue] - adjust the hue
 * @param {number} [modifiers.alpha] - adjust the alpha transparency
 * @param {number} [modifiers.values] - the number of output values (interpolation steps)
 *
 * @param {string} color - the color to interpolate
 * @returns {string[]}
 */
export function color_interpolation(modifiers, color) {
  // Set default modifiers
  const {
    lightness = 0,
    chroma = 0,
    hue = 0,
    alpha = 0,
    values = 10,
  } = modifiers;

  const calculateProperty = (property, pos) =>
    property - (property / values) * pos;

  return [
    ...new Set(
      Array.from({ length: values }, (_, pos) =>
        color_adjust(
          {
            lightness: calculateProperty(lightness, pos),
            chroma: calculateProperty(chroma, pos),
            hue: calculateProperty(hue, pos),
            alpha: calculateProperty(alpha, pos),
          },
          color,
        )).reverse(),
    ),
  ];
}
// Interpolation:1 ends here

// [[file:Mod.org::*Blending][Blending:1]]
/**
 * A utility to create a blended color scale from any valid CSS color.
 *
 * @param {object} modifiers - color blending options
 * @param {number} [modifiers.amount] - total amount of mixture with target
 * @param {string} [modifiers.target] - the blend target
 * @param {number} [modifiers.values] - the number of output values (blend steps)
 *
 * @param {string} color - the color to interpolate
 * @returns {string[]}
 */
export function color_blend(modifiers, color) {
  // Set default modifiers
  const { amount = 100, target = "black", values = 10 } = modifiers;

  return [
    ...new Set(
      Array.from(
        { length: values },
        (_, pos) =>
          color_mix(
            { amount: amount - (amount / values) * pos, target },
            color,
          ),
      ).reverse(),
    ),
  ];
}
// Blending:1 ends here

// [[file:Mod.org::*Material][Material:1]]
/**
 * A utility to create a material-esque color scale from any valid CSS color.
 *
 * @param {object} modifiers - color interpolation options
 * @param {number} [modifiers.light] - overall light color contrast
 * @param {number} [modifiers.dark] - overall dark color contrast
 *
 * @param {string} color - the color to generate from
 * @returns {string[]}
 */
export function color_material(modifiers, color) {
  // Set default modifiers
  const { light = 95, dark = 80 } = modifiers;

  return [
    ...color_tints({ contrast: light, values: 5 }, color).reverse(),
    color_mix(
      {
        amount: dark,
        target: color_mix(
          { amount: light / 10 - dark / 10, target: "black" },
          color,
        ),
      },
      color,
    ),
    ...color_shades({ contrast: dark, values: 4 }, color),
  ];
}
// Material:1 ends here

// [[file:Mod.org::*Color Schemes][Color Schemes:1]]
/**
 * A utility to generate a dyadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string] `[a, b]` where `a = color`, `b = 90deg clockwise from a`
 */
export function color_to_scheme_dyadic(color) {
  return generateUniformScheme({ count: 2, arc: 90 }, color);
}

/**
 * A utility to generate a complementary color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string] `[a, b]` where `a = color`, `b = 180deg from a`
 */
export function color_to_scheme_complementary(color) {
  return generateUniformScheme({ count: 2, arc: 180 }, color);
}

/**
 * A utility to generate an analogous color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string] `[a, b, c]` where `a = color`, `b,c = 45deg spread from a`
 */
export function color_to_scheme_analogous(color) {
  return generateUniformScheme({ count: 3, arc: 45 }, color);
}

/**
 * A utility to generate an split-complementary color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string] `[a, b, c]` where `a = color`, `b = 30deg left of opposite`, `c = 30deg right of opposite`
 */
export function color_to_scheme_split_complementary(color) {
  const [origin, complement] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: -30 }, complement),
    color_adjust({ hue: 30 }, complement),
  ];
}

/**
 * A utility to generate a triadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string] `[a, b, c]` where `a = color`, `b,c = 120deg spread from a`
 */
export function color_to_scheme_triadic(color) {
  return generateUniformScheme({ count: 3, arc: 120 }, color);
}

/**
 * A utility to generate a triadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string] `[a, b, c]` where `a = color`, `b = 90deg right of a`, `c = 90deg left of a`
 */
export function color_to_scheme_clash(color) {
  const [origin, right, , left] = Array.from(color_to_scheme_square(color));
  return [origin, right, left];
}

/**
 * A utility to generate a tetradic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string, string] `[a, b, c, d]` where `a = color`, `b = 45deg right of a`, `c = 180deg from a`, `d = 45deg right of c`
 */
export function color_to_scheme_tetradic(color) {
  const [origin, opposite] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: 45 }, origin),
    opposite,
    color_adjust({ hue: 45 }, opposite),
  ];
}

/**
 * A utility to generate a square color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string, string] `[a, b, c, d]` where `a = color`, `b,c,d = 90deg spread from a`
 */
export function color_to_scheme_square(color) {
  return generateUniformScheme({ count: 4, arc: 90 }, color);
}

/**
 * A utility to generate a five color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string, string, string] `[a, b, c, d, e]` where `a = color`, `b,c,d,e = 72deg spread from a`
 */
export function color_to_scheme_star(color) {
  return generateUniformScheme({ count: 5, arc: 72 }, color);
}

/**
 * A utility to generate a six color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns [string, string, string, string, string, string] `[a, b, c, d, e, f]` where `a = color`, `b,c,d,e,f = 60deg spread from a`
 */
export function color_to_scheme_hexagon(color) {
  return generateUniformScheme({ count: 6, arc: 60 }, color);
}

function generateUniformScheme({ count, arc }, color) {
  return Array.from(
    { length: count },
    (_, pos) => color_adjust({ hue: arc * pos }, color),
  );
}
// Color Schemes:1 ends here

// [[file:Mod.org::*Variants][Variants:1]]
/**
 * A utility to generate tints of any valid CSS color.
 *
 * @param {object} modifiers - tint options
 * @param {number} [modifiers.contrast] - percentage of contrast between tints
 * @param {number} [modifiers.values] - number of tints to generate
 *
 * @param color - the input color
 * @param {string[]}
 */
export function color_tints(modifiers, color) {
  // Set default modifiers
  const { contrast = 95, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "white" }, color);
}

/**
 * A utility to generate tones of any valid CSS color.
 *
 * @param {object} modifiers - tone options
 * @param {number} [modifiers.contrast] - percentage of contrast between tones
 * @param {number} [modifiers.values] - number of tones to generate
 *
 * @param color - the input color
 * @param {string[]}
 */
export function color_tones(modifiers, color) {
  // Set default modifiers
  const { contrast = 90, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "gray" }, color);
}
/**
 * A utility to generate shades of any valid CSS color.
 *
 * @param {object} modifiers - shade options
 * @param {number} [modifiers.contrast] - percentage of contrast between shades
 * @param {number} [modifiers.values] - number of shades to generate
 *
 * @param color - the input color
 * @param {string[]}
 */
export function color_shades(modifiers, color) {
  // Set default modifiers
  const { contrast = 80, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "black" }, color);
}
// Variants:1 ends here

// [[file:Mod.org::*Shifting][Shifting:1]]
/**
 * A utility to update a generated color scale by a given set of properties.
 *
 * @param {object} modifiers - palette shifting options
 * @param {number} [modifiers.lightness] - shift the palette lightness/luminance
 * @param {number} [modifiers.chroma] - shift the palette chroma/intensity
 * @param {number} [modifiers.hue] - shift the palette hue
 * @param {number} [modifiers.alpha] - shift the palette alpha transparency
 *
 * @param {string[]} palette - the palette to modify
 * @returns {string[]}
 *
 * @remarks
 * A color scale is just a plain array, generated or not. So you can also use this
 * utility to batch adjust arbitrary colors by a defined set of constraints.
 */
export function palette_shift(modifiers, palette) {
  // Set default modifiers
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = modifiers;

  return Array.from(
    new Set(
      palette.map((color) =>
        color_adjust({ lightness, chroma, hue, alpha }, color)
      ),
    ),
  );
}
// Shifting:1 ends here

// [[file:Mod.org::*Sorting][Sorting:1]]
/**
 * A utility to conditionally sort a generated color scale by a given property.
 *
 * @param {object} condition - palette sorting conditions
 * @param {"lightness" | "chroma" | "hue" | "alpha"} condition.property - the property to sort by
 * @param {"asc" | "desc"} [condition.order] - the sorting order
 *
 * @param {string[]} palette - the palette to modify
 * @returns {string[]}
 *
 * @remarks
 * This utility is geared for perceptually accurate sorting, so the format
 * doesn't necessarily matter. That said, it will coerce all colors in the
 * scale to the format of the *first* color to ensure uniform output.
 */
export function palette_sort(condition, palette) {
  // Set default sort conditions
  const { property, order = "asc" } = condition;

  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(sortPalette)({ by: property, order }),
    curry(paletteFromOklab)(color),
  );
}

function paletteToOklabValues(palette) {
  return pipe(
    Array.from(palette),
    (palette) => palette.map((color) => color_to_oklab(color)),
    (palette) => palette.map((color) => extractor(color)),
    (palette) => palette.map(([, color]) => color),
    (palette) => palette.map((color) => color.map((C) => parseFloat(C))),
  );
}

function sortPalette({ by, order }, palette) {
  const evalCondition = (a, b) => (order === "desc" ? b - a : a - b);
  const sortingConditions = (property, order) =>
    new Map([
      ["lightness", ([A], [B]) => evalCondition(A, B)],
      ["chroma", ([, A], [, B]) => evalCondition(A, B)],
      ["hue", ([, , A], [, , B]) => evalCondition(A, B)],
      ["alpha", ([, , , A], [, , , B]) => evalCondition(A, B)],
    ]).get(property);

  return palette.sort(sortingConditions(by, order));
}

function paletteFromOklab(input, palette) {
  return pipe(
    palette,
    (palette) =>
      palette.map(([L, C, H, A]) =>
        output(["oklab", [L.toString().concat("%"), C, H, A ?? 1]])
      ),
    (palette) => new Set(palette.map((color) => revert(input, color))),
    Array.from,
  );
}
// Sorting:1 ends here

// [[file:Mod.org::*Filtering][Filtering:1]]
/**
 * A utility to conditionally filter a generated color scale by a given property.
 *
 * @param {object} condition - palette filtering conditions
 * @param {"lightness" | "chroma" | "hue" | "alpha"} condition.property - the filtering target
 * @param {number} condition.min - the threshold value
 * @param {number} [condition.max] - the optional gate value
 *
 * @param {string[]} palette - the palette to modify
 * @returns {string[]}
 *
 * @remarks
 * This utility is geared for perceptually accurate filtering, so the format
 * doesn't necessarily matter. That said, it will coerce all colors in the
 * scale to the format of the *first* color to ensure uniform output.
 *
 * Also be aware that filtering is absolute. The minimum and maximum will
 * ruthlessly cut out any colors that fall outside your defined range.
 *
 * Even if that means all of them. So be careful.
 */
export function palette_filter(condition, palette) {
  // Set default filtering conditions
  const { property, min, max = 0 } = condition;

  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(flushPalette)({ by: property, min, max }),
    curry(paletteFromOklab)(color),
  );
}

function flushPalette({ by, min, max }, palette) {
  return palette.filter(parseFlushCondition({ by, min, max }));
}

function parseFlushCondition({ by, min, max }) {
  const filterCondition = (v) => (max ? v > min && v < max : v > min);
  const filterConditionAsNumber = (v) =>
    max
      ? v > numberFromPercent(min) && v < numberFromPercent(max)
      : v > numberFromPercent(min);
  const matchProperty = (property) =>
    new Map([
      ["lightness", ([V]) => filterCondition(V)],
      ["chroma", ([, V]) => filterConditionAsNumber(V)],
      ["hue", ([, , V]) => filterCondition(V)],
      ["alpha", ([, , , V]) => filterConditionAsNumber(V)],
    ]).get(property);

  return matchProperty(by);
}
// Filtering:1 ends here

// [[file:Mod.org::*Colors Project Web Defaults][Colors Project Web Defaults:1]]
/**
 * A data utility for using colors from the Colors (https://clrs.cc) project.
 *
 * @param {"navy" | "blue" | "aqua" | "teal" | "lime" | "olive" | "green" | "lime" | "yellow" | "maroon" | "fuchsia" | "purple" | "black" | "gray" | "grey" | "silver" | "white"} color - defined color keys
 * @returns {string}
 */
export function data_clrs(color) {
  return A11Y_PALETTE[color] || UndefinedInA11yPaletteError();
}

function UndefinedInA11yPaletteError() {
  throw new QSCError({
    name: "No Matching Keyword in A11y Palette",
    reason: `
This error throws when the input doesn't match any defined
colors in the Colors project.
`,
    suggestion: `
Valid colors in the Colors (https://clrs.cc) project:

+--------------------------------------+
| navy   | blue      | aqua   | teal   |
+--------------------------------------+
| olive  | green     | lime   | yellow |
+--------------------------------------+
| maroon | fuschia   | purple | black  |
+--------------------------------------+
| gray/grey | silver | white  |        |
+--------------------------------------+
`,
  });
}
// Colors Project Web Defaults:1 ends here

// [[file:Mod.org::*Color Contrast Ratio][Color Contrast Ratio:1]]
/**
 * A utility that filters a generated color scale by WCAG contrast ratio recommendations.
 *
 * @param {object} condition - contrast ratio options
 * @param {"AA" | "AAA"} [condition.rating] - the target contrast grade
 * @param {boolean} [condition.enhanced] - use the enhanced grading?
 * @param {string} [condition.background] - the background color to compare against
 *
 * @param {string[]} palette - the palette to filter
 * @returns {string[]}
 *
 * @remarks
 * "AA" rating is set by default. The background color is "white" by default
 */
export function palette_contrast(condition, palette) {
  // Set default modifiers
  const { rating = "AA", enhanced = false, background = "white" } = condition;

  return palette.filter((foreground) => {
    const CONTRAST_RATIO = calculateWCAGContrastRatio(background, foreground);
    return contrastCriteria(CONTRAST_RATIO, enhanced).get(rating);
  });
}

function calculateWCAGContrastRatio(a, b) {
  return [a, b]
    .map((color) => calculateRelativeLuminance(color))
    .sort((a, b) => b - a)
    .map((L) => L + 0.05)
    .reduce((L1, L2) => precision(L1 / L2));
}

function contrastCriteria(ratio, enhanced) {
  return new Map([
    ["AA", enhanced ? ratio >= 4.5 : ratio >= 3.1],
    ["AAA", enhanced ? ratio >= 7 : ratio >= 4.5],
  ]);
}

function calculateRelativeLuminance(color) {
  return pipe(
    color,
    color_to_rgb,
    parser,
    ([, [R, G, B]]) => [R, G, B],
    rgbToLrgb,
    ([R, G, B]) => 0.2126 * R + 0.7152 * G + 0.0722 * B,
  );
}
// Color Contrast Ratio:1 ends here

// [[file:Mod.org::*System Font Stacks][System Font Stacks:1]]
/**
 * A data formula for using system font stacks (https://systemfontstack.com).
 *
 * @param {"sans" | "serif" | "monospace"} family - the stack to use
 * @returns {string}
 */
export function data_systemfonts(family) {
  return SYSTEM_FONT_STACKS[family] || NotASystemFontFamilyError();
}

function NotASystemFontFamilyError() {
  throw new QSCError({
    name: "Not a System Font Stack",
    reason: `
The value entered is not a valid system font family.
`,
    suggestion: `
The available values matching system font families are:

sans
serif
monospace
`,
  });
}
// System Font Stacks:1 ends here

// [[file:Mod.org::*Scale Creation][Scale Creation:1]]
/**
 * A utility for creating modular scales from a base value.
 *
 * @param {object} modifiers - modular scale options
 * @param {number} [modifiers.ratio] - the ratio to calculate the scale
 * @param {number} [modifiers.values] - the total number of values to generate
 *
 * @param {number} base - the base value to generate from
 * @returns {number[]}
 *
 * @remarks
 * This utility is the starting point for using modular scales in Quarks System
 * Core. Once generated, you can modify it with the other modular scale utilities.
 *
 * @see {@link ms_modify} for updating modular scales
 * @see {@link ms_split} for partitioning larger scales
 * @see {@link ms_units} for attaching CSS units
 */
export function ms_create(modifiers, base) {
  // Set default modifiers
  const { values = 6, ratio = 1.5 } = modifiers;

  return Array.isArray(ratio)
    ? Array.from(
      new Set(
        Array(values)
          .fill(base)
          .reduce(
            (acc, base, index) => [
              ...acc,
              ...ratio.map((r) => base * r ** index),
            ],
            [],
          ),
      ),
    )
      .slice(0, values)
      .sort((a, b) => a - b)
    : Array(values)
      .fill(base)
      .map((base, index) => base * ratio ** index);
}
// Scale Creation:1 ends here

// [[file:Mod.org::*Scale Modification][Scale Modification:1]]
/**
 * A utility for modifying a modular scale.
 *
 * @param {(n: number) => number} calc - the calculation that will modify each scale value
 * @param {number[]} ms - the scale to modify
 * @returns {number[]}
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * The `n` parameter of the calc function represents existing scale values. So
 * `(n) => n / 2` means "divide each scale value by 2".
 *
 * @see {@link ms_create} for creating a modular scale
 */
export function ms_modify(calc, ms) {
  return unlessMS(
    ms.map((n) => calc(n)),
    ms,
  );
}

/**
 * A utility for splitting a modular scale into an array of partitions.
 *
 * @param {number} partitionSize - the number of values in each partition
 * @param {number[]} ms - the scale to partition
 * @returns {number[][]}
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * The scale values will fill partitions evenly. If the scale doesn't have enough
 * values to fill the last partition, it'll be filled with the remaining values.
 *
 * So a 25 value scale with a partition size of 3 will have the remainder (1) in
 * its last partition.
 *
 * @see {@link ms_create} for creating a modular scale
 */
export function ms_split(partitionSize, ms) {
  return unlessMS(
    Array.from(ms).reduceRight(
      (acc, _n, _index, array) => [...acc, array.splice(0, partitionSize)],
      [],
    ),
    ms,
  );
}

function unlessMS(body, data) {
  return Array.isArray(data) && data.every((n) => typeof n === "number")
    ? body
    : NotARawMSError(data);
}

function NotARawMSError() {
  throw new QSCError({
    name: "Input Must Be Raw Modular Scale",
    reason: `
You've called a modular scale function with something other than a modular
scale. So the function cannot work.
`,
    suggestion: `
Remember that scale modification functions only work on a scale of raw values.
Do all of your value transformations before you invoke ms_units().

Also, remember to create a raw scale with ms_create(). Such as the following:

ms_create({ values: 8, ratio: 1.618 }, 1);
`,
  });
}
// Scale Modification:1 ends here

// [[file:Mod.org::*Attaching Units][Attaching Units:1]]
// Define unit typedefs
/**
 * @typedef {"cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px"} CSSAbsoluteUnits
 * @typedef {"em" | "ex" | "ch" | "rem" | "lh" | "vw" | "vh" | "vmin" | "vmax"} CSSRelativeUnits
 * @typedef {CSSRelativeUnits | CSSAbsoluteUnits | "%"} CSSUnits
 */

/**
 * A utility for attaching CSS relative/absolute units to a modular scale.
 *
 * @param {CSSUnits} unit  - the number of values in each partition
 * @param {number[]} ms - the scale to transform
 * @returns {string[]}
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * Important to note: this utility doesn't do any calculation. Its only purpose is to
 * attach your units and limit the precision of scale values. I've found 5 decimal
 * places is a good balance for accuracy and usability.
 *
 * @see {@link ms_create} for creating a modular scale
 * @see {@link ms_modify} for performing calculations on raw scales
 */
export function ms_units(unit, ms) {
  return unlessMS(
    ms.map((n) => `${precision(n)}${unit}`, ms),
    ms,
  );
}
// Attaching Units:1 ends here

// [[file:Mod.org::*Quarks System Dictionary Typedefs][Quarks System Dictionary Typedefs:1]]
/**
 * @typedef {object} QSDMetadata - Quarks System Dictionary general metadata (can be project or category local)
 * @property {string} description - category description (can be multiline)
 * @property {string} comments - supplementary information (can be multiline)
 */

/**
 * @typedef {object} QSDProject - Quarks System Dictionary project metadata (required by token exporters)
 * @property {string} name - project name (e.g. "Your Project Name")
 * @property {string} author - project author (e.g. "Ed N. Bacon", "Compucorp")
 * @property {string} version - project version (e.g. "0.0.0")
 * @property {"major" | "minor" | "patch" | "pre" | "build" } [bump] - optional autoversioning
 * @property {string} license - project license (e.g. "Unlicense")
 * @property {QSDMetadata} [metadata] - optional project metadata
 */

/**
 * @typedef {string | number} QSValue - value
 */

/**
 * @typedef {QSValue[]} QSScale - array of values
 */

/**
 * @typedef {{base: QSValue, [index: string]: QSValue | QSScale | QSDSubcategory }} QSDSubcategory - token subcategory (base represents default, any other properties are variants)
 */

/**
 * @typedef {{[index: string]: QSValue | QSScale | QSDSubcategory| QSDMetadata | object | QSDTokens }} QSDTokens - design tokens (consumed recursively by token exporters)
 */

/**
 * @typedef {{project?: QSDProject, [index: string]: QSDTokens }} QSD - Quarks System Dictionary design token spec
 */
// Quarks System Dictionary Typedefs:1 ends here

// [[file:Mod.org::*Custom Properties][Custom Properties:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as CSS custom properties.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are always wrapped in a `:root` selector.
 */
export function tokens_to_css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Sass][Sass:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as Sass variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Sass variables. No mapping.
 *
 * @see {@link tokens_to_style_dictionary} for exporting tokens to Style Dictionary,
 * which does allow output as Sass maps
 */
export function tokens_to_scss(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "$" },
    },
    dict,
  );
}
// Sass:1 ends here

// [[file:Mod.org::*Less][Less:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as Less variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Less variables.
 */
export function tokens_to_less(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "@" },
    },
    dict,
  );
}
// Less:1 ends here

// [[file:Mod.org::*Stylus][Stylus:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as Stylus variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Stylus variables.
 */
export function tokens_to_styl(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "", assignment: " = ", suffix: "" },
    },
    dict,
  );
}
// Stylus:1 ends here

// [[file:Mod.org::*JSON][JSON:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as JSON data.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_json(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  return JSON.stringify({ project, tokens }, null, 2);
}
// JSON:1 ends here

// [[file:Mod.org::*YAML][YAML:1]]
/**
 * A utility for exporting a complete Quarks System Dictionary as YAML data.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  // Recursively assemble the data tree
  const assemble = (level, tree) =>
    Object.entries(tree).reduce((str, [key, data]) => {
      if (typeof data === "string") return yamlDictValue(level, str, key, data);
      if (Array.isArray(data)) return yamlDictScale(level, str, key, data);
      if (key === "base") return yamlDictSubcategory(level, data);
      return str.concat(
        "".padStart(level),
        key,
        ":\n",
        assemble(level + 2, data),
      );
    }, "");

  return `
# ${timestampEmitter()}
${
    Object.entries({ project, tokens })
      .reduce((str, [key, data]) => {
        if (typeof data === "string") return yamlDictValue(0, str, key, data);
        if (Array.isArray(data)) return yamlDictScale(0, str, key, data);
        if (key === "base") return yamlDictSubcategory(0, data);
        return str.concat("\n", key, ":\n", assemble(2, data));
      }, "")
      .trimEnd()
  }
`;
}
// YAML:1 ends here

// [[file:Mod.org::*GIMP/Inkscape][GIMP/Inkscape:1]]
/**
 * A utility for exporting Quarks System Dictionary colors as a GIMP/Inkscape palette.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_gpl(dict) {
  const {
    project,
    color: { metadata, ...palette },
  } = dict;
  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );
  // Then bump the version
  autobump && bumpVersion(project);

  const assemble = (head, node) =>
    Object.entries(node).reduce((str, [key, value]) => {
      const KEY = key.toUpperCase();

      if (typeof value === "object") {
        return str.concat(
          assemble(tokenStringIdentifier(head, KEY, " "), value),
        );
      }

      return str.concat(
        gimpPaletteSwatch(value),
        "\t",
        tokenStringIdentifier(head, KEY, " "),
        ` (${color_to_hex(value)})`,
        "\n",
      );
    }, "");

  return `
GIMP Palette
Name: ${name} (v${version})
# Generator: Quarks System Core
# Owned by ${author}
# License: ${license}
${
    metadataEmitter(
      { commentDelim: ["#", "# ", "\n#"] },
      {
        description,
        comments,
      },
    )
  }
# ${timestampEmitter()}

Columns: 6
${assemble("", palette)}
`.trimStart();
}

function gimpPaletteSwatch(color) {
  return pipe(color, color_to_rgb, extractor, ([, components]) =>
    components
      .map((C) => C.padStart(3, " "))
      .slice(0, 3)
      .join("\t"));
}
// GIMP/Inkscape:1 ends here

// [[file:Mod.org::*Sketch][Sketch:1]]
/**
 * A utility for exporting Quarks System Dictionary colors as a Sketch palette.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_sketchpalette(dict) {
  const {
    project,
    color: { metadata, ...palette },
  } = dict;

  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  const assemble = (tree) =>
    Object.values(tree)
      .map((data) => {
        if (Array.isArray(data)) {
          return data.map((color) => sketchSwatch(color)).flat();
        }

        if (typeof data === "object") {
          return assemble(data);
        }

        return sketchSwatch(data);
      })
      .flat();

  return JSON.stringify({
    colors: assemble(palette),
    pluginVersion: "1.4",
    compatibleVersion: "1.4",
  });
}

function sketchSwatch(color) {
  return pipe(color, color_to_rgb, parser, ([, [red, green, blue, alpha]]) => ({
    red,
    green,
    blue,
    alpha,
  }));
}
// Sketch:1 ends here

// [[file:Mod.org::*TailwindCSS][TailwindCSS:1]]
/**
 * A utility for exporting a Quarks System Dictionary as TailwindCSS theme data.
 *
 * @param {QSD} dict - the tokens to transform
 * @returns {object}
 */
export function tokens_to_tailwindcss(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "base") return { ...acc, DEFAULT: data };

      // Skip past any metadata
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: data };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}
// TailwindCSS:1 ends here

// [[file:Mod.org::*Style Dictionary][Style Dictionary:1]]
/**
 * A utility for exporting a Quarks System Dictionary as Style Dictionary tokens.
 *
 * @param {QSD} dict - the tokens to transform
 * @returns {object}
 */
export function tokens_to_style_dictionary(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: { value: String(data) } };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}
// Style Dictionary:1 ends here
