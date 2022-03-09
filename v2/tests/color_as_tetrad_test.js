// color_as_tetrad Tests


// [[file:../../Notebook.org::*color_as_tetrad Tests][color_as_tetrad Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_tetrad } from "../color.js";

describe("color_as_tetrad(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#de5f00", "#00a9db", "#0080ff"]],
    ["orange", ["#ffa500", "#b7c826", "#5bc0ff", "#c5a2ff"]],
    ["yellow", ["#ffff00", "#5bffb3", "#f4d8ff", "#ffb9ff"]],
    ["lime", ["#00ff00", "#00fff5", "#ff7dff", "#ff5cb0"]],
    ["cyan", ["#00ffff", "#72edff", "#ffb3bf", "#ffc56e"]],
    ["blue", ["#0000ff", "#8800d3", "#a02000", "#016c00"]],
    ["purple", ["#800080", "#9b002d", "#006600", "#00686b"]],
    ["magenta", ["#ff00ff", "#ff0061", "#00cd00", "#00d1d7"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_tetrad("invalid")).toThrow();
  });

  it("should correctly emit tetradic schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_tetrad(input)).toEqual(output);
    });
  });
});

run();
// color_as_tetrad Tests:1 ends here
