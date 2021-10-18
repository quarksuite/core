import {
  TextFamily,
  TextLeading,
  TextMeasure,
  TextSize,
  TextUnits,
} from "../formulas.js";
import { ms_create } from "../utilities.js";

import { benchmark, data, init, suite } from "./index.js";

const testTextFamily = [
  "TextFamily",
  [
    "with default configuration",
    data(TextFamily({}), {
      family:
        "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      regular: 400,
      bold: 700,
    }),
  ],
  [
    "set system fallback",
    data(TextFamily({ system: "serif" }), {
      family:
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      regular: 400,
      bold: 700,
    }),
  ],
  [
    "set weights",
    data(
      TextFamily({
        weights: [
          "thin",
          "extralight",
          "light",
          "regular",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
      }),
      {
        family:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    ),
  ],
];

const testTextSize = [
  "TextSize",
  [
    "with the default scale",
    data(TextSize(ms_create({}, 1)), {
      base: "1rem",
      x2: "1.5rem",
      x3: "2.25rem",
      x4: "3.375rem",
      x5: "5.0625rem",
      x6: "7.5938rem",
      d2: "0.66667em",
      d3: "0.44444em",
      d4: "0.2963em",
      d5: "0.19753em",
      d6: "0.13169em",
    }),
  ],
  [
    "with a custom scale",
    data(TextSize(ms_create({ ratio: 1.25 }, 1)), {
      base: "1rem",
      x2: "1.25rem",
      x3: "1.5625rem",
      x4: "1.9531rem",
      x5: "2.4414rem",
      x6: "3.0518rem",
      d2: "0.8em",
      d3: "0.64em",
      d4: "0.512em",
      d5: "0.4096em",
      d6: "0.32768em",
    }),
    ,
  ],
];

const testTextLeading = [
  "TextLeading",
  [
    "with the default scale",
    data(TextLeading({}, ms_create({}, 1)), {
      base: 1.5,
      narrow: [1.375, 1.3291, 1.2756, 1.2204, 1.1731, 1.1423],
      tight: 1.125,
    }),
  ],
  [
    "setting normal and tightest leading boundaries",
    data(TextLeading({ normal: 1.64, tight: 1.15 }, ms_create({}, 1)), {
      base: 1.64,
      narrow: [1.4767, 1.4167, 1.3468, 1.2747, 1.2129, 1.1725],
      tight: 1.15,
    }),
  ],
  [
    "with a custom scale",
    data(TextLeading({}, ms_create({ values: 4, ratio: 2 }, 1)), {
      base: 1.5,
      narrow: [1.3125, 1.2188, 1.1484, 1.1265],
      tight: 1.125,
    }),
  ],
];

const testTextMeasure = [
  "TextMeasure",
  [
    "with the default scale",
    data(TextMeasure({}, ms_create({}, 1)), {
      base: "75ch",
      segment: ["65ch", "61ch", "57ch", "52ch", "48ch", "46ch"],
      minimum: "45ch",
    }),
  ],
  [
    "setting minimum and maximum measure",
    data(TextMeasure({ min: 48, max: 72 }, ms_create({}, 1)), {
      base: "72ch",
      segment: ["64ch", "61ch", "57ch", "54ch", "51ch", "49ch"],
      minimum: "48ch",
    }),
  ],
  [
    "with a custom scale",
    data(TextMeasure({}, ms_create({ values: 4, ratio: 2 }, 1)), {
      base: "75ch",
      segment: ["60ch", "52ch", "46ch"],
      minimum: "45ch",
    }),
  ],
];

const testTextUnits = [
  "TextUnits",
  [
    "with the default scale",
    data(TextUnits(ms_create({}, 1)), {
      base: "1ex",
      x2: "1.5ex",
      x3: "2.25ex",
      x4: "3.375ex",
      x5: "5.0625ex",
      x6: "7.5938ex",
      d2: "0.66667ex",
      d3: "0.44444ex",
      d4: "0.2963ex",
      d5: "0.19753ex",
      d6: "0.13169ex",
    }),
  ],
  [
    "with a custom scale",
    data(TextUnits(ms_create({ values: 4, ratio: 2 }, 1)), {
      base: "1ex",
      x2: "2ex",
      x3: "4ex",
      x4: "8ex",
      d2: "0.5ex",
      d3: "0.25ex",
      d4: "0.125ex",
    }),
  ],
];

suite(
  "Typography formulas",
  testTextFamily,
  testTextSize,
  testTextLeading,
  testTextMeasure,
  testTextUnits,
);

benchmark(
  TextFamily,
  {
    weights: [
      "thin",
      "extralight",
      "light",
      "regular",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ],
    system: "monospace",
  },
  "Victor Mono",
);
benchmark(TextSize, ms_create({ values: 100 }, 1));
benchmark(TextLeading, {}, ms_create({ values: 100 }, 1));
benchmark(TextMeasure, {}, ms_create({ values: 100 }, 1));
benchmark(TextUnits, ms_create({ values: 100 }, 1));

init(7);
