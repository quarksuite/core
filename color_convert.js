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

const parseColor = (color, input, ...conversionChain) =>
  input.validate(color) && pipe(color, input.extract, ...conversionChain);

const parseNamedColor = (color, chain = false, ...conversionChain) =>
  format.named.validate(color) && chain
    ? pipe(color, convert.named.hex, format.hex.extract, ...conversionChain)
    : pipe(color, convert.named.hex);

const parseSelf = (color, input) => input.validate(color) && color;

// Possible RGB hex conversion chains
const toHex = (color) =>
  Object.values({
    hex: parseSelf(color, format.hex),
    named: parseNamedColor(color),
    rgb: parseColor(color, format.rgb, convert.rgb.hex),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible RGB conversion chains
const toRGB = (color) =>
  Object.values({
    hex: parseColor(color, format.hex, convert.hex.rgb),
    named: parseNamedColor(color, true, convert.hex.rgb),
    rgb: parseSelf(color, format.rgb),
    hsl: parseColor(color, format.hsl, convert.hsl.rgb),
    cmyk: parseColor(color, format.cmyk, convert.cmyk.rgb),
    hwb: parseColor(color, format.hwb, convert.hwb.rgb),
    lab: parseColor(color, format.lab, convert.lab.rgb),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible HSL conversion chains
const toHSL = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.hsl),
    hsl: parseSelf(color, format.hsl),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CMYK conversion chains
const toCMYK = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.cmyk),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    cmyk: parseSelf(color, format.cmyk),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible HWB conversion chains
const toHWB = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.hwb),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    hwb: parseSelf(color, format.hwb),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CIE Lab conversion chains
const toLAB = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.lab),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    lab: parseSelf(color, format.lab),
    lch: parseColor(color, format.lch, convert.lch.lab),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CIE LCH conversion chains
const toLCH = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    rgb: parseColor(
      color,
      format.rgb,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    lab: parseColor(color, format.lab, convert.lab.lch),
    lch: parseSelf(color, format.lch),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);
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
  return toHex(color);
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
  return toRGB(color);
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
  return toHSL(color);
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
  return toCMYK(color);
}
// cmyk:1 ends here

// [[file:README.org::*hwb][hwb:1]]
/**
 * A function that converts any valid CSS color to HWB.
 *
 * @example Converting CIELCH to HWB
 *
 * ```ts
 * hwb("lch(78.31% 83 210)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to HWB
 */
export function hwb(color) {
  return toHWB(color);
}
// hwb:1 ends here

// [[file:README.org::*lab][lab:1]]
/**
 * A function that converts any valid CSS color to CIE Lab.
 *
 * @example Convert HWB to CIELAB
 *
 * ```ts
 * lab("hwb(90 25% 10%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIE Lab
 */
export function lab(color) {
  return toLAB(color);
}
// lab:1 ends here

// [[file:README.org::*lch][lch:1]]
/**
 * A function that converts any valid CSS color to CIE LCH.
 *
 * @example Convert CIELCH to RGB Hex
 *
 * ```ts
 * lch("#face");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIE LCH
 */
export function lch(color) {
  return toLCH(color);
}
// lch:1 ends here
