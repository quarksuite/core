// [[file:Mod.org::*Importing Formula Helpers][Importing Formula Helpers:1]]
import { precision } from "./lib/utilities/color/index.js";
import {
  color_blend,
  color_interpolation,
  color_material,
  color_shades,
  color_tints,
  color_to_hex,
  color_tones,
  data_systemfonts,
  ms_create,
  ms_modify,
  ms_units,
  utility_curry,
  utility_pipe,
} from "./utilities.js";
// Importing Formula Helpers:1 ends here

// [[file:Mod.org::*Material Palette][Material Palette:1]]
export function MaterialPalette(
  { light = 95, dark = 75, scheme = undefined, format = undefined },
  color,
) {
  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format, scheme }),
    utility_curry(generateMaterialPalette)({ light, dark }),
  );
}

function paletteSettings({ scheme, format }, color) {
  return utility_pipe(
    color,
    (color) => (format ? format(color) : color_to_hex(color)),
    (color) => (scheme ? scheme(color) : [color]),
  );
}

function generateMaterialPalette({ light, dark }, palette) {
  return utility_pipe(
    palette,
    (palette) => palette.map((color) => color_material({ light, dark }, color)),
    (palette) =>
      palette.reduce((acc, value, index) => {
        return {
          ...acc,
          [alphabeticalCategories(index)]: {
            ...value.reduce(
              (a, v, i) => ({
                ...a,
                ...(i === 0 ? { 50: v } : { [`${i}`.padEnd(3, "0")]: v }),
              }),
              {},
            ),
          },
        };
      }, {}),
  );
}
// Material Palette:1 ends here

// [[file:Mod.org::*Standard Palette][Standard Palette:1]]
export function StandardPalette(
  {
    format = undefined,
    scheme = undefined,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
  },
  color,
) {
  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format, scheme }),
    utility_curry(generateArtisticPalette)({
      contrast,
      values: { tints, tones, shades },
    }),
  );
}
// Standard Palette:1 ends here

// [[file:Mod.org::*Interpolated Palette][Interpolated Palette:1]]
export function InterpolatedPalette(
  {
    lightness = 0,
    chroma = 0,
    hue = 0,
    values = 1,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    format = undefined,
  },
  color,
) {
  return utility_pipe(
    format ? format(color) : color_to_hex(color),
    (color) => [
      color,
      ...(values === 1 ? [] : color_interpolation(
        { lightness, chroma, hue, values: values - 1 },
        color,
      )),
    ],
    utility_curry(generateArtisticPalette)({
      contrast,
      values: { tints, tones, shades },
    }),
  );
}
// Interpolated Palette:1 ends here

// [[file:Mod.org::*Blended Palette][Blended Palette:1]]
export function BlendedPalette(
  {
    values = 1,
    amount = 50,
    target = "black",
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    format = undefined,
  },
  color,
) {
  return utility_pipe(
    format ? format(color) : color_to_hex(color),
    (color) => [
      color,
      ...(values === 1
        ? []
        : color_blend({ target, amount, values: values - 1 }, color)),
    ],
    utility_curry(generateArtisticPalette)({
      contrast,
      values: { tints, tones, shades },
    }),
  );
}
// Blended Palette:1 ends here

// [[file:Mod.org::*Artistic Palette Setup][Artistic Palette Setup:1]]
function generateArtisticPalette({ contrast, values }, palette) {
  // Oklab trends a little dark, so tones and shades need adjustment
  const ADJUSTMENT_VALUE = 1.27;

  return utility_pipe(
    palette,
    (palette) =>
      palette.map((color, index) => {
        const category = alphabeticalCategories(index);
        const light = color_tints(
          {
            values: values.tints,
            amount: contrast,
          },
          color,
        );
        const muted = color_tones(
          {
            values: values.tones,
            amount: contrast / ADJUSTMENT_VALUE,
          },
          color,
        );
        const dark = color_shades(
          { values: values.shades, amount: contrast / ADJUSTMENT_VALUE },
          color,
        );

        return [category, [color, light, muted, dark]];
      }),
    (palette) =>
      palette.reduce((acc, [key, [base, light, muted, dark]]) => {
        const variants = {
          ...(light.length ? { light: NumericColorScale(light) } : {}),
          ...(muted.length ? { muted: NumericColorScale(muted) } : {}),
          ...(dark.length ? { dark: NumericColorScale(dark) } : {}),
        };
        return {
          ...acc,
          [key]: {
            base,
            ...variants,
          },
        };
      }, {}),
  );
}

