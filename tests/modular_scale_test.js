// [[file:../README.org::*Modular Scale Assertions][Modular Scale Assertions:1]]
import { chunk, create, merge, units, update } from "./modular_scale.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC create: can generate raw modular scales", function () {
  assertEquals(create(6, 1.25, 1), [
    1,
    1.25,
    1.5625,
    1.953125,
    2.44140625,
    3.0517578125,
  ]);
  assertEquals(create(8, 1.5, 1), [
    1,
    1.5,
    2.25,
    3.375,
    5.0625,
    7.59375,
    11.390625,
    17.0859375,
  ]);
  assertEquals(create(10, 2, 1), [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
  ]);
});

Deno.test("SPEC update: can update values with an in-place recalculation", function () {
  const scale = create(8, 2, 1);

  assertEquals(update((n) => n + 16, scale), [
    17,
    18,
    20,
    24,
    32,
    48,
    80,
    144,
  ]);
  assertEquals(update((n) => n / 4, scale), [
    0.25,
    0.5,
    1,
    2,
    4,
    8,
    16,
    32,
  ]);
  assertEquals(update((n) => n * 2, scale), [
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
  ]);
});

Deno.test("SPEC merge: can combine values from multiple scales into one scale", function () {
  const a = create(8, 1.5, 1);
  const b = create(6, 1.25, 1);
  const c = create(4, 1.75, 1);

  assertEquals(merge(a, b), [
    1,
    1.25,
    1.5,
    1.5625,
    1.953125,
    2.25,
    2.44140625,
    3.0517578125,
    3.375,
    5.0625,
    7.59375,
    11.390625,
    17.0859375,
  ]);
  assertEquals(merge(a, c), [
    1,
    1.5,
    1.75,
    2.25,
    3.0625,
    3.375,
    5.0625,
    5.359375,
    7.59375,
    11.390625,
    17.0859375,
  ]);
  assertEquals(merge(b, c), [
    1,
    1.25,
    1.5625,
    1.75,
    1.953125,
    2.44140625,
    3.0517578125,
    3.0625,
    5.359375,
  ]);
});

Deno.test("SPEC chunk: can split a larger set of scale values into multiple scales of a given size", function () {
  const [first, second, third, ...rest] = chunk(5, create(24, 1.5, 1));

  assertEquals(first, [1, 1.5, 2.25, 3.375, 5.0625]);
  assertEquals(second, [
    7.59375,
    11.390625,
    17.0859375,
    25.62890625,
    38.443359375,
  ]);
  assertEquals(third, [
    57.6650390625,
    86.49755859375,
    129.746337890625,
    194.6195068359375,
    291.92926025390625,
  ]);
  assertEquals(rest, [
    [
      437.8938903808594,
      656.8408355712891,
      985.2612533569336,
      1477.8918800354004,
      2216.8378200531006,
    ],
    [
      3325.256730079651,
      4987.885095119476,
      7481.8276426792145,
      11222.741464018822,
    ],
  ]);
});

Deno.test("SPEC units: can attach units and output CSS-ready modular scales", function () {
  assertEquals(units("rem", create(6, 1.5, 1)), [
    "1rem",
    "1.5rem",
    "2.25rem",
    "3.375rem",
    "5.063rem",
    "7.594rem",
  ]);
  assertEquals(units("ex", create(4, 2, 1)), [
    "1ex",
    "2ex",
    "4ex",
    "8ex",
  ]);
  assertEquals(units("pt", create(5, 1.25, 12)), [
    "12pt",
    "15pt",
    "18.75pt",
    "23.44pt",
    "29.3pt",
  ]);
});

Deno.test("EDGE: scale modifiers (update, merge, chunk, units) reject empty scales", function () {
  assertThrows(
    () => {
      throw update((n) => n, []);
    },
    undefined,
    "not a modular scale",
  );
  assertThrows(
    () => {
      throw merge([], []);
    },
    undefined,
    "not a modular scale",
  );
  assertThrows(
    () => {
      throw chunk(3, []);
    },
    undefined,
    "not a modular scale",
  );
  assertThrows(
    () => {
      throw units("rem", []);
    },
    undefined,
    "not a modular scale",
  );
});
// Modular Scale Assertions:1 ends here
