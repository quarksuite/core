// color_as_hsl Tests


// [[file:../../Notebook.org::*color_as_hsl Tests][color_as_hsl Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_hsl } from "../color.js";

describe("color_as_hsl(color)", () => {
  const controlGroup = [
    ["black", "hsl(0, 0%, 0%)"],
    ["gray", "hsl(0, 0%, 50.196%)"],
    ["white", "hsl(0, 0%, 100%)"],
  ];

  const samples = [
    ["red", "hsl(0, 100%, 50%)"],
    ["orange", "hsl(38.824, 100%, 50%)"],
    ["yellow", "hsl(60, 100%, 50%)"],
    ["lime", "hsl(120, 100%, 50%)"],
    ["cyan", "hsl(180, 100%, 50%)"],
    ["blue", "hsl(240, 100%, 50%)"],
    ["purple", "hsl(300, 100%, 25.098%)"],
    ["magenta", "hsl(300, 100%, 50%)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_hsl("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_hsl(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_hsl(input)).toBe(output);
    });
  });
});

run();
// color_as_hsl Tests:1 ends here
