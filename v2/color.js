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
const LEGACY_ALPHA_DELIMITER = new RegExp(DELIMITER.source.replace(",", ",/"));
const MODERN_DELIMITER = new RegExp(DELIMITER.source.replace(",", ""));
const MODERN_ALPHA_DELIMITER = new RegExp(
  LEGACY_ALPHA_DELIMITER.source.replace(",", ""),
);

const COMPONENT_TOKEN = new RegExp(
  ["(?:", PERCENT_TOKEN.source, "|", NUMBER_TOKEN.source, ")"].join(""),
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

// Functional Formats

// The functional formats require a bit of extra processing. Good thing we created those tokens earlier. Functional formats
// always have an optional alpha component, so we tack that onto the end. If =legacy= is =true=, then we use the legacy
// delimiters. Otherwise, we know it's a modern format.

// Each format has varying components, so we map over the tokens we plug in and link them with delimiters.


// [[file:../Notebook.org::*Functional Formats][Functional Formats:1]]
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
// Functional Formats:1 ends here

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

// CIELAB/CIELCH

// These two formats are scalar and polar variants of the same color space, so I'll combine their validators.


// [[file:../Notebook.org::*CIELAB/CIELCH][CIELAB/CIELCH:1]]
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
// CIELAB/CIELCH:1 ends here

// OKLab/OKLCH

// Same with OKLab/OKLCH, which recently became standard so I reimplemented them according to the spec.


// [[file:../Notebook.org::*OKLab/OKLCH][OKLab/OKLCH:1]]
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
// OKLab/OKLCH:1 ends here

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
      .find(([, color]) => color) || InvalidColor(input)
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
    this.msg = `
${input} is not a valid color.
${"-".repeat(100)}

Supported color formats:

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
  return channel.toString(16).padStart(2, "0");
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
  return n * 255;
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

  const [R, G, B] = [r, g, b].map((fragment) =>
    hexFragmentToChannel(parseFloat(fragment))
  );

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

  return [[L, a, b, 1]];
}

function parseCielch([format, components]) {
  const [$L, c, h, A] = components;

  const [L, C] = [$L, c].map((component) => parseFloat(component));
  const H = parseHue(h);

  if (A) {
    return [format, [L, C, H, parsePercentage(A)]];
  }

  return [L, C, H, 1];
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
