// color_as_hex Tests


// [[file:../../Notebook.org::*color_as_hex Tests][color_as_hex Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_hex } from "../color.js";

describe("color_as_hex(color)", () => {
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
    expect(() => color_as_hex("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_hex(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_hex(input)).toBe(output);
    });
  });
});

run();
// color_as_hex Tests:1 ends here
