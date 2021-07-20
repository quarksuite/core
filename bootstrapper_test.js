import { Quarks } from "./bootstrapper.js";
import { scheme_analogous } from "./utilities.js";
import { benchmark, data, init, suite } from "./tests/index.js";

const testQuarks = [
  "Quarks",
  [
    "with default configuration",
    data(Quarks(), {
      color: {
        a: {
          50: "#f8f8f8",
          100: "#dfdfdf",
          200: "#c6c6c6",
          300: "#aeaeae",
          400: "#979797",
          500: "#757575",
          600: "#626262",
          700: "#454545",
          800: "#2a2a2a",
          900: "#121212",
        },
      },
      text: {
        body: {
          family:
            "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
          style: { regular: 400, bold: 700 },
        },
        headings: {
          family:
            "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
          style: { bold: 700 },
        },
        code: {
          family:
            "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
          style: { regular: 400, bold: 700 },
        },
        size: {
          base: "1rem",
          x2: "1.5rem",
          x3: "2.25rem",
          x4: "3.375rem",
          x5: "5.0625rem",
          x6: "7.5938rem",
          d2: "0.66667em",
          d3: "0.44444em",
          d4: "0.2963em",
          d5: "0.19753em",
          d6: "0.13169em",
        },
        leading: {
          base: 1.5,
          narrow: [1.375, 1.3291, 1.2756, 1.2204, 1.1731, 1.1423],
          tight: 1.125,
        },
      },
      content: {
        measure: {
          base: "75ch",
          segment: ["65ch", "61ch", "57ch", "52ch", "48ch", "46ch"],
          minimum: "45ch",
        },
        whitespace: {
          base: "1ex",
          x2: "1.5ex",
          x3: "2.25ex",
          x4: "3.375ex",
          x5: "5.0625ex",
          x6: "7.5938ex",
          d2: "0.66667ex",
          d3: "0.44444ex",
          d4: "0.2963ex",
          d5: "0.19753ex",
          d6: "0.13169ex",
        },
      },
      layout: {
        grid: {
          columns: 6,
          rows: 4,
          fr: {
            base: "1fr",
            x2: "1.5fr",
            x3: "2.25fr",
            x4: "3.375fr",
            x5: "5.0625fr",
            x6: "7.5938fr",
            d2: "0.66667fr",
            d3: "0.44444fr",
            d4: "0.2963fr",
            d5: "0.19753fr",
            d6: "0.13169fr",
          },
          x: 1,
          x2: 2,
          x3: 3,
          x4: 4,
          x5: 5,
          x6: 6,
          y: 1,
          y2: 2,
          y3: 3,
          y4: 4,
        },
      },
      viewport: {
        width: {
          base: "100vw",
          segment: ["68vw", "56vw", "43vw", "29vw", "17vw", "9vw"],
          threshold: "5vw",
        },
        height: {
          base: "100vh",
          segment: ["68vh", "56vh", "43vh", "29vh", "17vh", "9vh"],
          threshold: "5vh",
        },
      },
      calc: { base: 1, x2: 1.5, x3: 2.25, x4: 3.375, x5: 5.0625, x6: 7.5938 },
    }),
  ],
  [
    "setting color token configuration",
    data(
      Quarks({
        color: "dodgerblue",
        tokens: {
          palette: {
            modifiers: { scheme: scheme_analogous },
          },
        },
      }).color,
      {
        a: {
          50: "#f5faff",
          100: "#cfe6ff",
          200: "#a8d2ff",
          300: "#81bdff",
          400: "#57a7ff",
          500: "#1a84eb",
          600: "#156ec5",
          700: "#0c4e8f",
          800: "#05305c",
          900: "#01152e",
        },
        b: {
          50: "#faf8ff",
          100: "#e7ddff",
          200: "#d4c3fd",
          300: "#c2a8fa",
          400: "#b18cf7",
          500: "#9365de",
          600: "#7b54bb",
          700: "#583b87",
          800: "#372357",
          900: "#190e2b",
        },
        c: {
          50: "#fef7fb",
          100: "#fad8eb",
          200: "#f5b9dc",
          300: "#ed9acc",
          400: "#e479bd",
          500: "#c84e9f",
          600: "#a84185",
          700: "#792c5f",
          800: "#4d193c",
          900: "#25081b",
        },
      },
    ),
  ],
  [
    "setting text token configuration",
    data(
      Quarks({
        scale: { limit: 4 },
        tokens: {
          text: {
            body: { system: "serif", family: "Zilla Slab" },
            headings: { system: "sans", family: "Rubik" },
            code: { family: "Space Mono" },
            leading: { tight: 1.25 },
          },
        },
      }).text,
      {
        body: {
          family:
            "Zilla Slab, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
          style: { regular: 400, bold: 700 },
        },
        headings: {
          family:
            "Rubik, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
          style: { bold: 700 },
        },
        code: {
          family:
            "Space Mono, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
          style: { regular: 400, bold: 700 },
        },
        size: {
          base: "1rem",
          x2: "1.5rem",
          x3: "2.25rem",
          x4: "3.375rem",
          d2: "0.66667em",
          d3: "0.44444em",
          d4: "0.2963em",
        },
        leading: {
          base: 1.5,
          narrow: [1.4167, 1.3861, 1.3504, 1.3136],
          tight: 1.25,
        },
      },
    ),
  ],
  [
    "setting content token configuration",
    data(
      Quarks({
        scale: { limit: 8 },
        tokens: {
          content: {
            measure: { min: 32, max: 64, values: 4 },
            whitespace: { values: 6 },
          },
        },
      }).content,
      {
        measure: {
          base: "64ch",
          segment: ["53ch", "49ch", "44ch", "40ch"],
          minimum: "32ch",
        },
        whitespace: {
          base: "1ex",
          x2: "1.5ex",
          x3: "2.25ex",
          x4: "3.375ex",
          x5: "5.0625ex",
          x6: "7.5938ex",
          d2: "0.66667ex",
          d3: "0.44444ex",
          d4: "0.2963ex",
          d5: "0.19753ex",
          d6: "0.13169ex",
        },
      },
    ),
  ],
  [
    "setting layout token configuration",
    data(Quarks({ tokens: { layout: { grid: { columns: 5 } } } }).layout, {
      grid: {
        columns: 5,
        rows: 3,
        fr: {
          base: "1fr",
          x2: "1.5fr",
          x3: "2.25fr",
          x4: "3.375fr",
          x5: "5.0625fr",
          d2: "0.66667fr",
          d3: "0.44444fr",
          d4: "0.2963fr",
          d5: "0.19753fr",
        },
        x: 1,
        x2: 2,
        x3: 3,
        x4: 4,
        x5: 5,
        y: 1,
        y2: 2,
        y3: 3,
      },
    }),
  ],
  [
    "setting viewport token configuration",
    data(
      Quarks({ tokens: { viewport: { threshold: 25, context: ["w", "min"] } } })
        .viewport,
      {
        width: {
          base: "100vw",
          segment: ["75vw", "65vw", "55vw", "44vw", "34vw", "28vw"],
          threshold: "25vw",
        },
        min: {
          base: "100vmin",
          segment: ["75vmin", "65vmin", "55vmin", "44vmin", "34vmin", "28vmin"],
          threshold: "25vmin",
        },
      },
    ),
  ],
];

suite("Bootstrapper", testQuarks);

benchmark(Quarks, {
  color: "coral",
  scale: { limit: 100 },
  tokens: {
    palette: {
      modifiers: { scheme: scheme_analogous },
    },
  },
});

init(7);
