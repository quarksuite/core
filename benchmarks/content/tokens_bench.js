import { ms, tokens } from "../../content.js";

const warmup = 10;
const n = 1000;
const ratio = [1.25, 1.5, 1.75, 2];

Deno.bench({ warmup, n }, function contentTokenStress() {
  const scale = ms({ ratio, values: 100 }, 1);

  const size = tokens({ unit: "rem", inversion: "em" }, scale);
  const measure = tokens(
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
  const leading = tokens(
    { type: "ranged", min: 1.25, max: 1.5, context: "max" },
    scale,
  );

  const grid = tokens({ type: "grid" }, scale);

  const dimensions = ["w", "h", "min", "max"].reduce(
    (acc, context) => ({
      ...acc,
      [context]: tokens(
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
  const tok = { size, measure, leading, grid, dimensions };

  return tok;
});