function alphabeticalCategories(index) {
  return new Map([
    ...Array(26)
      .fill(65)
      .map((v, i) => {
        const category = String.fromCharCode(v + i).toLowerCase(); // starting from "a"
        return [i, category];
      }),
  ]).get(index);
}
// Artistic Palette Setup:1 ends here

// [[file:Mod.org::*Text Families][Text Families:1]]
export function TextStack(fallback, font = null) {
  return font === null
    ? data_systemfonts(fallback)
    : [font, data_systemfonts(fallback)].join(", ");
}

export function TextStyle(weights) {
  return weights.reduce((acc, weight) => {
    const key = fontWeights(weight);

    return { ...acc, [key]: weight };
  }, {});
}

function fontWeights(weight) {
  return new Map([
    [100, "thin"],
    [200, "extralight"],
    [300, "light"],
    [400, "regular"],
    [500, "medium"],
    [600, "semibold"],
    [700, "bold"],
    [800, "extrabold"],
    [900, "black"],
  ]).get(weight);
}
// Text Families:1 ends here

// [[file:Mod.org::*Text Sizing][Text Sizing:1]]
export function TextSize(scale) {
  return Subcategory({ unit: "rem", inversionUnit: "em" }, scale);
}
// Text Sizing:1 ends here

// [[file:Mod.org::*Text Attributes][Text Attributes:1]]
export function TextLeading({ normal = 1.5, tight = 1.25 }, scale) {
  const [base, ratio] = Array.from(scale);

  return Object.entries(
    SubcategoryRange(
      {
        min: tight,
        max: normal,
        unit: "",
        keys: ["narrow", "tight"],
        calc: (n) => tight + (normal - tight) / (base * ratio ** n),
      },
      scale,
    ),
  ).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return { ...acc, [key]: value.map((n) => parseFloat(n)) };
    }
    return { ...acc, [key]: parseFloat(value) };
  }, {});
}

export function TextMeasure({ min = 45, max = 75 }, scale) {
  const [base, ratio] = Array.from(scale);
  return SubcategoryRange(
    {
      min,
      max,
      unit: "ch",
      keys: ["segment", "minimum"],
      calc: (n) => Math.trunc(min + (max - min) / (base * ratio ** n)),
    },
    scale,
  );
}
// Text Attributes:1 ends here

// [[file:Mod.org::*Text Spacing][Text Spacing:1]]
export function TextUnits(scale) {
  return Subcategory({ unit: "ex" }, scale);
}
// Text Spacing:1 ends here

// [[file:Mod.org::*Grid Formulas][Grid Formulas:1]]
export function GridFractions(scale) {
  return Subcategory({ unit: "fr" }, scale);
}

export function GridDimensions(columns, rows = columns) {
  const xs = spanCalculation(columns);
  const ys = spanCalculation(rows);

  return {
    x: xs[0],
    ...UnidirectionalScale("x", xs),
    y: xs[0],
    ...UnidirectionalScale("y", ys),
  };
}

function spanCalculation(xs) {
  return Array(xs)
    .fill(1)
    .map((x, pos) => x + pos);
}
// Grid Formulas:1 ends here

// [[file:Mod.org::*Global Scale Formula][Global Scale Formula:1]]
export function FigureCalculations(scale) {
  const [base] = Array.from(scale);
  const values = Array.from(scale);

  return {
    base,
    ...UnidirectionalScale(
      "x",
      values.map((n) => precision(n)),
    ),
  };
}
// Global Scale Formula:1 ends here

