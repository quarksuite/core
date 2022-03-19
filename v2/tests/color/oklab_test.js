// oklab Tests


// [[file:../../../Notebook.org::*oklab Tests][oklab Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { oklab } from "../color.js";

describe("oklab(color)", () => {
  const controlGroup = [
    ["black", "oklab(0% 0 0)"],
    ["gray", "oklab(59.987% 0 0)"],
    ["white", "oklab(100% 0 0)"],
  ];

  const samples = [
    ["red", "oklab(62.796% 0.22486 0.12585)"],
    ["orange", "oklab(79.269% 0.05661 0.16138)"],
    ["yellow", "oklab(96.798% -0.07137 0.19857)"],
    ["lime", "oklab(86.644% -0.23389 0.1795)"],
    ["cyan", "oklab(90.54% -0.14944 -0.0394)"],
    ["blue", "oklab(45.201% -0.03246 -0.31153)"],
    ["purple", "oklab(42.091% 0.1647 -0.10147)"],
    ["magenta", "oklab(70.167% 0.27457 -0.16916)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => oklab("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(oklab(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(oklab(input)).toBe(output);
    });
  });
});

run();
// oklab Tests:1 ends here
