// [[file:../../../README.org::*RGB Hex -> Functional RGB (=hex.rgb=)][RGB Hex -> Functional RGB (=hex.rgb=):1]]
import {
  calcFractionFromChannel,
  hexFragmentToChannel,
  significant,
} from "./setup.js";

/** RGB Hex -> Functional RGB */
export function rgb(hex) {
  const [r, g, b, alpha] = hex;
  const [R, G, B] = [r, g, b].map((fragment) => hexFragmentToChannel(fragment));
  const A = significant(
    4,
    calcFractionFromChannel(hexFragmentToChannel(alpha ?? "ff")),
  );

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// RGB Hex -> Functional RGB (=hex.rgb=):1 ends here
