// color_as_square Tests


// [[file:../../Notebook.org::*color_as_square Tests][color_as_square Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_square } from "../color.js";

describe("color_as_square(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#7b9900", "#00a9db", "#a34fff"]],
    ["orange", ["#ffa500", "#23dc96", "#5bc0ff", "#ff8cdc"]],
    ["yellow", ["#ffff00", "#00ffff", "#f4d8ff", "#ffb3b9"]],
    ["lime", ["#00ff00", "#00e9ff", "#ff7dff", "#ff8300"]],
    ["cyan", ["#00ffff", "#d5d0ff", "#ffb3bf", "#f0e55d"]],
    ["blue", ["#0000ff", "#c00061", "#a02000", "#008048"]],
    ["purple", ["#800080", "#931700", "#006600", "#0051a8"]],
    ["magenta", ["#ff00ff", "#ff3800", "#00cd00", "#00a6ff"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_square("invalid")).toThrow();
  });

  it("should correctly emit square schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_square(input)).toEqual(output);
    });
  });
});

run();
// color_as_square Tests:1 ends here
