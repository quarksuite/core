// [[file:../../../README.org::*Functional CIE Lab <- Functional CIE LCH][Functional CIE Lab <- Functional CIE LCH:1]]
import { calcFractionFromPercent, normalize, significant } from "./setup.js";
import { parseHSL } from "./hsl.js";

const precision = significant.bind(null, 5);
// Functional CIE Lab <- Functional CIE LCH:1 ends here

// [[file:../../../README.org::*Functional CIE Lab <- Functional CIE LCH][Functional CIE Lab <- Functional CIE LCH:2]]
/** Functional CIE Lab <- Functional CIE LCH */
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
// Functional CIE Lab <- Functional CIE LCH:2 ends here
