// [[file:Mod.org::*Importing Formula Helpers][Importing Formula Helpers:1]]
import { precision } from "./lib/utilities/color/index.js";
import {
  color_blend,
  color_interpolation,
  color_material,
  color_shades,
  color_tints,
  color_to_cielab,
  color_to_cielch,
  color_to_cmyk,
  color_to_hex,
  color_to_hsl,
  color_to_hwb,
  color_to_oklab,
  color_to_rgb,
  color_to_scheme_analogous,
  color_to_scheme_clash,
  color_to_scheme_complementary,
  color_to_scheme_dyadic,
  color_to_scheme_hexagon,
  color_to_scheme_split_complementary,
  color_to_scheme_square,
  color_to_scheme_star,
  color_to_scheme_tetradic,
  color_to_scheme_triadic,
  color_tones,
  data_systemfonts,
  ms_create,
  ms_modify,
  ms_units,
  utility_curry,
  utility_pipe,
} from "./utilities.js";
// Importing Formula Helpers:1 ends here

// [[file:Mod.org::*Palette Formula Typedefs][Palette Formula Typedefs:1]]
/** @typedef {"dyadic" | "complementary" | "analgous" | "split" | "triadic" | "clash" | "tetradic" | "square" | "star" | "hexagon"} QSPaletteScheme - built-in color schemes for palette formulas */

/** @typedef {"hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "cielab" | "cielch" | "oklab"} QSPaletteFormat - built-in color formats for palette formulas */

/** @typedef {{
  [index: string]: {
    50: string,
    100: string,
    200: string,
    300: string
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string
  }
  }} QSPaletteMaterial - material palette color token structure */

/** @typedef {{
  [index: string]: {
    light?: {
      [index: string | number]: string
    },
    muted?: {
      [index: string | number]: string
    },
    dark?: {
      [index: string | number]: string
    },
  }
}} QSPaletteArtistic - artistic palette color tokens structure  */
// Palette Formula Typedefs:1 ends here

// [[file:Mod.org::*Material Palette][Material Palette:1]]
/**
 * A palette formula to generate `50-900` material-esque color tokens.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.light] - adjust the overall light contrast of the palette
 * @param {number} [modifiers.dark] - adjust the overall dark contrast of the palette
 *
 * @param {QSPaletteScheme} [modifiers.scheme] - configure the palette to use a color scheme
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteMaterial} output palette
 *
 * @remarks
 * If `modifiers.scheme` is set, the colors are mapped to an alphabetical index.
 * Since the most complex scheme is `"hexagon"`, this means the range is `a-f`.
 */
export function MaterialPalette(modifiers, color) {
  // Set default modifiers
  const {
    light = 95,
    dark = 75,
    scheme = undefined,
    format = undefined,
  } = modifiers;

  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format, scheme }),
    utility_curry(generateMaterialPalette)({ light, dark }),
  );
}
// Material Palette:1 ends here

// [[file:Mod.org::*Artistic Palette][Artistic Palette:1]]
/**
 * A palette formula to generate a standard artistic color palette.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory
 *
 * @param {QSPaletteScheme} [modifiers.scheme] - configure the palette to use a color scheme
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic} output palette
 *
 * @remarks
 * If `modifiers.scheme` is set, the colors are mapped to an alphabetical index.
 * Since the most complex scheme is `"hexagon"`, this means the range is `a-f`.
 *
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette
 */
export function ArtisticPalette(modifiers, color) {
  // Set default modifiers
  const {
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    format = undefined,
    scheme = undefined,
  } = modifiers;

  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format, scheme }),
    utility_curry(generateArtisticPalette)({
      contrast,
      values: { tints, tones, shades },
    }),
  );
}
// Artistic Palette:1 ends here

