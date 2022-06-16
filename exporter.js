/// <reference types="./types/exporter.d.ts" />

/**
 * @typedef {Partial<{
 *   name: string;
 *   author: string;
 *   version: string;
 *   license: string;
 *   bump: string;
 *   metadata: {
 *     description?: string;
 *     comments?: string;
 *   }
 * }>} ProjectSettings
 *
 * @typedef {string | number} TokenValue
 *
 * @typedef {{base: TokenValue; [variant: string]: TokenValue | TokenSubcategory }} TokenSubcategory
 *
 * @typedef {{ [category: string]: TokenValue | TokenSubcategory | {} | TokenSchema }} TokenSchema
 *
 * @typedef {{
 *   project: ProjectSettings;
 *   [tokens: string]: TokenSchema;
 * }} Dictionary
 */

/**
 * @typedef {"css" | "scss" | "less" | "styl"} StylesheetFormat
 * @typedef {"json" | "yaml"} DataFormat
 * @typedef {"tailwindcss" | "style-dictionary"} SchemaFormat
 */

/**
 * An exporter that takes a complete token `dict` and prepares a file-ready
 * template string for a given stylesheet `format`.
 *
 * @param {StylesheetFormat} format - the target stylesheet format
 * @param {Dictionary} dict - the input token dictionary
 * @returns {string} file-ready stylesheet output
 *
 * @remarks
 * As a rule, exporter functions do *not* assume read/write access to your system.
 * The output of an exporter will either be a prepared file-ready template string
 * (or stringified JSON) or an object according to its return type.
 *
 * You can then write this data to a file using your environment's native
 * filesystem API or a filesystem library of your choice.
 *
 * @example
 * Token dictionary stylesheet export example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { stylesheet } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const css = stylesheet("css", dict);
 * export const scss = stylesheet("scss", dict);
 * export const less = stylesheet("less", dict);
 * export const styl = stylesheet("styl", dict);
 * ```
 */
export function stylesheet(format, dict) {
  return variables(format, dict);
}

/**
 * An exporter that takes a complete token `dict` and prepares a file-ready
 * template string for a given data `format`.
 *
 * @param {DataFormat} format - the target data format
 * @param {Dictionary} dict - the input token dictionary
 * @returns {string} file-ready data output
 *
 * @remarks
 * As a rule, exporter functions do *not* assume read/write access to your system.
 * The output of an exporter will either be a prepared file-ready template string
 * (or stringified JSON) or an object according to its return type.
 *
 * You can then write this data to a file using your environment's native
 * filesystem API or a filesystem library of your choice.
 *
 * @example
 * Token dictionary data export example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { data } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const json = data("json", dict);
 * export const yaml = data("yaml", dict);
 * ```
 */
export function data(format, dict) {
  const output = {
    json: json.bind(null),
    yaml: yaml.bind(null),
  };

  return output[format](dict);
}

/**
 * An exporter that takes a complete token `dict` and translates the data
 * to a given `format` schema.
 *
 * @param {SchemaFormat} format - the target schema
 * @param {Dictionary} dict - the input token dictionary
 * @returns {object} the output data
 *
 * @remarks
 * As a rule, exporter functions do *not* assume read/write access to your system.
 * The output of an exporter will either be a prepared file-ready template string
 * (or stringified JSON) or an object according to its return type.
 *
 * You can then write this data to a file using your environment's native
 * filesystem API or a filesystem library of your choice.
 *
 * @example
 * Token dictionary schema translation example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { schema } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const theme = schema("tailwindcss", dict);
 * export const tokens = schema("style-dictionary", dict);
 * ```
 */
export function schema(format, dict) {
  const output = {
    tailwindcss: tailwindcss.bind(null),
    "style-dictionary": styledictionary.bind(null),
  };

  return output[format](dict);
}

function timestamp() {
  const TIMESTAMP = new Date(Date.now());
  return `Updated on ${TIMESTAMP.toLocaleDateString()} at ${TIMESTAMP.toLocaleTimeString()}`;
}

function info(
  {
    commentDelim: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    str = "",
  },
  metadata,
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
            lines.join(`\n${DELIM}`),
          )
          .trimEnd();
      }

      return str.concat("\n", DELIM, key.toUpperCase(), ": ", lines);
    }, ""),
    CLOSE,
  );
}

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

  return { ...project, version: releaseConditions(next(project.bump)) };
}

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
      terminator,
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
      }, ""),
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
    (keyword) => keyword === bump,
  );

  return "".concat(
    DOC_OPEN,
    `
 * Project: ${name} (v${autobump ? bumpVersion(project) : version})
 * Owned by: ${author}
 * License: ${license}
 * ${"=".repeat(80)}
${
      info(
        { commentDelim: [" *", " * ", ""] },
        {
          description,
          comments,
        },
      )
    }
 * ${"-".repeat(80)}
 * ${timestamp()}
`,
    DOC_CLOSE,
  );
}

function styleTokens(
  {
    metadata: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    wrapper: [TOKENS_OPEN, TOKENS_CLOSE] = ["\n:root {", "\n}\n"],
    opts = { padding: "  " },
  },
  tokens,
) {
  return "".concat(
    TOKENS_OPEN,
    styleFormatter({ ...opts, commentDelim: [OPEN, DELIM, CLOSE] }, tokens),
    TOKENS_CLOSE,
  );
}

function style({ doc, ...opts } = {}, { project, ...tokens }) {
  return "".concat(styleHeader(doc, project), styleTokens(opts, tokens));
}

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

function json(dict) {
  const { project, ...tokens } = dict;

  const { bump = "manual" } = project;

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
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
        .reduce((s, line) => s.concat("".padStart(level + 2), line, "\n"), ""),
    );
  }

  return str.concat("".padStart(level), key, ": ", value, "\n");
}

function yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project;

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  // Recursively assemble the data tree
  const assemble = (level, tree) =>
    Object.entries(tree).reduce((str, [key, data]) => {
      if (typeof data === "string" || typeof data === "number") {
        return yamlValue(level, str, key, data);
      }
      return str.concat(
        "".padStart(level),
        key,
        ":\n",
        assemble(level + 2, data),
      );
    }, "");

  return `
# ${timestamp()}
${
    Object.entries({ project, tokens })
      .reduce((str, [key, data]) => {
        if (typeof data === "string" || typeof data === "number") {
          return yamlValue(0, str, key, data);
        }
        return str.concat("\n", key, ":\n", assemble(2, data));
      }, "")
      .trimEnd()
  }
`;
}

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
