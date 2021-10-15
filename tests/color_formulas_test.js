import {
  BlendedPalette,
  InterpolatedPalette,
  MaterialPalette,
  StandardPalette,
} from "../formulas.js";
import { color_to_hex } from "../utilities.js";

import { benchmark, data, exception, init, suite } from "./index.js";

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
        500: "#fa7c4f",
        600: "#c15f3b",
        700: "#874026",
        800: "#522413",
        900: "#220b04",
      },
    }),
    data(StandardPalette({}, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
    }),
    data(InterpolatedPalette({}, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
    }),
    data(BlendedPalette({}, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
    }),
  ],
  [
    "setting the palette format",
    data(MaterialPalette({ format: "rgb" }, color), {
      a: {
        50: "rgb(255, 249, 246)",
        100: "rgb(255, 226, 214)",
        200: "rgb(255, 202, 182)",
        300: "rgb(255, 178, 149)",
        400: "rgb(255, 153, 116)",
        500: "rgb(250, 124, 79)",
        600: "rgb(193, 95, 59)",
        700: "rgb(135, 64, 38)",
        800: "rgb(82, 36, 19)",
        900: "rgb(34, 11, 4)",
      },
    }),
    data(StandardPalette({ format: "rgb" }, color), {
      a: {
        base: "rgb(255, 127, 80)",
        light: {
          100: "rgb(255, 170, 138)",
          200: "rgb(255, 210, 193)",
          300: "rgb(255, 249, 246)",
        },
        muted: {
          100: "rgb(224, 130, 96)",
          200: "rgb(193, 131, 109)",
          300: "rgb(162, 130, 119)",
        },
        dark: {
          100: "rgb(174, 85, 52)",
          200: "rgb(99, 45, 26)",
          300: "rgb(34, 11, 4)",
        },
      },
    }),
    data(InterpolatedPalette({ format: "rgb" }, color), {
      a: {
        base: "rgb(255, 127, 80)",
        light: {
          100: "rgb(255, 170, 138)",
          200: "rgb(255, 210, 193)",
          300: "rgb(255, 249, 246)",
        },
        muted: {
          100: "rgb(224, 130, 96)",
          200: "rgb(193, 131, 109)",
          300: "rgb(162, 130, 119)",
        },
        dark: {
          100: "rgb(174, 85, 52)",
          200: "rgb(99, 45, 26)",
          300: "rgb(34, 11, 4)",
        },
      },
    }),
    data(BlendedPalette({ format: "rgb" }, color), {
      a: {
        base: "rgb(255, 127, 80)",
        light: {
          100: "rgb(255, 170, 138)",
          200: "rgb(255, 210, 193)",
          300: "rgb(255, 249, 246)",
        },
        muted: {
          100: "rgb(224, 130, 96)",
          200: "rgb(193, 131, 109)",
          300: "rgb(162, 130, 119)",
        },
        dark: {
          100: "rgb(174, 85, 52)",
          200: "rgb(99, 45, 26)",
          300: "rgb(34, 11, 4)",
        },
      },
    }),
  ],
];

