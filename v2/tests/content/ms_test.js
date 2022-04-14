// [[file:../../../Notebook.org::*ms Tests][ms Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { ms } from "../../content.js";

describe("ms(settings, base)", () => {
  it("works with default settings", () =>
    expect(ms({}, 1)).toEqual([1, 1.5, 2.25, 3.375, 5.0625, 7.59375]));

  describe("settings.ratio", () => {
    it("should allow custom ratios", () => {
      expect(ms({ ratio: 1.25 }, 1)).toEqual([
        1, 1.25, 1.5625, 1.953125, 2.44140625, 3.0517578125,
      ]);
      expect(ms({ ratio: 1.75 }, 1)).toEqual([
        1, 1.75, 3.0625, 5.359375, 9.37890625, 16.4130859375,
      ]);
      expect(ms({ ratio: 2 }, 1)).toEqual([1, 2, 4, 8, 16, 32]);
    });
    it("should handle ratios <1", () => {
      expect(ms({ ratio: 0.75 }, 1)).toEqual([
        1, 0.75, 0.5625, 0.421875, 0.31640625, 0.2373046875,
      ]);
      expect(ms({ ratio: 0.5 }, 1)).toEqual([
        1, 0.5, 0.25, 0.125, 0.0625, 0.03125,
      ]);
      expect(ms({ ratio: 0.25 }, 1)).toEqual([
        1, 0.25, 0.0625, 0.015625, 0.00390625, 0.0009765625,
      ]);
    });
  });

  describe("settings.values", () => {
    it("should allow custom output limits", () => {
      expect(ms({ values: 1 }, 1)).toEqual([1]);
      expect(ms({ values: 2 }, 1)).toEqual([1, 1.5]);
      expect(ms({ values: 4 }, 1)).toEqual([1, 1.5, 2.25, 3.375]);
      expect(ms({ values: 8 }, 1)).toEqual([
        1, 1.5, 2.25, 3.375, 5.0625, 7.59375, 11.390625, 17.0859375,
      ]);
    });
  });

  it("should allow a custom base", () => {
    expect(ms({}, 2)).toEqual([2, 3, 4.5, 6.75, 10.125, 15.1875]);
    expect(ms({}, 8)).toEqual([8, 12, 18, 27, 40.5, 60.75]);
    expect(ms({}, 10)).toEqual([10, 15, 22.5, 33.75, 50.625, 75.9375]);
    expect(ms({}, 16)).toEqual([16, 24, 36, 54, 81, 121.5]);
  });
});

run();
// ms Tests:1 ends here
