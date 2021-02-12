// [[file:~/Code/project/@quarksuite/core/README.org::*assertions][assertions:1]]
import { compose, pipe } from "./index.js";

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

Deno.test(
  "EDGE compose: rejects functions that are not data operators",
  function () {
    const add = (y, x) => x + y;
    const failsUnaryClause = compose(split, upper, add);
    assertThrows(
      () => {
        throw failsUnaryClause("hello");
      },
      undefined,
      "not a data operator",
    );
  },
);

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
// assertions:1 ends here
