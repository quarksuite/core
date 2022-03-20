// [[file:../Notebook.org::*convert Implementation][convert Implementation:1]]
export function convert(to, color) {
  if (to === "lab") {
    return serialize(_convert(color, "cielab"));
  }

  if (to === "lch") {
    return serialize(_convert(color, "cielch"));
  }

  return serialize(_convert(color, to));
}
// convert Implementation:1 ends here

// [[file:../Notebook.org::*adjust Implementation][adjust Implementation:1]]
export function adjust(settings, color) {
  // Do nothing by default
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0, steps } = settings;

  if (steps) {
    return colorInterpolation(
      colorAdjustment,
      {
        lightness,
        chroma,
        hue,
        alpha,
        steps,
      },
      color,
    );
  }

  return colorAdjustment({ lightness, chroma, hue, alpha }, color);
}
// adjust Implementation:1 ends here

// [[file:../Notebook.org::*mix Implementation][mix Implementation:1]]
export function mix(settings, color) {
  // Do nothing by default
  const { target = color, strength = 0, steps } = settings;

  if (steps) {
    return colorInterpolation(colorMix, { target, strength, steps }, color);
  }

  return colorMix({ target, strength }, color);
}
// mix Implementation:1 ends here

// [[file:../Notebook.org::*harmony Implementation][harmony Implementation:1]]
export function harmony(settings, color) {
  // Set defaults
  const { configuration = "complementary", accented = false } = settings;

  return colorHarmonies({ type: configuration, accented }, color);
}
// harmony Implementation:1 ends here

// [[file:../Notebook.org::*vision Implementation][vision Implementation:1]]
export function vision(settings, color) {
  // Set defaults
  const { as = "protanopia", method = "brettel", steps = 0 } = settings;

  // Achromatopsia through reducing the chroma to zero
  if (as === "achromatopsia") {
    const chroma = -100;

    if (steps) {
      return colorInterpolation(colorAdjustment, { chroma, steps }, color);
    }

    return colorAdjustment({ chroma }, color);
  }

  // Protanomaly, Deuteranomaly, and Tritanomaly have a severity setting
  if (as.endsWith("anomaly")) {
    let type = as.replace(/anomaly/g, "anope");
    const { severity = 50 } = settings;

    if (steps) {
      return colorInterpolation(
        checkColorblindness,
        { method, type, strength: severity, steps },
        color,
      );
    }

    return checkColorblindness(
      { method, type, strength: severity, steps },
      color,
    );
  }

  // Protanopia, Deuteranopia, Tritanopia by definition do not
  const type = as.replace(/anopia/g, "anope");

  if (steps) {
    return colorInterpolation(
      checkColorblindness,
      { method, type, strength: 100, steps },
      color,
    );
  }

  return checkColorblindness({ method, type, strength: 100, steps }, color);
}
// vision Implementation:1 ends here

// [[file:../Notebook.org::*contrast Implementation][contrast Implementation:1]]
export function contrast(settings, color) {
  // Set defaults
  const { factor = 0, severity = 50, steps = 0 } = settings;

  if (steps) {
    return colorInterpolation(
      checkSensitivity,
      {
        contrast: factor,
        strength: severity,
        steps,
      },
      color,
    );
  }

  return checkSensitivity(
    { contrast: factor, strength: severity, steps },
    color,
  );
}
// contrast Implementation:1 ends here

// [[file:../Notebook.org::*illuminant Implementation][illuminant Implementation:1]]
export function illuminant(settings, color) {
  // Set defaults
  const { K = 1850, intensity = 50, steps = 0 } = settings;

  const { temperature = 1000 } = settings;

  if (steps) {
    return colorInterpolation(
      checkIlluminant,
      {
        temperature: K,
        strength: intensity,
        steps,
      },
      color,
    );
  }

  return checkIlluminant({ temperature: K, strength: intensity, steps }, color);
}
// illuminant Implementation:1 ends here

// [[file:../Notebook.org::*palette Implementation][palette Implementation:1]]
export function palette(settings, color) {
  // Set default configuration and settings and exclude interface states until requested
  const {
    configuration = "material",
    contrast = 100,
    accented = false,
    stated = false,
  } = settings;

  // Generate from material-esque or artistic configuration depending on configuration
  if (configuration === "artistic") {
    const { tints = 3, tones = 3, shades = 3 } = settings;

    return artisticConfiguration(
      { contrast, tints, tones, shades, stated },
      color,
    );
  }

  return materialConfiguration({ contrast, accented, stated }, color);
}
// palette Implementation:1 ends here

// [[file:../Notebook.org::*accessibility Implementation][accessibility Implementation:1]]
export function accessibility(settings, palette) {
  // Set action defaults
  const {
    mode = "standard",
    rating = "AA",
    large = false,
    dark = false,
  } = settings;

  // If mode is custom
  if (mode === "custom") {
    const { min = 85, max } = settings;

    return paletteColorimetricContrast({ min, max, dark }, palette);
  }

  return paletteWcagContrast({ rating, large, dark }, palette);
}
// accessibility Implementation:1 ends here

// [[file:../Notebook.org::*tokens Implementation][tokens Implementation:1]]
export function tokens(palette) {
  return tokenizePalette(palette);
}
// tokens Implementation:1 ends here

// [[file:../Notebook.org::*Tokenization][Tokenization:1]]
const NUMBER_TOKEN = /(?:-?(?!0\d)\d+(?:\.\d+)?)/;
const PERCENTAGE_TOKEN = new RegExp(
  ["(?:", NUMBER_TOKEN.source, "%)"].join(""),
);

const LEGACY_DELIMITER = /(?:[\s,]+)/;
const LEGACY_ALPHA_DELIMITER = new RegExp(
  LEGACY_DELIMITER.source.replace(",", ",/"),
);
const MODERN_DELIMITER = new RegExp(LEGACY_DELIMITER.source.replace(",", ""));
const MODERN_ALPHA_DELIMITER = new RegExp(
  LEGACY_ALPHA_DELIMITER.source.replace(",", ""),
);

const COMPONENT_TOKEN = new RegExp(
  ["(?:", PERCENTAGE_TOKEN.source, "|", NUMBER_TOKEN.source, ")"].join(""),
);
const HUE_TOKEN = new RegExp(
  ["(?:", NUMBER_TOKEN.source, "(?:deg|g?rad|turn)?)"].join(""),
);
// Tokenization:1 ends here

// [[file:../Notebook.org::*Named Color Validation][Named Color Validation:1]]
const NAMED_COLOR_KEYWORDS = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflower: "#6495ed",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};

function namedValidator(color) {
  return Boolean(NAMED_COLOR_KEYWORDS[color]);
}
// Named Color Validation:1 ends here

// [[file:../Notebook.org::*RGB Hex Validation][RGB Hex Validation:1]]
function hexValidator(color) {
  return /^#([\da-f]{3,4}){1,2}$/i.test(color);
}
// RGB Hex Validation:1 ends here

// [[file:../Notebook.org::*Validating Functional Formats][Validating Functional Formats:1]]
function matchFunctionalFormat({ prefix, legacy = true }, tokens) {
  const VALUES = tokens.map((token) => token.source);

  const DELIMITER = legacy ? LEGACY_DELIMITER.source : MODERN_DELIMITER.source;
  const ALPHA_DELIMITER = legacy
    ? LEGACY_ALPHA_DELIMITER.source
    : MODERN_ALPHA_DELIMITER.source;

  return new RegExp(
    `(?:^${prefix}\\(`.concat(
      VALUES.join(DELIMITER),
      `(?:${[ALPHA_DELIMITER, COMPONENT_TOKEN.source].join("")})?\\))`,
    ),
  );
}
// Validating Functional Formats:1 ends here

// [[file:../Notebook.org::*RGB Validation][RGB Validation:1]]
function rgbValidator(color) {
  return matchFunctionalFormat(
    { prefix: "rgba?" },
    Array(3).fill(COMPONENT_TOKEN),
  ).test(color);
}
// RGB Validation:1 ends here

