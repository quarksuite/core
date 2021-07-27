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
  scheme_hexagon,
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
        500: "#e87348",
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
    data(MaterialPalette({ format: color_to_rgb }, color), {
      a: {
        50: "rgb(255, 249, 246)",
        100: "rgb(255, 226, 214)",
        200: "rgb(255, 202, 182)",
        300: "rgb(255, 178, 149)",
        400: "rgb(255, 153, 116)",
        500: "rgb(232, 115, 72)",
        600: "rgb(193, 95, 59)",
        700: "rgb(135, 64, 38)",
        800: "rgb(82, 36, 19)",
        900: "rgb(34, 11, 4)",
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
    data(InterpolatedPalette({ format: color_to_rgb }, color), {
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
    data(BlendedPalette({ format: color_to_rgb }, color), {
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
    data(MaterialPalette({ scheme: scheme_dyadic }, color), {
      a: {
        50: "#fff9f6",
        100: "#ffe2d6",
        200: "#ffcab6",
        300: "#ffb295",
        400: "#ff9974",
        500: "#e87348",
        600: "#c15f3b",
        700: "#874026",
        800: "#522413",
        900: "#220b04",
      },
      b: {
        50: "#fcfbf5",
        100: "#f0ebd0",
        200: "#e4dba9",
        300: "#d8cb82",
        400: "#cdbb55",
        500: "#b09a00",
        600: "#928000",
        700: "#665800",
        800: "#3c3300",
        900: "#171300",
      },
    }),
    data(StandardPalette({ scheme: scheme_analogous }, color), {
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
        base: "#ff7f49",
        light: { 100: "#ffaa87", 200: "#ffd2bf", 300: "#fff9f6" },
        muted: { 100: "#e0825c", 200: "#c1836a", 300: "#a28276" },
        dark: { 100: "#ae552f", 200: "#632d17", 300: "#220b04" },
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
    data(InterpolatedPalette({ hue: 90, values: 3 }, color), {
      a: {
        base: "#ff7f50",
        light: { 100: "#ffaa8a", 200: "#ffd2c1", 300: "#fff9f6" },
        muted: { 100: "#e08260", 200: "#c1836d", 300: "#a28277" },
        dark: { 100: "#ae5534", 200: "#632d1a", 300: "#220b04" },
      },
      b: {
        base: "#ff7f41",
        light: { 100: "#ffaa83", 200: "#ffd2bd", 300: "#fff9f6" },
        muted: { 100: "#e08257", 200: "#c18368", 300: "#a28275" },
        dark: { 100: "#ae5529", 200: "#632d13", 300: "#220b03" },
      },
      c: {
        base: "#dda100",
        light: { 100: "#e9c074", 200: "#f3ddb7", 300: "#fdfaf5" },
        muted: { 100: "#c69a44", 200: "#ae925e", 300: "#978971" },
        dark: { 100: "#966c00", 200: "#553c00", 300: "#1c1100" },
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
        base: "#ff8000",
        light: { 100: "#ffab72", 200: "#ffd3b5", 300: "#fff9f5" },
        muted: { 100: "#e08342", 200: "#c1845d", 300: "#a28370" },
        dark: { 100: "#ae5500", 200: "#632e00", 300: "#220b00" },
      },
      c: {
        base: "#ff9b00",
        light: { 100: "#ffbd76", 200: "#ffdcb8", 300: "#fffaf5" },
        muted: { 100: "#df9645", 200: "#c09060", 300: "#a08872" },
        dark: { 100: "#ae6800", 200: "#633900", 300: "#221000" },
      },
      d: {
        base: "#e2b500",
        light: { 100: "#ebcd78", 200: "#f5e5b9", 300: "#fefbf6" },
        muted: { 100: "#c9a847", 200: "#b09b61", 300: "#988e73" },
        dark: { 100: "#9a7a00", 200: "#574400", 300: "#1d1500" },
      },
      e: {
        base: "#a2c800",
        light: { 100: "#bedb78", 200: "#dcecb9", 300: "#fafdf6" },
        muted: { 100: "#99b647", 200: "#90a561", 300: "#889372" },
        dark: { 100: "#6d8800", 200: "#3c4c00", 300: "#111800" },
      },
      f: {
        base: "#47d25e",
        light: { 100: "#8de294", 200: "#c4f0c6", 300: "#f7fdf7" },
        muted: { 100: "#60be6a", 200: "#6faa74", 300: "#79957b" },
        dark: { 100: "#2d8f3d", 200: "#165020", 300: "#031a06" },
      },
      g: {
        base: "#00d49f",
        light: { 100: "#81e3bd", 200: "#bff0db", 300: "#f7fdfa" },
        muted: { 100: "#4ebf97", 200: "#67aa90", 300: "#769588" },
        dark: { 100: "#00906b", 200: "#00513b", 300: "#001a11" },
      },
      h: {
        base: "#00cdd0",
        light: { 100: "#80dedf", 200: "#bfeeee", 300: "#f6fdfd" },
        muted: { 100: "#4dbabc", 200: "#67a7a7", 300: "#769394" },
        dark: { 100: "#008b8d", 200: "#004e50", 300: "#00191a" },
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

benchmark(MaterialPalette, { scheme: scheme_hexagon }, color);
benchmark(StandardPalette, { scheme: scheme_hexagon }, color);
benchmark(InterpolatedPalette, { values: 8, hue: 360 }, color);
benchmark(BlendedPalette, { values: 8, amount: 80 }, color);

init(7);
