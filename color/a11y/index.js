// [[file:../../README.org::*clrs][clrs:1]]
import { ErrorTemplate } from "../../internals/error.js";
import { A11yColors } from "../../data/color/a11y.js";

const ColorUndefinedError = (output) =>
  ErrorTemplate({
    message: "color not defined in Colors",
    reason: `
This error triggers when the color does not match a defined color in
the Colors project.
`,
    suggestion: `
Pass in one of the below valid colors:

navy
blue
aqua

teal

olive
green
lime

yellow
orange
red

maroon
fuchsia
purple

black

gray/grey
silver

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

// [[file:../../README.org::*contrast][contrast:1]]
import { significant } from "../../internals/color/convert/setup.js";
import { calcFractionFromChannel } from "../../internals/color/convert/setup.js";
import { extract } from "../../internals/color/format/rgb.js";
import { pipe } from "../../utilities/pipe.js";
import { rgb } from "../conversion/rgb.js";

const precision = significant.bind(null, 3);

function calcRelativeLuminance(color) {
  const [R, G, B] = pipe(color, rgb, extract)
    .map((V) =>
      pipe(
        V,
        parseFloat,
        calcFractionFromChannel,
      )
    ).map((V) => V <= 0.03928 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4);

  return R * 0.2126 + 0.7152 * G + B * 0.0722;
}

function calcRatio(foreground, background) {
  const [L1, L2] = [foreground, background].sort((a, b) =>
    calcRelativeLuminance(b) - calcRelativeLuminance(a)
  ).map((V) => calcRelativeLuminance(V));

  return precision((L1 + 0.05) / (L2 + 0.05));
}

/**
 * A function that allows you to filter palettes by their contrast rating.
 *
 * @example Filtering a palette to only contain colors with a WCAG AA rating
 *
 * ```ts
 * contrast({ rating: "AA" }, palette);
 * ```
 *
 * @example Filtering a palette to only contain colors with a WCAG AAA rating
 *
 * ```ts
 * contrast({ rating: "AAA" }, palette);
 * ```
 *
 * @example Using the enhanced recommendations flag
 *
 * ```ts
 * contrast({ rating: "AA", enhanced: true}, palette);
 * ```
 *
 * @param {{ rating: "AA" | "AAA", enhanced?: boolean }} opts - options for filtering the palette
 * @param {string[]} palette - the completed color palette to filter
 * @returns {string[]} A color palette filtered by accessibility standards
 */
export function contrast(opts, palette) {
  const { rating, enhanced = false } = opts;
  const [base, ...generated] = palette;

  return [
    base,
    ...generated.filter((color) => {
      const ratio = calcRatio(base, color);
      const max = ratio <= 21;

      if (rating === "AA") {
        return (enhanced ? (ratio >= 4.5) : (ratio >= 3.1)) && max;
      }

      if (rating === "AAA") {
        return (enhanced ? (ratio >= 7) : (ratio >= 4.5)) && max;
      }
    }),
  ];
}
// contrast:1 ends here
