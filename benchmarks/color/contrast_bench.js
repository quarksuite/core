import { contrast } from "../../color.js";

const warmup = 10;
const n = 1000;
const settings = { factor: 50, severity: 100 };

Deno.bench({ warmup, n }, function contrastInterpolation10() {
  return contrast({ ...settings, steps: 10 }, "red");
});

Deno.bench({ warmup, n }, function contrastInterpolation25() {
  return contrast({ ...settings, steps: 25 }, "red");
});

Deno.bench({ warmup, n }, function contrastInterpolation50() {
  return contrast({ ...settings, steps: 50 }, "red");
});

Deno.bench({ warmup, n }, function contrastInterpolation100() {
  return contrast({ ...settings, steps: 100 }, "red");
});

Deno.bench({ warmup, n }, function contrastInterpolation250() {
  return contrast({ ...settings, steps: 250 }, "red");
});

Deno.bench({ warmup, n }, function contrastInterpolation500() {
  return contrast({ ...settings, steps: 500 }, "red");
});
