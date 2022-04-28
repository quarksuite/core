import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette } from "../../color.js";

describe("palette(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => palette({}, "invalid")).toThrow();
  });

  const [red, green, blue] = ["crimson", "chartreuse", "dodgerblue"];

  describe("settings.configuration = 'material'", () => {
    it("should activate settings.accented", () => {
      expect(palette({ accented: true }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#ffebeb",
            "#fec8c7",
            "#faa4a3",
            "#f27f81",
            "#e8555f",
            "#b41f35",
            "#8d222d",
            "#682125",
            "#451d1e",
            "#231616",
          ],
          [
            "#d9ffff",
            "#ebebff",
            "#f0b9ff",
            "#f388e5",
            "#ed5599",
            "#bd0000",
            "#900000",
            "#560000",
            "#111500",
            "#000d00",
          ],
        ],
        [],
      ]);
      expect(palette({ accented: true }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#f4ffee",
            "#dfffd0",
            "#c9ffaf",
            "#b3ff8b",
            "#9aff60",
            "#6ace1f",
            "#56a026",
            "#427426",
            "#2f4a21",
            "#1c2418",
          ],
          [
            "#ffd7df",
            "#ffd7a7",
            "#ffe061",
            "#fff400",
            "#ffff00",
            "#00ed74",
            "#00d0b2",
            "#00a2e4",
            "#005dff",
            "#0000ff",
          ],
        ],
        [],
      ]);
      expect(palette({ accented: true }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#ebf5ff",
            "#c7e2ff",
            "#a2ceff",
            "#7dbaff",
            "#55a6ff",
            "#2277cf",
            "#235fa0",
            "#214874",
            "#1c324b",
            "#161c25",
          ],
          [
            "#eeffdd",
            "#ccffe7",
            "#8efff4",
            "#28e8fa",
            "#00c0ff",
            "#5a58eb",
            "#7100c1",
            "#750082",
            "#6b0036",
            "#560000",
          ],
        ],
        [],
      ]);
    });
  });

  describe("settings.configuration = 'artistic'", () => {
    it("should activate settings.tints", () => {
      expect(palette({ configuration: "artistic", tints: 6 }, red)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#e64d59", "#ef7175", "#f69292", "#fbb0af", "#ffcecc", "#ffebeb"],
          ["#d4595e", "#c67f7f", "#b3a09f"],
          ["#9a2130", "#5c2023", "#231616"],
        ],
        [],
      ]);
      expect(palette({ configuration: "artistic", tints: 0 }, red)).toEqual([
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
      expect(palette({ configuration: "artistic", tones: 6 }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#abff7e", "#d1ffba", "#f4ffee"],
          ["#89f348", "#91e664", "#98da78", "#9ecd88", "#a3c096", "#a8b3a3"],
          ["#5daf25", "#3c6625", "#1c2418"],
        ],
        [],
      ]);
      expect(palette({ configuration: "artistic", tones: 0 }, green)).toEqual([
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
      expect(palette({ configuration: "artistic", shades: 6 }, blue)).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#70b4ff", "#aed5ff", "#ebf5ff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#227bd7", "#2367af", "#22538a", "#1f4066", "#1b2e44", "#161c25"],
        ],
        [],
      ]);
      expect(palette({ configuration: "artistic", shades: 0 }, blue)).toEqual([
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
    it("should be active with either configuration", () => {
      expect(palette({ contrast: 90 }, red)).toEqual([
        ["#ffebeb", "#231616"],
        [
          [
            "#fec9c9",
            "#fbacac",
            "#f58f90",
            "#ef6f74",
            "#e64c58",
            "#bb1e36",
            "#9c2130",
            "#7d222a",
            "#5f2024",
            "#431c1e",
          ],
          [],
        ],
        [],
      ]);
      expect(
        palette({ configuration: "artistic", contrast: 80 }, green)
      ).toEqual([
        ["#e8ffdd", "#26391d"],
        [
          ["#a3ff70", "#c2ffa4", "#dfffd0"],
          ["#8eeb5a", "#9ad77c", "#a2c394"],
          ["#63bf23", "#498227", "#2f4a21"],
        ],
        [],
      ]);
      expect(palette({ contrast: 70 }, blue)).toEqual([
        ["#c3e0ff", "#1d344f"],
        [
          [
            "#8ec4ff",
            "#7cbaff",
            "#68b0ff",
            "#54a6ff",
            "#3d9bff",
            "#2184e7",
            "#2278cf",
            "#236cb8",
            "#2360a2",
            "#22548c",
          ],
          [],
        ],
        [],
      ]);
    });
  });

  describe("settings.stated", () => {
    it("should be active with either configuration", () => {
      expect(palette({ configuration: "artistic", stated: true }, red)).toEqual(
        [
          ["#ffffff", "#111111"],
          [
            ["#ef7175", "#fbb0af", "#ffebeb"],
            ["#d4595e", "#c67f7f", "#b3a09f"],
            ["#9a2130", "#5c2023", "#231616"],
          ],
          ["#9b8e8d", "#498635", "#ae8e28", "#ae352e"],
        ]
      );
      expect(palette({ stated: true }, green)).toEqual([
        ["#ffffff", "#111111"],
        [
          [
            "#f4ffee",
            "#dfffd0",
            "#c9ffaf",
            "#b3ff8b",
            "#9aff60",
            "#6ace1f",
            "#56a026",
            "#427426",
            "#2f4a21",
            "#1c2418",
          ],
          [],
        ],
        ["#939b90", "#349134", "#a89b25", "#ad482d"],
      ]);
      expect(
        palette({ configuration: "artistic", stated: true }, blue)
      ).toEqual([
        ["#ffffff", "#111111"],
        [
          ["#70b4ff", "#aed5ff", "#ebf5ff"],
          ["#589be7", "#7ea3ce", "#9fa8b4"],
          ["#2367af", "#1f4066", "#161c25"],
        ],
        ["#8e949c", "#2a8b48", "#a29542", "#a6423f"],
      ]);
    });
  });

  describe("settings.dark", () => {
    it("should be active with either configuration", () => {
      expect(palette({ dark: true }, red)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#231616",
            "#451d1e",
            "#682125",
            "#8d222d",
            "#b41f35",
            "#e8555f",
            "#f27f81",
            "#faa4a3",
            "#fec8c7",
            "#ffebeb",
          ],
          [],
        ],
        [],
      ]);
      expect(palette({ configuration: "artistic", dark: true }, green)).toEqual(
        [
          ["#111111", "#ffffff"],
          [
            ["#abff7e", "#d1ffba", "#f4ffee"],
            ["#91e664", "#9ecd88", "#a8b3a3"],
            ["#5daf25", "#3c6625", "#1c2418"],
          ],
          [],
        ]
      );
      expect(palette({ dark: true }, blue)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#161c25",
            "#1c324b",
            "#214874",
            "#235fa0",
            "#2277cf",
            "#55a6ff",
            "#7dbaff",
            "#a2ceff",
            "#c7e2ff",
            "#ebf5ff",
          ],
          [],
        ],
        [],
      ]);
    });
    it("should invert material accents", () => {
      expect(palette({ accented: true, dark: true }, red)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#231616",
            "#451d1e",
            "#682125",
            "#8d222d",
            "#b41f35",
            "#e8555f",
            "#f27f81",
            "#faa4a3",
            "#fec8c7",
            "#ffebeb",
          ],
          [
            "#01001d",
            "#110041",
            "#3b005c",
            "#6e0067",
            "#a7005e",
            "#ff4700",
            "#ff8200",
            "#ffc500",
            "#efff00",
            "#44ff00",
          ],
        ],
        [],
      ]);
      expect(palette({ accented: true, dark: true }, green)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#1c2418",
            "#2f4a21",
            "#427426",
            "#56a026",
            "#6ace1f",
            "#9aff60",
            "#b3ff8b",
            "#c9ffaf",
            "#dfffd0",
            "#f4ffee",
          ],
          [
            "#7f142a",
            "#a83100",
            "#c75b00",
            "#d28d00",
            "#c1c600",
            "#00ffb4",
            "#00ffff",
            "#00f0ff",
          ],
        ],
        [],
      ]);
      expect(palette({ accented: true, dark: true }, blue)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#161c25",
            "#1c324b",
            "#214874",
            "#235fa0",
            "#2277cf",
            "#55a6ff",
            "#7dbaff",
            "#a2ceff",
            "#c7e2ff",
            "#ebf5ff",
          ],
          [
            "#021000",
            "#002e0f",
            "#004c3f",
            "#00697b",
            "#0080be",
            "#919aff",
            "#eba0ff",
            "#ffa5ff",
            "#ff9aff",
            "#ff85c0",
          ],
        ],
        [],
      ]);
    });
    it("should invert interface states", () => {
      expect(palette({ stated: true, dark: true }, red)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#231616",
            "#451d1e",
            "#682125",
            "#8d222d",
            "#b41f35",
            "#e8555f",
            "#f27f81",
            "#faa4a3",
            "#fec8c7",
            "#ffebeb",
          ],
          [],
        ],
        ["#eadcdb", "#93d480", "#ffdd7d", "#ff8476"],
      ]);
      expect(
        palette({ configuration: "artistic", stated: true, dark: true }, green)
      ).toEqual([
        ["#111111", "#ffffff"],
        [
          ["#abff7e", "#d1ffba", "#f4ffee"],
          ["#91e664", "#9ecd88", "#a8b3a3"],
          ["#5daf25", "#3c6625", "#1c2418"],
        ],
        ["#e1eade", "#84e181", "#f7eb7d", "#ff9477"],
      ]);
      expect(palette({ stated: true, dark: true }, blue)).toEqual([
        ["#111111", "#ffffff"],
        [
          [
            "#161c25",
            "#1c324b",
            "#214874",
            "#235fa0",
            "#2277cf",
            "#55a6ff",
            "#7dbaff",
            "#a2ceff",
            "#c7e2ff",
            "#ebf5ff",
          ],
          [],
        ],
        ["#dce2eb", "#7dda91", "#f1e491", "#fb8d87"],
      ]);
    });
  });
});

run();