// [[file:../Notebook.org::*HSL Validation][HSL Validation:1]]
function hslValidator(color) {
  return matchFunctionalFormat({ prefix: "hsla?" }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}
// HSL Validation:1 ends here

// [[file:../Notebook.org::*CMYK Validation][CMYK Validation:1]]
function cmykValidator(color) {
  return matchFunctionalFormat(
    { prefix: "device-cmyk", legacy: false },
    Array(4).fill(COMPONENT_TOKEN),
  ).test(color);
}
// CMYK Validation:1 ends here

// [[file:../Notebook.org::*HWB Validation][HWB Validation:1]]
function hwbValidator(color) {
  return matchFunctionalFormat({ prefix: "hwb", legacy: false }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}
// HWB Validation:1 ends here

// [[file:../Notebook.org::*CIELAB/CIELCH Validation][CIELAB/CIELCH Validation:1]]
function cielabValidator(color) {
  return matchFunctionalFormat({ prefix: "lab", legacy: false }, [
    PERCENTAGE_TOKEN,
    ...Array(2).fill(NUMBER_TOKEN),
  ]).test(color);
}

function cielchValidator(color) {
  return matchFunctionalFormat({ prefix: "lch", legacy: false }, [
    PERCENTAGE_TOKEN,
    NUMBER_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}
// CIELAB/CIELCH Validation:1 ends here

// [[file:../Notebook.org::*OKLab/OKLCH Validation][OKLab/OKLCH Validation:1]]
function oklabValidator(color) {
  return matchFunctionalFormat({ prefix: "oklab", legacy: false }, [
    PERCENTAGE_TOKEN,
    NUMBER_TOKEN,
    NUMBER_TOKEN,
  ]).test(color);
}

function oklchValidator(color) {
  return matchFunctionalFormat({ prefix: "oklch", legacy: false }, [
    PERCENTAGE_TOKEN,
    NUMBER_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}
// OKLab/OKLCH Validation:1 ends here

// [[file:../Notebook.org::*Preparing Validation][Preparing Validation:1]]
function validator(input) {
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
    oklch: oklchValidator,
  };

  return (
    Object.entries(SUPPORTED_FORMATS)
      .map(([format, test]) => [format, test(input) && input])
      .find(([, color]) => color) || InvalidColorError(input)
  );
}
// Preparing Validation:1 ends here

// [[file:../Notebook.org::*Invalid Color Handling][Invalid Color Handling:1]]
class InvalidColor extends Error {
  constructor(input, ...params) {
    super(...params);

    // Stack trace (for v8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidColor);
    }

    this.name = "Invalid Color Format";
    this.message = `
${"-".repeat(100)}
"${input}" is not a valid color.
${"-".repeat(100)}

Supported color formats:

- Named colors
- RGB Hex
- Functional RGB
- Functional HSL
- Functional CMYK
- Functional HWB
- Functional CIELAB/CIELCH
- Functional OKLab/OKLCH

Read more about these formats at: https://www.w3.org/TR/css-color-4/
${"=".repeat(100)}
`;
  }
}

function InvalidColorError(input) {
  return new InvalidColor(input);
}
// Invalid Color Handling:1 ends here

// [[file:../Notebook.org::*RGB Hex Extractor][RGB Hex Extractor:1]]
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
// RGB Hex Extractor:1 ends here

// [[file:../Notebook.org::*Functional Format Extractor][Functional Format Extractor:1]]
function componentExtractor(color) {
  return color.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
}
// Functional Format Extractor:1 ends here

// [[file:../Notebook.org::*Extraction Preparation][Extraction Preparation:1]]
function extractor(validated) {
  const [format, color] = validated;

  if (format === "named") {
    return ["hex", hexExtractor(NAMED_COLOR_KEYWORDS[color])];
  }

  if (format === "hex") {
    return ["hex", hexExtractor(color)];
  }

  return [format, componentExtractor(color)];
}
// Extraction Preparation:1 ends here

// [[file:../Notebook.org::*Clamping Values][Clamping Values:1]]
function clamp(x, a, b) {
  if (x < a) {
    return a;
  }

  if (x > b) {
    return b;
  }

  return x;
}
// Clamping Values:1 ends here

// [[file:../Notebook.org::*Hex Fragment <-> Channel][Hex Fragment <-> Channel:1]]
function hexFragmentToChannel(hex) {
  return parseInt(hex, 16);
}

function hexFragmentFromChannel(channel) {
  return clamp(channel, 0, 255).toString(16).padStart(2, "0");
}
// Hex Fragment <-> Channel:1 ends here

// [[file:../Notebook.org::*Number <-> Percentage][Number <-> Percentage:1]]
function numberToPercentage(n) {
  return n * 100;
}

function numberFromPercentage(percentage) {
  return percentage / 100;
}
// Number <-> Percentage:1 ends here

// [[file:../Notebook.org::*Number <-> Channel][Number <-> Channel:1]]
function numberToChannel(n) {
  return Math.round(n * 255);
}

function numberFromChannel(channel) {
  return channel / 255;
}
// Number <-> Channel:1 ends here

// [[file:../Notebook.org::*Hue Component][Hue Component:1]]
function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function radiansFromDegrees(degrees) {
  return (degrees * Math.PI) / 180;
}

function gradiansToDegrees(gradians) {
  return gradians * (180 / 200);
}

function turnsToDegrees(turns) {
  return turns * 360;
}
// Hue Component:1 ends here

// [[file:../Notebook.org::*Hue Correction][Hue Correction:1]]
function hueCorrection(hue) {
  let h = hue;

  if (Math.sign(hue) === -1) {
    h = Math.abs(hue + 360);
  }

  if (hue > 360) {
    h = hue % 360;
  }

  return clamp(h, -360, 360);
}
// Hue Correction:1 ends here

// [[file:../Notebook.org::*Parsing RGB Hex][Parsing RGB Hex:1]]
function parseHex([format, components]) {
  const [r, g, b, A] = components;

  const [R, G, B] = [r, g, b].map((fragment) => hexFragmentToChannel(fragment));

  if (A) {
    return [
      format,
      [R, G, B, numberFromChannel(hexFragmentToChannel(parseFloat(A)))],
    ];
  }

  return [format, [R, G, B, 1]];
}
// Parsing RGB Hex:1 ends here

// [[file:../Notebook.org::*Parsing Functional RGB][Parsing Functional RGB:1]]
function parsePercentage(component) {
  if (component.endsWith("%")) {
    return numberFromPercentage(parseFloat(component));
  }
  return parseFloat(component);
}

function parseRgb([format, components]) {
  const [r, g, b, A] = components;

  const [R, G, B] = [r, g, b].map((channel) => {
    if (channel.endsWith("%")) return parsePercentage(channel);
    return numberFromChannel(parseFloat(channel));
  });

  if (A) {
    return [format, [R, G, B, parsePercentage(A)]];
  }

  return [format, [R, G, B, 1]];
}
// Parsing Functional RGB:1 ends here

// [[file:../Notebook.org::*Parsing Functional HSL][Parsing Functional HSL:1]]
function parseHue(hue) {
  let HUE = parseFloat(hue);

  if (hue.endsWith("rad")) {
    HUE = radiansToDegrees(HUE);
  }

  if (hue.endsWith("grad")) {
    HUE = gradiansToDegrees(HUE);
  }

  if (hue.endsWith("turn")) {
    HUE = turnsToDegrees(HUE);
  }

  return hueCorrection(HUE);
}

function parseHsl([format, components]) {
  const [h, s, l, A] = components;

  let H = parseHue(h);

  const [S, L] = [s, l].map((percentage) =>
    numberFromPercentage(parseFloat(percentage))
  );

  if (A) {
    return [format, [H, S, L, parsePercentage(A)]];
  }

  return [format, [H, S, L, 1]];
}
// Parsing Functional HSL:1 ends here

// [[file:../Notebook.org::*Parsing Functional CMYK][Parsing Functional CMYK:1]]
function parseCMYK([format, components]) {
  const [C, M, Y, K, A] = components.map((V) => {
    if (V.endsWith("%")) return parsePercentage(V);
    return parseFloat(V);
  });

  if (A) {
    return [format, [C, M, Y, K, A]];
  }

  return [format, [C, M, Y, K, 1]];
}
// Parsing Functional CMYK:1 ends here

// [[file:../Notebook.org::*Parsing Functional CIELAB/CIELCH][Parsing Functional CIELAB/CIELCH:1]]
function parseCielab([format, components]) {
  const [$L, $a, $b, A] = components;

  const [L, a, b] = [$L, $a, $b].map((component) => parseFloat(component));

  if (A) {
    return [format, [L, a, b, parsePercentage(A)]];
  }

  return [format, [L, a, b, 1]];
}

function parseCielch([format, components]) {
  const [$L, c, h, A] = components;

  const [L, C] = [$L, c].map((component) => parseFloat(component));
  const H = parseHue(h);

  if (A) {
    return [format, [L, C, H, parsePercentage(A)]];
  }

  return [format, [L, C, H, 1]];
}
// Parsing Functional CIELAB/CIELCH:1 ends here

// [[file:../Notebook.org::*Parsing OKLab/OKLCH][Parsing OKLab/OKLCH:1]]
function parseOklab([format, components]) {
  const [$L, $a, $b, A] = components;

  const L = parsePercentage($L);
  const [a, b] = [$a, $b].map((component) => parseFloat(component));

  if (A) {
    return [format, [L, a, b, parsePercentage(A)]];
  }

  return [format, [L, a, b, 1]];
}

function parseOklch([format, components]) {
  const [$L, c, h, A] = components;

  const L = parsePercentage($L);
  const C = parseFloat(c);
  const H = radiansFromDegrees(parseHue(h));

  if (A) {
    return [format, [L, C, H, parsePercentage(A)]];
  }

  return [format, [L, C, H, 1]];
}
// Parsing OKLab/OKLCH:1 ends here

// [[file:../Notebook.org::*Parsing Preparation][Parsing Preparation:1]]
function parser(extracted) {
  const [format] = extracted;

  const FORMAT_PARSERS = {
    hex: parseHex,
    rgb: parseRgb,
    hsl: parseHsl,
    cmyk: parseCMYK,
    hwb: parseHsl, // identical to HSL
    cielab: parseCielab,
    cielch: parseCielch,
    oklab: parseOklab,
    oklch: parseOklch,
  };

  return FORMAT_PARSERS[format](extracted);
}
// Parsing Preparation:1 ends here

// [[file:../Notebook.org::*RGB <-> RGB][RGB <-> RGB:1]]
function rgbInputIdentity([, values]) {
  const [r, g, b, A] = values;

  const [R, G, B] = [r, g, b].map((channel) => numberToChannel(channel));

  return ["rgb", [R, G, B, A]];
}

function rgbOutputIdentity([, rgbValues]) {
  return ["rgb", rgbValues];
}
// RGB <-> RGB:1 ends here

// [[file:../Notebook.org::*Hex -> RGB][Hex -> RGB:1]]
function hexToRgb([, values]) {
  return ["rgb", values];
}
// Hex -> RGB:1 ends here

// [[file:../Notebook.org::*HSL -> RGB][HSL -> RGB:1]]
function calculateRgb(C, X, H) {
  return new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360],
  ]);
}

function hslToRgb([, values]) {
  const [H, S, L, A] = values;

  // Calculate chroma
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - C / 2;

  const [R, G, B] = Array.from(calculateRgb(C, X, H))
    .find(([, condition]) => condition)
    .flatMap((result) => result)
    .map((n) => numberToChannel(n + m));

  return ["rgb", [R, G, B, A]];
}
// HSL -> RGB:1 ends here

// [[file:../Notebook.org::*CMYK -> RGB][CMYK -> RGB:1]]
function cmykToRgb([, values]) {
  const [C, M, Y, K, A] = values;

  const [R, G, B] = [C, M, Y].map((V) => numberToChannel((1 - V) * (1 - K)));

  return ["rgb", [R, G, B, A]];
}
// CMYK -> RGB:1 ends here

// [[file:../Notebook.org::*HWB -> RGB][HWB -> RGB:1]]
function hwbToRgb([, values]) {
  const [H, W, BLK, A] = values;

  // Achromacity
  if (W + BLK >= 1) {
    let GRAY = numberToChannel(W / (W + BLK));

    return ["rgb", [Array(3).fill(GRAY), A]];
  }

  // Conversion
  const [, [r, g, b]] = hslToRgb(["hsl", [H, 1, 0.5, 1]]);
  const [R, G, B] = [r, g, b].map((channel) =>
    numberToChannel(numberFromChannel(channel) * (1 - W - BLK) + W)
  );

  return ["rgb", [R, G, B, A]];
}
// HWB -> RGB:1 ends here

// [[file:../Notebook.org::*CIELAB -> RGB][CIELAB -> RGB:1]]
function cielabToCiexyz([L, a, b]) {
  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const WHITE = [0.96422, 1.0, 0.82521]; // D50 reference white

  // Compute the values of F
  const FY = (L + 16) / 116;
  const FX = a / 500 + FY;
  const FZ = FY - b / 200;

  // Calculate xyz
  const [X, Y, Z] = [
    FX ** 3 > ε ? FX ** 3 : (116 * FX - 16) / κ,
    L > κ * ε ? FY ** 3 : L / κ,
    FZ ** 3 > ε ? FZ ** 3 : (116 * FZ - 16) / κ,
  ].map((V, i) => V * WHITE[i]);

  return [X, Y, Z];
}

function ciexyzToLrgb([X, Y, Z]) {
  const D65_CHROMATIC_ADAPTATION = [
    [0.9555766, -0.0230393, 0.0631636],
    [-0.0282895, 1.0099416, 0.0210077],
    [0.0122982, -0.020483, 1.3299098],
  ];

  const LINEAR_RGB_TRANSFORMATION_MATRIX = [
    [3.2404542, -1.5371385, -0.4985314],
    [-0.969266, 1.8760108, 0.041556],
    [0.0556434, -0.2040259, 1.0572252],
  ];

  const [CX, CY, CZ] = D65_CHROMATIC_ADAPTATION.map(
    ([V1, V2, V3]) => X * V1 + Y * V2 + Z * V3,
  );

  const [LR, LG, LB] = LINEAR_RGB_TRANSFORMATION_MATRIX.map(
    ([V1, V2, V3]) => CX * V1 + CY * V2 + CZ * V3,
  );

  return [LR, LG, LB];
}

function lrgbToRgb([LR, LG, LB]) {
  return [LR, LG, LB].map((V) =>
    V <= 0.0031308 ? 12.92 * V : 1.055 * V ** (1 / 2.4) - 0.055
  );
}

function cielabToRgb([, values]) {
  const [L, a, b, A] = values;

  const [R, G, B] = lrgbToRgb(ciexyzToLrgb(cielabToCiexyz([L, a, b]))).map(
    (n) => numberToChannel(n),
  );

  return ["rgb", [R, G, B, A]];
}
// CIELAB -> RGB:1 ends here

// [[file:../Notebook.org::*OKLAB -> RGB][OKLAB -> RGB:1]]
function oklabToLrgb([L, a, b]) {
  const LINEAR_LMS_CONE_ACTIVATIONS = [
    [0.3963377774, 0.2158037573],
    [0.1055613458, 0.0638541728],
    [0.0894841775, 1.291485548],
  ];

  const OKLAB_TO_LRGB_MATRIX = [
    [4.076416621, 3.3077115913, 0.2309699292],
    [-1.2684380046, 2.6097574011, 0.3413193965],
    [-0.0041960863, 0.7034186147, 1.707614701],
  ];

  const [LONG, M, S] = LINEAR_LMS_CONE_ACTIVATIONS.map(([V1, V2], pos) => {
    if (pos === 0) return L + a * V1 + b * V2;
    if (pos === 1) return L - a * V1 - b * V2;
    return L - a * V1 - b * V2;
  }).map((V) => V ** 3);

  const [LR, LG, LB] = OKLAB_TO_LRGB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return LONG * V1 - M * V2 + S * V3;
    if (pos === 1) return LONG * V1 + M * V2 - S * V3;
    return LONG * V1 - M * V2 + S * V3;
  });

  return [LR, LG, LB];
}

