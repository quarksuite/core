// [[file:Mod.org::*Utilities][Utilities:1]]
import { compose, curry, pipe } from "./lib/utilities/fp.js";
import { convert, passthrough } from "./lib/utilities/color/converter/index.js";
import { rgbToLrgb } from "./lib/utilities/color/converter/color_from_rgb.js";
import {
  hueCorrection,
  normalize,
  numberFromPercent,
  numberToPercent,
  precision,
  radToDegrees,
} from "./lib/utilities/color/converter/math.js";
import { validator } from "./lib/utilities/color/validator/index.js";
import { extractor } from "./lib/utilities/color/extractor/index.js";
import { output, parser } from "./lib/utilities/color/parser/index.js";
import { QSCError } from "./lib/error.js";
import { A11Y_PALETTE } from "./lib/data.js";
// Utilities:1 ends here

// [[file:Mod.org::*Functional Programming][Functional Programming:1]]
export { compose, curry, pipe } from "./lib/utilities/fp.js";
// Functional Programming:1 ends here

// [[file:Mod.org::*Color Conversion][Color Conversion:1]]
export function hex(color) {
  return compose(curry(convert)("hex"), passthrough)(color);
}

export function rgb(color) {
  return compose(curry(convert)("rgb"), passthrough)(color);
}

export function hsl(color) {
  return compose(curry(convert)("hsl"), passthrough)(color);
}

export function cmyk(color) {
  return compose(curry(convert)("cmyk"), passthrough)(color);
}

export function hwb(color) {
  return compose(curry(convert)("hwb"), passthrough)(color);
}

export function cielab(color) {
  return compose(curry(convert)("cielab"), passthrough)(color);
}

export function cielch(color) {
  return compose(curry(convert)("cielch"), passthrough)(color);
}

export function oklab(color) {
  return compose(curry(convert)("oklab"), passthrough)(color);
}
// Color Conversion:1 ends here

// [[file:Mod.org::*Color Format Comparison][Color Format Comparison:1]]
export function compare(formats, color) {
  return formats.reduce(
    (acc, format) => ({
      ...acc,
      original: color,
      [format.name]: format(color),
    }),
    {},
  );
}
// Color Format Comparison:1 ends here

// [[file:Mod.org::*Color Property Adjustment][Color Property Adjustment:1]]
export function adjust(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0 },
  color,
) {
  return pipe(
    oklab(color),
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
          format === "named" ? hex(output) : convert(format, output)[1],
      ),
    (output) => validator(output)[1],
  );
}
// Color Property Adjustment:1 ends here

// [[file:Mod.org::*Color Mixture][Color Mixture:1]]
export function mix({ amount = 50, target }, color) {
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
    oklab,
    parser,
    ([, components]) => components,
  );
  const [TL, Ta, Tb, TA] = pipe(
    target,
    oklab,
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
export function interpolate(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0, values = 7 },
  color,
) {
  const calculateProperty = (property, pos) =>
    property - (property / values - 1) * pos;
  return Array.from(
    new Set(
      Array(values + 1)
        .fill(color)
        .map((color, pos) => {
          return adjust(
            {
              lightness: calculateProperty(lightness, pos),
              chroma: calculateProperty(chroma, pos),
              hue: calculateProperty(hue, pos),
              alpha: calculateProperty(alpha, pos),
            },
            color,
          );
        }),
    ),
  )
    .reverse()
    .slice(0, -1);
}
// Interpolation:1 ends here

// [[file:Mod.org::*Blending][Blending:1]]
export function blend({ values = 3, amount = 100, target }, color) {
  return Array.from(
    new Set(
      Array(values)
        .fill(color)
        .map((color, index) => {
          return mix(
            { amount: amount - (amount / values) * index, target },
            color,
          );
        }),
    ),
  ).reverse();
}
// Blending:1 ends here

// [[file:Mod.org::*Material][Material:1]]
export function material({ light = 95, dark = 70 }, color) {
  return [
    ...blend({ amount: light, target: "white", values: 5 }, color).reverse(),
    mix(
      {
        amount: dark,
        target: mix({ amount: dark / 8, target: "black" }, color),
      },
      color,
    ),
    ...blend({ amount: dark, target: "black", values: 4 }, color),
  ];
}
// Material:1 ends here

// [[file:Mod.org::*Color Schemes][Color Schemes:1]]
export function complementary(color) {
  return Array(2)
    .fill(color)
    .map((color, index) => adjust({ hue: 180 * index }, color));
}

export function analogous(color) {
  return Array(3)
    .fill(color)
    .map((color, index) => adjust({ hue: 30 * index }, color));
}

export function splitComplementary(color) {
  return [
    adjust({}, color),
    ...Array(2)
      .fill(adjust({ hue: 180 }, color))
      .map((color, index) =>
        index === 0 ? adjust({ hue: -30 }, color) : adjust({ hue: 30 }, color)
      ),
  ];
}