// [[file:Mod.org::*Interpolated Palette][Interpolated Palette:1]]
/**
 * An advanced palette formula to generate a color palette from interpolation.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.lightness] - interpolate to target lightness/luminance (+: brighten, -: darken)
 * @param {number} [modifiers.chroma] - interpolate to target chroma/intensity (+: saturate, -: desaturate)
 * @param {number} [modifiers.hue] - interpolate by hue rotation (+: right rotation, -: left rotation)
 * @param {number} [modifiers.alpha] - interpolate to target transparency (+: more opaque, -: more transparent)
 * @param {number} [modifiers.values] - total number of color categories
 *
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette (artistic)
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory (artistic)
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory (artistic)
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory (artistic)
 *
 * @param {boolean} [modifiers.material] - use material palette configuration
 * @param {number} [modifiers.light] - adjust the overall light contrast of the palette (material)
 * @param {number} [modifiers.dark] - adjust the overall dark contrast of the palette (material)
 *
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic | QSPaletteMaterial} output palette
 *
 * @remarks
 * The `values` you can generate are theoretically infinite, but the formula will only return
 * *unique* colors. There is no internal mechanism checking for similar colors, so it's up to you
 * to ensure your palette is distinct.
 *
 * If you're unsure how to do that, @see {@link MaterialPalette} and @see {@link ArtisticPalette}.
 *
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette.
 *
 * If `modifiers.material` is true, the palette will use the material structure
 * and *its* modifiers instead of the artistic.
 */
export function InterpolatedPalette(modifiers, color) {
  // Set default modifiers
  const {
    lightness = 0,
    chroma = 0,
    hue = 0,
    alpha = 100,
    values = 1,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    material = false,
    light = 90,
    dark = 75,
    format = undefined,
  } = modifiers;

  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format }),
    ([color]) => [
      color,
      ...(values === 1 ? [] : color_interpolation(
        { lightness, chroma, hue, alpha, values: values - 1 },
        color,
      )),
    ],
    material
      ? utility_curry(generateMaterialPalette)({ light, dark })
      : utility_curry(generateArtisticPalette)({
        contrast,
        values: { tints, tones, shades },
      }),
  );
}
// Interpolated Palette:1 ends here

// [[file:Mod.org::*Blended Palette][Blended Palette:1]]
/**
 * An advanced palette formula to generate a color palette from color blending.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.amount] - the total amount of color mixture (100 will fully mix)
 * @param {string} [modifiers.target] - the blend target color
 * @param {number} [modifiers.values] - total number of color categories
 *
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette (artistic)
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory (artistic)
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory (artistic)
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory (artistic)
 *
 * @param {boolean} [modifiers.material] - use material palette configuration
 * @param {number} [modifiers.light] - adjust the overall light contrast of the palette (material)
 * @param {number} [modifiers.dark] - adjust the overall dark contrast of the palette (material)
 *
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic | QSPaletteMaterial} output palette
 *
 * @remarks
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette.
 *
 * If `modifiers.material` is true, the palette will use the material structure
 * and *its* modifiers instead of the artistic.
 */
export function BlendedPalette(modifiers, color) {
  // Set default modifiers
  const {
    amount = 50,
    target = "black",
    values = 1,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    material = false,
    light = 90,
    dark = 75,
    format = undefined,
  } = modifiers;

  return utility_pipe(
    color,
    utility_curry(paletteSettings)({ format }),
    ([color]) => [
      color,
      ...(values === 1
        ? []
        : color_blend({ target, amount, values: values - 1 }, color)),
    ],
    material ? utility_curry(generateMaterialPalette)({ light, dark })
    : utility_curry(generateArtisticPalette)({
      contrast,
      values: { tints, tones, shades },
    }),
  );
}
// Blended Palette:1 ends here

// [[file:Mod.org::*Palette Setup][Palette Setup:1]]
function paletteSettings({ scheme, format }, color) {
  return utility_pipe(
    color,
    (color) => (format ? setFormat(format, color) : color_to_hex(color)),
    (color) => (scheme ? setScheme(scheme, color) : [color]),
  );
}

function setFormat(format, color) {
  return {
    hex: color_to_hex(color),
    rgb: color_to_rgb(color),
    hsl: color_to_hsl(color),
    cmyk: color_to_cmyk(color),
    hwb: color_to_hwb(color),
    cielab: color_to_cielab(color),
    cielch: color_to_cielch(color),
    oklab: color_to_oklab(color),
  }[format];
}

