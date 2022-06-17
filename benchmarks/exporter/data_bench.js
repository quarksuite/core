import { adjust, palette } from "../../color.js";
import { grid, scale } from "../../content.js";
import { pipeline, preset, propagate } from "../../workflow.js";
import { data } from "../../exporter.js";

const warmup = 5;
const n = 100;

const swatches = adjust({ hue: 360, steps: 26 }, "#7ea"); // a-z categorization
const material = preset(palette, {
  contrast: 90,
  accents: true,
  states: true,
});

function paletteFactory(data) {
  const generate = preset(propagate, material);
  const categorize = (data) =>
    data.reduce(
      (acc, tokens, i) => ({ ...acc, [String.fromCharCode(97 + i)]: tokens }),
      {},
    );

  return pipeline(data, generate, categorize);
}

const ratio = [1.25, 1.5, 1.75, 2];
const values = 250;

const size = scale({ ratio, values }, "1rem");
const measure = scale(
  {
    configuration: "ranged",
    floor: 45,
    trunc: true,
    ratio,
    values,
  },
  "75ch",
);
const leading = scale(
  { configuration: "ranged", floor: 1.25, ratio, values },
  1.5,
);

const spacing = scale({ ratio, values }, "1ex");

const gridOut = grid({ ratio }, values);

const dim = ["w", "h", "min", "max"].reduce(
  (acc, context) => ({
    ...acc,
    [context]: scale(
      {
        configuration: "ranged",
        floor: 5,
        ratio,
        values,
      },
      `100v${context}`,
    ),
  }),
  {},
);

const duration = scale(
  { configuration: "ranged", floor: 250, ratio, values },
  "750ms",
);
const [x, y] = [
  scale({ configuration: "ranged", floor: 0, ratio, values }, 1),
  scale({ configuration: "ranged", floor: -4, max: 4 }, 4),
];

const dict = {
  project: {
    name: "Load-Bearing Stylesheet",
  },
  color: paletteFactory(swatches),
  text: {
    size,
    measure,
    leading,
  },
  layout: {
    spacing,
    grid: gridOut,
    dim,
  },
  animation: {
    duration,
    timing: { x, y },
  },
};

Deno.bench({ warmup, n }, function json_stress() {
  return data("json", dict);
});

Deno.bench({ warmup, n }, function yaml_stress() {
  return data("yaml", dict);
});
