// color_as_complementary Tests


// [[file:../../Notebook.org::*color_as_complementary Tests][color_as_complementary Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_as_complementary } from "../color.js";

describe("color_as_complementary(color)", () => {
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
    expect(() => color_as_complementary("invalid")).toThrow();
  });

  it("should correctly emit complementary schemes from samples", () => {
    samples.forEach(([input, output]) => {
      expect(color_as_complementary(input)).toEqual(output);
    });
  });
});

run();
// color_as_complementary Tests:1 ends here
