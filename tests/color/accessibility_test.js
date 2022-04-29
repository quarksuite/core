import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { accessibility, palette } from "../../color.js";

describe("accessibility(settings, palette)", () => {
  it("should reject invalid colors", () => {
    expect(() => accessibility({}, palette({}, "invalid"))).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("settings.mode = 'standard'", () => {
    it("should work with default settings", () => {
      expect(accessibility({}, palette({}, red))).toEqual([
        ["#ffffff", "#111111"],
        [["#b41f35", "#8d222d", "#682125", "#451d1e", "#231616"], []],
        [],
      ]);
      expect(
        accessibility({}, palette({ configuration: "artistic" }, green)),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#3c6625", "#1c2418"]], []]);
      expect(accessibility({}, palette({}, blue))).toEqual([
        ["#ffffff", "#111111"],
        [["#2277cf", "#235fa0", "#214874", "#1c324b", "#161c25"], []],
        [],
      ]);
    });

    it("should activate settings.rating", () => {
      expect(
        accessibility(
          { rating: "AAA" },
          palette(
            { configuration: "artistic", tints: 15, tones: 8, shades: 15 },
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
      expect(accessibility({ rating: "AA" }, palette({}, green))).toEqual([
        ["#ffffff", "#111111"],
        [["#427426", "#2f4a21", "#1c2418"], []],
        [],
      ]);
      expect(
        accessibility(
          { rating: "AAA" },
          palette(
            { configuration: "artistic", tints: 16, tones: 8, shades: 8 },
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
        accessibility({ large: true }, palette({ contrast: 90 }, red)),
      ).toEqual([
        ["#ffebeb", "#231616"],
        [
          ["#e64c58", "#bb1e36", "#9c2130", "#7d222a", "#5f2024", "#431c1e"],
          [],
        ],
        [],
      ]);
      expect(
        accessibility(
          { large: true },
          palette({ configuration: "artistic", contrast: 85 }, green),
        ),
      ).toEqual([["#eeffe6", "#212f1a"], [[], [], ["#467b26", "#2a411f"]], []]);
      expect(
        accessibility({ large: true }, palette({ contrast: 80 }, blue)),
      ).toEqual([
        ["#d7eaff", "#192839"],
        [["#2180e0", "#2270c1", "#2261a4", "#215287", "#1f436b"], []],
        [],
      ]);
    });
  });
  describe("settings.mode = 'custom'", () => {
    it("should activate settings.min", () => {
      expect(
        accessibility({ mode: "custom", min: 50 }, palette({}, red)),
      ).toEqual([
        ["#ffffff", "#111111"],
        [["#8d222d", "#682125", "#451d1e", "#231616"], []],
        [],
      ]);
      expect(
        accessibility(
          { mode: "custom", min: 64 },
          palette({ configuration: "artistic" }, green),
        ),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#1c2418"]], []]);
      expect(
        accessibility({ mode: "custom", min: 80 }, palette({}, blue)),
      ).toEqual([["#ffffff", "#111111"], [[], []], []]);
    });
    it("should activate settings.max", () => {
      expect(
        accessibility({ mode: "custom", min: 50, max: 70 }, palette({}, red)),
      ).toEqual([["#ffffff", "#111111"], [["#8d222d", "#682125"], []], []]);
      expect(
        accessibility(
          { mode: "custom", min: 50, max: 75 },
          palette({ configuration: "artistic" }, green),
        ),
      ).toEqual([["#ffffff", "#111111"], [[], [], ["#3c6625"]], []]);
      expect(
        accessibility({ mode: "custom", min: 50, max: 80 }, palette({}, blue)),
      ).toEqual([
        ["#ffffff", "#111111"],
        [["#235fa0", "#214874", "#1c324b", "#161c25"], []],
        [],
      ]);
    });
  });
  it("should work with accents", () => {
    expect(accessibility({}, palette({ accents: true }, red))).toEqual([
      ["#ffffff", "#111111"],
      [
        ["#b41f35", "#8d222d", "#682125", "#451d1e", "#231616"],
        ["#bd0000", "#900000", "#560000", "#111500", "#000d00"],
      ],
      [],
    ]);
    expect(
      accessibility(
        {},
        palette({ configuration: "artistic", accents: true }, green),
      ),
    ).toEqual([
      ["#ffffff", "#111111"],
      [[], [], ["#3c6625", "#1c2418"]],
      ["#2f5e70", "#24386d"],
    ]);
    expect(accessibility({}, palette({ accents: true }, blue))).toEqual([
      ["#ffffff", "#111111"],
      [
        ["#2277cf", "#235fa0", "#214874", "#1c324b", "#161c25"],
        ["#5a58eb", "#7100c1", "#750082", "#6b0036", "#560000"],
      ],
      [],
    ]);
  });
  it("should work with dark mode palettes", () => {
    expect(accessibility({}, palette({ dark: true }, red))).toEqual([
      ["#111111", "#ffffff"],
      [["#e8555f", "#f27f81", "#faa4a3", "#fec8c7", "#ffebeb"], []],
      [],
    ]);
    expect(
      accessibility(
        { mode: "custom", min: 64 },
        palette({ configuration: "artistic", dark: true }, green),
      ),
    ).toEqual([
      ["#111111", "#ffffff"],
      [["#abff7e", "#d1ffba", "#f4ffee"], ["#91e664"], []],
      [],
    ]);
    expect(accessibility({}, palette({ dark: true }, blue))).toEqual([
      ["#111111", "#ffffff"],
      [["#55a6ff", "#7dbaff", "#a2ceff", "#c7e2ff", "#ebf5ff"], []],
      [],
    ]);
    expect(
      accessibility({}, palette({ accents: true, dark: true }, red)),
    ).toEqual([
      ["#111111", "#ffffff"],
      [
        ["#e8555f", "#f27f81", "#faa4a3", "#fec8c7", "#ffebeb"],
        ["#ff4700", "#ff8200", "#ffc500", "#efff00", "#44ff00"],
      ],
      [],
    ]);
    expect(
      accessibility(
        { mode: "custom", min: 64 },
        palette(
          { configuration: "artistic", accents: true, dark: true },
          green,
        ),
      ),
    ).toEqual([
      ["#111111", "#ffffff"],
      [["#abff7e", "#d1ffba", "#f4ffee"], ["#91e664"], []],
      ["#eebaad", "#dacd96", "#c2df7b", "#a6ef58"],
    ]);
    expect(
      accessibility({}, palette({ accents: true, dark: true }, blue)),
    ).toEqual([
      ["#111111", "#ffffff"],
      [
        ["#55a6ff", "#7dbaff", "#a2ceff", "#c7e2ff", "#ebf5ff"],
        ["#919aff", "#eba0ff", "#ffa5ff", "#ff9aff", "#ff85c0"],
      ],
      [],
    ]);
  });
});

run();
