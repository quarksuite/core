import { AnimationCubicBezier, AnimationDuration } from "../formulas.js";
import { ms_create } from "../utilities.js";

import { benchmark, data, init, suite } from "./index.js";

const testAnimationDuration = [
  "AnimationDuration",
  [
    "with default configuration",
    data(AnimationDuration({}, ms_create({}, 1)), {
      base: "1000ms",
      interval: [
        "750ms",
        "658.25ms",
        "551.2ms",
        "440.88ms",
        "346.29ms",
        "284.5ms",
      ],
      fastest: "250ms",
    }),
  ],
  [
    "with fastest and slowest duration",
    data(AnimationDuration({ slowest: 750 }, ms_create({}, 1)), {
      base: "750ms",
      interval: [
        "583.33ms",
        "522.17ms",
        "450.8ms",
        "377.25ms",
        "314.2ms",
        "273ms",
      ],
      fastest: "250ms",
    }),
    data(AnimationDuration({ fastest: 100 }, ms_create({}, 1)), {
      base: "1000ms",
      interval: [
        "700ms",
        "589.9ms",
        "461.44ms",
        "329.05ms",
        "215.55ms",
        "141.4ms",
      ],
      fastest: "100ms",
    }),
    data(AnimationDuration({ fastest: 790, slowest: 2000 }, ms_create({}, 1)), {
      base: "2000ms",
      interval: [
        "1596.7ms",
        "1448.6ms",
        "1275.9ms",
        "1097.9ms",
        "945.35ms",
        "845.67ms",
      ],
      fastest: "790ms",
    }),
  ],
  [
    "with a custom scale",
    data(AnimationDuration({}, ms_create({ values: 4, ratio: 2 }, 1)), {
      base: "1000ms",
      interval: ["625ms", "437.5ms", "296.88ms", "252.93ms"],
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
      y: [0, 0.046005, 0.12839, 0.2545, 0.4016, 0.54433, 0.66667, 1],
    }),
  ],
  [
    "with floor and ceiling",
    data(AnimationCubicBezier({ floor: -3 }, ms_create({}, 1)), {
      x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
      y: [-3, -2.816, -2.4864, -1.982, -1.3936, -0.82268, -0.33333, 1],
    }),
    data(AnimationCubicBezier({ ceiling: 20 }, ms_create({}, 1)), {
      x: [0, 0.13169, 0.19753, 0.2963, 0.44444, 0.66667, 1],
      y: [0, 0.9201, 2.5678, 5.09, 8.032, 10.887, 13.333, 20],
    }),
  ],
  [
    "with a custom scale",
    data(AnimationCubicBezier({}, ms_create({ values: 3, ratio: 1.24 }, 1)), {
      x: [0, 0.65036, 0.80645, 1],
      y: [0, 0.71838, 0.76587, 0.80645, 1],
    }),
  ],
];

suite("Animation formulas", testAnimationDuration, testAnimationCubicBezier);

benchmark(AnimationDuration, {}, ms_create({ values: 100 }, 1));
benchmark(AnimationCubicBezier, {}, ms_create({ values: 100 }, 1));

init(7);
