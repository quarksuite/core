import { adjust, palette, tokens as color } from "../../color.js";
import { ms, tokens as content } from "../../content.js";
import { pipeline, preset, propagate } from "../../workflow.js";
import { interop } from "../../exporter.js";

const warmup = 10;
const n = 1000;

const swatches = adjust({ hue: 360, steps: 26 }, "#7ea"); // a-z categorization
const material = preset(palette, {
  contrast: 90,
  accented: true,
  stated: true,
});

function paletteFactory(data) {
  const generate = preset(propagate, material);
  const assemble = preset(propagate, color);
  const categorize = (data) =>
    data.reduce(
      (acc, tokens, i) => ({ ...acc, [String.fromCharCode(97 + i)]: tokens }),
      {},
    );

  return pipeline(data, generate, assemble, categorize);
}

const ratio = [1.25, 1.5, 1.75, 2];
const scale = ms({ ratio, values: 25 }, 1);

const size = content({ unit: "rem", inversion: "em" }, scale);
const measure = content(
  {
    type: "ranged",
    unit: "ch",
    min: 45,
    max: 75,
    trunc: true,
    context: "max",
  },
  scale,
);
const leading = content(
  { type: "ranged", min: 1.25, max: 1.5, context: "max" },
  scale,
);

const spacing = content({ unit: "ex" }, scale);

const grid = content({ type: "grid" }, scale);
const fr = content({ unit: "fr" }, scale);

const dim = ["w", "h", "min", "max"].reduce(
  (acc, context) => ({
    ...acc,
    [context]: content(
      {
        type: "ranged",
        unit: `v${context}`,
        min: 5,
        max: 100,
        context: "max",
      },
      scale,
    ),
  }),
  {},
);

const duration = content(
  { type: "ranged", unit: "ms", min: 250, max: 750 },
  scale,
);
const [x, y] = [
  content({ type: "ranged", min: 0, max: 1 }, scale),
  content({ type: "ranged", min: -4, max: 4 }, scale),
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
    grid: {
      fr,
      ...grid,
    },
    dim,
  },
  animation: {
    duration,
    timing: { x, y },
  },
};

Deno.bench({ warmup, n }, function interopTailwindcssExporterStress() {
  return interop("tailwindcss", dict);
});

Deno.bench({ warmup, n }, function interopStyledictionaryExporterStress() {
  return interop("styledictionary", dict);
});
