import { mix, output } from "../../color.js";

const warmup = 10;
const n = 1000;

const color = mix({ target: "blue", strength: 100, steps: 10000 }, "red");

const dict = {
  project: {},
  color: color.reduce(
    (acc, swatch, index) => ({ ...acc, [`${++index}00`]: swatch }),
    {},
  ),
};

Deno.bench({ warmup, n }, function outputGplStress() {
  return output("gpl", dict);
});

Deno.bench({ warmup, n }, function outputSketchpaletteStress() {
  return output("sketchpalette", dict);
});
