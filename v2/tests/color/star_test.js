// [[file:../../../Notebook.org::*star Tests][star Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { star } from "../color.js";

describe("star(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#ac8500", "#00b47a", "#008aff", "#c43deb"]],
    ["orange", ["#ffa500", "#73d66d", "#00d5ff", "#b5a8ff", "#ff88ba"]],
    ["yellow", ["#ffff00", "#00ffff", "#85f8ff", "#ffbeff", "#ffbb85"]],
    ["lime", ["#00ff00", "#00faff", "#cca5ff", "#ff5fd1", "#ffa000"]],
    ["cyan", ["#00ffff", "#b1dcff", "#ffb6ff", "#ffc07c", "#cdf076"]],
    ["blue", ["#0000ff", "#ad0094", "#c90000", "#476300", "#007c82"]],
    ["purple", ["#800080", "#9a0000", "#535300", "#00695a", "#0043b3"]],
    ["magenta", ["#ff00ff", "#ff0000", "#aaa900", "#00d4b7", "#008cff"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => star("invalid")).toThrow();
  });

  it("should correctly emit star schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(star(input)).toEqual(output);
    });
  });
});

run();
// star Tests:1 ends here
