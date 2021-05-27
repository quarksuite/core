// [[file:../README.org::*Color Scale Assertions][Color Scale Assertions:1]]
import { shades, tints, tones } from "../color_scale.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC tints: can generate tints", function () {
  assertEquals(tints(2, 100, "red"), ["#ffb4b4", "#ffffff"]);
  assertEquals(tints(3, 100, "lime"), ["#92ff92", "#d1ffd1", "#ffffff"]);
  assertEquals(tints(4, 100, "blue"), [
    "#8080ff",
    "#b4b4ff",
    "#ddddff",
    "#ffffff",
  ]);
});

Deno.test("SPEC tones: can generate tones", function () {
  assertEquals(tones(2, 100, "red"), ["#ca5b5b", "#808080"]);
  assertEquals(tones(3, 100, "lime"), ["#4add4a", "#69b469", "#808080"]);
  assertEquals(tones(4, 100, "blue"), [
    "#4040e6",
    "#5b5bca",
    "#6f6fa9",
    "#808080",
  ]);
});

Deno.test("SPEC shades: can generate shades", function () {
  assertEquals(shades(2, 100, "red"), ["#b40000", "#000000"]);
  assertEquals(shades(3, 100, "lime"), ["#00d100", "#009200", "#000000"]);
  assertEquals(shades(4, 100, "blue"), [
    "#0000dd",
    "#0000b4",
    "#000080",
    "#000000",
  ]);
});
// Color Scale Assertions:1 ends here
