// color_adjust Implementation

// [[file:../Notebook.org::*color_adjust Implementation][color_adjust Implementation:1]]
export function color_adjust(properties, color) {
  // Do nothing by default
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = properties;

  return colorAdjustment({ lightness, chroma, hue, alpha }, color);
}
// color_adjust Implementation:1 ends here

// color_as_hex Implementation

// [[file:../Notebook.org::*color_as_hex Implementation][color_as_hex Implementation:1]]
export function color_as_hex(color) {
  return serializeHex(convert(color, "hex"));
}
// color_as_hex Implementation:1 ends here

// color_as_rgb Implementation

// [[file:../Notebook.org::*color_as_rgb Implementation][color_as_rgb Implementation:1]]
export function color_as_rgb(color) {
  return serializeRgb(convert(color, "rgb"));
}
// color_as_rgb Implementation:1 ends here

// color_as_hsl Implementation

// [[file:../Notebook.org::*color_as_hsl Implementation][color_as_hsl Implementation:1]]
export function color_as_hsl(color) {
  return serializeHsl(convert(color, "hsl"));
}
// color_as_hsl Implementation:1 ends here

// color_as_cmyk Implementation

// [[file:../Notebook.org::*color_as_cmyk Implementation][color_as_cmyk Implementation:1]]
export function color_as_cmyk(color) {
  return serializeCmyk(convert(color, "cmyk"));
}
// color_as_cmyk Implementation:1 ends here

// color_as_hwb Implementation

// [[file:../Notebook.org::*color_as_hwb Implementation][color_as_hwb Implementation:1]]
export function color_as_hwb(color) {
  return serializeHwb(convert(color, "hwb"));
}
// color_as_hwb Implementation:1 ends here

// color_as_cielab Implementation

// [[file:../Notebook.org::*color_as_cielab Implementation][color_as_cielab Implementation:1]]
export function color_as_cielab(color) {
  return serializeCielab(convert(color, "cielab"));
}
// color_as_cielab Implementation:1 ends here

// color_as_cielch Implementation

// [[file:../Notebook.org::*color_as_cielch Implementation][color_as_cielch Implementation:1]]
export function color_as_cielch(color) {
  return serializeCielch(convert(color, "cielch"));
}
// color_as_cielch Implementation:1 ends here

// color_as_oklab Implementation

// [[file:../Notebook.org::*color_as_oklab Implementation][color_as_oklab Implementation:1]]
export function color_as_oklab(color) {
  return serializeOklab(convert(color, "oklab"));
}
// color_as_oklab Implementation:1 ends here

// color_as_oklch Implementation

// [[file:../Notebook.org::*color_as_oklch Implementation][color_as_oklch Implementation:1]]
export function color_as_oklch(color) {
  return serializeOklch(convert(color, "oklch"));
}
// color_as_oklch Implementation:1 ends here

// Tokenization

// Color format tokenization follows the spec as closely as possible.

// Then we have basic =NUMBER_TOKENS=, a =PERCENTAGE_TOKEN=, tokens for the legacy and modern =DELIMITERS=, a
// =COMPONENT_TOKEN= combining the first two, and a =HUE_TOKEN=. That's all that's needed to account for every format
// QuarkSuite supports.

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

// Named Color Validation

// QuarkSuite supports CSS named colors through to CSS Color Module 4 using an object query.

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

// RGB Hex Validation

// This can be done with a regular expression.

// [[file:../Notebook.org::*RGB Hex Validation][RGB Hex Validation:1]]
function hexValidator(color) {
  return /^#([\da-f]{3,4}){1,2}$/i.test(color);
}
// RGB Hex Validation:1 ends here

// Validating Functional Formats

// The functional formats require a bit of extra processing. Good thing we created those tokens earlier. Functional formats
// always have an optional alpha component, so we tack that onto the end. If =legacy= is =true=, then we use the legacy
// delimiters. Otherwise, we know it's a modern format.

// Each format has varying components, so we map over the tokens we plug in and link them with delimiters.

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

// RGB Validation