const testColorSchemes = [
  "MaterialPalette & StandardPalette",
  [
    "setting a color scheme",
    data(MaterialPalette({ scheme: "dyadic" }, color), {
      a: {
        50: "#fff9f6",
        100: "#ffe2d6",
        200: "#ffcab6",
        300: "#ffb295",
        400: "#ff9974",
        500: "#fa7c4f",
        600: "#c15f3b",
        700: "#874026",
        800: "#522413",
        900: "#220b04",
      },
      b: {
        50: "#f9fcf6",
        100: "#e1f0d4",
        200: "#cae4b2",
        300: "#b3d78f",
        400: "#9cca69",
        500: "#82b93c",
        600: "#638f2c",
        700: "#44631c",
        800: "#263a0d",
        900: "#0c1602",
      },
    }),
    data(StandardPalette({ scheme: "analogous" }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#d99e00",
        light: { 100: "#e6be73", 200: "#f2dcb6", 300: "#fdfaf5" },
        muted: { 100: "#c39743", 200: "#ac905d", 300: "#968971" },
        dark: { 100: "#936a00", 200: "#533b00", 300: "#1b1100" },
      },
      c: {
        base: "#85bd3d",
        light: { 100: "#abd382", 200: "#d1e8bd", 300: "#f9fcf6" },
        muted: { 100: "#84ae56", 200: "#839f68", 300: "#829075" },
        dark: { 100: "#598026", 200: "#304812", 300: "#0c1602" },
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
        muted: { 100: "#e5825e", 200: "#cb8369", 300: "#b08373" },
        dark: { 100: "#ba5b38", 200: "#793921", 300: "#3e1a0c" },
      },
    }),
    data(InterpolatedPalette({ contrast: 75 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffa17f", 200: "#ffc1aa", 300: "#ffe0d4" },
        muted: { 100: "#e7815d", 200: "#cf8368", 300: "#b68371" },
        dark: { 100: "#be5d39", 200: "#823d24", 300: "#4a2011" },
      },
    }),
    data(BlendedPalette({ contrast: 99 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffac8d", 200: "#ffd5c5", 300: "#fffefd" },
        muted: { 100: "#df8261", 200: "#bf836e", 300: "#9e8278" },
        dark: { 100: "#ab5333", 200: "#5e2a18", 300: "#1b0803" },
      },
    }),
  ],
  [
    "setting number of tints, tones, and shades",
    data(StandardPalette({ tints: 2, tones: 2, shades: 1 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffbea6", 200: "#fff9f6" },
        muted: { 100: "#d18367", 200: "#a28277" },
        dark: { 100: "#220b04" },
      },
    }),
    data(InterpolatedPalette({ tones: 1 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
    }),
    data(BlendedPalette({ tints: 5, tones: 6, shades: 4 }, color), {
      a: {
        base: "#ff7f50",
        light: {
          100: "#ff9974",
          200: "#ffb295",
          300: "#ffcab6",
          400: "#ffe2d6",
          500: "#fff9f6",
        },
        muted: {
          100: "#f08159",
          200: "#e08260",
          300: "#d18367",
          400: "#c1836d",
          500: "#b28372",
          600: "#a28277",
        },
        dark: {
          100: "#c25f3b",
          200: "#884026",
          300: "#522414",
          400: "#220b04",
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
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
    }),
    data(BlendedPalette({ values: 4 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#c8623d",
        light: { 100: "#dd957b", 200: "#efc6b7", 300: "#fdf7f5" },
        muted: { 100: "#b86c51", 200: "#a77462", 300: "#947a71" },
        dark: { 100: "#884026", 200: "#4c2112", 300: "#180602" },
      },
      c: {
        base: "#94472b",
        light: { 100: "#b8806c", 200: "#dabaae", 300: "#faf5f4" },
        muted: { 100: "#915742", 200: "#8d6557", 300: "#87736c" },
        dark: { 100: "#632d1a", 200: "#36160a", 300: "#0f0301" },
      },
      d: {
        base: "#632d1a",
        light: { 100: "#956b5d", 200: "#c6ada5", 300: "#f7f4f2" },
        muted: { 100: "#6c4234", 200: "#74574d", 300: "#7b6b66" },
        dark: { 100: "#411b0e", 200: "#220b04", 300: "#070101" },
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
        500: "#fb7d4f",
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
    data(InterpolatedPalette({ hue: 90, values: 3 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#d99e00",
        light: { 100: "#e6be73", 200: "#f2dcb6", 300: "#fdfaf5" },
        muted: { 100: "#c39743", 200: "#ac905d", 300: "#968971" },
        dark: { 100: "#936a00", 200: "#533b00", 300: "#1b1100" },
      },
      c: {
        base: "#85bd3d",
        light: { 100: "#abd382", 200: "#d1e8bd", 300: "#f9fcf6" },
        muted: { 100: "#84ae56", 200: "#839f68", 300: "#829075" },
        dark: { 100: "#598026", 200: "#304812", 300: "#0c1602" },
      },
    }),
    data(InterpolatedPalette({ hue: 180, values: 8 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#ef9000",
        light: { 100: "#f7b573", 200: "#fcd8b6", 300: "#fffaf5" },
        muted: { 100: "#d48e43", 200: "#b88a5d", 300: "#9d8670" },
        dark: { 100: "#a36000", 200: "#5d3500", 300: "#1f0e00" },
      },
      c: {
        base: "#d0a400",
        light: { 100: "#dfc174", 200: "#eedeb6", 300: "#fdfbf5" },
        muted: { 100: "#bc9c43", 200: "#a7935e", 300: "#948a71" },
        dark: { 100: "#8d6e00", 200: "#503d00", 300: "#1a1200" },
      },
      d: {
        base: "#a2b60c",
        light: { 100: "#bece75", 200: "#dbe5b7", 300: "#fafcf5" },
        muted: { 100: "#99a945", 200: "#909c5f", 300: "#888e71" },
        dark: { 100: "#6d7b05", 200: "#3c4501", 300: "#111500" },
      },
      e: {
        base: "#61c35e",
        light: { 100: "#97d793", 200: "#c8eac5", 300: "#f7fcf7" },
        muted: { 100: "#6db36a", 200: "#76a273", 300: "#7c917a" },
        dark: { 100: "#3f843d", 200: "#214a20", 300: "#061706" },
      },
      f: {
        base: "#00ca96",
        light: { 100: "#7edcb6", 200: "#bdedd8", 300: "#f6fdfa" },
        muted: { 100: "#4cb891", 200: "#65a58b", 300: "#759386" },
        dark: { 100: "#008965", 200: "#004d37", 300: "#00190f" },
      },
      g: {
        base: "#00c8c9",
        light: { 100: "#7edada", 200: "#beeceb", 300: "#f6fcfc" },
        muted: { 100: "#4cb6b6", 200: "#66a4a4", 300: "#759292" },
        dark: { 100: "#008888", 200: "#004c4d", 300: "#001818" },
      },
      h: {
        base: "#00bff2",
        light: { 100: "#7dd4f7", 200: "#bde9fc", 300: "#f6fcff" },
        muted: { 100: "#4bb0d5", 200: "#64a0b8", 300: "#75909c" },
        dark: { 100: "#0081a5", 200: "#00485e", 300: "#001720" },
      },
    }),
  ],
];

const testBlendedPalette = [
  "BlendedPalette",
  [
    "setting the blend target",
    data(BlendedPalette({ target: "dodgerblue", values: 2 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#a993b3",
        light: { 100: "#c4b4cb", 200: "#dfd6e3", 300: "#fbf9fb" },
        muted: { 100: "#9f8ea6", 200: "#948a99", 300: "#8a858d" },
        dark: { 100: "#726279", 200: "#3f3643", 300: "#130f14" },
      },
    }),
    data(BlendedPalette({ target: "rebeccapurple", values: 2 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#ae6082",
        light: { 100: "#ca91a8", 200: "#e4c3cf", 300: "#fbf7f8" },
        muted: { 100: "#a46982", 200: "#997181", 300: "#8d7981" },
        dark: { 100: "#753f57", 200: "#41202f", 300: "#14060c" },
      },
    }),
  ],
  [
    "setting the blend amount",
    data(BlendedPalette({ amount: 78, values: 2 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#1b0703",
        light: { 100: "#5c4a45", 200: "#a49996", 300: "#f2f1f0" },
        muted: { 100: "#33221d", 200: "#4c3f3b", 300: "#655e5c" },
        dark: { 100: "#0f0301", 200: "#050100", 300: "#010000" },
      },
    }),
    data(BlendedPalette({ amount: 25, values: 2 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#ae5434",
        light: { 100: "#cb8a74", 200: "#e5c0b3", 300: "#fcf6f4" },
        muted: { 100: "#a5614a", 200: "#9a6c5d", 300: "#8e776f" },
        dark: { 100: "#753620", 200: "#411b0e", 300: "#140502" },
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

benchmark(MaterialPalette, { scheme: "hexagon" }, color);
benchmark(StandardPalette, { scheme: "hexagon" }, color);
benchmark(InterpolatedPalette, { values: 6, hue: 360 }, color);
benchmark(BlendedPalette, { values: 6, amount: 80 }, color);

init(7);