function oklabToRgb([, values]) {
  const [L, a, b, A] = values;

  const [R, G, B] = lrgbToRgb(oklabToLrgb([L, a, b])).map((n) =>
    numberToChannel(n)
  );

  return ["rgb", [R, G, B, A]];
}
// OKLAB -> RGB:1 ends here

// [[file:../Notebook.org::*RGB -> Hex][RGB -> Hex:1]]
function hexFromRgb([, rgbValues]) {
  const [r, g, b, a] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => hexFragmentFromChannel(channel));
  const A = hexFragmentFromChannel(numberToChannel(a));

  return ["hex", [R, G, B, A]];
}
// RGB -> Hex:1 ends here

// [[file:../Notebook.org::*RGB -> HSL][RGB -> HSL:1]]
function calculateHue(R, G, B, cmax, delta) {
  return new Map([
    [0, delta === 0],
    [60 * (((G - B) / delta) % 6), cmax === R],
    [60 * ((B - R) / delta + 2), cmax === G],
    [60 * ((R - G) / delta + 4), cmax === B],
  ]);
}

function calculateSaturation(delta, L) {
  return delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));
}

function calculateLightness(cmin, cmax) {
  return (cmax + cmin) / 2;
}

function hslFromRgb([, rgbValues]) {
  const [r, g, b, A] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => numberFromChannel(channel));

  const cmin = Math.min(R, G, B);
  const cmax = Math.max(R, G, B);
  const delta = cmax - cmin;

  const L = calculateLightness(cmin, cmax);
  const [H] = Array.from(calculateHue(R, G, B, cmax, delta)).find(
    ([, condition]) => condition,
  );
  const S = calculateSaturation(delta, L);

  return ["hsl", [H, S, L, A]];
}
// RGB -> HSL:1 ends here

