// color_as_cielch Tests


// [[file:../../Notebook.org::*color_as_cielch Tests][color_as_cielch Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_cielch } from "../color.js";

describe("color_as_cielch(color)", () => {
  const controlGroup = [
    ["black", "lch(0% 0 0)"],
    ["gray", "lch(53.585% 0 0)"],
    ["white", "lch(100% 0 0)"],
  ];

  const samples = [
    ["red", "lch(54.292% 106.839 40.853)"],
    ["orange", "lch(75.59% 83.766 70.821)"],
    ["yellow", "lch(97.607% 94.708 99.575)"],
    ["lime", "lch(87.818% 113.34 134.391)"],
    ["cyan", "lch(90.665% 52.828 196.452)"],
    ["blue", "lch(29.568% 131.207 301.369)"],
    ["purple", "lch(29.692% 66.83 327.109)"],
    ["magenta", "lch(60.17% 111.408 327.109)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => color_as_cielch("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(color_as_cielch(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_cielch(input)).toBe(output);
    });
  });
});

run();
// color_as_cielch Tests:1 ends here
