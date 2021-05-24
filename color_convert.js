// [[file:README.org::*Format Conversion (=color_convert.js=)][Format Conversion (=color_convert.js=):1]]
import * as format from "./internals/color/format/index.js";
import * as convert from "./internals/color/convert/index.js";
import { ErrorTemplate } from "./internals/error.js";
import { pipe } from "./utilities.js";

const ColorError = (output) =>
  ErrorTemplate({
    message: "not a valid CSS color format",
    reason: `
This error indicates that the input for conversion is not actually a color.
`,
    suggestion: `
Ensure that the input is a valid CSS color.

Examples:

#deaded
#bea
#face
#abcdef68

aliceblue
rebeccapurple

rgb(110, 33, 229)
rgba(139, 110, 19, 0.5)

hsl(300, 89%, 38%)
hsla(3.4rad, 100%, 25%, 0.99)

device-cmyk(0 1 1 0)
device-cmyk(78% 39% 0 0)

hwb(190 39% 3%)

lab(64% 19 -47)

lch(38% 78 147)
`,
    output,
  });

const parseColor = (color, input, ...chain) =>
  input.validate(color) && pipe(color, ...chain);

// Conversion
function convertColor(color, ...chain) {
  return parseColor(
    color,
    format[chain[0]],
    ...chain.reduce((acc, _, index, array) => {
      if (index === array.length - 1) return acc; // end of sequence
      if (array[index] === "named" && array[index + 1] === "hex") {
        // implicit named color conversion
        return [convert.named.hex];
      }
      return [
        ...acc,
        format[array[index]].extract,
        convert[array[index]][array[index + 1]],
      ];
    }, []),
  );
}

const checkConversion = (color, formats) =>
  formats.filter((found) => !!found).toString() || ColorError(color);
// Format Conversion (=color_convert.js=):1 ends here

// [[file:README.org::*hex][hex:1]]
/**
 * A function that converts any valid CSS color to RGB hex.
 *
 * @example Converting RGB to RGB Hex
 *
 * ```ts
 * hex("rgb(0, 0, 0)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to RGB hex
 */
export function hex(color) {
  return format.hex.validate(color) ? color : checkConversion(color, [
    convertColor(color, "named", "hex"),
    convertColor(color, "rgb", "hex"),
    convertColor(color, "hsl", "rgb", "hex"),
    convertColor(color, "cmyk", "rgb", "hex"),
    convertColor(color, "hwb", "rgb", "hex"),
    convertColor(color, "lab", "rgb", "hex"),
    convertColor(color, "lch", "lab", "rgb", "hex"),
    convertColor(color, "oklab", "rgb", "hex"),
  ]);
}
// hex:1 ends here

// [[file:README.org::*rgb][rgb:1]]
/**
 * A function that converts any valid CSS color to RGB.
 *
 * @example Converting RGB Hex to RGB
 *
 * ```ts
 * rgb("#deaded");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to RGB
 */
export function rgb(color) {
  return format.rgb.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb"),
    convertColor(color, "named", "hex", "rgb"),
    convertColor(color, "hsl", "rgb"),
    convertColor(color, "cmyk", "rgb"),
    convertColor(color, "hwb", "rgb"),
    convertColor(color, "lab", "rgb"),
    convertColor(color, "lch", "lab", "rgb"),
    convertColor(color, "oklab", "rgb"),
  ]);
}
// rgb:1 ends here

// [[file:README.org::*hsl][hsl:1]]
/**
 * A function that converts any valid CSS color to HSL.
 *
 * @example Converting Device CMYK to HSL
 *
 * ```ts
 * hsl("device-cmyk(30% 0 60% 0)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to HSL
 */
export function hsl(color) {
  return format.hsl.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "hsl"),
    convertColor(color, "named", "hex", "rgb", "hsl"),
    convertColor(color, "rgb", "hsl"),
    convertColor(color, "cmyk", "rgb", "hsl"),
    convertColor(color, "hwb", "rgb", "hsl"),
    convertColor(color, "lab", "rgb", "hsl"),
    convertColor(color, "lch", "lab", "rgb", "hsl"),
    convertColor(color, "oklab", "rgb", "hsl"),
  ]);
}
// hsl:1 ends here

