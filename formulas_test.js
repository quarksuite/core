import {
  BidirectionalScale,
  BlendedPalette,
  ContentMeasure,
  FigureCalculations,
  GridDimensions,
  GridFractions,
  InterpolatedPalette,
  LayoutSpacing,
  MaterialPalette,
  NumericColorScale,
  RangedScale,
  StandardPalette,
  TextLeading,
  TextSize,
  TextStack,
  TextStyle,
  UnidirectionalScale,
  Viewport,
} from "./formulas.js";
import {
  color_to_rgb,
  scheme_analogous,
  scheme_complementary,
  scheme_dyadic,
  scheme_square,
} from "./utilities.js";
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const benchmark = new Maven();

const Palettes = [
  MaterialPalette,
  StandardPalette,
  InterpolatedPalette,
  BlendedPalette,
];

describe("Formulas", () => {
  describe("Palettes", () => {
    const color = "dodgerblue";

    Palettes.forEach((Palette) =>
      it(`${Palette.name} should reject invalid colors`, () =>
        expect(() => Palette({}, "invalid")).toThrow())
    );

    describe("MaterialPalette({ light, dark, scheme, format }, color)", () => {
      it("should work without configuration", () => {
        const result = MaterialPalette({}, color);
        expect(result).toEqual({
          main: {
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
        });
      });
      it("should be able to adjust the light and dark contrast", () => {
        const result = MaterialPalette({ light: 75, dark: 50 }, color);
        expect(result).toEqual({
          main: {
            50: "#cde5ff",
            100: "#afd5ff",
            200: "#90c4ff",
            300: "#70b4ff",
            400: "#4da2ff",
            500: "#1c8af4",
            600: "#1778d6",
            700: "#1160ae",
            800: "#0a4a87",
            900: "#053463",
          },
        });
      });
      it("should be able to work with color schemes", () => {
        const result = MaterialPalette({ scheme: scheme_dyadic }, color);
        expect(result).toEqual({
          main: {
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
          accent: {
            50: "#fcf8fe",
            100: "#eedbf9",
            200: "#e1bff4",
            300: "#d4a2ee",
            400: "#c685e7",
            500: "#a95dce",
            600: "#8e4dad",
            700: "#66367d",
            800: "#402050",
            900: "#1e0c27",
          },
        });
      });
      it("should be able output different color formats", () => {
        const result = MaterialPalette({ format: color_to_rgb }, color);
        expect(result).toEqual({
          main: {
            50: "rgb(245, 250, 255)",
            100: "rgb(207, 230, 255)",
            200: "rgb(168, 210, 255)",
            300: "rgb(129, 189, 255)",
            400: "rgb(87, 167, 255)",
            500: "rgb(26, 132, 235)",
            600: "rgb(21, 110, 197)",
            700: "rgb(12, 78, 143)",
            800: "rgb(5, 48, 92)",
            900: "rgb(1, 21, 46)",
          },
        });
      });
    });
    describe("StandardPalette({ tints, shades, contrast, format, scheme }, color)", () => {
      it("should work without configuration", () => {
        const result = StandardPalette({}, color);
        expect(result).toEqual({
          main: {
            base: "#1e90ff",
            light: { 100: "#74b6ff", 200: "#b5d8ff", 300: "#f5faff" },
            dark: { 100: "#0a4986", 200: "#010d1f" },
          },
        });
      });
      it("should be able to adjust the maximum contrast", () => {
        const result = StandardPalette({ contrast: 85 }, color);
        expect(result).toEqual({
          main: {
            base: "#1e90ff",
            light: { 100: "#6cb2ff", 200: "#a8d1ff", 300: "#e1efff" },
            dark: { 100: "#0c5092", 200: "#011833" },
          },
        });
      });
      it("should be able to adjust the number of tints/shades", () => {
        const result = StandardPalette({ tints: 4, shades: 4 }, color);
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
      it("should be able to work with color schemes", () => {
        const result = StandardPalette({ scheme: scheme_analogous }, color);
        expect(result).toEqual({
          main: {
            base: "#1e90ff",
            light: { 100: "#74b6ff", 200: "#b5d8ff", 300: "#f5faff" },
            dark: { 100: "#0a4986", 200: "#010d1f" },
          },
          accent: {
            base: "#a06ff2",
            dark: {
              100: "#8058c2",
              200: "#614195",
              300: "#432c6a",
              400: "#281941",
              500: "#0f071d",
            },
          },
          highlight: {
            base: "#da56ad",
            dark: {
              100: "#af438a",
              200: "#853269",
              300: "#5e2149",
              400: "#3a112c",
              500: "#190411",
            },
          },
        });
      });
      it("should be able output different color formats", () => {
        const result = StandardPalette({ format: color_to_rgb }, color);
        expect(result).toEqual({
          main: {
            base: "rgb(30, 144, 255)",
            light: {
              100: "rgb(116, 182, 255)",
              200: "rgb(181, 216, 255)",
              300: "rgb(245, 250, 255)",
            },
            dark: { 100: "rgb(10, 73, 134)", 200: "rgb(1, 13, 31)" },
          },
        });
      });
    });
    describe("BlendedPalette({ values, amount, target, contrast, tints, shades, format }, color)", () => {
      const target = "coral";
      it("should work without configuration", () => {
        const result = BlendedPalette({}, color);
        expect(result).toEqual({
          main: {
            base: "#0d5194",
            light: { 100: "#82a2c8", 200: "#f3f6fa" },
            dark: { 100: "#03264b", 200: "#00040d" },
          },
          accent: {
            base: "#021a36",
            dark: {
              100: "#011126",
              200: "#000817",
              300: "#00030a",
              400: "#000002",
            },
          },
          highlight: { base: "#000000", dark: { 100: "#000000" } },
        });
      });
      it("should be able to adjust the blend target", () => {
        const result = BlendedPalette({ target }, color);
        expect(result).toEqual({
          main: {
            base: "#8894cd",
            light: { 100: "#bfc6e6", 200: "#f9fafd" },
            dark: { 100: "#454b6a", 200: "#0b0d17" },
          },
          accent: {
            base: "#c78f97",
            dark: {
              100: "#966b71",
              200: "#67484d",
              300: "#3c292b",
              400: "#160c0e",
            },
          },
          highlight: {
            base: "#ff7f50",
            dark: {
              100: "#c15e3a",
              200: "#864026",
              300: "#502313",
              400: "#1f0a04",
            },
          },
        });
      });
      it("should be able to adjust the blend amount", () => {
        const result = BlendedPalette({ target, amount: 75 }, color);
        expect(result).toEqual({
          main: {
            base: "#7594da",
            light: { 100: "#b5c7ed", 200: "#f8fafd" },
            dark: { 100: "#3a4b72", 200: "#080d19" },
          },
          accent: {
            base: "#a993b3",
            dark: {
              100: "#7f6e86",
              200: "#574b5c",
              300: "#322a35",
              400: "#110d12",
            },
          },
          highlight: {
            base: "#d58c88",
            dark: {
              100: "#a06865",
              200: "#6f4745",
              300: "#412826",
              400: "#180c0b",
            },
          },
        });
      });
    });
    describe("InterpolatedPalette({ lightness, chroma, hue, values, contrast, tints, shades, format }, color)", () => {
      const target = "coral";
      it("should work without configuration", () => {
        const result = InterpolatedPalette({}, color);
        expect(result).toEqual({
          main: {
            base: "#2095ff",
            light: { 100: "#97caff", 200: "#f5faff" },
            dark: { 100: "#0b4c86", 200: "#010d1f" },
          },
          accent: {
            base: "#1e93ff",
            dark: {
              100: "#146ec1",
              200: "#0a4b86",
              300: "#032a50",
              400: "#010d1f",
            },
          },
          highlight: {
            base: "#1d92ff",
            dark: {
              100: "#136dc1",
              200: "#0a4a86",
              300: "#032a50",
              400: "#010d1f",
            },
          },
        });
      });
      it("should be able to adjust color properties", () => {
        const result = InterpolatedPalette({ chroma: -15, hue: 30 }, color);
        expect(result).toEqual({
          main: {
            base: "#2095ff",
            light: { 100: "#97caff", 200: "#f5faff" },
            dark: { 100: "#0b4c86", 200: "#010d1f" },
          },
          accent: {
            base: "#6591f8",
            dark: {
              100: "#4a6cbb",
              200: "#314982",
              300: "#1a294d",
              400: "#060d1e",
            },
          },
          highlight: {
            base: "#808ed0",
            dark: {
              100: "#5f6a9d",
              200: "#40486c",
              300: "#23283f",
              400: "#0a0c17",
            },
          },
        });
      });
    });
  });
  describe("Text/Typography", () => {
    describe("TextStack(fallback, font)", () => {
      it("should work with system stacks", () => {
        const result = TextStack("sans");
        expect(result).toBe(
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        );
      });
      it("should allow attaching a custom stack", () => {
        const result = TextStack("sans", "Zilla Slab");
        expect(result).toBe(
          "Zilla Slab, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        );
      });
    });
  });
});

Palettes.forEach((Palette) =>
  benchmark.Bench({
    name: `${Palette.name} perf`,
    fn() {
      return Palette({}, "gainsboro");
    },
    steps: 100,
  })
);

benchmark.runBench().then(benchmark.Result(7)).then(run());