// [[file:../Notebook.org::*RGB -> CMYK][RGB -> CMYK:1]]
function cmykFromRgb([, rgbValues]) {
  const [r, g, b, A] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => numberFromChannel(channel));

  const K = 1 - Math.max(R, G, B);
  const [C, M, Y] = [R, G, B].map((channel) => (1 - channel - K) / (1 - K));

  return ["cmyk", [C, M, Y, K, A]];
}
// RGB -> CMYK:1 ends here

// [[file:../Notebook.org::*RGB -> HWB][RGB -> HWB:1]]
function hwbFromRgb([, rgbValues]) {
  const [r, g, b, A] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => numberFromChannel(channel));

  const cmax = Math.max(R, G, B);
  const cmin = Math.min(R, G, B);
  const delta = cmax - cmin;

  const [H] = Array.from(calculateHue(R, G, B, cmax, delta)).find(
    ([, condition]) => condition,
  );

  const [W, BLK] = [cmin, 1 - cmax];

  return ["hwb", [H, W, BLK, A]];
}
// RGB -> HWB:1 ends here

// [[file:../Notebook.org::*RGB -> CIELAB][RGB -> CIELAB:1]]
function rgbToLrgb([R, G, B]) {
  return [R, G, B].map((V) =>
    V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4
  );
}

function lrgbToCiexyz([LR, LG, LB]) {
  const D65_REFERENCE_WHITE = [
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.072175],
    [0.0193339, 0.119192, 0.9503041],
  ];

  const D50_CHROMATIC_ADAPTATION = [
    [1.0478112, 0.0228866, -0.050127],
    [0.0295424, 0.9904844, -0.0170491],
    [-0.0092345, 0.0150436, 0.7521316],
  ];

  const [x, y, z] = D65_REFERENCE_WHITE.map(
    ([V1, V2, V3]) => LR * V1 + LG * V2 + LB * V3,
  );

  const [X, Y, Z] = D50_CHROMATIC_ADAPTATION.map(
    ([V1, V2, V3]) => x * V1 + y * V2 + z * V3,
  );

  return [X, Y, Z];
}

function ciexyzToCielab([X, Y, Z]) {
  // CIE standards
  const ε = 216 / 24389;
  const κ = 24389 / 27;
  const D50_WHITE = [0.96422, 1.0, 0.82521];

  // Calculating F for each value
  const [FX, FY, FZ] = [X, Y, Z]
    .map((V, i) => V / D50_WHITE[i])
    .map((V) => (V > ε ? Math.cbrt(V) : (κ * V + 16) / 116));

  const [L, a, b] = [116 * FY - 16, 500 * (FX - FY), 200 * (FY - FZ)];

  return [L, a, b];
}

function cielabFromRgb([, rgbValues]) {
  const [r, g, $b, A] = rgbValues;

  const [R, G, B] = [r, g, $b].map((channel) => numberFromChannel(channel));
  const [L, a, b] = ciexyzToCielab(lrgbToCiexyz(rgbToLrgb([R, G, B])));

  return ["cielab", [L, a, b, A]];
}
// RGB -> CIELAB:1 ends here

// [[file:../Notebook.org::*RGB -> OKLAB][RGB -> OKLAB:1]]
function lrgbToOklab([LR, LG, LB]) {
  const NONLINEAR_LMS_CONE_ACTIVATIONS = [
    [0.4122214708, 0.5363325363, 0.0514459929],
    [0.2119034982, 0.6806995451, 0.1073969566],
    [0.0883024619, 0.2817188376, 0.6299787005],
  ];

  const RGB_OKLAB_MATRIX = [
    [0.2104542553, 0.793617785, 0.0040720468],
    [1.9779984951, 2.428592205, 0.4505937099],
    [0.0259040371, 0.7827717662, 0.808675766],
  ];

  const [L, M, S] = NONLINEAR_LMS_CONE_ACTIVATIONS.map(
    ([L, M, S]) => L * LR + M * LG + S * LB,
  ).map((V) => Math.cbrt(V));

  return RGB_OKLAB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return V1 * L + V2 * M - V3 * S;
    if (pos === 1) return V1 * L - V2 * M + V3 * S;
    return V1 * L + V2 * M - V3 * S;
  });
}

function oklabFromRgb([, rgbValues]) {
  const [r, g, $b, A] = rgbValues;

  const [R, G, B] = [r, g, $b].map((channel) => numberFromChannel(channel));
  const [L, a, b] = lrgbToOklab(rgbToLrgb([R, G, B]));

  return ["oklab", [L, a, b, A]];
}
// RGB -> OKLAB:1 ends here

// [[file:../Notebook.org::*SCALAR <-> POLAR][SCALAR <-> POLAR:1]]
function scalarToPolar([, scalarValues]) {
  const [L, a, b, A] = scalarValues;

  const C = Math.sqrt(a ** 2 + b ** 2);
  const H = Math.atan2(b, a);

  return [L, C, H, A];
}

function scalarFromPolar([, polarValues]) {
  const [L, C, H, A] = polarValues;

  const a = C * Math.cos(H);
  const b = C * Math.sin(H);

  return [L, a, b, A];
}
// SCALAR <-> POLAR:1 ends here

// [[file:../Notebook.org::*CIELAB <-> CIELCH][CIELAB <-> CIELCH:1]]
function cielabToCielch([, cielabValues]) {
  return ["cielch", scalarToPolar(["cielab", cielabValues])];
}

function cielabFromCielch([, cielchValues]) {
  return ["cielab", scalarFromPolar(["cielch", cielchValues])];
}
// CIELAB <-> CIELCH:1 ends here

// [[file:../Notebook.org::*OKLab <-> OKLCH][OKLab <-> OKLCH:1]]
function oklabToOklch([, oklabValues]) {
  return ["oklch", scalarToPolar(["oklab", oklabValues])];
}

