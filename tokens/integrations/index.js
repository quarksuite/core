// [[file:../../README.org::*tailwind][tailwind:1]]
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

// [[file:../../README.org::*styledict][styledict:1]]
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
