import {
  FigureCalculations,
  GridDimensions,
  GridFractions,
  Spacing,
} from "./formulas.js";
import { ms_create } from "./utilities.js";

import { benchmark, data, init, suite } from "./tests/index.js";

const testSpacing = [
  "Spacing",
  [
    "with the default scale",
    data(Spacing(ms_create({}, 1)), {
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
    data(Spacing(ms_create({ values: 4, ratio: 2 }, 1)), {
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

const testGridFractions = [
  "GridFractions",
  [
    "with the default scale",
    data(GridFractions(ms_create({}, 1)), {
      base: "1fr",
      x2: "1.5fr",
      x3: "2.25fr",
      x4: "3.375fr",
      x5: "5.0625fr",
      x6: "7.5938fr",
    }),
  ],
  [
    "with a custom scale",
    data(GridFractions(ms_create({ ratio: 1.75, values: 4 }, 1)), {
      base: "1fr",
      x2: "1.75fr",
      x3: "3.0625fr",
      x4: "5.3594fr",
    }),
  ],
];

const testGridDimensions = [
  "GridDimensions",
  [
    "setting columns",
    data(GridDimensions(4), {
      x: { 2: 2, 3: 3, 4: 4, base: 1 },
      y: { 2: 2, 3: 3, 4: 4, base: 1 },
    }),
  ],
  [
    "setting columns and rows",
    data(GridDimensions(4, 2), {
      x: { 2: 2, 3: 3, 4: 4, base: 1 },
      y: { 2: 2, base: 1 },
    }),
  ],
];

const testFigureCalculations = [
  "FigureCalculations",
  [
    "with the default scale",
    data(FigureCalculations(ms_create({}, 1)), {
      base: 1,
      x2: 1.5,
      x3: 2.25,
      x4: 3.375,
      x5: 5.0625,
      x6: 7.5938,
    }),
  ],
  [
    "with a custom scale",
    data(FigureCalculations(ms_create({ values: 10, ratio: 1.618 }, 1)), {
      base: 1,
      x2: 1.618,
      x3: 2.6179,
      x4: 4.2358,
      x5: 6.8535,
      x6: 11.089,
      x7: 17.942,
      x8: 29.03,
      x9: 46.971,
      x10: 75.999,
    }),
  ],
];

suite(
  "Layout formulas",
  testSpacing,
  testGridFractions,
  testGridDimensions,
  testFigureCalculations,
);

benchmark(Spacing, ms_create({ values: 100 }, 1));
benchmark(GridFractions, ms_create({ values: 100 }, 1));
benchmark(GridDimensions, 100, 25);
benchmark(FigureCalculations, ms_create({ values: 100 }, 1));

init(7);
