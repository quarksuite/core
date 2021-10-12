// [[file:Mod.org::*Utilities][Utilities:1]]
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
import { QSCError } from "./lib/error.js";
import { A11Y_PALETTE, SYSTEM_FONT_STACKS } from "./lib/data.js";
// Utilities:1 ends here

// [[file:Mod.org::*Functional Programming][Functional Programming:1]]
export {
  compose as utility_compose,
  curry as utility_curry,
  pipe as utility_pipe,
} from "./lib/utilities/fp.js";
// Functional Programming:1 ends here

// [[file:Mod.org::*Color Conversion][Color Conversion:1]]
export function color_to_hex(color) {
  return compose(curry(convert)("hex"), passthrough)(color);
}

export function color_to_rgb(color) {
  return compose(curry(convert)("rgb"), passthrough)(color);
}

export function color_to_hsl(color) {
  return compose(curry(convert)("hsl"), passthrough)(color);
}

export function color_to_cmyk(color) {
  return compose(curry(convert)("cmyk"), passthrough)(color);
}

export function color_to_hwb(color) {
  return compose(curry(convert)("hwb"), passthrough)(color);
}

export function color_to_cielab(color) {
  return compose(curry(convert)("cielab"), passthrough)(color);
}

export function color_to_cielch(color) {
  return compose(curry(convert)("cielch"), passthrough)(color);
}

export function color_to_oklab(color) {
  return compose(curry(convert)("oklab"), passthrough)(color);
}
// Color Conversion:1 ends here

// [[file:Mod.org::*Color Format Comparison][Color Format Comparison:1]]
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
export function color_adjust(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0 },
  color,
) {
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

// [[file:Mod.org::*Palette Shifting][Palette Shifting:1]]
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
// Palette Shifting:1 ends here

// [[file:Mod.org::*Palette Sorting][Palette Sorting:1]]
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
// Palette Sorting:1 ends here

// [[file:Mod.org::*Palette Filtering][Palette Filtering:1]]
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
// Palette Filtering:1 ends here

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
