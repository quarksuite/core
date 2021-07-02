// [[file:Mod.org::*Formatters][Formatters:1]]
import {
  bumpVersion,
  cssFormatStructure,
  MissingProjectMetadataError,
  timestampEmitter,
  yamlDictScale,
  yamlDictSubcategory,
  yamlDictValue,
} from "./lib/formatters/index.js";
// Formatters:1 ends here

// [[file:Mod.org::*Custom Properties][Custom Properties:1]]
export function css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Preprocessors][Preprocessors:1]]
export function scss(dict) {
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
export function less(dict) {
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
export function styl(dict) {
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
export function raw(dict) {
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
export function yaml(dict) {
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
