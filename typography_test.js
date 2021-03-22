// [[file:README.org::*Typography Assertions][Typography Assertions:1]]
import { systemfonts } from "./typography.js";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.86.0/testing/asserts.ts";

Deno.test("SPEC systemfonts: can output a collection of system font stacks for prototyping", function () {
  assertEquals(systemfonts("sans-serif"), [
    "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
  ]);
  assertEquals(systemfonts("sans-serif", "serif"), [
    "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
    "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  ]);
  assertEquals(systemfonts("sans-serif", "serif", "monospace"), [
    "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
    "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
  ]);
});

Deno.test("EGDE systemfonts: rejects invalid family keys", function () {
  assertThrows(
    () => {
      throw systemfonts("invalid");
    },
    undefined,
    "not a system font stack family",
  );
});
// Typography Assertions:1 ends here
