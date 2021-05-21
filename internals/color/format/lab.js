// [[file:../../../README.org::*CIELAB Validator][CIELAB Validator:1]]
/** Validate: functional CIELAB format */
export function validate(color) {
  // CIELAB regexp

  // prefix: "lab("
  // L: float<0->%
  const L = /(?:(?:\d\.?\d?){1,}%)/;
  // a && b: -?int<0-128>
  let a, b;
  a = b = /(?:-?(?:128|(?:1[0-2][0-8]|(?:\d.?\d?){1,})))/;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: " " || " /"
  const valueSep = /(?:[\s]+)/;
  const alphaSep = /(?:[\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^lab\\(",
      L.source,
      valueSep.source,
      a.source,
      valueSep.source,
      b.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// CIELAB Validator:1 ends here

// [[file:../../../README.org::*CIELAB Extractor][CIELAB Extractor:1]]
/** Extract: CIELAB values */
export const extract = (lab) => lab.match(/(-?[\d.]%?)+/g);
// CIELAB Extractor:1 ends here