// =matchFunctionalFormats= makes validating the remaining CSS formats a matter of slotting in tokens with the right
// prefix. As you'll see, some tokens repeat and others have to be slotted individually.

// [[file:../Notebook.org::*RGB Validation][RGB Validation:1]]
function rgbValidator(color) {
  return matchFunctionalFormat(
    { prefix: "rgba?" },
    Array(3).fill(COMPONENT_TOKEN),
  ).test(color);
}
// RGB Validation:1 ends here

// HSL Validation

// [[file:../Notebook.org::*HSL Validation][HSL Validation:1]]
function hslValidator(color) {
  return matchFunctionalFormat({ prefix: "hsla?" }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}
// HSL Validation:1 ends here

// CMYK Validation

// =device-cmyk= is the first modern format, so the legacy flag will have to be disabled. It's also technically been moved
// to CSS Color Module 5, but I implemented it before I found that out.

// [[file:../Notebook.org::*CMYK Validation][CMYK Validation:1]]
function cmykValidator(color) {
  return matchFunctionalFormat(
    { prefix: "device-cmyk", legacy: false },
    Array(4).fill(COMPONENT_TOKEN),
  ).test(color);
}
// CMYK Validation:1 ends here

// HWB Validation

// [[file:../Notebook.org::*HWB Validation][HWB Validation:1]]
function hwbValidator(color) {
  return matchFunctionalFormat({ prefix: "hwb", legacy: false }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}
// HWB Validation:1 ends here

// CIELAB/CIELCH Validation

// These two formats are scalar and polar variants of the same color space, so I'll combine their validators.

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

// OKLab/OKLCH Validation

// Same with OKLab/OKLCH, which recently became standard so I reimplemented them according to the spec.

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

// Preparing Validation

// From here, we'll implement a =validator()= that accepts input and checks it against all of the available formats. A valid
// color will match /one of/ the available formats and get slotted in a =[format, color]= tuple.

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

// Invalid Color Handling

// Otherwise, the input does not match any of the available formats and throws a useful error.

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

// RGB Hex Extractor

// For RGB Hex extraction, we need to consider that RGB colors can also come in the form =#RGB(A)=. So we'll use =expandHex()= to expand
// those to a full =#RRGGBB(AA)=. And then we have =hexExtractor()= to do the extraction proper.

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

// Functional Format Extractor

// Extracting from functional formats requires that the values be picked /with their units attached/. We'll need this
// information for parsing them prior to format conversion.

// This is done with =componentExtractor()=.

// [[file:../Notebook.org::*Functional Format Extractor][Functional Format Extractor:1]]
function componentExtractor(color) {
  return color.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
}
// Functional Format Extractor:1 ends here

// Extraction Preparation

// Now with all the parts in place, we'll create a general =extractor()= that consumes a valid color tuple. If the =format=
// is =hex=, we'll call =hexExtractor()=, otherwise it's a functional format and must be handled by =componentExtractor()=.

// We also need to do additional work if the =format= is =named=, so we pass its value in =NAMED_COLOR_KEYWORDS= through
// =hexExtractor()=.

// Note that we're also passing the extraction along in the =[format, components]= tuple form for additional parsing.

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

// Clamping Values

// Before anything else, we'll need a helper to =clamp()= values between a =min= and =max=. Some values in functional
// formats are capped, and others are not. We'll see which when we implement the serializer.

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

// Hex Fragment <-> Channel

// Now, we're going to need to convert hex fragments to and from their RGB channel equivalents.

// =16= is the /radix/ (or base) of hexadecimal, so we use =parseInt()= to convert the hex value to a decimal and
// =toString()= to convert a decimal to hexadecimal.

// [[file:../Notebook.org::*Hex Fragment <-> Channel][Hex Fragment <-> Channel:1]]
function hexFragmentToChannel(hex) {
  return parseInt(hex, 16);
}

function hexFragmentFromChannel(channel) {
  return clamp(channel, 0, 255).toString(16).padStart(2, "0");
}
// Hex Fragment <-> Channel:1 ends here

// Number <-> Percentage

// Some functional formats will need to have their numbers converted to percentages or the reverse.

// [[file:../Notebook.org::*Number <-> Percentage][Number <-> Percentage:1]]
function numberToPercentage(n) {
  return n * 100;
}

function numberFromPercentage(percentage) {
  return percentage / 100;
}
// Number <-> Percentage:1 ends here

// Number <-> Channel

// RGB channels need to be converted to a =0-1= range to be useful in calculation. And then they need to be converted back
// to channels later.

// [[file:../Notebook.org::*Number <-> Channel][Number <-> Channel:1]]
function numberToChannel(n) {
  return Math.round(n * 255);
}

function numberFromChannel(channel) {
  return channel / 255;
}
// Number <-> Channel:1 ends here

// Hue Component

// Some of the color conversions require the [[https://www.rapidtables.com/convert/number/how-degrees-to-radians.html][hue as radians]]. And then we need to be able to [[https://www.rapidtables.com/convert/number/how-radians-to-degrees.html][convert back]].

// The hue component also supports gradians and rotations, so we'll have to account for those as well to stay true to the
// spec.

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

// Hue Correction

// A stipulation of the hue component in the spec is that it must support hue values greater than a single revolution.

// However, if it's to be useful in calculation, we must then /correct/ the value to a range =-360-360= or one full
// rotation clockwise and counterclockwise. Our implmentation of =hueCorrection()= takes care of that.

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

// Parsing RGB Hex

// RGB Hex must be parsed as RGB channels to be mathematically useful. That's what =parseHex()= does.

// If =A= is missing, then we attach it to ensure uniformity. Finally, we convert the hex fragments to RGB. The alpha
// component needs additional handling.

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

// Parsing Functional RGB

// As stated above, RGB must be converted to a =0-1= range to be mathematically useful. This is a straightforward
// conversion because of our =numberFromChannel()= helper. Meanwhile, percentage values are valid for =a=.

// We check to see if =a= is a percentage value and convert it or leave it alone.

// This is an operation we'll repeat multiple times during parsing, so it's captured in a =parsePercentage()= helper.

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

// Parsing Functional HSL

// The =h= component will need special processing depending on its units. And our conversion goal is /degrees/. Other than
// that, =s= and =l= need conversion to a =0-1= range, and =A= is handled as usual.

// Several formats beyond this point have a hue value, so we'll create a =parseHue()= helper to capture that logic.

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

// Parsing Functional CMYK

// Functional CMYK is dead simple to parse. We check to see if the components are percentages and convert them. Otherwise,
// we coerce them to numbers with no additional processing.

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

// Parsing Functional CIELAB/CIELCH

// Of these two, the only one that requires any special attention is CIELCH because of that hue component. CIELAB just
// passes its values through number coercion.

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

// Parsing OKLab/OKLCH

// Parsing OKLab/OKLCH is similar to the above section, but it's important to note that OKLCH calculations expect the hue
// in /radians/. =L= is also converted to a =0-1= range.

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

// Parsing Preparation

// Similar to the validator and extractor, the =parser()= will read a color tuple and execute the correct parsing function
// for a matched format. And then it throws back a transformed tuple of =[format, values]=.

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

// RGB <-> RGB

// Yes, we do have to account for RGB converting to and from itself, because the parsed RGB can't be serialized.

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

// Hex -> RGB

// If you remember from =parseHex()=, a parsed hexadecimal color is already a valid RGB result. So we mark it as such and pass it
// through.

// [[file:../Notebook.org::*Hex -> RGB][Hex -> RGB:1]]
function hexToRgb([, values]) {
  return ["rgb", values];
}
// Hex -> RGB:1 ends here

// HSL -> RGB

// To convert HSL to RGB, we use [[https://www.rapidtables.com/convert/color/hsl-to-rgb.html][this conversion formula from RapidTables]].

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

// CMYK -> RGB

// #+BEGIN_QUOTE
// IMPORTANT: CSS Color Module 5 will use a device-independent conversion of CMYK through the CIELAB space. This means the
// below approach is outdated. For practicality and compatibility's sake, I still use the old conversion method through
// sRGB. Which works today.
// #+END_QUOTE

// #+BEGIN_QUOTE
// UPDATE: The below approach is not outdated in CSS Color Module 5, but it is considered a /naive/ conversion. It works
// well enough for the purposes of this library either way.
// #+END_QUOTE

// Conversion of CMYK to RGB is [[https://www.rapidtables.com/convert/color/cmyk-to-rgb.html][covered by another RapidTables formula]].

// [[file:../Notebook.org::*CMYK -> RGB][CMYK -> RGB:1]]
function cmykToRgb([, values]) {
  const [C, M, Y, K, A] = values;

  const [R, G, B] = [C, M, Y].map((V) => numberToChannel((1 - V) * (1 - K)));

  return ["rgb", [R, G, B, A]];
}
// CMYK -> RGB:1 ends here

// HWB -> RGB

// The formula for conversion of HWB to RGB is [[https://www.w3.org/TR/css-color-4/#hwb-to-rgb][adapted from the spec itself]].

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

// CIELAB -> RGB

// The steps for the CIELAB to RGB conversion are as follows:

// 1. Convert CIELAB to CIEXYZ
// 2. Convert CIEXYZ to LRGB
// 3. Convert LRGB to RGB

// The actual equations are helpfully [[http://www.brucelindbloom.com/index.html?Math.html][provided by Bruce Lindbloom]].

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

// OKLAB -> RGB

// The OKLab to RGB conversion steps are adapted from the creator, Björn Ottosson's, [[https://bottosson.github.io/posts/oklab/][original post about it]].

// The process breaks down to:

// 1. Convert OKLab to LRGB
// 2. Convert LRGB to RGB

// Simple and direct.

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

// RGB -> Hex

// Getting RGB to hexadecimal color output is a similarly stratightforward implementation.

// Rounding the results is necessary because hexadecimal format expects integers. Having reached our target output, we can
// now forward the result for serializing.

// [[file:../Notebook.org::*RGB -> Hex][RGB -> Hex:1]]
function hexFromRgb([, rgbValues]) {
  const [r, g, b, a] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => hexFragmentFromChannel(channel));
  const A = hexFragmentFromChannel(numberToChannel(a));

  return ["hex", [R, G, B, A]];
}
// RGB -> Hex:1 ends here

// RGB -> HSL

// Getting RGB to an HSL output color is [[https://www.rapidtables.com/convert/color/rgb-to-hsl.html][handled by another RapidTables formula]].

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

// RGB -> CMYK

// Getting RGB to CMYK output [[https://www.rapidtables.com/convert/color/rgb-to-cmyk.html][requires yet another RapidTables formula]].

// [[file:../Notebook.org::*RGB -> CMYK][RGB -> CMYK:1]]
function cmykFromRgb([, rgbValues]) {
  const [r, g, b, A] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => numberFromChannel(channel));

  const K = 1 - Math.max(R, G, B);
  const [C, M, Y] = [R, G, B].map((channel) => (1 - channel - K) / (1 - K));

  return ["cmyk", [C, M, Y, K, A]];
}
// RGB -> CMYK:1 ends here

