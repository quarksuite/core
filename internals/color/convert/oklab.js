// [[file:../../../README.org::*Oklab (LCh) Conversion (=internals/color/convert/oklab.js=)][Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):1]]
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
// Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):1 ends here

// [[file:../../../README.org::*Oklab (LCh) Conversion (=internals/color/convert/oklab.js=)][Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):2]]
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
// Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):2 ends here

// [[file:../../../README.org::*Oklab (LCh) Conversion (=internals/color/convert/oklab.js=)][Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):3]]
export function rgb(oklab) {
  const [r, g, b, alpha] = calcLinearRGB(oklab);

  const [R, G, B] = [r, g, b]
    .map((V) => (V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055))
    .map((V) => normalize(0, calcChannelFromFraction(V), 255));

  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Oklab (LCh) Conversion (=internals/color/convert/oklab.js=):3 ends here
