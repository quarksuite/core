// [[file:../../../../README.org::*CMYK Validator][CMYK Validator:1]]
/** Validate: CMYK format */
export function validate(color) {
  // CMYK regexp

  // prefix: "device-cymk("
  // value: float<0-1> || float<0-100>%
  const value = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s]+)/;
  const alphaSep = /(?:[\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^device-cmyk\\(",
      value.source,
      valueSep.source,
      value.source,
      valueSep.source,
      value.source,
      valueSep.source,
      value.source,
      "(?:",
      alphaSep.source,
      value.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// CMYK Validator:1 ends here

// [[file:../../../../README.org::*CMYK Extractor][CMYK Extractor:1]]
/** Extract: CMYK values */
export const extract = (cmyk) => cmyk.match(/([\d.]+)%?/g);
// CMYK Extractor:1 ends here
