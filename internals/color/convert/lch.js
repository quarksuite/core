// [[file:../../../README.org::*Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=)][Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):1]]
import { calcFractionFromPercent, normalize, significant } from "./setup.js";
import { parseHSL } from "./hsl.js";

const precision = significant.bind(null, 5);
// Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):1 ends here

// [[file:../../../README.org::*Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=)][Functional CIELAB <- Functional CIELCh(ab) (=lch.lab=):2]]
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
