// Format: CSS Custom Properties

// Quarks System Core provides the most complete support for its CSS formats by virtue of being a
// web-driven, web-focused kit. The first formatter preps your design tokens as CSS custom
// properties wrapped in a root selector.


// [[file:Mod.org::*Format: CSS Custom Properties][Format: CSS Custom Properties:1]]
export function css({ project, ...tokens }) {
  let {
    name,
    author,
    version,
    bump = "manual",
    license,
    description = "N/A",
    comments = "N/A",
  } = project || MissingProjectMetadataError(project);

  // Attach a dynamic property initializing the autorelease version
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  return `
/**
 * Project: ${name} (v${autobump ? bumpVersion(project) : version})
 * Owned by: ${author}
 * License: ${license}
 * ${"=".repeat(64)}
 * Description: ${description}
 * Comments: ${comments}
 * ${"-".repeat(64)}
 * ${timestampEmitter()}
 **/

:root {${tokenStringConstructor({ padding: "  " }, tokens)}
}
`;
}
// Format: CSS Custom Properties:1 ends here

// Undefined Project Metadata Error

// The very first thing is writing a handy error to throw when the Quarks System Dictionary passed in
// to the formatters is /incomplete/. As I stated further up, the formatters will not process any
// dictionary that's missing project metadata.


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
    // can also be one of "major", "minor", "patch", "pre", "build" for automatic versioning
    bump: "manual",
    description: "N/A",
    comments: "N/A"
  },
  ...tokens
};

The first four properties are all required. Up to you if you want to include
a description or comments with your project.
`,
  });
}
// Undefined Project Metadata Error:1 ends here

// Token String Constructor

// The following construction helper is shared by all formatters in which the token identifier must be
// created by traversing the dictionary. It uses recursion to walk branch by branch, combining keys with
// a given delimiter until it reaches the end of the chain.

// If it finds internal metadata, it will use a special function to process it


// [[file:Mod.org::*Token String Constructor][Token String Constructor:1]]
function tokenStringConstructor(opts, dict) {
  return "".concat("\n", cssTokenEmitter(opts, "", dict));
}
// Token String Constructor:1 ends here

// CSS Token Emitter

// This helper is responsible for actually walking the tree and emitting a complete collection of
// tokens; formatting metadata as it finds it.


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

// CSS Token Assembler

// This helper is responsible for creating a string that the target format will actually recognize as a
// variable or identifier.


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

// Metadata Emitter


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

// Token String Identifier

// This helper is used when =*TokenEmitter= functions walk through the dictionary. It collects the
// keys and joins them with a delimiter. However, it also /ignores/ any keys named base. Simply passing
// through what it's already collected.

// So =color.main.base= becomes =--color-main= in CSS for example.


// [[file:Mod.org::*Token String Identifier][Token String Identifier:1]]
function tokenStringIdentifier(collected, current, delimiter) {
  return current === "base"
    ? collected
    : collected
    ? [collected, current].join(delimiter)
    : current;
}
// Token String Identifier:1 ends here

// Automatic Versioning

// The following helper handles automatic versioning whenever project metadata defines =bump= as a
// keyword other than ="manual"=.


// [[file:Mod.org::*Automatic Versioning][Automatic Versioning:1]]
function bumpVersion(project) {
  let [major, minor, patch, pre] = Array.from(
    project.version.split(/[.-]/g),
  ).map((n) => parseFloat(n));

  console.log(project.version.split(/[.-]/g));

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
      .flatMap(([, release]) => release);

  project["version"] = releaseConditions(next(project.bump));

  console.log(project.version);

  return project.version;
}
// Automatic Versioning:1 ends here

// Timestamp Emitter


// [[file:Mod.org::*Timestamp Emitter][Timestamp Emitter:1]]
function timestampEmitter() {
  const TIMESTAMP = new Date(Date.now());
  return `Updated on ${TIMESTAMP.toLocaleDateString()} at ${TIMESTAMP.toLocaleTimeString()}`;
}
// Timestamp Emitter:1 ends here

// Error Handling

// For v1, I wanted to create better custom errors. So I decided to directly extend the =Error= class
// with my own general =QSCError= class. This will allow me to throw any number of errors I need
// /within/ the context they're triggered and gives me a free stack trace back to what broke.


// [[file:Mod.org::*Error Handling][Error Handling:1]]
class QSCError extends Error {
  constructor({
    name = "Unknown Error",
    reason = "here's why",
    suggestion = "try this",
  } = {}) {
    super();
    this.name = name;
    this.message = `
${reason}
${suggestion}
${"=".repeat(80)}
`;
  }
}
// Error Handling:1 ends here
