import { adjust, palette, tokens } from "../../color.js";
import { pipeline, preset, propagate } from "../../workflow.js";

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
  const assemble = preset(propagate, tokens);
  const categorize = (data) =>
    data.reduce(
      (acc, tokens, i) => ({ ...acc, [String.fromCharCode(97 + i)]: tokens }),
      {},
    );

  return pipeline(data, generate, assemble, categorize);
}

Deno.bench({ warmup, n }, function colorTokensStress() {
  return paletteFactory(swatches);
});
