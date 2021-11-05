import { AnimationCubicBezier, AnimationDuration, ms_create } from "../mod.js";

import { benchmark, data, init, suite } from "./index.js";

const testAnimationDuration = [
  "AnimationDuration",
  [
    "with default configuration",
    data(AnimationDuration({}, ms_create({}, 1)), {
      base: "1000ms",
      interval: ["750ms", "583.33ms", "472.22ms", "398.15ms", "348.77ms"],
      fastest: "250ms",
    }),
  ],
  [
    "with fastest and slowest duration",
    data(AnimationDuration({ slowest: 750 }, ms_create({}, 1)), {
      base: "750ms",
      interval: ["583.33ms", "472.22ms", "398.15ms", "348.77ms", "315.84ms"],
      fastest: "250ms",
    }),
    data(AnimationDuration({ fastest: 100 }, ms_create({}, 1)), {
      base: "1000ms",
      interval: ["700ms", "500ms", "366.67ms", "277.78ms", "218.52ms"],
      fastest: "100ms",
    }),
    data(AnimationDuration({ fastest: 790, slowest: 2000 }, ms_create({}, 1)), {
      base: "2000ms",
      interval: ["1596.7ms", "1327.8ms", "1148.5ms", "1029ms", "949.34ms"],
      fastest: "790ms",
    }),
  ],
  [
    "with a custom scale",
    data(AnimationDuration({}, ms_create({ values: 4, ratio: 2 }, 1)), {
      base: "1000ms",
      interval: ["625ms", "437.5ms", "343.75ms"],
      fastest: "250ms",
    }),
  ],
];

const testAnimationCubicBezier = [
  "AnimationCubicBezier",
  [
    "default configuration",
    data(AnimationCubicBezier({}, ms_create({}, 1)), {
      x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
      y: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
    }),
  ],
  [
    "with floor and ceiling",
    data(AnimationCubicBezier({ floor: -3 }, ms_create({}, 1)), {
      x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
      y: [-3, -2.4733, -2.2099, -1.8148, -1.2222, -0.33333, 1],
    }),
    data(AnimationCubicBezier({ ceiling: 20 }, ms_create({}, 1)), {
      x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
      y: [0, 2.6337, 3.9506, 5.9259, 8.8889, 13.333, 20],
    }),
  ],
  [
    "with a custom scale",
    data(AnimationCubicBezier({}, ms_create({ values: 3, ratio: 1.24 }, 1)), {
      x: [0, 0.65036, 0.80645, 1],
      y: [0, 0.65036, 0.80645, 1],
    }),
  ],
];

suite("Animation formulas", testAnimationDuration, testAnimationCubicBezier);

benchmark(AnimationDuration, {}, ms_create({ values: 100 }, 1));
benchmark(AnimationCubicBezier, {}, ms_create({ values: 100 }, 1));

init(7);
