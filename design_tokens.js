// [[file:README.org::*CSS (=design_tokens.js=)][CSS (=design_tokens.js=):1]]
const formatter = ({
  padding = "",
  prefix = "--",
  operator = ": ",
  suffix = ";",
  eol = "\n",
}) =>
  (collector, key, value) =>
    collector.concat(padding, prefix, key, operator, value, suffix, eol);

const variable = (collected, current, delimiter) =>
  current === "base"
    ? collected
    : collected
    ? [collected, current].join(delimiter)
    : current;

function construct(opts, dict) {
  const aggregator = (head, node) =>
    Object.entries(node).reduce((product, [key, value]) => {
      const format = formatter(opts);
      const delimiter = "-";

      return typeof value === "object"
        ? product.concat(aggregator(variable(head, key, delimiter), value))
        : format(product, variable(head, key, delimiter), value);
    }, "");

  return "".concat("\n", aggregator("", dict));
}
// CSS (=design_tokens.js=):1 ends here

// [[file:README.org::*css][css:1]]
/**
 * Transforms Quark System Dictionaries into CSS custom properties.
 *
 * @example
 *
 * ```ts
 * css(dict);
 * ```
 *
 * @remarks
 * This function does not actually build the files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as CSS custom properties (file-ready)
 */
export const css = (dict) => `\n:root {${construct({ padding: "  " }, dict)}}`;
// css:1 ends here

// [[file:README.org::*sass][sass:1]]
/**
 * Transforms Quark System Dictionaries into Sass variables.
 *
 * @example
 *
 * ```ts
 * sass(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as Sass variables (file-ready)
 */
export const sass = (dict) => construct({ prefix: "$" }, dict);
// sass:1 ends here

// [[file:README.org::*less][less:1]]
/**
 * Transforms Quark System Dictionaries into Less variables.
 *
 * @example
 *
 * ```ts
 * less(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as Less variables (file-ready)
 */
export const less = (dict) => construct({ prefix: "@" }, dict);
// less:1 ends here

// [[file:README.org::*styl][styl:1]]
/**
 * Transforms Quark System Dictionaries into Stylus variables.
 *
 * @example
 *
 * ```ts
 * styl(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as Stylus variables (file-ready)
 */
export const styl = (dict) =>
  construct({ prefix: "", operator: " = ", suffix: "" }, dict);
// styl:1 ends here

// [[file:README.org::*raw][raw:1]]
/**
 * Transforms Quark System Dictionaries into raw JSON data.
 *
 * @example
 *
 * ```ts
 * raw(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as raw JSON data (file-ready)
 */
export const raw = (dict) => JSON.stringify(dict, null, 2);
// raw:1 ends here

// [[file:README.org::*yaml][yaml:1]]
const whitespace = 2;

const value = (level, str, key, value) =>
  str.concat("".padStart(level), key, ": ", value, "\n");

const scale = (level, str, key, value) =>
  str.concat(
    "".padStart(level),
    key,
    ":\n",
    value.reduce(
      (s, v) => s.concat("".padStart(level + whitespace), "- ", v, "\n"),
      "",
    ),
  );

const subcategory = (level, data) =>
  Object.entries(data).reduce((str, [key, v]) => {
    if (Array.isArray(v)) return scale(level, str, key, v);
    return value(level, str, key, v);
  }, "");

const assemble = (level, tree) =>
  Object.entries(tree).reduce((str, [key, data]) => {
    if (typeof data === "string") return value(level, str, key, data);
    if (Array.isArray(data)) return scale(level, str, key, data);
    if (key === "base") return subcategory(level, data);
    return str.concat(
      "".padStart(level),
      key,
      ":\n",
      assemble(level + whitespace, data),
    );
  }, "");

/**
 * Transforms Quark System Dictionaries into YAML data.
 *
 * @example
 *
 * ```ts
 * yaml(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as yaml data (file-ready)
 */
export const yaml = (dict) =>
  Object.entries(dict)
    .reduce((str, [key, data]) => {
      if (typeof data === "string") return value(0, str, key, data);
      if (Array.isArray(data)) return scale(0, str, key, data);
      if (key === "base") return subcategory(0, data);
      return str.concat("\n", key, ":\n", assemble(whitespace, data));
    }, "")
    .trimEnd();
// yaml:1 ends here

// [[file:README.org::*tailwind][tailwind:1]]
/**
 * Reformats Quark System Dictionaries as TailwindCSS theme data.
 *
 * @example
 *
 * ```ts
 * tailwind(dict);
 * ```
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as TailwindCSS theme data (file-ready)
 */
export const tailwind = (dict) =>
  Object.entries(dict).reduce((acc, [key, data]) => {
    if (key === "base") return { ...acc, DEFAULT: data };
    if (Array.isArray(data)) {
      return {
        ...acc,
        ...{
          ...data.reduce((a, v, i) => {
            return { ...a, [[key, i + 2].join("")]: v };
          }, {}),
        },
      };
    }
    if (typeof data === "object") return { ...acc, [key]: tailwind(data) };
    return { ...acc, [key]: data };
  }, {});
// tailwind:1 ends here

// [[file:README.org::*styledict][styledict:1]]
/**
 * Reformats Quark System Dictionaries as Style Dictionary properties.
 *
 * @example
 *
 * ```ts
 * styledict(dict);
 * ```
 *
 * @remarks
 * This function does not actually write files as the core has no need
 * for read/write access.
 *
 * You'll want to use the native API or filesystem library of your choice in
 * your JavaScript environment to output the files.
 *
 * @param {object} dict - the dictionary data to process
 * @returns {string} The transformed dictionary as Style Dictionary properties (file-ready)
 */
export const styledict = (dict) =>
  Object.entries(dict).reduce((acc, [key, data]) => {
    if (typeof data === "object") {
      return { ...acc, [key]: styledict(data) };
    }
    return { ...acc, [key]: { value: String(data) } };
  }, {});
// styledict:1 ends here
