import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette, tokens as color } from "../../color.js";
import { ms, text, tokens as content } from "../../content.js";
import { interop } from "../../exporter.js";

const swatch = "rebeccapurple";
const scale = ms({ values: 4, ratio: 1.337 }, 1);

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Interop",
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
      scale,
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
      scale,
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

describe("interop(format, dict)", () => {
  describe("format = 'tailwindcss'", () => {
    it("should translate sample dictionary to a tailwindcss theme", () => {
      expect(interop("tailwindcss", dict)).toEqual({
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
            DEFAULT: "1rem",
            x2: "1.337rem",
            x3: "1.7876rem",
            x4: "2.39rem",
            d2: "0.74794em",
            d3: "0.55942em",
            d4: "0.41841em",
          },
          leading: {
            DEFAULT: 1.5,
            i2: 1.437,
            i3: 1.3899,
            i4: 1.3546,
            min: 1.25,
          },
          measure: {
            DEFAULT: "75ch",
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
              DEFAULT: "1fr",
              x2: "1.337fr",
              x3: "1.7876fr",
              x4: "2.39fr",
              d2: "0.74794fr",
              d3: "0.55942fr",
              d4: "0.41841fr",
            },
          },
          spacing: {
            DEFAULT: "1ex",
            x2: "1.337ex",
            x3: "1.7876ex",
            x4: "2.39ex",
            d2: "0.74794ex",
            d3: "0.55942ex",
            d4: "0.41841ex",
          },
          dimensions: {
            width: {
              DEFAULT: "25vw",
              i2: "56.381vw",
              i3: "66.956vw",
              i4: "81.096vw",
              max: "100vw",
            },
            height: {
              DEFAULT: "25vh",
              i2: "56.381vh",
              i3: "66.956vh",
              i4: "81.096vh",
              max: "100vh",
            },
            min: {
              DEFAULT: "25vmin",
              i2: "56.381vmin",
              i3: "66.956vmin",
              i4: "81.096vmin",
              max: "100vmin",
            },
            max: {
              DEFAULT: "25vmax",
              i2: "56.381vmax",
              i3: "66.956vmax",
              i4: "81.096vmax",
              max: "100vmax",
            },
          },
        },
      });
    });
  });

  describe("format = 'styledictionary'", () => {
    it("should translate sample dictionary to Style Dictionary tokens", () => {
      expect(interop("styledictionary", dict)).toEqual({
        color: {
          50: { value: "#eeeaf6" },
          100: { value: "#d6cbe7" },
          200: { value: "#beadd8" },
          300: { value: "#a78fc9" },
          400: { value: "#9171ba" },
          500: { value: "#7b53aa" },
          600: { value: "#512d78" },
          700: { value: "#3d2658" },
          800: { value: "#2a1e39" },
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
            x2: { value: "1.337rem" },
            x3: { value: "1.7876rem" },
            x4: { value: "2.39rem" },
            d2: { value: "0.74794em" },
            d3: { value: "0.55942em" },
            d4: { value: "0.41841em" },
          },
          leading: {
            base: { value: 1.5 },
            i2: { value: 1.437 },
            i3: { value: 1.3899 },
            i4: { value: 1.3546 },
            min: { value: 1.25 },
          },
          measure: {
            base: { value: "75ch" },
            i2: { value: "67ch" },
            i3: { value: "61ch" },
            i4: { value: "57ch" },
            min: { value: "45ch" },
          },
        },
        layout: {
          grid: {
            columns: { value: 4 },
            rows: { value: 3 },
            col: {
              1: { value: 1 },
              2: { value: 2 },
              3: { value: 3 },
              4: { value: 4 },
              "-1": { value: -1 },
              "-2": { value: -2 },
              "-3": { value: -3 },
              "-4": { value: -4 },
            },
            row: {
              1: { value: 1 },
              2: { value: 2 },
              3: { value: 3 },
              "-1": { value: -1 },
              "-2": { value: -2 },
              "-3": { value: -3 },
            },
            fr: {
              base: { value: "1fr" },
              x2: { value: "1.337fr" },
              x3: { value: "1.7876fr" },
              x4: { value: "2.39fr" },
              d2: { value: "0.74794fr" },
              d3: { value: "0.55942fr" },
              d4: { value: "0.41841fr" },
            },
          },
          spacing: {
            base: { value: "1ex" },
            x2: { value: "1.337ex" },
            x3: { value: "1.7876ex" },
            x4: { value: "2.39ex" },
            d2: { value: "0.74794ex" },
            d3: { value: "0.55942ex" },
            d4: { value: "0.41841ex" },
          },
          dimensions: {
            width: {
              base: { value: "25vw" },
              i2: { value: "56.381vw" },
              i3: { value: "66.956vw" },
              i4: { value: "81.096vw" },
              max: { value: "100vw" },
            },
            height: {
              base: { value: "25vh" },
              i2: { value: "56.381vh" },
              i3: { value: "66.956vh" },
              i4: { value: "81.096vh" },
              max: { value: "100vh" },
            },
            min: {
              base: { value: "25vmin" },
              i2: { value: "56.381vmin" },
              i3: { value: "66.956vmin" },
              i4: { value: "81.096vmin" },
              max: { value: "100vmin" },
            },
            max: {
              base: { value: "25vmax" },
              i2: { value: "56.381vmax" },
              i3: { value: "66.956vmax" },
              i4: { value: "81.096vmax" },
              max: { value: "100vmax" },
            },
          },
        },
      });
    });
  });
});

run();