function oklabFromOklch([, oklchValues]) {
  return ["oklab", scalarFromPolar(["oklch", oklchValues])];
}
// OKLab <-> OKLCH:1 ends here

// [[file:../Notebook.org::*Color Conversion Pipeline][Color Conversion Pipeline:1]]
function _convert(color, to) {
  // Let's make the pathway explicit
  const valid = validator(color);
  const extraction = extractor(valid);
  const [format, values] = parser(extraction);

  // Takes the input and formats it to RGB depending on format
  const INPUT_TO_RGB = (input) => ({
    named: hexToRgb(input),
    hex: hexToRgb(input),
    rgb: rgbInputIdentity(input), // identity
    hsl: hslToRgb(input),
    cmyk: cmykToRgb(input),
    hwb: hwbToRgb(input),
    cielab: cielabToRgb(input),
    cielch: cielabToRgb(cielabFromCielch(input)),
    oklab: oklabToRgb(input),
    oklch: oklabToRgb(oklabFromOklch(input)),
  });

  // Takes the RGB and formats to output target
  const RGB_TO_OUTPUT = (rgb) => ({
    hex: hexFromRgb(rgb),
    rgb: rgbOutputIdentity(rgb), // identity
    hsl: hslFromRgb(rgb),
    cmyk: cmykFromRgb(rgb),
    hwb: hwbFromRgb(rgb),
    cielab: cielabFromRgb(rgb),
    cielch: cielabToCielch(cielabFromRgb(rgb)),
    oklab: oklabFromRgb(rgb),
    oklch: oklabToOklch(oklabFromRgb(rgb)),
  });

  // Construct the pipeline
  const OUTPUT = RGB_TO_OUTPUT(INPUT_TO_RGB([format, values])[format])[to];

  return OUTPUT;
}
// Color Conversion Pipeline:1 ends here

// [[file:../Notebook.org::*Serializing RGB Hex][Serializing RGB Hex:1]]
function serializeHex([, hexResult]) {
  const [R, G, B, A] = hexResult;

  if (A === "ff") {
    return "#".concat(R, G, B);
  }
  return "#".concat(R, G, B, A);
}
// Serializing RGB Hex:1 ends here

// [[file:../Notebook.org::*Serializing Functional Formats][Serializing Functional Formats:1]]
function serializeFunctional_Convert({ prefix, legacy = true }, components) {
  const DELIMITER = legacy ? ", " : " ";
  const ALPHA_DELIMITER = legacy ? ", " : " / ";

  // Coercing the result of toFixed() to a number preserves precision while removing trailing zeroes.
  const isOpaque = components[components.length - 1] === 1;
  const values = components.slice(0, components.length - 1);
  const alpha = (+components.slice(-1)).toFixed(3);

  return (legacy && !isOpaque ? `${prefix}a(` : `${prefix}(`).concat(
    values.join(DELIMITER),
    isOpaque ? "" : ALPHA_DELIMITER.concat(alpha),
    ")",
  );
}
// Serializing Functional Formats:1 ends here

// [[file:../Notebook.org::*Serializing RGB][Serializing RGB:1]]
function serializeRgb([, rgbResult]) {
  const [r, g, b, A] = rgbResult;

  // Clamp RGB channels 0-255
  const [R, G, B] = [r, g, b].map(
    (component) => +clamp(component, 0, 255).toFixed(3),
  );

  return serializeFunctional_Convert({ prefix: "rgb" }, [R, G, B, A]);
}
// Serializing RGB:1 ends here

