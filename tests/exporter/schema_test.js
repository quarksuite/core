import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette } from "../../color.js";
import { grid, scale, text } from "../../content.js";
import { schema } from "../../exporter.js";

const swatch = "rebeccapurple";

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Interop",
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

describe("schema(format, dict)", () => {
  describe("format = 'tailwindcss'", () => {
    it("should translate sample dictionary to a tailwindcss theme", () => {
      expect(schema("tailwindcss", dict)).toEqual({
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
            DEFAULT: "1rem",
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
            DEFAULT: 1.5,
            i2: 1.4167,
            i3: 1.3611,
            i4: 1.3241,
            i5: 1.2994,
            i6: 1.2829,
            min: 1.25,
          },
          measure: {
            DEFAULT: "75ch",
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
                DEFAULT: "1fr",
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
                DEFAULT: "1fr",
                x2: "1.5fr",
                x3: "2.25fr",
                d2: "0.66667fr",
                d3: "0.44444fr",
              },
            },
          },
          spacing: {
            DEFAULT: "1ex",
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
              DEFAULT: "100vw",
              i2: "75vw",
              i3: "58.333vw",
              i4: "47.222vw",
              i5: "39.815vw",
              i6: "34.876vw",
              min: "25vw",
            },
            height: {
              DEFAULT: "100vh",
              i2: "75vh",
              i3: "58.333vh",
              i4: "47.222vh",
              i5: "39.815vh",
              i6: "34.876vh",
              min: "25vh",
            },
            smallest: {
              DEFAULT: "100vmin",
              i2: "75vmin",
              i3: "58.333vmin",
              i4: "47.222vmin",
              i5: "39.815vmin",
              i6: "34.876vmin",
              min: "25vmin",
            },
            largest: {
              DEFAULT: "100vmax",
              i2: "75vmax",
              i3: "58.333vmax",
              i4: "47.222vmax",
              i5: "39.815vmax",
              i6: "34.876vmax",
              min: "25vmax",
            },
          },
        },
      });
    });
  });

  describe("format = 'styledictionary'", () => {
    it("should translate sample dictionary to Style Dictionary tokens", () => {
      expect(schema("style-dictionary", dict)).toEqual({
        color: {
          50: { value: "#eeeaf6" },
          100: { value: "#d1c5e4" },
          200: { value: "#b5a1d2" },
          300: { value: "#9a7dc0" },
          400: { value: "#7f59ad" },
          500: { value: "#552e7e" },
          600: { value: "#452964" },
          700: { value: "#35234b" },
          800: { value: "#261c34" },
          900: { value: "#18151d" },
          bg: { value: "#ffffff" },
          fg: { value: "#111111" },
        },
        text: {
          primary: {
            family: {
              value:
                "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
            },
            regular: { value: 400 },
            bold: { value: 700 },
          },
          secondary: {
            family: {
              value:
                "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            },
            light: { value: 300 },
            black: { value: 900 },
          },
          source: {
            family: {
              value:
                "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
            },
            regular: { value: 400 },
            bold: { value: 700 },
          },
          size: {
            base: { value: "1rem" },
            x2: { value: "1.5rem" },
            x3: { value: "2.25rem" },
            x4: { value: "3.375rem" },
            x5: { value: "5.0625rem" },
            x6: { value: "7.5938rem" },
            d2: { value: "0.66667rem" },
            d3: { value: "0.44444rem" },
            d4: { value: "0.2963rem" },
            d5: { value: "0.19753rem" },
            d6: { value: "0.13169rem" },
          },
          leading: {
            base: { value: 1.5 },
            i2: { value: 1.4167 },
            i3: { value: 1.3611 },
            i4: { value: 1.3241 },
            i5: { value: 1.2994 },
            i6: { value: 1.2829 },
            min: { value: 1.25 },
          },
          measure: {
            base: { value: "75ch" },
            i2: { value: "65ch" },
            i3: { value: "58ch" },
            i4: { value: "53ch" },
            i5: { value: "50ch" },
            i6: { value: "48ch" },
            min: { value: "45ch" },
          },
        },
        layout: {
          grid: {
            columns: { value: 3 },
            rows: { value: 3 },
            col: {
              1: { value: 1 },
              2: { value: 2 },
              3: { value: 3 },
              "-1": { value: -1 },
              "-2": { value: -2 },
              "-3": { value: -3 },
              fr: {
                base: { value: "1fr" },
                x2: { value: "1.5fr" },
                x3: { value: "2.25fr" },
                d2: { value: "0.66667fr" },
                d3: { value: "0.44444fr" },
              },
            },
            row: {
              1: { value: 1 },
              2: { value: 2 },
              3: { value: 3 },
              "-1": { value: -1 },
              "-2": { value: -2 },
              "-3": { value: -3 },
              fr: {
                base: { value: "1fr" },
                x2: { value: "1.5fr" },
                x3: { value: "2.25fr" },
                d2: { value: "0.66667fr" },
                d3: { value: "0.44444fr" },
              },
            },
          },
          spacing: {
            base: { value: "1ex" },
            x2: { value: "1.5ex" },
            x3: { value: "2.25ex" },
            x4: { value: "3.375ex" },
            x5: { value: "5.0625ex" },
            x6: { value: "7.5938ex" },
            d2: { value: "0.66667ex" },
            d3: { value: "0.44444ex" },
            d4: { value: "0.2963ex" },
            d5: { value: "0.19753ex" },
            d6: { value: "0.13169ex" },
          },
          dimensions: {
            width: {
              base: { value: "100vw" },
              i2: { value: "75vw" },
              i3: { value: "58.333vw" },
              i4: { value: "47.222vw" },
              i5: { value: "39.815vw" },
              i6: { value: "34.876vw" },
              min: { value: "25vw" },
            },
            height: {
              base: { value: "100vh" },
              i2: { value: "75vh" },
              i3: { value: "58.333vh" },
              i4: { value: "47.222vh" },
              i5: { value: "39.815vh" },
              i6: { value: "34.876vh" },
              min: { value: "25vh" },
            },
            smallest: {
              base: { value: "100vmin" },
              i2: { value: "75vmin" },
              i3: { value: "58.333vmin" },
              i4: { value: "47.222vmin" },
              i5: { value: "39.815vmin" },
              i6: { value: "34.876vmin" },
              min: { value: "25vmin" },
            },
            largest: {
              base: { value: "100vmax" },
              i2: { value: "75vmax" },
              i3: { value: "58.333vmax" },
              i4: { value: "47.222vmax" },
              i5: { value: "39.815vmax" },
              i6: { value: "34.876vmax" },
              min: { value: "25vmax" },
            },
          },
        },
      });
    });
  });
});

run();
