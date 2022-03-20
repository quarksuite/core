// [[file:../../../Notebook.org::*tokens Tests][tokens Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { tokens, palette } from "../../color.js";

describe("tokens(palette)", () => {
  it("should reject an invalid color", () => {
    expect(() => tokens(palette({}, "invalid"))).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("material palette configuration", () => {
    it("should work with default settings", () => {
      expect(tokens(palette({}, red))).toEqual({
        50: "#ffebeb",
        100: "#ffcecc",
        200: "#fbb0af",
        300: "#f69292",
        400: "#ef7175",
        500: "#e64d59",
        600: "#aa2033",
        700: "#7a2229",
        800: "#4d1e20",
        900: "#231616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(tokens(palette({}, green))).toEqual({
        50: "#f4ffee",
        100: "#e2ffd5",
        200: "#d1ffba",
        300: "#beff9e",
        400: "#abff7e",
        500: "#96ff57",
        600: "#65c322",
        700: "#4c8a27",
        800: "#345422",
        900: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(tokens(palette({}, blue))).toEqual({
        50: "#ebf5ff",
        100: "#cde5ff",
        200: "#aed5ff",
        300: "#90c4ff",
        400: "#70b4ff",
        500: "#4da2ff",
        600: "#2371c3",
        700: "#22538a",
        800: "#1d3755",
        900: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
    it("should append accents when toggled", () => {
      expect(
        tokens(palette({ accented: true }, red)),
      ).toEqual({
        50: "#ffebeb",
        100: "#ffcecc",
        200: "#fbb0af",
        300: "#f69292",
        400: "#ef7175",
        500: "#e64d59",
        600: "#aa2033",
        700: "#7a2229",
        800: "#4d1e20",
        900: "#231616",
        bg: "#ffffff",
        fg: "#111111",
        a100: "#fbaabc",
        a200: "#c0466b",
        a300: "#ff00a6",
        a400: "#a40000",
      });
      expect(
        tokens(palette({ accented: true }, green)),
      ).toEqual({
        50: "#f4ffee",
        100: "#e2ffd5",
        200: "#d1ffba",
        300: "#beff9e",
        400: "#abff7e",
        500: "#96ff57",
        600: "#65c322",
        700: "#4c8a27",
        800: "#345422",
        900: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
        a100: "#f1ff9f",
        a200: "#c8ee2e",
        a300: "#ddff00",
        a400: "#00c100",
      });
      expect(
        tokens(palette({ accented: true }, blue)),
      ).toEqual({
        50: "#ebf5ff",
        100: "#cde5ff",
        200: "#aed5ff",
        300: "#90c4ff",
        400: "#70b4ff",
        500: "#4da2ff",
        600: "#2371c3",
        700: "#22538a",
        800: "#1d3755",
        900: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
        a100: "#b7e6ff",
        a200: "#309ad4",
        a300: "#00eeff",
        a400: "#2500ee",
      });
    });
  });
  describe("artistic palette configuration", () => {
    it("should work with default settings", () => {
      expect(
        tokens(palette({ configuration: "artistic" }, red)),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#ef7175", 200: "#fbb0af", 300: "#ffebeb" },
        muted: { 100: "#d4595e", 200: "#c67f7f", 300: "#b3a09f" },
        dark: { 100: "#9a2130", 200: "#5c2023", 300: "#231616" },
      });
      expect(
        tokens(palette({ configuration: "artistic" }, green)),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
        muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
        dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      });
      expect(
        tokens(palette({ configuration: "artistic" }, blue)),
      ).toEqual({
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
      50: "#ffe2e2",
      100: "#fec6c5",
      200: "#fbaaa9",
      300: "#f58d8e",
      400: "#ee6e72",
      500: "#e64b57",
      600: "#ac2033",
      700: "#7f222a",
      800: "#541f21",
      900: "#2c1818",
      bg: "#fff5f5",
      fg: "#1a1313",
    });
    expect(
      tokens(
        palette({ configuration: "artistic", contrast: 85 }, green),
      ),
    ).toEqual({
      bg: "#eeffe6",
      fg: "#212f1a",
      light: { 100: "#a5ff74", 200: "#c6ffa9", 300: "#e4ffd7" },
      muted: { 100: "#8fea5c", 200: "#9bd57f", 300: "#a4bf98" },
      dark: { 100: "#62bb23", 200: "#467b26", 300: "#2a411f" },
    });
    expect(tokens(palette({ contrast: 95 }, blue))).toEqual({
      50: "#e2f0ff",
      100: "#c5e1ff",
      200: "#a8d2ff",
      300: "#8bc2ff",
      400: "#6db2ff",
      500: "#4ba1ff",
      600: "#2373c6",
      700: "#22568f",
      800: "#1e3b5c",
      900: "#17222e",
      bg: "#f5faff",
      fg: "#13171b",
    });
  });

  it("should append interface states when defined for either configuration", () => {
    expect(tokens(palette({ stated: true }, red))).toEqual({
      50: "#ffebeb",
      100: "#ffcecc",
      200: "#fbb0af",
      300: "#f69292",
      400: "#ef7175",
      500: "#e64d59",
      600: "#aa2033",
      700: "#7a2229",
      800: "#4d1e20",
      900: "#231616",
      bg: "#ffffff",
      fg: "#111111",
      state: {
        pending: "#e0cccc",
        success: "#4c8625",
        warning: "#dc9a26",
        error: "#b62125",
      },
    });
    expect(
      tokens(
        palette({ configuration: "artistic", stated: true }, green),
      ),
    ).toEqual({
      bg: "#ffffff",
      fg: "#111111",
      light: { 100: "#abff7e", 200: "#d1ffba", 300: "#f4ffee" },
      muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
      dark: { 100: "#5daf25", 200: "#3c6625", 300: "#1c2418" },
      state: {
        pending: "#d4e0cf",
        success: "#2c9622",
        warning: "#d5af1f",
        error: "#b54323",
      },
    });
    expect(tokens(palette({ stated: true }, blue))).toEqual({
      50: "#ebf5ff",
      100: "#cde5ff",
      200: "#aed5ff",
      300: "#90c4ff",
      400: "#70b4ff",
      500: "#4da2ff",
      600: "#2371c3",
      700: "#22538a",
      800: "#1d3755",
      900: "#161c25",
      bg: "#ffffff",
      fg: "#111111",
      state: {
        pending: "#ccd5e1",
        success: "#1b8d44",
        warning: "#cba650",
        error: "#ac393f",
      },
    });
  });
});

run();
// tokens Tests:1 ends here
