import {
  Subcategory,
  SubcategoryRange,
  SubcategoryUnidirectional,
} from "../formulas.js";
import { ms_create } from "../utilities.js";

import { benchmark, data, init, suite } from "./index.js";

const testSubcategory = [
  "Subcategory",
  [
    "with default configuration",
    data(Subcategory({}, ms_create({}, 1)), {
      base: 1,
      x2: 1.5,
      x3: 2.25,
      x4: 3.375,
      x5: 5.0625,
      x6: 7.5938,
      "-x2": 0.66667,
      "-x3": 0.44444,
      "-x4": 0.2963,
      "-x5": 0.19753,
      "-x6": 0.13169,
    }),
  ],
  [
    "set unit",
    data(Subcategory({ unit: "px" }, ms_create({}, 16)), {
      base: "16px",
      x2: "24px",
      x3: "36px",
      x4: "54px",
      x5: "81px",
      x6: "121.5px",
      "-x2": "10.667px",
      "-x3": "7.1111px",
      "-x4": "4.7407px",
      "-x5": "3.1605px",
      "-x6": "2.107px",
    }),
    data(Subcategory({ unit: "pc" }, ms_create({}, 10)), {
      base: "10pc",
      x2: "15pc",
      x3: "22.5pc",
      x4: "33.75pc",
      x5: "50.625pc",
      x6: "75.938pc",
      "-x2": "6.6667pc",
      "-x3": "4.4444pc",
      "-x4": "2.963pc",
      "-x5": "1.9753pc",
      "-x6": "1.3169pc",
    }),
  ],
];

const testSubcategoryUnidirectional = [
  "SubcategoryUnidirectional",
  [
    "with default configuration",
    data(SubcategoryUnidirectional({}, ms_create({}, 1)), {
      base: 1,
      x2: 1.5,
      x3: 2.25,
      x4: 3.375,
      x5: 5.0625,
      x6: 7.5938,
    }),
  ],
  [
    "set unit",
    data(SubcategoryUnidirectional({ unit: "ex" }, ms_create({}, 1)), {
      base: "1ex",
      x2: "1.5ex",
      x3: "2.25ex",
      x4: "3.375ex",
      x5: "5.0625ex",
      x6: "7.5938ex",
    }),
    data(SubcategoryUnidirectional({ unit: "em" }, ms_create({}, 1)), {
      base: "1em",
      x2: "1.5em",
      x3: "2.25em",
      x4: "3.375em",
      x5: "5.0625em",
      x6: "7.5938em",
    }),
  ],
];

const testSubcategoryRange = [
  "SubcategoryRange",
  [
    "with default configuration",
    data(SubcategoryRange({}, ms_create({}, 1)), {
      base: 10,
      segment: [7, 5.899, 4.6144, 3.2905, 2.1555, 1.414],
      minimum: 1,
    }),
  ],
  [
    "set unit",
    data(SubcategoryRange({ unit: "em" }, ms_create({}, 1)), {
      base: "10em",
      segment: [
        "7em",
        "5.899em",
        "4.6144em",
        "3.2905em",
        "2.1555em",
        "1.414em",
      ],
      minimum: "1em",
    }),
  ],
  [
    "set minimum and maximum values",
    data(SubcategoryRange({ min: 2, max: 16 }, ms_create({}, 1)), {
      base: 16,
      segment: [11.333, 9.6206, 7.6224, 5.563, 3.7975, 2.6441],
      minimum: 2,
    }),
  ],
  [
    "set trunc",
    data(SubcategoryRange({ trunc: true }, ms_create({}, 1)), {
      base: 10,
      segment: [7, 5, 4, 3, 2],
      minimum: 1,
    }),
  ],
];

suite(
  "General formulas",
  testSubcategory,
  testSubcategoryUnidirectional,
  testSubcategoryRange,
);

benchmark(Subcategory, {}, ms_create({ values: 100 }, 1));
benchmark(SubcategoryRange, {}, ms_create({ values: 100 }, 1));
benchmark(SubcategoryUnidirectional, {}, ms_create({ values: 100 }, 1));

init(7);