// [[file:../Notebook.org::*Serializing HSL][Serializing HSL:1]]
function serializeHsl([, hslResult]) {
  const [h, s, l, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // format saturation, lightness to percentages
  const [S, L] = [s, l].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctional_Convert({ prefix: "hsl" }, [H, S, L, A]);
}
// Serializing HSL:1 ends here

// [[file:../Notebook.org::*Serializing CMYK][Serializing CMYK:1]]
function serializeCmyk([, cmykResult]) {
  const [c, m, y, k, A] = cmykResult;

  // Format to percentage, cap at 0-100
  const [C, M, Y, K] = [c, m, y, k].map(
    (n) =>
      `${+clamp(numberToPercentage(isNaN(n) ? 0 : n), 0, 100).toFixed(3)}%`,
  );

  return serializeFunctional_Convert({ prefix: "device-cmyk", legacy: false }, [
    C,
    M,
    Y,
    K,
    A,
  ]);
}
// Serializing CMYK:1 ends here

// [[file:../Notebook.org::*Serializing HWB][Serializing HWB:1]]
function serializeHwb([, hslResult]) {
  const [h, w, blk, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // format white, black to percentages
  const [W, BLK] = [w, blk].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctional_Convert({ prefix: "hwb", legacy: false }, [
    H,
    W,
    BLK,
    A,
  ]);
}
// Serializing HWB:1 ends here

// [[file:../Notebook.org::*Serializing CIELAB/CIELCH][Serializing CIELAB/CIELCH:1]]
function serializeCielab([, cielabValues]) {
  const [$L, $a, $b, A] = cielabValues;

  // Clamp lightness at 0-100
  const L = `${+clamp($L, 0, 100).toFixed(3)}%`;

  // Clamp a, b at ±127
  const [a, b] = [$a, $b].map((n) => +clamp(n, -127, 127).toFixed(3));

  return serializeFunctional_Convert({ prefix: "lab", legacy: false }, [
    L,
    a,
    b,
    A,
  ]);
}

function serializeCielch([, cielchValues]) {
  const [$L, c, h, A] = cielchValues;

  // Clamp lightness at 0-100
  const L = `${+clamp($L, 0, 100).toFixed(3)}%`;

  // Clamp chroma at 0-132
  const C = +clamp(c, 0, 132).toFixed(3);

  let H = h;

  // Hue is powerless if chroma is 0
  if (C === 0) {
    H = 0;
  } else {
    // Otherwise, format hue to degrees, correct hue
    H = +hueCorrection(radiansToDegrees(h)).toFixed(3);
  }

  return serializeFunctional_Convert({ prefix: "lch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}
// Serializing CIELAB/CIELCH:1 ends here

// [[file:../Notebook.org::*Serializing OKLab/OKLCH][Serializing OKLab/OKLCH:1]]
function serializeOklab([, oklabValues]) {
  const [$L, $a, $b, A] = oklabValues;

  // Format number to percentage, clamp at 0-100
  const L = `${+clamp(numberToPercentage($L), 0, 100).toFixed(3)}%`;

  // Clamp a, b at ±0.5
  const [a, b] = [$a, $b].map((n) => +clamp(n, -0.5, 0.5).toFixed(5));

  return serializeFunctional_Convert({ prefix: "oklab", legacy: false }, [
    L,
    a,
    b,
    A,
  ]);
}

function serializeOklch([, oklchValues]) {
  const [$L, c, h, A] = oklchValues;

  // Format lightness to percentage, clamp at 0-100
  const L = `${+clamp(numberToPercentage($L), 0, 100).toFixed(3)}%`;

  // Clamp chroma at 0-0.5
  const C = +clamp(c, 0, 0.5).toFixed(5);

  let H = h;

  // Hue is powerless if chroma is 0
  if (C === 0) {
    H = 0;
  } else {
    // Otherwise, format hue to degrees, correct hue
    H = +hueCorrection(radiansToDegrees(h)).toFixed(3);
  }

  return serializeFunctional_Convert({ prefix: "oklch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}
// Serializing OKLab/OKLCH:1 ends here

// [[file:../Notebook.org::*Serialization Interface][Serialization Interface:1]]
function serialize([format, results]) {
  const serializers = {
    hex: serializeHex,
    rgb: serializeRgb,
    hsl: serializeHsl,
    cmyk: serializeCmyk,
    hwb: serializeHwb,
    cielab: serializeCielab,
    cielch: serializeCielch,
    oklab: serializeOklab,
    oklch: serializeOklch,
  };

  return serializers[format]([format, results]);
}
// Serialization Interface:1 ends here

// [[file:../Notebook.org::*Color Adjustment Through OKLCH][Color Adjustment Through OKLCH:1]]
function extractOklchValues(color) {
  const formatedOklch = serializeOklch(_convert(color, "oklch"));
  const [, components] = extractor(["oklch", formatedOklch]);

  return components.map((V) => parseFloat(V));
}

function adjustColorProperties(
  { lightness, chroma, hue, alpha },
  [l, c, h, a],
) {
  // Adjust properties only if defined, make values parseable
  let L = numberFromPercentage(lightness ? l + lightness : l);
  let C = chroma ? c + numberFromPercentage(chroma) * 0.5 * 0.5 : c;
  let H = radiansFromDegrees(hue ? hueCorrection(h + hue) : h);
  let A = alpha ? (a ?? 1) + numberFromPercentage(alpha) : a ?? 1;

  // Return adjusted values
  return [L, C, H, A];
}

function serializeInput([format, values]) {
  const SERIALIZATION_TARGETS = {
    hex: serializeHex,
    rgb: serializeRgb,
    hsl: serializeHsl,
    cmyk: serializeCmyk,
    hwb: serializeHwb,
    cielab: serializeCielab,
    cielch: serializeCielch,
    oklab: serializeOklab,
    oklch: serializeOklch,
  };

  return SERIALIZATION_TARGETS[format]([format, values]);
}

function colorAdjustment(
  { lightness = 0, chroma = 0, hue = 0, alpha = 0 },
  color,
) {
  // Ensure color is valid and store its format
  const [format] = validator(color);

  // Extract its OKLCH values
  const values = extractOklchValues(color);

  // Adjust target properties
  const [L, C, H, A] = adjustColorProperties(
    { lightness, chroma, hue, alpha },
    values,
  );

  // Serialize oklch result
  const oklch = serializeOklch(["oklch", [L, C, H, A]]);

  // If input format is named, format to hex
  if (format === "named") {
    return serializeInput(_convert(oklch, "hex"));
  }

  // Otherwise use input format
  return serializeInput(_convert(oklch, format));
}
// Color Adjustment Through OKLCH:1 ends here

// [[file:../Notebook.org::*Color Mixture Through OKLab][Color Mixture Through OKLab:1]]
function getOklabValues(color) {
  return _convert(color, "oklab");
}

function calculateMixture(color, target, strength) {
  // format blend target and input color to OKLab
  const [, [$L, $a, $b, $A]] = getOklabValues(color);
  const [, [$$L, $$a, $$b, $$A]] = getOklabValues(target);

  // calculate the blend result
  const [L, a, b, A] = [
    [$L, $$L],
    [$a, $$a],
    [$b, $$b],
    [$A, $$A],
  ].map(([X, Y]) => {
    // if -strength, blend FROM target
    // --------------------------------------------------------------
    // Note: Object.is() is a handy way to explicitly check for a strength of -0, which
    // should also trigger a blend inversion. This is not caught by Math.sign() alone,
    // because the way JS treats signed zeroes is identical.
    //
    // Which also means `Math.sign(strength) === -0` didn't work either.
    if (Math.sign(strength) === -1 || Object.is(strength, -0)) {
      return Y + (X - Y) * Math.abs(strength);
    }

    // Otherwise, blend TO target
    return X + (Y - X) * strength;
  });

  return [L, a, b, A];
}

function colorMix({ target, strength = 0 }, color) {
  // Validate input color and store its format
  const [format] = validator(color);

  // Calculate blend
  const [L, a, b, A] = calculateMixture(
    color,
    target,
    numberFromPercentage(strength),
  );

  // Serialize the blend result
  const oklab = serializeOklab(["oklab", [L, a, b, A]]);

  if (format === "named") {
    return serializeInput(_convert(oklab, "hex"));
  }

  return serializeInput(_convert(oklab, format));
}
// Color Mixture Through OKLab:1 ends here

// [[file:../Notebook.org::*CVD Brettel Simulation][CVD Brettel Simulation:1]]
function cvdBrettelSimulation({ type, strength = 100 }, color) {
  // Parse values from RGB
  const [, [r, g, b, A]] = parser(
    extractor(["rgb", serializeRgb(_convert(color, "rgb"))]),
  );

  // Format RGB to linear RGB
  const [LR, LG, LB] = rgbToLrgb([r, g, b]);

  // Set up the Brettel simulation matrices
  const brettel = {
    protanope: {
      a: [
        0.1498,
        1.19548,
        -0.34528,
        0.10764,
        0.84864,
        0.04372,
        0.00384,
        -0.0054,
        1.00156,
      ],
      b: [
        0.1457,
        1.16172,
        -0.30742,
        0.10816,
        0.85291,
        0.03892,
        0.00386,
        -0.00524,
        1.00139,
      ],
      n: [0.00048, 0.00393, -0.00441],
    },
    deuteranope: {
      a: [
        0.36477,
        0.86381,
        -0.22858,
        0.26294,
        0.64245,
        0.09462,
        -0.02006,
        0.02728,
        0.99278,
      ],
      b: [
        0.37298,
        0.88166,
        -0.25464,
        0.25954,
        0.63506,
        0.1054,
        -0.0198,
        0.02784,
        0.99196,
      ],
      n: [-0.00281, -0.00611, 0.00892],
    },
    tritanope: {
      a: [
        1.01277,
        0.13548,
        -0.14826,
        -0.01243,
        0.86812,
        0.14431,
        0.07589,
        0.805,
        0.11911,
      ],
      b: [
        0.93678,
        0.18979,
        -0.12657,
        0.06154,
        0.81526,
        0.1232,
        -0.37562,
        1.12767,
        0.24796,
      ],
      n: [0.03901, -0.02788, -0.01113],
    },
  };

  // Determine which plane to use
  const { a: $a, b: $b, n } = brettel[type];
  const dotWithSepPlane = LR * n[0] + LG * n[1] + LB * n[2];
  const p = dotWithSepPlane >= 0 ? $a : $b;

  // Apply the dichromatic confusion line adjusted for severity,
  // then format back to sRGB
  const [R, G, B] = lrgbToRgb(
    [
      [p[0] * LR + p[1] * LG + p[2] * LB, LR],
      [p[3] * LR + p[4] * LG + p[5] * LB, LG],
      [p[6] * LR + p[7] * LG + p[8] * LB, LB],
    ].map(([cvdComponent, component]) => {
      const severity = numberFromPercentage(strength);

      return cvdComponent * severity + component * (1 - severity);
    }),
  );

  return [R, G, B, A];
}
// CVD Brettel Simulation:1 ends here

// [[file:../Notebook.org::*CVD Vienot Simulation][CVD Vienot Simulation:1]]
function cvdVienotSimulation({ type, strength = 100 }, color) {
  // Parse values from RGB
  const [, [r, g, b, A]] = parser(
    extractor(["rgb", serializeRgb(_convert(color, "rgb"))]),
  );

  // Format RGB to linear RGB
  const [LR, LG, LB] = rgbToLrgb([r, g, b]);

  // Right off the bat, if the type is "tritanope", use the Brettel method
  if (type === "tritanope") {
    return cvdBrettelSimulation({ type, strength }, color);
  }

  // Otherwise use the correct transformation matrix

  const vienot = {
    protanope: [
      0.11238,
      0.88762,
      0.0,
      0.11238,
      0.88762,
      -0.0,
      0.00401,
      -0.00401,
      1.0,
    ],
    deuteranope: [
      0.29275,
      0.70725,
      0.0,
      0.29275,
      0.70725,
      -0.0,
      -0.02234,
      0.02234,
      1.0,
    ],
  };

  // Vienot 1999 uses a single plane
  const p = vienot[type];

  // Apply the dichromatic confusion line adjusted for severity,
  // then format back to sRGB
  const [R, G, B] = lrgbToRgb(
    [
      [p[0] * LR + p[1] * LG + p[2] * LB, LR],
      [p[3] * LR + p[4] * LG + p[5] * LB, LG],
      [p[6] * LR + p[7] * LG + p[8] * LB, LB],
    ].map(([cvdComponent, component]) => {
      const severity = numberFromPercentage(strength);

      return cvdComponent * severity + component * (1 - severity);
    }),
  );

  return [R, G, B, A];
}
// CVD Vienot Simulation:1 ends here

// [[file:../Notebook.org::*Color Vision Deficiency Interface][Color Vision Deficiency Interface:1]]
function checkColorblindness(
  { method = "brettel", type, strength = 0 },
  color,
) {
  // Validate input color and store result
  const [format] = validator(color);

  let values = [];

  // Prefer the "brettel" method for accuracy
  if (method === "brettel") {
    values = cvdBrettelSimulation({ type, strength }, color);
  }

  // Prefer "vienot" under special cases and for performance
  if (method === "vienot") {
    values = cvdVienotSimulation({ type, strength }, color);
  }

  // Serialize RGB, but leave the alpha alone
  const rgb = serializeRgb([
    "rgb",
    values.map((component, index) =>
      index !== 3 ? numberToChannel(component) : component
    ),
  ]);

  if (format === "named") {
    return serializeInput(_convert(rgb, "hex"));
  }

  return serializeInput(_convert(rgb, format));
}
// Color Vision Deficiency Interface:1 ends here

// [[file:../Notebook.org::*Contrast Sensitivity][Contrast Sensitivity:1]]
function checkSensitivity({ contrast = 0, strength = 0 }, color) {
  // Derive contrast from a shade of gray
  const GRAY = colorMix(
    {
      target: "white",
      strength: 100 * numberFromPercentage(contrast),
    },
    "black",
  );

  // Mix resultant gray with input color
  return colorMix(
    {
      target: GRAY,
      strength: 100 * numberFromPercentage(strength),
    },
    color,
  );
}
// Contrast Sensitivity:1 ends here

// [[file:../Notebook.org::*Correlated Color Temperature (CCT)][Correlated Color Temperature (CCT):1]]
function kelvinToRgb(temperature) {
  // The accurate range for this algorithm is 1000-40000K
  // and K / 100 is required
  const K = clamp(temperature, 1000, 40000) / 100;

  // Initialize RGB
  let R = 0;
  let G = 0;
  let B = 0;

  // If K <66, R locks at 255
  if (K <= 66) {
    R = 255;
    G = 99.4708025861 * Math.log(K) - 161.1195681661;

    // B locks at 0 when K <19
    if (K <= 19) {
      B = 0;
    } else {
      B = 138.577412231 * Math.log(K - 10) - 305.0447927307;
    }
  } else {
    // Otherwise K >66
    R = 329.698727446 * (K - 60) ** -0.1332047592;
    G = 288.1221695283 * (K - 60) ** -0.0755148492;
    B = 255;
  }

  // Serialize RGB
  return serializeRgb(["rgb", [R, G, B, 1]]);
}

function checkIlluminant({ temperature = 1000, strength = 0 }, color) {
  const target = kelvinToRgb(temperature);

  return colorMix({ target, strength }, color);
}
// Correlated Color Temperature (CCT):1 ends here

// [[file:../Notebook.org::*Color Interpolation][Color Interpolation:1]]
function colorInterpolation(action, settings, input) {
  // Set default for shared step property
  const { steps = 1 } = settings;

  // Fill an array with a length of steps with the input color
  return [
    ...new Set(
      Array(steps)
        .fill(input)
        .map((color, pos) => {
          // General interpolation formula
          const interpolate = (property, index) =>
            property - (property / steps) * index;

          // Store result
          let result = "";

          // Now, we vary the behavior here based on the name of the action
          if (action.name === "colorAdjustment") {
            // Destructure unique properties
            const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = settings;

            result = colorAdjustment(
              {
                lightness: interpolate(lightness, pos),
                chroma: interpolate(chroma, pos),
                hue: interpolate(hue, pos),
                alpha: interpolate(alpha, pos),
              },
              color,
            );
          }

          if (action.name === "colorMix") {
            // Destructure unique properties
            const { strength = 0, target = color } = settings;

            result = colorMix(
              { strength: interpolate(strength, pos), target },
              color,
            );
          }

          if (action.name === "simulateColorblindness") {
            const { method = "brettel", type, strength = 0 } = settings;

            result = simulateColorblindness(
              {
                method,
                type,
                strength: interpolate(strength, pos),
              },
              color,
            );
          }

          if (action.name === "simulateSensitivity") {
            const { contrast = 0, strength = 0 } = settings;

            result = simulateSensitivity(
              {
                contrast: interpolate(contrast, pos),
                strength: interpolate(strength, pos),
              },
              color,
            );
          }

          if (action.name === "simulateIlluminant") {
            const { temperature = 1000, strength = 0 } = settings;

            result = simulateIlluminant(
              {
                temperature: interpolate(temperature, pos),
                strength: interpolate(strength, pos),
              },
              color,
            );
          }

          return result;
        }),
    ),
  ].reverse();
}
// Color Interpolation:1 ends here

// [[file:../Notebook.org::*Color Harmonies][Color Harmonies:1]]
function colorHarmonies({ type, accented = false }, color) {
  const withComplement = accented ? [colorAdjustment({ hue: 180 }, color)] : [];

  const harmonies = {
    dyadic: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 30 }, color),
      ...withComplement,
    ],
    complementary: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 180 }, color),
    ],
    analogous: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 30 }, color),
      colorAdjustment({ hue: 30 * 2 }, color),
      ...withComplement,
    ],
    split: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 180 - 30 }, color),
      ...withComplement,
      colorAdjustment({ hue: 180 + 30 }, color),
    ],
    clash: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 90 }, color),
      colorAdjustment({ hue: 90 * 3 }, color),
    ],
    triadic: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 120 }, color),
      ...withComplement,
      colorAdjustment({ hue: 120 * 2 }, color),
    ],
    double: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 30 }, color),
      colorAdjustment({ hue: 180 }, color),
      colorAdjustment({ hue: 180 + 30 }, color),
    ],
    tetradic: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 45 }, color),
      colorAdjustment({ hue: 180 }, color),
      colorAdjustment({ hue: 180 + 45 }, color),
    ],
    square: [
      colorAdjustment({ hue: 0 }, color),
      colorAdjustment({ hue: 90 }, color),
      colorAdjustment({ hue: 90 * 2 }, color),
      colorAdjustment({ hue: 90 * 3 }, color),
    ],
  };

  return harmonies[type];
}
// Color Harmonies:1 ends here