// [[file:README.org::*cmyk][cmyk:1]]
/**
 * A function that converts any valid CSS color to CMYK
 *
 * @example Converting HSL to Device CMYK
 *
 * ```ts
 * cmyk("hsl(97, 63%, 81%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CMYK
 */
export function cmyk(color) {
  return format.cmyk.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "cmyk"),
    convertColor(color, "named", "hex", "rgb", "cmyk"),
    convertColor(color, "rgb", "cmyk"),
    convertColor(color, "hsl", "rgb", "cmyk"),
    convertColor(color, "hwb", "rgb", "cmyk"),
    convertColor(color, "lab", "rgb", "cmyk"),
    convertColor(color, "lch", "lab", "rgb", "cmyk"),
    convertColor(color, "oklab", "rgb", "cmyk"),
  ]);
}
// cmyk:1 ends here

// [[file:README.org::*hwb][hwb:1]]
/**
 * A function that converts any valid CSS color to HWB.
 *
 * @example Converting CIELCH to HWB
 *
 * ```ts
 * hwb("lch(78% 83 210)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to HWB
 */
export function hwb(color) {
  return format.hwb.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "hwb"),
    convertColor(color, "named", "hex", "rgb", "hwb"),
    convertColor(color, "rgb", "hwb"),
    convertColor(color, "hsl", "rgb", "hwb"),
    convertColor(color, "cmyk", "rgb", "hwb"),
    convertColor(color, "lab", "rgb", "hwb"),
    convertColor(color, "lch", "lab", "rgb", "hwb"),
    convertColor(color, "oklab", "rgb", "hwb"),
  ]);
}
// hwb:1 ends here

// [[file:README.org::*lab][lab:1]]
/**
 * A function that converts any valid CSS color to CIELAB.
 *
 * @example Convert HWB to CIELAB
 *
 * ```ts
 * lab("hwb(90 25% 10%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIELAB
 */
export function lab(color) {
  return format.lab.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "lab"),
    convertColor(color, "named", "hex", "rgb", "lab"),
    convertColor(color, "rgb", "lab"),
    convertColor(color, "hsl", "rgb", "lab"),
    convertColor(color, "cmyk", "rgb", "lab"),
    convertColor(color, "hwb", "rgb", "lab"),
    convertColor(color, "lch", "lab"),
    convertColor(color, "oklab", "rgb", "lab"),
  ]);
}
// lab:1 ends here

// [[file:README.org::*lch][lch:1]]
/**
 * A function that converts any valid CSS color to CIELCh(ab).
 *
 * @example Convert CIELCh(ab) to RGB Hex
 *
 * ```ts
 * lch("#face");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIELCh(ab)
 */
export function lch(color) {
  return format.lch.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "lab", "lch"),
    convertColor(color, "named", "hex", "rgb", "lab", "lch"),
    convertColor(color, "rgb", "lab", "lch"),
    convertColor(color, "hsl", "rgb", "lab", "lch"),
    convertColor(color, "cmyk", "rgb", "lab", "lch"),
    convertColor(color, "hwb", "rgb", "lab", "lch"),
    convertColor(color, "lab", "lch"),
    convertColor(color, "oklab", "rgb", "lab", "lch"),
  ]);
}
// lch:1 ends here

// [[file:README.org::*oklab][oklab:1]]
/**
 * A function that converts any valid CSS color to _non-standard_ Oklab (LCh).
 *
 * @example Convert Oklab (LCh) to RGB Hex
 *
 * ```ts
 * oklab("#face");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to Oklab (LCh)
 */
export function oklab(color) {
  return format.oklab.validate(color) ? color : checkConversion(color, [
    convertColor(color, "hex", "rgb", "oklab"),
    convertColor(color, "named", "hex", "rgb", "oklab"),
    convertColor(color, "rgb", "oklab"),
    convertColor(color, "hsl", "rgb", "oklab"),
    convertColor(color, "cmyk", "rgb", "oklab"),
    convertColor(color, "hwb", "rgb", "oklab"),
    convertColor(color, "lab", "rgb", "oklab"),
    convertColor(color, "lch", "lab", "rgb", "oklab"),
  ]);
}
// oklab:1 ends here
