// [[file:../../../../README.org::*RGB Conversion Setup][RGB Conversion Setup:1]]
import {
  calcChannelFromPercent,
  calcFractionFromChannel,
  calcFractionFromPercent,
  calcHexFragmentFromAlpha,
  calcPercentFromFraction,
  channelToHexFragment,
  correctHueCounterClockwise,
  significant,
} from "./setup.js";

const precision = significant.bind(null, 5);

/** A helper function to prep RGB values for calculations */
function parseRGB(rgb) {
  const [r, g, b, alpha] = rgb;
  const value = (s) => parseFloat(s);

  const [R, G, B] = [r, g, b].map((channel) =>
    channel.endsWith("%")
      ? precision(calcChannelFromPercent(value(channel)))
      : precision(value(channel))
  );

  const a = value(alpha);
  const A = a != null ? (a > 1 ? precision(calcFractionFromPercent(a)) : a) : 1;

  return A === 1 ? [R, G, B] : [R, G, B, A];
}
// RGB Conversion Setup:1 ends here

// [[file:../../../../README.org::*RGB Hex <- Functional RGB (=rgb.hex=)][RGB Hex <- Functional RGB (=rgb.hex=):1]]
/** RGB Hex <- Functional RGB */
export function hex(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);

  const [R, G, B] = [r, g, b].map((channel) => channelToHexFragment(channel));
  // Alpha is defined and not null
  const A = (alpha && calcHexFragmentFromAlpha(alpha ?? 1)) || "ff";

  return A === "ff" ? `#${R}${G}${B}` : `#${R}${G}${B}${A}`;
}
// RGB Hex <- Functional RGB (=rgb.hex=):1 ends here

// [[file:../../../../README.org::*Functional RGB -> Functional HSL (=rgb.hsl=)][Functional RGB -> Functional HSL (=rgb.hsl=):1]]
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
// Functional RGB -> Functional HSL (=rgb.hsl=):1 ends here

// [[file:../../../../README.org::*Functional RGB -> Functional HSL (=rgb.hsl=)][Functional RGB -> Functional HSL (=rgb.hsl=):2]]
/** Functional RGB -> Functional HSL */
export function hsl(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);
  const [h, s, l] = calcHSL(r, g, b);

  const [H, S, L] = [
    h,
    precision(calcPercentFromFraction(s)),
    precision(calcPercentFromFraction(l)),
  ];
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `hsl(${H}, ${S}%, ${L}%)` : `hsla(${H}, ${S}%, ${L}%, ${A})`;
}
// Functional RGB -> Functional HSL (=rgb.hsl=):2 ends here

// [[file:../../../../README.org::*Functional RGB -> Device CMYK (=rgb.cmyk=)][Functional RGB -> Device CMYK (=rgb.cmyk=):1]]
/** Functional RGB -> Device CMYK */
export function cmyk(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);
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
    isNaN(component) ? 0 : calcPercentFromFraction(component)
  );

  return A === 1
    ? `device-cmyk(${C}% ${M}% ${Y}% ${K}%)`
    : `device-cmyk(${C}% ${M}% ${Y}% ${K}% / ${A})`;
}
// Functional RGB -> Device CMYK (=rgb.cmyk=):1 ends here

// [[file:../../../../README.org::*Functional RGB -> Functional HWB (=rgb.hwb=)][Functional RGB -> Functional HWB (=rgb.hwb=):1]]
/** Functional RGB -> Functional HWB */
export function hwb(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);
  const [R, G, B] = [r, g, b].map((channel) =>
    calcFractionFromChannel(channel)
  );

  const [H] = calcHSL(r, g, b);
  const [W, BLK] = [
    precision(calcPercentFromFraction(Math.min(R, G, B))),
    precision(calcPercentFromFraction(1 - Math.max(R, G, B))),
  ];
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `hwb(${H} ${W}% ${BLK}%)` : `hwb(${H} ${W}% ${BLK}% / ${A})`;
}
// Functional RGB -> Functional HWB (=rgb.hwb=):1 ends here

// [[file:../../../../README.org::*Functional RGB >-< Linear RGB][Functional RGB >-< Linear RGB:1]]
/** Functional RGB >-< Linear RGB */
const removeGamma = (rgb) =>
  rgb.map((v) => {
    const V = calcFractionFromChannel(v);
    return V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4;
  });
// Functional RGB >-< Linear RGB:1 ends here

// [[file:../../../../README.org::*Linear RGB -> CIE XYZ][Linear RGB -> CIE XYZ:1]]
/** Linear RGB -> CIE XYZ */
function calcXYZ(rgb) {
  const [R, G, B] = removeGamma(rgb);
  return [
    R * 0.4124564 + G * 0.3575761 + B * 0.1804375,
    R * 0.2126729 + G * 0.7151522 + B * 0.072175,
    R * 0.0193339 + G * 0.119192 + B * 0.9503041,
  ]; // [X, Y, Z]
}
// Linear RGB -> CIE XYZ:1 ends here

// [[file:../../../../README.org::*CIE XYZ -> Functional CIE Lab][CIE XYZ -> Functional CIE Lab:1]]
function calcD50XYZ(rgb) {
  const [X, Y, Z] = calcXYZ(rgb);
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

/** Functional RGB -> Functional CIE Lab */
export function lab(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);
  const [x, y, z] = calcD50XYZ([r, g, b]);

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
    116 * FY - 16,
    500 * (FX - FY),
    200 * (FY - FZ),
  ].map((V) => (Math.sign(Math.round(V)) === 0 ? 0 : +V.toPrecision(6)));
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1
    ? `lab(${L}% ${aHue} ${bHue})`
    : `lab(${L}% ${aHue} ${bHue} / ${A})`;
}
// CIE XYZ -> Functional CIE Lab:1 ends here