// [[file:../Notebook.org::*Material Configuration][Material Configuration:1]]
function materialConfiguration(
  { contrast = 100, accented = false, stated = false },
  color,
) {
  // [bg, fg]
  const ui = [
    colorMix(
      { target: "#fff", strength: 100 * numberFromPercentage(contrast) },
      color,
    ),
    colorMix(
      { target: "#111", strength: 100 * numberFromPercentage(contrast) },
      color,
    ),
  ];

  // [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const variants = [
    ...colorInterpolation(
      colorMix,
      {
        target: "#fff",
        strength: 90 * numberFromPercentage(contrast),
        steps: 6,
      },
      color,
    ).reverse(),
    ...colorInterpolation(
      colorMix,
      {
        target: "#111",
        strength: 90 * numberFromPercentage(contrast),
        steps: 4,
      },
      color,
    ),
  ];

  // [A100, A200, A300, A400]
  const accents = accented
    ? [
      colorAdjustment(
        {
          lightness: 25 * numberFromPercentage(contrast),
          chroma: -50,
          hue: -15,
        },
        color,
      ),
      colorAdjustment(
        { chroma: -25 * numberFromPercentage(contrast), hue: -15 },
        color,
      ),
      colorAdjustment(
        {
          lightness: 25 * numberFromPercentage(contrast),
          chroma: 50,
          hue: -15,
        },
        color,
      ),
      colorAdjustment(
        {
          lightness: -25 * numberFromPercentage(contrast),
          chroma: 50,
          hue: 15,
        },
        color,
      ),
    ]
    : [];

  // [PENDING, SUCCESS, WARNING, ERROR]
  const states = stated
    ? [
      colorMix({ target: "gainsboro", strength: 90 }, color),
      colorMix({ target: "forestgreen", strength: 90 }, color),
      colorMix({ target: "goldenrod", strength: 90 }, color),
      colorMix({ target: "firebrick", strength: 90 }, color),
    ]
    : [];

  return [ui, [variants, accents], states];
}
// Material Configuration:1 ends here

