// [[file:../../../../README.org::*Functional RGB <- Device CMYK (=cmyk.rgb=)][Functional RGB <- Device CMYK (=cmyk.rgb=):1]]
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

// [[file:../../../../README.org::*Functional RGB <- Device CMYK (=cmyk.rgb=)][Functional RGB <- Device CMYK (=cmyk.rgb=):2]]
export function rgb(cmyk) {
  const [C, M, Y, K, alpha] = parseCMYK(cmyk);

  const [R, G, B] = [C, M, Y].map((component) =>
    Math.round(calcChannelFromFraction(1 - component * (1 - K)))
  );
  const A = (alpha && (alpha ?? 1)) || 1;

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB <- Device CMYK (=cmyk.rgb=):2 ends here
