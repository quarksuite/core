// [[file:../README.org::*CSS Format Assertions][CSS Format Assertions:1]]
import { css, less, sass, styl } from "./output_css.js";
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
  "SPEC css: can process dictionary into CSS custom properties",
  function () {
    assertStrictEquals(
      css(dict),
      `
:root {
  --color-main: #ff4036;
  --color-main-light-0: #ff9d99;
  --color-main-light-1: #ffd3d2;
  --color-main-light-2: #fffefe;
  --color-main-dark-0: #b42d26;
  --color-main-dark-1: #1a0605;
  --color-accent: #4036ff;
  --color-accent-dark-0: #2d26b4;
  --color-accent-dark-1: #06051a;
  --color-highlight: #36ff40;
}`,
    );
  },
);

Deno.test(
  "SPEC sass: can process dictionary into Sass variables",
  function () {
    assertStrictEquals(
      sass(dict),
      `
$color-main: #ff4036;
$color-main-light-0: #ff9d99;
$color-main-light-1: #ffd3d2;
$color-main-light-2: #fffefe;
$color-main-dark-0: #b42d26;
$color-main-dark-1: #1a0605;
$color-accent: #4036ff;
$color-accent-dark-0: #2d26b4;
$color-accent-dark-1: #06051a;
$color-highlight: #36ff40;
`,
    );
  },
);

Deno.test(
  "SPEC less: can process dictionary into Less variables",
  function () {
    assertStrictEquals(
      less(dict),
      `
@color-main: #ff4036;
@color-main-light-0: #ff9d99;
@color-main-light-1: #ffd3d2;
@color-main-light-2: #fffefe;
@color-main-dark-0: #b42d26;
@color-main-dark-1: #1a0605;
@color-accent: #4036ff;
@color-accent-dark-0: #2d26b4;
@color-accent-dark-1: #06051a;
@color-highlight: #36ff40;
`,
    );
  },
);

Deno.test(
  "SPEC styl: can process dictionary into Stylus variables",
  function () {
    assertStrictEquals(
      styl(dict),
      `
color-main = #ff4036
color-main-light-0 = #ff9d99
color-main-light-1 = #ffd3d2
color-main-light-2 = #fffefe
color-main-dark-0 = #b42d26
color-main-dark-1 = #1a0605
color-accent = #4036ff
color-accent-dark-0 = #2d26b4
color-accent-dark-1 = #06051a
color-highlight = #36ff40
`,
    );
  },
);
// CSS Format Assertions:1 ends here
