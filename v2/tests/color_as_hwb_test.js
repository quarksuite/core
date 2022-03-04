// color_as_hwb Tests


// [[file:../../Notebook.org::*color_as_hwb Tests][color_as_hwb Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_hwb } from "../color.js";

describe("color_as_hwb(color)", () => {
  const controlGroup = [
    ["black", "hwb(0 0% 100%)"],
    ["gray", "hwb(0 50.196% 49.804%)"],
    ["white", "hwb(0 100% 0%)"],
  ];

  const samples = [
    ["red", "hwb(0 0% 0%)"],
    ["orange", "hwb(38.824 0% 0%)"],
    ["yellow", "hwb(60 0% 0%)"],
    ["lime", "hwb(120 0% 0%)"],
    ["cyan", "hwb(180 0% 0%)"],
    ["blue", "hwb(240 0% 0%)"],
    ["purple", "hwb(300 0% 49.804%)"],
    ["magenta", "hwb(300 0% 0%)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_hwb("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_hwb(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_hwb(input)).toBe(output);
    });
  });
});

run();
// color_as_hwb Tests:1 ends here
