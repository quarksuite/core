import { adjust } from "../../color.js";

const warmup = 5;
const n = 100;
const settings = { lightness: -100, chroma: 100, hue: 360 };

Deno.bench({ warmup, n }, function adjust_stress() {
  return adjust({ ...settings, steps: 250 }, "red");
});
