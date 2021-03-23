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

Deno.test("SPEC contrast: can generate WCAG AA compliant results", function () {
  const base = clrs("red");
  const palette = [base, ...tints(16, 99, base), ...shades(16, 99, base)];

  assertEquals(contrast({ rating: "AA" }, palette), [
    "#ff4136",
    "#ffefef",
    "#fff7f6",
    "#fffefe",
    "#721d18",
    "#5c1713",
    "#43110e",
    "#1a0705",
  ]);
});

Deno.test("SPEC contrast: can generate WCAG AAA compliant results", function () {
  const base = clrs("lime");
  const palette = [base, ...tints(32, 99, base), ...shades(32, 99, base)];

  assertEquals(contrast({ rating: "AAA" }, palette), [
    "#01ff70",
    "#007232",
    "#00662c",
    "#005c28",
    "#005123",
    "#00431e",
    "#003316",
    "#001a0b",
  ]);
});

Deno.test("SPEC contrast: can generate WCAG AA (enhanced) compliant results", function () {
  const base = clrs("aqua");
  const palette = [base, ...tints(32, 99, base), ...shades(32, 99, base)];

  assertEquals(contrast({ rating: "AA", enhanced: true }, palette), [
    "#7fdbff",
    "#335866",
    "#2e4f5c",
    "#284551",
    "#223a43",
    "#192c33",
    "#0d161a",
  ]);
});

Deno.test("SPEC contrast: can generate WCAG AAA (enhanced) compliant results", function () {
  const base = clrs("silver");
  const palette = [base, ...tints(32, 99, base), ...shades(32, 99, base)];

  assertEquals(contrast({ rating: "AAA", enhanced: true }, palette), [
    "#dddddd",
    "#3a3a3a",
    "#2c2c2c",
    "#161616",
  ]);
});
// Color Accessibility Assertions:1 ends here
