import {
  BlendedPalette,
  InterpolatedPalette,
  MaterialPalette,
  StandardPalette,
} from "./formulas.js";
import {
  color_to_hex,
  color_to_rgb,
  scheme_analogous,
  scheme_complementary,
  scheme_dyadic,
  scheme_square,
} from "./utilities.js";

import { benchmark, data, exception, init, suite } from "./tests/index.js";

const color = color_to_hex("coral");

const Palettes = [
  MaterialPalette,
  StandardPalette,
  InterpolatedPalette,
  BlendedPalette,
];

const testExceptions = [
  "Exceptions",
  [
    "reject invalid colors",
    Palettes.forEach((Formula) => exception(Formula, {}, "invalid")),
  ],
];

const testCommonScenarios = [
  "Common Scenarios",
  [
    "default configuration",
    data(MaterialPalette({}, color), {
      a: {
        50: "#fff9f6",
        100: "#ffe2d6",
        200: "#ffcab6",
        300: "#ffb295",
        400: "#ff9974",
        500: "#eb7449",
        600: "#c5613c",
        700: "#8f4429",
        800: "#5c2a17",
        900: "#2e1107",
      },
    }),
    data(StandardPalette({}, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        dark: { 100: "#864026", 200: "#1f0a04" },
      },
    }),
    data(InterpolatedPalette({}, color), {
      a: {
        base: "#ff7f49",
        light: { 100: "#ffaa87", 200: "#ffd2bf", 300: "#fff9f6" },
        dark: { 100: "#864022", 200: "#1f0a03" },
      },
    }),
    data(BlendedPalette({}, color), {
      a: {
        base: "#632d1a",
        light: { 100: "#956b5d", 200: "#c6ada5", 300: "#f7f4f2" },
        dark: { 100: "#301208", 200: "#060100" },
      },
    }),
  ],
  [
    "setting the palette format",
    data(MaterialPalette({ format: color_to_rgb }, color), {
      a: {
        50: "rgb(255, 249, 246)",
        100: "rgb(255, 226, 214)",
        200: "rgb(255, 202, 182)",
        300: "rgb(255, 178, 149)",
        400: "rgb(255, 153, 116)",
        500: "rgb(235, 116, 73)",
        600: "rgb(197, 97, 60)",
        700: "rgb(143, 68, 41)",
        800: "rgb(92, 42, 23)",
        900: "rgb(46, 17, 7)",
      },
    }),
    data(StandardPalette({ format: color_to_rgb }, color), {
      a: {
        base: "rgb(255, 127, 80)",
        light: {
          100: "rgb(255, 170, 138)",
          200: "rgb(255, 210, 193)",
          300: "rgb(255, 249, 246)",
        },
        dark: { 100: "rgb(134, 64, 38)", 200: "rgb(31, 10, 4)" },
      },
    }),
    data(InterpolatedPalette({ format: color_to_rgb }, color), {
      a: {
        base: "rgb(255, 127, 73)",
        light: {
          100: "rgb(255, 170, 135)",
          200: "rgb(255, 210, 191)",
          300: "rgb(255, 249, 246)",
        },
        dark: { 100: "rgb(134, 64, 34)", 200: "rgb(31, 10, 3)" },
      },
    }),
    data(BlendedPalette({ format: color_to_rgb }, color), {
      a: {
        base: "rgb(99, 45, 26)",
        light: {
          100: "rgb(149, 107, 93)",
          200: "rgb(198, 173, 165)",
          300: "rgb(247, 244, 242)",
        },
        dark: { 100: "rgb(48, 18, 8)", 200: "rgb(6, 1, 0)" },
      },
    }),
  ],
];

const testColorSchemes = [
  "MaterialPalette & StandardPalette",
  [
    "setting a color scheme",
    data(MaterialPalette({ scheme: scheme_dyadic }, color), {
      a: {
        50: "#fff9f6",
        100: "#ffe2d6",
        200: "#ffcab6",
        300: "#ffb295",
        400: "#ff9974",
        500: "#eb7449",
        600: "#c5613c",
        700: "#8f4429",
        800: "#5c2a17",
        900: "#2e1107",
      },
      b: {
        50: "#fcfbf5",
        100: "#f0ebd0",
        200: "#e4dba9",
        300: "#d8cb82",
        400: "#cdbb55",
        500: "#b29c00",
        600: "#968300",
        700: "#6b5d00",
        800: "#443b00",
        900: "#201b00",
      },
    }),
    data(StandardPalette({ scheme: scheme_analogous }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        dark: { 100: "#864026", 200: "#1f0a04" },
      },
      b: {
        base: "#d99e00",
        dark: {
          100: "#ae7e00",
          200: "#855f00",
          300: "#5e4200",
          400: "#3a2700",
          500: "#190f00",
        },
      },
      c: {
        base: "#85bd3d",
        dark: {
          100: "#6a972f",
          200: "#4f7322",
          300: "#375115",
          400: "#203109",
          500: "#0b1402",
        },
      },
    }),
  ],
];