// RGB -> HWB

// The formula for converting RGB to HWB output is also [[https://www.w3.org/TR/css-color-4/#rgb-to-hwb][pulled from the spec]].

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

// RGB -> CIELAB

// For getting CIELAB output from RGB, we'll be leaning on Bruce Lindbloom's equations again.

// The process is as follows:

// 1. RGB to LRGB
// 2. LRGB to CIEXYZ
// 3. CIEXYZ to CIELAB

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

// RGB -> OKLAB

// To get Oklab output from RGB, we're going to use the inversion also documented by its creator.

// That process goes:

// 1. RGB to LRGB
// 2. LRGB to OKLAB

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

// SCALAR <-> POLAR

// The last thing we need to do before wiring everything up is create a bridge to and from CIELAB & OKLab to their polar
// coordinate alter-egos (CIELCH & OKLCH).

// Since we already have a completed chain of =INPUT -> RGB -> OUTPUT= for both formats, we don't need to do much more.

// The two basically [[https://www.w3.org/TR/css-color-4/#lab-to-lch][share formulas]], so I'm going to create the helpers =scalarToPolar()= and =scalarFromPolar=.

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

// CIELAB <-> CIELCH

// [[file:../Notebook.org::*CIELAB <-> CIELCH][CIELAB <-> CIELCH:1]]
function cielabToCielch([, cielabValues]) {
  return ["cielch", scalarToPolar(["cielab", cielabValues])];
}

