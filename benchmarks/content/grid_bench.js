import { grid } from "../../content.js";

const warmup = 5;
const n = 100;

Deno.bench({ warmup, n }, function grid_stress() {
  return grid({}, 250);
});
