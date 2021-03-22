// [[file:README.org::*Data Export Assertions][Data Export Assertions:1]]
import { raw, yaml } from "./export_data.js";
import { clrs } from "./color_a11y.js";
import { triadic } from "./color_scheme.js";
import { shades, tints } from "./color_palette.js";

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
  "SPEC raw: exports dictionary data as raw JSON",
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
  "SPEC yaml: exports dictionary data as YAML",
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
// Data Export Assertions:1 ends here
