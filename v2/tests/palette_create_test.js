// palette_create Tests

// [[file:../../Notebook.org::*palette_create Tests][palette_create Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette_create } from "../color.js";

const samples = ["crimson", "chartreuse", "dodgerblue"];

describe("palette_create(settings, color)", () => {
  const [red, green, blue] = samples;

  it("should reject invalid colors", () => {
    expect(() => palette_create({}, "invalid")).toThrow();
  });

  describe("settings.type = 'material'", () => {
    it("should activate settings.light", () => {
      expect(palette_create({ light: 75 }, red)).toEqual([
        ["#ffcecc", "#111111"],
        [
          [
            "#fcb8b6",
            "#f9a2a2",
            "#f58c8d",
            "#f07679",
            "#ea5d65",
            "#e44151",
            "#b51f35",
            "#8f222d",
            "#6b2126",
            "#491d1e",
          ],
        ],
      ]);
    });
    it("should activate settings.dark", () => {
      expect(palette_create({ dark: 90 }, green)).toEqual([
        ["#ffffff", "#1c2418"],
        [
          [
            "#eeffe6",
            "#ddffcd",
            "#cdffb4",
            "#bbff99",
            "#a8ff7a",
            "#95ff55",
            "#6dd41d",
            "#5bab25",
            "#4a8427",
            "#385f24",
          ],
        ],
      ]);
    });
    it("should activate settings.accented", () => {
      expect(palette_create({ accented: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#e1efff",
            "#c4e0ff",
            "#a8d1ff",
            "#8bc2ff",
            "#6cb2ff",
            "#4ba1ff",
            "#2278d0",
            "#2360a3",
            "#214a78",
            "#1d344f",
          ],
          ["#b7e6ff", "#309ad4", "#00eeff", "#2500ee"],
        ],
      ]);
    });
  });

  describe("settings.type = 'artistic'", () => {
    describe("settings.tints", () => {
      it("should activate with defaults once defined", () => {
        expect(palette_create({ type: "artistic", tints: {} }, red)).toEqual([
          "#dc143c",
          [["#f1797c", "#fdbdbc", "#ffffff"]],
        ]);
      });
      it("should allow setting the count", () => {
        expect(
          palette_create({ type: "artistic", tints: { count: 6 } }, green)
        ).toEqual([
          "#7fff00",
          [["#98ff5c", "#afff86", "#c4ffa7", "#d9ffc6", "#ecffe3", "#ffffff"]],
        ]);
      });
      it("should allow setting the overall contrast", () => {
        expect(
          palette_create({ type: "artistic", tints: { contrast: 90 } }, blue)
        ).toEqual(["#1e90ff", [["#70b4ff", "#aed5ff", "#ebf5ff"]]]);
      });
    });
    describe("settings.tones", () => {
      it("should activate with defaults once defined", () => {
        expect(palette_create({ type: "artistic", tones: {} }, red)).toEqual([
          "#dc143c",
          [["#d25e62", "#c38786", "#aaaaaa"]],
        ]);
      });
      it("should allow setting the count", () => {
        expect(
          palette_create({ type: "artistic", tones: { count: 6 } }, green)
        ).toEqual([
          "#7fff00",
          [["#8af14b", "#93e469", "#9bd67e", "#a1c88f", "#a6b99d", "#aaaaaa"]],
        ]);
      });
      it("should allow setting the overall contrast", () => {
        expect(
          palette_create({ type: "artistic", tones: { contrast: 90 } }, blue)
        ).toEqual(["#1e90ff", [["#589be7", "#7ea3ce", "#9fa8b4"]]]);
      });
    });
    describe("settings.shades", () => {
      it("should activate with defaults once defined", () => {
        expect(palette_create({ type: "artistic", shades: {} }, red)).toEqual([
          "#dc143c",
          [["#93222e", "#4f1e20", "#111111"]],
        ]);
      });
      it("should allow setting the count", () => {
        expect(
          palette_create({ type: "artistic", shades: { count: 6 } }, green)
        ).toEqual([
          "#7fff00",
          [["#6cd21e", "#59a726", "#477d26", "#355623", "#23321b", "#111111"]],
        ]);
      });
      it("should allow setting the overall contrast", () => {
        expect(
          palette_create({ type: "artistic", shades: { contrast: 90 } }, blue)
        ).toEqual(["#1e90ff", [["#2367af", "#1f4066", "#161c25"]]]);
      });
    });
  });

  describe("settings.stated", () => {
    it("should be active with either type", () => {
      expect(palette_create({ type: "artistic", stated: true }, red)).toEqual([
        "#dc143c",
        ["#707d2a", "#de8a2d", "#bc2029"],
      ]);
      expect(palette_create({ type: "artistic", stated: true }, green)).toEqual(
        ["#7fff00", ["#3ba721", "#cdbd1d", "#b86724"]]
      );
      expect(palette_create({ type: "artistic", stated: true }, blue)).toEqual([
        "#1e90ff",
        ["#109069", "#b5a678", "#a15061"],
      ]);
    });
  });
});

run();
// palette_create Tests:1 ends here
