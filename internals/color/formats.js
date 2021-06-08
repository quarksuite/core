// [[file:../../README.org::*Hex Validator][Hex Validator:1]]
/** Validate: hex color */
export const validate = (color) => /^#([\da-f]{3,4}){1,2}$/i.test(color);
// Hex Validator:1 ends here

// [[file:../../README.org::*Hex Value Extractor][Hex Value Extractor:1]]
/** Expand hex shorthand into full hex color */
function expander(color) {
  const [, ...values] = color;

  if (values.length === 3 || values.length === 4) {
    return `#${values.map((channel) => channel.repeat(2)).join("")}`;
  }

  return color;
}
// Hex Value Extractor:1 ends here

// [[file:../../README.org::*Hex Value Extractor][Hex Value Extractor:2]]
/** Extract: hex channel values */
export const extract = (hex) => expander(hex).match(/[\da-f]{2}/g);
// Hex Value Extractor:2 ends here

// [[file:../../README.org::*W3C-X11][W3C-X11:1]]
import { X11Colors } from "../../../data/color/w3c-x11.js";

/** Validate: W3C X11 named colors */
export const validate = (color) => !!X11Colors[color];
// W3C-X11:1 ends here

// [[file:../../README.org::*RGB Validator][RGB Validator:1]]
/** Validate: functional RGB format */
export function validate(color) {
  // RGB regexp

  // prefix: "rgb(" || "rgba("
  // R && G && B: float<0-100>% || int<0-255>
  let R, G, B;
  R = G = B =
    /(?:(?:100%|(?:\d\.?\d?){1,}%)|(?:25[0-5]|24[0-4][0-9]|1[0-9]{2}|\d{1,}|0))/;
  // transparency: float<0-1> || float<0-100>%
  const alpha = /(?:(?:0|0\.\d+|1)|(?:100|(?:\d\.?\d?){1,}%))/;
  // separators: ", " || " " || " /"
  const channelSep = /(?:[\s,]+)/;
  const alphaSep = /(?:[,\s/]+)/;
  // suffix: ")"

  return new RegExp(
    [
      "(?:^rgba?\\(",
      R.source,
      channelSep.source,
      G.source,
      channelSep.source,
      B.source,
      "(?:",
      alphaSep.source,
      alpha.source,
      ")?\\))$",
    ].join(""),
  ).test(color);
}
// RGB Validator:1 ends here

// [[file:../../README.org::*RGB Extractor][RGB Extractor:1]]
/** Extract: RGB channel/alpha values */
export const extract = (rgb) => rgb.match(/([\d.]%?)+/g);
// RGB Extractor:1 ends here

// [[file:../../README.org::*HSL Validator][HSL Validator:1]]
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

// [[file:../../README.org::*HSL Extractor][HSL Extractor:1]]
/** Extract: HSL values */
export const extract = (hsl) => hsl.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// HSL Extractor:1 ends here

// [[file:../../README.org::*CMYK Validator][CMYK Validator:1]]
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

// [[file:../../README.org::*CMYK Extractor][CMYK Extractor:1]]
/** Extract: CMYK values */
export const extract = (cmyk) => cmyk.match(/([\d.]+)%?/g);
// CMYK Extractor:1 ends here

// [[file:../../README.org::*HWB Validator][HWB Validator:1]]
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

// [[file:../../README.org::*HWB Extractor][HWB Extractor:1]]
/** Extract: HWB values */
export const extract = (hwb) => hwb.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// HWB Extractor:1 ends here

// [[file:../../README.org::*CIELAB Validator][CIELAB Validator:1]]
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

// [[file:../../README.org::*CIELAB Extractor][CIELAB Extractor:1]]
/** Extract: CIELAB values */
export const extract = (lab) => lab.match(/(-?[\d.]%?)+/g);
// CIELAB Extractor:1 ends here

// [[file:../../README.org::*CIELCh(ab) Validator][CIELCh(ab) Validator:1]]
/** Validate: functional CIELCh(ab) format */
export function validate(color) {
  // CIELCh(ab) regexp

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
// CIELCh(ab) Validator:1 ends here

// [[file:../../README.org::*CIELCh(ab) Extractor][CIELCh(ab) Extractor:1]]
/** Extract: CIELCh(ab) values */
export const extract = (lch) => lch.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
// CIELCh(ab) Extractor:1 ends here

// [[file:../../README.org::*Oklab (LCh) Validator][Oklab (LCh) Validator:1]]
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

// [[file:../../README.org::*Oklab (LCh) Extractor][Oklab (LCh) Extractor:1]]
/** Extract: Oklab (LCh) values */
export const extract = (oklab) => oklab.match(/([\d.]%?)+/g);
// Oklab (LCh) Extractor:1 ends here
