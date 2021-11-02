import { ms_create, ms_modify, ms_split, ms_units } from "../mod.js";
import { benchmark, data, exception, init, suite } from "./index.js";

const testMsCreate = [
  "ms_create",
  [
    "with default configuration",
    data(ms_create({}, 1), [1, 1.5, 2.25, 3.375, 5.0625, 7.59375]),
  ],
  [
    "setting the base",
    data(
      ms_create({}, 1.2),
      [
        1.2,
        1.7999999999999998,
        2.6999999999999997,
        4.05,
        6.075,
        9.112499999999999,
      ],
    ),
    data(
      ms_create({}, 2.4),
      [
        2.4,
        3.5999999999999996,
        5.3999999999999995,
        8.1,
        12.15,
        18.224999999999998,
      ],
    ),
    data(
      ms_create({}, 4.8),
      [
        4.8,
        7.199999999999999,
        10.799999999999999,
        16.2,
        24.3,
        36.449999999999996,
      ],
    ),
  ],
  [
    "setting a ratio",
    data(
      ms_create({ ratio: 1.25 }, 1),
      [1, 1.25, 1.5625, 1.953125, 2.44140625, 3.0517578125],
    ),
    data(
      ms_create({ ratio: 1.414 }, 1),
      [
        1,
        1.414,
        1.9993959999999997,
        2.8271459439999997,
        3.997584364815999,
        5.652584291849823,
      ],
    ),
    data(
      ms_create({ ratio: 1.618 }, 1),
      [
        1,
        1.618,
        2.6179240000000004,
        4.235801032000001,
        6.853526069776001,
        11.089005180897573,
      ],
    ),
  ],
  [
    "setting number of values",
    data(ms_create({ values: 2 }, 1), [1, 1.5]),
    data(ms_create({ values: 4 }, 1), [1, 1.5, 2.25, 3.375]),
    data(
      ms_create({ values: 8 }, 1),
      [1, 1.5, 2.25, 3.375, 5.0625, 7.59375, 11.390625, 17.0859375],
    ),
    data(
      ms_create({ values: 16 }, 1),
      [
        1,
        1.5,
        2.25,
        3.375,
        5.0625,
        7.59375,
        11.390625,
        17.0859375,
        25.62890625,
        38.443359375,
        57.6650390625,
        86.49755859375,
        129.746337890625,
        194.6195068359375,
        291.92926025390625,
        437.8938903808594,
      ],
    ),
  ],
];

const testInvalid = (fn) => [
  "rejects invalid input",
  exception(fn, []),
  exception(fn, ["1rem", "1.5rem", "2.25rem"]),
  exception(fn, 1.25),
  exception(fn, "1.5rem"),
];

const testMsModify = [
  "ms_modify",
  testInvalid(ms_modify),
  [
    "creates a new scale from recalculating values",
    data(
      ms_modify((n) => n, ms_create({}, 1)),
      [1, 1.5, 2.25, 3.375, 5.0625, 7.59375],
    ),
    data(
      ms_modify((n) => (n * 10) / 100, ms_create({}, 1)),
      [0.1, 0.15, 0.225, 0.3375, 0.50625, 0.759375],
    ),
    data(
      ms_modify((n) => n ** n, ms_create({}, 1)),
      [
        1,
        1.8371173070873836,
        6.20027091141992,
        60.66301592849602,
        3680.001501540962,
        4852493.834691893,
      ],
    ),
    data(
      ms_modify((n) => n * 16, ms_create({}, 1)),
      [16, 24, 36, 54, 81, 121.5],
    ),
  ],
];