const testPaletteSettings = [
  "StandardPalette, InterpolatedPalette, BlendedPalette",
  [
    "setting the overall contrast",
    data(StandardPalette({ contrast: 81 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffa482", 200: "#ffc6b1", 300: "#ffe8df" },
        dark: { 100: "#97482c", 200: "#3b180b" },
      },
    }),
    data(BlendedPalette({ contrast: 64 }, color), {
      a: {
        base: "#632d1a",
        light: { 100: "#855747", 200: "#a68276", 300: "#c7afa7" },
        dark: { 100: "#401b0e", 200: "#200a04" },
      },
    }),
    data(InterpolatedPalette({ contrast: 75 }, color), {
      a: {
        base: "#ff7f49",
        light: { 100: "#ffa17b", 200: "#ffc2a7", 300: "#ffe1d3" },
        dark: { 100: "#9e4c2a", 200: "#481f0e" },
      },
    }),
  ],
  [
    "setting number of tints and shades",
    data(StandardPalette({ tints: 2, shades: 1 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffbea6", 200: "#fff9f6" },
        dark: { 100: "#1f0a04" },
      },
    }),
    data(InterpolatedPalette({ tints: 3, shades: 3 }, color), {
      a: {
        base: "#ff7f49",
        light: { 100: "#ffaa87", 200: "#ffd2bf", 300: "#fff9f6" },
        dark: { 100: "#ad542e", 200: "#612c16", 300: "#1f0a03" },
      },
    }),
    data(BlendedPalette({ tints: 5, shades: 4 }, color), {
      a: {
        base: "#632d1a",
        light: {
          100: "#815242",
          200: "#9f786b",
          300: "#bca096",
          400: "#dac9c3",
          500: "#f7f4f2",
        },
        dark: {
          100: "#491f11",
          200: "#301208",
          300: "#190703",
          400: "#060100",
        },
      },
    }),
  ],
];

const testGeneratedValues = [
  "InterpolatedPalette & BlendedPalette",
  [
    "setting the total number of base values",
    data(InterpolatedPalette({ values: 2 }, color), {
      a: {
        base: "#ff7f41",
        light: { 100: "#ffaa83", 200: "#ffd2bd", 300: "#fff9f6" },
        dark: { 100: "#86401d", 200: "#1f0a02" },
      },
      b: {
        base: "#ff7f49",
        dark: {
          100: "#cd6539",
          200: "#9d4c29",
          300: "#70341b",
          400: "#451e0d",
          500: "#1f0a03",
        },
      },
    }),
    data(BlendedPalette({ values: 4 }, color), {
      a: {
        base: "#d66942",
        light: { 100: "#e79a7f", 200: "#f5c9ba", 300: "#fef8f5" },
        dark: { 100: "#6f331e", 200: "#180602" },
      },
      b: {
        base: "#ae5434",
        dark: {
          100: "#8b4228",
          200: "#69301c",
          300: "#4a2011",
          400: "#2c1007",
          500: "#120402",
        },
      },
      c: {
        base: "#874026",
        dark: {
          100: "#6b311c",
          200: "#512413",
          300: "#38160a",
          400: "#200a04",
          500: "#0b0201",
        },
      },
      d: {
        base: "#632d1a",
        dark: {
          100: "#4e2213",
          200: "#3a170b",
          300: "#270e05",
          400: "#150502",
          500: "#060100",
        },
      },
    }),
  ],
];

const testMaterialPalette = [
  "MaterialPalette",
  [
    "setting the light and dark contrast",
    data(MaterialPalette({ light: 75, dark: 50 }, color), {
      a: {
        50: "#ffe0d4",
        100: "#ffcebb",
        200: "#ffbba1",
        300: "#ffa887",
        400: "#ff946d",
        500: "#f4794d",
        600: "#d66942",
        700: "#ae5434",
        800: "#874026",
        900: "#632d1a",
      },
    }),
  ],
];