function cielabFromCielch([, cielchValues]) {
  return ["cielab", scalarFromPolar(["cielch", cielchValues])];
}
// CIELAB <-> CIELCH:1 ends here

// OKLab <-> OKLCH

// [[file:../Notebook.org::*OKLab <-> OKLCH][OKLab <-> OKLCH:1]]
function oklabToOklch([, oklabValues]) {
  return ["oklch", scalarToPolar(["oklab", oklabValues])];
}

function oklabFromOklch([, oklchValues]) {
  return ["oklab", scalarFromPolar(["oklch", oklchValues])];
}
// OKLab <-> OKLCH:1 ends here

// Color Conversion Pipeline

// Phew, now that we've prepared each individual format, it's time to construct the color conversion pipeline.

// This will essentially be composed of two objects: =INPUT_TO_RGB= and =RGB_TO_OUTPUT= inside our main color =convert()=
// function. You give it a color as input which then gets validated, has its components, extracted, and then parsed. The
// parsed values are then passed along and converted to a specified output format.

// [[file:../Notebook.org::*Color Conversion Pipeline][Color Conversion Pipeline:1]]
function convert(color, to) {
  // Let's make the pathway explicit
  const valid = validator(color);
  const extraction = extractor(valid);
  const [format, values] = parser(extraction);

  // Takes the input and converts it to RGB depending on format
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

  // Takes the RGB and converts to output target
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

// Serializing RGB Hex

// Concatenate the =hexResult= with a =#=. If the alpha channel is =ff=, the color is opaque and alpha should be removed.

// [[file:../Notebook.org::*Serializing RGB Hex][Serializing RGB Hex:1]]
function serializeHex([, hexResult]) {
  const [R, G, B, A] = hexResult;

  if (A === "ff") {
    return "#".concat(R, G, B);
  }
  return "#".concat(R, G, B, A);
}
// Serializing RGB Hex:1 ends here

// Serializing Functional Formats

// Functional color formats have an incredibly uniform syntax, so let's create a helper =serializeFunctionalFormat()= to
// logically assemble the data. It needs to be generic enough for us to simply attach a prefix and plug in values; similar
// to =matchFunctionalFormat()= above.

// [[file:../Notebook.org::*Serializing Functional Formats][Serializing Functional Formats:1]]
function serializeFunctionalFormat({ prefix, legacy = true }, components) {
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

// Serializing RGB

// [[file:../Notebook.org::*Serializing RGB][Serializing RGB:1]]
function serializeRgb([, rgbResult]) {
  const [r, g, b, A] = rgbResult;

  // Clamp RGB channels 0-255
  const [R, G, B] = [r, g, b].map(
    (component) => +clamp(component, 0, 255).toFixed(3),
  );

  return serializeFunctionalFormat({ prefix: "rgb" }, [R, G, B, A]);
}
// Serializing RGB:1 ends here

// Serializing HSL

// [[file:../Notebook.org::*Serializing HSL][Serializing HSL:1]]
function serializeHsl([, hslResult]) {
  const [h, s, l, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // convert saturation, lightness to percentages
  const [S, L] = [s, l].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctionalFormat({ prefix: "hsl" }, [H, S, L, A]);
}
// Serializing HSL:1 ends here

// Serializing CMYK

// [[file:../Notebook.org::*Serializing CMYK][Serializing CMYK:1]]
function serializeCmyk([, cmykResult]) {
  const [c, m, y, k, A] = cmykResult;

  // Convert to percentage, cap at 0-100
  const [C, M, Y, K] = [c, m, y, k].map(
    (n) =>
      `${+clamp(numberToPercentage(isNaN(n) ? 0 : n), 0, 100).toFixed(3)}%`,
  );

  return serializeFunctionalFormat({ prefix: "device-cmyk", legacy: false }, [
    C,
    M,
    Y,
    K,
    A,
  ]);
}
// Serializing CMYK:1 ends here

// Serializing HWB

// [[file:../Notebook.org::*Serializing HWB][Serializing HWB:1]]
function serializeHwb([, hslResult]) {
  const [h, w, blk, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // convert white, black to percentages
  const [W, BLK] = [w, blk].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctionalFormat({ prefix: "hwb", legacy: false }, [
    H,
    W,
    BLK,
    A,
  ]);
}
// Serializing HWB:1 ends here

// Serializing CIELAB/CIELCH

// [[file:../Notebook.org::*Serializing CIELAB/CIELCH][Serializing CIELAB/CIELCH:1]]
function serializeCielab([, cielabValues]) {
  const [$L, $a, $b, A] = cielabValues;

  // Clamp lightness at 0-100
  const L = `${+clamp($L, 0, 100).toFixed(3)}%`;

  // Clamp a, b at ±127
  const [a, b] = [$a, $b].map((n) => +clamp(n, -127, 127).toFixed(3));

  return serializeFunctionalFormat({ prefix: "lab", legacy: false }, [
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
    // Otherwise, convert hue to degrees, correct hue
    H = +hueCorrection(radiansToDegrees(h)).toFixed(3);
  }

  return serializeFunctionalFormat({ prefix: "lch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}
// Serializing CIELAB/CIELCH:1 ends here

// Serializing OKLab/OKLCH

// [[file:../Notebook.org::*Serializing OKLab/OKLCH][Serializing OKLab/OKLCH:1]]
function serializeOklab([, oklabValues]) {
  const [$L, $a, $b, A] = oklabValues;

  // Convert number to percentage, clamp at 0-100
  const L = `${+clamp(numberToPercentage($L), 0, 100).toFixed(3)}%`;

  // Clamp a, b at ±0.5
  const [a, b] = [$a, $b].map((n) => +clamp(n, -0.5, 0.5).toFixed(5));

  return serializeFunctionalFormat({ prefix: "oklab", legacy: false }, [
    L,
    a,
    b,
    A,
  ]);
}

function serializeOklch([, oklchValues]) {
  const [$L, c, h, A] = oklchValues;

  // Convert lightness to percentage, clamp at 0-100
  const L = `${+clamp(numberToPercentage($L), 0, 100).toFixed(3)}%`;

  // Clamp chroma at 0-0.5
  const C = +clamp(c, 0, 0.5).toFixed(5);

  let H = h;

  // Hue is powerless if chroma is 0
  if (C === 0) {
    H = 0;
  } else {
    // Otherwise, convert hue to degrees, correct hue
    H = +hueCorrection(radiansToDegrees(h)).toFixed(3);
  }

  return serializeFunctionalFormat({ prefix: "oklch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}
// Serializing OKLab/OKLCH:1 ends here

// Color Adjustment Through OKLCH

// OKLab solved the above issues. As an offshoot of CIELAB, perceptual uniformity is baked into its calculations. As an
// /improvement/ on CIELAB, these calculations were adjusted for increased practicality and predictability. In short, it
// made sequential palette building both possible and simpler.

// Its OKLCH polar form is also vastly more intuitive for color property adjustment than its raw OKLab scalar form.

// The approach in steps:

// 1. Convert the input color to OKLCH equivalent
// 2. Adjust its target properties
// 3. Convert result back to its input format

// [[file:../Notebook.org::*Color Adjustment Through OKLCH][Color Adjustment Through OKLCH:1]]
function extractOklchValues(color) {
  const convertedOklch = serializeOklch(convert(color, "oklch"));
  const [, components] = extractor(["oklch", convertedOklch]);

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

  // If input format is named, convert to hex
  if (format === "named") {
    return serializeInput(convert(oklch, "hex"));
  }

  // Otherwise use input format
  return serializeInput(convert(oklch, format));
}
// Color Adjustment Through OKLCH:1 ends here
