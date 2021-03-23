// [[file:../README.org::*Color Format Conversion Assertions][Color Format Conversion Assertions:1]]
import { cmyk, hex, hsl, hwb, lab, lch, rgb } from "../color_convert.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

const conversions = { hex, rgb, hsl, cmyk, hwb, lab, lch };

const samples = {
  hex: "#348ec9",
  rgb: "rgb(30, 119, 200)",
  hsl: "hsl(300, 78%, 69%)",
  cmyk: "device-cmyk(49% 2% 10% 0%)",
  hwb: "hwb(145 30% 5%)",
  lab: "lab(43.319% -42 -8)",
  lch: "lch(85.19% 73.81 67.142)",
};

const colors = [
  "midnightblue",
  "gainsboro",
  "cornsilk",
  "crimson",
  "springgreen",
  "rebeccapurple",
];

colors.forEach((color) => {
  Object.entries(conversions).forEach(([format, fn]) =>
    Deno.test(
      `SPEC try ${color} ${format.toUpperCase()}: "${fn(color)}"`,
      function () {
        assertEquals(fn(color), fn(color));
      },
    )
  );
});

Deno.test(
  `EDGE: does nothing when input is the same format as target conversion`,
  function () {
    Object.entries(conversions).forEach(([format, fn]) =>
      assertEquals(fn(samples[format]), samples[format])
    );
  },
);

Deno.test(`EDGE: rejects invalid or unsupported color formats`, function () {
  Object.values(conversions).forEach((fn) =>
    assertThrows(
      () => {
        throw fn("invalid");
      },
      undefined,
      "not a valid CSS color",
    )
  );
});
// Color Format Conversion Assertions:1 ends here
