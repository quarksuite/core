import {
  Quarks,
  tokens_to_css,
  tokens_to_gpl,
  tokens_to_json,
  tokens_to_less,
  tokens_to_scss,
  tokens_to_sketchpalette,
  tokens_to_styl,
  tokens_to_style_dictionary,
  tokens_to_tailwindcss,
  tokens_to_yaml,
} from "../mod.js";

import { benchmark, data, exception, init, string, suite } from "./index.js";

const formats = [
  tokens_to_css,
  tokens_to_scss,
  tokens_to_less,
  tokens_to_styl,
  tokens_to_json,
  tokens_to_yaml,
  tokens_to_gpl,
  tokens_to_sketchpalette,
  tokens_to_tailwindcss,
  tokens_to_style_dictionary,
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

const testCSS = [
  "Stylesheet",
  [
    "no metadata",
    string(
      removeTimestamp(tokens_to_css(dict)),
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
      removeTimestamp(tokens_to_scss(dict)),
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
      removeTimestamp(tokens_to_less(dict)),
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
      removeTimestamp(tokens_to_styl(dict)),
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
      removeTimestamp(tokens_to_css(dictWithMeta)),
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
      removeTimestamp(tokens_to_less(dictWithMeta)),
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
      removeTimestamp(tokens_to_less(dictWithMeta)),
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
      removeTimestamp(tokens_to_styl(dictWithMeta)),
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
    data(JSON.parse(tokens_to_json(dict)), {
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
      removeTimestamp(tokens_to_yaml(dict)),
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
    data(JSON.parse(tokens_to_json(dictWithMeta)), {
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
      removeTimestamp(tokens_to_yaml(dictWithMeta)),
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
      removeTimestamp(tokens_to_gpl(dict)),
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
    data(JSON.parse(tokens_to_sketchpalette(dict)), {
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
      removeTimestamp(tokens_to_gpl(dictWithMeta)),
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
    data(tokens_to_tailwindcss(dict), {
      color: {
        bg: "#f8f8f8",
        fg: "#0b0b0b",
        light: "#aeaeae",
        lighter: "#c6c6c6",
        dark: "#606060",
        darker: "#414141",
      },
    }),
    data(tokens_to_tailwindcss(dictWithMeta), {
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
    data(tokens_to_style_dictionary(dict), {
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

suite(
  "Token Utilities",
  testExceptions,
  testCSS,
  testData,
  testApps,
  testInterop,
);

formats.forEach((f) => benchmark(f, { project: dict.project, ...options }));

init(7);
