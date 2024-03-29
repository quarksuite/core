import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette } from "../../color.js";

describe("palette(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => palette({}, "invalid")).toThrow();
  });

  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  describe("settings.configuration = 'material'", () => {
    it("should activate settings.states", () => {
      expect(palette({ states: true }, red)).toEqual({
        50: "#ffebeb",
        100: "#fec8c7",
        200: "#faa4a3",
        300: "#f27f81",
        400: "#e8555f",
        500: "#b41f35",
        600: "#8d222d",
        700: "#682125",
        800: "#451d1e",
        900: "#231616",
        bg: "#ffffff",
        fg: "#111111",
        state: {
          pending: "#877171",
          success: "#4f6c30",
          warning: "#94712a",
          error: "#94302b",
        },
      });
      expect(palette({ states: true }, green)).toEqual({
        50: "#f4ffee",
        100: "#dfffd0",
        200: "#c9ffaf",
        300: "#b3ff8b",
        400: "#9aff60",
        500: "#6ace1f",
        600: "#56a026",
        700: "#427426",
        800: "#2f4a21",
        900: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
        state: {
          pending: "#7a8775",
          success: "#348030",
          warning: "#8a8726",
          error: "#914c2b",
        },
      });
      expect(palette({ states: true }, blue)).toEqual({
        50: "#ebf5ff",
        100: "#c7e2ff",
        200: "#a2ceff",
        300: "#7dbaff",
        400: "#55a6ff",
        500: "#2277cf",
        600: "#235fa0",
        700: "#214874",
        800: "#1c324b",
        900: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
        state: {
          pending: "#717b88",
          success: "#27754c",
          warning: "#807d4c",
          error: "#864145",
        },
      });
      expect(palette({ states: true }, purple)).toEqual({
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
        state: {
          pending: "#75707c",
          success: "#366b41",
          warning: "#83713f",
          error: "#86343a",
        },
      });
    });
  });

  describe("settings.configuration = 'artistic'", () => {
    it("should activate settings.tints", () => {
      expect(palette({ configuration: "artistic", tints: 6 }, red)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: {
          100: "#e64d59",
          200: "#ef7175",
          300: "#f69292",
          400: "#fbb0af",
          500: "#ffcecc",
          600: "#ffebeb",
        },
        muted: { 100: "#d4595e", 200: "#c67f7f", 300: "#b3a09f" },
        dark: { 100: "#9a2130", 200: "#5c2023", 300: "#231616" },
      });
      expect(palette({ configuration: "artistic", tints: 0 }, red)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        muted: { 100: "#d4595e", 200: "#c67f7f", 300: "#b3a09f" },
        dark: { 100: "#9a2130", 200: "#5c2023", 300: "#231616" },
      });
    });
    it("should activate settings.tones", () => {
      expect(palette({ configuration: "artistic", tones: 6 }, green)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        muted: {
          100: "#89f348",
          200: "#91e664",
          300: "#98da78",
          400: "#9ecd88",
          500: "#a3c096",
          600: "#a8b3a3",
        },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      });
      expect(palette({ configuration: "artistic", tones: 0 }, green)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      });
    });
    it("should activate settings.shades", () => {
      expect(palette({ configuration: "artistic", shades: 6 }, blue)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#70b4ff", 200: "#aed5ff", 300: "#ebf5ff" },
        muted: { 100: "#589be7", 200: "#7ea3ce", 300: "#9fa8b4" },
        dark: {
          100: "#227bd7",
          200: "#2367af",
          300: "#22538a",
          400: "#1f4066",
          500: "#1b2e44",
          600: "#161c25",
        },
      });
      expect(palette({ configuration: "artistic", shades: 0 }, blue)).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#70b4ff", 200: "#aed5ff", 300: "#ebf5ff" },
        muted: { 100: "#589be7", 200: "#7ea3ce", 300: "#9fa8b4" },
      });
    });
    it("should allow setting multiple variants", () => {
      expect(
        palette(
          { configuration: "artistic", tints: 3, tones: 2, shades: 4 },
          purple,
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#9171ba", 200: "#beadd8", 300: "#eeeaf6" },
        muted: { 100: "#836ba3", 200: "#a39fa9" },
        dark: {
          100: "#512d78",
          200: "#3d2658",
          300: "#2a1e39",
          400: "#18151d",
        },
      });
    });
  });

  describe("settings.contrast", () => {
    it("should be active with either configuration", () => {
      expect(palette({ contrast: 90 }, red)).toEqual({
        50: "#fec9c9",
        100: "#fbacac",
        200: "#f58f90",
        300: "#ef6f74",
        400: "#e64c58",
        500: "#bb1e36",
        600: "#9c2130",
        700: "#7d222a",
        800: "#5f2024",
        900: "#431c1e",
        bg: "#ffebeb",
        fg: "#231616",
      });
      expect(
        palette({ configuration: "artistic", contrast: 80 }, green),
      ).toEqual({
        bg: "#e8ffdd",
        fg: "#26391d",
        light: { 100: "#a3ff70", 200: "#c2ffa4", 300: "#dfffd0" },
        muted: { 100: "#8eeb5a", 200: "#9ad77c", 300: "#a2c394" },
        dark: { 100: "#63bf23", 200: "#498227", 300: "#2f4a21" },
      });
      expect(palette({ contrast: 70 }, blue)).toEqual({
        50: "#8ec4ff",
        100: "#7cbaff",
        200: "#68b0ff",
        300: "#54a6ff",
        400: "#3d9bff",
        500: "#2184e7",
        600: "#2278cf",
        700: "#236cb8",
        800: "#2360a2",
        900: "#22548c",
        bg: "#c3e0ff",
        fg: "#1d344f",
      });
      expect(
        palette({ configuration: "artistic", contrast: 95 }, purple),
      ).toEqual({
        bg: "#f7f5fa",
        fg: "#151317",
        light: { 100: "#8e6eb8", 200: "#baa7d5", 300: "#e7e1f1" },
        muted: { 100: "#7858a0", 200: "#8c79a5", 300: "#a09aa9" },
        dark: { 100: "#4c2b6f", 200: "#332247", 300: "#1c1723" },
      });
    });
  });

  describe("settings.accents", () => {
    it("should be active with either configuration", () => {
      expect(palette({ accents: true }, red)).toEqual({
        50: "#ffebeb",
        100: "#fec8c7",
        200: "#faa4a3",
        300: "#f27f81",
        400: "#e8555f",
        500: "#b41f35",
        600: "#8d222d",
        700: "#682125",
        800: "#451d1e",
        900: "#231616",
        bg: "#ffffff",
        fg: "#111111",
        a50: "#9fd8ff",
        a100: "#b8b3ff",
        a200: "#cf8eff",
        a300: "#de68d0",
        a400: "#e3428e",
        a500: "#c80000",
        a600: "#a50400",
        a700: "#762b00",
        a800: "#363900",
        a900: "#003900",
      });
      expect(
        palette({ configuration: "artistic", accents: true }, green),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
        accent: {
          100: "#ffc6d3",
          200: "#ffca8f",
          300: "#ffda2b",
          400: "#fff200",
          500: "#f6fd00",
          600: "#00f695",
          700: "#00dae7",
          800: "#00a7ff",
          900: "#0059ff",
        },
      });
      expect(palette({ accents: true }, blue)).toEqual({
        50: "#ebf5ff",
        100: "#c7e2ff",
        200: "#a2ceff",
        300: "#7dbaff",
        400: "#55a6ff",
        500: "#2277cf",
        600: "#235fa0",
        700: "#214874",
        800: "#1c324b",
        900: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
        a50: "#d4ffb4",
        a100: "#90f8bc",
        a200: "#2ce8cf",
        a300: "#00d1e6",
        a400: "#00b4f9",
        a500: "#6467f3",
        a600: "#843ad3",
        a700: "#95009f",
        a800: "#9a005d",
        a900: "#940007",
      });
      expect(
        palette({ configuration: "artistic", accents: true }, purple),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#9171ba", 200: "#beadd8", 300: "#eeeaf6" },
        muted: { 100: "#795aa0", 200: "#8e7da6", 300: "#a39fa9" },
        dark: { 100: "#4a2a6d", 200: "#302143", 300: "#18151d" },
        accent: {
          100: "#6dbfb3",
          200: "#3facba",
          300: "#2993c0",
          400: "#3c76c0",
          500: "#5556b4",
          600: "#6f0064",
          700: "#6a0020",
          800: "#580000",
          900: "#370000",
        },
      });
    });
  });
  describe("settings.dark", () => {
    it("should be active with either configuration", () => {
      expect(palette({ dark: true }, red)).toEqual({
        50: "#231616",
        100: "#451d1e",
        200: "#682125",
        300: "#8d222d",
        400: "#b41f35",
        500: "#e8555f",
        600: "#f27f81",
        700: "#faa4a3",
        800: "#fec8c7",
        900: "#ffebeb",
        bg: "#111111",
        fg: "#ffffff",
      });
      expect(palette({ configuration: "artistic", dark: true }, green)).toEqual(
        {
          bg: "#111111",
          fg: "#ffffff",
          light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
          muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
          dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
        },
      );
      expect(palette({ dark: true }, blue)).toEqual({
        50: "#161c25",
        100: "#1c324b",
        200: "#214874",
        300: "#235fa0",
        400: "#2277cf",
        500: "#55a6ff",
        600: "#7dbaff",
        700: "#a2ceff",
        800: "#c7e2ff",
        900: "#ebf5ff",
        bg: "#111111",
        fg: "#ffffff",
      });
      expect(
        palette({ configuration: "artistic", dark: true }, purple),
      ).toEqual({
        bg: "#111111",
        fg: "#ffffff",
        light: { 100: "#9171ba", 200: "#beadd8", 300: "#eeeaf6" },
        muted: { 100: "#795aa0", 200: "#8e7da6", 300: "#a39fa9" },
        dark: { 100: "#4a2a6d", 200: "#302143", 300: "#18151d" },
      });
    });
    it("should invert accents", () => {
      expect(palette({ accents: true, dark: true }, red)).toEqual({
        50: "#231616",
        100: "#451d1e",
        200: "#682125",
        300: "#8d222d",
        400: "#b41f35",
        500: "#e8555f",
        600: "#f27f81",
        700: "#faa4a3",
        800: "#fec8c7",
        900: "#ffebeb",
        bg: "#111111",
        fg: "#ffffff",
        a50: "#001868",
        a100: "#311880",
        a200: "#5e1689",
        a300: "#8b1082",
        a400: "#b70569",
        a500: "#f53e00",
        a600: "#fc6e00",
        a700: "#eda200",
        a800: "#bed500",
        a900: "#40ff00",
      });
      expect(
        palette(
          { configuration: "artistic", accents: true, dark: true },
          green,
        ),
      ).toEqual({
        bg: "#111111",
        fg: "#ffffff",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
        accent: {
          100: "#d23a53",
          200: "#ed5200",
          300: "#f97700",
          400: "#f0a400",
          500: "#ced300",
          600: "#00ffc7",
          700: "#00ffff",
          800: "#00f7ff",
        },
      });
      expect(palette({ accents: true, dark: true }, blue)).toEqual({
        50: "#161c25",
        100: "#1c324b",
        200: "#214874",
        300: "#235fa0",
        400: "#2277cf",
        500: "#55a6ff",
        600: "#7dbaff",
        700: "#a2ceff",
        800: "#c7e2ff",
        900: "#ebf5ff",
        bg: "#111111",
        fg: "#ffffff",
        a50: "#1e4400",
        a100: "#005c2b",
        a200: "#00725f",
        a300: "#008297",
        a400: "#008ccf",
        a500: "#868fff",
        a600: "#d08cff",
        a700: "#ff8aff",
        a800: "#ff8af7",
        a900: "#ff94bd",
      });
      expect(
        palette(
          { configuration: "artistic", accents: true, dark: true },
          purple,
        ),
      ).toEqual({
        bg: "#111111",
        fg: "#ffffff",
        light: { 100: "#9171ba", 200: "#beadd8", 300: "#eeeaf6" },
        muted: { 100: "#795aa0", 200: "#8e7da6", 300: "#a39fa9" },
        dark: { 100: "#4a2a6d", 200: "#302143", 300: "#18151d" },
        accent: {
          100: "#00100b",
          200: "#001d2b",
          300: "#00284f",
          400: "#002e71",
          500: "#36318c",
          600: "#a13493",
          700: "#d73772",
          800: "#ff4f2a",
          900: "#ff7f00",
        },
      });
    });
    it("should invert material interface states", () => {
      expect(palette({ states: true, dark: true }, red)).toEqual({
        50: "#231616",
        100: "#451d1e",
        200: "#682125",
        300: "#8d222d",
        400: "#b41f35",
        500: "#e8555f",
        600: "#f27f81",
        700: "#faa4a3",
        800: "#fec8c7",
        900: "#ffebeb",
        bg: "#111111",
        fg: "#ffffff",
        state: {
          pending: "#efd7d6",
          success: "#b1d292",
          warning: "#fed891",
          error: "#ff958a",
        },
      });
      expect(palette({ states: true, dark: true }, green)).toEqual({
        50: "#1c2418",
        100: "#2f4a21",
        200: "#427426",
        300: "#56a026",
        400: "#6ace1f",
        500: "#9aff60",
        600: "#b3ff8b",
        700: "#c9ffaf",
        800: "#dfffd0",
        900: "#f4ffee",
        bg: "#111111",
        fg: "#ffffff",
        state: {
          pending: "#e1efdb",
          success: "#9be994",
          warning: "#f2f093",
          error: "#feb08c",
        },
      });
      expect(palette({ states: true, dark: true }, blue)).toEqual({
        50: "#161c25",
        100: "#1c324b",
        200: "#214874",
        300: "#235fa0",
        400: "#2277cf",
        500: "#55a6ff",
        600: "#7dbaff",
        700: "#a2ceff",
        800: "#c7e2ff",
        900: "#ebf5ff",
        bg: "#111111",
        fg: "#ffffff",
        state: {
          pending: "#d6e2f0",
          success: "#90dcae",
          warning: "#e7e4b0",
          error: "#f3a3a4",
        },
      });
      expect(palette({ states: true, dark: true }, purple)).toEqual({
        50: "#18151d",
        100: "#261c34",
        200: "#35234b",
        300: "#452964",
        400: "#552e7e",
        500: "#7f59ad",
        600: "#9a7dc0",
        700: "#b5a1d2",
        800: "#d1c5e4",
        900: "#eeeaf6",
        bg: "#111111",
        fg: "#ffffff",
        state: {
          pending: "#dbd6e3",
          success: "#99d0a1",
          warning: "#ebd7a2",
          error: "#f39698",
        },
      });
    });
  });
});

run();
