// [[file:../../../../Mod.org::*Linkers][Linkers:1]]
import { NAMED_COLOR_KEYWORDS } from "../../../data.js";
import { pipe } from "../../fp.js";
import { validator } from "../validator/index.js";
import { output, parser } from "../parser/index.js";
import {
  hueCorrection,
  normalize,
  radFromDegrees,
  radToDegrees,
} from "./math.js";
// Linkers:1 ends here

// [[file:../../../../Mod.org::*Named Color to Hex][Named Color to Hex:1]]
export function hexFromNamedColor(color) {
  return validator(NAMED_COLOR_KEYWORDS[color]);
}
// Named Color to Hex:1 ends here

// [[file:../../../../Mod.org::*CIELAB to CIELCh(ab)][CIELAB to CIELCh(ab):1]]
export function cielabToCielch(color) {
  const [, [L, a, b, A]] = parser(color);

  const C = normalize(132, 0, Math.sqrt(a ** 2 + b ** 2));
  const H = pipe(Math.atan2(b, a), radToDegrees, hueCorrection);

  return pipe(
    output(["cielch", [L.toString().concat("%"), C, H, A]]),
    validator,
  );
}
// CIELAB to CIELCh(ab):1 ends here

// [[file:../../../../Mod.org::*CIELCh(ab) to CIELAB][CIELCh(ab) to CIELAB:1]]
export function cielabFromCielch(color) {
  const [, [L, C, H, A]] = parser(color);

  const [a, b] = [
    C * Math.cos(radFromDegrees(H)),
    C * Math.sin(radFromDegrees(H)),
  ].map((V) => normalize(128, -127, V));

  return pipe(
    output(["cielab", [L.toString().concat("%"), a, b, A]]),
    validator,
  );
}
// CIELCh(ab) to CIELAB:1 ends here
