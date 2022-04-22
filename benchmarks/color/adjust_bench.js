import { adjust } from "../../color.js";

const warmup = 10;
const n = 1000;
const settings = { lightness: -100, chroma: 100, hue: 360 };

Deno.bench({ warmup, n }, function adjustmentInterpolation10() {
  return adjust({ ...settings, steps: 10 }, "red");
});

Deno.bench({ warmup, n }, function adjustmentInterpolation25() {
  return adjust({ ...settings, steps: 25 }, "red");
});

Deno.bench({ warmup, n }, function adjustmentInterpolation50() {
  return adjust({ ...settings, steps: 50 }, "red");
});

Deno.bench({ warmup, n }, function adjustmentInterpolation100() {
  return adjust({ ...settings, steps: 100 }, "red");
});

Deno.bench({ warmup, n }, function adjustmentInterpolation250() {
  return adjust({ ...settings, steps: 250 }, "red");
});

Deno.bench({ warmup, n }, function adjustmentInterpolation500() {
  return adjust({ ...settings, steps: 500 }, "red");
});
