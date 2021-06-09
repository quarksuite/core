// [[file:../../README.org::*RGB Hex to Functional RGB][RGB Hex to Functional RGB:1]]
import { calcFractionFromChannel, hexFragmentToChannel } from "./math.js";
import { hexExtractor, valueExtractor } from "./formats.js";

/** RGB Hex to Functional RGB */
export function hexToRGB(color) {
  const [r, g, b, a] = hexExtractor(color);

  const [R, G, B] = [r, g, b].map((hex) => hexFragmentToChannel(hex));
  const A = (a && calcFractionFromChannel(hexFragmentToChannel(a ?? "ff"))) ||
    1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// RGB Hex to Functional RGB:1 ends here

// [[file:../../README.org::*RGB Hex from Named Color][RGB Hex from Named Color:1]]
import { X11Colors } from "../../data/color/w3c-x11.js";

/** RGB HEX <- W3C-X11 */
export const hexFromNamed = (color) => X11Colors[color];
// RGB Hex from Named Color:1 ends here

// [[file:../../README.org::*Functional RGB Conversion][Functional RGB Conversion:1]]
import {
  calcChannelFromPercent,
  calcFractionFromPercent,
  calcHexFragmentFromAlpha,
  calcHueFromRad,
  calcPercentFromFraction,
  channelToHexFragment,
  correctHueCounterClockwise,
  enforcePrecision,
  normalize,
} from "./math.js";
// Functional RGB Conversion:1 ends here

// [[file:../../README.org::*Functional RGB Conversion][Functional RGB Conversion:2]]
/** A helper function to prep RGB values for calculations */
function parseRGB(color) {
  const [r, g, b, alpha] = valueExtractor(color);
  const value = (s) => parseFloat(s);

  const [R, G, B] = [r, g, b].map((channel) =>
    channel.endsWith("%")
      ? enforcePrecision(calcChannelFromPercent(value(channel)))
      : enforcePrecision(value(channel))
  );

  const a = value(alpha);
  const A = a != null
    ? (a > 1 ? enforcePrecision(calcFractionFromPercent(a)) : a)
    : 1;

  return A === 1 ? [R, G, B] : [R, G, B, A];
}
// Functional RGB Conversion:2 ends here

// [[file:../../README.org::*RGB Hex from Functional RGB][RGB Hex from Functional RGB:1]]
/** RGB Hex from Functional RGB */
export function hexFromRGB(color) {
  const [r, g, b, alpha] = parseRGB(color);

  const [R, G, B] = [r, g, b].map((channel) => channelToHexFragment(channel));
  // Alpha is defined and not null
  const A = (alpha && calcHexFragmentFromAlpha(alpha)) || "ff";

  return A === "ff" ? `#${R}${G}${B}` : `#${R}${G}${B}${A}`;
}
// RGB Hex from Functional RGB:1 ends here

// [[file:../../README.org::*Functional RGB to Functional HSL][Functional RGB to Functional HSL:1]]
// https://www.rapidtables.com/convert/color/rgb-to-hsl.html
const calcHue = (R, G, B, cmax, delta) =>
  new Map([
    [0, delta === 0],
    [60 * (((G - B) / delta) % 6), cmax === R],
    [60 * ((B - R) / delta + 2), cmax === G],
    [60 * ((R - G) / delta + 4), cmax === B],
  ]);

const calcSat = (delta, L) =>
  delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

const calcLightness = (cmin, cmax) => (cmax + cmin) / 2;

function calcHSL(r, g, b) {
  const [R, G, B] = [r, g, b].map((channel) =>
    calcFractionFromChannel(channel)
  );

  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  const [H] = Array.from(calcHue(R, G, B, cmax, delta))
    .filter(([, condition]) => condition)
    .flatMap(([value]) => Math.round(value));

  const L = calcLightness(cmin, cmax);

  const S = calcSat(delta, L);

  return [Math.sign(H) === -1 ? correctHueCounterClockwise(H) : H, S, L];
}
// Functional RGB to Functional HSL:1 ends here

// [[file:../../README.org::*Functional RGB to Functional HSL][Functional RGB to Functional HSL:2]]
/** Functional RGB to Functional HSL */
export function rgbToHSL(color) {
  const [r, g, b, alpha] = parseRGB(color);
  const [h, s, l] = calcHSL(r, g, b);

  const [H, S, L] = [
    h,
    enforcePrecision(calcPercentFromFraction(s)),
    enforcePrecision(calcPercentFromFraction(l)),
  ];
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `hsl(${H}, ${S}%, ${L}%)` : `hsla(${H}, ${S}%, ${L}%, ${A})`;
}
// Functional RGB to Functional HSL:2 ends here

// [[file:../../README.org::*Functional RGB to Device CMYK][Functional RGB to Device CMYK:1]]
/** Functional RGB to Device CMYK */
export function rgbToCMYK(color) {
  const [r, g, b, alpha] = parseRGB(color);
  const [R, G, B] = [r, g, b].map((channel) =>
    calcFractionFromChannel(channel)
  );

  // https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
  const k = 1 - Math.max(R, G, B);
  const [c, m, y] = [R, G, B].map((channel) => (1 - channel - k) / (1 - k));
  const A = (alpha && (alpha ?? 1)) || 1;

  // Many examples in the CSS Color Module Level 4 use the percentage format,
  // so I'm assuming that's the preferred format in conversions.
  const [C, M, Y, K] = [c, m, y, k].map((component) =>
    isNaN(component) ? 0 : enforcePrecision(calcPercentFromFraction(component))
  );

  return A === 1
    ? `device-cmyk(${C}% ${M}% ${Y}% ${K}%)`
    : `device-cmyk(${C}% ${M}% ${Y}% ${K}% / ${A})`;
}
// Functional RGB to Device CMYK:1 ends here

// [[file:../../README.org::*Functional RGB to Functional HWB][Functional RGB to Functional HWB:1]]
/** Functional RGB to Functional HWB */
export function rgbToHWB(color) {
  const [r, g, b, alpha] = parseRGB(color);
  const [R, G, B] = [r, g, b].map((channel) =>
    calcFractionFromChannel(channel)
  );

  const [H] = calcHSL(r, g, b);
  const [W, BLK] = [
    enforcePrecision(calcPercentFromFraction(Math.min(R, G, B))),
    enforcePrecision(calcPercentFromFraction(1 - Math.max(R, G, B))),
  ];
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `hwb(${H} ${W}% ${BLK}%)` : `hwb(${H} ${W}% ${BLK}% / ${A})`;
}
// Functional RGB to Functional HWB:1 ends here

// [[file:../../README.org::*Functional RGB to Functional CIELAB][Functional RGB to Functional CIELAB:1]]
/** Functional RGB >-< Linear RGB */
const removeGamma = (rgb) =>
  rgb.map((v) => {
    const V = calcFractionFromChannel(v);
    return V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4;
  });
// Functional RGB to Functional CIELAB:1 ends here

// [[file:../../README.org::*Functional RGB to Functional CIELAB][Functional RGB to Functional CIELAB:2]]
/** Linear RGB to CIE XYZ */
function calcXYZ(rgb) {
  const [R, G, B] = removeGamma(rgb);
  const [X, Y, Z] = [
    R * 0.4124564 + G * 0.3575761 + B * 0.1804375,
    R * 0.2126729 + G * 0.7151522 + B * 0.072175,
    R * 0.0193339 + G * 0.119192 + B * 0.9503041,
  ];

  /*
   * D50 matrix
   * =============================
   * 1.0478112  0.0228866 -0.0501270
   * 0.0295424  0.9904844 -0.0170491
   * -0.0092345  0.0150436  0.7521316
   * =============================
   */
  return [
    X * 1.0478112 + Y * 0.0228866 + Z * -0.050127,
    X * 0.0295424 + Y * 0.9904844 + Z * -0.0170491,
    X * -0.0092345 + Y * 0.0150436 + Z * 0.7521316,
  ];
}
// Functional RGB to Functional CIELAB:2 ends here

// [[file:../../README.org::*Functional RGB to Functional CIELAB][Functional RGB to Functional CIELAB:3]]
/** Functional RGB to Functional CIELAB */
export function rgbToCielab(color) {
  const [r, g, b, alpha] = parseRGB(color);
  const [x, y, z] = calcXYZ([r, g, b]);

  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white

  // Calculating XYZ scaled relative to white
  const [X, Y, Z] = [x, y, z].map((v, i) => v / white[i]);
  // Calculating F for each value
  const [FX, FY, FZ] = [X, Y, Z].map((V) =>
    V > ε ? Math.cbrt(V) : (κ * V + 16) / 116
  );

  // Calculating Lab values and limiting the precision
  const [L, aHue, bHue] = [
    enforcePrecision(116 * FY - 16),
    enforcePrecision(500 * (FX - FY)),
    enforcePrecision(200 * (FY - FZ)),
  ].map((V) => (Math.sign(Math.round(V)) === 0 ? 0 : V));
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1
    ? `lab(${L}% ${aHue} ${bHue})`
    : `lab(${L}% ${aHue} ${bHue} / ${A})`;
}
// Functional RGB to Functional CIELAB:3 ends here

// [[file:../../README.org::*Functional RGB to Oklab (LCh)][Functional RGB to Oklab (LCh):1]]
function calcOklab(r, g, b) {
  const [R, G, B] = removeGamma([r, g, b]);

  // Convert to LMS cone activations and apply non-linearity
  const [L, M, S] = [
    R * 0.4122214708 + G * 0.5363325363 + B * 0.0514459929,
    R * 0.2119034982 + G * 0.6806995451 + B * 0.1073969566,
    R * 0.0883024619 + G * 0.2817188376 + B * 0.6299787005,
  ].map((V) => Math.cbrt(V));

  // Calculate Oklab values
  return [
    L * 0.2104542553 + M * 0.793617785 - S * 0.0040720468,
    L * 1.9779984951 - M * 2.428592205 + S * 0.4505937099,
    L * 0.0259040371 + M * 0.7827717662 - S * 0.808675766,
  ];
}

export function rgbToOklab(color) {
  const [r, g, b, alpha] = parseRGB(color);
  const [l, aHue, bHue] = calcOklab(r, g, b);

  const L = `${enforcePrecision(calcPercentFromFraction(l))}%`;
  const c = enforcePrecision(Math.sqrt(aHue ** 2 + bHue ** 2));
  const h = enforcePrecision(Math.atan2(bHue, aHue) * (180 / Math.PI));

  const C = Math.sign(Math.round(c)) === 0 ? 0 : c; // Ensure negative values lock at 0
  const H = Math.sign(h) === -1 ? correctHueCounterClockwise(h) : h;

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `oklab(${L} ${C} ${H})` : `oklab(${L} ${C} ${H} / ${A})`;
}
// Functional RGB to Oklab (LCh):1 ends here

// [[file:../../README.org::*Functional RGB from Functional HSL][Functional RGB from Functional HSL:1]]
import {
  calcChannelFromFraction,
  calcHueFromGrad,
  calcHueFromTurn,
  correctHueClockwise,
} from "./math.js";

// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
const calcChannels = (C, X, H) =>
  new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360],
  ]);

