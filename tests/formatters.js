import QUnit from "https://cdn.skypack.dev/qunit";

const Describe = QUnit.module;
const Spec = QUnit.module.todo;
const SkipIt = QUnit.test.skip;
const FocusIt = QUnit.test.only;
const It = QUnit.test;

(async function () {
  const { css, scss, less, styl } = await import("/mod.js");

  Spec("Formatters", () => {
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
        ...completeQSD.color,
        metadata: {
          description: "Do I have meta? Yes I do!",
          comments: "Sweet, a comment!",
        },
      },
    };

    const completeQSDWithMultilineMeta = {
      ...completeQSD,
      color: {
        ...completeQSD.color,
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

    It("can allow automatic versioning", (assert) => {
      assert.equal(
        removeTimestamp(css(goGoGadgetVersioning)),
        `
/**
 * Project: Unknown Project (v0.1.0)
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
`,
      );
    });

    It(
      "will whine if project metadata is missing from dictionary",
      (assert) => {
        [css].forEach((Formatter) =>
          assert.throws(() => Formatter(invalidSchema))
        );
      },
    );

    Describe("CSS Formats", () => {
      Describe("css(dict)", () => {
        It(
          "correctly processes complete dictionaries",
          (assert) =>
            assert.equal(
              removeTimestamp(css(completeQSD)),
              `
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
`,
            ),
        );
        It(
          "correctly processes complete dictionaries with metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(css(completeQSDWithMeta)),
              `
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
`,
            ),
        );
        It(
          "correctly processes complete dictionaries with multiline metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(css(completeQSDWithMultilineMeta)),
              `
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
`,
            ),
        );
      });
      Describe("scss(dict)", () => {
        It(
          "correctly processes complete dictionaries",
          (assert) =>
            assert.equal(
              removeTimestamp(scss(completeQSD)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(scss(completeQSDWithMeta)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with multiline metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(scss(completeQSDWithMultilineMeta)),
              `
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

`,
            ),
        );
      });
      Describe("less(dict)", () => {
        It(
          "correctly processes complete dictionaries",
          (assert) =>
            assert.equal(
              removeTimestamp(less(completeQSD)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(less(completeQSDWithMeta)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with multiline metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(less(completeQSDWithMultilineMeta)),
              `
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

`,
            ),
        );
      });
      Describe("less(dict)", () => {
        It(
          "correctly processes complete dictionaries",
          (assert) =>
            assert.equal(
              removeTimestamp(styl(completeQSD)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(styl(completeQSDWithMeta)),
              `
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

`,
            ),
        );
        It(
          "correctly processes complete dictionaries with multiline metadata",
          (assert) =>
            assert.equal(
              removeTimestamp(styl(completeQSDWithMultilineMeta)),
              `
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

`,
            ),
        );
      });
    });
  });
})();