function setScheme(scheme, color) {
  return {
    dyadic: color_to_scheme_dyadic(color),
    analogous: color_to_scheme_analogous(color),
    complementary: color_to_scheme_complementary(color),
    split: color_to_scheme_split_complementary(color),
    triadic: color_to_scheme_triadic(color),
    clash: color_to_scheme_clash(color),
    tetradic: color_to_scheme_tetradic(color),
    square: color_to_scheme_square(color),
    star: color_to_scheme_star(color),
    hexagon: color_to_scheme_hexagon(color),
  }[scheme];
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
// Palette Setup:1 ends here

// [[file:Mod.org::*Typography Formula Typedefs][Typography Formula Typedefs:1]]

// Typography Formula Typedefs:1 ends here

// [[file:Mod.org::*Text Family][Text Family:1]]

export function TextFamily(modifiers, font = null) {
  const { system = "sans", weights = [400, 700] } = modifiers;

  return {
    family: generateStack(system, font),
    weight: generateWeights(weights),
  };
}

function generateStack(fallback, font = null) {
  return font === null
    ? data_systemfonts(fallback)
    : [font, data_systemfonts(fallback)].join(", ");
}

function generateWeights(weights) {
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
// Text Family:1 ends here

// [[file:Mod.org::*Text Sizing][Text Sizing:1]]
export function TextSize(ms) {
  return Subcategory({ unit: "rem", inversionUnit: "em" }, ms);
}
// Text Sizing:1 ends here

// [[file:Mod.org::*Text Attributes][Text Attributes:1]]
export function TextLeading({ normal = 1.5, tight = 1.25 }, ms) {
  const [base, ratio] = Array.from(ms);

  return Object.entries(
    SubcategoryRange(
      {
        min: tight,
        max: normal,
        unit: "",
        keys: ["narrow", "tight"],
      },
      ms,
    ),
  ).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return { ...acc, [key]: value.map((n) => Number(n)) };
    }
    return { ...acc, [key]: Number(value) };
  }, {});
}

export function TextMeasure({ min = 45, max = 75 }, ms) {
  return SubcategoryRange(
    {
      min,
      max,
      unit: "ch",
      keys: ["segment", "minimum"],
      trunc: true,
    },
    ms,
  );
}
// Text Attributes:1 ends here

// [[file:Mod.org::*Text Spacing][Text Spacing:1]]
export function TextUnits(ms) {
  return Subcategory({ unit: "ex" }, ms);
}
// Text Spacing:1 ends here

// [[file:Mod.org::*Grid Formulas][Grid Formulas:1]]
export function GridFractions(ms) {
  return Subcategory({ unit: "fr" }, ms);
}

export function GridDimensions(columns, rows = columns) {
  const xs = spanCalculation(columns);
  const ys = spanCalculation(rows);

  return {
    x: xs[0],
    ...generateUnidirectional("x", xs),
    y: ys[0],
    ...generateUnidirectional("y", ys),
  };
}

function spanCalculation(xs) {
  return Array(xs)
    .fill(1)
    .map((x, pos) => x + pos);
}
// Grid Formulas:1 ends here

// [[file:Mod.org::*Global Scale Formula][Global Scale Formula:1]]
export function FigureCalculations(ms) {
  return Object.entries(
    SubcategoryUnidirectional({ unit: "", variant: "x" }, ms),
  ).reduce((acc, [k, v]) => ({ ...acc, [k]: Number(v) }), {});
}
// Global Scale Formula:1 ends here

// [[file:Mod.org::*Viewport Formula][Viewport Formula:1]]
export function Viewport(
  { threshold = 5, full = 100, context = ["w", "h", "min", "max"] },
  ms,
) {
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
          trunc: true,
        },
        ms,
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
export function AnimationDuration({ fastest = 250, slowest = 1000 }, ms) {
  const [base, ratio] = Array.from(ms);
  return SubcategoryRange(
    {
      min: fastest,
      max: slowest,
      unit: "ms",
      keys: ["interval", "fastest"],
      calc: (n) => fastest + (slowest - fastest) / (base * ratio ** n),
    },
    ms,
  );
}

