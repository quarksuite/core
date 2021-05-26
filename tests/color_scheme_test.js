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
    assertEquals(complementary("red"), ["#ff0000", "#00a9db"]);
    assertEquals(complementary("lime"), ["#00ff00", "#ff7dff"]);
    assertEquals(complementary("blue"), ["#0000ff", "#a02000"]);
  },
);

Deno.test(
  "SPEC analogous: generate base hues for analogous scheme",
  function () {
    assertEquals(analogous("red"), ["#ff0000", "#f50084", "#ef4600"]);
    assertEquals(analogous("lime"), ["#00ff00", "#dbe100", "#00ffbe"]);
    assertEquals(analogous("blue"), ["#0000ff", "#0053e4", "#6e00ec"]);
  },
);

Deno.test(
  "SPEC splitComplementary: generate base hues for split complementary scheme",
  function () {
    assertEquals(splitComplementary("red"), ["#ff0000", "#649bec", "#00b2b8"]);
    assertEquals(splitComplementary("lime"), ["#00ff00", "#ff70b9", "#ca93ff"]);
    assertEquals(splitComplementary("blue"), ["#0000ff", "#943800", "#9c194e"]);
  },
);

Deno.test("SPEC triadic: generate base hues for triadic scheme", function () {
  assertEquals(triadic("red"), ["#ff0000", "#00ae00", "#4f6fff"]);
  assertEquals(triadic("cyan"), ["#00ffff", "#ffbfff", "#ffd05c"]);
});

Deno.test("SPEC tetradic: generate base hues for tetradic scheme", function () {
  assertEquals(tetradic("red"), ["#ff0000", "#c57500", "#00a9db", "#978be8"]);
  assertEquals(tetradic("lime"), ["#00ff00", "#00ffff", "#ff7dff", "#ff7366"]);
  assertEquals(tetradic("blue"), ["#0000ff", "#9e00b2", "#a02000", "#775100"]);
});

Deno.test("ALIAS dualComplementary of tetradic", function () {
  assertEquals(dualComplementary("cyan"), [
    "#00ffff",
    "#96e3ff",
    "#ffb3bf",
    "#f2c18b",
  ]);
});

Deno.test("SPEC square: generate base hues for square scheme", function () {
  assertEquals(square("red"), ["#ff0000", "#7b9900", "#00a9db", "#a34fff"]);
  assertEquals(square("lime"), ["#00ff00", "#00e9ff", "#ff7dff", "#ff8300"]);
  assertEquals(square("blue"), ["#0000ff", "#c00061", "#a02000", "#008048"]);
});

Deno.test("SPEC custom: simulate complementary", function () {
  assertEquals(custom({ hues: 2, arc: 180 }, "red"), ["#ff0000", "#00a9db"]);
});

Deno.test("SPEC custom: simulate analogous", function () {
  assertEquals(custom({ hues: 3, arc: 30 }, "red"), [
    "#ff0000",
    "#f50084",
    "#ef4600",
  ]);
});

Deno.test("SPEC custom: simulate triadic", function () {
  assertEquals(custom({ hues: 3, arc: 120 }, "red"), [
    "#ff0000",
    "#4f6fff",
    "#00ae00",
  ]);
});

Deno.test("SPEC custom: simulate square", function () {
  assertEquals(custom({ hues: 4, arc: 90 }, "red"), [
    "#ff0000",
    "#a34fff",
    "#00a9db",
    "#7b9900",
  ]);
});

Deno.test("SPEC custom: dyad", function () {
  assertEquals(custom({ hues: 2, arc: 60 }, "red"), ["#ff0000", "#d62fd2"]);
});

Deno.test("SPEC custom: extended analogous", function () {
  assertEquals(custom({ hues: 4, arc: 30 }, "red"), [
    "#ff0000",
    "#f50084",
    "#d62fd2",
    "#ef4600",
  ]);
});

Deno.test("SPEC custom: accented triad", function () {
  assertEquals(custom({ hues: 5, arc: 60, offset: 120 }, "red"), [
    "#ff0000",
    "#4f6fff",
    "#00a9db",
    "#00ae00",
  ]);
});

Deno.test("SPEC custom: accented split complementary", function () {
  assertEquals(custom({ hues: 4, arc: 30, offset: 150 }, "red"), [
    "#ff0000",
    "#0090ff",
    "#00a9db",
    "#00b48c",
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
