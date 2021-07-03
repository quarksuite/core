import {
  css,
  gpl,
  less,
  raw,
  scss,
  sketchpalette,
  styl,
  yaml,
} from "./formatters.js";
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const benchmark = new Maven();

const invalidSchema = {
  color: {
    main: {
      base: "red",
      shades: ["crimson", "firebrick"],
    },
    accent: "lime",
    highlight: "blue",
  },
};

const completeQSD = {
  project: {
    name: "Unknown Project",
    author: "Anonymous",
    version: "0.0.0",
    license: "Unlicense",
  },
  ...invalidSchema,
};

const completeQSDWithMeta = {
  ...completeQSD,
  color: {
    metadata: {
      description: "Do I have meta? Yes I do!",
      comments: "Sweet, a comment!",
    },
    ...completeQSD.color,
  },
};

const completeQSDWithMultilineMeta = {
  ...completeQSD,
  color: {
    metadata: {
      description: `
Metadata
is
totally
allowed
to
span
lines
`,
      comments: `
See what
I mean?
`,
    },
    ...completeQSD.color,
  },
};

const goGoGadgetVersioning = {
  ...completeQSD,
  project: {
    ...completeQSD.project,
    bump: "minor",
  },
};

const removeTimestamp = (format) =>
  format.replace(
    /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
    "Updated on [Timestamp replaced for testing]",
  );

const checkVersion = (dict) => dict.project.version;

const rawify = ({ project, ...tokens }) => ({ project, tokens });

const AllFormatters = [css, scss, less, styl, raw, yaml, gpl, sketchpalette];

