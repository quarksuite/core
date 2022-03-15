// palette_create Tests

// [[file:../../Notebook.org::*palette_create Tests][palette_create Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette_create } from "../color.js";

describe("palette_create(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => palette_create({}, "invalid")).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("settings.type = 'material'", () => {
    it("should activate settings.accented", () => {
      expect(palette_create({ accented: true }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#ffebeb",
            "#ffcecc",
            "#fbb0af",
            "#f69292",
            "#ef7175",
            "#e64d59",
            "#aa2033",
            "#7a2229",
            "#4d1e20",
            "#231616",
          ],
          ["#fbaabc", "#c0466b", "#ff00a6", "#a40000"],
        ],
        [],
      ]);
      expect(palette_create({ accented: true }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#f4ffee",
            "#e2ffd5",
            "#d1ffba",
            "#beff9e",
            "#abff7e",
            "#96ff57",
            "#65c322",
            "#4c8a27",
            "#345422",
            "#1c2418",
          ],
          ["#f1ff9f", "#c8ee2e", "#ddff00", "#00c100"],
        ],
        [],
      ]);
      expect(palette_create({ accented: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#ebf5ff",
            "#cde5ff",
            "#aed5ff",
            "#90c4ff",
            "#70b4ff",
            "#4da2ff",
            "#2371c3",
            "#22538a",
            "#1d3755",
            "#161c25",
          ],
          ["#b7e6ff", "#309ad4", "#00eeff", "#2500ee"],
        ],
        [],
      ]);
    });
  });

  describe("settings.type = 'artistic'", () => {
    it("should activate settings.tints", () => {
      expect(palette_create({ type: "artistic", tints: 6 }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#e64d59", "#ef7175", "#f69292", "#fbb0af", "#ffcecc", "#ffebeb"],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#9a2130", "#5c2023", "#231616"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", tints: 0 }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          [],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#9a2130", "#5c2023", "#231616"],
        ],
        [],
      ]);
    });
    it("should activate settings.tones", () => {
      expect(palette_create({ type: "artistic", tones: 6 }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#abff7e", "#d1ffba", "#f4ffee"],
          ["#89f348", "#91e664", "#98da78", "#9ecd88", "#a3c096", "#a8b3a3"],
          ["#5daf25", "#3c6625", "#1c2418"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", tones: 0 }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#abff7e", "#d1ffba", "#f4ffee"],
          [],
          ["#5daf25", "#3c6625", "#1c2418"],
        ],
        [],
      ]);
    });
    it("should activate settings.shades", () => {
      expect(palette_create({ type: "artistic", shades: 6 }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#70b4ff", "#aed5ff", "#ebf5ff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#227bd7", "#2367af", "#22538a", "#1f4066", "#1b2e44", "#161c25"],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", shades: 0 }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#70b4ff", "#aed5ff", "#ebf5ff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          [],
        ],
        [],
      ]);
    });
  });

  describe("settings.contrast", () => {
    it("should be active with either type", () => {
      expect(palette_create({ contrast: 90 }, red)).toEqual([
        ["#ffebeb", "#231616"],
        [
          [
            "#ffdad8",
            "#fdbfbe",
            "#faa4a3",
            "#f48889",
            "#ee6b70",
            "#e54956",
            "#af1f34",
            "#84222b",
            "#5b1f23",
            "#34191a",
          ],
          [],
        ],
        [],
      ]);
      expect(palette_create({ type: "artistic", contrast: 80 }, green)).toEqual(
        [
          ["#e8ffdd", "#26391d"],
          [
            ["#a3ff70", "#c2ffa4", "#dfffd0"],
            ["#8eeb5a", "#9ad77c", "#a2c394"],
            ["#63bf23", "#498227", "#2f4a21"],
          ],
          [],
        ],
      );
      expect(palette_create({ contrast: 70 }, blue)).toEqual([
        ["#c3e0ff", "#1d344f"],
        [
          [
            "#b5d8ff",
            "#9fcdff",
            "#8ac1ff",
            "#73b5ff",
            "#5ca9ff",
            "#429dff",
            "#227ad5",
            "#2365ac",
            "#225084",
            "#1f3d5f",
          ],
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
          ["#ef7175", "#fbb0af", "#ffebeb"],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#9a2130", "#5c2023", "#231616"],
        ],
        ["#e0cccc", "#4c8625", "#dc9a26", "#b62125"],
      ]);
      expect(palette_create({ stated: true }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#f4ffee",
            "#e2ffd5",
            "#d1ffba",
            "#beff9e",
            "#abff7e",
            "#96ff57",
            "#65c322",
            "#4c8a27",
            "#345422",
            "#1c2418",
          ],
          [],
        ],
        ["#d4e0cf", "#2c9622", "#d5af1f", "#b54323"],
      ]);
      expect(palette_create({ type: "artistic", stated: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#70b4ff", "#aed5ff", "#ebf5ff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#2367af", "#1f4066", "#161c25"],
        ],
        ["#ccd5e1", "#1b8d44", "#cba650", "#ac393f"],
      ]);
    });
  });
});

run();
// palette_create Tests:1 ends here
