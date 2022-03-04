// color_as_cmyk Tests


// [[file:../../Notebook.org::*color_as_cmyk Tests][color_as_cmyk Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_cmyk } from "../color.js";

describe("color_as_cmyk(color)", () => {
  const controlGroup = [
    ["black", "device-cmyk(0% 0% 0% 100%)"],
    ["gray", "device-cmyk(0% 0% 0% 49.804%)"],
    ["white", "device-cmyk(0% 0% 0% 0%)"],
  ];

  const samples = [
    ["red", "device-cmyk(0% 100% 100% 0%)"],
    ["orange", "device-cmyk(0% 35.294% 100% 0%)"],
    ["yellow", "device-cmyk(0% 0% 100% 0%)"],
    ["lime", "device-cmyk(100% 0% 100% 0%)"],
    ["cyan", "device-cmyk(100% 0% 0% 0%)"],
    ["blue", "device-cmyk(100% 100% 0% 0%)"],
    ["purple", "device-cmyk(0% 100% 0% 49.804%)"],
    ["magenta", "device-cmyk(0% 100% 0% 0%)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_cmyk("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_cmyk(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_cmyk(input)).toBe(output);
    });
  });
});

run();
// color_as_cmyk Tests:1 ends here
