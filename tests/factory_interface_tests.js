import * as qsc from "../mod.js";
import { benchmark, data, init, suite } from "./index.js";

const testInitialization = [
  "Initialization",
  [
    "can generate an object factory from explicitly defined modules",
    data(
      (() => {
        const Color = qsc.fn_to_factory([
          qsc.color_to_hex,
          qsc.color_mix,
          qsc.color_adjust,
        ]);

        return Color("#cadd99");
      })(),
      {},
    ),
  ],
  [
    "can generate an object factory from namespace",
    data(
      (() => {
        const color = qsc.fn_filter("color", qsc);

        const Color = qsc.fn_to_factory(color);

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
        const color = qsc.fn_filter("color", qsc);

        const Color = qsc.fn_to_factory(color);

        return Color("#cadd99");
      })(),
      {},
    ),
    data(
      (() => {
        const color = qsc.fn_filter("color", qsc);

        const Color = qsc.fn_to_factory(color);

        return Color("#cadd99").to_rgb();
      })(),
      { x: "rgb(202, 221, 153)" },
    ),
  ],
  [
    "composition is possible via data getter",
    data(
      (() => {
        const ms = qsc.fn_filter("ms", qsc);

        const Ms = qsc.fn_to_factory(ms);

        const { data: scale } = Ms(1).create({});

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
        { x: [11, 11.5, 12.25, 13.375, 15.0625, 17.59375] },
        { x: [-9, -8.5, -7.75, -6.625, -4.9375, -2.40625] },
        { x: [10, 15, 22.5, 33.75, 50.625, 75.9375] },
        { x: [0.1, 0.15, 0.225, 0.3375, 0.50625, 0.759375] },
        { x: [1, 1.5, 2.25, 3.375, 5.0625, 7.59375] },
        {
          x: [
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
        const color = qsc.fn_filter("color", qsc);

        const Color = qsc.fn_to_factory(color);

        const { data: main } = Color("dodgerblue").to_hex();

        return Color(main).to_scheme_triadic().$_to_scheme_analogous().$_mix({
          target: "coral",
          amount: 30,
        }).data;
      })(),
      [
        ["#8094d2", "#bb7bc9", "#e46597"],
        ["#f26067", "#ea7026", "#c38e27"],
        ["#9a9f27", "#87a880", "#83a0bc"],
      ],
    ),
    data(
      (() => {
        const ms = qsc.fn_filter("ms", qsc);

        const Ms = qsc.fn_to_factory(ms);

        return Ms(1).create({}).split(2).$_create({ values: 4 }).data;
      })(),
      [
        [
          [1, 1.5, 2.25, 3.375],
          [1.5, 2.25, 3.375, 5.0625],
        ],
        [
          [2.25, 3.375, 5.0625, 7.59375],
          [3.375, 5.0625, 7.59375, 11.390625],
        ],
        [
          [5.0625, 7.59375, 11.390625, 17.0859375],
          [7.59375, 11.390625, 17.0859375, 25.62890625],
        ],
      ],
    ),
  ],
  [
    "plays nice with functional utilities",
    data(
      (() => {
        const ColorFactory = qsc.fn_compose(
          qsc.fn_curry(qsc.fn_filter, "color"),
          qsc.fn_to_factory,
        );

        const Color = ColorFactory(qsc);

        const { data: main } = Color("dodgerblue").to_hex();

        return Color(main).to_scheme_triadic().$_to_scheme_analogous().$_mix({
          target: "coral",
          amount: 30,
        }).data;
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
  const color = qsc.fn_filter("color", qsc);

  const Color = qsc.fn_to_factory(color);

  const { data: main } = Color("dodgerblue").to_hex();

  const [{ data: a }, { data: b }, { data: c }, { data: d }] = [
    await Color(main).interpolation({ values: 100, hue: 90 }),
    await Color(main).interpolation({ values: 100, hue: 180 }),
    await Color(main).interpolation({ values: 100, hue: 270 }),
    await Color(main).interpolation({ values: 100, hue: 360 }),
  ];

  return { a, b, c, d };
});

init(7);
