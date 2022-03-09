// color_as_split Tests


// [[file:../../Notebook.org::*color_as_split Tests][color_as_split Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_split } from "../color.js";

describe("color_as_split(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#00b48c", "#0090ff"]],
    ["orange", ["#ffa500", "#00d2ff", "#a9acff"]],
    ["yellow", ["#ffff00", "#9cf3ff", "#ffc2ff"]],
    ["lime", ["#00ff00", "#df9eff", "#ff62e5"]],
    ["cyan", ["#00ffff", "#ffb4f8", "#ffbd87"]],
    ["blue", ["#0000ff", "#c50000", "#5d5c00"]],
    ["purple", ["#800080", "#475700", "#006a4e"]],
    ["magenta", ["#ff00ff", "#92b100", "#00d5a0"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_split("invalid")).toThrow();
  });

  it("should correctly emit split complementary schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_split(input)).toEqual(output);
    });
  });
});

run();
// color_as_split Tests:1 ends here
