import { adjust, output, palette } from "../../color.js";
import { pipeline, preset, propagate } from "../../workflow.js";

const warmup = 5;
const n = 100;

const swatches = adjust({ hue: 360, steps: 26 }, "#7ea"); // a-z categorization
const material = preset(palette, {
  contrast: 90,
  accented: true,
  stated: true,
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

const dict = {
  project: {},
  color: paletteFactory(swatches),
};

Deno.bench({ warmup, n }, function gpl_stress() {
  return output("gpl", dict);
});

Deno.bench({ warmup, n }, function sketchpalette_stress() {
  return output("sketchpalette", dict);
});
