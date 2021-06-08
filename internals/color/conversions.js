// [[file:../../README.org::*RGB Hex -> Functional RGB (=hex.rgb=)][RGB Hex -> Functional RGB (=hex.rgb=):1]]
import {
  calcFractionFromChannel,
  hexFragmentToChannel,
  significant,
} from "./setup.js";

/** RGB Hex -> Functional RGB */
export function rgb(hex) {
  const [r, g, b, alpha] = hex;
  const [R, G, B] = [r, g, b].map((fragment) => hexFragmentToChannel(fragment));
  const A = significant(
    4,
    calcFractionFromChannel(hexFragmentToChannel(alpha ?? "ff")),
  );

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// RGB Hex -> Functional RGB (=hex.rgb=):1 ends here

// [[file:../../README.org::*RGB Hex <- W3C-X11][RGB Hex <- W3C-X11:1]]
import { X11Colors } from "../../../data/color/w3c-x11.js";

/** RGB HEX <- W3C-X11 */
export const hex = (keyword) => X11Colors[keyword];
// RGB Hex <- W3C-X11:1 ends here

// [[file:../../README.org::*RGB Conversion Setup][RGB Conversion Setup:1]]
import {
  calcChannelFromPercent,
  calcFractionFromChannel,
  calcFractionFromPercent,
  calcHexFragmentFromAlpha,
  calcHueFromRad,
  calcPercentFromFraction,
  channelToHexFragment,
  correctHueCounterClockwise,
  normalize,
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

// [[file:../../README.org::*RGB Hex <- Functional RGB (=rgb.hex=)][RGB Hex <- Functional RGB (=rgb.hex=):1]]
/** RGB Hex <- Functional RGB */
export function hex(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);

  const [R, G, B] = [r, g, b].map((channel) => channelToHexFragment(channel));
  // Alpha is defined and not null
  const A = (alpha && calcHexFragmentFromAlpha(alpha ?? 1)) || "ff";

  return A === "ff" ? `#${R}${G}${B}` : `#${R}${G}${B}${A}`;
}
// RGB Hex <- Functional RGB (=rgb.hex=):1 ends here

// [[file:../../README.org::*Functional RGB -> Functional HSL (=rgb.hsl=)][Functional RGB -> Functional HSL (=rgb.hsl=):1]]
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

// [[file:../../README.org::*Functional RGB -> Functional HSL (=rgb.hsl=)][Functional RGB -> Functional HSL (=rgb.hsl=):2]]
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

// [[file:../../README.org::*Functional RGB -> Device CMYK (=rgb.cmyk=)][Functional RGB -> Device CMYK (=rgb.cmyk=):1]]
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
    isNaN(component) ? 0 : precision(calcPercentFromFraction(component))
  );

  return A === 1
    ? `device-cmyk(${C}% ${M}% ${Y}% ${K}%)`
    : `device-cmyk(${C}% ${M}% ${Y}% ${K}% / ${A})`;
}
// Functional RGB -> Device CMYK (=rgb.cmyk=):1 ends here

// [[file:../../README.org::*Functional RGB -> Functional HWB (=rgb.hwb=)][Functional RGB -> Functional HWB (=rgb.hwb=):1]]
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

// [[file:../../README.org::*Functional RGB >-< Linear RGB][Functional RGB >-< Linear RGB:1]]
/** Functional RGB >-< Linear RGB */
const removeGamma = (rgb) =>
  rgb.map((v) => {
    const V = calcFractionFromChannel(v);
    return V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4;
  });
// Functional RGB >-< Linear RGB:1 ends here

// [[file:../../README.org::*Linear RGB -> CIEXYZ][Linear RGB -> CIEXYZ:1]]
/** Linear RGB -> CIE XYZ */
function calcXYZ(rgb) {
  const [R, G, B] = removeGamma(rgb);
  return [
    R * 0.4124564 + G * 0.3575761 + B * 0.1804375,
    R * 0.2126729 + G * 0.7151522 + B * 0.072175,
    R * 0.0193339 + G * 0.119192 + B * 0.9503041,
  ]; // [X, Y, Z]
}
// Linear RGB -> CIEXYZ:1 ends here

// [[file:../../README.org::*CIEXYZ -> Functional CIELAB][CIEXYZ -> Functional CIELAB:1]]
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

/** Functional RGB -> Functional CIELAB */
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
    precision(116 * FY - 16),
    precision(500 * (FX - FY)),
    precision(200 * (FY - FZ)),
  ].map((V) => (Math.sign(Math.round(V)) === 0 ? 0 : V));
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1
    ? `lab(${L}% ${aHue} ${bHue})`
    : `lab(${L}% ${aHue} ${bHue} / ${A})`;
}
// CIEXYZ -> Functional CIELAB:1 ends here

