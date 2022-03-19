// [[file:../../../Notebook.org::*contrast Tests][contrast Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { contrast, create } from "../color.js";

describe("contrast(settings, palette)", () => {
  it("should reject invalid colors", () => {
    expect(() => contrast({}, create({}, "invalid"))).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("settings.mode = 'standard'", () => {
    it("should work with default settings", () => {
      expect(contrast({}, create({}, red))).toEqual([
        ["#ffffff", "#111111"],
        [["#aa2033", "#7a2229", "#4d1e20", "#231616"], []],
        [],
      ]);
      expect(
        contrast({}, create({ type: "artistic" }, green)),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#3c6625", "#1c2418"]], []]);
      expect(contrast({}, create({}, blue))).toEqual([
        ["#ffffff", "#111111"],
        [["#2371c3", "#22538a", "#1d3755", "#161c25"], []],
        [],
      ]);
    });

    it("should activate settings.rating", () => {
      expect(
        contrast(
          { rating: "AAA" },
          create(
            { type: "artistic", tints: 15, tones: 8, shades: 15 },
            red,
          ),
        ),
      ).toEqual([
        ["#ffffff", "#111111"],
        [
          [],
          [],
          [
            "#a72032",
            "#9a2130",
            "#8d222d",
            "#81222b",
            "#742128",
            "#682125",
            "#5c2023",
            "#501e20",
            "#451d1e",
            "#391b1b",
            "#2e1818",
            "#231616",
          ],
        ],
        [],
      ]);
      expect(
        contrast({ rating: "AA" }, create({}, green)),
      ).toEqual([["#ffffff", "#111111"], [["#345422", "#1c2418"], []], []]);
      expect(
        contrast(
          { rating: "AAA" },
          create(
            { type: "artistic", tints: 16, tones: 8, shades: 8 },
            blue,
          ),
        ),
      ).toEqual([
        ["#ffffff", "#111111"],
        [[], [], ["#22538a", "#20456f", "#1d3755", "#1a2a3c", "#161c25"]],
        [],
      ]);
    });
    it("should activate settings.large", () => {
      expect(
        contrast(
          { large: true },
          create({ contrast: 90 }, red),
        ),
      ).toEqual([
        ["#ffebeb", "#231616"],
        [["#e54956", "#af1f34", "#84222b", "#5b1f23", "#34191a"], []],
        [],
      ]);
      expect(
        contrast(
          { large: true },
          create({ type: "artistic", contrast: 85 }, green),
        ),
      ).toEqual([["#eeffe6", "#212f1a"], [[], [], ["#467b26", "#2a411f"]], []]);
      expect(
        contrast(
          { large: true },
          create({ contrast: 80 }, blue),
        ),
      ).toEqual([
        ["#d7eaff", "#192839"],
        [["#2277cf", "#235fa0", "#214874", "#1c324b"], []],
        [],
      ]);
    });
  });
  describe("settings.mode = 'custom'", () => {
    it("should activate settings.min", () => {
      expect(
        contrast({ mode: "custom", min: 50 }, create({}, red)),
      ).toEqual([
        ["#ffffff", "#111111"],
        [["#aa2033", "#7a2229", "#4d1e20", "#231616"], []],
        [],
      ]);
      expect(
        contrast(
          { mode: "custom", min: 64 },
          create({ type: "artistic" }, green),
        ),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#1c2418"]], []]);
      expect(
        contrast({ mode: "custom", min: 80 }, create({}, blue)),
      ).toEqual([["#ffffff", "#111111"], [[], []], []]);
    });
    it("should activate settings.max", () => {
      expect(
        contrast(
          { mode: "custom", min: 50, max: 70 },
          create({}, red),
        ),
      ).toEqual([
        ["#ffffff", "#111111"],
        [["#aa2033", "#7a2229", "#4d1e20"], []],
        [],
      ]);
      expect(
        contrast(
          { mode: "custom", min: 50, max: 75 },
          create({ type: "artistic" }, green),
        ),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#3c6625"]], []]);
      expect(
        contrast(
          { mode: "custom", min: 50, max: 80 },
          create({}, blue),
        ),
      ).toEqual([
        ["#ffffff", "#111111"],
        [["#22538a", "#1d3755", "#161c25"], []],
        [],
      ]);
    });
  });
  it("settings.dark active for both modes", () => {
    expect(contrast({ dark: true }, create({}, red))).toEqual([
      ["#111111", "#ffffff"],
      [["#ffebeb", "#ffcecc", "#fbb0af", "#f69292", "#ef7175", "#e64d59"], []],
      [],
    ]);
    expect(
      contrast(
        { mode: "custom", min: 64, dark: true },
        create({ type: "artistic" }, green),
      ),
    ).toEqual([
      ["#111111", "#ffffff"],
      [["#abff7e", "#d1ffba", "#f4ffee"], ["#91e664"], []],
      [],
    ]);
    expect(contrast({ dark: true }, create({}, blue))).toEqual([
      ["#111111", "#ffffff"],
      [["#ebf5ff", "#cde5ff", "#aed5ff", "#90c4ff", "#70b4ff", "#4da2ff"], []],
      [],
    ]);
  });
});

run();
// contrast Tests:1 ends here
