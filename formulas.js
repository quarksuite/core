// [[file:Mod.org::*Formulas][Formulas:1]]
import { precision } from "./lib/utilities/color/index.js";
import {
  BidirectionalScale,
  NumericColorScale,
  RangedScale,
  UnidirectionalScale,
} from "./configurations.js";
import {
  color_blend,
  color_interpolation,
  color_material,
  color_shades,
  color_tints,
  color_to_hex,
  ms_modify,
  ms_units,
  output_systemfonts,
  utility_curry,
  utility_pipe,
} from "./utilities.js";
// Formulas:1 ends here

// [[file:Mod.org::*Palette Formulas][Palette Formulas:1]]
export function MaterialPalette(
  { light = 95, dark = 70, scheme = undefined, format = undefined },
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

export function StandardPalette(
  {
    format = undefined,
    scheme = undefined,
    contrast = 95,
    tints = 3,
    shades = 2,
  },
  color,
) {
  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format, scheme }),
    utility_curry(structurePalette)({
      contrast,
      values: { tints, shades },
    }),
  );
}

export function InterpolatedPalette(
  {
    lightness = 0,
    chroma = 0,
    hue = 0,
    values = 1,
    contrast = 95,
    tints = 3,
    shades = 2,
    format = undefined,
  },
  color,
) {
  return utility_pipe(
    color_interpolation(
      { lightness, chroma, hue, values },
      format ? format(color) : color_to_hex(color),
    ),
    utility_curry(structurePalette)({
      contrast,
      values: { tints, shades },
    }),
  );
}

export function BlendedPalette(
  {
    values = 1,
    amount = 50,
    target = "black",
    contrast = 95,
    tints = 3,
    shades = 2,
    format = undefined,
  },
  color,
) {
  return utility_pipe(
    color_blend(
      { values, amount, target },
      format ? format(color) : color_to_hex(color),
    ),
    utility_curry(structurePalette)({
      contrast,
      values: { tints, shades },
    }),
  );
}

function structurePalette({ contrast, values }, palette) {
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
        const dark = color_shades(
          { values: values.shades, amount: contrast / 1.25 },
          color,
        );
        const fillDark = color_shades(
          {
            values: values.tints + values.shades,
            amount: contrast / 1.25,
          },
          color,
        );

        return [
          category,
          category === "main" || category === "a"
            ? [color, light, dark]
            : [color, fillDark],
        ];
      }),
    (palette) =>
      palette.reduce((acc, [key, data]) => {
        const [base, ...variants] = data;
        const [a, b] = variants;

        return {
          ...acc,
          [key]: {
            base,
            ...(variants.length === 2
              ? {
                light: NumericColorScale(a),
                dark: NumericColorScale(b),
              }
              : { dark: NumericColorScale(a) }),
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
// Palette Formulas:1 ends here

// [[file:Mod.org::*Typography Formulas][Typography Formulas:1]]
export function TextStack(fallback, font = null) {
  return font === null
    ? "".concat(output_systemfonts([fallback]))
    : [font, ...output_systemfonts([fallback])].join(", ");
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

export function TextSize(scale) {
  return Content(["rem", "em"], scale);
}

function Content([unit, inversionUnit], scale) {
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

export function TextLeading({ normal = 1.5, tight = 1.25 }, scale) {
  const [base, ratio] = Array.from(scale);

  return Object.entries(
    ContentRange(
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
  return ContentRange(
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

export function TextUnits(scale) {
  return Content(["ex"], scale);
}

function ContentRange({ min, max, unit, keys, calc }, scale) {
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
// Typography Formulas:1 ends here

// [[file:Mod.org::*Layout Formulas][Layout Formulas:1]]
export function GridFractions(scale) {
  return Content(["fr"], scale);
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

export function Viewport(
  { threshold = 5, full = 100, context = ["w", "h", "min", "max"] },
  scale,
) {
  const [base, ratio] = Array.from(scale);

  return context.reduce((acc, target) => {
    const [key, unit] = viewportTargets(target);

    return {
      ...acc,
      [key]: ContentRange(
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
// Layout Formulas:1 ends here

// [[file:Mod.org::*UI Formulas][UI Formulas:1]]

// UI Formulas:1 ends here
