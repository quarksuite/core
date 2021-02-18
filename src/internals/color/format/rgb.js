// [[file:../../../../README.org::*RGB Validator][RGB Validator:1]]
/** Validate: functional RGB format */
export function validate(color) {
  // RGB regexp

  // prefix: "rgb(" || "rgba("
  // R && G && B: float<0-100>% || int<0-255>
  let R, G, B;
  R = G = B =
    /(?:(?:100%|(?:\d\.?\d?){1,}%)|(?:25[0-5]|24[0-4][0-9]|1[0-9]{2}|\d{1,}|0))/;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: ", " || " " || " /"
  const channelSep = /(?:[\s,]+)/;
  const alphaSep = /(?:[,\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^rgba?\\(",
      R.source,
      channelSep.source,
      G.source,
      channelSep.source,
      B.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// RGB Validator:1 ends here

// [[file:../../../../README.org::*RGB Extractor][RGB Extractor:1]]
/** Extract: RGB channel/alpha values */
export const extract = (rgb) => rgb.match(/([\d.]%?)+/g);
// RGB Extractor:1 ends here
