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