function parseHSL(color) {
  const [h, s, l, alpha] = valueExtractor(color);

  const [H] = [h].map((value) => {
    const n = parseFloat(value);
    const isNegative = (n) => Math.sign(n) === -1;
    let hue;

    // Set hue based on unit
    if (value.endsWith("grad")) {
      hue = isNegative(n) ? calcHueFromGrad(n + 400) : calcHueFromGrad(n);
    } else if (value.endsWith("rad")) {
      hue = isNegative(n) ? calcHueFromRad(n + 6.28319) : calcHueFromRad(n);
    } else if (value.endsWith("turn")) {
      hue = isNegative(n) ? calcHueFromTurn(n + 1) : calcHueFromTurn(n);
    } else {
      hue = n;
    }

    // hue correction
    let degrees;
    if (hue >= 360) {
      degrees = correctHueClockwise(hue);
    } else if (isNegative(hue)) {
      degrees = correctHueClockwise(correctHueCounterClockwise(hue));
    } else {
      degrees = hue;
    }

    return degrees;
  });

  const [S, L] = [s, l].map((value) => {
    const n = parseFloat(value);
    return calcFractionFromPercent(n);
  });

  const a = parseFloat(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

  return A === 1 ? [H, S, L] : [H, S, L, A];
}

function calcRGB(h, s, l) {
  // Calculate chroma
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  // Evaluate channels
  const [R, G, B] = Array.from(calcChannels(C, X, h))
    .filter(([, condition]) => condition)
    .flatMap(([evaluation]) => evaluation)
    .map((channel) => Math.round(calcChannelFromFraction(channel + m)));

  return [R, G, B];
}
// Functional RGB from Functional HSL:1 ends here

// [[file:../../README.org::*Functional RGB from Functional HSL][Functional RGB from Functional HSL:2]]
/** Functional RGB from Functional HSL */
export function rgbFromHSL(color) {
  const [h, s, l, alpha] = parseHSL(color);
  const [R, G, B] = calcRGB(h, s, l);

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB from Functional HSL:2 ends here

// [[file:../../README.org::*Functional RGB from Device CMYK][Functional RGB from Device CMYK:1]]
function parseCMYK(color) {
  const [c, m, y, k, alpha] = valueExtractor(color);
  const value = (s) => parseFloat(s);
  const [C, M, Y, K] = [c, m, y, k].map((component) =>
    component.endsWith("%")
      ? calcFractionFromPercent(value(component))
      : value(component)
  );

  const a = value(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

  return A === 1 ? [C, M, Y, K] : [C, M, Y, K, A];
}
// Functional RGB from Device CMYK:1 ends here

// [[file:../../README.org::*Functional RGB from Device CMYK][Functional RGB from Device CMYK:2]]
/** Functional RGB from Device CMYK */
export function rgbFromCMYK(color) {
  const [C, M, Y, K, alpha] = parseCMYK(color);

  const [R, G, B] = [C, M, Y].map((component) =>
    Math.round(calcChannelFromFraction((1 - component) * (1 - K)))
  );
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB from Device CMYK:2 ends here

// [[file:../../README.org::*Functional RGB from Functional HWB][Functional RGB from Functional HWB:1]]
function parseHWB(color) {
  const [h, w, blk, alpha] = valueExtractor(color);
  const [H] = parseHSL(`hsl(${h}, 50%, 50%)`); // free hue correction
  const [W, BLK] = [w, blk].map((component) =>
    calcFractionFromPercent(parseFloat(component))
  );

  const a = parseFloat(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

  return A === 1 ? [H, W, BLK] : [H, W, BLK, A];
}
// Functional RGB from Functional HWB:1 ends here

// [[file:../../README.org::*Functional RGB from Functional HWB][Functional RGB from Functional HWB:2]]
/** Functional RGB from Functional HWB */
export function rgbFromHWB(color) {
  const [h, w, blk, alpha] = parseHWB(color);
  const [r, g, b] = calcRGB(h, 1, 0.5);

  const A = (alpha && (alpha ?? 1)) || 1;

  // Achromatic
  if (w + blk >= 1) {
    const GRAY = Math.round(calcChannelFromFraction(w / (w + blk)));
    return A === 1
      ? `rgb(${GRAY}, ${GRAY}, ${GRAY})`
      : `rgba(${GRAY}, ${GRAY}, ${GRAY}, ${A})`;
  }

  const [R, G, B] = [r, g, b].map((channel) =>
    Math.round(
      calcChannelFromFraction(
        calcFractionFromChannel(channel) * (1 - w - blk) + w,
      ),
    )
  );

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB from Functional HWB:2 ends here

// [[file:../../README.org::*Functional RGB from Functional CIELAB][Functional RGB from Functional CIELAB:1]]
function calcXYZLab(l, a, b) {
  const [L, A, B] = [l, a, b].map((v) => parseFloat(v));

  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white

  // Compute the values of F
  const Fy = (L + 16) / 116;
  const Fx = A / 500 + Fy;
  const Fz = Fy - B / 200;

  // Calculate xyz
  const [x, y, z] = [
    Fx ** 3 > ε ? Fx ** 3 : (116 * Fx - 16) / κ,
    L > κ * ε ? Fy ** 3 : L / κ,
    Fz ** 3 > ε ? Fz ** 3 : (116 * Fz - 16) / κ,
  ];

  return [x, y, z].map((V, i) => V * white[i]);
}
// Functional RGB from Functional CIELAB:1 ends here

// [[file:../../README.org::*Functional RGB from Functional CIELAB][Functional RGB from Functional CIELAB:2]]
function calcLinearRGB(l, a, b) {
  const [x, y, z] = calcXYZLab(l, a, b);

  /**
   * D65 transformation matrix
   * =============================
   * 0.9555766 -0.0230393  0.0631636
   * -0.0282895  1.0099416  0.0210077
   * 0.0122982 -0.0204830  1.3299098
   * =============================
   */
  const [X, Y, Z] = [
    x * 0.9555766 + y * -0.0230393 + z * 0.0631636,
    x * -0.0282895 + y * 1.0099416 + z * 0.0210077,
    x * 0.0122982 + y * -0.020483 + z * 1.3299098,
  ];

  /**
   * linear sRGB transformation matrix (inverse)
   * =============================
   *  3.2404542 -1.5371385 -0.4985314
   * -0.9692660  1.8760108  0.0415560
   *  0.0556434 -0.2040259  1.0572252
   * =============================
   */
  return [
    X * 3.2404542 + Y * -1.5371385 + Z * -0.4985314,
    X * -0.969266 + Y * 1.8760108 + Z * 0.041556,
    X * 0.0556434 + Y * -0.2040259 + Z * 1.0572252,
  ];
}
// Functional RGB from Functional CIELAB:2 ends here

// [[file:../../README.org::*Functional RGB from Functional CIELAB][Functional RGB from Functional CIELAB:3]]
const applyGamma = (lrgb) =>
  lrgb.map((V) => V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055);

/** Functional CIELAB from Functional RGB */
export function rgbFromCielab(color) {
  const [l, aHue, bHue, alpha] = valueExtractor(color);
  const [r, g, b] = calcLinearRGB(l, aHue, bHue);

  const [R, G, B] = applyGamma([r, g, b]).map((channel) =>
    Math.round(normalize(0, calcChannelFromFraction(channel), 255))
  );
  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB from Functional CIELAB:3 ends here

// [[file:../../README.org::*Functional CIELAB to Functional CIELCh(ab)][Functional CIELAB to Functional CIELCh(ab):1]]
/** Functional CIELAB to Functional CIELCh(ab) */
export function cielabToCielch(color) {
  const [L, a, b, alpha] = valueExtractor(color);
  const [C, h] = [
    enforcePrecision(Math.sqrt(parseFloat(a) ** 2 + parseFloat(b) ** 2)),
    enforcePrecision(
      Math.atan2(parseFloat(b), parseFloat(a)) * (180 / Math.PI),
    ),
  ];

  const H = Math.sign(h) === -1 ? h + 360 : h;

  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `lch(${L} ${C} ${H})` : `lch(${L} ${C} ${H} / ${A})`;
}
// Functional CIELAB to Functional CIELCh(ab):1 ends here

// [[file:../../README.org::*Functional CIELAB from Functional CIELCh(ab)][Functional CIELAB from Functional CIELCh(ab):1]]
/** Functional CIELAB from Functional CIELCh(ab) */
export function cielabFromCielch(color) {
  const [L, c, h, alpha] = valueExtractor(color);
  const C = parseFloat(c);
  const [H] = parseHSL(`hsl(${h}, 50%, 50%)`);

  const [a, b] = [
    enforcePrecision(C * Math.cos(H * (Math.PI / 180))),
    enforcePrecision(C * Math.sin(H * (Math.PI / 180))),
  ];

  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `lab(${L} ${a} ${b})` : `lab(${L} ${a} ${b} / ${A})`;
}
// Functional CIELAB from Functional CIELCh(ab):1 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:1]]
export function parseOklab(color) {
  const [l, c, h, alpha] = valueExtractor(color);

  // Convert values back to their raw Oklab form
  const L = calcFractionFromPercent(parseFloat(l));
  const C = c;
  const [hue] = parseHSL(`hsl(${h}, 50%, 50%)`);
  const H = 2 * Math.PI * (hue / 360); // degrees to radians

  // Calculate a, b
  const [a, b] = [C * Math.cos(H), C * Math.sin(H)];

  return [L, a, b, alpha];
}
// Oklab (LCh) Conversion:1 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:2]]
function calcLinearRGBOklab(l, a, b) {
  // Calculate LMS cone activations
  const [L, M, S] = [
    l + a * 0.3963377774 + b * 0.2158037573,
    l - a * 0.1055613458 - b * 0.0638541728,
    l - a * 0.0894841775 - b * 1.291485548,
  ].map((V) => V ** 3);

  // Calculate linear RGB
  return [
    L * 4.076416621 - M * 3.3077115913 + S * 0.2309699292,
    L * -1.2684380046 + M * 2.6097574011 - S * 0.3413193965,
    L * -0.0041960863 - M * 0.7034186147 + S * 1.707614701,
  ];
}
// Oklab (LCh) Conversion:2 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:3]]
export function rgbFromOklab(color) {
  const [l, aHue, bHue, alpha] = parseOklab(color);
  const [r, g, b] = calcLinearRGBOklab(l, aHue, bHue);

  const [R, G, B] = [r, g, b]
    .map((V) => (V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055))
    .map((V) => Math.round(normalize(0, calcChannelFromFraction(V), 255)));

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Oklab (LCh) Conversion:3 ends here