// [[file:Mod.org::*Viewport Formula][Viewport Formula:1]]
export function Viewport(
  { threshold = 5, full = 100, context = ["w", "h", "min", "max"] },
  scale,
) {
  const [base, ratio] = Array.from(scale);

  return context.reduce((acc, target) => {
    const [key, unit] = viewportTargets(target);

    return {
      ...acc,
      [key]: SubcategoryRange(
        {
          min: threshold,
          max: full,
          keys: ["segment", "threshold"],
          unit,
          calc: (n) =>
            Math.trunc(threshold + (full - threshold) / (base * ratio ** n)),
        },
        scale,
      ),
    };
  }, {});
}

function viewportTargets(target) {
  return new Map([
    ["width", ["width", "vw"]],
    ["w", ["width", "vw"]],
    ["height", ["height", "vh"]],
    ["h", ["height", "vh"]],
    ["minimum", ["min", "vmin"]],
    ["min", ["min", "vmin"]],
    ["maximum", ["max", "vmax"]],
    ["max", ["max", "vmax"]],
  ]).get(target);
}
// Viewport Formula:1 ends here

// [[file:Mod.org::*Animation Formulas][Animation Formulas:1]]
export function AnimationDuration({ fastest = 250, slowest = 1000 }, scale) {
  const [base, ratio] = Array.from(scale);
  return SubcategoryRange(
    {
      min: fastest,
      max: slowest,
      unit: "ms",
      keys: ["interval", "fastest"],
      calc: (n) => fastest + (slowest - fastest) / (base * ratio ** n),
    },
    scale,
  );
}

export function AnimationCubicBezier({ floor = 0, ceiling = 1 }, scale) {
  const [base, ratio] = Array.from(scale);
  const [maximum] = scale.slice(-1);

  const ABSCISSAS = new Set(
    ms_modify((n) => precision(n / maximum), scale).filter(
      (n) => n > 0 && n < 1,
    ),
  );

  const ORDINATES = new Set(
    ms_modify(
      (n) => precision(floor + (ceiling - floor) / (base * ratio ** n)),
      scale,
    ).filter((n) => n > floor && n < ceiling),
  );

  return {
    x: Array.from([0, ...ABSCISSAS, 1]),
    y: Array.from([floor, ...Array.from(ORDINATES).reverse(), ceiling]),
  };
}
// Animation Formulas:1 ends here

// [[file:Mod.org::*Subcategory Formulas][Subcategory Formulas:1]]
export function Subcategory({ unit, inversionUnit = undefined }, scale) {
  const [base] = Array.from(scale);
  const values = Array.from(scale);

  return {
    base: utility_pipe([base], utility_curry(ms_units)(unit)).toString(),
    ...BidirectionalScale(
      ["x", "d"],
      [
        ms_units(unit, values),
        utility_pipe(
          values,
          utility_curry(ms_modify)((n) => base / n),
          utility_curry(ms_units)(inversionUnit ? inversionUnit : unit),
        ),
      ],
    ),
  };
}

export function SubcategoryRange({ min, max, unit, keys, calc }, scale) {
  const output = utility_curry(ms_units)(unit);

  return RangedScale(keys, [
    output([max]).toString(),
    utility_pipe(
      new Set(ms_modify(calc, scale)),
      (scale) => Array.from(scale),
      (scale) => scale.filter((n) => n > min && n < max),
      output,
    ),
    output([min]).toString(),
  ]);
}
// Subcategory Formulas:1 ends here

// [[file:Mod.org::*Color Scale][Color Scale:1]]
export function NumericColorScale(data) {
  return data.reduce(
    (acc, value, index) => ({ ...acc, [`${++index}`.padEnd(3, "0")]: value }),
    {},
  );
}
// Color Scale:1 ends here

// [[file:Mod.org::*Modular Scale][Modular Scale:1]]
export function BidirectionalScale(keys, data) {
  const [x, d] = keys;
  const [multiply, divide] = Array.from(data);
  return {
    ...VariantScale(x, multiply),
    ...VariantScale(d, divide),
  };
}

export function UnidirectionalScale(key, data) {
  return VariantScale(key, data);
}

export function RangedScale(
  [rangeKey, floorKey] = ["fragment", "min"],
  [base, range, min],
) {
  return {
    base,
    [rangeKey]: range,
    [floorKey]: min,
  };
}

function VariantScale(key, [, ...values]) {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [[key, index + 2].join("")]: value,
    }),
    {},
  );
}
// Modular Scale:1 ends here