describe("Formatters", () => {
  AllFormatters.slice(0, AllFormatters.length - 1).forEach((Formatter) =>
    it(`${Formatter.name}(dict) should whine if the project metadata is missing from the dictionary`, () =>
      expect(() => Formatter(invalidSchema)).toThrow())
  );

  describe("CSS Formats", () => {
    describe("css(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(css(completeQSD));
        expect(result).toBe(`
/**
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 **/

:root {
  --color-main: red;
  --color-main-shades-0: crimson;
  --color-main-shades-1: firebrick;
  --color-accent: lime;
  --color-highlight: blue;

}
`);
      });
      it("should correctly process complete dictionaries with metadata", () => {
        const result = removeTimestamp(css(completeQSDWithMeta));
        expect(result).toBe(`
/**
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 **/

:root {

  /**
   * DESCRIPTION: Do I have meta? Yes I do!
   * COMMENTS: Sweet, a comment!
   **/

  --color-main: red;
  --color-main-shades-0: crimson;
  --color-main-shades-1: firebrick;
  --color-accent: lime;
  --color-highlight: blue;

}
`);
      });
      it("should correctly process complete dictionaries with multiline metadata", () => {
        const result = removeTimestamp(css(completeQSDWithMultilineMeta));
        expect(result).toBe(`
/**
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 **/

:root {

  /**
   * DESCRIPTION:
   *
   * Metadata
   * is
   * totally
   * allowed
   * to
   * span
   * lines
   *
   * COMMENTS:
   *
   * See what
   * I mean?
   *
   **/

  --color-main: red;
  --color-main-shades-0: crimson;
  --color-main-shades-1: firebrick;
  --color-accent: lime;
  --color-highlight: blue;

}
`);
      });
    });
    describe("scss(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(scss(completeQSD));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

$color-main: red;
$color-main-shades-0: crimson;
$color-main-shades-1: firebrick;
$color-accent: lime;
$color-highlight: blue;

`);
      });
      it("should correctly process complete dictionaries with metadata", () => {
        const result = removeTimestamp(scss(completeQSDWithMeta));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: Do I have meta? Yes I do!
// COMMENTS: Sweet, a comment!

$color-main: red;
$color-main-shades-0: crimson;
$color-main-shades-1: firebrick;
$color-accent: lime;
$color-highlight: blue;

`);
      });
      it("should correctly process complete dictionaries with multiline metadata", () => {
        const result = removeTimestamp(scss(completeQSDWithMultilineMeta));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION:
//
// Metadata
// is
// totally
// allowed
// to
// span
// lines
//
// COMMENTS:
//
// See what
// I mean?
//

$color-main: red;
$color-main-shades-0: crimson;
$color-main-shades-1: firebrick;
$color-accent: lime;
$color-highlight: blue;

`);
      });
    });
    describe("less(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(less(completeQSD));
        expect(result).toBe(`
/*
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

@color-main: red;
@color-main-shades-0: crimson;
@color-main-shades-1: firebrick;
@color-accent: lime;
@color-highlight: blue;

`);
      });
      it("should correctly process complete dictionaries with metadata", () => {
        const result = removeTimestamp(less(completeQSDWithMeta));
        expect(result).toBe(`
/*
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: Do I have meta? Yes I do!
// COMMENTS: Sweet, a comment!

@color-main: red;
@color-main-shades-0: crimson;
@color-main-shades-1: firebrick;
@color-accent: lime;
@color-highlight: blue;

`);
      });
      it("should correctly process complete dictionaries with multiline metadata", () => {
        const result = removeTimestamp(less(completeQSDWithMultilineMeta));
        expect(result).toBe(`
/*
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION:
//
// Metadata
// is
// totally
// allowed
// to
// span
// lines
//
// COMMENTS:
//
// See what
// I mean?
//

@color-main: red;
@color-main-shades-0: crimson;
@color-main-shades-1: firebrick;
@color-accent: lime;
@color-highlight: blue;

`);
      });
    });
    describe("styl(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(styl(completeQSD));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

color-main = red
color-main-shades-0 = crimson
color-main-shades-1 = firebrick
color-accent = lime
color-highlight = blue

`);
      });
      it("should correctly process complete dictionaries with metadata", () => {
        const result = removeTimestamp(styl(completeQSDWithMeta));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: Do I have meta? Yes I do!
// COMMENTS: Sweet, a comment!

color-main = red
color-main-shades-0 = crimson
color-main-shades-1 = firebrick
color-accent = lime
color-highlight = blue

`);
      });
      it("should correctly process complete dictionaries with multiline metadata", () => {
        const result = removeTimestamp(styl(completeQSDWithMultilineMeta));
        expect(result).toBe(`
/*!
 * Project: Unknown Project (v0.0.0)
 * Owned by: Anonymous
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION:
//
// Metadata
// is
// totally
// allowed
// to
// span
// lines
//
// COMMENTS:
//
// See what
// I mean?
//

color-main = red
color-main-shades-0 = crimson
color-main-shades-1 = firebrick
color-accent = lime
color-highlight = blue

`);
      });
    });
    describe("raw(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = raw(completeQSD);
        expect(JSON.parse(result)).toEqual({
          project: {
            name: "Unknown Project",
            author: "Anonymous",
            version: "0.0.0",
            license: "Unlicense",
          },
          tokens: {
            color: {
              main: { base: "red", shades: ["crimson", "firebrick"] },
              accent: "lime",
              highlight: "blue",
            },
          },
        });
      });
      it("should correctly process complete dictionaries with metadata", () => {
        const result = raw(completeQSDWithMeta);
        expect(JSON.parse(result)).toEqual({
          project: {
            name: "Unknown Project",
            author: "Anonymous",
            version: "0.0.0",
            license: "Unlicense",
          },
          tokens: {
            color: {
              metadata: {
                description: "Do I have meta? Yes I do!",
                comments: "Sweet, a comment!",
              },
              main: { base: "red", shades: ["crimson", "firebrick"] },
              accent: "lime",
              highlight: "blue",
            },
          },
        });
      });
      it("should correctly process complete dictionaries with multiline metadata", () => {
        const result = raw(completeQSDWithMultilineMeta);
        expect(JSON.parse(result)).toEqual({
          project: {
            name: "Unknown Project",
            author: "Anonymous",
            version: "0.0.0",
            license: "Unlicense",
          },
          tokens: {
            color: {
              metadata: {
                description:
                  "\nMetadata\nis\ntotally\nallowed\nto\nspan\nlines\n",
                comments: "\nSee what\nI mean?\n",
              },
              main: { base: "red", shades: ["crimson", "firebrick"] },
              accent: "lime",
              highlight: "blue",
            },
          },
        });
      });
    });
    describe("yaml(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(yaml(completeQSD));
        expect(result).toBe(`
# Updated on [Timestamp replaced for testing]

project:
  name: Unknown Project
  author: Anonymous
  version: 0.0.0
  license: Unlicense

tokens:
  color:
    main:
      base: red
      shades:
        - crimson
        - firebrick
    accent: lime
    highlight: blue
`);
      });
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(yaml(completeQSDWithMeta));
        expect(result).toBe(`
# Updated on [Timestamp replaced for testing]

project:
  name: Unknown Project
  author: Anonymous
  version: 0.0.0
  license: Unlicense

tokens:
  color:
    metadata:
      description: Do I have meta? Yes I do!
      comments: Sweet, a comment!
    main:
      base: red
      shades:
        - crimson
        - firebrick
    accent: lime
    highlight: blue
`);
      });
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(yaml(completeQSDWithMultilineMeta));
        console.log(result);
        expect(result).toBe(`
# Updated on [Timestamp replaced for testing]

project:
  name: Unknown Project
  author: Anonymous
  version: 0.0.0
  license: Unlicense

tokens:
  color:
    metadata:
      description: |
        
        Metadata
        is
        totally
        allowed
        to
        span
        lines
        
      comments: |
        
        See what
        I mean?
        
    main:
      base: red
      shades:
        - crimson
        - firebrick
    accent: lime
    highlight: blue
`);
      });
    });
  });
});

run();

benchmark.Bench({
  name: `Formatters perf`,
  fn() {
    AllFormatters.forEach((Formatter) => Formatter(completeQSDWithMeta));
  },
  steps: 250,
});

benchmark.runBench().then(benchmark.Result());
