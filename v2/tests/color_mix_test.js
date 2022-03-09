// color_mix Tests

// [[file:../../Notebook.org::*color_mix Tests][color_mix Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_adjust, color_mix } from "../color.js";

describe("color_mix(settings, color)", () => {
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
      color_adjust({ hue: 180 }, "red"),
    ],
    [
      "orange",
      ["#ffa500", "#dfb172", "#bbb9a7", "#92bed4", "#5bc0ff"],
      color_adjust({ hue: 180 }, "orange"),
    ],
    [
      "yellow",
      ["#ffff00", "#fbf77c", "#f8eeb0", "#f6e4da", "#f4d8ff"],
      color_adjust({ hue: 180 }, "yellow"),
    ],
    [
      "lime",
      ["#00ff00", "#8ce77c", "#becbb0", "#e2aada", "#ff7dff"],
      color_adjust({ hue: 180 }, "lime"),
    ],
    [
      "cyan",
      ["#00ffff", "#8beeef", "#bddcdf", "#e2c9cf", "#ffb3bf"],
      color_adjust({ hue: 180 }, "cyan"),
    ],
    [
      "blue",
      ["#0000ff", "#383cc8", "#5e4592", "#803e5a", "#a02000"],
      color_adjust({ hue: 180 }, "blue"),
    ],
    [
      "purple",
      ["#800080", "#6f366a", "#5a4b52", "#3f5a37", "#006600"],
      color_adjust({ hue: 180 }, "purple"),
    ],
    [
      "magenta",
      ["#ff00ff", "#de72d5", "#b79ba9", "#85b774", "#00cd00"],
      color_adjust({ hue: 180 }, "magenta"),
    ],
  ];

  it("should reject an invalid color", () => {
    expect(() => color_mix({ target: "blue" }, "invalid")).toThrow();
  });

  it("should reject an invalid target", () => {
    expect(() => color_mix({ target: "invalid" }, "red")).toThrow();
  });

  it("should correctly mix samples", () => {
    samples.forEach(([color, results, target]) => {
      results.forEach((output, index) => {
        expect(color_mix({ target, strength: index * 25 }, color)).toBe(output);
      });
    });
  });

  it("should correctly negate opposites", () => {
    negations.forEach(([color, results, target]) => {
      results.forEach((output, index) => {
        expect(color_mix({ target, strength: index * 25 }, color)).toBe(output);
      });
    });
  });
});

run();
// color_mix Tests:1 ends here
