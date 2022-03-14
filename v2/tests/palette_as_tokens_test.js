// palette_as_tokens Tests


// [[file:../../Notebook.org::*palette_as_tokens Tests][palette_as_tokens Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette_as_tokens, palette_create } from "../color.js";

describe("palette_as_tokens(palette)", () => {
  it("should reject an invalid color", () => {
    expect(() => palette_as_tokens(palette_create({}, "invalid"))).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("material palette configuration", () => {
    it("should work with default settings", () => {
      expect(palette_as_tokens(palette_create({}, red))).toEqual({
        50: "#ffd8d6",
        100: "#fdbdbc",
        200: "#f9a3a2",
        300: "#f48788",
        400: "#ed6a6f",
        500: "#e54956",
        600: "#ad2033",
        700: "#7f222a",
        800: "#551f21",
        900: "#2c1818",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(palette_as_tokens(palette_create({}, green))).toEqual({
        50: "#e8ffdd",
        100: "#d9ffc6",
        200: "#c8ffae",
        300: "#b8ff94",
        400: "#a6ff76",
        500: "#93ff52",
        600: "#67c621",
        700: "#4f9027",
        800: "#385d24",
        900: "#212f1a",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(palette_as_tokens(palette_create({}, blue))).toEqual({
        50: "#d7eaff",
        100: "#bcdcff",
        200: "#a1ceff",
        300: "#85bfff",
        400: "#69b0ff",
        500: "#49a0ff",
        600: "#2373c6",
        700: "#225790",
        800: "#1e3c5d",
        900: "#18222f",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
    it("should work with light/dark contrast settings", () => {
      expect(
        palette_as_tokens(palette_create({ light: 90, dark: 95 }, red)),
      ).toEqual({
        50: "#fec8c7",
        100: "#fbb0af",
        200: "#f79898",
        300: "#f27f81",
        400: "#ec646a",
        500: "#e44553",
        600: "#af1f34",
        700: "#84222b",
        800: "#5b1f23",
        900: "#341a1a",
        bg: "#ffebeb",
        fg: "#1a1313",
      });
      expect(
        palette_as_tokens(palette_create({ light: 80, dark: 85 }, green)),
      ).toEqual({
        50: "#d5ffc1",
        100: "#c8ffae",
        200: "#bbff99",
        300: "#adff83",
        400: "#9fff69",
        500: "#90ff49",
        600: "#6ace1f",
        700: "#56a026",
        800: "#427326",
        900: "#2f4a21",
        bg: "#e8ffdd",
        fg: "#212f1a",
      });
      expect(
        palette_as_tokens(palette_create({ light: 70, dark: 75 }, blue)),
      ).toEqual({
        50: "#a6d1ff",
        100: "#93c6ff",
        200: "#80bcff",
        300: "#6cb1ff",
        400: "#56a7ff",
        500: "#3e9bff",
        600: "#227ad4",
        700: "#2364ab",
        800: "#225083",
        900: "#1e3c5d",
        bg: "#c3e0ff",
        fg: "#1b2e44",
      });
    });
    it("should append accents when toggled", () => {
      expect(
        palette_as_tokens(palette_create({ accented: true }, red)),
      ).toEqual({
        50: "#ffd8d6",
        100: "#fdbdbc",
        200: "#f9a3a2",
        300: "#f48788",
        400: "#ed6a6f",
        500: "#e54956",
        600: "#ad2033",
        700: "#7f222a",
        800: "#551f21",
        900: "#2c1818",
        bg: "#ffffff",
        fg: "#111111",
        a100: "#fbaabc",
        a200: "#c0466b",
        a300: "#ff00a6",
        a400: "#a40000",
      });
      expect(
        palette_as_tokens(palette_create({ accented: true }, green)),
      ).toEqual({
        50: "#e8ffdd",
        100: "#d9ffc6",
        200: "#c8ffae",
        300: "#b8ff94",
        400: "#a6ff76",
        500: "#93ff52",
        600: "#67c621",
        700: "#4f9027",
        800: "#385d24",
        900: "#212f1a",
        bg: "#ffffff",
        fg: "#111111",
        a100: "#f1ff9f",
        a200: "#c8ee2e",
        a300: "#ddff00",
        a400: "#00c100",
      });
      expect(
        palette_as_tokens(palette_create({ accented: true }, blue)),
      ).toEqual({
        50: "#d7eaff",
        100: "#bcdcff",
        200: "#a1ceff",
        300: "#85bfff",
        400: "#69b0ff",
        500: "#49a0ff",
        600: "#2373c6",
        700: "#225790",
        800: "#1e3c5d",
        900: "#18222f",
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
        palette_as_tokens(palette_create({ type: "artistic" }, red)),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#f07578", 200: "#fcb7b5", 300: "#fff5f5" },
        muted: { 100: "#d4595e", 200: "#c67f7f", 300: "#b3a09f" },
        dark: { 100: "#a12131", 200: "#692126", 300: "#361a1a" },
      });
      expect(
        palette_as_tokens(palette_create({ type: "artistic" }, green)),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#adff82", 200: "#d5ffc0", 300: "#f9fff7" },
        muted: { 100: "#91e664", 200: "#9ecd88", 300: "#a8b3a3" },
        dark: { 100: "#60b824", 200: "#437526", 300: "#26391d" },
      });
      expect(
        palette_as_tokens(palette_create({ type: "artistic" }, blue)),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: { 100: "#74b6ff", 200: "#b5d8ff", 300: "#f5faff" },
        muted: { 100: "#589be7", 200: "#7ea3ce", 300: "#9fa8b4" },
        dark: { 100: "#236bb8", 200: "#214976", 300: "#192839" },
      });
    });
    it("should work with overall contrast setting", () => {
      expect(
        palette_as_tokens(
          palette_create({ type: "artistic", contrast: 95 }, red),
        ),
      ).toEqual({
        bg: "#fff5f5",
        fg: "#1a1313",
        light: { 100: "#ef7275", 200: "#fbb0af", 300: "#ffeceb" },
        muted: { 100: "#d4575d", 200: "#c87c7c", 300: "#b69b9a" },
        dark: { 100: "#a42132", 200: "#6f2127", 300: "#3d1b1c" },
      });
      expect(
        palette_as_tokens(
          palette_create({ type: "artistic", contrast: 90 }, green),
        ),
      ).toEqual({
        bg: "#f4ffee",
        fg: "#1c2418",
        light: { 100: "#a9ff7b", 200: "#cdffb5", 300: "#efffe7" },
        muted: { 100: "#90e95f", 200: "#9cd282", 300: "#a5bb9b" },
        dark: { 100: "#63bf23", 200: "#498227", 300: "#2f4a21" },
      });
      expect(
        palette_as_tokens(
          palette_create({ type: "artistic", contrast: 85 }, blue),
        ),
      ).toEqual({
        bg: "#e1efff",
        fg: "#18222f",
        light: { 100: "#69b0ff", 200: "#a2ceff", 300: "#d8ebff" },
        muted: { 100: "#5199eb", 200: "#73a0d6", 300: "#91a6c0" },
        dark: { 100: "#2371c2", 200: "#225389", 300: "#1d3654" },
      });
    });
    it("should add and remove variants based on tints/tones/shades settings", () => {
      expect(
        palette_as_tokens(
          palette_create(
            { type: "artistic", tints: 6, tones: 0, shades: 3 },
            red,
          ),
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: {
          100: "#e74f5a",
          200: "#f07578",
          300: "#f79797",
          400: "#fcb7b5",
          500: "#ffd6d5",
          600: "#fff5f5",
        },
        dark: { 100: "#a12131", 200: "#692126", 300: "#361a1a" },
      });
      expect(
        palette_as_tokens(
          palette_create(
            { type: "artistic", tints: 4, tones: 2, shades: 3 },
            green,
          ),
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        light: {
          100: "#a2ff6f",
          200: "#c1ffa3",
          300: "#deffce",
          400: "#f9fff7",
        },
        muted: { 100: "#98da78", 200: "#a8b3a3" },
        dark: { 100: "#60b824", 200: "#437526", 300: "#26391d" },
      });
      expect(
        palette_as_tokens(
          palette_create(
            { type: "artistic", tints: 0, tones: 0, shades: 9 },
            blue,
          ),
        ),
      ).toEqual({
        bg: "#ffffff",
        fg: "#111111",
        dark: {
          100: "#2184e7",
          200: "#2277cf",
          300: "#236bb8",
          400: "#2360a1",
          500: "#22548b",
          600: "#214976",
          700: "#1f3e61",
          800: "#1c334d",
          900: "#192839",
        },
      });
    });
  });

  it("should append interface states when defined for either type", () => {
    expect(palette_as_tokens(palette_create({ stated: true }, red))).toEqual({
      50: "#ffd8d6",
      100: "#fdbdbc",
      200: "#f9a3a2",
      300: "#f48788",
      400: "#ed6a6f",
      500: "#e54956",
      600: "#ad2033",
      700: "#7f222a",
      800: "#551f21",
      900: "#2c1818",
      bg: "#ffffff",
      fg: "#111111",
      state: {
        pending: "#e4b4b3",
        success: "#707d2a",
        warning: "#de8a2d",
        error: "#bc2029",
      },
    });
    expect(palette_as_tokens(palette_create({ stated: true }, green))).toEqual({
      50: "#e8ffdd",
      100: "#d9ffc6",
      200: "#c8ffae",
      300: "#b8ff94",
      400: "#a6ff76",
      500: "#93ff52",
      600: "#67c621",
      700: "#4f9027",
      800: "#385d24",
      900: "#212f1a",
      bg: "#ffffff",
      fg: "#111111",
      state: {
        pending: "#c9e7bb",
        success: "#3ba721",
        warning: "#cdbd1d",
        error: "#b86724",
      },
    });
    expect(palette_as_tokens(palette_create({ stated: true }, blue))).toEqual({
      50: "#d7eaff",
      100: "#bcdcff",
      200: "#a1ceff",
      300: "#85bfff",
      400: "#69b0ff",
      500: "#49a0ff",
      600: "#2373c6",
      700: "#225790",
      800: "#1e3c5d",
      900: "#18222f",
      bg: "#ffffff",
      fg: "#111111",
      state: {
        pending: "#b3cbe7",
        success: "#109069",
        warning: "#b5a678",
        error: "#a15061",
      },
    });
  });
});

run();
// palette_as_tokens Tests:1 ends here
