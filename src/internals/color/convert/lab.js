// [[file:../../../../README.org::*CIE Lab Conversion Setup][CIE Lab Conversion Setup:1]]
import {
  calcChannelFromFraction,
  calcFractionFromPercent,
  calcHueFromRad,
  correctHueCounterClockwise,
  normalize,
} from "./setup.js";
// CIE Lab Conversion Setup:1 ends here

// [[file:../../../../README.org::*CIE XYZ <- Functonal CIE Lab][CIE XYZ <- Functonal CIE Lab:1]]
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
// CIE XYZ <- Functonal CIE Lab:1 ends here

// [[file:../../../../README.org::*Linear RGB <- CIE XYZ][Linear RGB <- CIE XYZ:1]]
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
// Linear RGB <- CIE XYZ:1 ends here

// [[file:../../../../README.org::*Linear RGB >-< Functional RGB][Linear RGB >-< Functional RGB:1]]
const calcRGB = (lrgb) =>
  lrgb.map((V) => V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055);

/** Functional CIE Lab <- Functional RGB */
export function rgb(lab) {
  const [l, a, b, alpha] = lab;

  const [R, G, B] = calcRGB(calcLinearRGB([l, a, b])).map((channel) =>
    normalize(0, Math.round(calcChannelFromFraction(channel)), 255)
  );
  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Linear RGB >-< Functional RGB:1 ends here

// [[file:../../../../README.org::*Functional CIE Lab -> Functional CIE LCH][Functional CIE Lab -> Functional CIE LCH:1]]
/** Functional CIE Lab -> Functional CIE LCH */
export function lch(lab) {
  const [L, a, b, alpha] = lab;
  const [C, H] = [Math.sqrt(a ** 2 + b ** 2), Math.atan2(b, a)]
    .map((V) => (Math.sign(Math.round(V)) === 0 ? 0 : +V.toPrecision(4)))
    .map((V, i) => (i === 1 ? calcHueFromRad(V) : V))
    .map((V, i) =>
      i === 1 && Math.sign(V) === -1 ? correctHueCounterClockwise(V) : V
    )
    .map((V, i) => (i === 0 ? normalize(0, V, 230) : V));

  const A = (alpha &&
    (alpha.endsWith("%")
      ? calcFractionFromPercent(parseFloat(alpha))
      : alpha)) ||
    1;

  return A === 1 ? `lch(${L}% ${C} ${H})` : `lch(${L}% ${C} ${H})`;
}
// Functional CIE Lab -> Functional CIE LCH:1 ends here
