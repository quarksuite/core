import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { a11y, palette } from "../../color.js";

describe("a11y(settings, palette)", () => {
  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  const create = (color, config = {}) => palette({ ...config }, color);

  describe("settings.mode === 'standard'", () => {
    it("should activate settings.rating", () => {
      expect(a11y({ mode: "standard", rating: "AA" }, create(red))).toEqual({
        50: "#b41f35",
        100: "#8d222d",
        200: "#682125",
        300: "#451d1e",
        400: "#231616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AA" }, create(green))).toEqual({
        50: "#427426",
        100: "#2f4a21",
        200: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AA" }, create(blue))).toEqual({
        50: "#2277cf",
        100: "#235fa0",
        200: "#214874",
        300: "#1c324b",
        400: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AA" }, create(purple))).toEqual({
        50: "#7f59ad",
        100: "#552e7e",
        200: "#452964",
        300: "#35234b",
        400: "#261c34",
        500: "#18151d",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AAA" }, create(red))).toEqual({
        50: "#8d222d",
        100: "#682125",
        200: "#451d1e",
        300: "#231616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AAA" }, create(green))).toEqual({
        50: "#2f4a21",
        100: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AAA" }, create(blue))).toEqual({
        50: "#214874",
        100: "#1c324b",
        200: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "standard", rating: "AAA" }, create(purple))).toEqual(
        {
          50: "#552e7e",
          100: "#452964",
          200: "#35234b",
          300: "#261c34",
          400: "#18151d",
          bg: "#ffffff",
          fg: "#111111",
        },
      );
    });
    it("should activate settings.large", () => {
      expect(
        a11y({ mode: "standard", rating: "AA", large: true }, create(red)),
      ).toEqual({
        50: "#e8555f",
        100: "#b41f35",
        200: "#8d222d",
        300: "#682125",
        400: "#451d1e",
        500: "#231616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        a11y({ mode: "standard", rating: "AA", large: true }, create(green)),
      ).toEqual({
        50: "#56a026",
        100: "#427426",
        200: "#2f4a21",
        300: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        a11y({ mode: "standard", rating: "AA", large: true }, create(blue)),
      ).toEqual({
        50: "#2277cf",
        100: "#235fa0",
        200: "#214874",
        300: "#1c324b",
        400: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        a11y({ mode: "standard", rating: "AA", large: true }, create(purple)),
      ).toEqual({
        50: "#9a7dc0",
        100: "#7f59ad",
        200: "#552e7e",
        300: "#452964",
        400: "#35234b",
        500: "#261c34",
        600: "#18151d",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
  });

  describe("settings.mode === 'custom'", () => {
    it("should activate settings.min", () => {
      expect(a11y({ mode: "custom", min: 50 }, create(red))).toEqual({
        50: "#8d222d",
        100: "#682125",
        200: "#451d1e",
        300: "#231616",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "custom", min: 50 }, create(green))).toEqual({
        50: "#2f4a21",
        100: "#1c2418",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "custom", min: 50 }, create(blue))).toEqual({
        50: "#235fa0",
        100: "#214874",
        200: "#1c324b",
        300: "#161c25",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "custom", min: 50 }, create(purple))).toEqual({
        50: "#552e7e",
        100: "#452964",
        200: "#35234b",
        300: "#261c34",
        400: "#18151d",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
    it("should activate settings.max", () => {
      expect(a11y({ mode: "custom", min: 50, max: 60 }, create(red))).toEqual({
        50: "#8d222d",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(a11y({ mode: "custom", min: 50, max: 65 }, create(green))).toEqual(
        {
          50: "#2f4a21",
          bg: "#ffffff",
          fg: "#111111",
        },
      );
      expect(a11y({ mode: "custom", min: 50, max: 70 }, create(blue))).toEqual({
        50: "#235fa0",
        100: "#214874",
        200: "#1c324b",
        bg: "#ffffff",
        fg: "#111111",
      });
      expect(
        a11y({ mode: "custom", min: 50, max: 75 }, create(purple)),
      ).toEqual({
        50: "#552e7e",
        100: "#452964",
        200: "#35234b",
        300: "#261c34",
        bg: "#ffffff",
        fg: "#111111",
      });
    });
  });

  it("correctly filters accents", () => {
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(red, { accents: true })),
    ).toEqual({
      50: "#b41f35",
      100: "#8d222d",
      200: "#682125",
      300: "#451d1e",
      400: "#231616",
      bg: "#ffffff",
      fg: "#111111",
      a50: "#c80000",
      a100: "#a50400",
      a200: "#762b00",
      a300: "#363900",
      a400: "#003900",
    });
    expect(
      a11y(
        { mode: "standard", rating: "AA" },
        create(green, { accents: true }),
      ),
    ).toEqual({
      50: "#427426",
      100: "#2f4a21",
      200: "#1c2418",
      bg: "#ffffff",
      fg: "#111111",
      a50: "#0059ff",
    });
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(blue, { accents: true })),
    ).toEqual({
      50: "#2277cf",
      100: "#235fa0",
      200: "#214874",
      300: "#1c324b",
      400: "#161c25",
      bg: "#ffffff",
      fg: "#111111",
      a50: "#843ad3",
      a100: "#95009f",
      a200: "#9a005d",
      a300: "#940007",
    });
    expect(
      a11y(
        { mode: "standard", rating: "AA" },
        create(purple, { accents: true }),
      ),
    ).toEqual({
      50: "#7f59ad",
      100: "#552e7e",
      200: "#452964",
      300: "#35234b",
      400: "#261c34",
      500: "#18151d",
      bg: "#ffffff",
      fg: "#111111",
      a50: "#3c76c0",
      a100: "#5556b4",
      a200: "#6e0070",
      a300: "#6d003d",
      a400: "#650000",
      a500: "#530000",
      a600: "#370000",
    });
  });
  expect(
    a11y({ mode: "custom", min: 70 }, create(red, { accents: true })),
  ).toEqual({
    50: "#451d1e",
    100: "#231616",
    bg: "#ffffff",
    fg: "#111111",
    a50: "#003900",
  });
  expect(
    a11y({ mode: "custom", min: 70 }, create(green, { accents: true })),
  ).toEqual({
    50: "#1c2418",
    bg: "#ffffff",
    fg: "#111111",
  });
  expect(
    a11y({ mode: "custom", min: 70 }, create(blue, { accents: true })),
  ).toEqual({
    50: "#161c25",
    bg: "#ffffff",
    fg: "#111111",
  });
  expect(
    a11y({ mode: "custom", min: 70 }, create(purple, { accents: true })),
  ).toEqual({
    50: "#35234b",
    100: "#261c34",
    200: "#18151d",
    bg: "#ffffff",
    fg: "#111111",
    a50: "#530000",
    a100: "#370000",
  });

  it("correctly filters dark mode palettes", () => {
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(red, { dark: true })),
    ).toEqual({
      50: "#e8555f",
      100: "#f27f81",
      200: "#faa4a3",
      300: "#fec8c7",
      400: "#ffebeb",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(green, { dark: true })),
    ).toEqual({
      50: "#56a026",
      100: "#6ace1f",
      200: "#9aff60",
      300: "#b3ff8b",
      400: "#c9ffaf",
      500: "#dfffd0",
      600: "#f4ffee",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(blue, { dark: true })),
    ).toEqual({
      50: "#55a6ff",
      100: "#7dbaff",
      200: "#a2ceff",
      300: "#c7e2ff",
      400: "#ebf5ff",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "standard", rating: "AA" }, create(purple, { dark: true })),
    ).toEqual({
      50: "#9a7dc0",
      100: "#b5a1d2",
      200: "#d1c5e4",
      300: "#eeeaf6",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "custom", min: 70 }, create(red, { dark: true })),
    ).toEqual({
      50: "#fec8c7",
      100: "#ffebeb",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "custom", min: 70 }, create(green, { dark: true })),
    ).toEqual({
      50: "#9aff60",
      100: "#b3ff8b",
      200: "#c9ffaf",
      300: "#dfffd0",
      400: "#f4ffee",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "custom", min: 70 }, create(blue, { dark: true })),
    ).toEqual({
      50: "#c7e2ff",
      100: "#ebf5ff",
      bg: "#111111",
      fg: "#ffffff",
    });
    expect(
      a11y({ mode: "custom", min: 70 }, create(purple, { dark: true })),
    ).toEqual({
      50: "#eeeaf6",
      bg: "#111111",
      fg: "#ffffff",
    });
  });
});

run();
