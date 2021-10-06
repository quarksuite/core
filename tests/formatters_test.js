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
} from "../formatters.js";
import { Quarks } from "../bootstrapper.js";
import { benchmark, data, exception, init, string, suite } from "./index.js";

const formats = [
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

const removeTimestamp = (format) =>
  format.replace(
    /Updated on [\d/]+ at [\d:]+ (?:AM|PM)?/,
    "Updated on [Timestamp replaced for testing]",
  );

const checkVersion = (dict) => dict.project.version;

const options = Quarks();

const testExceptions = [
  "Exceptions",
  ["reject incomplete schema", formats.forEach((f) => exception(f, options))],
];

// lot of data, so I'm only going to test bits of it
const dict = {
  project: {
    name: "Example Design Tokens",
    author: "Chatman R. Jr",
    version: "0.0.0",
    license: "Unlicense",
  },
  color: {
    bg: options.color.a["50"],
    fg: options.color.a["900"],
    light: options.color.a["300"],
    lighter: options.color.a["200"],
    dark: options.color.a["600"],
    darker: options.color.a["700"],
  },
};

const dictWithMeta = {
  ...dict,
  project: {
    ...dict.project,
    metadata: {
      description: "My sample project",
      comments: "Testing formatters with my sample project",
    },
  },
  color: {
    metadata: {
      description: "My sample palette",
      comments: "Testing metadata for my sample palette",
    },
    ...dict.color,
  },
};

const dictWithAutoversion = {
  ...dict,
  project: {
    ...dict.project,
    bump: "minor",
  },
};

const testCSS = [
  "Stylesheet",
  [
    "no metadata",
    string(
      removeTimestamp(output_css(dict)),
      `
/**
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 **/

:root {
  --color-bg: #f8f8f8;
  --color-fg: #0b0b0b;
  --color-light: #aeaeae;
  --color-lighter: #c6c6c6;
  --color-dark: #606060;
  --color-darker: #414141;

}
`,
    ),
    string(
      removeTimestamp(output_scss(dict)),
      `
/*!
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

$color-bg: #f8f8f8;
$color-fg: #0b0b0b;
$color-light: #aeaeae;
$color-lighter: #c6c6c6;
$color-dark: #606060;
$color-darker: #414141;

`,
    ),
    string(
      removeTimestamp(output_less(dict)),
      `
/*
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

@color-bg: #f8f8f8;
@color-fg: #0b0b0b;
@color-light: #aeaeae;
@color-lighter: #c6c6c6;
@color-dark: #606060;
@color-darker: #414141;

`,
    ),
    string(
      removeTimestamp(output_styl(dict)),
      `
/*!
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: N/A
 * COMMENTS: N/A
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */

color-bg = #f8f8f8
color-fg = #0b0b0b
color-light = #aeaeae
color-lighter = #c6c6c6
color-dark = #606060
color-darker = #414141

`,
    ),
  ],
  [
    "some metadata",
    string(
      removeTimestamp(output_css(dictWithMeta)),
      `
/**
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: My sample project
 * COMMENTS: Testing formatters with my sample project
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 **/

:root {

  /**
   * DESCRIPTION: My sample palette
   * COMMENTS: Testing metadata for my sample palette
   **/

  --color-bg: #f8f8f8;
  --color-fg: #0b0b0b;
  --color-light: #aeaeae;
  --color-lighter: #c6c6c6;
  --color-dark: #606060;
  --color-darker: #414141;

}
`,
    ),
    string(
      removeTimestamp(output_less(dictWithMeta)),
      `
/*
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: My sample project
 * COMMENTS: Testing formatters with my sample project
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: My sample palette
// COMMENTS: Testing metadata for my sample palette

@color-bg: #f8f8f8;
@color-fg: #0b0b0b;
@color-light: #aeaeae;
@color-lighter: #c6c6c6;
@color-dark: #606060;
@color-darker: #414141;

`,
    ),
    string(
      removeTimestamp(output_less(dictWithMeta)),
      `
/*
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: My sample project
 * COMMENTS: Testing formatters with my sample project
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: My sample palette
// COMMENTS: Testing metadata for my sample palette

@color-bg: #f8f8f8;
@color-fg: #0b0b0b;
@color-light: #aeaeae;
@color-lighter: #c6c6c6;
@color-dark: #606060;
@color-darker: #414141;

`,
    ),
    string(
      removeTimestamp(output_styl(dictWithMeta)),
      `
/*!
 * Project: Example Design Tokens (v0.0.0)
 * Owned by: Chatman R. Jr
 * License: Unlicense
 * ================================================================
 *
 * DESCRIPTION: My sample project
 * COMMENTS: Testing formatters with my sample project
 * ----------------------------------------------------------------
 * Updated on [Timestamp replaced for testing]
 */


// DESCRIPTION: My sample palette
// COMMENTS: Testing metadata for my sample palette

color-bg = #f8f8f8
color-fg = #0b0b0b
color-light = #aeaeae
color-lighter = #c6c6c6
color-dark = #606060
color-darker = #414141

`,
    ),
  ],
];

const testData = [
  "Data Exports",
  [
    "no metadata",
    data(JSON.parse(output_raw(dict)), {
      project: {
        name: "Example Design Tokens",
        author: "Chatman R. Jr",
        version: "0.0.0",
        license: "Unlicense",
      },
      tokens: {
        color: {
          bg: "#f8f8f8",
          fg: "#0b0b0b",
          light: "#aeaeae",
          lighter: "#c6c6c6",
          dark: "#606060",
          darker: "#414141",
        },
      },
    }),
    data(
      removeTimestamp(output_yaml(dict)),
      `
# Updated on [Timestamp replaced for testing]

project:
  name: Example Design Tokens
  author: Chatman R. Jr
  version: 0.0.0
  license: Unlicense

tokens:
  color:
    bg: #f8f8f8
    fg: #0b0b0b
    light: #aeaeae
    lighter: #c6c6c6
    dark: #606060
    darker: #414141
`,
    ),
  ],
  [
    "some metadata",
    data(JSON.parse(output_raw(dictWithMeta)), {
      project: {
        name: "Example Design Tokens",
        author: "Chatman R. Jr",
        version: "0.0.0",
        license: "Unlicense",
        metadata: {
          description: "My sample project",
          comments: "Testing formatters with my sample project",
        },
      },
      tokens: {
        color: {
          metadata: {
            description: "My sample palette",
            comments: "Testing metadata for my sample palette",
          },
          bg: "#f8f8f8",
          fg: "#0b0b0b",
          light: "#aeaeae",
          lighter: "#c6c6c6",
          dark: "#606060",
          darker: "#414141",
        },
      },
    }),
    string(
      removeTimestamp(output_yaml(dictWithMeta)),
      `
# Updated on [Timestamp replaced for testing]

project:
  name: Example Design Tokens
  author: Chatman R. Jr
  version: 0.0.0
  license: Unlicense
  metadata:
    description: My sample project
    comments: Testing formatters with my sample project

tokens:
  color:
    metadata:
      description: My sample palette
      comments: Testing metadata for my sample palette
    bg: #f8f8f8
    fg: #0b0b0b
    light: #aeaeae
    lighter: #c6c6c6
    dark: #606060
    darker: #414141
`,
    ),
  ],
];

const testApps = [
  "Desktop Apps",
  [
    "no metadata",
    string(
      removeTimestamp(output_gpl(dict)),
      `GIMP Palette
Name: Example Design Tokens (v0.0.0)
# Generator: Quarks System Core
# Owned by Chatman R. Jr
# License: Unlicense
#
# DESCRIPTION: N/A
# COMMENTS: N/A
#
# Updated on [Timestamp replaced for testing]

Columns: 6
248\t248\t248\tBG (#f8f8f8)\n 11\t 11\t 11\tFG (#0b0b0b)\n174\t174\t174\tLIGHT (#aeaeae)\n198\t198\t198\tLIGHTER (#c6c6c6)\n 96\t 96\t 96\tDARK (#606060)\n 65\t 65\t 65\tDARKER (#414141)

`,
    ),
    data(JSON.parse(output_sketchpalette(dict)), {
      colors: [
        {
          red: 0.9725490196078431,
          green: 0.9725490196078431,
          blue: 0.9725490196078431,
          alpha: 1,
        },
        {
          red: 0.043137254901960784,
          green: 0.043137254901960784,
          blue: 0.043137254901960784,
          alpha: 1,
        },
        {
          red: 0.6823529411764706,
          green: 0.6823529411764706,
          blue: 0.6823529411764706,
          alpha: 1,
        },
        {
          red: 0.7764705882352941,
          green: 0.7764705882352941,
          blue: 0.7764705882352941,
          alpha: 1,
        },
        {
          red: 0.3764705882352941,
          green: 0.3764705882352941,
          blue: 0.3764705882352941,
          alpha: 1,
        },
        {
          red: 0.2549019607843137,
          green: 0.2549019607843137,
          blue: 0.2549019607843137,
          alpha: 1,
        },
      ],
      pluginVersion: "1.4",
      compatibleVersion: "1.4",
    }),
  ],
  [
    "some metadata",
    string(
      removeTimestamp(output_gpl(dictWithMeta)),
      `GIMP Palette
Name: Example Design Tokens (v0.0.0)
# Generator: Quarks System Core
# Owned by Chatman R. Jr
# License: Unlicense
#
# DESCRIPTION: My sample project
# COMMENTS: Testing formatters with my sample project
#
# Updated on [Timestamp replaced for testing]

Columns: 6
248\t248\t248\tBG (#f8f8f8)\n 11\t 11\t 11\tFG (#0b0b0b)\n174\t174\t174\tLIGHT (#aeaeae)\n198\t198\t198\tLIGHTER (#c6c6c6)\n 96\t 96\t 96\tDARK (#606060)\n 65\t 65\t 65\tDARKER (#414141)

`,
    ),
  ],
];

const testInterop = [
  "Interoperability/Integration",
  [
    "TailwindCSS theme",
    data(output_tailwindcss(dict), {
      color: {
        bg: "#f8f8f8",
        fg: "#0b0b0b",
        light: "#aeaeae",
        lighter: "#c6c6c6",
        dark: "#606060",
        darker: "#414141",
      },
    }),
    data(output_tailwindcss(dictWithMeta), {
      color: {
        bg: "#f8f8f8",
        fg: "#0b0b0b",
        light: "#aeaeae",
        lighter: "#c6c6c6",
        dark: "#606060",
        darker: "#414141",
      },
    }),
  ],
  [
    "Style Dictionary Tokens",
    data(output_style_dictionary(dict), {
      color: {
        bg: { value: "#f8f8f8" },
        fg: { value: "#0b0b0b" },
        light: { value: "#aeaeae" },
        lighter: { value: "#c6c6c6" },
        dark: { value: "#606060" },
        darker: { value: "#414141" },
      },
    }),
  ],
];

suite("Formatters", testExceptions, testCSS, testData, testApps, testInterop);

formats.forEach((f) => benchmark(f, { project: dict.project, ...options }));

init(7);
