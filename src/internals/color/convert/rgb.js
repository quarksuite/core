// [[file:../../../../README.org::*RGB Conversion Setup][RGB Conversion Setup:1]]
import {
  calcChannelFromPercent,
  calcFractionFromChannel,
  calcFractionFromPercent,
  calcHexFragmentFromAlpha,
  calcPercentFromFraction,
  channelToHexFragment,
  correctHueCounterClockwise,
} from "./setup.js";

/** A helper function to prep RGB values for calculations */
function parseRGB(rgb) {
  const [r, g, b, alpha] = rgb;
  const value = (s) => parseFloat(s);
  const [R, G, B] = [r, g, b].map((channel) =>
    channel.endsWith("%")
      ? calcChannelFromPercent(value(channel))
      : value(channel)
  );

  const a = value(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

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

  const [H, S, L] = [h, calcPercentFromFraction(s), calcPercentFromFraction(l)];
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `hsl(${H}, ${S}%, ${L}%)` : `hsla(${H}, ${S}%, ${L}%, ${A})`;
}
// Functional RGB -> Functional HSL (=rgb.hsl=):2 ends here
