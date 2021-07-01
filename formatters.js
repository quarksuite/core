// [[file:Mod.org::*Custom Properties][Custom Properties:1]]
export function css(dict) {
  return cssFormatStructure({}, dict);
}
// Custom Properties:1 ends here

// [[file:Mod.org::*Sass (SCSS)/Less/Stylus][Sass (SCSS)/Less/Stylus:1]]
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
// Sass (SCSS)/Less/Stylus:1 ends here

// [[file:Mod.org::*Sass (SCSS)/Less/Stylus][Sass (SCSS)/Less/Stylus:2]]
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
// Sass (SCSS)/Less/Stylus:2 ends here

// [[file:Mod.org::*Sass (SCSS)/Less/Stylus][Sass (SCSS)/Less/Stylus:3]]
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
// Sass (SCSS)/Less/Stylus:3 ends here

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

// [[file:Mod.org::*CSS Format Structure][CSS Format Structure:1]]
function cssFormatStructure(
  {
    doc: [DOC_OPEN, DOC_CLOSE] = ["\n/**", " **/\n"],
    metadata: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    wrapper: [TOKENS_OPEN, TOKENS_CLOSE] = ["\n:root {", "\n}\n"],
    opts = { padding: "  " },
  } = {},
  { project, ...tokens },
) {
  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError(project);

  // Attach a dynamic property initializing the autorelease version
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  return "".concat(
    DOC_OPEN,
    `
 * Project: ${name} (v${autobump ? bumpVersion(project) : version})
 * Owned by: ${author}
 * License: ${license}
 * ${"=".repeat(64)}
${
      metadataEmitter(
        { commentDelim: [" *", " * ", ""] },
        {
          description,
          comments,
        },
      )
    }
 * ${"-".repeat(64)}
 * ${timestampEmitter()}
`,
    DOC_CLOSE,
    TOKENS_OPEN,
    tokenStringConstructor(
      { ...opts, commentDelim: [OPEN, DELIM, CLOSE] },
      tokens,
    ),
    TOKENS_CLOSE,
  );
}
// CSS Format Structure:1 ends here

// [[file:Mod.org::*Undefined Project Metadata Error][Undefined Project Metadata Error:1]]
function MissingProjectMetadataError() {
  throw new QSCError({
    name: "Missing Project Metadata",
    reason: `
Formatters will not process a Quarks System Dictionary that's missing project
metadata. Its absence indicates that the current dictionary is still open
for modification.
`,
    suggestion: `
Be sure to include project metadata when you're ready to export your tokens.
Here's an example of the proper schema.

const finishedDict = {
  project: {
    name: "My Project",
    author: "Anonymous",
    version: "0.0.0",
    license: "Unlicense",
    // OPTIONAL can also be one of "major", "minor", "patch", "pre", "build" for automatic versioning
    bump: "manual",
    // OPTIONAL
    metadata: {
      description: "N/A",
      comments: "N/A"
    }
  },
  ...tokens
};

The first four properties are all required. Up to you if you want to include
a description or comments with your project.
`,
  });
}
// Undefined Project Metadata Error:1 ends here

// [[file:Mod.org::*Metadata Emitter][Metadata Emitter:1]]
function metadataEmitter(
  {
    commentDelim: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    str = "",
  },
  meta,
) {
  return str.concat(
    [
      OPEN,
      Object.entries(meta).reduce((str, [key, value]) => {
        const lines = value.split("\n");

        if (lines.length > 1) {
          return str
            .concat(
              "\n",
              DELIM,
              key.toUpperCase(),
              ":",
              "\n",
              DELIM.trimEnd(),
              lines.join(`\n${DELIM}`),
            )
            .trimEnd();
        }

        return str.concat("\n", DELIM, key.toUpperCase(), ": ", lines);
      }, ""),
      CLOSE,
    ].join(""),
  );
}
// Metadata Emitter:1 ends here

// [[file:Mod.org::*Token String Constructor][Token String Constructor:1]]
function tokenStringConstructor(opts, dict) {
  return "".concat("\n", cssTokenEmitter(opts, "", dict));
}
// Token String Constructor:1 ends here

