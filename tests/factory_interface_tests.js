import * as qsc from "../mod.js";
import { benchmark, data, exception, init, suite } from "./index.js";

const testInitialization = [
  "Initialization",
  [
    "can generate a factory object from explicitly defined module",
    data(
      (() => {
        const color = {
          hex: qsc.color_to_hex,
          mix: qsc.color_mix,
          adjust: qsc.color_adjust,
        };

        const Color = qsc.module_to_factory(color);

        return Color("#cadd99");
      })(),
      {},
    ),
  ],
  [
    "can generate a factory object from namespaced import",
    data(
      (() => {
        const color = qsc.imports_to_module("color", qsc);

        const Color = qsc.module_to_factory(color);

        return Color("#cadd99");
      })(),
      {},
    ),
  ],
];

const testBehavior = [
  "Behavior",
  [
    "state of data is not exposed until transformed",
    data(
      (() => {
        const color = qsc.imports_to_module("color", qsc);

        const Color = qsc.module_to_factory(color);

        return Color("#cadd99");
      })(),
      {},
    ),
    data(
      (() => {
        const color = qsc.imports_to_module("color", qsc);

        const Color = qsc.module_to_factory(color);

        return Color("#cadd99").rgb();
      })(),
      { _data: "rgb(202, 221, 153)" },
    ),
  ],
  [
    "composition is possible via value getter",
    data(
      (() => {
        const ms = qsc.imports_to_module("ms", qsc);

        const Ms = qsc.module_to_factory(ms);

        const { value: scale } = Ms(1).create({});

        return [
          Ms(scale).modify((n) => n + 10),
          Ms(scale).modify((n) => n - 10),
          Ms(scale).modify((n) => n * 10),
          Ms(scale).modify((n) => n / 10),
          Ms(scale).modify((n) => n % 10),
          Ms(scale).modify((n) => n ** 10),
        ];
      })(),
      [
        { _data: [11, 11.5, 12.25, 13.375, 15.0625, 17.59375] },
        { _data: [-9, -8.5, -7.75, -6.625, -4.9375, -2.40625] },
        { _data: [10, 15, 22.5, 33.75, 50.625, 75.9375] },
        { _data: [0.1, 0.15, 0.225, 0.3375, 0.50625, 0.759375] },
        { _data: [1, 1.5, 2.25, 3.375, 5.0625, 7.59375] },
        {
          _data: [
            1,
            57.6650390625,
            3325.256730079651,
            191751.0592328841,
            11057332.320940012,
            637621500.2140496,
          ],
        },
      ],
    ),
  ],
  [
    "propagated methods work recursively",
    data(
      (() => {
        const color = qsc.imports_to_module("color", qsc);

        const Color = qsc.module_to_factory(color);

        const { value: main } = Color("dodgerblue").hex();

        return Color(main).triadic().$analogous().$mix({
          target: "coral",
          amount: 30,
        }).value;
      })(),
      [
        ["#8094d2", "#bb7bc9", "#e46597"],
        ["#f26067", "#ea7026", "#c38e27"],
        ["#9a9f27", "#87a880", "#83a0bc"],
      ],
    ),
  ],
  [
    "plays nice with functional utilities",
    data(
      (() => {
        const ColorFactory = qsc.utility_compose(
          qsc.utility_curry(qsc.imports_to_module, "color"),
          qsc.module_to_factory,
        );

        const Color = ColorFactory(qsc);

        const { value: main } = Color("dodgerblue").hex();

        return Color(main).triadic().$analogous().$mix({
          target: "coral",
          amount: 30,
        }).value;
      })(),
      [
        ["#8094d2", "#bb7bc9", "#e46597"],
        ["#f26067", "#ea7026", "#c38e27"],
        ["#9a9f27", "#87a880", "#83a0bc"],
      ],
    ),
  ],
];

suite("Factory Interface", testInitialization, testBehavior);

/*
  benchmark(function factoryStressBench() {
  const color = qsc.imports_to_module("color", qsc);

  const Color = qsc.module_to_factory(color);

  const { value: main } = Color("dodgerblue").hex();

  return Color(main).dyadic().$triadic().$tetradic().$star().$hexagon();
  });
*/

benchmark(async function factoryConcurrentStressBench() {
  const color = qsc.imports_to_module("color", qsc);

  const Color = qsc.module_to_factory(color);

  const { value: main } = Color("dodgerblue").hex();

  const [{ value: a }, { value: b }, { value: c }, { value: d }] = [
    await Color(main).adjust({ hue: 30 }).dyadic(),
    await Color(main).mix({ amount: 25 }).triadic(),
    await Color(main).material({}),
    await Color(main).interpolation({ values: 25, hue: 90 }),
  ];

  return { a, b, c, d };
});

init(7);
