// [[file:../../../README.org::*CIE LCH Validator][CIE LCH Validator:1]]
/** Validate: functional CIE LCH format */
export function validate(color) {
  // CIE LCH regexp

  // prefix: "lch("
  // lightness: float<0->%
  const lightness = /(?:(?:\d\.?\d?){1,}%)/;
  // chroma: int<0-230>
  const chroma = /(?:(?:230|(?:2[0-2][0-9]|1[0-9][0-9])|(?:\d.?\d?){1,}))/;
  // hue: -?float<0->deg? || -?float<0->rad || -?float<0->grad || -?float<0->turn
  const hue = /(?:-?(?:(?:\d\.?\d?)(?:deg|g?rad|turn)?)+)/;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s]+)/;
  const alphaSep = /(?:[\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^lch\\(",
      lightness.source,
      valueSep.source,
      chroma.source,
      valueSep.source,
      hue.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// CIE LCH Validator:1 ends here

// [[file:../../../README.org::*CIE LCH Extractor][CIE LCH Extractor:1]]
/** Extract: CIE LCH values */
export const extract = (lch) => lch.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// CIE LCH Extractor:1 ends here