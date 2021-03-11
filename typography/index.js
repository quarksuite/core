// [[file:../README.org::*systemfonts][systemfonts:1]]
import { SystemFontStacks } from "../data/typography/system.js";
import { ErrorTemplate } from "../internals/error.js";

const SystemFamilyError = (output) =>
  ErrorTemplate({
    message: "key is not a system font stack family",
    reason: `
This error is triggered when one or more of the keys passed into
systemfonts() is invalid.
`,
    suggestion: `
Pass in valid system font stack keywords as strings.

Examples:

systemfonts("sans-serif", "monospace");
systemfonts("sans-serif", "serif");
systemfonts("sans-serif");
systemfonts("sans-serif", "serif", "monospace");
`,
    output,
  });

/**
 * Outputs a collection of system font stacks.
 *
 * @example Outputting a single family
 *
 * ```ts
 * systemfonts("sans-serif");
 * ```
 *
 * @example Outputting multiple families
 *
 * ```ts
 * systemfonts("sans-serif", "serif");
 * ```
 *
 * @example Outputting all families
 *
 * ```ts
 * systemfonts("sans-serif", "serif", "monospace");
 * ```
 *
 * @param {("sans-serif" | "serif" | "monospace")[]} families - keyword(s) matching available system font stacks
 * @returns {string[]} An array of system font stacks
 */
export function systemfonts(...families) {
  if (
    families.every((family) =>
      family === "sans-serif" || family === "serif" || family === "monospace"
    )
  ) {
    return families.map((family) => SystemFontStacks[family]);
  }

  return SystemFamilyError(families);
}
// systemfonts:1 ends here
