// [[file:Mod.org::*Setting Up Formatter Helpers][Setting Up Formatter Helpers:1]]
import {
  bumpVersion,
  cssFormatStructure,
  metadataEmitter,
  MissingProjectMetadataError,
  timestampEmitter,
  tokenStringIdentifier,
  yamlDictScale,
  yamlDictSubcategory,
  yamlDictValue,
} from "./lib/formatters/index.js";
import { extractor } from "./lib/utilities/color/extractor/index.js";
import { parser } from "./lib/utilities/color/parser/index.js";
import { color_to_hex, color_to_rgb, utility_pipe } from "./utilities.js";
// Setting Up Formatter Helpers:1 ends here

// [[file:Mod.org::*Custom Properties][Custom Properties:1]]
export function output_css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Sass][Sass:1]]
export function output_scss(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "$" },
    },
    dict,
  );
}
// Sass:1 ends here

// [[file:Mod.org::*Less][Less:1]]
export function output_less(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "@" },
    },
    dict,
  );
}
// Less:1 ends here

// [[file:Mod.org::*Stylus][Stylus:1]]
export function output_styl(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "", assignment: " = ", suffix: "" },
    },
    dict,
  );
}
// Stylus:1 ends here

// [[file:Mod.org::*Raw (JSON)][Raw (JSON):1]]
export function output_raw(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  return JSON.stringify({ project, tokens }, null, 2);
}
// Raw (JSON):1 ends here

// [[file:Mod.org::*YAML][YAML:1]]
export function output_yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  // Recursively assemble the data tree
  const assemble = (level, tree) =>
    Object.entries(tree).reduce((str, [key, data]) => {
      if (typeof data === "string") return yamlDictValue(level, str, key, data);
      if (Array.isArray(data)) return yamlDictScale(level, str, key, data);
      if (key === "base") return yamlDictSubcategory(level, data);
      return str.concat(
        "".padStart(level),
        key,
        ":\n",
        assemble(level + 2, data),
      );
    }, "");

  return `
# ${timestampEmitter()}
${
    Object.entries({ project, tokens })
      .reduce((str, [key, data]) => {
        if (typeof data === "string") return yamlDictValue(0, str, key, data);
        if (Array.isArray(data)) return yamlDictScale(0, str, key, data);
        if (key === "base") return yamlDictSubcategory(0, data);
        return str.concat("\n", key, ":\n", assemble(2, data));
      }, "")
      .trimEnd()
  }
`;
}
// YAML:1 ends here

// [[file:Mod.org::*GIMP/Inkscape][GIMP/Inkscape:1]]
export function output_gpl(dict) {
  const {
    project,
    color: { metadata, ...palette },
  } = dict;
  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );
  // Then bump the version
  autobump && bumpVersion(project);

  const assemble = (head, node) =>
    Object.entries(node).reduce((str, [key, value]) => {
      const KEY = key.toUpperCase();

      if (typeof value === "object") {
        return str.concat(
          assemble(tokenStringIdentifier(head, KEY, " "), value),
        );
      }

      return str.concat(
        GIMPPaletteSwatch(value),
        "\t",
        tokenStringIdentifier(head, KEY, " "),
        ` (${color_to_hex(value)})`,
        "\n",
      );
    }, "");

  return `
GIMP Palette
Name: ${name} (v${version})
# Generator: Quarks System Core
# Owned by ${author}
# License: ${license}
${
    metadataEmitter(
      { commentDelim: ["#", "# ", "\n#"] },
      {
        description,
        comments,
      },
    )
  }
# ${timestampEmitter()}

Columns: 6
${assemble("", palette)}
`.trimStart();
}

function GIMPPaletteSwatch(color) {
  return utility_pipe(
    color,
    color_to_rgb,
    extractor,
    ([, components]) =>
      components
        .map((C) => C.padStart(3, " "))
        .slice(0, 3)
        .join("\t"),
  );
}
// GIMP/Inkscape:1 ends here

// [[file:Mod.org::*Sketch][Sketch:1]]
export function output_sketchpalette(dict) {
  const {
    project,
    color: { metadata, ...palette },
  } = dict;

  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  const assemble = (tree) =>
    Object.values(tree)
      .map((data) => {
        if (Array.isArray(data)) {
          return data.map((color) => sketchSwatch(color)).flat();
        }

        if (typeof data === "object") {
          return assemble(data);
        }

        return sketchSwatch(data);
      })
      .flat();

  return JSON.stringify({
    colors: assemble(palette),
    pluginVersion: "1.4",
    compatibleVersion: "1.4",
  });
}

function sketchSwatch(color) {
  return utility_pipe(
    color,
    color_to_rgb,
    parser,
    ([, [red, green, blue, alpha]]) => ({
      red,
      green,
      blue,
      alpha,
    }),
  );
}
// Sketch:1 ends here

// [[file:Mod.org::*TailwindCSS][TailwindCSS:1]]
export function output_tailwindcss(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "base") return { ...acc, DEFAULT: data };

      // Skip past any metadata
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: data };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}
// TailwindCSS:1 ends here

// [[file:Mod.org::*Style Dictionary][Style Dictionary:1]]
export function output_style_dictionary(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: { value: String(data) } };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}
// Style Dictionary:1 ends here
