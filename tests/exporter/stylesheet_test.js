import {
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan@1.0.1/mod.ts";
import { palette } from "../../color.js";
import { grid, scale, text } from "../../content.js";
import { stylesheet } from "../../exporter.js";

const swatch = "rebeccapurple";

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Stylesheet Variables",
    author: "Chatman R. Jr",
    version: "0.1.0",
    license: "Unlicense",
  },
  color: palette({}, swatch),
  text: {
    primary: text({}, ""),
    secondary: text({ system: "serif", weights: ["light", "black"] }, ""),
    source: text({ system: "monospace" }, ""),
    size: scale({ inversion: "em" }, "1rem"),
    leading: scale({ configuration: "ranged", floor: 1.25 }, 1.5),
    measure: scale(
      {
        configuration: "ranged",
        floor: "45ch",
        trunc: true,
      },
      "75ch",
    ),
  },
  layout: {
    grid: grid({}, 3),
    spacing: scale({}, "1rem"),
    dimensions: {
      width: scale({ configuration: "ranged", floor: "25vw" }, "100vw"),
      height: scale({ configuration: "ranged", floor: "25vh" }, "100vh"),
      smallest: scale({ configuration: "ranged", floor: "25vmin" }, "100vmin"),
      largest: scale({ configuration: "ranged", floor: "25vmax" }, "100vmax"),
    },
  },
};

