// [[file:../../../README.org::*CMYK Validator][CMYK Validator:1]]
/** Validate: CMYK format */
export function validate(color) {
  // CMYK regexp

  // prefix: "device-cymk("
  // c & m & y & k & a: float<0-1> || float<0-100>%
  let c, m, y, k, alpha;
  c = m = y = k = alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s]+)/;
  const alphaSep = /(?:[\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^device-cmyk\\(",
      c.source,
      valueSep.source,
      m.source,
      valueSep.source,
      y.source,
      valueSep.source,
      k.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// CMYK Validator:1 ends here

// [[file:../../../README.org::*CMYK Extractor][CMYK Extractor:1]]
/** Extract: CMYK values */
export const extract = (cmyk) => cmyk.match(/([\d.]+)%?/g);
// CMYK Extractor:1 ends here
