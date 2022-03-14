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
            "#fbb0af",
            "#f89c9b",
            "#f48788",
            "#ef7175",
            "#ea5a62",
            "#e33f4f",
            "#ad2033",
            "#7f222a",
            "#551f21",
            "#2c1818",
          ],
          [],
        ],
        [],
      ]);
    });
    it("should activate settings.dark", () => {
      expect(palette_create({ dark: 90 }, green)).toEqual([
        ["#ffffff", "#1c2418"],
        [
          [
            "#e8ffdd",
            "#d9ffc6",
            "#c8ffae",
            "#b8ff94",
            "#a6ff76",
            "#93ff52",
            "#69cb20",
            "#549a26",
            "#3f6c25",
            "#2a411f",
          ],
          [],
        ],
        [],
      ]);
    });
    it("should activate settings.accented", () => {
      expect(palette_create({ accented: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#d7eaff",
            "#bcdcff",
            "#a1ceff",
            "#85bfff",
            "#69b0ff",
            "#49a0ff",
            "#2373c6",
            "#225790",
            "#1e3c5d",
            "#18222f",
          ],
          ["#b7e6ff", "#309ad4", "#00eeff", "#2500ee"],
        ],
        [],
      ]);
    });
  });

  describe("settings.type = 'artistic'", () => {
    it("should activate settings.contrast", () => {
      expect(palette_create({ type: "artistic", contrast: 90 }, red)).toEqual([
        ["#ffebeb", "#231616"],
        [
          ["#ee6e72", "#fbaaa9", "#ffe2e2"],
          ["#d5545b", "#ca7878", "#b99695"],
          ["#a72032", "#742128", "#451d1e"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", contrast: 80 }, green)).toEqual(
        [
          ["#e8ffdd", "#26391d"],
          [
            ["#a4ff73", "#c5ffa9", "#e4ffd6"],
            ["#8eeb5a", "#9ad77c", "#a2c394"],
            ["#67c621", "#4f8f27", "#375c23"],
          ],
          [],
        ],
      );
      expect(palette_create({ type: "artistic", contrast: 70 }, blue)).toEqual([
        ["#c3e0ff", "#1d344f"],
        [
          ["#5fabff", "#8ec4ff", "#bcdcff"],
          ["#4a98ee", "#689edd", "#81a3cc"],
          ["#2276cd", "#235d9d", "#20456f"],
        ],
        [],
      ]);
    });
    it("should activate settings.tints", () => {
      expect(palette_create({ type: "artistic", tints: 6 }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#e74f5a", "#f07578", "#f79797", "#fcb7b5", "#ffd6d5", "#fff5f5"],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#a12131", "#692126", "#361a1a"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", tints: 0 }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          [],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#a12131", "#692126", "#361a1a"],
        ],
        [],
      ]);
    });
    it("should activate settings.tones", () => {
      expect(palette_create({ type: "artistic", tones: 6 }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#adff82", "#d5ffc0", "#f9fff7"],
          ["#89f348", "#91e664", "#98da78", "#9ecd88", "#a3c096", "#a8b3a3"],
          ["#60b824", "#437526", "#26391d"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", tones: 0 }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#adff82", "#d5ffc0", "#f9fff7"],
          [],
          ["#60b824", "#437526", "#26391d"],
        ],
        [],
      ]);
    });
    it("should activate settings.shades", () => {
      expect(palette_create({ type: "artistic", shades: 6 }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#74b6ff", "#b5d8ff", "#f5faff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#227edb", "#236bb8", "#225a96", "#214976", "#1e3857", "#192839"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", shades: 0 }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#74b6ff", "#b5d8ff", "#f5faff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          [],
        ],
        [],
      ]);
    });
  });

  describe("settings.stated", () => {
    it("should be active with either type", () => {
      expect(palette_create({ type: "artistic", stated: true }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#f07578", "#fcb7b5", "#fff5f5"],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#a12131", "#692126", "#361a1a"],
        ],
        ["#e4b4b3", "#707d2a", "#de8a2d", "#bc2029"],
      ]);
      expect(palette_create({ type: "artistic", stated: true }, green)).toEqual(
        [
          ["#ffffff", "#111111"],
          [
            ["#adff82", "#d5ffc0", "#f9fff7"],
            ["#91e664", "#9ecd88", "#a8b3a3"],
            ["#60b824", "#437526", "#26391d"],
          ],
          ["#c9e7bb", "#3ba721", "#cdbd1d", "#b86724"],
        ],
      );
      expect(palette_create({ type: "artistic", stated: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#74b6ff", "#b5d8ff", "#f5faff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#236bb8", "#214976", "#192839"],
        ],
        ["#b3cbe7", "#109069", "#b5a678", "#a15061"],
      ]);
    });
  });
});

run();
// palette_create Tests:1 ends here