// [[file:Mod.org::*CSS Token Emitter][CSS Token Emitter:1]]
function cssTokenEmitter(opts, head, node) {
  function assemble(head, node) {
    const { metadata, ...tokens } = node;
    return "".concat(
      (metadata && metadataEmitter(opts, metadata)) || "", // prepend metadata if defined
      Object.entries(tokens).reduce((str, [key, value]) => {
        const format = cssTokenAssembler(opts);
        if (typeof value === "object") {
          return str.concat(
            assemble(tokenStringIdentifier(head, key, "-"), value),
          );
        }

        return format(str, tokenStringIdentifier(head, key, "-"), value, "\n");
      }, ""),
    );
  }

  return assemble(head, node);
}
// CSS Token Emitter:1 ends here

// [[file:Mod.org::*CSS Token Assembler][CSS Token Assembler:1]]
function cssTokenAssembler({
  padding = "",
  prefix = "--",
  assignment = ": ",
  suffix = ";",
  terminator = "\n",
}) {
  return function (str, key, value) {
    return str.concat(
      padding,
      prefix,
      key,
      assignment,
      value,
      suffix,
      terminator,
    );
  };
}
// CSS Token Assembler:1 ends here

// [[file:Mod.org::*Token String Identifier][Token String Identifier:1]]
function tokenStringIdentifier(collected, current, delimiter) {
  return current === "base"
    ? collected
    : collected
    ? [collected, current].join(delimiter)
    : current;
}
// Token String Identifier:1 ends here

// [[file:Mod.org::*Automatic Versioning][Automatic Versioning:1]]
function bumpVersion(project) {
  let [major, minor, patch, pre] = Array.from(
    project.version.split(/[.-]/g),
  ).map((n) => parseFloat(n));

  function next(keyword) {
    const bumped = new Map([
      ["major", [major + 1, 0, 0]],
      ["minor", [major, minor + 1, 0]],
      ["patch", [major, minor, patch + 1]],
      ["pre", [major, minor, patch, pre + 1 || 0]],
      ["build", [major, minor, patch, pre, Date.now()]],
    ]).get(keyword);

    return bumped;
  }

  const releaseConditions = (release) =>
    Array.from(
      new Map([
        [release.length === 3, release.join(".")],
        [
          release.length === 4,
          [release.slice(0, 3).join("."), release[3]].join("-"),
        ],
        [
          release.length === 5,
          [
            release.slice(0, 3).join("."),
            [release[3] ?? 0, release[4]].join("+"),
          ].join("-"),
        ],
      ]),
    )
      .filter(([condition]) => condition)
      .flatMap(([, release]) => release)
      .toString();

  project["version"] = releaseConditions(next(project.bump));

  return project.version;
}
// Automatic Versioning:1 ends here

// [[file:Mod.org::*Timestamp Emitter][Timestamp Emitter:1]]
function timestampEmitter() {
  const TIMESTAMP = new Date(Date.now());
  return `Updated on ${TIMESTAMP.toLocaleDateString()} at ${TIMESTAMP.toLocaleTimeString()}`;
}
// Timestamp Emitter:1 ends here

// [[file:Mod.org::*YAML Assemblers][YAML Assemblers:1]]
function yamlDictSubcategory(level, data) {
  return Object.entries(data).reduce((str, [key, v]) => {
    if (Array.isArray(v)) return yamlDictScale(level, str, key, v);
    return yamlDictValue(level, str, key, v);
  }, "");
}

function yamlDictValue(level, str, key, value) {
  const isMultiline = value.split("\n").length > 1;
  if (isMultiline) {
    return str.concat(
      "".padStart(level),
      `${key}: |\n`,
      value
        .split("\n")
        .reduce((s, line) => s.concat("".padStart(level + 2), line, "\n"), ""),
    );
  }
  return str.concat("".padStart(level), key, ": ", value, "\n");
}

function yamlDictScale(level, str, key, value) {
  return str.concat(
    "".padStart(level),
    key,
    ":\n",
    value.reduce((s, v) => s.concat("".padStart(level + 2), "- ", v, "\n"), ""),
  );
}
// YAML Assemblers:1 ends here
