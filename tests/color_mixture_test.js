// [[file:../README.org::*Color Mixture Assertions][Color Mixture Assertions:1]]
import { mix } from "../color.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC mix: can mix colors freely", function () {
  const red = "#f00";
  const yellow = "#ff0";
  const green = "#0f0";
  const cyan = "#0ff";
  const blue = "#00f";
  const magenta = "#f0f";
  const white = "#fff";
  const gray = "#808080";
  const black = "#000";

  const colors = [
    [red, "#ff6a00", "#ffa000", "#ffd100", "#ffff00", yellow],
    [red, "#ed7300", "#d0a801", "#a0d500", "#00ff00", green],
    [red, "#ee745b", "#d2a993", "#a3d6c9", "#00ffff", cyan],
    [red, "#c6496d", "#8c53a2", "#5147d2", "#0000ff", blue],
    [red, "#fe2464", "#fd2d9b", "#fe28ce", "#ff00ff", magenta],
    [red, "#ff6b59", "#ffa191", "#ffd1c8", "#ffffff", white],
    [red, "#e3493a", "#c66356", "#a5746c", "#808080", gray],
    [red, "#ae0000", "#630000", "#220000", "#000000", black],
    [yellow, "#daff00", "#b0ff00", "#7cff00", "#00ff00", green],
    [yellow, "#daff7c", "#b0ffb0", "#7cffda", "#00ffff", cyan],
    [yellow, "#b5d797", "#6cabc7", "#1d77e7", "#0000ff", blue],
    [yellow, "#ffd88a", "#ffadbc", "#ff79e1", "#ff00ff", magenta],
    [yellow, "#feff78", "#feffac", "#feffd7", "#ffffff", white],
    [yellow, "#dddf54", "#bdbf6c", "#9e9f79", "#808080", gray],
    [yellow, "#aeae00", "#636300", "#222200", "#000000", black],
    [green, "#00ff74", "#00ffa9", "#00ffd6", "#00ffff", cyan],
    [green, "#00d68d", "#00aabf", "#0075e2", "#0000ff", blue],
    [green, "#95dc81", "#c6b4b4", "#e780dc", "#ff00ff", magenta],
    [green, "#79ff71", "#adffa6", "#d8ffd4", "#ffffff", white],
    [green, "#54df4e", "#6dc067", "#7aa076", "#808080", gray],
    [green, "#00ae00", "#006300", "#002200", "#000000", black],
    [cyan, "#00d1ff", "#00a0ff", "#006aff", "#0000ff", blue],
    [cyan, "#9bd8ff", "#ccacff", "#ea78ff", "#ff00ff", magenta],
    [cyan, "#7dffff", "#b1ffff", "#daffff", "#ffffff", white],
    [cyan, "#58dede", "#70bebe", "#7c9f9e", "#808080", gray],
    [cyan, "#00aeae", "#006363", "#002222", "#000000", black],
    [blue, "#572dff", "#9038ff", "#c732ff", "#ff00ff", magenta],
    [blue, "#306dff", "#73a3ff", "#b8d2ff", "#ffffff", white],
    [blue, "#144ae2", "#3b64c4", "#5e75a4", "#808080", gray],
    [blue, "#0000ae", "#000063", "#000022", "#000000", black],
    [magenta, "#ff71ff", "#ffa6ff", "#ffd4ff", "#ffffff", white],
    [magenta, "#e14edf", "#c367c0", "#a376a0", "#808080", gray],
    [magenta, "#ae00ae", "#630063", "#220022", "#000000", black],
    [white, "#dedede", "#bdbdbd", "#9e9e9e", "#808080", gray],
    [white, "#aeaeae", "#636363", "#222222", "#000000", black],
    [gray, "#555555", "#2e2e2e", "#0b0b0b", "#000000", black],
  ];

  colors.forEach(([color, slightly, evenly, heavily, fully, target]) => {
    assertEquals(mix(25, target, color), slightly);
    assertEquals(mix(50, target, color), evenly);
    assertEquals(mix(75, target, color), heavily);
    assertEquals(mix(100, target, color), fully);
  });
});

Deno.test("SPEC mix: can mix colors with alpha property", function () {
  assertEquals(mix(50, "#ce9ddaef", "#c91193"), "#cf67b6f7");
  assertEquals(mix(75, "#deaded", "#face"), "#e6ade5fb");
  assertEquals(mix(95, "#3ad9cfc5", "#cc911df9"), "#4dd6c8c8");
});

Deno.test("SPEC mix: can mix colors of any valid format", function () {
  const colors = [
    ["#c99faa", "#f05e56", "red"],
    ["rgb(118, 20, 250)", "rgb(194, 194, 169)", "yellow"],
    ["hsl(320, 70%, 31%)", "hsl(93, 38.462%, 51.569%)", "lime"],
    [
      "device-cmyk(0% 79% 32% 0%)",
      "device-cmyk(18.667% 12% 0% 11.765%)",
      "cyan",
    ],
    ["hwb(148 28% 38%)", "hwb(211 0% 17.647%)", "blue"],
    ["lab(46.48% -38 120)", "lab(55.959% 46.101 -25.021)", "magenta"],
    ["lch(89.311% 63 300)", "lch(80.57% 33.332 315.903)", "#deaded"],
    [
      "oklab(49% 0.3 78)",
      "oklab(78.6333% 0.11027189298674138 100.66588617825195)",
      "#c0ffee",
    ],
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
// Color Mixture Assertions:1 ends here
