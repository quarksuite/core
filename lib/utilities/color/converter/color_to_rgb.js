// [[file:../../../../Mod.org::*Color to RGB][Color to RGB:1]]
import { curry, pipe } from "../../fp.js";
import { validator } from "../validator/index.js";
import { output, parser } from "../parser/index.js";
import { normalize, numberToRgb } from "./math.js";
// Color to RGB:1 ends here

// [[file:../../../../Mod.org::*Hex to RGB][Hex to RGB:1]]
export function hexToRgb(color) {
  const [, components] = parser(color);
  return pipe(output(["rgb", components]), validator);
}
// Hex to RGB:1 ends here

// [[file:../../../../Mod.org::*HSL to RGB][HSL to RGB:1]]
export function hslToRgb(color) {
  const [, [H, S, L, A]] = parser(color);

  // Calculate chroma
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - C / 2;

  const [R, G, B] = Array.from(calculateRGB(C, X, H))
    .filter(([, condition]) => condition)
    .flatMap(([evaluation]) => evaluation)
    .map((V) => pipe(V + m, numberToRgb, Math.round, curry(normalize)(255, 0)));

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

function calculateRGB(C, X, H) {
  return new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360],
  ]);
}
// HSL to RGB:1 ends here

// [[file:../../../../Mod.org::*CMYK to RGB][CMYK to RGB:1]]
export function cmykToRgb(color) {
  const [, [C, M, Y, K, A]] = parser(color);

  const [R, G, B] = [C, M, Y].map((V) =>
    pipe((1 - V) * (1 - K), numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}
// CMYK to RGB:1 ends here

// [[file:../../../../Mod.org::*HWB to RGB][HWB to RGB:1]]
export function hwbToRgb(color) {
  const [, [H, W, BLK, A]] = parser(color);

  // Achromacity
  if (W + BLK >= 1) {
    const GRAY = pipe(
      W / (W + BLK),
      numberToRgb,
      Math.round,
      curry(normalize)(255, 0),
    );

    return pipe(output(["rgb", [Array(3).fill(GRAY), A]]), validator);
  }

  const [R, G, B] = pipe(
    `hsl(${H}, 100%, 50%)`,
    hslToRgb,
    ([, color]) => parser(color),
    ([, color]) => color,
  ).map((V) =>
    pipe(
      V * (1 - W - BLK) + W,
      numberToRgb,
      Math.round,
      curry(normalize)(255, 0),
    )
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}
// HWB to RGB:1 ends here

// [[file:../../../../Mod.org::*CIELAB to RGB][CIELAB to RGB:1]]
export function cielabToRgb(color) {
  const [, [L, a, b, A]] = parser(color);
  const [X, Y, Z] = cielabToCiexyz([L, a, b]);
  const [LR, LG, LB] = ciexyzToLrgb([X, Y, Z]);
  const [R, G, B] = lrgbToRgb([LR, LG, LB]).map((V) =>
    pipe(V, numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

function cielabToCiexyz([L, a, b]) {
  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const WHITE = [0.96422, 1.0, 0.82521]; // D50 reference white

  // Compute the values of F
  const FY = (L + 16) / 116;
  const FX = a / 500 + FY;
  const FZ = FY - b / 200;

  // Calculate xyz
  const [X, Y, Z] = [
    FX ** 3 > ε ? FX ** 3 : (116 * FX - 16) / κ,
    L > κ * ε ? FY ** 3 : L / κ,
    FZ ** 3 > ε ? FZ ** 3 : (116 * FZ - 16) / κ,
  ].map((V, i) => V * WHITE[i]);

  return [X, Y, Z];
}

const D65_CHROMATIC_ADAPTATION = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098],
];

const LINEAR_RGB_TRANSFORMATION_MATRIX = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252],
];

function ciexyzToLrgb([X, Y, Z]) {
  const [CX, CY, CZ] = D65_CHROMATIC_ADAPTATION.map(
    ([V1, V2, V3]) => X * V1 + Y * V2 + Z * V3,
  );

  const [LR, LG, LB] = LINEAR_RGB_TRANSFORMATION_MATRIX.map(
    ([V1, V2, V3]) => CX * V1 + CY * V2 + CZ * V3,
  );

  return [LR, LG, LB];
}

function lrgbToRgb([LR, LG, LB]) {
  return [LR, LG, LB].map((V) =>
    V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055
  );
}
// CIELAB to RGB:1 ends here

// [[file:../../../../Mod.org::*Oklab to RGB][Oklab to RGB:1]]
export function oklabToRgb(color) {
  const [, [L, a, b, A]] = parser(color);
  const [LR, LG, LB] = oklabToLrgb([L, a, b]);

  const [R, G, B] = lrgbToRgb([LR, LG, LB]).map((V) =>
    pipe(V, numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

const LINEAR_LMS_CONE_ACTIVATIONS = [
  [0.3963377774, 0.2158037573],
  [0.1055613458, 0.0638541728],
  [0.0894841775, 1.291485548],
];

const LINEAR_RGB_OKLAB_MATRIX = [
  [4.076416621, 3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, 0.3413193965],
  [-0.0041960863, 0.7034186147, 1.707614701],
];

function oklabToLrgb([L, a, b]) {
  const [LONG, M, S] = LINEAR_LMS_CONE_ACTIVATIONS.map(([V1, V2], pos) => {
    if (pos === 0) return L + a * V1 + b * V2;
    if (pos === 1) return L - a * V1 - b * V2;
    return L - a * V1 - b * V2;
  }).map((V) => V ** 3);

  const [LR, LG, LB] = LINEAR_RGB_OKLAB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return LONG * V1 - M * V2 + S * V3;
    if (pos === 1) return LONG * V1 + M * V2 - S * V3;
    return LONG * V1 - M * V2 + S * V3;
  });

  return [LR, LG, LB];
}
// Oklab to RGB:1 ends here
