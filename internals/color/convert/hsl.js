// [[file:../../../README.org::*Functional RGB <- Functional HSL (=hsl.rgb=)][Functional RGB <- Functional HSL (=hsl.rgb=):1]]
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

// [[file:../../../README.org::*Functional RGB <- Functional HSL (=hsl.rgb=)][Functional RGB <- Functional HSL (=hsl.rgb=):2]]
/** Functional RGB <- Functional HSL */
export function rgb(hsl) {
  const [h, s, l, alpha] = parseHSL(hsl);
  const [R, G, B] = calcRGB(h, s, l);

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB <- Functional HSL (=hsl.rgb=):2 ends here
