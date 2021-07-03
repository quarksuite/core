// [[file:../../../../Mod.org::*Validator][Validator:1]]
import { QSCError } from "../../../error.js";
import { NAMED_COLOR_KEYWORDS } from "../../../data.js";
// Validator:1 ends here

// [[file:../../../../Mod.org::*Validator][Validator:2]]
const SUPPORTED_FORMATS = {
  named: namedValidator,
  hex: hexValidator,
  rgb: rgbValidator,
  hsl: hslValidator,
  cmyk: cmykValidator,
  hwb: hwbValidator,
  cielab: cielabValidator,
  cielch: cielchValidator,
  oklab: oklabValidator,
};

export function validator(color) {
  return (
    Object.entries(SUPPORTED_FORMATS)
      .map(([format, fn]) => [format, fn(color) && color])
      .find(([, color]) => color) || InvalidOrUnsupportedColorError()
  );
}

function InvalidOrUnsupportedColorError() {
  throw new QSCError({
    name: "Invalid or Unsupported Color",
    reason: `
The input matches none of Quarks System Core's supported color formats. It's
also possible you have a syntax error.
`,
    suggestion: `
Check your input color against these supported CSS color formats:

Named Colors
------------
coral
springgreen
dodgerblue
rebeccapurple

RGB Hex
-------
#f0f
#ca5e
#933cca
#99eefff7

Functional RGB
--------------
rgb(30, 110, 0)
rgb(19%, 38.9%, 70%)
rgba(255, 255, 255, 0.8)
rgb(129 22 108)
rgb(20% 2% 100% / 0.25)

Functional HSL
--------------
hsl(240, 39%, 81%)
hsla(120, 78%, 45%, 0.93)
hsl(2.5rad 29% 40%)
hsl(216.44grad 20% 90% / 0.75)

Device CMYK
-----------
device-cmyk(0 0.2 0.399 0)
device-cmyk(90% 0% 0% 37.5%)
device-cmyk(0% 39% 0% 0 / 0.88)

HWB
---
hwb(60 83% 0%)
hwb(90 0% 37%)
hwb(0.75turn 30% 25%)
hwb(300 29% 5% / 0.99)

CIELAB
------
lab(48% 101 -39)
lab(87% -33 0)
lab(59% -88 -2 / 0.5)

CIELCh(ab)
----------
lch(25% 49 180)
lch(75% 0 0)
lch(56.551 77.38 2rad / 0.6892)

Oklab (LCh)
-----------
NOTE: This format is non-standard. If you use it, be sure to
convert to a standard CSS format. Example: hex("oklab(0% 0 0)")

oklab(59.4% 0.33 150)
oklab(33% 64% 0.2turn)
oklab(68.332% 0.16 1.778rad)
`,
  });
}
// Validator:2 ends here

// [[file:../../../../Mod.org::*Primitives][Primitives:1]]
const NUMBER_TOKEN = /(?:-?(?!0\d)\d+(?:\.\d+)?)/;
const PERCENT_TOKEN = new RegExp(["(?:", NUMBER_TOKEN.source, "%)"].join(""));
// Primitives:1 ends here

// [[file:../../../../Mod.org::*Delimiters][Delimiters:1]]
const DELIMITER = /(?:[\s,]+)/;
const ALPHA_DELIMITER = new RegExp(DELIMITER.source.replace(",", ",/"));
const CSS4_DELIMITER = new RegExp(DELIMITER.source.replace(",", ""));
const CSS4_ALPHA_DELIMITER = new RegExp(
  ALPHA_DELIMITER.source.replace(",", ""),
);
// Delimiters:1 ends here

// [[file:../../../../Mod.org::*Components][Components:1]]
const COMPONENT_TOKEN = new RegExp(
  ["(?:", PERCENT_TOKEN.source, "|", NUMBER_TOKEN.source, ")"].join(""),
);
const HUE_TOKEN = new RegExp(
  ["(?:", NUMBER_TOKEN.source, "(?:deg|g?rad|turn)?)"].join(""),
);
// Components:1 ends here

// [[file:../../../../Mod.org::*Named Color Validator][Named Color Validator:1]]
function namedValidator(color) {
  return !!NAMED_COLOR_KEYWORDS[color];
}
// Named Color Validator:1 ends here

// [[file:../../../../Mod.org::*Hex Validator][Hex Validator:1]]
function hexValidator(color) {
  return /^#([\da-f]{3,4}){1,2}$/i.test(color);
}
// Hex Validator:1 ends here

// [[file:../../../../Mod.org::*RGB Validator][RGB Validator:1]]
function rgbValidator(color) {
  return matchFunctionalFormat(
    { prefix: "rgba?" },
    Array(3).fill(COMPONENT_TOKEN),
  ).test(color);
}
// RGB Validator:1 ends here

// [[file:../../../../Mod.org::*HSL Validator][HSL Validator:1]]
function hslValidator(color) {
  return matchFunctionalFormat({ prefix: "hsla?" }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENT_TOKEN),
  ]).test(color);
}
// HSL Validator:1 ends here

// [[file:../../../../Mod.org::*CMYK Validator][CMYK Validator:1]]
function cmykValidator(color) {
  return matchFunctionalFormat(
    { prefix: "device-cmyk", legacy: false },
    Array(4).fill(COMPONENT_TOKEN),
  ).test(color);
}
// CMYK Validator:1 ends here

// [[file:../../../../Mod.org::*HWB Validator][HWB Validator:1]]
function hwbValidator(color) {
  return matchFunctionalFormat({ prefix: "hwb", legacy: false }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENT_TOKEN),
  ]).test(color);
}
// HWB Validator:1 ends here

// [[file:../../../../Mod.org::*CIELAB Validator][CIELAB Validator:1]]
function cielabValidator(color) {
  return matchFunctionalFormat({ prefix: "lab", legacy: false }, [
    PERCENT_TOKEN,
    ...Array(2).fill(NUMBER_TOKEN),
  ]).test(color);
}
// CIELAB Validator:1 ends here

// [[file:../../../../Mod.org::*CIELCh(ab) Validator][CIELCh(ab) Validator:1]]
function cielchValidator(color) {
  return matchFunctionalFormat({ prefix: "lch", legacy: false }, [
    PERCENT_TOKEN,
    NUMBER_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}
// CIELCh(ab) Validator:1 ends here

// [[file:../../../../Mod.org::*Oklab Validator][Oklab Validator:1]]
function oklabValidator(color) {
  return matchFunctionalFormat({ prefix: "oklab", legacy: false }, [
    PERCENT_TOKEN,
    COMPONENT_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}
// Oklab Validator:1 ends here

// [[file:../../../../Mod.org::*Functional Formats][Functional Formats:1]]
function matchFunctionalFormat({ prefix, legacy = true }, tokens) {
  const VALUES = tokens.map((token) => token.source);

  const SEPARATOR = legacy ? DELIMITER.source : CSS4_DELIMITER.source;
  const ALPHA_SEPARATOR = legacy
    ? ALPHA_DELIMITER.source
    : CSS4_ALPHA_DELIMITER.source;

  return new RegExp(
    `(?:^${prefix}\\(`.concat(
      VALUES.join(SEPARATOR),
      `(?:${[ALPHA_SEPARATOR, COMPONENT_TOKEN.source].join("")})?\\))`,
    ),
  );
}
// Functional Formats:1 ends here
