// [[file:README.org::*clrs][clrs:1]]
import { ErrorTemplate } from "./internals/error.js";
import { A11yColors } from "./data/color/a11y.js";

const ColorUndefinedError = (output) =>
  ErrorTemplate({
    message: "color not defined in Colors",
    reason: `
This error triggers when the color does not match a defined color in
the Colors project.
`,
    suggestion: `
Pass in one of the below valid colors:

navy blue aqua teal
olive green lime
yellow orange red
maroon fuchsia purple
black
gray/grey silver
white
`,
    output,
  });

/**
 * A function for using better web defaults from the Colors project.
 *
 * @example Using a more accessible teal
 *
 * ```ts
 * clrs("teal");
 * ```
 *
 * @param { "navy" | "aqua" | "blue" | "teal" | "olive" | "green" | "lime" | "yellow" | "orange" | "red" | "maroon" | "fuchsia" | "purple" | "black" | "gray" | "grey" | "silver" | "white" } color - a valid color name in the Colors project
 * @returns {string} The targeted color from the Colors project
 */
export function clrs(color) {
  if (A11yColors.hasOwnProperty(color)) {
    return A11yColors[color];
  }

  return ColorUndefinedError(color);
}
// clrs:1 ends here

// [[file:README.org::*contrast][contrast:1]]
import {
  calcFractionFromChannel,
  significant,
} from "./internals/color/convert/setup.js";
import { extract } from "./internals/color/format/rgb.js";
import { pipe } from "./utilities.js";
import { rgb } from "./color_convert.js";

const precision = significant.bind(null, 3);

function calcRelativeLuminance(color) {
  const [R, G, B] = pipe(color, rgb, extract)
    .map((V) => pipe(V, parseFloat, calcFractionFromChannel))
    .map((V) => (V <= 0.03928 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4));

  return R * 0.2126 + 0.7152 * G + B * 0.0722;
}

function calcRatio(a, b) {
  const [L1, L2] = [a, b]
    .sort((a, b) => calcRelativeLuminance(b) - calcRelativeLuminance(a))
    .map((V) => calcRelativeLuminance(V));

  return precision((L1 + 0.05) / (L2 + 0.05));
}

/**
 * A function that filters a palette by the colors usable with a given background.
 *
 * Colors match only if they meet the WCAG color accessibility rating defined in opts.
 *
 * @example Filtering a palette to only contain the colors that can safely be
 * used with coral while satisfying the AA contrast rating.
 *
 * ```ts
 * contrast({ rating: "AA" }, "coral", palette);
 * ```
 *
 * @example Filtering a palette to only contain the colors that can safely be
 * used with dodgerblue while satisfying the AAA rating.
 *
 * ```ts
 * contrast({ rating: "AAA" }, "dodgerblue", palette);
 * ```
 *
 * @example Using the enhanced recommendations flag
 *
 * ```ts
 * contrast({ rating: "AA", enhanced: true}, "aliceblue", palette);
 * ```
 *
 * @param {{ rating: "AA" | "AAA", enhanced?: boolean }} opts - options for filtering the palette
 * @param {string} background - the background color to check against
 * @param {string[]} palette - a palette of colors to filter
 * @returns {string[]} A new palette of colors usable with the background while satisfying
 * accessibility standards
 */
export function contrast(opts, background, palette) {
  const { rating, enhanced = false } = opts;

  return palette.filter((foreground) => {
    const ratio = calcRatio(background, foreground);
    const max = ratio <= 21;

    if (rating === "AA") return (enhanced ? ratio >= 4.5 : ratio >= 3.1) && max;
    if (rating === "AAA") return (enhanced ? ratio >= 7 : ratio >= 4.5) && max;
  });
}
// contrast:1 ends here
