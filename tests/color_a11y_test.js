// [[file:../README.org::*Color Accessibility Assertions][Color Accessibility Assertions:1]]
import { clrs, contrast } from "../color_a11y.js";
import { shades, tints } from "../color_palette.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

const Colors = [
  ["navy", "#001f3f"],
  ["blue", "#0074d9"],
  ["aqua", "#7fdbff"],
  ["teal", "#39cccc"],
  ["olive", "#3d9970"],
  ["green", "#2ecc40"],
  ["lime", "#01ff70"],
  ["yellow", "#ffdc00"],
  ["orange", "#ff851b"],
  ["red", "#ff4136"],
  ["maroon", "#85144b"],
  ["fuchsia", "#f012be"],
  ["purple", "#b10dc9"],
  ["black", "#111111"],
  ["gray", "#aaaaaa"],
  ["grey", "#aaaaaa"],
  ["silver", "#dddddd"],
  ["white", "#ffffff"],
];

Colors.forEach(([name, value]) =>
  Deno.test(`SPEC clrs: ${value} matches ${name}`, function () {
    assertEquals(clrs(name), value);
  })
);

Deno.test("EDGE clrs: rejects undefined color", function () {
  assertThrows(
    () => {
      throw clrs("invalid");
    },
    undefined,
    "color not defined in Colors",
  );
});

Deno.test(
  "SPEC contrast: returns the colors from a palette that can be used with a background and satisfy AA usability",
  function () {
    const color = clrs("red");
    const [bg] = tints(5, 99, color).reverse();
    const dark = shades(5, 99, color);

    assertEquals(contrast({ rating: "AA" }, bg, dark), [
      "#e43930",
      "#c6322a",
      "#a32a23",
      "#751e19",
      "#1a0705",
    ]);
  },
);

Deno.test(
  "SPEC contrast: returns the colors that satisfy AAA usability",
  function () {
    const color = clrs("red");
    const [bg] = tints(5, 99, color).reverse();
    const dark = shades(5, 99, color);

    assertEquals(contrast({ rating: "AAA" }, bg, dark), [
      "#c6322a",
      "#a32a23",
      "#751e19",
      "#1a0705",
    ]);
  },
);

Deno.test(
  "SPEC contrast: respects the enhanced rating boolean property",
  function () {
    const color = clrs("red");
    const [bg] = tints(5, 99, color).reverse();
    const dark = shades(5, 99, color);

    assertEquals(contrast({ rating: "AA", enhanced: true }, bg, dark), [
      "#c6322a",
      "#a32a23",
      "#751e19",
      "#1a0705",
    ]);

    assertEquals(contrast({ rating: "AAA", enhanced: true }, bg, dark), [
      "#a32a23",
      "#751e19",
      "#1a0705",
    ]);
  },
);
// Color Accessibility Assertions:1 ends here
