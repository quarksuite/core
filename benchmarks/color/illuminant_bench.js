import { illuminant } from "../../color.js";

const warmup = 10;
const n = 1000;
const settings = { K: 6500, intensity: 100 };

Deno.bench({ warmup, n }, function illuminantInterpolation10() {
  return illuminant({ ...settings, steps: 10 }, "red");
});

Deno.bench({ warmup, n }, function illuminantInterpolation25() {
  return illuminant({ ...settings, steps: 25 }, "red");
});

Deno.bench({ warmup, n }, function illuminantInterpolation50() {
  return illuminant({ ...settings, steps: 50 }, "red");
});

Deno.bench({ warmup, n }, function illuminantInterpolation100() {
  return illuminant({ ...settings, steps: 100 }, "red");
});

Deno.bench({ warmup, n }, function illuminantInterpolation250() {
  return illuminant({ ...settings, steps: 250 }, "red");
});

Deno.bench({ warmup, n }, function illuminantInterpolation500() {
  return illuminant({ ...settings, steps: 500 }, "red");
});
