// [[file:../../../../Mod.org::*Extractor][Extractor:1]]
import { compose } from "../../fp.js";
import { validator } from "../validator/index.js";
// Extractor:1 ends here

// [[file:../../../../Mod.org::*Extractor][Extractor:2]]
export const extractor = compose(validator, ([format, color]) => [
  format,
  format === "hex" ? hexExtractor(color) : componentExtractor(color),
]);
// Extractor:2 ends here

// [[file:../../../../Mod.org::*Hex Extractor][Hex Extractor:1]]
function hexExtractor(color) {
  return expandHex(color).match(/[\da-f]{2}/gi);
}

function expandHex(color) {
  const [, ...values] = color;

  if (values.length === 3 || values.length === 4) {
    return `#${values.map((channel) => channel.repeat(2)).join("")}`;
  }

  return color;
}
// Hex Extractor:1 ends here

// [[file:../../../../Mod.org::*Component Extractor][Component Extractor:1]]
function componentExtractor(color) {
  return color.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
}
// Component Extractor:1 ends here
