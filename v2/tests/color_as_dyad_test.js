// color_as_dyad Tests


// [[file:../../Notebook.org::*color_as_dyad Tests][color_as_dyad Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_dyad } from "../color.js";

describe("color_as_dyad(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#7b9900"]],
    ["orange", ["#ffa500", "#23dc96"]],
    ["yellow", ["#ffff00", "#00ffff"]],
    ["lime", ["#00ff00", "#00e9ff"]],
    ["cyan", ["#00ffff", "#d5d0ff"]],
    ["blue", ["#0000ff", "#c00061"]],
    ["purple", ["#800080", "#931700"]],
    ["magenta", ["#ff00ff", "#ff3800"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_dyad("invalid")).toThrow();
  });

  it("should correctly emit dyads from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_dyad(input)).toEqual(output);
    });
  });
});

run();
// color_as_dyad Tests:1 ends here
