import { Quarks } from "./bootstrapper.js";
import { MaterialPalette } from "./formulas.js";
import { scheme_analogous } from "./utilities.js";
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const benchmark = new Maven();

describe("Bootstrapper", () => {
  describe("Quarks(config)", () => {
    it("should be able to output a default set of option tokens", () => {
      const result = Quarks();
      expect(result).toEqual({
        color: {
          main: {
            base: "#dcdcdc",
            light: {
              100: "#e4e4e4",
              200: "#eceded",
              300: "#f5f5f5",
              400: "#fdfdfd",
            },
            dark: {
              100: "#a6a6a6",
              200: "#737373",
              300: "#434343",
              400: "#191919",
            },
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
            style: { light: 300, bold: 700, black: 900 },
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
        },
        content: {
          measure: {
            base: "75ch",
            segment: ["65ch", "61ch", "57ch", "52ch", "48ch", "46ch"],
            minimum: "45ch",
          },
          rhythm: {
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
            gap: {
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
            fr: {
              base: "1fr",
              x2: "1.5fr",
              x3: "2.25fr",
              x4: "3.375fr",
              x5: "5.0625fr",
              x6: "7.5938fr",
            },
            x: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, base: 1 },
            y: { 2: 2, 3: 3, 4: 4, base: 1 },
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
      });
    });
    it("should be able to update the colors", () => {
      const result = Quarks({ color: "dodgerblue" }).color;
      expect(result).toEqual({
        main: {
          base: "#1e90ff",
          light: {
            100: "#62acff",
            200: "#95c7ff",
            300: "#c5e1ff",
            400: "#f5faff",
          },
          dark: {
            100: "#146bc1",
            200: "#0a4986",
            300: "#032950",
            400: "#010d1f",
          },
        },
      });
    });
    it("should be able to modify the global scale", () => {
      const result = Quarks({ scale: { initial: 1.25, ratio: 1.414 } }).calc;
      expect(result).toEqual({
        base: 1.25,
        x2: 1.7675,
        x3: 2.4992,
        x4: 3.5339,
        x5: 4.997,
        x6: 7.0657,
      });
    });
    it("should be able to modify how tokens are generated", () => {
      const result = Quarks({
        color: "coral",
        tokens: {
          palette: {
            formula: MaterialPalette,
            modifiers: { scheme: scheme_analogous },
          },
        },
      }).color;
      expect(result).toEqual({
        main: {
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
        accent: {
          50: "#fdfaf5",
          100: "#f7e8cf",
          200: "#f0d6a9",
          300: "#e8c481",
          400: "#e1b155",
          500: "#c79100",
          600: "#a87900",
          700: "#795600",
          800: "#4d3600",
          900: "#251800",
        },
        highlight: {
          50: "#f9fcf6",
          100: "#e1f0d4",
          200: "#cae4b2",
          300: "#b3d78f",
          400: "#9cca69",
          500: "#7aae37",
          600: "#66922d",
          700: "#48681e",
          800: "#2c4210",
          900: "#131f04",
        },
      });
    });
  });
});

benchmark.Bench({
  name: `Bootstrapper perf`,
  fn() {
    return Quarks();
  },
  steps: 512,
});

benchmark.runBench().then(benchmark.Result(7)).then(run());
