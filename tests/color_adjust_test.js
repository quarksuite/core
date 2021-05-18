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

  assertEquals(hue(15, color), "#e64800");
  assertEquals(hue(30, color), "#c86700");
  assertEquals(hue(45, color), "#a37b00");
  assertEquals(hue(60, color), "#798a00");
  assertEquals(hue(75, color), "#3e9500");
  assertEquals(hue(90, color), "#009c00");
});

Deno.test("SPEC hue: can adjust counterclockwise", function () {
  const color = "lime";

  assertEquals(hue(-15, color), "#8ef600");
  assertEquals(hue(-30, color), "#cce900");
  assertEquals(hue(-45, color), "#ffd900");
  assertEquals(hue(-60, color), "#ffc400");
  assertEquals(hue(-75, color), "#ffaa00");
  assertEquals(hue(-90, color), "#ff8c46");
});

Deno.test("SPEC hue: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#ffe2f6"],
    ["midnightblue", "#112d00"],
    ["rgb(255, 133, 30)", "rgb(0, 193, 255)"],
    ["hsl(300, 40%, 70%)", "hsl(129, 31.428%, 58.824%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(0% 37.647% 0% 0%)"],
    ["hwb(120 30% 20%)", "hwb(293 54.51% 0%)"],
    ["lab(36.44% 30 -79)", "lab(36.44% -30 79)"],
    ["lch(63.198% 36 135)", "lch(63.198% 36 315)"],
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
  assertEquals(h(33, "hwb(60 38% 0%)"), "hwb(106 54.118% 0%)");
});

Deno.test("SPEC saturation: can saturate a color", function () {
  const color = "cadetblue";

  assertEquals(saturation(4, color), "#4fa0a3");
  assertEquals(saturation(8, color), "#34a3a6");
  assertEquals(saturation(16, color), "#00a6ac");
  assertEquals(saturation(32, color), "#00aeb9");
  assertEquals(saturation(64, color), "#00b9d4");
});

Deno.test("SPEC saturation: can desaturate a color", function () {
  const color = "chartreuse";

  assertEquals(saturation(-4, color), "#86fe25");
  assertEquals(saturation(-8, color), "#8ffc3a");
  assertEquals(saturation(-16, color), "#9bfa54");
  assertEquals(saturation(-32, color), "#b2f57d");
  assertEquals(saturation(-64, color), "#d5e9c3");
});

Deno.test("SPEC saturation: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#f2f2f2"],
    ["midnightblue", "#262626"],
    ["rgb(255, 133, 30)", "rgb(194, 161, 139)"],
    ["hsl(300, 40%, 70%)", "hsl(0, 0%, 65.882%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(24.576% 0% 26.695% 7.451%)"],
    ["hwb(120 30% 20%)", "hwb(110 65.098% 27.843%)"],
    ["lab(36.44% 30 -79)", "lab(36.44% 7.4552 -19.632)"],
    ["lch(63.198% 36 135)", "lch(63.198% 0 135)"],
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
  assertEquals(sat(-16, "chocolate"), "#c07442");
});

Deno.test("ALIAS s of saturation", function () {
  assertEquals(s(-8, "burlywood"), "#d5ba9a");
});

Deno.test("SPEC lightness: can lighten a color", function () {
  const color = "midnightblue";

  assertEquals(lightness(4, color), "#26227b");
  assertEquals(lightness(8, color), "#322a85");
  assertEquals(lightness(16, color), "#483c9a");
  assertEquals(lightness(32, color), "#7362c6");
  assertEquals(lightness(64, color), "#ccb5ff");
});

Deno.test("SPEC lightness: can darken a color", function () {
  const color = "cornsilk";

  assertEquals(lightness(-4, color), "#f5eed2");
  assertEquals(lightness(-8, color), "#e9e2c7");
  assertEquals(lightness(-16, color), "#d2ccb1");
  assertEquals(lightness(-32, color), "#a7a086");
  assertEquals(lightness(-64, color), "#555039");
});

Deno.test("SPEC lightness: can adjust all supported formats", function () {
  const colors = [
    ["#c0ffee", "#cdfffb"],
    ["midnightblue", "#9f8bf4"],
    ["rgb(255, 133, 30)", "rgb(255, 220, 117)"],
    ["hsl(300, 40%, 70%)", "hsl(300, 100%, 95.882%)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(64.314% 0% 56.078% 0%)"],
    ["hwb(120 30% 20%)", "hwb(114 58.431% 0%)"],
    ["lab(36.44% 30 -79)", "lab(84% 30 -79)"],
    ["lch(63.198% 36 135)", "lch(100% 36 135)"],
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
    "lab(50% -38.997 -147.39)",
  );
});

Deno.test("ALIAS l of lightness", function () {
  assertEquals(l(30, "slategray"), "#c0d1e3");
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
    ["rgb(255, 133, 30)", "rgba(255, 133, 30, 0.75)"],
    ["hsl(300, 40%, 70%)", "hsla(300, 39.869%, 70%, 0.75)"],
    ["device-cmyk(90% 0% 70% 0%)", "device-cmyk(89.804% 0% 69.804% 0% / 0.75)"],
    ["hwb(120 30% 20%)", "hwb(120 30.196% 20% / 0.75)"],
    ["lab(36.44% 30 -79)", "lab(36.44% 30 -79 / 0.75)"],
    ["lch(63.198% 36 135)", "lch(63.198% 36 135 / 0.75)"],
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
