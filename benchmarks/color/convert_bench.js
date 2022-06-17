import { adjust, convert } from "../../color.js";

const warmup = 10;
const n = 100;
const settings = { lightness: -100, chroma: 100, hue: 360 };

const sample = adjust({ ...settings, steps: 250 }, "red");

Deno.bench({ warmup, n }, function convert_stress() {
  return sample.map((color) => convert("rgb", color));
});
