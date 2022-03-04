// color_as_oklch Tests

// [[file:../../Notebook.org::*color_as_oklch Tests][color_as_oklch Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_oklch } from "../color.js";

describe("color_as_oklch(color)", () => {
  const controlGroup = [
    ["black", "oklch(0% 0 0)"],
    ["gray", "oklch(59.987% 0 0)"],
    ["white", "oklch(100% 0 0)"],
  ];

  const samples = [
    ["red", "oklch(62.796% 0.25768 29.234)"],
    ["orange", "oklch(79.269% 0.17103 70.67)"],
    ["yellow", "oklch(96.798% 0.21101 109.769)"],
    ["lime", "oklch(86.644% 0.29483 142.495)"],
    ["cyan", "oklch(90.54% 0.15455 194.769)"],
    ["blue", "oklch(45.201% 0.31321 264.052)"],
    ["purple", "oklch(42.091% 0.19345 328.363)"],
    ["magenta", "oklch(70.167% 0.32249 328.363)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_oklch("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_oklch(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_oklch(input)).toBe(output);
    });
  });
});

run();
// color_as_oklch Tests:1 ends here
