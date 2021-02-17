// [[file:../../../../README.org::*HSL Validator][HSL Validator:1]]
/** Validate: functional HSL format */
export function validate(color) {
  // HSL regexp

  // prefix: "hsl(" || "hsla("
  // hue: -?float<0->deg? || -?float<0->rad || -?float<0->grad || -?float<0->turn
  const hue = /(?:-?(?:(?:\d\.?\d?)(?:deg|g?rad|turn)?)+)/;
  // saturation && lightness: float<0-100>%
  const saturation = /(?:(?:100%|(?:\d\.?\d?){1,}%))/;
  const lightness = saturation;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: ", " || " " || " /"
  const valueSep = /(?:[\s,]+)/;
  const alphaSep = /(?:[,\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^hsla?\\(",
      hue.source,
      valueSep.source,
      saturation.source,
      valueSep.source,
      lightness.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// HSL Validator:1 ends here

// [[file:../../../../README.org::*HSL Extractor][HSL Extractor:1]]
/** Extract: HSL values */
export const extract = (hsl) => hsl.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// HSL Extractor:1 ends here
