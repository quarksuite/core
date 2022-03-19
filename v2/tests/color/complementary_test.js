// [[file:../../../Notebook.org::*complementary Tests][complementary Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { complementary } from "../color.js";

describe("complementary(color)", () => {
  const samples = [
    ["red", ["#ff0000", "#00a9db"]],
    ["orange", ["#ffa500", "#5bc0ff"]],
    ["yellow", ["#ffff00", "#f4d8ff"]],
    ["lime", ["#00ff00", "#ff7dff"]],
    ["cyan", ["#00ffff", "#ffb3bf"]],
    ["blue", ["#0000ff", "#a02000"]],
    ["purple", ["#800080", "#006600"]],
    ["magenta", ["#ff00ff", "#00cd00"]],
  ];

  it("should reject invalid colors", () => {
    expect(() => complementary("invalid")).toThrow();
  });

  it("should correctly emit complementary schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(complementary(input)).toEqual(output);
    });
  });
});

run();
// complementary Tests:1 ends here
