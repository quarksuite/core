import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { illuminant } from "../../color.js";

describe("illuminant(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => illuminant({}, "invalid")).toThrow();
  });

  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  const illuminantSamples = {
    1000: {
      red: [red, ["#dc143c", "#e52435", "#ed302c", "#f63a1e", "#ff4400"]],
      green: [green, ["#7fff00", "#bbd900", "#dcb000", "#f18200", "#ff4400"]],
      blue: [blue, ["#1e90ff", "#7c8cd0", "#af809f", "#d96b69", "#ff4400"]],
    },
    2400: {
      red: [red, ["#dc143c", "#e6463e", "#ef653e", "#f8813e", "#ff9b3d"]],
      green: [green, ["#7fff00", "#b1e820", "#d2d02e", "#ebb737", "#ff9b3d"]],
      blue: [blue, ["#1e90ff", "#719bda", "#a5a0b1", "#d3a083", "#ff9b3d"]],
    },
    4800: {
      red: [red, ["#dc143c", "#ea5d5e", "#f58b80", "#fcb6a3", "#ffe0c7"]],
      green: [green, ["#7fff00", "#a8f95f", "#c8f288", "#e5eaa9", "#ffe0c7"]],
      blue: [blue, ["#1e90ff", "#68a8f5", "#9dbce9", "#cfcfda", "#ffe0c7"]],
    },
    6400: {
      red: [red, ["#dc143c", "#ec656a", "#f89b98", "#feccc7", "#fffdf8"]],
      green: [green, ["#7fff00", "#a4ff70", "#c5ffa3", "#e3ffcf", "#fffdf8"]],
      blue: [blue, ["#1e90ff", "#65aeff", "#9ac9ff", "#cde4fd", "#fffdf8"]],
    },
    12800: {
      red: [red, ["#dc143c", "#dd5d6e", "#d9889e", "#ceaece", "#bcd2ff"]],
      green: [green, ["#7fff00", "#90f679", "#9fecad", "#aee0d8", "#bcd2ff"]],
      blue: [blue, ["#1e90ff", "#53a2ff", "#79b2ff", "#9bc3ff", "#bcd2ff"]],
    },
  };

  it("should correctly simulate the effects of various light sources on sample data", () => {
    Object.entries(illuminantSamples).forEach(([K, data]) => {
      Object.values(data).forEach(([input, results]) => {
        results.forEach((output, pos) => {
          expect(illuminant({ K, intensity: 25 * pos }, input)).toBe(output);
        });
      });
    });
  });
});

run();