// [[file:../Notebook.org::*Artistic Configuration][Artistic Configuration:1]]
function artisticConfiguration(
  { contrast = 100, tints = 3, tones = 3, shades = 3, stated = false },
  color,
) {
  // [bg, fg]
  const ui = [
    colorMix(
      { target: "#fff", strength: 100 * numberFromPercentage(contrast) },
      color,
    ),
    colorMix(
      { target: "#111", strength: 100 * numberFromPercentage(contrast) },
      color,
    ),
  ];

  // [tints[], tones[], shades[]]
  const variants = [
    tints
      ? colorInterpolation(
        colorMix,
        {
          target: "#fff",
          strength: 90 * numberFromPercentage(contrast),
          steps: tints,
        },
        color,
      )
      : [],
    tones
      ? colorInterpolation(
        colorMix,
        {
          target: "#aaa",
          strength: 90 * numberFromPercentage(contrast),
          steps: tones,
        },
        color,
      )
      : [],
    shades
      ? colorInterpolation(
        colorMix,
        {
          target: "#111",
          strength: 90 * numberFromPercentage(contrast),
          steps: shades,
        },
        color,
      )
      : [],
  ];

  // [PENDING, SUCCESS, WARNING, ERROR]
  const states = stated
    ? [
      colorMix({ target: "gainsboro", strength: 90 }, color),
      colorMix({ target: "forestgreen", strength: 90 }, color),
      colorMix({ target: "goldenrod", strength: 90 }, color),
      colorMix({ target: "firebrick", strength: 90 }, color),
    ]
    : [];

  return [ui, variants, states];
}
// Artistic Configuration:1 ends here

// [[file:../Notebook.org::*WCAG Color Contrast Ratios][WCAG Color Contrast Ratios:1]]
function calculateRelativeLuminance(color) {
  const [, [R, G, B]] = parser(
    extractor(["rgb", serializeRgb(_convert(color, "rgb"))]),
  );

  const [LR, LG, LB] = rgbToLrgb([R, G, B]);

  return 0.2126 * LR + 0.7152 * LG + 0.0722 * LB;
}

function calculateWCAGContrastRatio(a, b) {
  return [a, b]
    .map((color) => calculateRelativeLuminance(color))
    .sort((a, b) => b - a)
    .map((LUM) => LUM + 0.05)
    .reduce((L1, L2) => L1 / L2);
}

function wcagContrastCriteria({ rating, large }, ratio) {
  return new Map([
    // minimum
    ["AA", large ? ratio >= 3.1 : ratio >= 4.5],
    // enhanced
    ["AAA", large ? ratio >= 4.5 : ratio > 7.1],
  ]).get(rating);
}

function variantContrastWcag({ rating, large, background }, variants) {
  const valid = (collection) =>
    collection.filter((foreground) => {
      const ratio = calculateWCAGContrastRatio(background, foreground);
      return wcagContrastCriteria({ rating, large }, ratio);
    });

  const optional = (fn, collection) => collection.length ? fn(collection) : [];

  if (variants.length === 2) {
    const [main, accents] = variants;

    return [valid(main), optional(valid, accents)];
  }

  const [tints, tones, shades] = variants;

  return [
    optional(valid, tints),
    optional(valid, tones),
    optional(valid, shades),
  ];
}

function paletteWcagContrast({ rating = "AA", large, dark = false }, palette) {
  // Extract palette datasets
  const [ui, variants, state] = palette;
  const [bg, fg] = ui;

  if (dark) {
    // Invert order of [bg, fg]
    const [fg, bg] = ui;
    return [
      [bg, fg],
      variantContrastWcag({ rating, large, background: bg }, variants),
      state,
    ];
  }

  return [
    [bg, fg],
    variantContrastWcag({ rating, large, background: bg }, variants),
    state,
  ];
}
// WCAG Color Contrast Ratios:1 ends here

// [[file:../Notebook.org::*Colorimetric Contrast][Colorimetric Contrast:1]]
function comparePerceptualLightness(bg, fg) {
  const [, bgValues] = extractor([
    "oklch",
    serializeOklch(_convert(bg, "oklch")),
  ]);
  const [, fgValues] = extractor([
    "oklch",
    serializeOklch(_convert(fg, "oklch")),
  ]);

  const [bL] = bgValues.map((V) => parseFloat(V));
  const [fL] = fgValues.map((V) => parseFloat(V));

  return numberToPercentage(Math.abs((bL - fL) / 100));
}

function filterCondition({ min, max }, difference) {
  return max ? difference >= min && difference <= max : difference >= min;
}

function variantsColorimetricContrast({ min, max, background }, variants) {
  const valid = (collection) =>
    collection.filter((foreground) => {
      const difference = comparePerceptualLightness(background, foreground);

      return filterCondition({ min, max }, difference);
    });

  const optional = (fn, collection) => collection.length ? fn(collection) : [];

  if (variants.length === 2) {
    const [main, accents] = variants;

    return [valid(main), optional(valid, accents)];
  }

  const [tints, tones, shades] = variants;

  return [
    optional(valid, tints),
    optional(valid, tones),
    optional(valid, shades),
  ];
}

function paletteColorimetricContrast({ min = 75, max, dark = false }, palette) {
  const [ui, variants, state] = palette;
  const [bg, fg] = ui;

  if (dark) {
    const [fg, bg] = ui;

    return [
      [bg, fg],
      variantsColorimetricContrast({ min, max, background: bg }, variants),
      state,
    ];
  }

  return [
    [bg, fg],
    variantsColorimetricContrast({ min, max, background: bg }, variants),
    state,
  ];
}
// Colorimetric Contrast:1 ends here

// [[file:../Notebook.org::*Palette Formatting][Palette Formatting:1]]
function tokenizeMaterialVariants(variants) {
  // Extract [main[], accents[]]
  const [main, accents] = variants;

  return {
    // 50-900
    ...main.reduce((acc, color, index) => {
      if (index === 0) return { ...acc, 50: color };
      return { ...acc, [`${index}00`]: color };
    }, {}),
    // a100-a400
    ...(accents.length
      ? accents.reduce((acc, color, index) => {
        return { ...acc, [`a${++index}00`]: color };
      }, {})
      : {}),
  };
}

function tokenizeArtisticVariants(variants) {
  const [tints, tones, shades] = variants;

  // Here, we check the variants that contain data and filter out any that don't before assembling the tokens
  return Object.entries({ light: tints, muted: tones, dark: shades })
    .filter(([, data]) => data.length)
    .reduce((acc, [category, data]) => {
      return {
        ...acc,
        [category]: data.reduce((a, color, i) => {
          return { ...a, [`${++i}00`]: color };
        }, {}),
      };
    }, {});
}

function tokenizePalette(palette) {
  // Standard palettes share internal structure
  const [[bg, fg], variants, states] = palette;

  let variations = {};

  // Material palettes contain two kinds of variants
  if (variants.length === 2) {
    variations = tokenizeMaterialVariants(variants);
  }

  // Otherwise it's artistic
  if (variants.length === 3) {
    variations = tokenizeArtisticVariants(variants);
  }

  return {
    bg,
    fg,
    ...variations,
    ...(states.length
      ? {
        state: {
          pending: states[0],
          success: states[1],
          warning: states[2],
          error: states[3],
        },
      }
      : {}),
  };
}
// Palette Formatting:1 ends here
