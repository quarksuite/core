import { modify, ms } from "../../content.js";

const warmup = 10;
const n = 1000;
const ratio = [1.25, 1.5, 1.75, 2];

const calc = (n) => (Math.cbrt(n) * Math.sqrt(n)) / Math.atan2(n, n ** 2);

const ms10 = ms({ ratio, values: 10 }, 1);
const ms25 = ms({ ratio, values: 25 }, 1);
const ms50 = ms({ ratio, values: 50 }, 1);
const ms100 = ms({ ratio, values: 100 }, 1);
const ms250 = ms({ ratio, values: 250 }, 1);
const ms500 = ms({ ratio, values: 500 }, 1);

Deno.bench({ warmup, n }, function modify10() {
  return modify(calc, ms10);
});

Deno.bench({ warmup, n }, function modify25() {
  return modify(calc, ms25);
});

Deno.bench({ warmup, n }, function modify50() {
  return modify(calc, ms50);
});

Deno.bench({ warmup, n }, function modify100() {
  return modify(calc, ms100);
});

Deno.bench({ warmup, n }, function modify250() {
  return modify(calc, ms250);
});

Deno.bench({ warmup, n }, function modify500() {
  return modify(calc, ms500);
});
