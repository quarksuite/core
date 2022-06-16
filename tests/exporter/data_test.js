import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette } from "../../color.js";
import { grid, scale, text } from "../../content.js";
import { data } from "../../exporter.js";

const swatch = "rebeccapurple";

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Data Dictionary",
    author: "Chatman R. Jr",
    version: "0.1.0",
    license: "Unlicense",
  },
  color: palette({}, swatch),
  text: {
    primary: text({}, ""),
    secondary: text({ system: "serif", weights: ["light", "black"] }, ""),
    source: text({ system: "monospace" }, ""),
    size: scale({ inversion: "em" }, "1rem"),
    leading: scale({ configuration: "ranged", floor: 1.25 }, 1.5),
    measure: scale(
      {
        configuration: "ranged",
        floor: "45ch",
        trunc: true,
      },
      "75ch",
    ),
  },
  layout: {
    grid: grid({}, 3),
    spacing: scale({}, "1ex"),
    dimensions: {
      width: scale({ configuration: "ranged", floor: "25vw" }, "100vw"),
      height: scale({ configuration: "ranged", floor: "25vh" }, "100vh"),
      smallest: scale({ configuration: "ranged", floor: "25vmin" }, "100vmin"),
      largest: scale({ configuration: "ranged", floor: "25vmax" }, "100vmax"),
    },
  },
};

describe("data(format, dict)", () => {
  const removeTimestamp = (format) =>
    format.replace(
      /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]",
    );

  describe("format = 'json'", () => {
    it("should correctly export sample dictionary as JSON data", () => {
      expect(JSON.parse(data("json", dict))).toEqual({
        project: {
          name: "Example Data Dictionary",
          author: "Chatman R. Jr",
          version: "0.1.0",
          license: "Unlicense",
        },
        tokens: {
          color: {
            50: "#eeeaf6",
            100: "#d1c5e4",
            200: "#b5a1d2",
            300: "#9a7dc0",
            400: "#7f59ad",
            500: "#552e7e",
            600: "#452964",
            700: "#35234b",
            800: "#261c34",
            900: "#18151d",
            bg: "#ffffff",
            fg: "#111111",
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
              light: 300,
              black: 900,
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
              d2: "0.66667rem",
              d3: "0.44444rem",
              d4: "0.2963rem",
              d5: "0.19753rem",
              d6: "0.13169rem",
            },
            leading: {
              base: 1.5,
              i2: 1.4167,
              i3: 1.3611,
              i4: 1.3241,
              i5: 1.2994,
              i6: 1.2829,
              min: 1.25,
            },
            measure: {
              base: "75ch",
              i2: "65ch",
              i3: "58ch",
              i4: "53ch",
              i5: "50ch",
              i6: "48ch",
              min: "45ch",
            },
          },
          layout: {
            grid: {
              columns: 3,
              rows: 3,
              col: {
                1: 1,
                2: 2,
                3: 3,
                "-1": -1,
                "-2": -2,
                "-3": -3,
                fr: {
                  base: "1fr",
                  x2: "1.5fr",
                  x3: "2.25fr",
                  d2: "0.66667fr",
                  d3: "0.44444fr",
                },
              },
              row: {
                1: 1,
                2: 2,
                3: 3,
                "-1": -1,
                "-2": -2,
                "-3": -3,
                fr: {
                  base: "1fr",
                  x2: "1.5fr",
                  x3: "2.25fr",
                  d2: "0.66667fr",
                  d3: "0.44444fr",
                },
              },
            },
            spacing: {
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
            dimensions: {
              width: {
                base: "100vw",
                i2: "75vw",
                i3: "58.333vw",
                i4: "47.222vw",
                i5: "39.815vw",
                i6: "34.876vw",
                min: "25vw",
              },
              height: {
                base: "100vh",
                i2: "75vh",
                i3: "58.333vh",
                i4: "47.222vh",
                i5: "39.815vh",
                i6: "34.876vh",
                min: "25vh",
              },
              smallest: {
                base: "100vmin",
                i2: "75vmin",
                i3: "58.333vmin",
                i4: "47.222vmin",
                i5: "39.815vmin",
                i6: "34.876vmin",
                min: "25vmin",
              },
              largest: {
                base: "100vmax",
                i2: "75vmax",
                i3: "58.333vmax",
                i4: "47.222vmax",
                i5: "39.815vmax",
                i6: "34.876vmax",
                min: "25vmax",
              },
            },
          },
        },
      });
    });
  });

  describe("format = 'yaml'", () => {
    it("should correctly export sample dictionary as YAML data", () => {
      expect(removeTimestamp(data("yaml", dict))).toBe(`
# [Timestamp replaced for testing]

project:
  name: Example Data Dictionary
  author: Chatman R. Jr
  version: 0.1.0
  license: Unlicense

tokens:
  color:
    50: #eeeaf6
    100: #d1c5e4
    200: #b5a1d2
    300: #9a7dc0
    400: #7f59ad
    500: #552e7e
    600: #452964
    700: #35234b
    800: #261c34
    900: #18151d
    bg: #ffffff
    fg: #111111
  text:
    primary:
      family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif
      regular: 400
      bold: 700
    secondary:
      family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol
      light: 300
      black: 900
    source:
      family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace
      regular: 400
      bold: 700
    size:
      base: 1rem
      x2: 1.5rem
      x3: 2.25rem
      x4: 3.375rem
      x5: 5.0625rem
      x6: 7.5938rem
      d2: 0.66667rem
      d3: 0.44444rem
      d4: 0.2963rem
      d5: 0.19753rem
      d6: 0.13169rem
    leading:
      base: 1.5
      i2: 1.4167
      i3: 1.3611
      i4: 1.3241
      i5: 1.2994
      i6: 1.2829
      min: 1.25
    measure:
      base: 75ch
      i2: 65ch
      i3: 58ch
      i4: 53ch
      i5: 50ch
      i6: 48ch
      min: 45ch
  layout:
    grid:
      columns: 3
      rows: 3
      col:
        1: 1
        2: 2
        3: 3
        -1: -1
        -2: -2
        -3: -3
        fr:
          base: 1fr
          x2: 1.5fr
          x3: 2.25fr
          d2: 0.66667fr
          d3: 0.44444fr
      row:
        1: 1
        2: 2
        3: 3
        -1: -1
        -2: -2
        -3: -3
        fr:
          base: 1fr
          x2: 1.5fr
          x3: 2.25fr
          d2: 0.66667fr
          d3: 0.44444fr
    spacing:
      base: 1ex
      x2: 1.5ex
      x3: 2.25ex
      x4: 3.375ex
      x5: 5.0625ex
      x6: 7.5938ex
      d2: 0.66667ex
      d3: 0.44444ex
      d4: 0.2963ex
      d5: 0.19753ex
      d6: 0.13169ex
    dimensions:
      width:
        base: 100vw
        i2: 75vw
        i3: 58.333vw
        i4: 47.222vw
        i5: 39.815vw
        i6: 34.876vw
        min: 25vw
      height:
        base: 100vh
        i2: 75vh
        i3: 58.333vh
        i4: 47.222vh
        i5: 39.815vh
        i6: 34.876vh
        min: 25vh
      smallest:
        base: 100vmin
        i2: 75vmin
        i3: 58.333vmin
        i4: 47.222vmin
        i5: 39.815vmin
        i6: 34.876vmin
        min: 25vmin
      largest:
        base: 100vmax
        i2: 75vmax
        i3: 58.333vmax
        i4: 47.222vmax
        i5: 39.815vmax
        i6: 34.876vmax
        min: 25vmax
`);
    });
  });
});

run();
