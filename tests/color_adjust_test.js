// [[file:../README.org::*Color Adjustment Assertions][Color Adjustment Assertions:1]]
import {
  a,
  alpha,
  h,
  hue,
  l,
  lightness,
  luminance,
  s,
  sat,
  saturation,
  transparency,
} from "../color_adjust.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC hue: can adjust clockwise", function () {
  const color = "red";

  assertEquals(hue(15, color), "#fa2a00");
  assertEquals(hue(30, color), "#ef4600");
  assertEquals(hue(45, color), "#de5f00");
  assertEquals(hue(60, color), "#c57500");
  assertEquals(hue(75, color), "#a58900");
  assertEquals(hue(90, color), "#7b9900");
});

Deno.test("SPEC hue: can adjust counterclockwise", function () {
  const color = "lime";

  assertEquals(hue(-15, color), "#9bf200");
  assertEquals(hue(-30, color), "#dbe100");
  assertEquals(hue(-45, color), "#ffcc00");
  assertEquals(hue(-60, color), "#ffb400");
  assertEquals(hue(-75, color), "#ff9b00");
  assertEquals(hue(-90, color), "#ff8300");
});

Deno.test("SPEC hue: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#ffdef1"],
    ["midnightblue", "#432300"],
    ["rgb(255, 133, 30)", "rgb(0, 186, 255)"],
    ["hsl(300, 40%, 70%)", "hsl(125, 34.021%, 61.961%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(0% 46.667% 0% 0%)"],
    ["hwb(120 30% 20%)", "hwb(294 47.843% 3.9216%)"],
    ["lab(36.44% 30 -79)", "lab(39.711% 31.523 49.911)"],
    ["lch(63.198% 36 135)", "lch(60.635% 35.048 318.44)"],
    ["oklab(56% 0.25 240)", "oklab(56% 0.25 60)"],
  ];

  colors.forEach(([input, target]) => assertEquals(hue(180, input), target));
});

Deno.test("EDGE hue: rejects invalid color", function () {
  assertThrows(
    () => {
      throw hue(16, "invalid");
    },
    undefined,
    "not a valid CSS color",
  );
});

Deno.test("ALIAS h of hue", function () {
  assertEquals(h(33, "hwb(60 38% 0%)"), "hwb(114 64.314% 0%)");
});

Deno.test("SPEC saturation: can saturate a color", function () {
  const color = "cadetblue";

  assertEquals(saturation(4, color), "#48a1a4");
  assertEquals(saturation(8, color), "#22a5a9");
  assertEquals(saturation(16, color), "#00abb2");
  assertEquals(saturation(32, color), "#00b5c3");
  assertEquals(saturation(64, color), "#00c5e6");
});

Deno.test("SPEC saturation: can desaturate a color", function () {
  const color = "chartreuse";

  assertEquals(saturation(-4, color), "#88fd39");
  assertEquals(saturation(-8, color), "#91fb51");
  assertEquals(saturation(-16, color), "#a0f673");
  assertEquals(saturation(-32, color), "#bceba6");
  assertEquals(saturation(-64, color), "#dbdbdb");
});

Deno.test("SPEC saturation: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#efefef"],
    ["midnightblue", "#2b2b2b"],
    ["rgb(255, 133, 30)", "rgb(171, 171, 171)"],
    ["hsl(300, 40%, 70%)", "hsl(0, 0%, 67.451%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(7.7982% 0% 7.7982% 14.51%)"],
    ["hwb(120 30% 20%)", "hwb(0 67.843% 32.157%)"],
    ["lab(36.44% 30 -79)", "lab(39.49% 0 0)"],
    ["lch(63.198% 36 135)", "lch(62.082% 0 0)"],
    ["oklab(56% 0.25 240)", "oklab(56% 0.010000000000000009 240)"],
  ];

  colors.forEach(([input, target]) =>
    assertEquals(saturation(-48, input), target)
  );
});

Deno.test("EDGE saturation: rejects invalid color", function () {
  assertThrows(
    () => {
      throw saturation(16, "invalid");
    },
    undefined,
    "not a valid CSS color",
  );
});

Deno.test("ALIAS sat of saturation", function () {
  assertEquals(sat(-16, "chocolate"), "#b07d61");
});

