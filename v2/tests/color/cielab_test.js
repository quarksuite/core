// cielab Tests


// [[file:../../../Notebook.org::*cielab Tests][cielab Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { cielab } from "../color.js";

describe("cielab(color)", () => {
  const controlGroup = [
    ["black", "lab(0% 0 0)"],
    ["gray", "lab(53.585% 0 0)"],
    ["white", "lab(100% 0 0)"],
  ];

  const samples = [
    ["red", "lab(54.292% 80.812 69.885)"],
    ["orange", "lab(75.59% 27.519 79.116)"],
    ["yellow", "lab(97.607% -15.753 93.388)"],
    ["lime", "lab(87.818% -79.287 80.99)"],
    ["cyan", "lab(90.665% -50.665 -14.962)"],
    ["blue", "lab(29.568% 68.299 -112.029)"],
    ["purple", "lab(29.692% 56.118 -36.291)"],
    ["magenta", "lab(60.17% 93.55 -60.499)"],
  ];

  it("should reject invalid colors", () => {
    expect(() => cielab("invalid")).toThrow();
  });

  it("should correctly convert the control group", () => {
    controlGroup.forEach(([input, output]) => {
      expect(cielab(input)).toBe(output);
    });
  });
  it("should correctly convert the color samples", () => {
    samples.forEach(([input, output]) => {
      expect(cielab(input)).toBe(output);
    });
  });
});

run();
// cielab Tests:1 ends here
