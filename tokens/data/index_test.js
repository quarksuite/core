// [[file:../../README.org::*Data Format Assertions][Data Format Assertions:1]]
import { raw, yaml } from "./index.js";
import { clrs, shades, tints, triadic } from "../../color/index.js";

import { assertStrictEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";

const swatch = clrs("red");
const [main, accent, highlight] = triadic(swatch);
const light = tints.bind(null, 3, 99);
const dark = shades.bind(null, 2, 99);

const dict = {
  color: {
    main: {
      base: main,
      light: light(main),
      dark: dark(main),
    },
    accent: {
      base: accent,
      dark: dark(accent),
    },
    highlight,
  },
};

Deno.test(
  "SPEC raw: transforms a dictionary into its raw JSON data",
  function () {
    assertStrictEquals(
      raw(dict),
      `{
  "color": {
    "main": {
      "base": "#ff4036",
      "light": [
        "#ff9d99",
        "#ffd3d2",
        "#fffefe"
      ],
      "dark": [
        "#b42d26",
        "#1a0605"
      ]
    },
    "accent": {
      "base": "#4036ff",
      "dark": [
        "#2d26b4",
        "#06051a"
      ]
    },
    "highlight": "#36ff40"
  }
}`,
    );
  },
);

Deno.test(
  "SPEC yaml: transforms a dictionary to YAML formatted data",
  function () {
    assertStrictEquals(
      yaml(dict),
      `
color:
  main:
    base: #ff4036
    light:
      - #ff9d99
      - #ffd3d2
      - #fffefe
    dark:
      - #b42d26
      - #1a0605
  accent:
    base: #4036ff
    dark:
      - #2d26b4
      - #06051a
  highlight: #36ff40`,
    );
  },
);
// Data Format Assertions:1 ends here
