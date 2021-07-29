// [[file:../../../../Mod.org::*Parser][Parser:1]]
import { compose, pipe } from "../../fp.js";
import { validator } from "../validator/index.js";
import { extractor } from "../extractor/index.js";
import {
  gradToDegrees,
  hexFragmentToRgb,
  hueCorrection,
  numberFromPercent,
  numberFromRgb,
  numberToDegrees,
  precision,
  radFromDegrees,
  radToDegrees,
} from "../converter/math.js";
// Parser:1 ends here

// [[file:../../../../Mod.org::*Parser][Parser:2]]
const FORMAT_PARSERS = {
  hex: parseHex,
  rgb: parseRGB,
  hsl: parseHSL,
  cmyk: parseCMYK,
  hwb: parseHSL, // identical to HSL
  cielab: parseCielab,
  cielch: parseCielch,
  oklab: parseOklab,
};

export const parser = compose(
  validator,
  ([format, color]) => FORMAT_PARSERS[format](color),
);
// Parser:2 ends here

// [[file:../../../../Mod.org::*Hex Parser][Hex Parser:1]]
function parseHex(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "ff"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 3
          ? pipe(c, hexFragmentToRgb, numberFromRgb)
          : hexFragmentToRgb(c)
      ),
    ],
  );
}
// Hex Parser:1 ends here

// [[file:../../../../Mod.org::*RGB Parser][RGB Parser:1]]
function parseRGB(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        c.endsWith("%")
          ? parsePercent(c)
          : pos === 3
          ? parseNumber(c)
          : parseChannel(c)
      ),
    ],
  );
}
// RGB Parser:1 ends here

// [[file:../../../../Mod.org::*HSL Parser][HSL Parser:1]]
function parseHSL(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parseHue(c)
          : pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : parsePercent(c)
      ),
    ],
  );
}
// HSL Parser:1 ends here

// [[file:../../../../Mod.org::*CMYK Parser][CMYK Parser:1]]
function parseCMYK(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 5 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c) => c.endsWith("%") ? parsePercent(c) : parseNumber(c)),
    ],
  );
}
// CMYK Parser:1 ends here

// [[file:../../../../Mod.org::*CIELAB Parser][CIELAB Parser:1]]
function parseCielab(color) {
  return parseCie((ab) => parseNumber(ab), color);
}
// CIELAB Parser:1 ends here

// [[file:../../../../Mod.org::*CIELCh(ab) Parser][CIELCh(ab) Parser:1]]
function parseCielch(color) {
  return parseCie(
    (c, pos) => (pos === 2 ? parseHue(c) : parseNumber(c)),
    color,
  );
}
// CIELCh(ab) Parser:1 ends here

// [[file:../../../../Mod.org::*Oklab Parser][Oklab Parser:1]]
function parseOklab(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parsePercent(c)
          : pos === 1 || pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : parseHueAsRadians(c)
      ),
    ],
    ([format, [L, C, H, A]]) => [
      format,
      [L, C * Math.cos(H), C * Math.sin(H), A],
    ],
  );
}
// Oklab Parser:1 ends here

// [[file:../../../../Mod.org::*Number Parser][Number Parser:1]]
function parseNumber(n) {
  return pipe(n, parseFloat, precision);
}
// Number Parser:1 ends here

// [[file:../../../../Mod.org::*Percent Parser][Percent Parser:1]]
function parsePercent(percentage) {
  return pipe(percentage, parseFloat, numberFromPercent);
}
// Percent Parser:1 ends here

// [[file:../../../../Mod.org::*RGB Channel Parser][RGB Channel Parser:1]]
function parseChannel(channel) {
  return pipe(channel, parseFloat, numberFromRgb);
}
// RGB Channel Parser:1 ends here

// [[file:../../../../Mod.org::*Hue Parsers][Hue Parsers:1]]
function parseHue(hue) {
  return hueCorrection(
    hue.endsWith("grad")
      ? gradToDegrees(parseFloat(hue))
      : hue.endsWith("rad")
      ? radToDegrees(parseFloat(hue))
      : hue.endsWith("turn")
      ? numberToDegrees(parseFloat(hue))
      : parseFloat(hue),
  );
}

function parseHueAsRadians(hue) {
  return hue.endsWith("rad") && !hue.endsWith("grad")
    ? parseNumber(hue)
    : pipe(hue, parseHue, radFromDegrees);
}
// Hue Parsers:1 ends here

// [[file:../../../../Mod.org::*CIE* Parser][CIE* Parser:1]]
function parseCie(unique, color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parseNumber(c)
          : pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : unique(c, pos)
      ),
    ],
  );
}
// CIE* Parser:1 ends here

// [[file:../../../../Mod.org::*Output][Output:1]]
export function output(data) {
  return pipe(
    data,
    ([format, components]) => COLOR_ASSEMBLER(components)[format],
  );
}
// Output:1 ends here

// [[file:../../../../Mod.org::*Output][Output:2]]
function COLOR_ASSEMBLER(components) {
  return {
    hex: hexOutput(components),
    rgb: legacyOutput("rgb", components),
    hsl: legacyOutput("hsl", components),
    cmyk: modernOutput("device-cmyk", components),
    hwb: modernOutput("hwb", components),
    cielab: modernOutput("lab", components),
    cielch: modernOutput("lch", components),
    oklab: modernOutput("oklab", components),
  };
}

function hexOutput([R, G, B, A]) {
  return "#".concat(R, G, B, A === "ff" ? "" : A);
}

function legacyOutput(prefix, [C1, C2, C3, A]) {
  return `${A === 1 ? prefix : prefix.concat("a")}(`.concat(
    (A === 1 ? [C1, C2, C3] : [C1, C2, C3, precision(parseFloat(A))]).join(
      ", ",
    ),
    ")",
  );
}

function modernOutput(prefix, components) {
  return `${prefix}(`.concat(
    components.slice(0, components.length - 1).join(" "),
    components[components.length - 1] === 1
      ? ""
      : ` / ${precision(parseFloat(components.slice(-1)))}`,
    ")",
  );
}
// Output:2 ends here
