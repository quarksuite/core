// hex Tests


// [[file:../../../Notebook.org::*hex Tests][hex Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { hex } from "../color.js";

describe("hex(color)", () => {
  const controlGroup = [
    ["black", "#000000"],
    ["gray", "#808080"],
    ["white", "#ffffff"],
  ];

  const samples = [
    ["red", "#ff0000"],
    ["orange", "#ffa500"],
    ["yellow", "#ffff00"],
    ["lime", "#00ff00"],
    ["cyan", "#00ffff"],
    ["blue", "#0000ff"],
    ["purple", "#800080"],
    ["magenta", "#ff00ff"],
  ];

  it("should reject invalid colors", () => {
    expect(() => hex("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(hex(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(hex(input)).toBe(output);
    });
  });
});

run();
// hex Tests:1 ends here