const testMsSplit = [
  "ms_split",
  testInvalid(ms_split),
  [
    "splits a modular scale into smaller scales of an alloted size",
    data(ms_split(3, ms_create({ values: 30 }, 1)), [
      [1, 1.5, 2.25],
      [3.375, 5.0625, 7.59375],
      [11.390625, 17.0859375, 25.62890625],
      [38.443359375, 57.6650390625, 86.49755859375],
      [129.746337890625, 194.6195068359375, 291.92926025390625],
      [437.8938903808594, 656.8408355712891, 985.2612533569336],
      [1477.8918800354004, 2216.8378200531006, 3325.256730079651],
      [4987.885095119476, 7481.8276426792145, 11222.741464018822],
      [16834.112196028233, 25251.16829404235, 37876.75244106352],
      [56815.128661595285, 85222.69299239293, 127834.03948858939],
    ]),
    data(ms_split(5, ms_create({ values: 15 }, 1)), [
      [1, 1.5, 2.25, 3.375, 5.0625],
      [7.59375, 11.390625, 17.0859375, 25.62890625, 38.443359375],
      [
        57.6650390625,
        86.49755859375,
        129.746337890625,
        194.6195068359375,
        291.92926025390625,
      ],
    ]),
    data(ms_split(7, ms_create({ values: 28 }, 1)), [
      [1, 1.5, 2.25, 3.375, 5.0625, 7.59375, 11.390625],
      [
        17.0859375,
        25.62890625,
        38.443359375,
        57.6650390625,
        86.49755859375,
        129.746337890625,
        194.6195068359375,
      ],
      [
        291.92926025390625,
        437.8938903808594,
        656.8408355712891,
        985.2612533569336,
        1477.8918800354004,
        2216.8378200531006,
        3325.256730079651,
      ],
      [
        4987.885095119476,
        7481.8276426792145,
        11222.741464018822,
        16834.112196028233,
        25251.16829404235,
        37876.75244106352,
        56815.128661595285,
      ],
    ]),
  ],
  [
    "will fill a partition with remaining values if unequal",
    data(ms_split(3, ms_create({ values: 20 }, 1)), [
      [1, 1.5, 2.25],
      [3.375, 5.0625, 7.59375],
      [11.390625, 17.0859375, 25.62890625],
      [38.443359375, 57.6650390625, 86.49755859375],
      [129.746337890625, 194.6195068359375, 291.92926025390625],
      [437.8938903808594, 656.8408355712891, 985.2612533569336],
      [1477.8918800354004, 2216.8378200531006],
    ]),
    data(ms_split(5, ms_create({ values: 7 }, 1)), [
      [1, 1.5, 2.25, 3.375, 5.0625],
      [7.59375, 11.390625],
    ]),
    data(ms_split(7, ms_create({ values: 16 }, 1)), [
      [1, 1.5, 2.25, 3.375, 5.0625, 7.59375, 11.390625],
      [
        17.0859375,
        25.62890625,
        38.443359375,
        57.6650390625,
        86.49755859375,
        129.746337890625,
        194.6195068359375,
      ],
      [291.92926025390625, 437.8938903808594],
    ]),
  ],
];

const testMsUnits = [
  "ms_units",
  [
    "can attach units to a modular scale",
    data(ms_units("em", ms_create({}, 1)), [
      "1em",
      "1.5em",
      "2.25em",
      "3.375em",
      "5.0625em",
      "7.5938em",
    ]),
    data(ms_units("ex", ms_create({}, 1)), [
      "1ex",
      "1.5ex",
      "2.25ex",
      "3.375ex",
      "5.0625ex",
      "7.5938ex",
    ]),
    data(
      ms_units(
        "px",
        ms_modify((n) => n * 16, ms_create({}, 1)),
      ),
      ["16px", "24px", "36px", "54px", "81px", "121.5px"],
    ),
  ],
];

suite(
  "Modular scale (ms) utilities",
  testMsCreate,
  testMsModify,
  testMsSplit,
  testMsUnits,
);

benchmark(ms_create, { values: 100 }, 1);
benchmark(ms_modify, (n) => n ** n / 5 + 300, ms_create({ values: 100 }, 1));

init(7);
