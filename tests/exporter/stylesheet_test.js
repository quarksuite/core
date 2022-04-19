import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { palette, tokens as color } from "../../color.js";
import { text, ms, tokens as content } from "../../content.js";
import { stylesheet } from "../../exporter.js";

const swatch = "rebeccapurple";
const scale = ms({ values: 4, ratio: 1.337 }, 1);

// Whip up a sample dictionary
const dict = {
  project: {
    name: "Example Stylesheet Variables",
    author: "Chatman R. Jr",
    version: "0.1.0",
    license: "Unlicense",
  },
  color: color(palette({}, "rebeccapurple")),
  text: {
    primary: text({}, ""),
    secondary: text({ system: "serif", weights: ["light", "black"] }, ""),
    source: text({ system: "monospace" }, ""),
    size: content({ unit: "rem", inversion: "em" }, scale),
    leading: content(
      { type: "ranged", min: 1.25, max: 1.5, context: "max" },
      scale
    ),
    measure: content(
      {
        type: "ranged",
        min: 45,
        max: 75,
        unit: "ch",
        trunc: true,
        context: "max",
      },
      scale
    ),
  },
  layout: {
    grid: {
      ...content({ type: "grid" }, scale),
      fr: content({ unit: "fr" }, scale),
    },
    spacing: content({ unit: "ex" }, scale),
    dimensions: {
      width: content({ type: "ranged", min: 25, max: 100, unit: "vw" }, scale),
      height: content({ type: "ranged", min: 25, max: 100, unit: "vh" }, scale),
      min: content({ type: "ranged", min: 25, max: 100, unit: "vmin" }, scale),
      max: content({ type: "ranged", min: 25, max: 100, unit: "vmax" }, scale),
    },
  },
};

