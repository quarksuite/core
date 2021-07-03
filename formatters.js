// [[file:Mod.org::*Formatters][Formatters:1]]
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
// Formatters:1 ends here

// [[file:Mod.org::*Custom Properties][Custom Properties:1]]
export function output_css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Preprocessors][Preprocessors:1]]
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
// Preprocessors:1 ends here

// [[file:Mod.org::*Preprocessors][Preprocessors:2]]
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
// Preprocessors:2 ends here

// [[file:Mod.org::*Preprocessors][Preprocessors:3]]
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
// Preprocessors:3 ends here

// [[file:Mod.org::*Data Exports][Data Exports:1]]
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
// Data Exports:1 ends here

// [[file:Mod.org::*Data Exports][Data Exports:2]]
export function output_yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

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
// Data Exports:2 ends here

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
  } = project || MissingProjectMetadataError(project);

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
# ${license}
${
    metadataEmitter(
      { commentDelim: ["", "# ", "\n\n"] },
      {
        description,
        comments,
      },
    )
  }
# ${timestampEmitter()}

Columns: 6
${assemble("", palette)}
`;
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
    color: { metadata, ...palette },
  } = dict;

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
