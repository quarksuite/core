import { Quarks } from "../bootstrapper.js";
import { benchmark, data, init, suite } from "./index.js";

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
          500: "#7d7d7d",
          600: "#606060",
          700: "#414141",
          800: "#252525",
          900: "#0b0b0b",
        },
      },
      text: {
        primary: {
          family:
            "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
          regular: 400,
          bold: 700,
        },
        secondary: {
          family:
            "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
          regular: 400,
          bold: 700,
        },
        source: {
          family:
            "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
          regular: 400,
          bold: 700,
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
        measure: {
          base: "75ch",
          segment: ["65ch", "61ch", "57ch", "52ch", "48ch", "46ch"],
          minimum: "45ch",
        },
        leading: {
          base: 1.5,
          narrow: [1.375, 1.3291, 1.2756, 1.2204, 1.1731, 1.1423],
          tight: 1.125,
        },
        unit: {
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
        x: { base: 1, x2: 2, x3: 3, x4: 4, x5: 5, x6: 6 },
        "-x": {
          base: -1,
          "-x2": -2,
          "-x3": -3,
          "-x4": -4,
          "-x5": -5,
          "-x6": -6,
        },
        y: { base: 1, y2: 2, y3: 3, y4: 4 },
        "-y": { base: -1, "-y2": -2, "-y3": -3, "-y4": -4 },
      },
      viewport: {
        width: {
          base: "100vw",
          segment: ["70vw", "58vw", "46vw", "32vw", "21vw", "14vw"],
          threshold: "10vw",
        },
        height: {
          base: "100vh",
          segment: ["70vh", "58vh", "46vh", "32vh", "21vh", "14vh"],
          threshold: "10vh",
        },
      },
      animation: {
        duration: {
          base: "1000ms",
          interval: [
            "750ms",
            "658.25ms",
            "551.2ms",
            "440.88ms",
            "346.29ms",
            "284.5ms",
          ],
          fastest: "250ms",
        },
        easing: {
          x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
          y: [0, 0.046005, 0.12839, 0.2545, 0.4016, 0.54433, 0.66667, 1],
        },
      },
      ms: { base: 1, x2: 1.5, x3: 2.25, x4: 3.375, x5: 5.0625, x6: 7.5938 },
    }),
  ],
  [
    "setting color token configuration",
    data(
      Quarks({
        color: { base: "dodgerblue", scheme: "analogous" },
      }).color,
      {
        a: {
          50: "#f5faff",
          100: "#cfe6ff",
          200: "#a8d2ff",
          300: "#81bdff",
          400: "#57a7ff",
          500: "#1d8dfa",
          600: "#146cc2",
          700: "#0a4a87",
          800: "#042a52",
          900: "#010e22",
        },
        b: {
          50: "#faf8ff",
          100: "#e7ddff",
          200: "#d4c3fd",
          300: "#c2a8fa",
          400: "#b18cf7",
          500: "#9d6ded",
          600: "#7852b7",
          700: "#533780",
          800: "#301e4d",
          900: "#11081f",
        },
        c: {
          50: "#fef7fb",
          100: "#fad8eb",
          200: "#f5b9dc",
          300: "#ed9acc",
          400: "#e479bd",
          500: "#d555a9",
          600: "#a53f82",
          700: "#732a5a",
          800: "#451635",
          900: "#1b0513",
        },
      },
    ),
  ],
  [
    "setting text token configuration",
    data(
      Quarks({
        scale: { limit: 4 },
        text: {
          primary: { family: "Zilla Slab" },
          secondary: { family: "Rubik" },
          source: { family: "Space Mono" },
          measure: { min: 32, max: 64, values: 4 },
          leading: { tight: 1.25 },
        },
      }).text,
      {
        primary: {
          family:
            "Zilla Slab, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
          regular: 400,
          bold: 700,
        },
        secondary: {
          family:
            "Rubik, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
          regular: 400,
          bold: 700,
        },
        source: {
          family:
            "Space Mono, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
          regular: 400,
          bold: 700,
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
        measure: {
          base: "64ch",
          segment: ["53ch", "49ch", "44ch", "40ch"],
          minimum: "32ch",
        },
        leading: {
          base: 1.5,
          narrow: [1.4167, 1.3861, 1.3504, 1.3136],
          tight: 1.25,
        },
        unit: {
          base: "1ex",
          x2: "1.5ex",
          x3: "2.25ex",
          x4: "3.375ex",
          d2: "0.66667ex",
          d3: "0.44444ex",
          d4: "0.2963ex",
        },
      },
    ),
  ],
  [
    "setting grid token configuration",
    data(Quarks({ grid: { columns: 5 } }).grid, {
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
      x: { base: 1, x2: 2, x3: 3, x4: 4, x5: 5 },
      "-x": { base: -1, "-x2": -2, "-x3": -3, "-x4": -4, "-x5": -5 },
      y: { base: 1, y2: 2, y3: 3 },
      "-y": { base: -1, "-y2": -2, "-y3": -3 },
    }),
  ],
  [
    "setting viewport token configuration",
    data(
      Quarks({ viewport: { threshold: 25, context: ["w", "min"] } }).viewport,
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
  [
    "setting animation token configuration",
    data(
      Quarks({
        animation: {
          duration: { fastest: 100, slowest: 500 },
          easing: { floor: -1000, ceiling: 1000 },
        },
      }).animation,
      {
        duration: {
          base: "500ms",
          interval: [
            "366.67ms",
            "317.73ms",
            "260.64ms",
            "201.8ms",
            "151.36ms",
            "118.4ms",
          ],
          fastest: "100ms",
        },
        easing: {
          x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
          y: [-1000, -907.99, -743.22, -491, -196.8, 88.662, 333.33, 1000],
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
    color: {
      scheme: "analogous",
    },
  },
});

init(7);
