// [[file:../../../../Mod.org::*Color from RGB][Color from RGB:1]]
import { curry, pipe } from "../../fp.js";
import { validator } from "../validator/index.js";
import { output, parser } from "../parser/index.js";
import {
  hexFragmentFromRgb,
  hueCorrection,
  normalize,
  numberToPercent,
  numberToRgb,
  precision,
  radToDegrees,
} from "./math.js";
// Color from RGB:1 ends here

// [[file:../../../../Mod.org::*Hex from RGB][Hex from RGB:1]]
export function hexFromRgb(color) {
  const [, components] = parser(color);
  return pipe(
    output([
      "hex",
      components.map((V) =>
        pipe(
          V,
          numberToRgb,
          Math.round,
          curry(normalize)(255, 0),
          hexFragmentFromRgb,
        )
      ),
    ]),
    validator,
  );
}
// Hex from RGB:1 ends here

// [[file:../../../../Mod.org::*HSL from RGB][HSL from RGB:1]]
export function hslFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const MIN = Math.min(R, G, B);
  const MAX = Math.max(R, G, B);
  const DELTA = MAX - MIN;

  const L = calculateLightness(MIN, MAX);
  const [[H], S] = [
    Array.from(calculateHue(R, G, B, MAX, DELTA))
      .filter(([, condition]) => condition)
      .flatMap(([result]) => result),
    calculateSaturation(DELTA, L),
  ];

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "hsl",
      [
        hueCorrection(H),
        ...[S, L].map((V) =>
          pipe(V, numberToPercent, limitPercent, (value) => value.toString())
            .concat("%")
        ),
        A,
      ],
    ]),
    validator,
  );
}

function calculateLightness(cmin, cmax) {
  return (cmax + cmin) / 2;
}

function calculateHue(R, G, B, cmax, delta) {
  return new Map([
    [0, delta === 0],
    [60 * (((G - B) / delta) % 6), cmax === R],
    [60 * ((B - R) / delta + 2), cmax === G],
    [60 * ((R - G) / delta + 4), cmax === B],
  ]);
}

function calculateSaturation(delta, L) {
  return delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));
}
// HSL from RGB:1 ends here

// [[file:../../../../Mod.org::*CMYK from RGB][CMYK from RGB:1]]
export function cmykFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const K = 1 - Math.max(R, G, B);
  const [C, M, Y] = [R, G, B].map((V) => (1 - V - K) / (1 - K));

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "cmyk",
      [
        ...[C, M, Y, K]
          .map((V) => (isNaN(V) ? 0 : pipe(V, numberToPercent, limitPercent)))
          .map((V) => V.toString().concat("%")),
        A,
      ],
    ]),
    validator,
  );
}
// CMYK from RGB:1 ends here

// [[file:../../../../Mod.org::*HWB from RGB][HWB from RGB:1]]
export function hwbFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const MAX = Math.max(R, G, B);
  const MIN = Math.min(R, G, B);
  const DELTA = MAX - MIN;

  const [H] = Array.from(calculateHue(R, G, B, MAX, DELTA))
    .filter(([, condition]) => condition)
    .flatMap(([result]) => result);

  const [W, BLK] = [MIN, 1 - MAX];

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "hwb",
      [
        hueCorrection(H),
        ...[W, BLK].map((V) =>
          pipe(V, numberToPercent, limitPercent).toString().concat("%")
        ),
        A,
      ],
    ]),
    validator,
  );
}
// HWB from RGB:1 ends here

// [[file:../../../../Mod.org::*CIELAB from RGB][CIELAB from RGB:1]]
export function cielabFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);
  const [X, Y, Z] = rgbToCieXYZ([R, G, B]);
  const [L, a, b] = ciexyzToCielab([X, Y, Z]);

  return pipe(
    output(["cielab", [L.toString().concat("%"), a, b, A]]),
    validator,
  );
}

function ciexyzToCielab([X, Y, Z]) {
  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const D50_WHITE = [0.96422, 1.0, 0.82521];

  // Calculating F for each value
  const [FX, FY, FZ] = [X, Y, Z]
    .map((V, i) => V / D50_WHITE[i])
    .map((V) => (V > ε ? Math.cbrt(V) : (κ * V + 16) / 116));

  const [L, a, b] = [116 * FY - 16, 500 * (FX - FY), 200 * (FY - FZ)]
    .map((V) => precision(V))
    .map((V, pos) =>
      pos === 0 ? normalize(256, 0, V) : +normalize(128, -127, V).toFixed(4)
    );

  return [L, a, b];
}

const D65_REFERENCE_WHITE = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041],
];

const D50_CHROMATIC_ADAPTATION = [
  [1.0478112, 0.0228866, -0.050127],
  [0.0295424, 0.9904844, -0.0170491],
  [-0.0092345, 0.0150436, 0.7521316],
];

function rgbToCieXYZ([R, G, B]) {
  const [LR, LG, LB] = rgbToLinearRGB([R, G, B]);

  const [x, y, z] = D65_REFERENCE_WHITE.map(
    ([V1, V2, V3]) => LR * V1 + LG * V2 + LB * V3,
  );

  const [X, Y, Z] = D50_CHROMATIC_ADAPTATION.map(
    ([V1, V2, V3]) => x * V1 + y * V2 + z * V3,
  );

  return [X, Y, Z];
}

function rgbToLinearRGB([R, G, B]) {
  return [R, G, B].map((V) =>
    V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4
  );
}
// CIELAB from RGB:1 ends here

// [[file:../../../../Mod.org::*Oklab from RGB][Oklab from RGB:1]]
export function oklabFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);
  const [l, a, b] = linearRGBToOklab([R, G, B]);

  const L = numberToPercent(l).toString().concat("%");
  const c = normalize(0.5, 0, +Math.sqrt(a ** 2 + b ** 2).toFixed(4)); // toPrecision isn't strict enough
  const C = Math.sign(Math.round(c)) === -1 ? 0 : c;
  const H = pipe(Math.atan2(b, a), radToDegrees, hueCorrection);

  return pipe(output(["oklab", [L, C, H, A]]), validator);
}

const NONLINEAR_LMS_CONE_ACTIVATIONS = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
];

const RGB_OKLAB_MATRIX = [
  [0.2104542553, 0.793617785, 0.0040720468],
  [1.9779984951, 2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, 0.808675766],
];

function linearRGBToOklab([R, G, B]) {
  const [LR, LG, LB] = rgbToLinearRGB([R, G, B]);

  const [L, M, S] = NONLINEAR_LMS_CONE_ACTIVATIONS.map(
    ([L, M, S]) => L * LR + M * LG + S * LB,
  ).map((V) => Math.cbrt(V));

  return RGB_OKLAB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return V1 * L + V2 * M - V3 * S;
    if (pos === 1) return V1 * L - V2 * M + V3 * S;
    return V1 * L + V2 * M - V3 * S;
  });
}
// Oklab from RGB:1 ends here
