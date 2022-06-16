import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { scale } from "../../content.js";

describe("scale(settings, root)", () => {
  it("works with default settings", () => {
    expect(scale({}, "1rem")).toEqual({
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
  });

  it("can use a unitless root", () => {
    expect(scale({}, 1)).toEqual({
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

  describe("settings.configuration = 'unidirectional'", () => {
    it("should correctly build samples", () => {
      expect(scale({ configuration: "unidirectional" }, "1rem")).toEqual({
        base: "1rem",
        x2: "1.5rem",
        x3: "2.25rem",
        x4: "3.375rem",
        x5: "5.0625rem",
        x6: "7.5938rem",
      });
      expect(scale({ configuration: "unidirectional" }, "1ex")).toEqual({
        base: "1ex",
        x2: "1.5ex",
        x3: "2.25ex",
        x4: "3.375ex",
        x5: "5.0625ex",
        x6: "7.5938ex",
      });
    });
  });

  describe("settings.configuration = 'ranged'", () => {
    it("should activate floor setting", () => {
      expect(
        scale({ configuration: "ranged", floor: "25vmin" }, "100vmin"),
      ).toEqual({
        base: "100vmin",
        i2: "75vmin",
        i3: "58.333vmin",
        i4: "47.222vmin",
        i5: "39.815vmin",
        i6: "34.876vmin",
        min: "25vmin",
      });
    });

    it("should activate trunc setting", () => {
      expect(
        scale({ configuration: "ranged", floor: "45ch", trunc: true }, "75ch"),
      ).toEqual({
        base: "75ch",
        i2: "65ch",
        i3: "58ch",
        i4: "53ch",
        i5: "50ch",
        i6: "48ch",
        min: "45ch",
      });
    });

    it("should activate reverse setting", () => {
      expect(
        scale(
          { configuration: "ranged", floor: "16px", reverse: true },
          "72px",
        ),
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
  });

  describe("settings.ratio", () => {
    it("allows setting scale ratio", () => {
      expect(
        scale({ configuration: "bidirectional", ratio: 1.25 }, "1ex"),
      ).toEqual({
        base: "1ex",
        x2: "1.25ex",
        x3: "1.5625ex",
        x4: "1.9531ex",
        x5: "2.4414ex",
        x6: "3.0518ex",
        d2: "0.8ex",
        d3: "0.64ex",
        d4: "0.51201ex",
        d5: "0.4096ex",
        d6: "0.32768ex",
      });
    });
    it("allows multithreading", () => {
      expect(
        scale(
          {
            configuration: "ranged",
            floor: "12pt",
            reverse: true,
            ratio: [1.25, 1.5],
          },
          "60pt",
        ),
      ).toEqual({
        base: "12pt",
        i2: "33.333pt",
        i3: "36.576pt",
        i4: "42.72pt",
        i5: "44pt",
        i6: "50.4pt",
        max: "60pt",
      });
    });
  });

  describe("settings.values", () => {
    it("allows setting the number of scale values", () => {
      expect(
        scale({ configuration: "bidirectional", values: 4 }, "1rem"),
      ).toEqual({
        base: "1rem",
        x2: "1.5rem",
        x3: "2.25rem",
        x4: "3.375rem",
        d2: "0.66667rem",
        d3: "0.44444rem",
        d4: "0.2963rem",
      });
    });
  });
});

run();
