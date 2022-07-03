import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette, perception } from "../../color.js";

describe("perception(settings, palette)", () => {
  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  const create = (color) => palette({}, color);

  describe("settings.check === 'vision'", () => {
    it("should activate settings.as", () => {
      expect(
        perception({ check: "vision", as: "protanopia" }, create(red)),
      ).toEqual({
        50: "#eeedeb",
        100: "#d2cfc7",
        200: "#b5b0a3",
        300: "#979182",
        400: "#797260",
        500: "#4c4736",
        600: "#3f3b2e",
        700: "#332f26",
        800: "#26241e",
        900: "#181816",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception({ check: "vision", as: "deuteranopia" }, create(green)),
      ).toEqual({
        50: "#fffaee",
        100: "#fff3d1",
        200: "#feebb1",
        300: "#fde48f",
        400: "#fcde68",
        500: "#cbaf2f",
        600: "#9e892e",
        700: "#72642a",
        800: "#494123",
        900: "#242118",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception({ check: "vision", as: "tritanopia" }, create(blue)),
      ).toEqual({
        50: "#eaf6fb",
        100: "#c4e4f2",
        200: "#9bd3e8",
        300: "#6fc1dd",
        400: "#31b1d2",
        500: "#0083a1",
        600: "#00687e",
        700: "#0e4e5d",
        800: "#16353f",
        900: "#151d20",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception({ check: "vision", as: "achromatopsia" }, create(purple)),
      ).toEqual({
        50: "#ececec",
        100: "#cbcbcb",
        200: "#acacac",
        300: "#8d8d8d",
        400: "#6f6f6f",
        500: "#464646",
        600: "#393939",
        700: "#2d2d2d",
        800: "#222222",
        900: "#171717",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
    it("should activate settings.method", () => {
      expect(
        perception(
          { check: "vision", as: "protanopia", method: "vienot" },
          create(red),
        ),
      ).toEqual({
        50: "#ededeb",
        100: "#cfcfc7",
        200: "#b1b1a3",
        300: "#929282",
        400: "#737360",
        500: "#474736",
        600: "#3b3b2e",
        700: "#303026",
        800: "#24241e",
        900: "#181816",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "deuteranopia", method: "vienot" },
          create(green),
        ),
      ).toEqual({
        50: "#fcfcee",
        100: "#f6f6d1",
        200: "#f1f1b1",
        300: "#ecec8e",
        400: "#e7e766",
        500: "#b8b82b",
        600: "#8f8f2c",
        700: "#686829",
        800: "#434322",
        900: "#222218",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "tritanopia", method: "vienot" },
          create(blue),
        ),
      ).toEqual({
        50: "#eaf6fb",
        100: "#c4e4f2",
        200: "#9bd3e8",
        300: "#6fc1dd",
        400: "#31b1d2",
        500: "#0083a1",
        600: "#00687e",
        700: "#0e4e5d",
        800: "#16353f",
        900: "#151d20",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "achromatopsia", method: "vienot" },
          create(purple),
        ),
      ).toEqual({
        50: "#ececec",
        100: "#cbcbcb",
        200: "#acacac",
        300: "#8d8d8d",
        400: "#6f6f6f",
        500: "#464646",
        600: "#393939",
        700: "#2d2d2d",
        800: "#222222",
        900: "#171717",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
  });
  describe("settings.check === 'contrast'", () => {
    it("should activate settings.factor", () => {
      expect(perception({ check: "contrast", factor: 0 }, create(red))).toEqual(
        {
          50: "#635b5b",
          100: "#634c4c",
          200: "#613d3c",
          300: "#5e2d2e",
          400: "#591c20",
          500: "#44060e",
          600: "#33070b",
          700: "#240608",
          800: "#150505",
          900: "#070303",
          bg: "#636363",
          fg: "#020202",
        },
      );
      expect(
        perception({ check: "contrast", factor: 25 }, create(green)),
      ).toEqual({
        50: "#838880",
        100: "#7a8873",
        200: "#708865",
        300: "#668856",
        400: "#5c8845",
        500: "#477330",
        600: "#3d5e2c",
        700: "#334a28",
        800: "#293623",
        900: "#1f231d",
        bg: "#888888",
        fg: "#191919",
      });
      expect(
        perception({ check: "contrast", factor: 50 }, create(blue)),
      ).toEqual({
        50: "#a4a9ae",
        100: "#94a0ae",
        200: "#8297ae",
        300: "#728eaf",
        400: "#6185af",
        500: "#4b6f99",
        600: "#486382",
        700: "#44566d",
        800: "#3f4a58",
        900: "#3a3e43",
        bg: "#aeaeae",
        fg: "#373737",
      });
      expect(
        perception({ check: "contrast", factor: 75 }, create(purple)),
      ).toEqual({
        50: "#cdccd1",
        100: "#bfbac9",
        200: "#b1a8c0",
        300: "#a496b8",
        400: "#9684af",
        500: "#806f98",
        600: "#776a8a",
        700: "#6e657c",
        800: "#66616f",
        900: "#5d5c61",
        bg: "#d6d6d6",
        fg: "#595959",
      });
    });
  });
  describe("settings.check === 'illuminant'", () => {
    it("should activate settings.K", () => {
      expect(perception({ check: "illuminant", K: 6500 }, create(red))).toEqual(
        {
          50: "#fff4f2",
          100: "#ffe3e0",
          200: "#ffd1ce",
          300: "#fdc0bc",
          400: "#fbadab",
          500: "#e29694",
          600: "#cc918e",
          700: "#b68c88",
          800: "#a08683",
          900: "#89807e",
          bg: "#fffffc",
          fg: "#7d7c7b",
        },
      );
      expect(
        perception({ check: "illuminant", K: 5500 }, create(green)),
      ).toEqual({
        50: "#faf6e6",
        100: "#f0f6d7",
        200: "#e5f7c7",
        300: "#dbf7b7",
        400: "#d1f8a6",
        500: "#b9df8f",
        600: "#acc789",
        700: "#9fb082",
        800: "#92987b",
        900: "#848173",
        bg: "#fff6ef",
        fg: "#7d756e",
      });
      expect(
        perception({ check: "illuminant", K: 4500 }, create(blue)),
      ).toEqual({
        50: "#f6e8de",
        100: "#e4dfdf",
        200: "#d2d5e0",
        300: "#c1cce1",
        400: "#afc3e2",
        500: "#98accb",
        600: "#939eb3",
        700: "#8d909b",
        800: "#878284",
        900: "#81746d",
        bg: "#ffedde",
        fg: "#7d6d5f",
      });
      expect(
        perception({ check: "illuminant", K: 3500 }, create(purple)),
      ).toEqual({
        50: "#f7d6c3",
        100: "#e8c4bb",
        200: "#d9b2b4",
        300: "#cba0ac",
        400: "#bc8fa4",
        500: "#a4798d",
        600: "#9b747f",
        700: "#926f70",
        800: "#8a6a62",
        900: "#816453",
        bg: "#ffe0c7",
        fg: "#7d624b",
      });
    });
  });
  describe("settings.severity", () => {
    it("should be applied to relevant simulations", () => {
      expect(
        perception(
          { check: "vision", as: "protanomaly", severity: 25 },
          create(red),
        ),
      ).toEqual({
        50: "#fbeceb",
        100: "#f4cac7",
        200: "#eba7a3",
        300: "#e08481",
        400: "#d35d5f",
        500: "#a22d35",
        600: "#7f2a2d",
        700: "#5e2525",
        800: "#3f1f1e",
        900: "#211616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "deuteranomaly", severity: 25 },
          create(green),
        ),
      ).toEqual({
        50: "#f7feee",
        100: "#e7fcd0",
        200: "#d8fab0",
        300: "#c9f98c",
        400: "#b9f762",
        500: "#8bc724",
        600: "#6e9b28",
        700: "#517027",
        800: "#374821",
        900: "#1e2318",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "tritanomaly", severity: 25 },
          create(blue),
        ),
      ).toEqual({
        50: "#ebf5fe",
        100: "#c6e3fc",
        200: "#a0cffa",
        300: "#7abcf7",
        400: "#4ea9f5",
        500: "#0f7ac5",
        600: "#1b6198",
        700: "#1d496f",
        800: "#1b3348",
        900: "#161c24",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception(
          { check: "vision", as: "protanomaly", severity: 25 },
          create(purple),
        ),
      ).toEqual({
        50: "#eceaf6",
        100: "#ccc6e4",
        200: "#ada2d2",
        300: "#8f7fc0",
        400: "#715cad",
        500: "#47317e",
        600: "#3b2b64",
        700: "#2e244b",
        800: "#221d34",
        900: "#17151d",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        perception({ check: "contrast", factor: 0, severity: 75 }, create(red)),
      ).toEqual({
        50: "#221e1e",
        100: "#211818",
        200: "#211111",
        300: "#1f0b0b",
        400: "#1d0506",
        500: "#140102",
        600: "#0d0101",
        700: "#070101",
        800: "#030101",
        900: "#010000",
        bg: "#222222",
        fg: "#000000",
      });
      expect(
        perception(
          { check: "contrast", factor: 50, severity: 75 },
          create(green),
        ),
      ).toEqual({
        50: "#858784",
        100: "#80887d",
        200: "#7c8876",
        300: "#77886f",
        400: "#728868",
        500: "#687e5e",
        600: "#62735a",
        700: "#5c6857",
        800: "#565d53",
        900: "#50524f",
        bg: "#878787",
        fg: "#4d4d4d",
      });
      expect(
        perception(
          { check: "contrast", factor: 100, severity: 75 },
          create(blue),
        ),
      ).toEqual({
        50: "#fafdff",
        100: "#f1f8ff",
        200: "#e8f3ff",
        300: "#dfeeff",
        400: "#d6eaff",
        500: "#caddf5",
        600: "#c7d6e8",
        700: "#c4cfdc",
        800: "#c1c7cf",
        900: "#bec0c3",
        bg: "#ffffff",
        fg: "#bcbcbc",
      });
      expect(
        perception(
          { check: "illuminant", K: 1850, severity: 75 },
          create(purple),
        ),
      ).toEqual({
        50: "#fe9e62",
        100: "#f6955f",
        200: "#ee8d5d",
        300: "#e6845b",
        400: "#dd7b59",
        500: "#d1704e",
        600: "#cc6d45",
        700: "#c86a3b",
        800: "#c36831",
        900: "#bf6524",
        bg: "#ffa363",
        fg: "#bc631b",
      });
    });
  });
});

run();
