// rgb Tests


// [[file:../../../Notebook.org::*rgb Tests][rgb Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { rgb } from "../color.js";

describe("rgb(color)", () => {
  const controlGroup = [
    ["black", "rgb(0, 0, 0)"],
    ["gray", "rgb(128, 128, 128)"],
    ["white", "rgb(255, 255, 255)"],
  ];

  const samples = [
    ["red", "rgb(255, 0, 0)"],
    ["orange", "rgb(255, 165, 0)"],
    ["yellow", "rgb(255, 255, 0)"],
    ["lime", "rgb(0, 255, 0)"],
    ["cyan", "rgb(0, 255, 255)"],
    ["blue", "rgb(0, 0, 255)"],
    ["purple", "rgb(128, 0, 128)"],
    ["magenta", "rgb(255, 0, 255)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => rgb("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(rgb(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(rgb(input)).toBe(output);
    });
  });
});

run();
// rgb Tests:1 ends here