// [[file:../../README.org::*Functional RGB -> Oklab (LCh) (=rgb.oklab=)][Functional RGB -> Oklab (LCh) (=rgb.oklab=):1]]
function calcOklab(rgb) {
  const [r, g, b, alpha] = parseRGB(rgb);
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
    (alpha && (alpha ?? 1)) || 1, // slot in alpha
  ];
}

export function oklab(rgb) {
  const [l, a, b, alpha] = calcOklab(rgb);
  const truncate = significant.bind(null, 3);

  const L = `${precision(calcPercentFromFraction(l))}%`;
  const c = precision(Math.sqrt(a ** 2 + b ** 2));
  const h = precision(Math.atan2(b, a) * (180 / Math.PI));

  const C = +c.toFixed(5); // Ensure negative exponent is rendered as 0
  const H = Math.sign(h) === -1 ? correctHueCounterClockwise(h) : h;

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `oklab(${L} ${C} ${H})` : `oklab(${L} ${C} ${H} / ${A})`;
}
// Functional RGB -> Oklab (LCh) (=rgb.oklab=):1 ends here

// [[file:../../README.org::*Functional RGB <- Functional HSL (=hsl.rgb=)][Functional RGB <- Functional HSL (=hsl.rgb=):1]]
import {
  calcChannelFromFraction,
  calcFractionFromPercent,
  calcHueFromGrad,
  calcHueFromRad,
  calcHueFromTurn,
  correctHueClockwise,
  correctHueCounterClockwise,
} from "./setup.js";

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

export const parseHSL = (hsl) => {
  const [h, s, l, alpha] = hsl;

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
};

export const calcRGB = (h, s, l) => {
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
};
// Functional RGB <- Functional HSL (=hsl.rgb=):1 ends here

