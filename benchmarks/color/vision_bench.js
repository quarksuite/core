import { vision } from "../../color.js";

const warmup = 10;
const n = 1000;
const settings = { as: "protanomaly", severity: 100 };

Deno.bench({ warmup, n }, function visionInterpolation10() {
  return vision({ ...settings, steps: 10 }, "red");
});

Deno.bench({ warmup, n }, function visionInterpolation25() {
  return vision({ ...settings, steps: 25 }, "red");
});

Deno.bench({ warmup, n }, function visionInterpolation50() {
  return vision({ ...settings, steps: 50 }, "red");
});

Deno.bench({ warmup, n }, function visionInterpolation100() {
  return vision({ ...settings, steps: 100 }, "red");
});

Deno.bench({ warmup, n }, function visionInterpolation250() {
  return vision({ ...settings, steps: 250 }, "red");
});

Deno.bench({ warmup, n }, function visionInterpolation500() {
  return vision({ ...settings, steps: 500 }, "red");
});
