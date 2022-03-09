// color_as_analogous Tests


// [[file:../../Notebook.org::*color_as_analogous Tests][color_as_analogous Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_analogous } from "../color.js";

describe("color_as_analogous(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#de5f00", "#7b9900"]],
    ["orange", ["#ffa500", "#b7c826", "#23dc96"]],
    ["yellow", ["#ffff00", "#5bffb3", "#00ffff"]],
    ["lime", ["#00ff00", "#00fff5", "#00e9ff"]],
    ["cyan", ["#00ffff", "#72edff", "#d5d0ff"]],
    ["blue", ["#0000ff", "#8800d3", "#c00061"]],
    ["purple", ["#800080", "#9b002d", "#931700"]],
    ["magenta", ["#ff00ff", "#ff0061", "#ff3800"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_analogous("invalid")).toThrow();
  });

  it("should correctly emit analogous schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_analogous(input)).toEqual(output);
    });
  });
});

run();
// color_as_analogous Tests:1 ends here
