import {
  output_css,
  output_gpl,
  output_less,
  output_raw,
  output_scss,
  output_sketchpalette,
  output_styl,
  output_style_dictionary,
  output_tailwindcss,
  output_yaml,
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

const AllFormatters = [
  output_css,
  output_scss,
  output_less,
  output_styl,
  output_raw,
  output_yaml,
  output_gpl,
  output_sketchpalette,
  output_tailwindcss,
  output_style_dictionary,
];

describe("Formatters", () => {
  AllFormatters.forEach((Formatter) =>
    it(`${Formatter.name}(dict) should whine if the project metadata is missing from the dictionary`, () =>
      expect(() => Formatter(invalidSchema)).toThrow())
  );

  it("should allow automatic versioning", () => {
    expect(checkVersion(JSON.parse(output_raw(goGoGadgetVersioning)))).toBe(
      "0.1.0",
    );
    expect(checkVersion(JSON.parse(output_raw(goGoGadgetVersioning)))).toBe(
      "0.2.0",
    );
    expect(checkVersion(JSON.parse(output_raw(goGoGadgetVersioning)))).toBe(
      "0.3.0",
    );
  });

  describe("CSS Formats", () => {
    describe("output_css(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(output_css(completeQSD));
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
        const result = removeTimestamp(output_css(completeQSDWithMeta));
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
        const result = removeTimestamp(
          output_css(completeQSDWithMultilineMeta),
        );
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
    describe("output_css(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(output_scss(completeQSD));
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
        const result = removeTimestamp(output_scss(completeQSDWithMeta));
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
        const result = removeTimestamp(
          output_scss(completeQSDWithMultilineMeta),
        );
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
    describe("output_less(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(output_less(completeQSD));
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
        const result = removeTimestamp(output_less(completeQSDWithMeta));
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
        const result = removeTimestamp(
          output_less(completeQSDWithMultilineMeta),
        );
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
    describe("output_styl(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(output_styl(completeQSD));
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
        const result = removeTimestamp(output_styl(completeQSDWithMeta));
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
        const result = removeTimestamp(
          output_styl(completeQSDWithMultilineMeta),
        );
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
  });
  describe("Data Exports", () => {
    describe("output_raw(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = output_raw(completeQSD);
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
        const result = output_raw(completeQSDWithMeta);
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
        const result = output_raw(completeQSDWithMultilineMeta);
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
    describe("output_yaml(dict)", () => {
      it("should correctly process complete dictionaries", () => {
        const result = removeTimestamp(output_yaml(completeQSD));
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
        const result = removeTimestamp(output_yaml(completeQSDWithMeta));
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
        const result = removeTimestamp(
          output_yaml(completeQSDWithMultilineMeta),
        );
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
  describe("Desktop Palettes", () => {
    describe("output_gpl(dict)", () => {
      it("should correctly extract the colors from a dictionary", () => {
        const result = removeTimestamp(output_gpl(completeQSD));
        expect(result).toBe(
          "\nGIMP Palette\nName: Unknown Project (v0.0.0)\n# Generator: Quarks System Core\n\n# Owned by Anonymous\n# Unlicense\n\n# DESCRIPTION: N/A\n# COMMENTS: N/A\n\n\n# Updated on [Timestamp replaced for testing]\n\nColumns: 6\n255\t  0\t  0\tMAIN BASE (#ff0000)\n220\t 20\t 60\tMAIN SHADES 0 (#dc143c)\n178\t 34\t 34\tMAIN SHADES 1 (#b22222)\n  0\t255\t  0\tACCENT (#00ff00)\n  0\t  0\t255\tHIGHLIGHT (#0000ff)\n\n",
        );
      });
    });
    describe("output_sketchpalette(dict)", () => {
      it("should correctly extract the colors from a dictionary", () => {
        const result = output_sketchpalette(completeQSD);
        expect(JSON.parse(result)).toEqual({
          colors: [
            { red: 1, green: 0, blue: 0, alpha: 1 },
            {
              red: 0.8627450980392157,
              green: 0.0784313725490196,
              blue: 0.23529411764705882,
              alpha: 1,
            },
            {
              red: 0.6980392156862745,
              green: 0.13333333333333333,
              blue: 0.13333333333333333,
              alpha: 1,
            },
            { red: 0, green: 1, blue: 0, alpha: 1 },
            { red: 0, green: 0, blue: 1, alpha: 1 },
          ],
          pluginVersion: "1.4",
          compatibleVersion: "1.4",
        });
      });
    });
  });
  describe("Integration/Interop", () => {
    describe("output_tailwindcss(dict)", () => {
      it("should transform Quarks System Dictionaries into TailwindCSS theme data", () => {
        const result = output_tailwindcss(completeQSD);
        expect(result).toEqual({
          color: {
            main: {
              DEFAULT: "red",
              shades: { 0: "crimson", 1: "firebrick" },
            },
            accent: "lime",
            highlight: "blue",
          },
        });
      });
      it("should ignore metadata", () => {
        const result = output_tailwindcss(completeQSDWithMeta);
        expect(result).toEqual({
          color: {
            main: {
              DEFAULT: "red",
              shades: { 0: "crimson", 1: "firebrick" },
            },
            accent: "lime",
            highlight: "blue",
          },
        });
      });
    });
    describe("output_style_dictionary(dict)", () => {
      it("should transform Quarks System Dictionaries into Style Dictionary tokens", () => {
        const result = output_style_dictionary(completeQSD);
        expect(result).toEqual({
          color: {
            main: {
              base: { value: "red" },
              shades: {
                0: { value: "crimson" },
                1: { value: "firebrick" },
              },
            },
            accent: { value: "lime" },
            highlight: { value: "blue" },
          },
        });
      });
      it("should ignore metadata", () => {
        const result = output_style_dictionary(completeQSDWithMeta);
        expect(result).toEqual({
          color: {
            main: {
              base: { value: "red" },
              shades: {
                0: { value: "crimson" },
                1: { value: "firebrick" },
              },
            },
            accent: { value: "lime" },
            highlight: { value: "blue" },
          },
        });
      });
    });
  });
});

AllFormatters.forEach((Formatter) =>
  benchmark.Bench({
    name: `${Formatter.name} perf`,
    fn() {
      return Formatter(completeQSD);
    },
    steps: 100,
  })
);

benchmark.runBench().then(benchmark.Result(7)).then(run());
