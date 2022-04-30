import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette, tokens } from "../../color.js";

describe("tokens(palette)", () => {
  it("should reject an invalid color", () => {
    expect(() => tokens(palette({}, "invalid"))).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("material palette configuration", () => {
    it("should work with default settings", () => {
      expect(tokens(palette({}, red))).toEqual({
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
      });
      expect(tokens(palette({}, green))).toEqual({
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
      });
      expect(tokens(palette({}, blue))).toEqual({
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
      });
    });
    it("should append interface states", () => {
      expect(tokens(palette({ states: true }, red))).toEqual({
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
          pending: "#9b8e8d",
          success: "#498635",
          warning: "#ae8e28",
          error: "#ae352e",
        },
      });
      expect(tokens(palette({ states: true }, green))).toEqual({
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
          pending: "#939b90",
          success: "#349134",
          warning: "#a89b25",
          error: "#ad482d",
        },
      });
      expect(tokens(palette({ states: true }, blue))).toEqual({
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
          pending: "#8e949c",
          success: "#2a8b48",
          warning: "#a29542",
          error: "#a6423f",
        },
      });
    });
  });
  describe("artistic palette configuration", () => {
    it("should work with default settings", () => {
      expect(tokens(palette({ configuration: "artistic" }, red))).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#ef7175", 200: "#fbb0af", 300: "#ffebeb" },
        muted: { 100: "#d4595e", 200: "#c67f7f", 300: "#b3a09f" },
        dark: { 100: "#9a2130", 200: "#5c2023", 300: "#231616" },
      });
      expect(tokens(palette({ configuration: "artistic" }, green))).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      });
      expect(tokens(palette({ configuration: "artistic" }, blue))).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#70b4ff", 200: "#aed5ff", 300: "#ebf5ff" },
        muted: { 100: "#589be7", 200: "#7ea3ce", 300: "#9fa8b4" },
        dark: { 100: "#2367af", 200: "#1f4066", 300: "#161c25" },
      });
    });
    it("should add and remove variants based on tints/tones/shades settings", () => {
      expect(
        tokens(
          palette(
            { configuration: "artistic", tints: 6, tones: 0, shades: 3 },
            red,
          ),
        ),
      ).toEqual({
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
        dark: { 100: "#9a2130", 200: "#5c2023", 300: "#231616" },
      });
      expect(
        tokens(
          palette(
            { configuration: "artistic", tints: 4, tones: 2, shades: 3 },
            green,
          ),
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: {
          100: "#a1ff6c",
          200: "#beff9e",
          300: "#daffc8",
          400: "#f4ffee",
        },
        muted: { 100: "#98da78", 200: "#a8b3a3" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      });
      expect(
        tokens(
          palette(
            { configuration: "artistic", tints: 0, tones: 0, shades: 9 },
            blue,
          ),
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        dark: {
          100: "#2182e4",
          200: "#2274c9",
          300: "#2367af",
          400: "#225a96",
          500: "#214d7e",
          600: "#1f4066",
          700: "#1d344f",
          800: "#192839",
          900: "#161c25",
        },
      });
    });
  });

  it("should respond to contrast setting for either configuration", () => {
    expect(tokens(palette({ contrast: 95 }, red))).toEqual({
      50: "#ffdad9",
      100: "#fcbab9",
      200: "#f79999",
      300: "#f0777a",
      400: "#e7515b",
      500: "#b81e35",
      600: "#94212e",
      700: "#722128",
      800: "#521e20",
      900: "#331919",
      bg: "#fff5f5",
      fg: "#1a1313",
    });
    expect(
      tokens(palette({ configuration: "artistic", contrast: 85 }, green)),
    ).toEqual({
      bg: "#eeffe6",
      fg: "#212f1a",
      light: { 100: "#a5ff74", 200: "#c6ffa9", 300: "#e4ffd7" },
      muted: { 100: "#8fea5c", 200: "#9bd57f", 300: "#a4bf98" },
      dark: { 100: "#62bb23", 200: "#467b26", 300: "#2a411f" },
    });
    expect(tokens(palette({ contrast: 90 }, blue))).toEqual({
      50: "#c9e3ff",
      100: "#abd3ff",
      200: "#8dc3ff",
      300: "#6eb3ff",
      400: "#4ca2ff",
      500: "#227cd8",
      600: "#2468b2",
      700: "#23558d",
      800: "#20426a",
      900: "#1c3049",
      bg: "#ebf5ff",
      fg: "#161c25",
    });
  });

  it("should append accents when toggled for either configuration", () => {
    expect(tokens(palette({ accents: true }, red))).toEqual({
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
      a50: "#d9ffff",
      a100: "#ebebff",
      a200: "#f0b9ff",
      a300: "#f388e5",
      a400: "#ed5599",
      a500: "#bd0000",
      a600: "#900000",
      a700: "#560000",
      a800: "#111500",
      a900: "#000d00",
    });
    expect(
      tokens(palette({ configuration: "artistic", accents: true }, green)),
    ).toEqual({
      bg: "#ffffff",
      fg: "#111111",
      light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
      muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
      dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      accent: {
        100: "#eebaad",
        200: "#dacd96",
        300: "#c2df7b",
        400: "#a6ef58",
        500: "#64ce55",
        600: "#50a867",
        700: "#3e836e",
        800: "#2f5e70",
        900: "#24386d",
      },
    });
    expect(tokens(palette({ accents: true }, blue))).toEqual({
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
      a50: "#eeffdd",
      a100: "#ccffe7",
      a200: "#8efff4",
      a300: "#28e8fa",
      a400: "#00c0ff",
      a500: "#5a58eb",
      a600: "#7100c1",
      a700: "#750082",
      a800: "#6b0036",
      a900: "#560000",
    });
  });

  it("should respond to dark mode when toggled for either configuration", () => {
    expect(tokens(palette({ dark: true }, red))).toEqual({
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
    expect(
      tokens(palette({ configuration: "artistic", dark: true }, green)),
    ).toEqual({
      bg: "#111111",
      fg: "#ffffff",
      light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
      muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
      dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
    });
    expect(tokens(palette({ dark: true }, blue))).toEqual({
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
    expect(tokens(palette({ accents: true, dark: true }, red))).toEqual({
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
      a50: "#01001d",
      a100: "#110041",
      a200: "#3b005c",
      a300: "#6e0067",
      a400: "#a7005e",
      a500: "#ff4700",
      a600: "#ff8200",
      a700: "#ffc500",
      a800: "#efff00",
      a900: "#44ff00",
    });
    expect(
      tokens(
        palette(
          { configuration: "artistic", accents: true, dark: true },
          green,
        ),
      ),
    ).toEqual({
      bg: "#111111",
      fg: "#ffffff",
      light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
      muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
      dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      accent: {
        100: "#eebaad",
        200: "#dacd96",
        300: "#c2df7b",
        400: "#a6ef58",
        500: "#64ce55",
        600: "#50a867",
        700: "#3e836e",
        800: "#2f5e70",
        900: "#24386d",
      },
    });
    expect(tokens(palette({ accents: true, dark: true }, blue))).toEqual({
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
      a50: "#021000",
      a100: "#002e0f",
      a200: "#004c3f",
      a300: "#00697b",
      a400: "#0080be",
      a500: "#919aff",
      a600: "#eba0ff",
      a700: "#ffa5ff",
      a800: "#ff9aff",
      a900: "#ff85c0",
    });
  });
});

run();
