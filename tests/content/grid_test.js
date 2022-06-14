import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { grid } from "../../content.js";

describe("grid(settings, columns)", () => {
  const columns = 5;

  it("works with default settings", () => {
    expect(grid({}, columns)).toEqual({
      columns: 5,
      rows: 5,
      col: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        "-1": -1,
        "-2": -2,
        "-3": -3,
        "-4": -4,
        "-5": -5,
        fr: {
          base: "1fr",
          x2: "1.5fr",
          x3: "2.25fr",
          x4: "3.375fr",
          x5: "5.0625fr",
          d2: "0.66667fr",
          d3: "0.44444fr",
          d4: "0.2963fr",
          d5: "0.19753fr",
        },
      },
      row: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        "-1": -1,
        "-2": -2,
        "-3": -3,
        "-4": -4,
        "-5": -5,
        fr: {
          base: "1fr",
          x2: "1.5fr",
          x3: "2.25fr",
          x4: "3.375fr",
          x5: "5.0625fr",
          d2: "0.66667fr",
          d3: "0.44444fr",
          d4: "0.2963fr",
          d5: "0.19753fr",
        },
      },
    });
  });

  describe("settings", () => {
    it("settings.rows explicitly sets grids rows", () => {
      expect(grid({ rows: 3 }, columns)).toEqual({
        columns: 5,
        rows: 3,
        col: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          "-1": -1,
          "-2": -2,
          "-3": -3,
          "-4": -4,
          "-5": -5,
          fr: {
            base: "1fr",
            x2: "1.5fr",
            x3: "2.25fr",
            x4: "3.375fr",
            x5: "5.0625fr",
            d2: "0.66667fr",
            d3: "0.44444fr",
            d4: "0.2963fr",
            d5: "0.19753fr",
          },
        },
        row: {
          1: 1,
          2: 2,
          3: 3,
          "-1": -1,
          "-2": -2,
          "-3": -3,
          fr: {
            base: "1fr",
            x2: "1.5fr",
            x3: "2.25fr",
            d2: "0.66667fr",
            d3: "0.44444fr",
          },
        },
      });
    });
    it("settings.ratio sets the grid fraction ratio", () => {
      expect(grid({ ratio: 2 }, columns)).toEqual({
        columns: 5,
        rows: 5,
        col: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          "-1": -1,
          "-2": -2,
          "-3": -3,
          "-4": -4,
          "-5": -5,
          fr: {
            base: "1fr",
            x2: "2fr",
            x3: "4fr",
            x4: "8fr",
            x5: "16fr",
            d2: "0.5fr",
            d3: "0.25fr",
            d4: "0.125fr",
            d5: "0.0625fr",
          },
        },
        row: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          "-1": -1,
          "-2": -2,
          "-3": -3,
          "-4": -4,
          "-5": -5,
          fr: {
            base: "1fr",
            x2: "2fr",
            x3: "4fr",
            x4: "8fr",
            x5: "16fr",
            d2: "0.5fr",
            d3: "0.25fr",
            d4: "0.125fr",
            d5: "0.0625fr",
          },
        },
      });
    });
  });
});

run();
