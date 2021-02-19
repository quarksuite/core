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
  const A = alpha && calcHexFragmentFromAlpha(alpha ?? 1) || "ff";

  return A === "ff" ? `#${R}${G}${B}` : `#${R}${G}${B}${A}`;
}
// RGB Hex <- Functional RGB (=rgb.hex=):1 ends here
