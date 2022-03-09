// color_as_triad Tests


// [[file:../../Notebook.org::*color_as_triad Tests][color_as_triad Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_triad } from "../color.js";

describe("color_as_triad(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#00ae00", "#4f6fff"]],
    ["orange", ["#ffa500", "#00dcd5", "#de99ff"]],
    ["yellow", ["#ffff00", "#00ffff", "#ffb3ff"]],
    ["lime", ["#00ff00", "#61c4ff", "#ff6072"]],
    ["cyan", ["#00ffff", "#ffbfff", "#ffd05c"]],
    ["blue", ["#0000ff", "#ce0000", "#007700"]],
    ["purple", ["#800080", "#773e00", "#006384"]],
    ["magenta", ["#ff00ff", "#ef8200", "#00c8ff"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_triad("invalid")).toThrow();
  });

  it("should correctly emit triadic schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_triad(input)).toEqual(output);
    });
  });
});

run();
// color_as_triad Tests:1 ends here
