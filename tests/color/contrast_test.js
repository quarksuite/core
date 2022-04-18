// [[file:../../Notebook.org::*contrast Tests][contrast Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { contrast } from "../../color.js";

describe("contrast(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => contrast({}, "invalid")).toThrow();
  });

  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  const contrastSamples = {
    0: {
      red: [red, ["#dc143c", "#950a26", "#540311", "#1b0002", "#000000"]],
      green: [green, ["#7fff00", "#54ae00", "#2d6300", "#0b2200", "#000000"]],
      blue: [blue, ["#1e90ff", "#1160ae", "#053463", "#010e22", "#000000"]],
    },
    25: {
      red: [red, ["#dc143c", "#ab2837", "#7c2c31", "#4f2a2a", "#222222"]],
      green: [green, ["#7fff00", "#68c22c", "#518933", "#3a532e", "#222222"]],
      blue: [blue, ["#1e90ff", "#2973c2", "#2c5789", "#293c53", "#222222"]],
    },
    50: {
      red: [red, ["#dc143c", "#c03e48", "#a45052", "#855c5b", "#636363"]],
      green: [green, ["#7fff00", "#7cd746", "#76af59", "#6e8961", "#636363"]],
      blue: [blue, ["#1e90ff", "#3e86d7", "#4f7cb0", "#5b7089", "#636363"]],
    },
    75: {
      red: [red, ["#dc143c", "#d6525a", "#ce7576", "#c19392", "#aeaeae"]],
      green: [green, ["#7fff00", "#90ec5d", "#9dd880", "#a6c399", "#aeaeae"]],
      blue: [blue, ["#1e90ff", "#529aec", "#74a2d9", "#92a9c4", "#aeaeae"]],
    },
    100: {
      red: [red, ["#dc143c", "#ec666c", "#f89c9b", "#ffcecc", "#ffffff"]],
      green: [green, ["#7fff00", "#a4ff72", "#c4ffa7", "#e2ffd5", "#ffffff"]],
      blue: [blue, ["#1e90ff", "#65aeff", "#9acaff", "#cde5ff", "#ffffff"]],
    },
  };

  it("should correctly simulate contrast sensitivity on sample data set", () => {
    Object.entries(contrastSamples).forEach(([factor, data]) => {
      Object.values(data).forEach(([input, results]) => {
        results.forEach((output, pos) => {
          expect(contrast({ factor, severity: 25 * pos }, input)).toBe(output);
        });
      });
    });
  });
});

run();
// contrast Tests:1 ends here
