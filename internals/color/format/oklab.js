// [[file:../../../README.org::*Oklab (LCh) Validator][Oklab (LCh) Validator:1]]
/** Validate: Oklab (LCh) format */
export function validate(color) {
  // OKlab (LCh) regexp

  // prefix: "oklab("
  // lightness: float<0->%
  const lightness = /(?:(?:\d\.?\d?){1,}%)/;
  // chroma: -?float<0-0.5>
  const chroma = /(?:-?(?:0|0\.\d+|0.5))/;
  // hue: float<0->
  const hue = /(?:(?:\d\.?\d?)+)/;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s]+)/;
  const alphaSep = /(?:[\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^oklab\\(",
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
// Oklab (LCh) Validator:1 ends here

// [[file:../../../README.org::*Oklab (LCh) Extractor][Oklab (LCh) Extractor:1]]
/** Extract: Oklab (LCh) values */
export const extract = (oklab) => oklab.match(/([\d.]%?)+/g);
// Oklab (LCh) Extractor:1 ends here
