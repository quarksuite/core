// [[file:README.org::*Format Conversion][Format Conversion:1]]
import formats from "./internals/color/formats.js";
import conversions from "./internals/color/conversions.js";
import { ErrorTemplate } from "./internals/error.js";
import { compose, pipe } from "./utilities.js";

const ColorError = (output) =>
  ErrorTemplate({
    message: "not a valid CSS color format",
    reason: `
This error indicates that the color format is invalid or unsupported.
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

const validate = (color) =>
  Array.from(formats)
    .map(([supported, validator]) => [supported, validator(color) && color])
    .filter(([, found]) => found)
    .flat();

function queryFormats(output, color) {
  const [input, value] = validate(color);
  const $ = compose;
  const C = pipe;
  const _ = conversions;

  const from = {
    named: $(_.hexFromNamed, _.hexToRGB),
    hex: $(_.hexToRGB),
    rgb: (value) => value, // identity,
    hsl: $(_.rgbFromHSL),
    cmyk: $(_.rgbFromCMYK),
    hwb: $(_.rgbFromHWB),
    cielab: $(_.rgbFromCielab),
    cielch: $(_.cielabFromCielch, _.rgbFromCielab),
    oklab: $(_.rgbFromOklab),
  };

  const to = {
    hex: $(_.hexFromRGB),
    rgb: $(_.hexFromRGB, _.hexToRGB), // identity
    hsl: $(_.rgbToHSL),
    cmyk: $(_.rgbToCMYK),
    hwb: $(_.rgbToHWB),
    cielab: $(_.rgbToCielab),
    cielch: $(_.rgbToCielab, _.cielabToCielch),
    oklab: $(_.rgbToOklab),
  };

  return (
    (value && Array.isArray(output)
      ? output.reduce(
        (acc, format) => ({
          ...acc,
          original: value,
          [format]: C(value, from[input], to[format]),
        }),
        {},
      )
      : value && C(value, from[input], to[output])) || ColorError(color)
  );
}
// Format Conversion:1 ends here

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
  return queryFormats("hex", color);
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
  return queryFormats("rgb", color);
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
  return queryFormats("hsl", color);
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
  return queryFormats("cmyk", color);
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
  return queryFormats("hwb", color);
}
// hwb:1 ends here

// [[file:README.org::*cielab][cielab:1]]
/**
 * A function that converts any valid CSS color to CIELAB.
 *
 * @example Convert HWB to CIELAB
 *
 * ```ts
 * cielab("hwb(90 25% 10%)");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIELAB
 */
export function cielab(color) {
  return queryFormats("cielab", color);
}
// cielab:1 ends here

// [[file:README.org::*cielch][cielch:1]]
/**
 * A function that converts any valid CSS color to CIELCh(ab).
 *
 * @example Convert CIELCh(ab) to RGB Hex
 *
 * ```ts
 * cielch("#face");
 * ```
 *
 * @param {string} color - the input color to convert
 * @returns {string} the input color converted to CIELCh(ab)
 */
export function cielch(color) {
  return queryFormats("cielch", color);
}
// cielch:1 ends here

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
  return queryFormats("oklab", color);
}
// oklab:1 ends here

// [[file:README.org::*compare][compare:1]]
/**
 * A function that batch converts a valid CSS color as a dictionary of formats.
 *
 * @example Comparing the hex, rgb, and hsl values of chartreuse
 *
 * ```ts
 * compare(["hex", "rgb", "hsl"], "chartreuse");
 *
 *
 * @param {("hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "cielab" | "cielch" | "oklab")[]} formats - an array of formats to compare
 * @param {string} color - the input color to convert
 * @returns {{original: string, hex?: string, rgb?: string, hsl?: string, cmyk?: string, hwb?: string, cielab?: string, cielch?: string, oklab?: string }} dictionary containing the original input color as well as the requested formats
 */
export function compare(formats, color) {
  return queryFormats(formats, color);
}
// compare:1 ends here

// [[file:README.org::*Properties Adjustment][Properties Adjustment:1]]
import { valueExtractor } from "./internals/color/formats.js";
import {
  calcFractionFromPercent,
  correctHueClockwise,
  correctHueCounterClockwise,
  enforcePrecision,
  normalize,
} from "./internals/color/math.js";

// Secondary format validation
function preserve(target, color) {
  const [format] = validate(color);

  const revert = {
    named: hex(target),
    hex: hex(target),
    rgb: rgb(target),
    hsl: hsl(target),
    cmyk: cmyk(target),
    hwb: hwb(target),
    cielab: cielab(target),
    cielch: cielch(target),
    oklab: oklab(target),
  };

  return revert[format] || ColorError(color);
}
// Properties Adjustment:1 ends here

// [[file:README.org::*adjust][adjust:1]]
/**
 * A function for adjusting the properties of a color.
 *
 * @example Rotating the hue of coral a third and reducing the chroma by 10%.
 *
 * ```ts
 * adjust({ h: 120, c: -10 }, "coral");
 *
 *
 * @param {{l?: number, c?: number, h?: number, a?: number}} properties - configuration for adjusting the (l)ightness/luminance, (c)hroma, (h)ue, and/or (a)lpha/transparency of a color
 * @param {string} color - the input color for adjustment
 * @returns {string} the adjusted color
 */
export function adjust({ l, c, h, a }, color) {
  const [lightness, chroma, hue, alpha] = pipe(
    color,
    queryFormats.bind(null, "oklab"),
    valueExtractor,
    (components) => components.map((value) => parseFloat(value)),
  );

  let { l: L, c: C, h: H, a: A } = Object.assign({
    l: lightness,
    c: chroma,
    h: hue,
    a: (alpha && (alpha ?? 1)) || 1,
  });

  if (l) {
    L = normalize(0, enforcePrecision(lightness + l), 100);
  }

  if (c) {
    C = normalize(
      0,
      enforcePrecision(chroma + calcFractionFromPercent(c)),
      0.5,
    );
  }

  if (h) {
    let HUE_ADJUSTMENT = enforcePrecision(hue + h);

    // Hue correction
    if (HUE_ADJUSTMENT > 360) {
      H = correctHueClockwise(HUE_ADJUSTMENT);
    } else if (Math.sign(HUE_ADJUSTMENT) === -1) {
      H = pipe(HUE_ADJUSTMENT, correctHueClockwise, correctHueCounterClockwise);
    } else {
      H = HUE_ADJUSTMENT;
    }
  }

  if (a) {
    A = normalize(
      0,
      enforcePrecision((alpha ?? 1) + calcFractionFromPercent(a)),
      1,
    );
  }

  return preserve(
    A === 1 ? `oklab(${L}% ${C} ${H})` : `oklab(${L}% ${C} ${H} / ${A})`,
    color,
  );
}
// adjust:1 ends here

// [[file:README.org::*mix][mix:1]]
import {
  calcFractionFromPercent,
  calcPercentFromFraction,
  significant,
} from "./internals/color/convert/setup.js";
import { parseOklab } from "./internals/color/convert/oklab.js";
// mix:1 ends here

// [[file:README.org::*mix][mix:2]]
function calcMixture(original, target, amount) {
  const [OL, Oa, Ob, Oalpha] = original;
  const [TL, Ta, Tb, Talpha] = target;

  const OA = parseFloat(Oalpha ?? 1);
  const TA = parseFloat(Talpha ?? 1);

  return [
    [OL, TL],
    [Oa, Ta],
    [Ob, Tb],
    [OA, TA],
  ].map(([X, Y]) => X + (Y - X) * amount);
}
// mix:2 ends here

// [[file:README.org::*mix][mix:3]]
/**
 * A function for mixing colors of any valid CSS format.
 *
 *
 * @example Even mixture
 *
 * ```ts
 * mix(50, 'red', 'blue');
 * ```
 *
 * @example Farther from target
 *
 * ```ts
 * mix(34, 'green', 'blue');
 * ```
 *
 * @example Closer to target
 *
 * ```ts
 * mix(75, 'blue', 'white');
 * ```
 *
 * @remarks
 * As a percentage, the amount is bound to a range of 0-100%. At 0%
 * it yields the input color. And at 100%, it yields the target color
 *
 * @param {number} amount - the amount to mix with target (as a percentage)
 * @param {string} target - the mixture target
 * @param {string} color - the input color
 * @returns {string} The mixture result
 */
export function mix(amount, target, color) {
  // Convert both colors to raw Oklab
  const c1 = pipe(color, oklab, extract, parseOklab);
  const c2 = pipe(target, oklab, extract, parseOklab);

  // calculate the mixture
  const [l, a, b, alpha] = calcMixture(c1, c2, calcFractionFromPercent(amount));

  // Convert result back to Oklab (LCh)
  const [L, C, h] = [
    calcPercentFromFraction(l),
    Math.sqrt(a ** 2 + b ** 2),
    Math.atan2(b, a) * (180 / Math.PI),
  ];

  // Hue correction
  let H = Math.sign(h) === -1 ? h + 360 : h;

  return preserve(
    alpha === 1
      ? `oklab(${L}% ${C} ${H})`
      : `oklab(${L}% ${C} ${H} / ${alpha})`,
    color,
  );
}
// mix:3 ends here

// [[file:README.org::*complementary][complementary:1]]
import { hue } from "./color.js";

/**
 * Creates a complementary color scheme from any valid CSS color.
 *
 * @example Creating a complementary scheme
 *
 * ```ts
 * complementary("coral");
 * ```
 *
 * @remarks
 * A complementary color scheme is composed of a base color and its
 * opposite on the color wheel. It is a scheme with the highest possible
 * warm/cool color contrast.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string]} The base hues for a complementary color scheme
 */
export const complementary = (color) => [hue(0, color), hue(180, color)];
// complementary:1 ends here

// [[file:README.org::*analogous][analogous:1]]
/**
 * Creates an analogous color scheme from any valid CSS color.
 *
 * @example Creating an analogous color scheme
 *
 * ```ts
 * analogous("coral");
 * ```
 *
 * @remarks
 * An analogous color scheme is composed of a color and its directly
 * adjacent counterparts on the color wheel; hues about 30° apart from
 * the origin.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a analogous color scheme
 */
export const analogous = (color) => [
  hue(0, color),
  hue(-30, color),
  hue(30, color),
];
// analogous:1 ends here

// [[file:README.org::*splitComplementary][splitComplementary:1]]
/**
 * Creates a split complementary color scheme from any valid CSS color.
 *
 * @example Creaing a split complementary scheme
 *
 * ```ts
 * splitComplementary("coral");
 * ```
 *
 * @remarks
 * A split complementary scheme is composed of a base color and a bisection
 * of colors directly next to its opposite; hues about 30° apart.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a split complementary color scheme
 */
export const splitComplementary = (color) => [
  hue(0, color),
  hue(30, hue(180, color)),
  hue(-30, hue(180, color)),
];
// splitComplementary:1 ends here

// [[file:README.org::*triadic][triadic:1]]
/**
 * Creates a triadic color scheme from any valid CSS color.
 *
 * @example Creating a triadic color scheme
 *
 * ```ts
 * triadic("coral");
 * ```
 *
 * @remarks
 * A triadic color scheme is composed of three colors evenly spaced around
 * the color wheel; 120° apart.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string]} The base hues for a triadic color scheme
 */
export const triadic = (color) => [
  hue(0, color),
  hue(120, color),
  hue(240, color),
];
// triadic:1 ends here

// [[file:README.org::*tetradic][tetradic:1]]
/**
 * Creates a tetradic color scheme from any valid CSS color.
 *
 * @example Creating a tetradic color scheme
 *
 * ```ts
 * tetradic("coral");
 * ```
 *
 * @remarks
 * A tetradic color scheme consists of a color, its opposite, and a
 * second complementary pair of colors. They are also called dual
 * complementary schemes.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a tetradic color scheme
 */
export const tetradic = (color) => [
  hue(0, color),
  hue(60, color),
  hue(180, color),
  hue(60, hue(180, color)),
];

/** An alias for `tetradic()` */
export const dualComplementary = tetradic;
// tetradic:1 ends here

// [[file:README.org::*square][square:1]]
/**
 * Creates a square color scheme from any valid CSS color.
 *
 * @example Creating a square color scheme
 *
 * ```ts
 * square("coral");
 * ```
 *
 * @remarks
 * A square color scheme consists of four colors positioned equally
 * around the color wheel; 90° apart.
 *
 * @param {string} color - the base color to generate from
 * @returns {[string, string, string, string]} The base hues for a square color scheme
 */
export const square = (color) => [
  hue(0, color),
  hue(90, color),
  hue(180, color),
  hue(270, color),
];
// square:1 ends here

// [[file:README.org::*custom][custom:1]]
function generate({ hues, arc, offset = 0 }, color) {
  const values = Array(offset ? hues - 1 : hues + 1).fill(arc);
  const half = Math.ceil(values.length / 2);
  const [leftOfOrigin, rightOfOrigin] = [
    values.slice(0, half),
    values.slice(half, values.length),
  ];
  return offset
    ? [
      ...new Set([
        hue(0, color),
        ...leftOfOrigin.map((v, i) => hue(-(v * i) - offset, color)),
        ...rightOfOrigin.map((v, i) => hue(v * i + offset, color)),
      ]),
    ] // Must preserve the origin with offset
    : [
      ...new Set([
        ...leftOfOrigin.map((v, i) => hue(-(v * i) - offset, color)),
        ...rightOfOrigin.map((v, i) => hue(v * i + offset, color)),
      ]),
    ]; // Must add an extra hue to generate from origin
}

/**
 * A function for creating advanced schemes from any valid CSS color.
 *
 * @example Creating a five tone color scheme
 *
 * ```ts
 * custom({ hues: 5, arc: 72 }, "#e33a00");
 * ```
 *
 * @example Creating a six tone color scheme
 *
 * ```ts
 * custom({ hues: 6, arc: 60 }, "hsl(320grad, 75%, 50%)");
 * ```
 * @example  Creating an accented split complementary
 *
 * ```ts
 * custom({ hues: 4, arc: 30, offset: 150 }, "royalblue");
 * ```
 *
 * @remarks
 * This function is for generating schemes beyond basic configuration.
 *
 * It allows setting any number of hues but will only generate unique colors.
 * The arc is the distance between each color on the wheel. The offset defines
 * degree of rotation for the generated hues from the origin.
 *
 * @param {{ hues: number, arc: number, offset?: number }} attrs - A configuration object defining desired hues (minus overlapping values), arc distance between each hue from the origin, and optional rotation offset
 * @param {string} color - the base color to generate scheme
 * @returns {string[]} A collection of base hues for a custom scheme
 */
export const custom = (attrs, color) => generate(attrs, color);
// custom:1 ends here

// [[file:README.org::*Color Scales][Color Scales:1]]
import { mix } from "./color.js";

const generate = (color, target, contrast, count) =>
  Array.from(Array(count).fill(color)).map((base, index) =>
    mix(contrast - (contrast / count) * index, target, base)
  );
// Color Scales:1 ends here

// [[file:README.org::*tints][tints:1]]
import { pipe } from "./utilities.js";
import { extract } from "./internals/color/format/hwb.js";
import { hwb } from "./color.js";
import { preserve } from "./color.js";

/**
 * Generates tints from any valid CSS color.
 *
 * @example Generating 4 high contrast tints
 *
 * ```ts
 * tints(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure white creates a tint of that color.
 *
 * @param {number} count - number of tints to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of tints
 */
export const tints = (count, contrast, color) => [
  ...new Set([
    ...generate(color, "white", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// tints:1 ends here

// [[file:README.org::*tones][tones:1]]
/**
 * Generates tones from any valid CSS color.
 *
 * @example Generating 4 high contrast tones
 *
 * ```ts
 * tones(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure gray creates a tone of that color.
 *
 * Be aware that tone is also another way of referring to the hue.
 *
 * @param {number} count - number of tones to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of tones
 */
export const tones = (count, contrast, color) => [
  ...new Set([
    ...generate(color, "gray", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort(
        (a, b) =>
          parseFloat(a[1]) +
          parseFloat(a[2]) -
          (parseFloat(b[1]) + parseFloat(b[2])),
      )
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// tones:1 ends here

// [[file:README.org::*shades][shades:1]]
/**
 * Generates shades from any valid CSS color.
 *
 * @example Generating 4 high contrast shades
 *
 * ```ts
 * shades(4, 98, "royalblue");
 * ```
 *
 * @remarks
 * A color mixed with pure black creates a shade of that color.
 *
 * @param {number} count - number of shades to generate
 * @param {number} contrast - contrast of palette (as a percentage)
 * @param {string} color - the base color to generate from
 * @returns {string[]} A generated scale of shades
 */
export const shades = (count, contrast, color) => [
  ...new Set([
    ...generate(color, "black", contrast, count)
      .map((color) => pipe(color, hwb, extract))
      .sort((a, b) => parseFloat(a[2]) - parseFloat(b[2]))
      .map(([H, W, B, A]) =>
        !A ? `hwb(${H} ${W} ${B})` : `hwb(${H} ${W} ${B} / ${A})`
      )
      .map((target) => preserve(target, color)),
  ]),
];
// shades:1 ends here

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
import { rgb } from "./color.js";

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
