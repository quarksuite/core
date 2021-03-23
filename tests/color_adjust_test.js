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
} from "./color_adjust.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC hue: can adjust clockwise", function () {
  const color = "red";

  assertEquals(hue(15, color), "#ff4000");
  assertEquals(hue(30, color), "#ff8000");
  assertEquals(hue(45, color), "#ffbf00");
  assertEquals(hue(60, color), "#ffff00");
  assertEquals(hue(75, color), "#bfff00");
  assertEquals(hue(90, color), "#80ff00");
});

Deno.test("SPEC hue: can adjust counterclockwise", function () {
  const color = "lime";

  assertEquals(hue(-15, color), "#40ff00");
  assertEquals(hue(-30, color), "#80ff00");
  assertEquals(hue(-45, color), "#bfff00");
  assertEquals(hue(-60, color), "#ffff00");
  assertEquals(hue(-75, color), "#ffbf00");
  assertEquals(hue(-90, color), "#ff8000");
});

Deno.test("SPEC hue: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#ffc0d1"],
    ["midnightblue", "#707019"],
    ["rgb(255, 133, 30)", "rgb(30, 154, 255)"],
    ["hsl(300, 40%, 70%)", "hsl(120, 40%, 70%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(0% 89.804% 19.608% 0%)"],
    ["hwb(120 30% 20%)", "hwb(300 30.196% 20%)"],
    ["lab(36.44% 30 -79)", "lab(72.191% 9.656 70.685)"],
    ["lch(63.198% 36 135)", "lch(51.614% 36.568 318.756)"],
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
  assertEquals(h(33, "hwb(60 38% 0%)"), "hwb(93 38.039% 0%)");
});

Deno.test("SPEC saturation: can saturate a color", function () {
  const color = "cadetblue";

  assertEquals(saturation(4, color), "#5ba2a4");
  assertEquals(saturation(8, color), "#55a7aa");
  assertEquals(saturation(16, color), "#4bb0b4");
  assertEquals(saturation(32, color), "#37c3c8");
  assertEquals(saturation(64, color), "#0ee9f1");
});

Deno.test("SPEC saturation: can desaturate a color", function () {
  const color = "chartreuse";

  assertEquals(saturation(-4, color), "#80fa05");
  assertEquals(saturation(-8, color), "#80f50a");
  assertEquals(saturation(-16, color), "#80eb14");
  assertEquals(saturation(-32, color), "#80d629");
  assertEquals(saturation(-64, color), "#80ad52");
});

Deno.test("SPEC saturation: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#cff0e7"],
    ["midnightblue", "#3a3a4f"],
    ["rgb(255, 133, 30)", "rgb(201, 137, 84)"],
    ["hsl(300, 40%, 70%)", "hsl(300, 0%, 70%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(59.5% 0% 46.5% 21.569%)"],
    ["hwb(120 30% 20%)", "hwb(120 51.765% 41.569%)"],
    ["lab(36.44% 30 -79)", "lab(43.941% 4.7393 -33.095)"],
    ["lch(63.198% 36 135)", "lch(56.315% 0 0)"],
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
  assertEquals(sat(-16, "chocolate"), "#bf6c31");
});

Deno.test("ALIAS s of saturation", function () {
  assertEquals(s(-8, "burlywood"), "#d8b78d");
});

Deno.test("SPEC lightness: can lighten a color", function () {
  const color = "midnightblue";

  assertEquals(lightness(4, color), "#1d1d81");
  assertEquals(lightness(8, color), "#212192");
  assertEquals(lightness(16, color), "#2828b3");
  assertEquals(lightness(32, color), "#5454d9");
  assertEquals(lightness(64, color), "#d9d9f7");
});

Deno.test("SPEC lightness: can darken a color", function () {
  const color = "cornsilk";

  assertEquals(lightness(-4, color), "#fff4c7");
  assertEquals(lightness(-8, color), "#fff0b3");
  assertEquals(lightness(-16, color), "#ffe88a");
  assertEquals(lightness(-32, color), "#ffd738");
  assertEquals(lightness(-64, color), "#947600");
});

Deno.test("SPEC lightness: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#ffffff"],
    ["midnightblue", "#3737d2"],
    ["rgb(255, 133, 30)", "rgb(255, 202, 158)"],
    ["hsl(300, 40%, 70%)", "hsl(300, 40%, 95%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(40% 0% 31.372% 0%)"],
    ["hwb(120 30% 20%)", "hwb(120 69.02% 9.0196%)"],
    ["lab(36.44% 30 -79)", "lab(65.959% 6.3644 -44.264)"],
    ["lch(63.198% 36 135)", "lch(82.966% 16.294 136.74)"],
  ];

  colors.forEach(([input, target]) =>
    assertEquals(lightness(25, input), target)
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
    "lab(61.316% 0 -60.022)",
  );
});

Deno.test("ALIAS l of lightness", function () {
  assertEquals(l(30, "slategray"), "#c6ccd2");
});

Deno.test("SPEC alpha: can increase", function () {
  const color = "#abcdef68";

  assertEquals(alpha(4, color), "#abcdef73");
  assertEquals(alpha(8, color), "#abcdef7d");
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
    ["rgb(255, 133, 30)", "rgba(255, 131, 30, 0.75)"],
    ["hsl(300, 40%, 70%)", "hsla(300, 40%, 70%, 0.75)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(89.804% 0% 70.196% 0% / 0.75)"],
    ["hwb(120 30% 20%)", "hwb(120 30.196% 20% / 0.75)"],
    ["lab(36.44% 30 -79)", "lab(36.64% 29.588 -78.743 / 0.75)"],
    ["lch(63.198% 36 135)", "lch(63.182% 35.872 135.17 / 0.75)"],
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