describe("stylesheet(format, dict)", () => {
  const removeTimestamp = (format) =>
    format.replace(
      /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]",
    );

  describe("format = 'css'", () => {
    it("should correctly output CSS variables from the sample dictionary", () => {
      expect(removeTimestamp(stylesheet("css", dict))).toBe(`
/**
 * Project: Example Stylesheet Variables (v0.1.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * --------------------------------------------------------------------------------
 * [Timestamp replaced for testing]
 **/

:root {
  --color-50: #eeeaf6;
  --color-100: #d1c5e4;
  --color-200: #b5a1d2;
  --color-300: #9a7dc0;
  --color-400: #7f59ad;
  --color-500: #552e7e;
  --color-600: #452964;
  --color-700: #35234b;
  --color-800: #261c34;
  --color-900: #18151d;
  --color-bg: #ffffff;
  --color-fg: #111111;
  --text-primary-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  --text-primary-regular: 400;
  --text-primary-bold: 700;
  --text-secondary-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  --text-secondary-light: 300;
  --text-secondary-black: 900;
  --text-source-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  --text-source-regular: 400;
  --text-source-bold: 700;
  --text-size: 1rem;
  --text-size-x2: 1.5rem;
  --text-size-x3: 2.25rem;
  --text-size-x4: 3.375rem;
  --text-size-x5: 5.0625rem;
  --text-size-x6: 7.5938rem;
  --text-size-d2: 0.66667em;
  --text-size-d3: 0.44444em;
  --text-size-d4: 0.2963em;
  --text-size-d5: 0.19753em;
  --text-size-d6: 0.13169em;
  --text-leading: 1.5;
  --text-leading-i2: 1.4167;
  --text-leading-i3: 1.3611;
  --text-leading-i4: 1.3241;
  --text-leading-i5: 1.2994;
  --text-leading-i6: 1.2829;
  --text-leading-min: 1.25;
  --text-measure: 75ch;
  --text-measure-i2: 65ch;
  --text-measure-i3: 58ch;
  --text-measure-i4: 53ch;
  --text-measure-i5: 50ch;
  --text-measure-i6: 48ch;
  --text-measure-min: 45ch;
  --layout-grid-columns: 3;
  --layout-grid-rows: 3;
  --layout-grid-col-1: 1;
  --layout-grid-col-2: 2;
  --layout-grid-col-3: 3;
  --layout-grid-col--1: -1;
  --layout-grid-col--2: -2;
  --layout-grid-col--3: -3;
  --layout-grid-col-fr: 1fr;
  --layout-grid-col-fr-x2: 1.5fr;
  --layout-grid-col-fr-x3: 2.25fr;
  --layout-grid-col-fr-d2: 0.66667fr;
  --layout-grid-col-fr-d3: 0.44444fr;
  --layout-grid-row-1: 1;
  --layout-grid-row-2: 2;
  --layout-grid-row-3: 3;
  --layout-grid-row--1: -1;
  --layout-grid-row--2: -2;
  --layout-grid-row--3: -3;
  --layout-grid-row-fr: 1fr;
  --layout-grid-row-fr-x2: 1.5fr;
  --layout-grid-row-fr-x3: 2.25fr;
  --layout-grid-row-fr-d2: 0.66667fr;
  --layout-grid-row-fr-d3: 0.44444fr;
  --layout-spacing: 1rem;
  --layout-spacing-x2: 1.5rem;
  --layout-spacing-x3: 2.25rem;
  --layout-spacing-x4: 3.375rem;
  --layout-spacing-x5: 5.0625rem;
  --layout-spacing-x6: 7.5938rem;
  --layout-spacing-d2: 0.66667rem;
  --layout-spacing-d3: 0.44444rem;
  --layout-spacing-d4: 0.2963rem;
  --layout-spacing-d5: 0.19753rem;
  --layout-spacing-d6: 0.13169rem;
  --layout-dimensions-width: 100vw;
  --layout-dimensions-width-i2: 75vw;
  --layout-dimensions-width-i3: 58.333vw;
  --layout-dimensions-width-i4: 47.222vw;
  --layout-dimensions-width-i5: 39.815vw;
  --layout-dimensions-width-i6: 34.876vw;
  --layout-dimensions-width-min: 25vw;
  --layout-dimensions-height: 100vh;
  --layout-dimensions-height-i2: 75vh;
  --layout-dimensions-height-i3: 58.333vh;
  --layout-dimensions-height-i4: 47.222vh;
  --layout-dimensions-height-i5: 39.815vh;
  --layout-dimensions-height-i6: 34.876vh;
  --layout-dimensions-height-min: 25vh;
  --layout-dimensions-smallest: 100vmin;
  --layout-dimensions-smallest-i2: 75vmin;
  --layout-dimensions-smallest-i3: 58.333vmin;
  --layout-dimensions-smallest-i4: 47.222vmin;
  --layout-dimensions-smallest-i5: 39.815vmin;
  --layout-dimensions-smallest-i6: 34.876vmin;
  --layout-dimensions-smallest-min: 25vmin;
  --layout-dimensions-largest: 100vmax;
  --layout-dimensions-largest-i2: 75vmax;
  --layout-dimensions-largest-i3: 58.333vmax;
  --layout-dimensions-largest-i4: 47.222vmax;
  --layout-dimensions-largest-i5: 39.815vmax;
  --layout-dimensions-largest-i6: 34.876vmax;
  --layout-dimensions-largest-min: 25vmax;

}
`);
    });
  });

  describe("format = 'scss'", () => {
    it("should correctly output Sass variables from the sample dictionary", () => {
      expect(removeTimestamp(stylesheet("scss", dict))).toBe(`
/*!
 * Project: Example Stylesheet Variables (v0.1.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * --------------------------------------------------------------------------------
 * [Timestamp replaced for testing]
 */

$color-50: #eeeaf6;
$color-100: #d1c5e4;
$color-200: #b5a1d2;
$color-300: #9a7dc0;
$color-400: #7f59ad;
$color-500: #552e7e;
$color-600: #452964;
$color-700: #35234b;
$color-800: #261c34;
$color-900: #18151d;
$color-bg: #ffffff;
$color-fg: #111111;
$text-primary-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
$text-primary-regular: 400;
$text-primary-bold: 700;
$text-secondary-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
$text-secondary-light: 300;
$text-secondary-black: 900;
$text-source-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
$text-source-regular: 400;
$text-source-bold: 700;
$text-size: 1rem;
$text-size-x2: 1.5rem;
$text-size-x3: 2.25rem;
$text-size-x4: 3.375rem;
$text-size-x5: 5.0625rem;
$text-size-x6: 7.5938rem;
$text-size-d2: 0.66667em;
$text-size-d3: 0.44444em;
$text-size-d4: 0.2963em;
$text-size-d5: 0.19753em;
$text-size-d6: 0.13169em;
$text-leading: 1.5;
$text-leading-i2: 1.4167;
$text-leading-i3: 1.3611;
$text-leading-i4: 1.3241;
$text-leading-i5: 1.2994;
$text-leading-i6: 1.2829;
$text-leading-min: 1.25;
$text-measure: 75ch;
$text-measure-i2: 65ch;
$text-measure-i3: 58ch;
$text-measure-i4: 53ch;
$text-measure-i5: 50ch;
$text-measure-i6: 48ch;
$text-measure-min: 45ch;
$layout-grid-columns: 3;
$layout-grid-rows: 3;
$layout-grid-col-1: 1;
$layout-grid-col-2: 2;
$layout-grid-col-3: 3;
$layout-grid-col--1: -1;
$layout-grid-col--2: -2;
$layout-grid-col--3: -3;
$layout-grid-col-fr: 1fr;
$layout-grid-col-fr-x2: 1.5fr;
$layout-grid-col-fr-x3: 2.25fr;
$layout-grid-col-fr-d2: 0.66667fr;
$layout-grid-col-fr-d3: 0.44444fr;
$layout-grid-row-1: 1;
$layout-grid-row-2: 2;
$layout-grid-row-3: 3;
$layout-grid-row--1: -1;
$layout-grid-row--2: -2;
$layout-grid-row--3: -3;
$layout-grid-row-fr: 1fr;
$layout-grid-row-fr-x2: 1.5fr;
$layout-grid-row-fr-x3: 2.25fr;
$layout-grid-row-fr-d2: 0.66667fr;
$layout-grid-row-fr-d3: 0.44444fr;
$layout-spacing: 1rem;
$layout-spacing-x2: 1.5rem;
$layout-spacing-x3: 2.25rem;
$layout-spacing-x4: 3.375rem;
$layout-spacing-x5: 5.0625rem;
$layout-spacing-x6: 7.5938rem;
$layout-spacing-d2: 0.66667rem;
$layout-spacing-d3: 0.44444rem;
$layout-spacing-d4: 0.2963rem;
$layout-spacing-d5: 0.19753rem;
$layout-spacing-d6: 0.13169rem;
$layout-dimensions-width: 100vw;
$layout-dimensions-width-i2: 75vw;
$layout-dimensions-width-i3: 58.333vw;
$layout-dimensions-width-i4: 47.222vw;
$layout-dimensions-width-i5: 39.815vw;
$layout-dimensions-width-i6: 34.876vw;
$layout-dimensions-width-min: 25vw;
$layout-dimensions-height: 100vh;
$layout-dimensions-height-i2: 75vh;
$layout-dimensions-height-i3: 58.333vh;
$layout-dimensions-height-i4: 47.222vh;
$layout-dimensions-height-i5: 39.815vh;
$layout-dimensions-height-i6: 34.876vh;
$layout-dimensions-height-min: 25vh;
$layout-dimensions-smallest: 100vmin;
$layout-dimensions-smallest-i2: 75vmin;
$layout-dimensions-smallest-i3: 58.333vmin;
$layout-dimensions-smallest-i4: 47.222vmin;
$layout-dimensions-smallest-i5: 39.815vmin;
$layout-dimensions-smallest-i6: 34.876vmin;
$layout-dimensions-smallest-min: 25vmin;
$layout-dimensions-largest: 100vmax;
$layout-dimensions-largest-i2: 75vmax;
$layout-dimensions-largest-i3: 58.333vmax;
$layout-dimensions-largest-i4: 47.222vmax;
$layout-dimensions-largest-i5: 39.815vmax;
$layout-dimensions-largest-i6: 34.876vmax;
$layout-dimensions-largest-min: 25vmax;

`);
    });
  });

  describe("format = 'less'", () => {
    it("should correctly output Less varibles from the sample dictionary", () => {
      expect(removeTimestamp(stylesheet("less", dict))).toBe(`
/*
 * Project: Example Stylesheet Variables (v0.1.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * --------------------------------------------------------------------------------
 * [Timestamp replaced for testing]
 */

@color-50: #eeeaf6;
@color-100: #d1c5e4;
@color-200: #b5a1d2;
@color-300: #9a7dc0;
@color-400: #7f59ad;
@color-500: #552e7e;
@color-600: #452964;
@color-700: #35234b;
@color-800: #261c34;
@color-900: #18151d;
@color-bg: #ffffff;
@color-fg: #111111;
@text-primary-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
@text-primary-regular: 400;
@text-primary-bold: 700;
@text-secondary-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
@text-secondary-light: 300;
@text-secondary-black: 900;
@text-source-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
@text-source-regular: 400;
@text-source-bold: 700;
@text-size: 1rem;
@text-size-x2: 1.5rem;
@text-size-x3: 2.25rem;
@text-size-x4: 3.375rem;
@text-size-x5: 5.0625rem;
@text-size-x6: 7.5938rem;
@text-size-d2: 0.66667em;
@text-size-d3: 0.44444em;
@text-size-d4: 0.2963em;
@text-size-d5: 0.19753em;
@text-size-d6: 0.13169em;
@text-leading: 1.5;
@text-leading-i2: 1.4167;
@text-leading-i3: 1.3611;
@text-leading-i4: 1.3241;
@text-leading-i5: 1.2994;
@text-leading-i6: 1.2829;
@text-leading-min: 1.25;
@text-measure: 75ch;
@text-measure-i2: 65ch;
@text-measure-i3: 58ch;
@text-measure-i4: 53ch;
@text-measure-i5: 50ch;
@text-measure-i6: 48ch;
@text-measure-min: 45ch;
@layout-grid-columns: 3;
@layout-grid-rows: 3;
@layout-grid-col-1: 1;
@layout-grid-col-2: 2;
@layout-grid-col-3: 3;
@layout-grid-col--1: -1;
@layout-grid-col--2: -2;
@layout-grid-col--3: -3;
@layout-grid-col-fr: 1fr;
@layout-grid-col-fr-x2: 1.5fr;
@layout-grid-col-fr-x3: 2.25fr;
@layout-grid-col-fr-d2: 0.66667fr;
@layout-grid-col-fr-d3: 0.44444fr;
@layout-grid-row-1: 1;
@layout-grid-row-2: 2;
@layout-grid-row-3: 3;
@layout-grid-row--1: -1;
@layout-grid-row--2: -2;
@layout-grid-row--3: -3;
@layout-grid-row-fr: 1fr;
@layout-grid-row-fr-x2: 1.5fr;
@layout-grid-row-fr-x3: 2.25fr;
@layout-grid-row-fr-d2: 0.66667fr;
@layout-grid-row-fr-d3: 0.44444fr;
@layout-spacing: 1rem;
@layout-spacing-x2: 1.5rem;
@layout-spacing-x3: 2.25rem;
@layout-spacing-x4: 3.375rem;
@layout-spacing-x5: 5.0625rem;
@layout-spacing-x6: 7.5938rem;
@layout-spacing-d2: 0.66667rem;
@layout-spacing-d3: 0.44444rem;
@layout-spacing-d4: 0.2963rem;
@layout-spacing-d5: 0.19753rem;
@layout-spacing-d6: 0.13169rem;
@layout-dimensions-width: 100vw;
@layout-dimensions-width-i2: 75vw;
@layout-dimensions-width-i3: 58.333vw;
@layout-dimensions-width-i4: 47.222vw;
@layout-dimensions-width-i5: 39.815vw;
@layout-dimensions-width-i6: 34.876vw;
@layout-dimensions-width-min: 25vw;
@layout-dimensions-height: 100vh;
@layout-dimensions-height-i2: 75vh;
@layout-dimensions-height-i3: 58.333vh;
@layout-dimensions-height-i4: 47.222vh;
@layout-dimensions-height-i5: 39.815vh;
@layout-dimensions-height-i6: 34.876vh;
@layout-dimensions-height-min: 25vh;
@layout-dimensions-smallest: 100vmin;
@layout-dimensions-smallest-i2: 75vmin;
@layout-dimensions-smallest-i3: 58.333vmin;
@layout-dimensions-smallest-i4: 47.222vmin;
@layout-dimensions-smallest-i5: 39.815vmin;
@layout-dimensions-smallest-i6: 34.876vmin;
@layout-dimensions-smallest-min: 25vmin;
@layout-dimensions-largest: 100vmax;
@layout-dimensions-largest-i2: 75vmax;
@layout-dimensions-largest-i3: 58.333vmax;
@layout-dimensions-largest-i4: 47.222vmax;
@layout-dimensions-largest-i5: 39.815vmax;
@layout-dimensions-largest-i6: 34.876vmax;
@layout-dimensions-largest-min: 25vmax;

`);
    });
  });

  describe("format = 'styl'", () => {
    it("should correctly output Stylus varibles from the sample dictionary", () => {
      expect(removeTimestamp(stylesheet("styl", dict))).toBe(`
/*!
 * Project: Example Stylesheet Variables (v0.1.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * --------------------------------------------------------------------------------
 * [Timestamp replaced for testing]
 */

color-50 = #eeeaf6
color-100 = #d1c5e4
color-200 = #b5a1d2
color-300 = #9a7dc0
color-400 = #7f59ad
color-500 = #552e7e
color-600 = #452964
color-700 = #35234b
color-800 = #261c34
color-900 = #18151d
color-bg = #ffffff
color-fg = #111111
text-primary-family = -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif
text-primary-regular = 400
text-primary-bold = 700
text-secondary-family = Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol
text-secondary-light = 300
text-secondary-black = 900
text-source-family = Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace
text-source-regular = 400
text-source-bold = 700
text-size = 1rem
text-size-x2 = 1.5rem
text-size-x3 = 2.25rem
text-size-x4 = 3.375rem
text-size-x5 = 5.0625rem
text-size-x6 = 7.5938rem
text-size-d2 = 0.66667em
text-size-d3 = 0.44444em
text-size-d4 = 0.2963em
text-size-d5 = 0.19753em
text-size-d6 = 0.13169em
text-leading = 1.5
text-leading-i2 = 1.4167
text-leading-i3 = 1.3611
text-leading-i4 = 1.3241
text-leading-i5 = 1.2994
text-leading-i6 = 1.2829
text-leading-min = 1.25
text-measure = 75ch
text-measure-i2 = 65ch
text-measure-i3 = 58ch
text-measure-i4 = 53ch
text-measure-i5 = 50ch
text-measure-i6 = 48ch
text-measure-min = 45ch
layout-grid-columns = 3
layout-grid-rows = 3
layout-grid-col-1 = 1
layout-grid-col-2 = 2
layout-grid-col-3 = 3
layout-grid-col--1 = -1
layout-grid-col--2 = -2
layout-grid-col--3 = -3
layout-grid-col-fr = 1fr
layout-grid-col-fr-x2 = 1.5fr
layout-grid-col-fr-x3 = 2.25fr
layout-grid-col-fr-d2 = 0.66667fr
layout-grid-col-fr-d3 = 0.44444fr
layout-grid-row-1 = 1
layout-grid-row-2 = 2
layout-grid-row-3 = 3
layout-grid-row--1 = -1
layout-grid-row--2 = -2
layout-grid-row--3 = -3
layout-grid-row-fr = 1fr
layout-grid-row-fr-x2 = 1.5fr
layout-grid-row-fr-x3 = 2.25fr
layout-grid-row-fr-d2 = 0.66667fr
layout-grid-row-fr-d3 = 0.44444fr
layout-spacing = 1rem
layout-spacing-x2 = 1.5rem
layout-spacing-x3 = 2.25rem
layout-spacing-x4 = 3.375rem
layout-spacing-x5 = 5.0625rem
layout-spacing-x6 = 7.5938rem
layout-spacing-d2 = 0.66667rem
layout-spacing-d3 = 0.44444rem
layout-spacing-d4 = 0.2963rem
layout-spacing-d5 = 0.19753rem
layout-spacing-d6 = 0.13169rem
layout-dimensions-width = 100vw
layout-dimensions-width-i2 = 75vw
layout-dimensions-width-i3 = 58.333vw
layout-dimensions-width-i4 = 47.222vw
layout-dimensions-width-i5 = 39.815vw
layout-dimensions-width-i6 = 34.876vw
layout-dimensions-width-min = 25vw
layout-dimensions-height = 100vh
layout-dimensions-height-i2 = 75vh
layout-dimensions-height-i3 = 58.333vh
layout-dimensions-height-i4 = 47.222vh
layout-dimensions-height-i5 = 39.815vh
layout-dimensions-height-i6 = 34.876vh
layout-dimensions-height-min = 25vh
layout-dimensions-smallest = 100vmin
layout-dimensions-smallest-i2 = 75vmin
layout-dimensions-smallest-i3 = 58.333vmin
layout-dimensions-smallest-i4 = 47.222vmin
layout-dimensions-smallest-i5 = 39.815vmin
layout-dimensions-smallest-i6 = 34.876vmin
layout-dimensions-smallest-min = 25vmin
layout-dimensions-largest = 100vmax
layout-dimensions-largest-i2 = 75vmax
layout-dimensions-largest-i3 = 58.333vmax
layout-dimensions-largest-i4 = 47.222vmax
layout-dimensions-largest-i5 = 39.815vmax
layout-dimensions-largest-i6 = 34.876vmax
layout-dimensions-largest-min = 25vmax

`);
    });
  });
});

run();
