// [[file:../../../../README.org::*Functional RGB <- Functional HWB][Functional RGB <- Functional HWB:1]]
import {
  calcChannelFromFraction,
  calcFractionFromChannel,
  calcFractionFromPercent,
} from "./setup.js";
import { calcRGB, parseHSL } from "./hsl.js";

function parseHWB(hwb) {
  const [h, w, blk, alpha] = hwb;
  const [H] = parseHSL([h, "100%", "50%", "1"]);
  const [W, BLK] = [w, blk].map((component) =>
    calcFractionFromPercent(parseFloat(component))
  );

  const a = parseFloat(alpha);
  const A = a != null ? (a > 1 ? calcFractionFromPercent(a) : a) : 1;

  return A === 1 ? [H, W, BLK] : [H, W, BLK, A];
}
// Functional RGB <- Functional HWB:1 ends here

// [[file:../../../../README.org::*Functional RGB <- Functional HWB][Functional RGB <- Functional HWB:2]]
/** Functional RGB <- Functional HWB */
export function rgb(hwb) {
  const [h, w, blk, alpha] = parseHWB(hwb);
  const [r, g, b] = calcRGB(h, 1, 0.5);

  const A = (alpha && (alpha ?? 1)) || 1;

  // Achromatic
  if (w + blk >= 1) {
    const GRAY = Math.round(calcChannelFromFraction(w / (w + blk)));
    return A === 1
      ? `rgb(${GRAY}, ${GRAY}, ${GRAY})`
      : `rgba(${GRAY}, ${GRAY}, ${GRAY}, ${A})`;
  }

  const [R, G, B] = [r, g, b].map((channel) =>
    Math.round(
      calcChannelFromFraction(
        calcFractionFromChannel(channel) * (1 - w - blk) + w,
      ),
    )
  );

  return A === 1 ? `rgb(${R}, ${G}, ${B})` : `rgba(${R}, ${G}, ${B}, ${A})`;
}
// Functional RGB <- Functional HWB:2 ends here
