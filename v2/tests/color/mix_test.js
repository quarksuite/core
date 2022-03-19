// [[file:../../../Notebook.org::*mix Tests][mix Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { adjust, mix } from "../color.js";

describe("mix(settings, color)", () => {
  const samples = [
    ["red", ["#ff0000", "#ff4b00", "#ff6e00", "#ff8b00", "#ffa500"], "orange"],
    [
      "orange",
      ["#ffa500", "#ffbc00", "#ffd200", "#ffe900", "#ffff00"],
      "yellow",
    ],
    ["yellow", ["#ffff00", "#daff00", "#b0ff00", "#7cff00", "#00ff00"], "lime"],
    ["lime", ["#00ff00", "#00ff74", "#00ffa9", "#00ffd6", "#00ffff"], "cyan"],
    ["cyan", ["#00ffff", "#00d1ff", "#00a0ff", "#006aff", "#0000ff"], "blue"],
    ["blue", ["#0000ff", "#381fde", "#5424be", "#6b1e9f", "#800080"], "purple"],
    [
      "purple",
      ["#800080", "#9e009e", "#bd00bd", "#de00de", "#ff00ff"],
      "magenta",
    ],
  ];

  const negations = [
    [
      "red",
      ["#ff0000", "#de5e58", "#b78087", "#8497b2", "#00a9db"],
      adjust({ hue: 180 }, "red"),
    ],
    [
      "orange",
      ["#ffa500", "#dfb172", "#bbb9a7", "#92bed4", "#5bc0ff"],
      adjust({ hue: 180 }, "orange"),
    ],
    [
      "yellow",
      ["#ffff00", "#fbf77c", "#f8eeb0", "#f6e4da", "#f4d8ff"],
      adjust({ hue: 180 }, "yellow"),
    ],
    [
      "lime",
      ["#00ff00", "#8ce77c", "#becbb0", "#e2aada", "#ff7dff"],
      adjust({ hue: 180 }, "lime"),
    ],
    [
      "cyan",
      ["#00ffff", "#8beeef", "#bddcdf", "#e2c9cf", "#ffb3bf"],
      adjust({ hue: 180 }, "cyan"),
    ],
    [
      "blue",
      ["#0000ff", "#383cc8", "#5e4592", "#803e5a", "#a02000"],
      adjust({ hue: 180 }, "blue"),
    ],
    [
      "purple",
      ["#800080", "#6f366a", "#5a4b52", "#3f5a37", "#006600"],
      adjust({ hue: 180 }, "purple"),
    ],
    [
      "magenta",
      ["#ff00ff", "#de72d5", "#b79ba9", "#85b774", "#00cd00"],
      adjust({ hue: 180 }, "magenta"),
    ],
  ];

  const blends = [
    ["red", ["#f2674f", "#df957e", "#c3bca9", "#94ded4", "#00ffff"], "cyan"],
    ["orange", ["#ca9b75", "#978ca2", "#6377c5", "#2e57e3", "#0000ff"], "blue"],
    [
      "yellow",
      ["#e6d25a", "#cda673", "#b47a7e", "#9a4c82", "#800080"],
      "purple",
    ],
    [
      "lime",
      ["#87e374", "#b5c4a2", "#d4a1c5", "#ec73e4", "#ff00ff"],
      "magenta",
    ],
    ["cyan", ["#94ded4", "#c3bca9", "#df957e", "#f2674f", "#ff0000"], "red"],
    ["blue", ["#2e57e3", "#6377c5", "#978ca2", "#ca9b75", "#ffa500"], "orange"],
    [
      "purple",
      ["#9a4c82", "#b47a7e", "#cda673", "#e6d25a", "#ffff00"],
      "yellow",
    ],
    [
      "magenta",
      ["#ec73e4", "#d4a1c5", "#b5c4a2", "#87e374", "#00ff00"],
      "lime",
    ],
  ];

  it("should reject an invalid color", () => {
    expect(() => mix({ target: "blue" }, "invalid")).toThrow();
  });

  it("should reject an invalid target", () => {
    expect(() => mix({ target: "invalid" }, "red")).toThrow();
  });

  it("should correctly mix samples", () => {
    samples.forEach(([color, results, target]) => {
      results.forEach((output, index) => {
        expect(mix({ target, strength: index * 25 }, color)).toBe(output);
      });
    });
  });

  it("should correctly negate opposites", () => {
    negations.forEach(([color, results, target]) => {
      results.forEach((output, index) => {
        expect(mix({ target, strength: index * 25 }, color)).toBe(output);
      });
    });
  });

  it("should allow blending when settings.steps is defined", () => {
    blends.forEach(([color, results, target]) => {
      expect(mix({ target, strength: 100, steps: 5 }, color)).toEqual(
        results,
      );
    });
  });
});

run();
// mix Tests:1 ends here