export function AnimationCubicBezier({ floor = 0, ceiling = 1 }, ms) {
  const [base, ratio] = Array.from(ms);
  const [maximum] = ms.slice(-1);

  const ABSCISSAS = new Set(
    ms_modify((n) => precision(n / maximum), ms).filter((n) => n > 0 && n < 1),
  );

  const ORDINATES = new Set(
    ms_modify(
      (n) => precision(floor + (ceiling - floor) / (base * ratio ** n)),
      ms,
    ).filter((n) => n > floor && n < ceiling),
  );

  return {
    x: Array.from([0, ...ABSCISSAS, 1]),
    y: Array.from([floor, ...Array.from(ORDINATES).reverse(), ceiling]),
  };
}
// Animation Formulas:1 ends here

// [[file:Mod.org::*Base Subcategory (Bidirectional)][Base Subcategory (Bidirectional):1]]
export function Subcategory({ unit = "rem", inversionUnit = undefined }, ms) {
  const [base] = Array.from(ms);
  const values = Array.from(ms);

  return {
    base: utility_pipe([base], utility_curry(ms_units)(unit)).toString(),
    ...generateScale(
      ["x", "d"],
      [
        ms_units(unit, values),
        utility_pipe(
          values,
          utility_curry(ms_modify)((n) => precision(base / n)),
          utility_curry(ms_units)(inversionUnit ? inversionUnit : unit),
        ),
      ],
    ),
  };
}
// Base Subcategory (Bidirectional):1 ends here

// [[file:Mod.org::*Unidirectional Subcategory][Unidirectional Subcategory:1]]
export function SubcategoryUnidirectional({ unit = "rem", variant = "x" }, ms) {
  const [base] = Array.from(ms);
  const values = Array.from(ms);

  const output = utility_curry(ms_units)(unit);

  return {
    base: output([base]).toString(),
    ...generateUnidirectional(
      variant,
      utility_pipe(values, (values) => values.map((n) => precision(n)), output),
    ),
  };
}
// Unidirectional Subcategory:1 ends here

// [[file:Mod.org::*Ranged Subcategory][Ranged Subcategory:1]]
export function SubcategoryRange(
  {
    min = 1,
    max = 10,
    unit = "rem",
    keys = ["segment", "minimum"],
    trunc = false,
  },
  ms,
) {
  const [base, ratio] = Array.from(ms);
  const output = utility_curry(ms_units)(unit);

  return generateRange(keys, [
    output([max]).toString(),
    utility_pipe(
      Array.from(
        new Set(
          ms_modify((n) => {
            const RANGE = min + (max - min) / (base * ratio ** n);
            return trunc ? Math.trunc(RANGE) : RANGE;
          }, ms),
        ),
      ),
      (ms) => ms.map((n) => precision(n)),
      (ms) => ms.filter((n) => n > min && n < max),
      output,
    ),
    output([min]).toString(),
  ]);
}
// Ranged Subcategory:1 ends here

// [[file:Mod.org::*General Formula Structure][General Formula Structure:1]]
function generateScale([x, d] = ["x", "d"], ms) {
  const [multiply, divide] = Array.from(ms);
  return {
    ...generateVariants(x, multiply),
    ...generateVariants(d, divide),
  };
}

function generateUnidirectional(x = "x", ms) {
  return generateVariants(x, ms);
}

function generateRange(
  [rangeKey, floorKey] = ["fragment", "min"],
  [base, range, min],
) {
  return {
    base,
    [rangeKey]: range,
    [floorKey]: min,
  };
}

function generateVariants(key, [, ...values]) {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [[key, index + 2].join("")]: value,
    }),
    {},
  );
}
// General Formula Structure:1 ends here

// [[file:Mod.org::*Color Scale][Color Scale:1]]
export function NumericColorScale(palette) {
  return palette.reduce(
    (acc, value, index) => ({ ...acc, [`${++index}`.padEnd(3, "0")]: value }),
    {},
  );
}
// Color Scale:1 ends here
