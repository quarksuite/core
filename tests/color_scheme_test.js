// [[file:../README.org::*Color Scheme Generation Assertions][Color Scheme Generation Assertions:1]]
import {
  analogous,
  complementary,
  custom,
  dualComplementary,
  splitComplementary,
  square,
  tetradic,
  triadic,
} from "../color_scheme.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test(
  "SPEC complementary: generate base hues for complementary scheme",
  function () {
    assertEquals(complementary("red"), ["#ff0000", "#00ffff"]);
    assertEquals(complementary("lime"), ["#00ff00", "#ff00ff"]);
    assertEquals(complementary("blue"), ["#0000ff", "#ffff00"]);
  },
);

Deno.test(
  "SPEC analogous: generate base hues for analogous scheme",
  function () {
    assertEquals(analogous("red"), ["#ff0000", "#ff0080", "#ff8000"]);
    assertEquals(analogous("lime"), ["#00ff00", "#80ff00", "#00ff80"]);
    assertEquals(analogous("blue"), ["#0000ff", "#0080ff", "#8000ff"]);
  },
);

Deno.test(
  "SPEC splitComplementary: generate base hues for split complementary scheme",
  function () {
    assertEquals(splitComplementary("red"), ["#ff0000", "#0080ff", "#00ff80"]);
    assertEquals(splitComplementary("lime"), ["#00ff00", "#ff0080", "#8000ff"]);
    assertEquals(splitComplementary("blue"), ["#0000ff", "#80ff00", "#ff8000"]);
  },
);

Deno.test("SPEC triadic: generate base hues for triadic scheme", function () {
  assertEquals(triadic("red"), ["#ff0000", "#0000ff", "#00ff00"]);
  assertEquals(triadic("cyan"), ["#00ffff", "#ffff00", "#ff00ff"]);
});

Deno.test("SPEC tetradic: generate base hues for tetradic scheme", function () {
  assertEquals(tetradic("red"), ["#ff0000", "#ff00ff", "#00ffff", "#00ff00"]);
  assertEquals(tetradic("lime"), ["#00ff00", "#ffff00", "#ff00ff", "#0000ff"]);
  assertEquals(tetradic("blue"), ["#0000ff", "#00ffff", "#ffff00", "#ff0000"]);
});

Deno.test("ALIAS dualComplementary of tetradic", function () {
  assertEquals(dualComplementary("cyan"), [
    "#00ffff",
    "#00ff00",
    "#ff0000",
    "#ff00ff",
  ]);
});

Deno.test("SPEC square: generate base hues for square scheme", function () {
  assertEquals(square("red"), ["#ff0000", "#8000ff", "#00ffff", "#80ff00"]);
  assertEquals(square("lime"), ["#00ff00", "#ff8000", "#ff00ff", "#0080ff"]);
  assertEquals(square("blue"), ["#0000ff", "#00ff80", "#ffff00", "#ff0080"]);
});

Deno.test("SPEC custom: simulate complementary", function () {
  assertEquals(custom({ hues: 2, arc: 180 }, "red"), ["#ff0000", "#00ffff"]);
});

Deno.test("SPEC custom: simulate triadic", function () {
  assertEquals(custom({ hues: 3, arc: 120 }, "red"), [
    "#ff0000",
    "#0000ff",
    "#00ff00",
  ]);
});

Deno.test("SPEC custom: simulate square", function () {
  assertEquals(custom({ hues: 4, arc: 90 }, "red"), [
    "#ff0000",
    "#8000ff",
    "#00ffff",
    "#80ff00",
  ]);
});

Deno.test("SPEC custom: 4 color analogous", function () {
  assertEquals(custom({ hues: 4, arc: 30 }, "red"), [
    "#ff0000",
    "#ff0080",
    "#ff00ff",
    "#ff8000",
  ]);
});

Deno.test("SPEC custom: accented triad", function () {
  assertEquals(custom({ hues: 5, arc: 30, offset: 120 }, "red"), [
    "#ff0000",
    "#0000ff",
    "#0080ff",
    "#00ff00",
    "#00ff80",
  ]);
});

Deno.test("SPEC custom: accented split complementary", function () {
  assertEquals(custom({ hues: 4, arc: 30, offset: 150 }, "red"), [
    "#ff0000",
    "#0080ff",
    "#00ffff",
    "#00ff80",
  ]);
});

Deno.test("EDGE: rejects invalid color", function () {
  const fns = [
    complementary,
    analogous,
    splitComplementary,
    triadic,
    tetradic,
    square,
  ];

  fns.map((fn) =>
    assertThrows(
      () => {
        throw fn("invalid");
      },
      undefined,
      "not a valid CSS color",
    )
  );
  assertThrows(
    () => {
      throw custom({ hues: 2, arc: 180 }, "invalid");
    },
    undefined,
    "not a valid CSS color",
  );
});
// Color Scheme Generation Assertions:1 ends here
