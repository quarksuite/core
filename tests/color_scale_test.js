// [[file:../README.org::*Color Scale Assertions][Color Scale Assertions:1]]
import { shades, tints, tones } from "../color_scale.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC tints: can generate tints", function () {
  assertEquals(tints(2, 100, "red"), ["#ffa191", "#ffffff"]);
  assertEquals(tints(3, 100, "lime"), ["#8cff84", "#caffc5", "#ffffff"]);
  assertEquals(tints(4, 100, "blue"), [
    "#306fff",
    "#73a4ff",
    "#b8d2ff",
    "#ffffff",
  ]);
});

Deno.test("SPEC tones: can generate tones", function () {
  assertEquals(tones(2, 100, "red"), ["#c66356", "#808080"]);
  assertEquals(tones(3, 100, "lime"), ["#5ed558", "#77ab72", "#808080"]);
  assertEquals(tones(4, 100, "blue"), [
    "#144be2",
    "#3b64c4",
    "#5e75a4",
    "#808080",
  ]);
});

Deno.test("SPEC shades: can generate shades", function () {
  assertEquals(shades(2, 100, "red"), ["#630000", "#000000"]);
  assertEquals(shades(3, 100, "lime"), ["#009400", "#003600", "#000000"]);
  assertEquals(shades(4, 100, "blue"), [
    "#0000ae",
    "#000063",
    "#000022",
    "#000000",
  ]);
});
// Color Scale Assertions:1 ends here