const testInterpolatedPalette = [
  "InterpolatedPalette",
  [
    "setting the color properties to interpolate",
    data(InterpolatedPalette({ hue: 30, values: 3 }, color), {
      a: {
        base: "#ff7f38",
        light: { 100: "#ffaa7f", 200: "#ffd2bb", 300: "#fff9f6" },
        dark: { 100: "#864018", 200: "#1f0a02" },
      },
      b: {
        base: "#ff8617",
        dark: {
          100: "#cd6a10",
          200: "#9d500a",
          300: "#703705",
          400: "#452002",
          500: "#1f0b00",
        },
      },
      c: {
        base: "#fa8d00",
        dark: {
          100: "#c97000",
          200: "#9a5500",
          300: "#6d3a00",
          400: "#442200",
          500: "#1e0c00",
        },
      },
    }),
    data(InterpolatedPalette({ hue: 180, values: 8 }, color), {
      a: {
        base: "#ff8000",
        light: { 100: "#ffab72", 200: "#ffd3b5", 300: "#fff9f5" },
        dark: { 100: "#864000", 200: "#1f0a00" },
      },
      b: {
        base: "#ff9a00",
        dark: {
          100: "#cd7b00",
          200: "#9d5d00",
          300: "#704000",
          400: "#452600",
          500: "#1f0e00",
        },
      },
      c: {
        base: "#f2b200",
        dark: {
          100: "#c28e00",
          200: "#956c00",
          300: "#6a4c00",
          400: "#412e00",
          500: "#1d1200",
        },
      },
      d: {
        base: "#bdc400",
        dark: {
          100: "#979d00",
          200: "#737700",
          300: "#515400",
          400: "#313300",
          500: "#141500",
        },
      },
      e: {
        base: "#79d12b",
        dark: {
          100: "#60a720",
          200: "#488016",
          300: "#315a0d",
          400: "#1c3705",
          500: "#091701",
        },
      },
      f: {
        base: "#00d67a",
        dark: {
          100: "#00ac61",
          200: "#008348",
          300: "#005d32",
          400: "#00391c",
          500: "#001809",
        },
      },
      g: {
        base: "#00d4ae",
        dark: {
          100: "#00aa8b",
          200: "#00826a",
          300: "#005c4a",
          400: "#00382c",
          500: "#001812",
        },
      },
      h: {
        base: "#00ccd6",
        dark: {
          100: "#00a3ac",
          200: "#007d83",
          300: "#00585c",
          400: "#003639",
          500: "#001718",
        },
      },
    }),
  ],
];

const testBlendedPalette = [
  "BlendedPalette",
  [
    "setting the blend target",
    data(BlendedPalette({ target: "dodgerblue" }, color), {
      a: {
        base: "#a993b3",
        light: { 100: "#c4b4cb", 200: "#dfd6e3", 300: "#fbf9fb" },
        dark: { 100: "#574b5c", 200: "#110d12" },
      },
    }),
    data(BlendedPalette({ target: "rebeccapurple" }, color), {
      a: {
        base: "#ae6082",
        light: { 100: "#ca91a8", 200: "#e4c3cf", 300: "#fbf7f8" },
        dark: { 100: "#592f41", 200: "#12050a" },
      },
    }),
  ],
  [
    "setting the blend amount",
    data(BlendedPalette({ amount: 78 }, color), {
      a: {
        base: "#1b0703",
        light: { 100: "#5c4a45", 200: "#a49996", 300: "#f2f1f0" },
        dark: { 100: "#090201", 200: "#010000" },
      },
    }),
    data(BlendedPalette({ amount: 25 }, color), {
      a: {
        base: "#ae5434",
        light: { 100: "#cb8a74", 200: "#e5c0b3", 300: "#fcf6f4" },
        dark: { 100: "#592816", 200: "#120402" },
      },
    }),
  ],
];

suite(
  "Palette formulas",
  testExceptions,
  testCommonScenarios,
  testColorSchemes,
  testPaletteSettings,
  testGeneratedValues,
  testMaterialPalette,
  testInterpolatedPalette,
  testBlendedPalette,
);

Palettes.forEach((Formula) => benchmark(Formula, {}, "gainsboro"));

init(7);
