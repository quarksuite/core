import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { ms, tokens } from "../../content.js";

describe("tokens(settings, ms)", () => {
  const $ms = ms({}, 1);

  it("works with default settings", () => {
    expect(tokens({}, $ms)).toEqual({
      base: 1,
      x2: 1.5,
      x3: 2.25,
      x4: 3.375,
      x5: 5.0625,
      x6: 7.5938,
      d2: 0.66667,
      d3: 0.44444,
      d4: 0.2963,
      d5: 0.19753,
      d6: 0.13169,
    });
  });

  describe("settings.type = 'bidirectional'", () => {
    it("should activate unit setting", () => {
      expect(tokens({ unit: "rem" }, $ms)).toEqual({
        base: "1rem",
        x2: "1.5rem",
        x3: "2.25rem",
        x4: "3.375rem",
        x5: "5.0625rem",
        x6: "7.5938rem",
        d2: "0.66667rem",
        d3: "0.44444rem",
        d4: "0.2963rem",
        d5: "0.19753rem",
        d6: "0.13169rem",
      });
      expect(tokens({ unit: "ex" }, $ms)).toEqual({
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
      });
    });

    it("should activate inversion setting", () => {
      expect(tokens({ unit: "rem", inversion: "em" }, $ms)).toEqual({
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
      });
    });
  });

  describe("settings.type = 'unidirectional'", () => {
    it("should activate unit setting", () => {
      expect(tokens({ type: "unidirectional", unit: "rem" }, $ms)).toEqual({
        base: "1rem",
        x2: "1.5rem",
        x3: "2.25rem",
        x4: "3.375rem",
        x5: "5.0625rem",
        x6: "7.5938rem",
      });
      expect(tokens({ type: "unidirectional", unit: "ex" }, $ms)).toEqual({
        base: "1ex",
        x2: "1.5ex",
        x3: "2.25ex",
        x4: "3.375ex",
        x5: "5.0625ex",
        x6: "7.5938ex",
      });
    });
  });

  describe("settings.type = 'ranged'", () => {
    it("should activate unit setting", () => {
      expect(tokens({ type: "ranged", unit: "rem" }, $ms)).toEqual({
        base: "1rem",
        i2: "2.1852rem",
        i3: "2.7778rem",
        i4: "3.6667rem",
        i5: "5rem",
        i6: "7rem",
        max: "10rem",
      });
    });

    it("should activate min/max settings", () => {
      expect(
        tokens({ type: "ranged", min: 25, max: 100, unit: "vmin" }, $ms)
      ).toEqual({
        base: "25vmin",
        i2: "34.877vmin",
        i3: "39.815vmin",
        i4: "47.222vmin",
        i5: "58.333vmin",
        i6: "75vmin",
        max: "100vmin",
      });
      expect(
        tokens({ type: "ranged", min: 16, max: 72, unit: "px" }, $ms)
      ).toEqual({
        base: "16px",
        i2: "23.374px",
        i3: "27.062px",
        i4: "32.593px",
        i5: "40.889px",
        i6: "53.333px",
        max: "72px",
      });
    });

    it("should activate trunc setting", () => {
      expect(
        tokens(
          { type: "ranged", min: 45, max: 75, unit: "ch", trunc: true },
          $ms
        )
      ).toEqual({
        base: "45ch",
        i2: "48ch",
        i3: "50ch",
        i4: "53ch",
        i5: "58ch",
        i6: "65ch",
        max: "75ch",
      });
      expect(
        tokens(
          { type: "ranged", min: 5, max: 100, unit: "vh", trunc: true },
          $ms
        )
      ).toEqual({
        base: "5vh",
        i2: "17vh",
        i3: "23vh",
        i4: "33vh",
        i5: "47vh",
        i6: "68vh",
        max: "100vh",
      });
    });

    it("should activate context setting", () => {
      expect(
        tokens(
          { type: "ranged", min: 5, max: 100, unit: "vw", context: "max" },
          $ms
        )
      ).toEqual({
        base: "100vw",
        i2: "68.333vw",
        i3: "47.222vw",
        i4: "33.148vw",
        i5: "23.765vw",
        i6: "17.51vw",
        min: "5vw",
      });
    });
  });

  describe("settings.type = 'grid'", () => {
    it("should generate grid tokens from input scale when active", () => {
      expect(tokens({ type: "grid" }, $ms)).toEqual({
        columns: 6,
        rows: 4,
        col: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          "-1": -1,
          "-2": -2,
          "-3": -3,
          "-4": -4,
          "-5": -5,
          "-6": -6,
        },
        row: { 1: 1, 2: 2, 3: 3, 4: 4, "-1": -1, "-2": -2, "-3": -3, "-4": -4 },
      });
    });
  });
});

run();
