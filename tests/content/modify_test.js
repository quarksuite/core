import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { ms, modify } from "../../content.js";

describe("modify(calc, ms)", () => {
  const $ms = ms({}, 1);

  it("calc can be a simple operation", () => {
    expect(modify((n) => n, $ms)).toEqual([
      1, 1.5, 2.25, 3.375, 5.0625, 7.59375,
    ]);
    expect(modify((n) => n + 2, $ms)).toEqual([
      3, 3.5, 4.25, 5.375, 7.0625, 9.59375,
    ]);
    expect(modify((n) => n - 2, $ms)).toEqual([
      -1, -0.5, 0.25, 1.375, 3.0625, 5.59375,
    ]);
    expect(modify((n) => n * 2, $ms)).toEqual([
      2, 3, 4.5, 6.75, 10.125, 15.1875,
    ]);
    expect(modify((n) => n / 2, $ms)).toEqual([
      0.5, 0.75, 1.125, 1.6875, 2.53125, 3.796875,
    ]);
    expect(modify((n) => n % 2, $ms)).toEqual([
      1, 1.5, 0.25, 1.375, 1.0625, 1.59375,
    ]);
  });

  it("calc can be a complex equation", () => {
    expect(modify((n) => Math.atan2(2, n), $ms)).toEqual([
      1.1071487177940904, 0.9272952180016122, 0.7266423406817256,
      0.5349550737860964, 0.3762420106373734, 0.2575262671254991,
    ]);
    expect(modify((n) => n ** Math.sqrt(n), $ms)).toEqual([
      1, 1.6431108612687646, 3.375, 9.343313021585121, 38.443359375,
      266.84080815296215,
    ]);
    expect(modify((n) => Math.cos(n / Math.PI) + Math.cbrt(n), $ms)).toEqual([
      1.9497657153816386, 2.032877002728687, 2.0646784633691624,
      1.9763514747005062, 1.6764350839687352, 1.2166767404108056,
    ]);
  });
});

run();
