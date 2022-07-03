import { adjust, palette, perception } from "../../color.js";
import { pipeline, preset, propagate } from "../../workflow.js";

const warmup = 5;
const n = 100;

const swatches = adjust({ hue: 360, steps: 26 }, "#7ea"); // a-z categorization
const material = preset(palette, {
  contrast: 90,
  accents: true,
  states: true,
});

const protanopia = preset(perception, { check: "vision", as: "protanopia" });

function paletteFactory(data) {
  const generate = preset(propagate, material);
  const simulate = preset(propagate, protanopia);
  const categorize = (data) =>
    data.reduce(
      (acc, tokens, i) => ({ ...acc, [String.fromCharCode(97 + i)]: tokens }),
      {},
    );

  return pipeline(data, generate, simulate, categorize);
}

Deno.bench({ warmup, n }, function perception_stress() {
  return paletteFactory(swatches);
});
