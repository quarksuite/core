// [[file:../../../Notebook.org::*clash Tests][clash Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { clash } from "../color.js";

describe("clash(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#7b9900", "#a34fff"]],
    ["orange", ["#ffa500", "#23dc96", "#ff8cdc"]],
    ["yellow", ["#ffff00", "#00ffff", "#ffb3b9"]],
    ["lime", ["#00ff00", "#00e9ff", "#ff8300"]],
    ["cyan", ["#00ffff", "#d5d0ff", "#f0e55d"]],
    ["blue", ["#0000ff", "#c00061", "#008048"]],
    ["purple", ["#800080", "#931700", "#0051a8"]],
    ["magenta", ["#ff00ff", "#ff3800", "#00a6ff"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => clash("invalid")).toThrow();
  });

  it("should correctly emit clashing schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(clash(input)).toEqual(output);
    });
  });
});

run();
// clash Tests:1 ends here
