import { mix } from "../../color.js";

const warmup = 5;
const n = 100;

const settings = { target: "blue", strength: 100 };

Deno.bench({ warmup, n }, function mix_stress() {
  return mix({ ...settings, steps: 250 }, "red");
});
