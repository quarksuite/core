import { adjust, harmony } from "../../color.js";

const warmup = 5;
const n = 100;
const settings = { lightness: -100, chroma: 100, hue: 360 };

const sample = adjust({ ...settings, steps: 250 }, "red");

Deno.bench({ warmup, n }, function harmony_stress() {
  return sample.map((color) => harmony({ configuration: "analogous" }, color));
});
