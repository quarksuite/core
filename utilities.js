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

// [[file:Mod.org::*Color Format Comparison][Color Format Comparison:1]]
/**
 * A utility that allows you to compare possible output formats of a color.
 *
 * @param {((color: string) => string)[]} formats - array of target color formats
 * @param {string} color - the color to compare
 * @returns {{original: string, [formats: string]: string}}
 */
export function color_format_compare(formats, color) {
  return formats.reduce(
    (acc, format) => ({
      ...acc,
      original: color,
      [format.name.split("_")[2]]: format(color),
    }),
    {},
  );
}
// Color Format Comparison:1 ends here

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
export function color_interpolation(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0, values = 10 },
  color,
) {
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
export function color_blend(
  { amount = 100, target = "black", values = 10 },
  color,
) {
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
export function color_material({ light = 95, dark = 80 }, color) {
  return [
    ...color_tints({ amount: light, values: 5 }, color).reverse(),
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
    ...color_shades({ amount: dark, values: 4 }, color),
  ];
}
// Material:1 ends here

// [[file:Mod.org::*Color Schemes][Color Schemes:1]]
export function color_to_scheme_dyadic(color) {
  return generateUniformScheme({ count: 2, arc: 90 }, color);
}

export function color_to_scheme_complementary(color) {
  return generateUniformScheme({ count: 2, arc: 180 }, color);
}

export function color_to_scheme_analogous(color) {
  return generateUniformScheme({ count: 3, arc: 45 }, color);
}

export function color_to_scheme_split_complementary(color) {
  const [origin, complement] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: -30 }, complement),
    color_adjust({ hue: 30 }, complement),
  ];
}

export function color_to_scheme_triadic(color) {
  return generateUniformScheme({ count: 3, arc: 120 }, color);
}

export function color_to_scheme_clash(color) {
  const [origin, right, , left] = Array.from(color_to_scheme_square(color));
  return [origin, right, left];
}

export function color_to_scheme_tetradic(color) {
  const [origin, opposite] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: 45 }, origin),
    opposite,
    color_adjust({ hue: 45 }, opposite),
  ];
}

export function color_to_scheme_square(color) {
  return generateUniformScheme({ count: 4, arc: 90 }, color);
}

export function color_to_scheme_star(color) {
  return generateUniformScheme({ count: 5, arc: 72 }, color);
}

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
export function color_tints({ amount = 95, values = 3 }, color) {
  return color_blend({ amount, values, target: "white" }, color);
}

export function color_tones({ amount = 90, values = 3 }, color) {
  return color_blend({ amount, values, target: "gray" }, color);
}

export function color_shades({ amount = 80, values = 3 }, color) {
  return color_blend({ amount, values, target: "black" }, color);
}
// Variants:1 ends here

// [[file:Mod.org::*Shifting][Shifting:1]]
export function palette_shift(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0 },
  palette,
) {
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
export function palette_sort({ by, order = "asc" }, palette) {
  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(sortPalette)({ by, order }),
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
export function palette_filter({ by, min, max }, palette) {
  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(flushPalette)({ by, min, max }),
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
| black  | gray/grey | silver | white  |
+--------------------------------------+
`,
  });
}
// Colors Project Web Defaults:1 ends here

// [[file:Mod.org::*Color Contrast Ratio][Color Contrast Ratio:1]]
export function palette_contrast(
  { rating = "AA", enhanced = false, background = "white" },
  palette,
) {
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
export function ms_create({ values = 6, ratio = 1.5 }, base) {
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
export function ms_modify(calc, ms) {
  return unlessMS(
    ms.map((n) => calc(n)),
    ms,
  );
}

export function ms_split(partitions, ms) {
  return unlessMS(
    Array.from(ms).reduceRight(
      (acc, _n, _index, array) => [...acc, array.splice(0, partitions)],
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
export function tokens_to_css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Sass][Sass:1]]
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