Deno.test("ALIAS s of saturation", function () {
  assertEquals(s(-8, "burlywood"), "#cebca5");
});

Deno.test("SPEC lightness: can lighten a color", function () {
  const color = "midnightblue";

  assertEquals(lightness(4, color), "#21267d");
  assertEquals(lightness(8, color), "#293289");
  assertEquals(lightness(16, color), "#3c4aa3");
  assertEquals(lightness(32, color), "#677ad8");
  assertEquals(lightness(64, color), "#c7e0ff");
});

Deno.test("SPEC lightness: can darken a color", function () {
  const color = "cornsilk";

  assertEquals(lightness(-4, color), "#f2ebcf");
  assertEquals(lightness(-8, color), "#e4ddc2");
  assertEquals(lightness(-16, color), "#cac4a9");
  assertEquals(lightness(-32, color), "#989278");
  assertEquals(lightness(-64, color), "#3d3721");
});

Deno.test("SPEC lightness: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#cffffe"],
    ["midnightblue", "#95acff"],
    ["rgb(255, 133, 30)", "rgb(255, 219, 131)"],
    ["hsl(300, 40%, 70%)", "hsl(300, 100%, 95.098%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(59.608% 0% 50.98% 0%)"],
    ["hwb(120 30% 20%)", "hwb(117 62.745% 0%)"],
    ["lab(36.44% 30 -79)", "lab(88.646% -18.579 -17.461)"],
    ["lch(63.198% 36 135)", "lch(96.589% 25.863 133.94)"],
    ["oklab(56% 0.25 240)", "oklab(100% 0.25 240)"],
  ];

  colors.forEach(([input, target]) =>
    assertEquals(lightness(48, input), target)
  );
});

Deno.test("EDGE lightness: rejects invalid color", function () {
  assertThrows(
    () => {
      throw lightness(16, "invalid");
    },
    undefined,
    "not a valid CSS color",
  );
});

Deno.test("ALIAS luminance of lightness", function () {
  assertEquals(
    luminance(12, "lab(38.1993% -39 -147.39)"),
    "lab(63.564% -4.8385 -56.459)",
  );
});

Deno.test("ALIAS l of lightness", function () {
  assertEquals(l(30, "slategray"), "#ccdef0");
});

Deno.test("SPEC alpha: can increase", function () {
  const color = "#abcdef68";

  assertEquals(alpha(4, color), "#abcdef72");
  assertEquals(alpha(8, color), "#abcdef7c");
  assertEquals(alpha(16, color), "#abcdef91");
  assertEquals(alpha(32, color), "#abcdefba");
  assertEquals(alpha(64, color), "#abcdef");
});

Deno.test("SPEC alpha: can decrease", function () {
  const color = "#abcdef";

  assertEquals(alpha(-4, color), "#abcdeff5");
  assertEquals(alpha(-8, color), "#abcdefeb");
  assertEquals(alpha(-16, color), "#abcdefd6");
  assertEquals(alpha(-32, color), "#abcdefad");
  assertEquals(alpha(-64, color), "#abcdef5c");
});

Deno.test("SPEC alpha: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#c0ffeebf"],
    ["midnightblue", "#191970bf"],
    ["rgb(255, 133, 30)", "rgba(255, 133, 30, 0.75)"],
    ["hsl(300, 40%, 70%)", "hsla(300, 39.869%, 70%, 0.75)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(89.804% 0% 69.804% 0% / 0.75)"],
    ["hwb(120 30% 20%)", "hwb(120 30.196% 20% / 0.75)"],
    ["lab(36.44% 30 -79)", "lab(36.39% 30.198 -79.154 / 0.75)"],
    ["lch(63.198% 36 135)", "lch(63.182% 35.872 135.17 / 0.75)"],
    ["oklab(56% 0.25 240)", "oklab(56% 0.25 240 / 0.75)"],
  ];

  colors.forEach(([input, target]) => assertEquals(alpha(-25, input), target));
});

Deno.test("ALIAS transparency of alpha", function () {
  assertEquals(transparency(-25, "#deaded"), "#deadedbf");
});

Deno.test("ALIAS a of alpha", function () {
  assertEquals(a(-64, "#deaded"), "#deaded5c");
});
// Color Adjustment Assertions:1 ends here
