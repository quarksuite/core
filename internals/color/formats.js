// [[file:../../README.org::*Syntax Tokens][Syntax Tokens:1]]
// channel: float<0-100>% || int<0-255>
const CHANNEL_TOK = /(?:(?:100%|(?:\d\.?\d?){1,}%)|(?:25[0-5]|24[0-4][0-9]|1[0-9]{2}|\d{1,}|0))/;

// hue: -?float<0->deg? || -?float<0->rad || -?float<0->grad || -?float<0->turn
const HUE_TOK = /(?:-?(?:(?:\d\.?\d?)(?:deg|g?rad|turn)?)+)/;

// percentage: float<0-100>%
const PERCENT_TOK = /(?:(?:100%|(?:\d\.?\d?){1,}%))/;

// percentage: float<0->%
const CIE_LUM_TOK = /(?:(?:\d\.?\d?){1,}%)/;

// hue: -?<0-128>
const HUE_TOK_CIELAB = /(?:-?(?:128|(?:1[0-2][0-8]|(?:\d.?\d?){1,})))/;

// chroma: int<0-230>
const CHROMA_TOK = /(?:(?:230|(?:2[0-2][0-9]|1[0-9][0-9])|(?:\d.?\d?){1,}))/;

// transparency: float<0-1> || float<0-100>%
const PERCENT_TOK_DECIMAL = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;

// chroma: -?float<0-0.5>
const CHROMA_TOK_OKLAB = /(?:-?(?:0|0\.\d+|0.5))/;

// separators: ", " || " " || " /"
const DELIM = /(?:[\s,]+)/;
const ALPHA_DELIM = /(?:[\s,/]+)/;
const DELIM_CSS4 = /(?:[\s]+)/;
const ALPHA_DELIM_CSS4 = /(?:[\s/]+)/;
// Syntax Tokens:1 ends here

// [[file:../../README.org::*Syntax Tokens][Syntax Tokens:2]]
function matchFunctionalFormat({ prefix, legacy = true }, tokens) {
  const tokenValues = tokens.map((tok) => tok.source);
  const ALPHA_TOK = PERCENT_TOK_DECIMAL;

  const DELIMITER = legacy ? DELIM : DELIM_CSS4;
  const ALPHA_DELIMITER = legacy ? ALPHA_DELIM : ALPHA_DELIM_CSS4;
  return new RegExp(
    `(?:^${prefix}\\(`.concat(
      tokenValues.join(DELIMITER.source),
      `(?:${[ALPHA_DELIMITER.source, ALPHA_TOK.source].join("")})?\\))`
    )
  );
}
// Syntax Tokens:2 ends here

// [[file:../../README.org::*Value Extractors][Value Extractors:1]]
/** Extract RGB Hex values */
export const hexExtractor = (color) => expandHex(color).match(/[\da-f]{2}/g);

/** Extract functional color format components */
export const valueExtractor = (color) =>
  color.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// Value Extractors:1 ends here

// [[file:../../README.org::*Hex Validator][Hex Validator:1]]
/** Validate: hex color */
export const hexValidator = (color) => /^#([\da-f]{3,4}){1,2}$/i.test(color);
// Hex Validator:1 ends here

// [[file:../../README.org::*Hex Value Extraction][Hex Value Extraction:1]]
/** Expand hex shorthand into full hex color */
function expandHex(color) {
  const [, ...values] = color;

  if (values.length === 3 || values.length === 4) {
    return `#${values.map((channel) => channel.repeat(2)).join("")}`;
  }

  return color;
}
// Hex Value Extraction:1 ends here

// [[file:../../README.org::*Named Colors][Named Colors:1]]
import { X11Colors } from "../../data/color/w3c-x11.js";

/** Validate: W3C X11 named colors */
export const namedValidator = (color) => !!X11Colors[color];
// Named Colors:1 ends here

// [[file:../../README.org::*RGB Validator][RGB Validator:1]]
/** Validate: functional RGB format */
export const rgbValidator = (color) =>
  matchFunctionalFormat({ prefix: "rgba?" }, Array(3).fill(CHANNEL_TOK)).test(
    color
  );
// RGB Validator:1 ends here

// [[file:../../README.org::*HSL Validator][HSL Validator:1]]
/** Validate: functional HSL format */
export const hslValidator = (color) =>
  matchFunctionalFormat({ prefix: "hsla?" }, [
    HUE_TOK,
    ...Array(2).fill(PERCENT_TOK),
  ]).test(color);
// HSL Validator:1 ends here

// [[file:../../README.org::*CMYK Validator][CMYK Validator:1]]
/** Validate: CMYK format */
export const cmykValidator = (color) =>
  matchFunctionalFormat(
    { prefix: "device-cmyk", legacy: false },
    Array(4).fill(PERCENT_TOK_DECIMAL)
  ).test(color);
// CMYK Validator:1 ends here

// [[file:../../README.org::*HWB Validator][HWB Validator:1]]
/** Validate: functional HWB format */
export function hwbValidator(color) {
  return matchFunctionalFormat({ prefix: "hwb", legacy: false }, [
    HUE_TOK,
    ...Array(2).fill(PERCENT_TOK),
  ]).test(color);
}
// HWB Validator:1 ends here

// [[file:../../README.org::*CIELAB Validator][CIELAB Validator:1]]
/** Validate: functional CIELAB format */
export function cielabValidator(color) {
  return matchFunctionalFormat({ prefix: "lab", legacy: false }, [
    CIE_LUM_TOK,
    ...Array(2).fill(HUE_TOK_CIELAB),
  ]).test(color);
}
// CIELAB Validator:1 ends here

// [[file:../../README.org::*CIELCh(ab) Validator][CIELCh(ab) Validator:1]]
/** Validate: functional CIELCh(ab) format */
export function cielchValidator(color) {
  return matchFunctionalFormat({ prefix: "lch", legacy: false }, [
    CIE_LUM_TOK,
    CHROMA_TOK,
    HUE_TOK,
  ]).test(color);
}
// CIELCh(ab) Validator:1 ends here

// [[file:../../README.org::*Oklab (LCh) Validator][Oklab (LCh) Validator:1]]
/** Validate: Oklab (LCh) format */
export function oklabValidator(color) {
  return matchFunctionalFormat({ prefix: "oklab", legacy: false }, [
    CIE_LUM_TOK,
    CHROMA_TOK_OKLAB,
    HUE_TOK,
  ]).test(color);
}
// Oklab (LCh) Validator:1 ends here
