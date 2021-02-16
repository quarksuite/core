// [[file:../../../../README.org::*Hex Validator][Hex Validator:1]]
/** Validate: hex color */
export const validate = (color) => /^#([\da-f]{3,4}){1,2}$/i.test(color);
// Hex Validator:1 ends here

// [[file:../../../../README.org::*Hex Value Extractor][Hex Value Extractor:1]]
/** Expand hex shorthand into full hex color */
export function expander(color) {
  const [, ...values] = color;

  if (values.length === 3 || values.length === 4) {
    return `#${values.map((channel) => channel.repeat(2)).join("")}`;
  }

  return color;
}
// Hex Value Extractor:1 ends here

// [[file:../../../../README.org::*Hex Value Extractor][Hex Value Extractor:4]]
/** Extract: hex channel values */
export const extract = (hex) => hex.match(/[\da-f]{2}/g);
// Hex Value Extractor:4 ends here
