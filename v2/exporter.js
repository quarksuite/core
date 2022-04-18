// [[file:../Notebook.org::*stylesheet Implementation][stylesheet Implementation:1]]
export function stylesheet(format, dict) {
  return variables(format, dict);
}
// stylesheet Implementation:1 ends here

// [[file:../Notebook.org::*data Implementation][data Implementation:1]]
export function data(format, dict) {
  const output = {
    json: json.bind(null),
    yaml: yaml.bind(null),
  };

  return output[format](dict);
}
// data Implementation:1 ends here

// [[file:../Notebook.org::*interop Implementation][interop Implementation:1]]
export function interop(format, dict) {
  const output = {
    tailwindcss: tailwindcss.bind(null),
    "style dictionary": styledictionary.bind(null),
  };

  return output[format](dict);
}
// interop Implementation:1 ends here

// [[file:../Notebook.org::*Setup][Setup:1]]
function timestamp() {
  const TIMESTAMP = new Date(Date.now());
  return `Updated on ${TIMESTAMP.toLocaleDateString()} at ${TIMESTAMP.toLocaleTimeString()}`;
}

function info(
  {
    commentDelim: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    str = "",
  },
  metadata
) {
  return str.concat(
    OPEN,
    Object.entries(metadata).reduce((str, [key, value]) => {
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
            lines.join(`\n${DELIM}`)
          )
          .trimEnd();
      }

      return str.concat("\n", DELIM, key.toUpperCase(), ": ", lines);
    }, ""),
    CLOSE
  );
}

function bumpVersion(project) {
  let [major, minor, patch, pre] = Array.from(
    project.version.split(/[.-]/g)
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
      ])
    )
      .filter(([condition]) => condition)
      .flatMap(([, release]) => release)
      .toString();

  return { ...project, version: releaseConditions(next(project.bump)) };
}
// Setup:1 ends here

// [[file:../Notebook.org::*Stylesheet Setup][Stylesheet Setup:1]]
function styleIdentifier(collected, current, delim) {
  if (current === "base") {
    return collected;
  }

  if (collected) {
    return [collected, current].join(delim);
  }

  return current;
}

function styleAssembler({
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
      terminator
    );
  };
}

function styleFormatter(opts, node) {
  function assemble(head, node) {
    const { metadata, ...tokens } = node;

    return "".concat(
      (metadata && info(opts, metadata)) || "",
      Object.entries(tokens).reduce((str, [key, value]) => {
        const format = styleAssembler(opts);

        if (typeof value === "object") {
          return str.concat(assemble(styleIdentifier(head, key, "-"), value));
        }

        return format(str, styleIdentifier(head, key, "-"), value);
      }, "")
    );
  }

  return "\n".concat(assemble("", node));
}

function styleHeader([DOC_OPEN, DOC_CLOSE] = ["\n/**", " **/\n"], project) {
  let {
    name = "Unknown",
    author = "Anonymous",
    version = "0.1.0",
    license = "Unlicense",
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project;

  // Attach a dynamic property initializing the autorelease version
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump
  );

  return "".concat(
    DOC_OPEN,
    `
 * Project: ${name} (v${autobump ? bumpVersion(project) : version})
 * Owned by: ${author}
 * License: ${license}
 * ${"=".repeat(80)}
${info(
  { commentDelim: [" *", " * ", ""] },
  {
    description,
    comments,
  }
)}
 * ${"-".repeat(80)}
 * ${timestamp()}
`,
    DOC_CLOSE
  );
}

function styleTokens(
  {
    metadata: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    wrapper: [TOKENS_OPEN, TOKENS_CLOSE] = ["\n:root {", "\n}\n"],
    opts = { padding: "  " },
  },
  tokens
) {
  return "".concat(
    TOKENS_OPEN,
    styleFormatter({ ...opts, commentDelim: [OPEN, DELIM, CLOSE] }, tokens),
    TOKENS_CLOSE
  );
}

function style({ doc, ...opts } = {}, { project, ...tokens }) {
  return "".concat(styleHeader(doc, project), styleTokens(opts, tokens));
}
// Stylesheet Setup:1 ends here

// [[file:../Notebook.org::*Stylesheet Variables][Stylesheet Variables:1]]
function variables(type, dict) {
  const format = {
    css: style.bind(null, {}),
    scss: style.bind(null, {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "$" },
    }),
    less: style.bind(null, {
      doc: ["\n/*", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "@" },
    }),
    styl: style.bind(null, {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "", assignment: " = ", suffix: "" },
    }),
  };

  return format[type](dict);
}
// Stylesheet Variables:1 ends here

// [[file:../Notebook.org::*Data][Data:1]]
function json(dict) {
  const { project, ...tokens } = dict;

  const { bump = "manual" } = project;

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump
  );

  // Then bump the version
  autobump && bumpVersion(project);

  return JSON.stringify({ project, tokens }, null, 2);
}

function yamlValue(level, str, key, value) {
  const isMultiline = typeof value === "string" && value.split("\n").length > 1;
  if (isMultiline) {
    return str.concat(
      "".padStart(level),
      `${key}: |\n`,
      value
        .split("\n")
        .reduce((s, line) => s.concat("".padStart(level + 2), line, "\n"), "")
    );
  }

  return str.concat("".padStart(level), key, ": ", value, "\n");
}

function yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project;

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump
  );

  // Then bump the version
  autobump && bumpVersion(project);

  // Recursively assemble the data tree
  const assemble = (level, tree) =>
    Object.entries(tree).reduce((str, [key, data]) => {
      if (typeof data === "string" || typeof data === "number")
        return yamlValue(level, str, key, data);
      return str.concat(
        "".padStart(level),
        key,
        ":\n",
        assemble(level + 2, data)
      );
    }, "");

  return `
# ${timestamp()}
${Object.entries({ project, tokens })
  .reduce((str, [key, data]) => {
    if (typeof data === "string" || typeof data === "number")
      return yamlValue(0, str, key, data);
    return str.concat("\n", key, ":\n", assemble(2, data));
  }, "")
  .trimEnd()}
`;
}
// Data:1 ends here

// [[file:../Notebook.org::*Interop][Interop:1]]
function tailwindcss(dict) {
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

  return project && assemble(tokens);
}

function styledictionary(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      // Skip past any metadata
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: { value: data } };
    }, {});

  return project && assemble(tokens);
}
// Interop:1 ends here
