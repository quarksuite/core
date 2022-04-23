import { ms } from "../../content.js";

const warmup = 10;
const n = 1000;
const ratio = [1.25, 1.5, 1.75, 2];

Deno.bench({ warmup, n }, function ms10() {
  return ms({ ratio, values: 10 }, 1);
});

Deno.bench({ warmup, n }, function ms25() {
  return ms({ ratio, values: 25 }, 1);
});

Deno.bench({ warmup, n }, function ms50() {
  return ms({ ratio, values: 50 }, 1);
});

Deno.bench({ warmup, n }, function ms100() {
  return ms({ ratio, values: 100 }, 1);
});

Deno.bench({ warmup, n }, function ms250() {
  return ms({ ratio, values: 250 }, 1);
});

Deno.bench({ warmup, n }, function ms500() {
  return ms({ ratio, values: 500 }, 1);
});
