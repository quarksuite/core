import { scale } from "../../content.js";

const warmup = 5;
const n = 100;

const ratio = [1.25, 1.5, 1.75, 2];
const values = 250;

Deno.bench({ warmup, n }, function scale_stress() {
  return scale({ ratio, values }, "1rem");
});