describe("stylesheet(format, dict)", () => {
  const removeTimestamp = (format) =>
    format.replace(
      /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]"
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
  --color-100: #d6cbe7;
  --color-200: #beadd8;
  --color-300: #a78fc9;
  --color-400: #9171ba;
  --color-500: #7b53aa;
  --color-600: #512d78;
  --color-700: #3d2658;
  --color-800: #2a1e39;
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
  --text-size-x2: 1.337rem;
  --text-size-x3: 1.7876rem;
  --text-size-x4: 2.39rem;
  --text-size-d2: 0.74794em;
  --text-size-d3: 0.55942em;
  --text-size-d4: 0.41841em;
  --text-leading: 1.5;
  --text-leading-i2: 1.437;
  --text-leading-i3: 1.3899;
  --text-leading-i4: 1.3546;
  --text-leading-min: 1.25;
  --text-measure: 75ch;
  --text-measure-i2: 67ch;
  --text-measure-i3: 61ch;
  --text-measure-i4: 57ch;
  --text-measure-min: 45ch;
  --layout-grid-columns: 4;
  --layout-grid-rows: 3;
  --layout-grid-col-1: 1;
  --layout-grid-col-2: 2;
  --layout-grid-col-3: 3;
  --layout-grid-col-4: 4;
  --layout-grid-col--1: -1;
  --layout-grid-col--2: -2;
  --layout-grid-col--3: -3;
  --layout-grid-col--4: -4;
  --layout-grid-row-1: 1;
  --layout-grid-row-2: 2;
  --layout-grid-row-3: 3;
  --layout-grid-row--1: -1;
  --layout-grid-row--2: -2;
  --layout-grid-row--3: -3;
  --layout-grid-fr: 1fr;
  --layout-grid-fr-x2: 1.337fr;
  --layout-grid-fr-x3: 1.7876fr;
  --layout-grid-fr-x4: 2.39fr;
  --layout-grid-fr-d2: 0.74794fr;
  --layout-grid-fr-d3: 0.55942fr;
  --layout-grid-fr-d4: 0.41841fr;
  --layout-spacing: 1ex;
  --layout-spacing-x2: 1.337ex;
  --layout-spacing-x3: 1.7876ex;
  --layout-spacing-x4: 2.39ex;
  --layout-spacing-d2: 0.74794ex;
  --layout-spacing-d3: 0.55942ex;
  --layout-spacing-d4: 0.41841ex;
  --layout-dimensions-width: 25vw;
  --layout-dimensions-width-i2: 56.381vw;
  --layout-dimensions-width-i3: 66.956vw;
  --layout-dimensions-width-i4: 81.096vw;
  --layout-dimensions-width-max: 100vw;
  --layout-dimensions-height: 25vh;
  --layout-dimensions-height-i2: 56.381vh;
  --layout-dimensions-height-i3: 66.956vh;
  --layout-dimensions-height-i4: 81.096vh;
  --layout-dimensions-height-max: 100vh;
  --layout-dimensions-min: 25vmin;
  --layout-dimensions-min-i2: 56.381vmin;
  --layout-dimensions-min-i3: 66.956vmin;
  --layout-dimensions-min-i4: 81.096vmin;
  --layout-dimensions-min-max: 100vmin;
  --layout-dimensions-max: 25vmax;
  --layout-dimensions-max-i2: 56.381vmax;
  --layout-dimensions-max-i3: 66.956vmax;
  --layout-dimensions-max-i4: 81.096vmax;
  --layout-dimensions-max-max: 100vmax;

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
$color-100: #d6cbe7;
$color-200: #beadd8;
$color-300: #a78fc9;
$color-400: #9171ba;
$color-500: #7b53aa;
$color-600: #512d78;
$color-700: #3d2658;
$color-800: #2a1e39;
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
$text-size-x2: 1.337rem;
$text-size-x3: 1.7876rem;
$text-size-x4: 2.39rem;
$text-size-d2: 0.74794em;
$text-size-d3: 0.55942em;
$text-size-d4: 0.41841em;
$text-leading: 1.5;
$text-leading-i2: 1.437;
$text-leading-i3: 1.3899;
$text-leading-i4: 1.3546;
$text-leading-min: 1.25;
$text-measure: 75ch;
$text-measure-i2: 67ch;
$text-measure-i3: 61ch;
$text-measure-i4: 57ch;
$text-measure-min: 45ch;
$layout-grid-columns: 4;
$layout-grid-rows: 3;
$layout-grid-col-1: 1;
$layout-grid-col-2: 2;
$layout-grid-col-3: 3;
$layout-grid-col-4: 4;
$layout-grid-col--1: -1;
$layout-grid-col--2: -2;
$layout-grid-col--3: -3;
$layout-grid-col--4: -4;
$layout-grid-row-1: 1;
$layout-grid-row-2: 2;
$layout-grid-row-3: 3;
$layout-grid-row--1: -1;
$layout-grid-row--2: -2;
$layout-grid-row--3: -3;
$layout-grid-fr: 1fr;
$layout-grid-fr-x2: 1.337fr;
$layout-grid-fr-x3: 1.7876fr;
$layout-grid-fr-x4: 2.39fr;
$layout-grid-fr-d2: 0.74794fr;
$layout-grid-fr-d3: 0.55942fr;
$layout-grid-fr-d4: 0.41841fr;
$layout-spacing: 1ex;
$layout-spacing-x2: 1.337ex;
$layout-spacing-x3: 1.7876ex;
$layout-spacing-x4: 2.39ex;
$layout-spacing-d2: 0.74794ex;
$layout-spacing-d3: 0.55942ex;
$layout-spacing-d4: 0.41841ex;
$layout-dimensions-width: 25vw;
$layout-dimensions-width-i2: 56.381vw;
$layout-dimensions-width-i3: 66.956vw;
$layout-dimensions-width-i4: 81.096vw;
$layout-dimensions-width-max: 100vw;
$layout-dimensions-height: 25vh;
$layout-dimensions-height-i2: 56.381vh;
$layout-dimensions-height-i3: 66.956vh;
$layout-dimensions-height-i4: 81.096vh;
$layout-dimensions-height-max: 100vh;
$layout-dimensions-min: 25vmin;
$layout-dimensions-min-i2: 56.381vmin;
$layout-dimensions-min-i3: 66.956vmin;
$layout-dimensions-min-i4: 81.096vmin;
$layout-dimensions-min-max: 100vmin;
$layout-dimensions-max: 25vmax;
$layout-dimensions-max-i2: 56.381vmax;
$layout-dimensions-max-i3: 66.956vmax;
$layout-dimensions-max-i4: 81.096vmax;
$layout-dimensions-max-max: 100vmax;

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
@color-100: #d6cbe7;
@color-200: #beadd8;
@color-300: #a78fc9;
@color-400: #9171ba;
@color-500: #7b53aa;
@color-600: #512d78;
@color-700: #3d2658;
@color-800: #2a1e39;
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
@text-size-x2: 1.337rem;
@text-size-x3: 1.7876rem;
@text-size-x4: 2.39rem;
@text-size-d2: 0.74794em;
@text-size-d3: 0.55942em;
@text-size-d4: 0.41841em;
@text-leading: 1.5;
@text-leading-i2: 1.437;
@text-leading-i3: 1.3899;
@text-leading-i4: 1.3546;
@text-leading-min: 1.25;
@text-measure: 75ch;
@text-measure-i2: 67ch;
@text-measure-i3: 61ch;
@text-measure-i4: 57ch;
@text-measure-min: 45ch;
@layout-grid-columns: 4;
@layout-grid-rows: 3;
@layout-grid-col-1: 1;
@layout-grid-col-2: 2;
@layout-grid-col-3: 3;
@layout-grid-col-4: 4;
@layout-grid-col--1: -1;
@layout-grid-col--2: -2;
@layout-grid-col--3: -3;
@layout-grid-col--4: -4;
@layout-grid-row-1: 1;
@layout-grid-row-2: 2;
@layout-grid-row-3: 3;
@layout-grid-row--1: -1;
@layout-grid-row--2: -2;
@layout-grid-row--3: -3;
@layout-grid-fr: 1fr;
@layout-grid-fr-x2: 1.337fr;
@layout-grid-fr-x3: 1.7876fr;
@layout-grid-fr-x4: 2.39fr;
@layout-grid-fr-d2: 0.74794fr;
@layout-grid-fr-d3: 0.55942fr;
@layout-grid-fr-d4: 0.41841fr;
@layout-spacing: 1ex;
@layout-spacing-x2: 1.337ex;
@layout-spacing-x3: 1.7876ex;
@layout-spacing-x4: 2.39ex;
@layout-spacing-d2: 0.74794ex;
@layout-spacing-d3: 0.55942ex;
@layout-spacing-d4: 0.41841ex;
@layout-dimensions-width: 25vw;
@layout-dimensions-width-i2: 56.381vw;
@layout-dimensions-width-i3: 66.956vw;
@layout-dimensions-width-i4: 81.096vw;
@layout-dimensions-width-max: 100vw;
@layout-dimensions-height: 25vh;
@layout-dimensions-height-i2: 56.381vh;
@layout-dimensions-height-i3: 66.956vh;
@layout-dimensions-height-i4: 81.096vh;
@layout-dimensions-height-max: 100vh;
@layout-dimensions-min: 25vmin;
@layout-dimensions-min-i2: 56.381vmin;
@layout-dimensions-min-i3: 66.956vmin;
@layout-dimensions-min-i4: 81.096vmin;
@layout-dimensions-min-max: 100vmin;
@layout-dimensions-max: 25vmax;
@layout-dimensions-max-i2: 56.381vmax;
@layout-dimensions-max-i3: 66.956vmax;
@layout-dimensions-max-i4: 81.096vmax;
@layout-dimensions-max-max: 100vmax;

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
color-100 = #d6cbe7
color-200 = #beadd8
color-300 = #a78fc9
color-400 = #9171ba
color-500 = #7b53aa
color-600 = #512d78
color-700 = #3d2658
color-800 = #2a1e39
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
text-size-x2 = 1.337rem
text-size-x3 = 1.7876rem
text-size-x4 = 2.39rem
text-size-d2 = 0.74794em
text-size-d3 = 0.55942em
text-size-d4 = 0.41841em
text-leading = 1.5
text-leading-i2 = 1.437
text-leading-i3 = 1.3899
text-leading-i4 = 1.3546
text-leading-min = 1.25
text-measure = 75ch
text-measure-i2 = 67ch
text-measure-i3 = 61ch
text-measure-i4 = 57ch
text-measure-min = 45ch
layout-grid-columns = 4
layout-grid-rows = 3
layout-grid-col-1 = 1
layout-grid-col-2 = 2
layout-grid-col-3 = 3
layout-grid-col-4 = 4
layout-grid-col--1 = -1
layout-grid-col--2 = -2
layout-grid-col--3 = -3
layout-grid-col--4 = -4
layout-grid-row-1 = 1
layout-grid-row-2 = 2
layout-grid-row-3 = 3
layout-grid-row--1 = -1
layout-grid-row--2 = -2
layout-grid-row--3 = -3
layout-grid-fr = 1fr
layout-grid-fr-x2 = 1.337fr
layout-grid-fr-x3 = 1.7876fr
layout-grid-fr-x4 = 2.39fr
layout-grid-fr-d2 = 0.74794fr
layout-grid-fr-d3 = 0.55942fr
layout-grid-fr-d4 = 0.41841fr
layout-spacing = 1ex
layout-spacing-x2 = 1.337ex
layout-spacing-x3 = 1.7876ex
layout-spacing-x4 = 2.39ex
layout-spacing-d2 = 0.74794ex
layout-spacing-d3 = 0.55942ex
layout-spacing-d4 = 0.41841ex
layout-dimensions-width = 25vw
layout-dimensions-width-i2 = 56.381vw
layout-dimensions-width-i3 = 66.956vw
layout-dimensions-width-i4 = 81.096vw
layout-dimensions-width-max = 100vw
layout-dimensions-height = 25vh
layout-dimensions-height-i2 = 56.381vh
layout-dimensions-height-i3 = 66.956vh
layout-dimensions-height-i4 = 81.096vh
layout-dimensions-height-max = 100vh
layout-dimensions-min = 25vmin
layout-dimensions-min-i2 = 56.381vmin
layout-dimensions-min-i3 = 66.956vmin
layout-dimensions-min-i4 = 81.096vmin
layout-dimensions-min-max = 100vmin
layout-dimensions-max = 25vmax
layout-dimensions-max-i2 = 56.381vmax
layout-dimensions-max-i3 = 66.956vmax
layout-dimensions-max-i4 = 81.096vmax
layout-dimensions-max-max = 100vmax

`);
    });
  });
});

run();
