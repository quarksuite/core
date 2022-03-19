// [[file:../../../Notebook.org::*hexagon Tests][hexagon Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { hexagon } from "../color.js";

describe("hexagon(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#c57500", "#00ae00", "#00a9db", "#4f6fff", "#d62fd2"]],
    [
      "orange",
      ["#ffa500", "#95d150", "#00dcd5", "#5bc0ff", "#de99ff", "#ff88a1"],
    ],
    [
      "yellow",
      ["#ffff00", "#00ffde", "#00ffff", "#f4d8ff", "#ffb3ff", "#ffc461"],
    ],
    [
      "lime",
      ["#00ff00", "#00ffff", "#61c4ff", "#ff7dff", "#ff6072", "#ffb400"],
    ],
    [
      "cyan",
      ["#00ffff", "#96e3ff", "#ffbfff", "#ffb3bf", "#ffd05c", "#b3f78b"],
    ],
    [
      "blue",
      ["#0000ff", "#9e00b2", "#ce0000", "#a02000", "#007700", "#0075a4"],
    ],
    [
      "purple",
      ["#800080", "#9c0000", "#773e00", "#006600", "#006384", "#253ab4"],
    ],
    [
      "magenta",
      ["#ff00ff", "#ff0000", "#ef8200", "#00cd00", "#00c8ff", "#527aff"],
    ],
  ];

  it("should reject invalid colors", () => {
    expect(() => hexagon("invalid")).toThrow();
  });

  it("should correctly emit hexagon schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(hexagon(input)).toEqual(output);
    });
  });
});

run();
// hexagon Tests:1 ends here
