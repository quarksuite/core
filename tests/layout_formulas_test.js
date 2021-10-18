import {
  FigureCalculations,
  GridDimensions,
  GridFractions,
  Viewport,
} from "../formulas.js";
import { ms_create } from "../utilities.js";

import { benchmark, data, init, suite } from "./index.js";

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
      d2: "0.66667fr",
      d3: "0.44444fr",
      d4: "0.2963fr",
      d5: "0.19753fr",
      d6: "0.13169fr",
    }),
  ],
  [
    "with a custom scale",
    data(GridFractions(ms_create({ ratio: 1.75, values: 4 }, 1)), {
      base: "1fr",
      x2: "1.75fr",
      x3: "3.0625fr",
      x4: "5.3594fr",
      d2: "0.57143fr",
      d3: "0.32653fr",
      d4: "0.18659fr",
    }),
  ],
];

const testGridDimensions = [
  "GridDimensions",
  [
    "setting columns",
    data(GridDimensions(4), {
      x: { base: 1, x2: 2, x3: 3, x4: 4 },
      "-x": { base: -1, "-x2": -2, "-x3": -3, "-x4": -4 },
      y: { base: 1, y2: 2, y3: 3, y4: 4 },
      "-y": { base: -1, "-y2": -2, "-y3": -3, "-y4": -4 },
    }),
  ],
  [
    "setting columns and rows",
    data(GridDimensions(4, 2), {
      x: { base: 1, x2: 2, x3: 3, x4: 4 },
      "-x": { base: -1, "-x2": -2, "-x3": -3, "-x4": -4 },
      y: { base: 1, y2: 2 },
      "-y": { base: -1, "-y2": -2 },
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

const testViewport = [
  "Viewport",
  [
    "with the default scale",
    data(Viewport({}, ms_create({}, 1)), {
      width: {
        base: "100vw",
        segment: ["68vw", "56vw", "43vw", "29vw", "17vw", "9vw"],
        threshold: "5vw",
      },
      height: {
        base: "100vh",
        segment: ["68vh", "56vh", "43vh", "29vh", "17vh", "9vh"],
        threshold: "5vh",
      },
      min: {
        base: "100vmin",
        segment: ["68vmin", "56vmin", "43vmin", "29vmin", "17vmin", "9vmin"],
        threshold: "5vmin",
      },
      max: {
        base: "100vmax",
        segment: ["68vmax", "56vmax", "43vmax", "29vmax", "17vmax", "9vmax"],
        threshold: "5vmax",
      },
    }),
  ],
  [
    "setting the viewport threshold and full view",
    data(Viewport({ threshold: 36, full: 120 }, ms_create({}, 1)), {
      width: {
        base: "120vw",
        segment: ["92vw", "81vw", "69vw", "57vw", "46vw", "39vw"],
        threshold: "36vw",
      },
      height: {
        base: "120vh",
        segment: ["92vh", "81vh", "69vh", "57vh", "46vh", "39vh"],
        threshold: "36vh",
      },
      min: {
        base: "120vmin",
        segment: ["92vmin", "81vmin", "69vmin", "57vmin", "46vmin", "39vmin"],
        threshold: "36vmin",
      },
      max: {
        base: "120vmax",
        segment: ["92vmax", "81vmax", "69vmax", "57vmax", "46vmax", "39vmax"],
        threshold: "36vmax",
      },
    }),
  ],
  [
    "setting the context",
    data(Viewport({ context: ["w"] }, ms_create({}, 1)), {
      width: {
        base: "100vw",
        segment: ["68vw", "56vw", "43vw", "29vw", "17vw", "9vw"],
        threshold: "5vw",
      },
    }),
    data(Viewport({ context: ["w", "min"] }, ms_create({}, 1)), {
      width: {
        base: "100vw",
        segment: ["68vw", "56vw", "43vw", "29vw", "17vw", "9vw"],
        threshold: "5vw",
      },
      min: {
        base: "100vmin",
        segment: ["68vmin", "56vmin", "43vmin", "29vmin", "17vmin", "9vmin"],
        threshold: "5vmin",
      },
    }),
  ],
  [
    "context is assembled in order",
    data(Viewport({ context: ["h", "min", "w"] }, ms_create({}, 1)), {
      height: {
        base: "100vh",
        segment: ["68vh", "56vh", "43vh", "29vh", "17vh", "9vh"],
        threshold: "5vh",
      },
      min: {
        base: "100vmin",
        segment: ["68vmin", "56vmin", "43vmin", "29vmin", "17vmin", "9vmin"],
        threshold: "5vmin",
      },
      width: {
        base: "100vw",
        segment: ["68vw", "56vw", "43vw", "29vw", "17vw", "9vw"],
        threshold: "5vw",
      },
    }),
  ],
];

suite(
  "Layout formulas",
  testGridFractions,
  testGridDimensions,
  testFigureCalculations,
  testViewport,
);

benchmark(GridFractions, ms_create({ values: 100 }, 1));
benchmark(GridDimensions, 100, 25);
benchmark(FigureCalculations, ms_create({ values: 100 }, 1));
benchmark(Viewport, {}, ms_create({ values: 100 }, 1));

init(7);