// [[file:../../README.org::*Functional RGB <- Functional HSL (=hsl.rgb=)][Functional RGB <- Functional HSL (=hsl.rgb=):2]]
/** Functional RGB <- Functional HSL */
export function rgb(hsl) {
  const [h, s, l, alpha] = parseHSL(hsl);
  const [R, G, B] = calcRGB(h, s, l);

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB <- Functional HSL (=hsl.rgb=):2 ends here

// [[file:../../README.org::*Functional RGB <- Device CMYK (=cmyk.rgb=)][Functional RGB <- Device CMYK (=cmyk.rgb=):1]]
import { calcChannelFromFraction, calcFractionFromPercent } from "./setup.js";

function parseCMYK(cmyk) {
  const [c, m, y, k, alpha] = cmyk;
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
// Functional RGB <- Device CMYK (=cmyk.rgb=):1 ends here

// [[file:../../README.org::*Functional RGB <- Device CMYK (=cmyk.rgb=)][Functional RGB <- Device CMYK (=cmyk.rgb=):2]]
/** Functional RGB <- Device CMYK */
export function rgb(cmyk) {
  const [C, M, Y, K, alpha] = parseCMYK(cmyk);

  const [R, G, B] = [C, M, Y].map((component) =>
    Math.round(calcChannelFromFraction((1 - component) * (1 - K)))
  );
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB <- Device CMYK (=cmyk.rgb=):2 ends here

// [[file:../../README.org::*Functional RGB <- Functional HWB (=hwb.rgb=)][Functional RGB <- Functional HWB (=hwb.rgb=):1]]
import {
  calcChannelFromFraction,
  calcFractionFromChannel,
  calcFractionFromPercent,
} from "./setup.js";
import { calcRGB, parseHSL } from "./hsl.js";

function parseHWB(hwb) {
  const [h, w, blk, alpha] = hwb;
  const [H] = parseHSL([h, "100%", "50%", "1"]);
  const [W, BLK] = [w, blk].map((component) =>
    calcFractionFromPercent(parseFloat(component))
  );

  const a = parseFloat(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

  return A === 1 ? [H, W, BLK] : [H, W, BLK, A];
}
// Functional RGB <- Functional HWB (=hwb.rgb=):1 ends here

// [[file:../../README.org::*Functional RGB <- Functional HWB (=hwb.rgb=)][Functional RGB <- Functional HWB (=hwb.rgb=):2]]
/** Functional RGB <- Functional HWB */
export function rgb(hwb) {
  const [h, w, blk, alpha] = parseHWB(hwb);
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
// Functional RGB <- Functional HWB (=hwb.rgb=):2 ends here

// [[file:../../README.org::*CIELAB Conversion Setup][CIELAB Conversion Setup:1]]
import {
  calcChannelFromFraction,
  calcFractionFromPercent,
  calcHueFromRad,
  correctHueCounterClockwise,
  normalize,
  significant,
} from "./setup.js";
// CIELAB Conversion Setup:1 ends here

// [[file:../../README.org::*CIE XYZ <- Functonal CIELAB][CIE XYZ <- Functonal CIELAB:1]]
function calcXYZ(lab) {
  const [L, a, b] = lab.map((v) => parseFloat(v));

  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const white = [0.96422, 1.0, 0.82521]; // D50 reference white

  // Compute the values of F
  const Fy = (L + 16) / 116;
  const Fx = a / 500 + Fy;
  const Fz = Fy - b / 200;

  // Calculate xyz
  const [x, y, z] = [
    Fx ** 3 > ε ? Fx ** 3 : (116 * Fx - 16) / κ,
    L > κ * ε ? Fy ** 3 : L / κ,
    Fz ** 3 > ε ? Fz ** 3 : (116 * Fz - 16) / κ,
  ];

  return [x, y, z].map((V, i) => V * white[i]);
}
// CIE XYZ <- Functonal CIELAB:1 ends here

// [[file:../../README.org::*CIE XYZ -> Linear RGB][CIE XYZ -> Linear RGB:1]]
function calcLinearRGB(lab) {
  const [x, y, z] = calcXYZ(lab);
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
// CIE XYZ -> Linear RGB:1 ends here

// [[file:../../README.org::*Linear RGB >-< Functional RGB][Linear RGB >-< Functional RGB:1]]
const calcRGB = (lrgb) =>
  lrgb.map((V) => V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055);

/** Functional CIELAB <- Functional RGB */
export function rgb(lab) {
  const [l, a, b, alpha] = lab;

  const [R, G, B] = calcRGB(calcLinearRGB([l, a, b])).map((channel) =>
    normalize(0, calcChannelFromFraction(channel), 255)
  );
  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Linear RGB >-< Functional RGB:1 ends here

// [[file:../../README.org::*Functional CIELAB -> Functional CIELCh(ab) (=lab.lch=)][Functional CIELAB -> Functional CIELCh(ab) (=lab.lch=):1]]
const precision = significant.bind(null, 5);

/** Functional CIELAB -> Functional CIELCh(ab) */
export function lch(lab) {
  const [L, a, b, alpha] = lab;
  const [C, h] = [
    precision(Math.sqrt(parseFloat(a) ** 2 + parseFloat(b) ** 2)),
    precision(Math.atan2(parseFloat(b), parseFloat(a)) * (180 / Math.PI)),
  ];

  const H = Math.sign(h) === -1 ? h + 360 : h;

  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `lch(${L} ${C} ${H})` : `lch(${L} ${C} ${H} / ${A})`;
}
// Functional CIELAB -> Functional CIELCh(ab) (=lab.lch=):1 ends here

// [[file:../../README.org::*Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=)][Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):1]]
import { calcFractionFromPercent, normalize, significant } from "./setup.js";
import { parseHSL } from "./hsl.js";

const precision = significant.bind(null, 5);
// Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):1 ends here

// [[file:../../README.org::*Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=)][Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):2]]
/** Functional CIELAB <- Functional CIELCh(ab) */
export function lab(lch) {
  const [L, c, h, alpha] = lch;
  const C = parseFloat(c);
  const [H] = parseHSL([h, "100%", "50%", "1"]);

  const [a, b] = [
    precision(C * Math.cos(H * (Math.PI / 180))),
    precision(C * Math.sin(H * (Math.PI / 180))),
  ];

  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `lab(${L} ${a} ${b})` : `lab(${L} ${a} ${b} / ${A})`;
}
// Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):2 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:1]]
import {
  calcChannelFromFraction,
  calcFractionFromChannel,
  calcFractionFromPercent,
  normalize,
} from "./setup.js";

export function parseOklab(oklab) {
  const [l, c, h, alpha] = oklab;

  // Convert values back to their raw Oklab form
  const L = calcFractionFromPercent(parseFloat(l));
  const C = c;
  const H = 2 * Math.PI * (h / 360);

  // Calculate a, b
  const [a, b] = [C * Math.cos(H), C * Math.sin(H)];

  return [L, a, b, alpha];
}
// Oklab (LCh) Conversion:1 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:2]]
function calcLinearRGB(oklab) {
  const [l, a, b, alpha] = parseOklab(oklab);

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
    alpha, // slot in alpha
  ];
}
// Oklab (LCh) Conversion:2 ends here

// [[file:../../README.org::*Oklab (LCh) Conversion][Oklab (LCh) Conversion:3]]
export function rgb(oklab) {
  const [r, g, b, alpha] = calcLinearRGB(oklab);

  const [R, G, B] = [r, g, b]
    .map((V) => (V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055))
    .map((V) => normalize(0, calcChannelFromFraction(V), 255));

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Oklab (LCh) Conversion:3 ends here