export function triadic(color) {
  return Array(3)
    .fill(color)
    .map((color, index) => adjust({ hue: 120 * index }, color));
}

export function clash(color) {
  const [base, left, , right] = square(color);
  return [base, left, right];
}

export function tetradic(color) {
  return [
    ...Array(2)
      .fill(color)
      .map((color, index) => adjust({ hue: 60 * index }, color)),
    ...Array(2)
      .fill(adjust({ hue: 180 }, color))
      .map((color, index) => adjust({ hue: 60 * index }, color)),
  ];
}

export function square(color) {
  return Array(4)
    .fill(color)
    .map((color, index) => adjust({ hue: 90 * index }, color));
}

export function star(color) {
  return Array(5)
    .fill(color)
    .map((color, index) => adjust({ hue: 72 * index }, color));
}

export function hexagon(color) {
  return Array(6)
    .fill(color)
    .map((color, index) => adjust({ hue: 60 * index }, color));
}
// Color Schemes:1 ends here

// [[file:Mod.org::*Variants][Variants:1]]
export function tints({ amount = 95, values = 3 }, color) {
  return blend({ amount, values, target: "white" }, color);
}

export function tones({ amount = 90, values = 1 }, color) {
  return blend({ amount, values, target: "gray" }, color);
}

export function shades({ amount = 80, values = 2 }, color) {
  return blend({ amount, values, target: "black" }, color);
}
// Variants:1 ends here

// [[file:Mod.org::*Shifting][Shifting:1]]
export function shift(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0 },
  palette,
) {
  return Array.from(
    new Set(
      palette.map((color) => adjust({ lightness, chroma, hue, alpha }, color)),
    ),
  );
}
// Shifting:1 ends here

// [[file:Mod.org::*Shuffling][Shuffling:1]]
export function shuffle(condition, palette) {
  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(sortPalette)(condition),
    curry(paletteFromOklab)(color),
  );
}

function paletteToOklabValues(palette) {
  return pipe(
    Array.from(palette),
    (palette) => palette.map((color) => oklab(color)),
    (palette) => palette.map((color) => extractor(color)),
    (palette) => palette.map(([, color]) => color),
    (palette) => palette.map((color) => color.map((C) => parseFloat(C))),
  );
}

function sortPalette(condition, palette) {
  const sortingConditions = new Map([
    ["lightness", ([L], [LL]) => L - LL],
    ["lightness:desc", ([L], [LL]) => LL - L],
    ["chroma", ([, C], [, CC]) => C - CC],
    ["chroma:desc", ([, C], [, CC]) => CC - C],
    ["hue", ([, , H], [, , HH]) => H - HH],
    ["hue:desc", ([, , H], [, , HH]) => HH - H],
    ["alpha", ([, , , A], [, , , AA]) => A - AA],
    ["alpha:desc", ([, , , A], [, , , AA]) => AA - A],
  ]);

  return palette.sort(sortingConditions.get(condition));
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
// Shuffling:1 ends here

// [[file:Mod.org::*Flushing][Flushing:1]]
export function flush(condition, palette) {
  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(flushPalette)(condition),
    curry(paletteFromOklab)(color),
  );
}

function flushPalette(condition, palette) {
  return palette.filter(parseFlushCondition(condition));
}

function parseFlushCondition(condition) {
  const [PROPERTY, VALUES] = matchCondition(condition);
  const [MIN, MAX] = VALUES.split("&");
  if (MAX) {
    return new Map([
      ["lightness:", ([L]) => L >= MIN && L <= MAX],
      [
        "chroma:",
        ([, C]) => C >= numberFromPercent(MIN) && C <= numberFromPercent(MAX),
      ],
      ["hue:", ([, , H]) => H >= MIN && H <= MAX],
      [
        "alpha:",
        ([, , H]) => H >= numberFromPercent(MIN) && H <= numberFromPercent(MAX),
      ],
    ]).get(PROPERTY);
  }

  return new Map([
    ["lightness:", ([L]) => L >= MIN],
    ["chroma:", ([, C]) => C >= numberFromPercent(MIN)],
    ["hue:", ([, , H]) => H >= MIN],
    ["alpha:", ([, , , A]) => A >= numberFromPercent(MIN)],
  ]).get(PROPERTY);
}

function matchCondition(condition) {
  return condition.match(
    /(?:(?:lightness|chroma|hue|alpha):|(?:[\d.]+))(?:&[\d.]+)?/g,
  );
}
// Flushing:1 ends here

// [[file:Mod.org::*Colors Project Web Defaults][Colors Project Web Defaults:1]]
export function clrs(color) {
  return A11Y_PALETTE[color] || UndefinedInA11yPaletteError(color);
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
export function contrast(
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
    rgb,
    parser,
    ([, [R, G, B]]) => [R, G, B],
    rgbToLrgb,
    ([R, G, B]) => 0.2126 * R + 0.7152 * G + 0.0722 * B,
  );
}
// Color Contrast Ratio:1 ends here
