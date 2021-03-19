// [[file:../../README.org::*CSS (=tokens/css/index.js=)][CSS (=tokens/css/index.js=):1]]
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
// CSS (=tokens/css/index.js=):1 ends here

// [[file:../../README.org::*css][css:1]]
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

// [[file:../../README.org::*sass][sass:1]]
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

// [[file:../../README.org::*less][less:1]]
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

// [[file:../../README.org::*styl][styl:1]]
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
