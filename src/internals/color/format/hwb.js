// [[file:../../../../README.org::*HWB Validator][HWB Validator:1]]
/** Validate: functional HWB format */
export function validate(color) {
  // HWB regexp

  // prefix: "hwb("
  // hue: -?float<0->deg? || -?float<0->rad || -?float<0->grad || -?float<0->turn
  const hue = /(?:-?(?:(?:\d\.?\d?)(?:deg|g?rad|turn)?)+)/;
  // whitness && blackness: float<0-100>%
  const whiteness = /(?:(?:100%|(?:\d\.?\d?){1,}%))/;
  const blackness = whiteness;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s,]+)/;
  const alphaSep = /(?:[,\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^hwb\\(",
      hue.source,
      valueSep.source,
      whiteness.source,
      valueSep.source,
      blackness.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// HWB Validator:1 ends here

// [[file:../../../../README.org::*HWB Extractor][HWB Extractor:1]]
/** Extract: HWB values */
export const extract = (hwb) => hwb.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// HWB Extractor:1 ends here
