// [[file:../../../README.org::*Color Mixing Assertions][Color Mixing Assertions:1]]
import { mix } from "./index.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC mix: can mix colors", function () {
  const red = "rgb(255, 0, 0)";
  const yellow = "rgb(255, 255, 0)";
  const green = "rgb(0, 255, 0)";
  const cyan = "rgb(0, 255, 255)";
  const blue = "rgb(0, 0, 255)";
  const magenta = "rgb(255, 0, 255)";

  const colors = [
    [red, "rgb(255, 180, 0)", yellow],
    [red, "rgb(180, 180, 0)", green],
    [red, "rgb(180, 180, 180)", cyan],
    [red, "rgb(180, 0, 180)", blue],
    [red, "rgb(255, 0, 180)", magenta],
    [yellow, "rgb(180, 255, 0)", green],
    [yellow, "rgb(180, 255, 180)", cyan],
    [yellow, "rgb(180, 180, 180)", blue],
    [yellow, "rgb(255, 180, 180)", magenta],
    [green, "rgb(0, 255, 180)", cyan],
    [green, "rgb(0, 180, 180)", blue],
    [green, "rgb(180, 180, 180)", magenta],
    [cyan, "rgb(0, 180, 255)", blue],
    [cyan, "rgb(180, 180, 255)", magenta],
    [blue, "rgb(180, 0, 255)", magenta],
  ];

  colors.forEach(([color, blend, target]) =>
    assertEquals(mix(50, target, color), blend)
  );
});

Deno.test("SPEC mix: can mix colors with alpha property", function () {
  assertEquals(mix(50, "#ce9ddaef", "#c91193"), "#cc70baf7");
  assertEquals(mix(75, "#deaded", "#face"), "#e7ace5fb");
  assertEquals(mix(95, "#3ad9cfc5", "#cc911df9"), "#49d6cac8");
});

Deno.test("SPEC mix: can mix colors of any valid format", function () {
  const colors = [
    ["#c99faa", "#ed5f66", "red"],
    ["rgb(118, 20, 250)", "rgb(216, 204, 150)", "yellow"],
    ["hsl(320, 70%, 31%)", "hsl(111, 59.514%, 51.569%)", "lime"],
    [
      "device-cmyk(0% 79% 32% 0%)",
      "device-cmyk(33.188% 9.6069% 0% 10.196%)",
      "cyan",
    ],
    ["hwb(148 28% 38%)", "hwb(222 16.863% 15.686%)", "blue"],
    ["lab(46.48% -38 120)", "lab(54.802% 64.129 -40.944)", "magenta"],
    ["lch(89.311% 63 300)", "lch(80.804% 32.723 315.73)", "#deaded"],
  ];

  colors.forEach(([color, blend, target]) =>
    assertEquals(mix(64, target, color), blend)
  );
});

Deno.test("EDGE mix: throws error when either color is invalid", function () {
  assertThrows(
    () => {
      throw mix(40, "invalid", "#c0ffee");
    },
    undefined,
    "not a valid CSS color",
  );
  assertThrows(
    () => {
      throw mix(40, "#deaded", "c0ffee");
    },
    undefined,
    "not a valid CSS color",
  );
  assertThrows(
    () => {
      throw mix(40, "invalid", "c0ffee");
    },
    undefined,
    "not a valid CSS color",
  );
});
// Color Mixing Assertions:1 ends here
