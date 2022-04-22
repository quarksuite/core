import { mix } from "../../color.js";

const warmup = 10;
const n = 1000;
const settings = { target: "blue", strength: 100 };

Deno.bench({ warmup, n }, function blendInterpolation10() {
  return mix({ ...settings, steps: 10 }, "red");
});

Deno.bench({ warmup, n }, function blendInterpolation25() {
  return mix({ ...settings, steps: 25 }, "red");
});

Deno.bench({ warmup, n }, function blendInterpolation50() {
  return mix({ ...settings, steps: 50 }, "red");
});

Deno.bench({ warmup, n }, function blendInterpolation100() {
  return mix({ ...settings, steps: 100 }, "red");
});

Deno.bench({ warmup, n }, function blendInterpolation250() {
  return mix({ ...settings, steps: 250 }, "red");
});

Deno.bench({ warmup, n }, function blendInterpolation500() {
  return mix({ ...settings, steps: 500 }, "red");
});
