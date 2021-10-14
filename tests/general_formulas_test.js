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
      base: "1rem",
      x2: "1.5rem",
      x3: "2.25rem",
      x4: "3.375rem",
      x5: "5.0625rem",
      x6: "7.5938rem",
      d2: "0.66667rem",
      d3: "0.44444rem",
      d4: "0.2963rem",
      d5: "0.19753rem",
      d6: "0.13169rem",
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
      d2: "0.66667px",
      d3: "0.44444px",
      d4: "0.2963px",
      d5: "0.19753px",
      d6: "0.13169px",
    }),
    data(Subcategory({ unit: "pc" }, ms_create({}, 10)), {
      base: "10pc",
      x2: "15pc",
      x3: "22.5pc",
      x4: "33.75pc",
      x5: "50.625pc",
      x6: "75.938pc",
      d2: "0.66667pc",
      d3: "0.44444pc",
      d4: "0.2963pc",
      d5: "0.19753pc",
      d6: "0.13169pc",
    }),
  ],
];

const testSubcategoryUnidirectional = [
  "SubcategoryUnidirectional",
  [
    "with default configuration",
    data(SubcategoryUnidirectional({}, ms_create({}, 1)), {
      base: "1rem",
      x2: "1.5rem",
      x3: "2.25rem",
      x4: "3.375rem",
      x5: "5.0625rem",
      x6: "7.5938rem",
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
      base: "10rem",
      segment: [
        "7rem",
        "5.899rem",
        "4.6144rem",
        "3.2905rem",
        "2.1555rem",
        "1.414rem",
      ],
      minimum: "1rem",
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
      base: "16rem",
      segment: [
        "11.333rem",
        "9.6206rem",
        "7.6224rem",
        "5.563rem",
        "3.7975rem",
        "2.6441rem",
      ],
      minimum: "2rem",
    }),
  ],
  [
    "set trunc",
    data(SubcategoryRange({ trunc: true }, ms_create({}, 1)), {
      base: "10rem",
      segment: ["7rem", "5rem", "4rem", "3rem", "2rem"],
      minimum: "1rem",
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
