// [[file:../../../Notebook.org::*data Tests][data Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette, tokens as color } from "../../color.js";
import { text, ms, tokens as content } from "../../content.js";
import { data } from "../../exporter.js";

const swatch = "rebeccapurple";
const scale = ms({ values: 4, ratio: 1.337 }, 1);

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Data Export",
    author: "Chatman R. Jr",
    version: "0.1.0",
    license: "Unlicense",
  },
  color: color(palette({}, swatch)),
  text: {
    primary: text({}, ""),
    secondary: text({ system: "serif", weights: ["light", "black"] }, ""),
    source: text({ system: "monospace" }, ""),
    size: content({ unit: "rem", inversion: "em" }, scale),
    leading: content(
      { type: "ranged", min: 1.25, max: 1.5, context: "max" },
      scale
    ),
    measure: content(
      {
        type: "ranged",
        min: 45,
        max: 75,
        unit: "ch",
        trunc: true,
        context: "max",
      },
      scale
    ),
  },
  layout: {
    grid: {
      ...content({ type: "grid" }, scale),
      fr: content({ unit: "fr" }, scale),
    },
    spacing: content({ unit: "ex" }, scale),
    dimensions: {
      width: content({ type: "ranged", min: 25, max: 100, unit: "vw" }, scale),
      height: content({ type: "ranged", min: 25, max: 100, unit: "vh" }, scale),
      min: content({ type: "ranged", min: 25, max: 100, unit: "vmin" }, scale),
      max: content({ type: "ranged", min: 25, max: 100, unit: "vmax" }, scale),
    },
  },
};

describe("data(format, dict)", () => {
  const removeTimestamp = (format) =>
    format.replace(
      /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]"
    );

  describe("format = 'json'", () => {
    it("should correctly export sample dictionary as JSON data", () => {
      expect(JSON.parse(data("json", dict))).toEqual({
        project: {
          name: "Example Data Export",
          author: "Chatman R. Jr",
          version: "0.1.0",
          license: "Unlicense",
        },
        tokens: {
          color: {
            50: "#eeeaf6",
            100: "#d6cbe7",
            200: "#beadd8",
            300: "#a78fc9",
            400: "#9171ba",
            500: "#7b53aa",
            600: "#512d78",
            700: "#3d2658",
            800: "#2a1e39",
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
              x2: "1.337rem",
              x3: "1.7876rem",
              x4: "2.39rem",
              d2: "0.74794em",
              d3: "0.55942em",
              d4: "0.41841em",
            },
            leading: {
              base: 1.5,
              i2: 1.437,
              i3: 1.3899,
              i4: 1.3546,
              min: 1.25,
            },
            measure: {
              base: "75ch",
              i2: "67ch",
              i3: "61ch",
              i4: "57ch",
              min: "45ch",
            },
          },
          layout: {
            grid: {
              columns: 4,
              rows: 3,
              col: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                "-1": -1,
                "-2": -2,
                "-3": -3,
                "-4": -4,
              },
              row: { 1: 1, 2: 2, 3: 3, "-1": -1, "-2": -2, "-3": -3 },
              fr: {
                base: "1fr",
                x2: "1.337fr",
                x3: "1.7876fr",
                x4: "2.39fr",
                d2: "0.74794fr",
                d3: "0.55942fr",
                d4: "0.41841fr",
              },
            },
            spacing: {
              base: "1ex",
              x2: "1.337ex",
              x3: "1.7876ex",
              x4: "2.39ex",
              d2: "0.74794ex",
              d3: "0.55942ex",
              d4: "0.41841ex",
            },
            dimensions: {
              width: {
                base: "25vw",
                i2: "56.381vw",
                i3: "66.956vw",
                i4: "81.096vw",
                max: "100vw",
              },
              height: {
                base: "25vh",
                i2: "56.381vh",
                i3: "66.956vh",
                i4: "81.096vh",
                max: "100vh",
              },
              min: {
                base: "25vmin",
                i2: "56.381vmin",
                i3: "66.956vmin",
                i4: "81.096vmin",
                max: "100vmin",
              },
              max: {
                base: "25vmax",
                i2: "56.381vmax",
                i3: "66.956vmax",
                i4: "81.096vmax",
                max: "100vmax",
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
  name: Example Data Export
  author: Chatman R. Jr
  version: 0.1.0
  license: Unlicense

tokens:
  color:
    50: #eeeaf6
    100: #d6cbe7
    200: #beadd8
    300: #a78fc9
    400: #9171ba
    500: #7b53aa
    600: #512d78
    700: #3d2658
    800: #2a1e39
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
      x2: 1.337rem
      x3: 1.7876rem
      x4: 2.39rem
      d2: 0.74794em
      d3: 0.55942em
      d4: 0.41841em
    leading:
      base: 1.5
      i2: 1.437
      i3: 1.3899
      i4: 1.3546
      min: 1.25
    measure:
      base: 75ch
      i2: 67ch
      i3: 61ch
      i4: 57ch
      min: 45ch
  layout:
    grid:
      columns: 4
      rows: 3
      col:
        1: 1
        2: 2
        3: 3
        4: 4
        -1: -1
        -2: -2
        -3: -3
        -4: -4
      row:
        1: 1
        2: 2
        3: 3
        -1: -1
        -2: -2
        -3: -3
      fr:
        base: 1fr
        x2: 1.337fr
        x3: 1.7876fr
        x4: 2.39fr
        d2: 0.74794fr
        d3: 0.55942fr
        d4: 0.41841fr
    spacing:
      base: 1ex
      x2: 1.337ex
      x3: 1.7876ex
      x4: 2.39ex
      d2: 0.74794ex
      d3: 0.55942ex
      d4: 0.41841ex
    dimensions:
      width:
        base: 25vw
        i2: 56.381vw
        i3: 66.956vw
        i4: 81.096vw
        max: 100vw
      height:
        base: 25vh
        i2: 56.381vh
        i3: 66.956vh
        i4: 81.096vh
        max: 100vh
      min:
        base: 25vmin
        i2: 56.381vmin
        i3: 66.956vmin
        i4: 81.096vmin
        max: 100vmin
      max:
        base: 25vmax
        i2: 56.381vmax
        i3: 66.956vmax
        i4: 81.096vmax
        max: 100vmax
`);
    });
  });
});

run();
// data Tests:1 ends here
