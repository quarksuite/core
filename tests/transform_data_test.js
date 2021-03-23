// [[file:../README.org::*Data Transform Assertions][Data Transform Assertions:1]]
import { styledict, tailwind } from "./transform_data.js";
import { clrs } from "./color_a11y.js";
import { triadic } from "./color_scheme.js";
import { shades, tints } from "./color_palette.js";

import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";

const swatch = clrs("red");
const [main, accent, highlight] = triadic(swatch);
const light = tints.bind(null, 3, 99);
const dark = shades.bind(null, 2, 99);

const dict = {
  color: {
    main: {
      base: main,
      light: light(main)[0],
      lighter: light(main)[1],
      lightest: light(main)[2],
      dark: dark(main)[0],
      darker: dark(main)[1],
    },
    accent: {
      base: accent,
      dark: dark(accent)[0],
      darker: dark(accent)[1],
    },
    highlight,
  },
};

Deno.test(
  "SPEC tailwind: transforms dictionary data into TailwindCSS theme",
  function () {
    assertEquals(tailwind(dict), {
      color: {
        main: {
          DEFAULT: "#ff4036",
          light: "#ff9d99",
          lighter: "#ffd3d2",
          lightest: "#fffefe",
          dark: "#b42d26",
          darker: "#1a0605",
        },
        accent: { DEFAULT: "#4036ff", dark: "#2d26b4", darker: "#06051a" },
        highlight: "#36ff40",
      },
    });
  },
);

Deno.test(
  "SPEC styledict: transforms dictionary data into Style Dictionary properties",
  function () {
    assertEquals(styledict(dict), {
      color: {
        main: {
          base: {
            value: "#ff4036",
          },
          dark: {
            value: "#b42d26",
          },
          darker: {
            value: "#1a0605",
          },
          light: {
            value: "#ff9d99",
          },
          lighter: {
            value: "#ffd3d2",
          },
          lightest: {
            value: "#fffefe",
          },
        },
        accent: {
          base: {
            value: "#4036ff",
          },
          dark: {
            value: "#2d26b4",
          },
          darker: {
            value: "#06051a",
          },
        },
        highlight: {
          value: "#36ff40",
        },
      },
    });
  },
);
// Data Transform Assertions:1 ends here
