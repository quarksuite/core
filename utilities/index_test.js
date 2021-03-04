// [[file:../README.org::*Utilities Assertions][Utilities Assertions:1]]
import { bind, compose, pipe } from "./index.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

const isString = (x) => typeof x === "string";
const isArray = (x) => Array.isArray(x);

const upper = (x) => isString(x) && x.toUpperCase();
const lower = (x) => isString(x) && x.toLowerCase();

const trim = (x) => isString(x) && x.trim();

const split = (x) => isString(x) && x.split("");

const box = (x) => [x];
const unbox = (x) => isArray(x) && x.toString();

Deno.test("SPEC compose: combines two data operators", function () {
  const splitSafe = compose(split, unbox);
    assertEquals(splitSafe("hello"), "h,e,l,l,o");
});

Deno.test("SPEC compose: can combine a chain of data operators", function () {
  const upperSplitSafe = compose(trim, upper, split);
  assertEquals(upperSplitSafe("   hello      "), ["H", "E", "L", "L", "O"]);
});

Deno.test("EDGE compose: rejects values that are not functions", function () {
  const failsFuncClause = compose(split, 5);
  assertThrows(
    () => {
      throw failsFuncClause("hello");
    },
    undefined,
    "not a function",
  );
});

Deno.test("SPEC pipe: can transform data", function () {
  assertEquals(pipe("hello", upper), "HELLO");
});

Deno.test("SPEC pipe: can chain operators", function () {
  assertEquals(
    pipe(
      "hello",
      split,
      (x) => x.map((xs) => xs.charCodeAt(0)),
      (x) => x.map((xs) => xs + 16),
      (x) => x.map((xs) => String.fromCharCode(xs)),
      (x) => x.join(""),
    ),
    "xu||\x7f",
  );
});

const splitWith = (delimiter, x) => isString(x) && x.split(delimiter);
const filterAs = (condition, x) => isArray(x) && x.filter(condition);
const map = (transform, x) => box(x).map(transform);

const normalize = (b, a, x) => Math.round(Math.min(Math.max(x, a), b));

Deno.test("SPEC bind: can initialize arguments and wait for remaining", function () {
  const filterEven = bind(filterAs, (x) => x % 2 === 0);
  assertEquals(filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9]), [2, 4, 6, 8]);
});

Deno.test("SPEC bind: initialize arguments in sequence for a full curry", function () {
  const limit = bind(normalize, 240);
  const threshold = bind(limit, 160);
  assertEquals(threshold(320), 240);
});

Deno.test("SPEC bind: when initial arguments match function arity, simply execute", function () {
  const boundMap = bind(map, (x, i) => `mapped ${x} at ${i}`, [
    ...Array(8).fill("hi"),
  ]);
  const standardMap = map((x, i) => `mapped ${x} at ${i}`, [
    ...Array(8).fill("hi"),
  ]);
  assertEquals(boundMap, standardMap);
});
// Utilities Assertions:1 ends here
