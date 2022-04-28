/** @typedef {"hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "lab" | "lch" | "oklab" | "oklch"} CSSColorFormats */

/**
 * An action that takes any valid CSS `color` and converts it `to` another format.
 *
 * @param {CSSColorFormats} to - the target format
 * @param {string} color - the color to convert
 * @returns {string} the converted color
 *
 * @example
 * Converting a hex color to RGB
 *
 * ```js
 * convert("rgb", "#7ea");
 * ```
 *
 * @example
 * Converting a hex color to HSL
 *
 * ```js
 * convert("hsl", "#7ea");
 * ```
 *
 * @example
 * Converting LCH color to hex
 *
 * ```js
 * convert("hex", "lch(49% 63 120)");
 * ```
 */
export function convert(to, color) {
  if (to === "lab") {
    return serialize(conversion(color, "cielab"));
  }

  if (to === "lch") {
    return serialize(conversion(color, "cielch"));
  }

  return serialize(conversion(color, to));
}

/**
 * An action that takes any valid CSS `color` and adjusts its properties
 * according to user `settings`.
 *
 * @param {object} settings - color adjustment settings
 * @param {number} [settings.lightness] - adjust the color lightness (as a percentage)
 * @param {number} [settings.chroma] - adjust the color chroma/intensity (as a percentage)
 * @param {number} [settings.hue] - adjust the color hue (in degrees)
 * @param {number} [settings.alpha] - adjust the color alpha/transparency (as a percentage)
 * @param {number} [settings.steps] - activates interpolated color adjustment (up to number of steps)
 *
 * @param {string} color - the color to adjust
 * @returns {string | string[]} the adjusted color or interpolation results
 *
 * @example
 * Some sample color adjustments
 *
 * ```js
 * const swatch = "rebeccapurple";
 *
 * // Positive values increase
 * adjust({ lightness: 20 }, swatch);
 * adjust({ chroma: 8 }, swatch);
 * adjust({ hue: 90 }, swatch);
 *
 * // Negative values decrease
 * adjust({ lightness: -36 }, swatch);
 * adjust({ chroma: -15 }, swatch);
 * adjust({ hue: -220 }, swatch);
 * adjust({ alpha: -25 }, swatch);
 *
 * // Multiple adjustments allowed
 * adjust({ lightness: 25, chroma: -8, hue: 240 }, swatch);
 *
 * // Interpolated
 * adjust({ lightness: -75, steps: 6 }, swatch);
 * ```
 */
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

/**
 * An action that takes any valid CSS `color` and mixes it according to user `settings`.
 *
 * @param {object} settings - color blending settings
 * @param {string} [settings.target] - set the blend target
 * @param {number} [settings.strength] - set the blend strength (as a percentage)
 * @param {number} [settings.steps] - activates interpolated color blending (up to number of steps)
 *
 * @param {string} color - the input color
 * @returns {string | string[]} the blended color or interpolation results
 *
 * @example
 * Some sample color blends
 *
 * ```js
 * const swatch = "dodgerblue";
 * const target = "crimson";
 *
 * // Positive strength blends toward target
 * mix({ target, strength: 72 }, swatch);
 *
 * // Negative strength blends from target
 * mix({ target, strength: -64 }, swatch);
 *
 * // Interpolated
 * mix({ target, strength: 50, steps: 6 }, swatch);
 * ```
 */
export function mix(settings, color) {
  // Do nothing by default
  const { target = color, strength = 0, steps } = settings;

  if (steps) {
    return colorInterpolation(colorMix, { target, strength, steps }, color);
  }

  return colorMix({ target, strength }, color);
}

/** @typedef {"dyadic" | "complementary" | "analogous" | "split" | "clash" | "triadic" | "double" | "tetradic" | "square"} ColorHarmonies */

/**
 * An action that takes any valid CSS `color` and generates an artistic color
 * harmony according to user `settings`.
 *
 * @param {object} settings - color harmony settings
 * @param {ColorHarmonies} [settings.configuration] - set the artistic color harmony
 * @param {boolean} [settings.accented] - include the complement as an accent?
 *
 * @param {string} color - the input color
 * @returns {[string, string, string?, string?]} the generated color harmony
 *
 * @example
 * Generating an analogous harmony from a color
 *
 * ```js
 * const swatch = "#bada55";
 *
 * harmony({ configuration: "analogous" }, swatch);
 * ```
 *
 * @example
 * Generating an accented split complementary harmony from a color
 *
 * ```js
 * const swatch = "#deaded";
 *
 * harmony({ configuration: "split" accented: true }, swatch);
 * ```
 */
export function harmony(settings, color) {
  // Set defaults
  const { configuration = "complementary", accented = false } = settings;

  return colorHarmonies({ type: configuration, accented }, color);
}

/**
 * @typedef {"prot" | "deuter" | "trit"} CVD
 * @typedef {"brettel" | "vienot"} CVDMethod
 * @typedef {"achromatopsia" | `${CVD}anomaly` | `${CVD}anopia`} ColorVision
 */

/**
 * An action that takes any valid CSS `color` and checks it against color vision
 * deficiency (colorblindness) according to user `settings`.
 *
 * @param {object} settings - color vision settings
 * @param {ColorVision} [settings.as] - set the type of colorblindness
 * @param {CVDMethod} [settings.method] - set the algorithm to use
 * @param {number} [settings.severity] - set the severity of anomalous trichromacy checks (as a percentage)
 * @param {number} [settings.steps] - activates interpolated color vision check (up to number of steps)
 *
 * @param {string} color - the input color
 * @returns {string | string[]} the color vision check or interpolation results
 *
 * @example
 * A color vision check for a single color
 *
 * ```js
 * const swatch = "crimson";
 *
 * vision({ as: "protanopia" }, swatch);
 * vision({ as: "deuteranopia" }, swatch);
 * vision({ as: "tritanopia" }, swatch);
 *
 * // Severity property applies to anomalous trichromacy checks
 * vision({ as: "protanomaly", severity: 75 }, swatch);
 *
 * // Optionally set the algorithm
 * vision({ as: "deuteranopia", method: "vienot" }, swatch);
 *
 * // Interpolated
 * vision({ as: "deuteranomaly", severity: 85, steps: 4 }, swatch);
 * ```
 *
 * @example
 * A color vision contrast check for a color harmony
 *
 * ```js
 * const swatch = "dodgerblue";
 * const scheme = harmony({ configuration: "analogous", accented: true }, swatch);
 *
 * // Advanced: propagate the color vision check over the whole color harmony scale
 * propagate(preset(vision, { as: "achromatopsia" }), scheme);
 * ```
 *
 * @see `workflow.js` module for `propagate` and `preset` helpers
 */
export function vision(settings, color) {
  // Set defaults
  const { as = "protanopia", method = "brettel", steps = 0 } = settings;

  // Achromatopsia through reducing the chroma to zero
  if (as === "achromatopsia") {
    const chroma = -100;

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

    return checkColorblindness({ method, type, strength: severity }, color);
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

  return checkColorblindness({ method, type, strength: 100 }, color);
}

/**
 * An action that takes any valid CSS `color` and checks it against contrast
 * sensitivity according to user `settings`.
 *
 * @param {object} settings - contrast sensitivity settings
 * @param {number} [settings.factor] - set the gray factor (as a percentage)
 * @param {number} [settings.severity] - set the severity of sensitivity (as a percentage)
 * @param {number} [settings.steps] - activates interpolated contrast sensitivity check (up to number of steps)
 *
 * @param {string} color - the input color
 * @returns {string | string[]} the contrast sensitivity check or interpolation results
 *
 * @example
 * A contrast sensitivity check for a single color
 *
 * ```js
 * const swatch = "crimson";
 *
 * contrast({ factor: 0, severity: 80 }, swatch); // 0 means black
 * contrast({ factor: 50, severity: 80 }, swatch); // 50 means gray
 * contrast({ factor: 100, severity: 80 }, swatch); // 100 means black
 *
 * // Interpolated
 * contrast({ factor: 58, severity: 100, steps: 8 }, swatch);
 * ```
 *
 * @example
 * A contrast sensitivity check for a color harmony
 *
 * ```js
 * const swatch = "dodgerblue";
 * const scheme = harmony({ configuration: "analogous", accented: true }, swatch);
 *
 * // Advanced: propagate the contrast sensitivity check over the whole color harmony scale
 * propagate(preset(contrast, { factor: 40, severity: 80 }), scheme);
 * ```
 *
 * @see `workflow.js` module for `propagate` and `preset` helpers
 */
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

  return checkSensitivity({ contrast: factor, strength: severity }, color);
}

/**
 * An action tha takes any valid CSS `color` and checks it against an illuminant
 * (light source) according to user `settings`.
 *
 * @param {object} settings - illuminant settings
 * @param {number} [settings.K] - set the illuminant temperature (in kelvin)
 * @param {number} [settings.intensity] - set the intensity of the illuminant (as a percentage)
 * @param {number} [settings.steps] - activates interpolated illuminant check (up to number of steps)
 *
 * @param {string} color - the input color
 * @returns {string | string[]} the illuminant check or interpolation results
 *
 * @example
 * An illuminant check for a single color
 *
 * ```js
 * const swatch = "crimson";
 *
 * illuminant({ K: 1850, intensity: 80 }, swatch); // candlelight
 * illuminant({ K: 2400, intensity: 80 }, swatch); // standard incandescent bulb
 * illuminant({ K: 6700, intensity: 80 }, swatch); // LCD screen
 *
 * // Interpolated
 * illuminant({ K: 3200, intensity: 100, steps: 8 }, swatch);
 * ```
 *
 * @example
 * An illuminant check for a color harmony
 *
 * ```js
 * const swatch = "dodgerblue";
 * const scheme = harmony({ configuration: "analogous", accented: true }, swatch);
 *
 * // Advanced: propagate the illuminant check over the whole color harmony scale
 * propagate(preset(illuminant, { K: 6500, intensity: 80 }), scheme);
 * ```
 *
 * @see `workflow.js` module for `propagate` and `preset` helpers
 */
export function illuminant(settings, color) {
  // Set defaults
  const { K = 1850, intensity = 50, steps = 0 } = settings;

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

  return checkIlluminant({ temperature: K, strength: intensity }, color);
}

/**
 * @typedef {[string, string]} Surface - [bg, fg]
 * @typedef {[string[], string[]]} MaterialVariants - [main, accents]
 * @typedef {[string[], string[], string[]]} ArtisticVariants - [tints, tones, shades]
 * @typedef {string[]} State - [pending, success, warning, error]
 * @typedef {[Surface, MaterialVariants, State]} MaterialData - [[bg, fg], [main, accents], [pending, success, warning, error]]
 * @typedef {[Surface, ArtisticVariants, State]} ArtisticData - [[bg, fg], [tints, tones, shades], [pending, success, warning, error]]
 * @typedef {MaterialData | ArtisticData} PaletteData - palette data configurations
 */

/**
 * An action that takes any valid CSS `color` and generates a palette according
 * to user `settings`.
 *
 * @param {object} settings - palette settings
 * @param {"material" | "artistic"} [settings.configuration] - set the palette configuration
 * @param {number} [settings.contrast] - set the overall palette contrast (both configurations)
 * @param {boolean} [settings.stated] - include interface states? (both configurations)
 * @param {boolean} [settings.dark] - toggle dark mode? (both configurations)
 *
 * @param {boolean} [settings.accented] - include accent colors? (material)
 *
 * @param {number} [settings.tints] - number of tints to generate (artistic)
 * @param {number} [settings.tones] - number of tones to generate (artistic)
 * @param {number} [settings.shades] - number of shades to generate (artistic)
 *
 * @param {string} color - the input color
 * @returns {PaletteData} generated palette data
 *
 * @example
 * Generating a material palette
 *
 * ```js
 * const swatch = "#fac99a";
 *
 * palette({ configuration: "material" }, swatch);
 *
 * // Optionally adjusting the contrast
 * palette({ configuration: "material", contrast: 90 }, swatch);
 *
 * // Optionally including accent colors
 * palette({ configuration: "material", accented: true }, swatch);
 *
 * // Optionally including interface states
 * palette({ configuration: "material", stated: true }, swatch);
 *
 * // Optionally set dark mode
 * palette({ configuration: "material", dark: true }, swatch);
 * ```
 *
 * @example
 * Generating an artistic palette
 *
 * ```js
 * const swatch = "#fac99a";
 *
 * palette({ configuration: "artistic" }, swatch);
 *
 * // Optionally adjusting the contrast
 * palette({ configuration: "artistic", contrast: 90 }, swatch);
 *
 * // Optionally adjusting variant output
 * palette({ configuration: "artistic", tints: 5 }, swatch);
 * palette({ configuration: "artistic", tints: 4, tones: 0, shades: 2 }, swatch); // setting a variant to 0 excludes
 * palette({ configuration: "artistic", tints: 4, tones: 1, shades: 2 }, swatch);
 *
 * // Optionally including interface states
 * palette({ configuration: "artistic", stated: true }, swatch);
 *
 * // Optionally set dark mode
 * palette({ configuration: "artistic", dark: true }, swatch);
 * ```
 *
 * @see {@link accessibility}
 * @see {@link tokens}
 */
export function palette(settings, color) {
  // Set default configuration and settings and exclude interface states until requested
  const {
    configuration = "material",
    contrast = 100,
    accented = false,
    stated = false,
    dark = false,
  } = settings;

  // Generate from material-esque or artistic configuration depending on configuration
  if (configuration === "artistic") {
    const { tints = 3, tones = 3, shades = 3 } = settings;

    return artisticConfiguration(
      { contrast, tints, tones, shades, stated, dark },
      color,
    );
  }

  return materialConfiguration({ contrast, accented, stated, dark }, color);
}

/**
 * An action that takes a generated `palette` and filters it for accessibility
 * according to user `settings`.
 *
 * @param {object} settings - accessibility settings
 * @param {"standard" | "custom"} [settings.mode] - set the accessibility mode
 *
 * @param {"AA" | "AAA"} [settings.rating] - WCAG contrast rating to filter by (standard)
 * @param {boolean} [settings.large] - use adjusted contrast ratio for larger text? (standard)
 *
 * @param {number} [settings.min] - minimum percentage of contrast against the background (custom)
 * @param {number} [settings.max] - maximum percentage of contrast against the background (custom)
 *
 * @param {PaletteData} palette - palette data
 * @returns {PaletteData} filtered palette data
 *
 * @remarks
 * For most use cases, stick with the standard WCAG contrast ratio mode. Only
 * use custom mode if you *absolutely require* the precision.
 *
 * @example
 * Palette data accessibility filtering (standard)
 *
 * ```js
 * const swatch = "#ace";
 * const data = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * accessibility({ mode: "standard", rating: "AA" }, swatch);
 *
 * // Optionally set large text ratio
 * accessibility({ mode: "standard", rating: "AA", large: true }, swatch);
 *
 * // Optionally set enhanced rating
 * accessibility({ mode: "standard", rating: "AAA" }, swatch);
 * ```
 *
 * @example
 * Palette data accessibility filtering (custom)
 *
 * ```js
 * const swatch = "#ace";
 * const data = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * accessibility({ mode: "custom", min: 78 }, swatch);
 *
 * // Optionally set maximum contrast
 * accessibility({ mode: "custom", min: 78, max: 95 }, swatch);
 * ```
 */
export function accessibility(settings, palette) {
  // Set action defaults
  const { mode = "standard", rating = "AA", large = false } = settings;

  // If mode is custom
  if (mode === "custom") {
    const { min = 85, max } = settings;

    return paletteColorimetricContrast({ min, max }, palette);
  }

  return paletteWcagContrast({ rating, large }, palette);
}

/**
 * @typedef {{ bg: string; fg: string }} SurfaceTokens - BG, FG
 *
 * @typedef {Partial<{
 *   50: string;
 *   100: string;
 *   200: string;
 *   300: string;
 *   400: string;
 *   500: string;
 *   600: string;
 *   700: string;
 *   800: string;
 *   900: string;
 *   a100: string;
 *   a200: string;
 *   a300: string;
 *   a400: string; }>} MaterialVariantTokens - MAIN, ACCENT?
 *
 * @typedef {Partial<{
 *   light: { [key: string]: string };
 *   muted: { [key: string]: string };
 *   dark: { [key: string]: string }}>} ArtisticVariantTokens - LIGHT?, MUTED?, DARK?
 *
 * @typedef {Partial<{
 *  state: {
 *    pending: string;
 *    success: string;
 *    warning: string;
 *    error: string;
 *  } }>} StateTokens
 *
 * @typedef {SurfaceTokens & MaterialVariantTokens & StateTokens} MaterialTokens
 * @typedef {SurfaceTokens & ArtisticVariantTokens & StateTokens} ArtisticTokens
 * @typedef {MaterialTokens | ArtisticTokens} PaletteTokens - assembled palette token object
 */

/**
 * An emitter that takes a generated `palette` and transforms it into a collection
 * of tokens for use as-is or with an exporter.
 *
 * @param {PaletteData}
 * @returns {PaletteTokens}
 *
 * @example
 * Generating a collection of palette tokens from accessible palette data
 *
 * ```js
 * const swatch = "chartreuse";
 *
 * const data = palette({ configuration: "material", contrast: 90 }, swatch);
 * const safeColors = accessibility({ mode: "standard", rating: "AA" }, data);
 *
 * tokens(safeColors);
 * ```
 *
 * @example
 * Contextual palette example
 *
 * ```js
 * const swatch = "chartreuse";
 *
 * const data = palette({ configuration: "material", contrast: 90 }, swatch);
 *
 * const ui = accessibility({ mode: "standard", rating: "AA", large: true }, data);
 * const heading = accessibility({ mode: "standard", rating: "AA" }, data);
 * const text = accessibility({ mode: "standard", rating: "AAA" }, data);
 *
 * const color = {
 *   ui: tokens(ui),
 *   heading: tokens(heading),
 *   text: tokens(text)
 * };
 * ```
 *
 * @see {@link output}
 */
export function tokens(palette) {
  return tokenizePalette(palette);
}

/**
 * @typedef {Partial<{
 *   name: string;
 *   author: string;
 *   version: string;
 *   license: string;
 *   bump: string;
 *   metadata: {
 *     description?: string;
 *     comments?: string;
 *   }
 * }>} ProjectSettings
 *
 * @typedef {string} ColorValue
 *
 * @typedef {{ [variant: string]: ColorValue | ColorSubcategory }} ColorSubcategory
 *
 * @typedef {{ [category: string]: ColorValue | ColorSubcategory | {} | ColorSchema }} ColorSchema
 *
 * @typedef {{
 *   project: ProjectSettings;
 *   [palettes: string]: ColorSchema;
 * }} ColorDictionary
 */

/** @typedef {"gpl" | "sketchpalette"} PaletteFormat */

/**
 * An exporter that takes a complete color `dict` and prepares it for a given
 * palette `format`.
 *
 * @param {PaletteFormat} format - the target palette format
 * @param {ColorDictionary} dict - the input color dictionary
 * @returns {string} file-ready palette output
 *
 * @remarks
 * As a rule, exporter functions do *not* assume read/write access to your system.
 * The output of an exporter will either be a prepared file-ready template string
 * (or stringified JSON) or an object according to its return type.
 *
 * You can then write this data to a file using your environment's native
 * filesystem API or a filesystem library of your choice.
 *
 * @example
 * Exporting a color dictionary as GIMP/Inkscape palette
 *
 * ```js
 * const swatch = "dodgerblue";
 *
 * const color = tokens(
 *   palette({
 *     configuration: "artistic",
 *     contrast: 95,
 *     tints: 9,
 *     tones: 9,
 *     shades: 9
 *   }, swatch)
 * );
 *
 * output("gpl", { project: {}, ...color }); // project required by every exporter
 * ```
 *
 * @example
 * Exporting a color dictionary as a Sketch palette
 *
 * ```js
 * const swatch = "dodgerblue";
 *
 * const color = tokens(
 *   palette({
 *     configuration: "artistic",
 *     contrast: 95,
 *     tints: 9,
 *     tones: 9,
 *     shades: 9
 *   }, swatch)
 * );
 *
 * output("sketchpalette", { project: {}, ...color }); // project required by every exporter
 * ```
 */
export function output(format, dict) {
  return format === "sketchpalette" ? sketchpalette(dict) : gpl(dict);
}

// Internals

// Color Tokenization

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

// Color Validation

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

function hexValidator(color) {
  return /^#([\da-f]{3,4}){1,2}$/i.test(color);
}

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

function rgbValidator(color) {
  return matchFunctionalFormat(
    { prefix: "rgba?" },
    Array(3).fill(COMPONENT_TOKEN),
  ).test(color);
}

function hslValidator(color) {
  return matchFunctionalFormat({ prefix: "hsla?" }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}

function cmykValidator(color) {
  return matchFunctionalFormat(
    { prefix: "device-cmyk", legacy: false },
    Array(4).fill(COMPONENT_TOKEN),
  ).test(color);
}

function hwbValidator(color) {
  return matchFunctionalFormat({ prefix: "hwb", legacy: false }, [
    HUE_TOKEN,
    ...Array(2).fill(PERCENTAGE_TOKEN),
  ]).test(color);
}

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

function validator(input) {
  const formats = [
    namedValidator,
    hexValidator,
    rgbValidator,
    hslValidator,
    cmykValidator,
    hwbValidator,
    cielabValidator,
    cielchValidator,
    oklabValidator,
    oklchValidator,
  ];

  const [format] = formats
    .map((fn) => [fn.name.replace(/Validator/, ""), fn.bind(null)])
    .find(([, fn]) => fn(input));

  if (!format) {
    return InvalidColorError(input);
  }

  return [format, input];
}

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

// Color Value Extraction

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

function componentExtractor(color) {
  return color.match(/(-?[\d.](%|deg|g?rad|turn)?)+/g);
}

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

// Color Arithmetic

function clamp(x, a, b) {
  if (x < a) {
    return a;
  }

  if (x > b) {
    return b;
  }

  return x;
}

function hexFragmentToChannel(hex) {
  return parseInt(hex, 16);
}

function hexFragmentFromChannel(channel) {
  return clamp(channel, 0, 255).toString(16).padStart(2, "0");
}

function numberToPercentage(n) {
  return n * 100;
}

function numberFromPercentage(percentage) {
  return percentage / 100;
}

function numberToChannel(n) {
  return Math.round(n * 255);
}

function numberFromChannel(channel) {
  return channel / 255;
}

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

// Color Parsing

function hexParser([format, components]) {
  const [r, g, b, A] = components;

  const [R, G, B] = [r, g, b].map((fragment) => hexFragmentToChannel(fragment));

  if (A) {
    return [format, [R, G, B, numberFromChannel(hexFragmentToChannel(A))]];
  }

  return [format, [R, G, B, 1]];
}

function parsePercentage(component) {
  if (component.endsWith("%")) {
    return numberFromPercentage(parseFloat(component));
  }
  return parseFloat(component);
}

function rgbParser([format, components]) {
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

function parseHue(hue) {
  let HUE = parseFloat(hue);

  const gradians = hue.endsWith("grad");
  const radians = hue.endsWith("rad") && !gradians;
  const turns = hue.endsWith("turn");

  if (gradians) {
    HUE = gradiansToDegrees(HUE);
  }

  if (radians) {
    HUE = radiansToDegrees(HUE);
  }

  if (turns) {
    HUE = turnsToDegrees(HUE);
  }

  return hueCorrection(HUE);
}

function hslParser([format, components]) {
  const [h, s, l, A] = components;

  const H = parseHue(h);

  const [S, L] = [s, l].map((percentage) =>
    numberFromPercentage(parseFloat(percentage))
  );

  if (A) {
    return [format, [H, S, L, parsePercentage(A)]];
  }

  return [format, [H, S, L, 1]];
}

function cmykParser([format, components]) {
  const [C, M, Y, K, A] = components.map((V) => {
    if (V.endsWith("%")) return parsePercentage(V);
    return parseFloat(V);
  });

  if (A) {
    return [format, [C, M, Y, K, A]];
  }

  return [format, [C, M, Y, K, 1]];
}

function cielabParser([format, components]) {
  const [$L, $a, $b, A] = components;

  const [L, a, b] = [$L, $a, $b].map((component) => parseFloat(component));

  if (A) {
    return [format, [L, a, b, parsePercentage(A)]];
  }

  return [format, [L, a, b, 1]];
}

function cielchParser([format, components]) {
  const [$L, c, h, A] = components;

  const [L, C] = [$L, c].map((component) => parseFloat(component));
  const H = parseHue(h);

  if (A) {
    return [format, [L, C, H, parsePercentage(A)]];
  }

  return [format, [L, C, H, 1]];
}

function oklabParser([format, components]) {
  const [$L, $a, $b, A] = components;

  const L = parsePercentage($L);
  const [a, b] = [$a, $b].map((component) => parseFloat(component));

  if (A) {
    return [format, [L, a, b, parsePercentage(A)]];
  }

  return [format, [L, a, b, 1]];
}

function oklchParser([format, components]) {
  const [$L, c, h, A] = components;

  const L = parsePercentage($L);
  const C = parseFloat(c);
  const H = radiansFromDegrees(parseHue(h));

  if (A) {
    return [format, [L, C, H, parsePercentage(A)]];
  }

  return [format, [L, C, H, 1]];
}

function parser(extracted) {
  const [format] = extracted;

  const parsers = [
    hexParser,
    rgbParser,
    hslParser,
    cmykParser,
    cielabParser,
    cielchParser,
    oklabParser,
    oklchParser,
  ];

  if (format === "hwb") {
    return hslParser(extracted);
  }

  const parse = parsers.find((fn) => fn.name.replace(/Parser/, "") === format);

  return parse(extracted);
}

// Input -> RGB

function rgbInputIdentity([, values]) {
  const [r, g, b, A] = values;

  const [R, G, B] = [r, g, b].map((channel) => numberToChannel(channel));

  return ["rgb", [R, G, B, A]];
}

function rgbOutputIdentity([, rgbValues]) {
  return ["rgb", rgbValues];
}

function hexToRgb([, values]) {
  return ["rgb", values];
}

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

function cmykToRgb([, values]) {
  const [C, M, Y, K, A] = values;

  const [R, G, B] = [C, M, Y].map((V) => numberToChannel((1 - V) * (1 - K)));

  return ["rgb", [R, G, B, A]];
}

function hwbToRgb([, values]) {
  const [H, W, BLK, A] = values;

  // Achromacity
  if (W + BLK >= 1) {
    const GRAY = numberToChannel(W / (W + BLK));

    return ["rgb", [...Array(3).fill(GRAY), A]];
  }

  // Conversion
  const [, [r, g, b]] = hslToRgb(["hsl", [H, 1, 0.5, 1]]);
  const [R, G, B] = [r, g, b].map((channel) =>
    numberToChannel(numberFromChannel(channel) * (1 - W - BLK) + W)
  );

  return ["rgb", [R, G, B, A]];
}

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

// RGB -> Output

function hexFromRgb([, rgbValues]) {
  const [r, g, b, a] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => hexFragmentFromChannel(channel));
  const A = hexFragmentFromChannel(numberToChannel(a));

  return ["hex", [R, G, B, A]];
}

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

function cmykFromRgb([, rgbValues]) {
  const [r, g, b, A] = rgbValues;

  const [R, G, B] = [r, g, b].map((channel) => numberFromChannel(channel));

  const K = 1 - Math.max(R, G, B);
  const [C, M, Y] = [R, G, B].map((channel) => (1 - channel - K) / (1 - K));

  return ["cmyk", [C, M, Y, K, A]];
}

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

function cielabToCielch([, cielabValues]) {
  return ["cielch", scalarToPolar(["cielab", cielabValues])];
}

function cielabFromCielch([, cielchValues]) {
  return ["cielab", scalarFromPolar(["cielch", cielchValues])];
}

function oklabToOklch([, oklabValues]) {
  return ["oklch", scalarToPolar(["oklab", oklabValues])];
}

function oklabFromOklch([, oklchValues]) {
  return ["oklab", scalarFromPolar(["oklch", oklchValues])];
}

// Conversion pipeline

function inputToRgb(color) {
  const valid = validator(color);
  const extraction = extractor(valid);
  const parsed = parser(extraction);
  const [format] = parsed;

  // Input -> RGB
  const RGB = [hslToRgb, cmykToRgb, hwbToRgb, cielabToRgb, oklabToRgb];

  const input = (data, funcs) => {
    const [format] = data;

    return funcs.find((fn) => fn.name.startsWith(format))(data);
  };

  if (format === "hex" || format === "named") {
    return hexToRgb(parsed);
  }

  if (format === "rgb") {
    return rgbInputIdentity(parsed);
  }

  if (format.endsWith("lch")) {
    const scalar = [cielabFromCielch, oklabFromOklch].find((fn) =>
      fn.name.toLowerCase().endsWith(format)
    );

    return input(scalar(parsed), RGB);
  }

  return input(parsed, RGB);
}

function outputFromRgb(target, data) {
  // RGB -> Output
  const RGB = [
    hslFromRgb,
    cmykFromRgb,
    hwbFromRgb,
    cielabFromRgb,
    oklabFromRgb,
  ];

  const output = (funcs) => {
    return funcs.find((fn) => fn.name.startsWith(target))(data);
  };

  if (target === "hex") {
    return hexFromRgb(data);
  }

  if (target === "rgb") {
    return rgbOutputIdentity(data);
  }

  if (target === "cielch") {
    return cielabToCielch(cielabFromRgb(data));
  }

  if (target === "oklch") {
    return oklabToOklch(oklabFromRgb(data));
  }

  return output(RGB);
}

function conversion(color, to) {
  return outputFromRgb(to, inputToRgb(color));
}

// Color Serialization

function hexSerializer([, hexResult]) {
  const [R, G, B, A] = hexResult;

  if (A === "ff") {
    return "#".concat(R, G, B);
  }
  return "#".concat(R, G, B, A);
}

function serializeFunctionalFormat({ prefix, legacy = true }, components) {
  const DELIMITER = legacy ? ", " : " ";
  const ALPHA_DELIMITER = legacy ? ", " : " / ";

  // Coercing the result of toFixed() to a number preserves precision while removing trailing zeroes.
  const isOpaque = components[components.length - 1] === 1;
  const values = components.slice(0, components.length - 1);
  const alpha = Number(components.slice(-1)).toFixed(3);

  return (legacy && !isOpaque ? `${prefix}a(` : `${prefix}(`).concat(
    values.join(DELIMITER),
    isOpaque ? "" : ALPHA_DELIMITER.concat(+alpha),
    ")",
  );
}

function rgbSerializer([, rgbResult]) {
  const [r, g, b, A] = rgbResult;

  // Clamp RGB channels 0-255
  const [R, G, B] = [r, g, b].map(
    (component) => +clamp(component, 0, 255).toFixed(3),
  );

  return serializeFunctionalFormat({ prefix: "rgb" }, [R, G, B, A]);
}

function hslSerializer([, hslResult]) {
  const [h, s, l, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // format saturation, lightness to percentages
  const [S, L] = [s, l].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctionalFormat({ prefix: "hsl" }, [H, S, L, A]);
}

function cmykSerializer([, cmykResult]) {
  const [c, m, y, k, A] = cmykResult;

  // Format to percentage, cap at 0-100
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

function hwbSerializer([, hslResult]) {
  const [h, w, blk, A] = hslResult;

  // Correct the hue result
  const H = hueCorrection(+h.toFixed(3));

  // format white, black to percentages
  const [W, BLK] = [w, blk].map((n) => `${+numberToPercentage(n).toFixed(3)}%`);

  return serializeFunctionalFormat({ prefix: "hwb", legacy: false }, [
    H,
    W,
    BLK,
    A,
  ]);
}

function cielabSerializer([, cielabValues]) {
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

function cielchSerializer([, cielchValues]) {
  const [$L, c, h, A] = cielchValues;

  // Clamp lightness at 0-100
  const L = `${+clamp($L, 0, 100).toFixed(3)}%`;

  // Clamp chroma at 0-230
  const C = +clamp(c, 0, 230).toFixed(3);

  let H = h;

  // Hue is powerless if chroma is 0
  if (C === 0) {
    H = 0;
  } else {
    // Otherwise, format hue to degrees, correct hue
    H = +hueCorrection(radiansToDegrees(h)).toFixed(3);
  }

  return serializeFunctionalFormat({ prefix: "lch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}

function oklabSerializer([, oklabValues]) {
  const [$L, $a, $b, A] = oklabValues;

  // Format number to percentage, clamp at 0-100
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

function oklchSerializer([, oklchValues]) {
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

  return serializeFunctionalFormat({ prefix: "oklch", legacy: false }, [
    L,
    C,
    H,
    A,
  ]);
}

function serialize(results) {
  const [format] = results;

  const serializers = [
    hexSerializer,
    rgbSerializer,
    hslSerializer,
    cmykSerializer,
    hwbSerializer,
    cielabSerializer,
    cielchSerializer,
    oklabSerializer,
    oklchSerializer,
  ];

  const matched = serializers.find(
    (fn) => fn.name.replace(/Serializer/, "") === format,
  );

  return matched(results);
}

// Color Adjustment Internals

function extractOklchValues(color) {
  const formattedOklch = serialize(conversion(color, "oklch"));
  const [, components] = extractor(["oklch", formattedOklch]);

  return components.map((V) => parseFloat(V));
}

function adjustColorProperties(
  { lightness, chroma, hue, alpha },
  [l, c, h, a],
) {
  // Adjust properties only if defined, make values parseable
  const L = numberFromPercentage(lightness ? l + lightness : l);
  const C = chroma ? c + numberFromPercentage(chroma) * 0.5 * 0.5 : c;
  const H = radiansFromDegrees(hue ? hueCorrection(h + hue) : h);
  const A = alpha ? (a ?? 1) + numberFromPercentage(alpha) : a ?? 1;

  // Return adjusted values
  return [L, C, H, A];
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
  const oklch = serialize(["oklch", [L, C, H, A]]);

  // If input format is named, format to hex
  if (format === "named") {
    return serialize(conversion(oklch, "hex"));
  }

  // Otherwise use input format
  return serialize(conversion(oklch, format));
}

// Color Mixture Internals

function getOklabValues(color) {
  return conversion(color, "oklab");
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
  const oklab = serialize(["oklab", [L, a, b, A]]);

  if (format === "named") {
    return serialize(conversion(oklab, "hex"));
  }

  return serialize(conversion(oklab, format));
}

// Color Vision Internals

function cvdBrettelSimulation({ type, strength = 100 }, color) {
  // Parse values from RGB
  const [, [r, g, b, A]] = parser(
    extractor(["rgb", serialize(conversion(color, "rgb"))]),
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

function cvdVienotSimulation({ type, strength = 100 }, color) {
  // Parse values from RGB
  const [, [r, g, b, A]] = parser(
    extractor(["rgb", serialize(conversion(color, "rgb"))]),
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
  const rgb = serialize([
    "rgb",
    values.map((component, index) =>
      index !== 3 ? numberToChannel(component) : component
    ),
  ]);

  if (format === "named") {
    return serialize(conversion(rgb, "hex"));
  }

  return serialize(conversion(rgb, format));
}

// Contrast Sensitivity Internals

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

// Illuminant Internals

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
  return serialize(["rgb", [R, G, B, 1]]);
}

function checkIlluminant({ temperature = 1000, strength = 0 }, color) {
  const target = kelvinToRgb(temperature);

  return colorMix({ target, strength }, color);
}

// Color Interpolation Behavior

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

          if (action.name === "checkColorblindness") {
            const { method = "brettel", type, strength = 0 } = settings;

            result = checkColorblindness(
              {
                method,
                type,
                strength: interpolate(strength, pos),
              },
              color,
            );
          }

          if (action.name === "checkSensitivity") {
            const { contrast = 0, strength = 0 } = settings;

            result = checkSensitivity(
              {
                contrast: interpolate(contrast, pos),
                strength: interpolate(strength, pos),
              },
              color,
            );
          }

          if (action.name === "checkIlluminant") {
            const { temperature = 1000, strength = 0 } = settings;

            result = checkIlluminant(
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

// Color Harmony Internals

function colorHarmonies({ type, accented = false }, color) {
  const opposite = colorAdjustment({ hue: 180 }, color);

  const withComplement = accented ? [opposite] : [];

  const uniform = ({ arc = 30, values = 2 }, color) =>
    Array(values)
      .fill(color)
      .map((color, pos) => colorAdjustment({ hue: arc * pos }, color));

  const triad = (color, arc = 30, accented = false) => {
    const [a, b] = [
      colorAdjustment({ hue: 180 - arc }, color),
      colorAdjustment({ hue: 180 + arc }, color),
    ];

    return [
      colorAdjustment({ hue: 0 }, color),
      a,
      ...(accented ? [opposite] : []),
      b,
    ];
  };

  const tetrad = (color, arc = 30) => [
    colorAdjustment({ hue: 0 }, color),
    colorAdjustment({ hue: arc }, color),
    colorAdjustment({ hue: 180 }, color),
    colorAdjustment({ hue: 180 + arc }, color),
  ];

  const harmonies = {
    dyadic: [...uniform({}, color), ...withComplement],
    complementary: uniform({ arc: 180 }, color),
    analogous: [...uniform({ values: 3 }, color), ...withComplement],
    split: triad(color, 30, accented),
    triadic: triad(color, 60, accented),
    clash: triad(color, 90),
    double: tetrad(color),
    tetradic: tetrad(color, 60),
    square: uniform({ arc: 90, values: 4 }, color),
  };

  return harmonies[type] || color;
}

// Color Palette Internals

function generateSurface(contrast, color, dark = false) {
  const strength = 100 * numberFromPercentage(contrast);
  const surface = [
    colorMix({ target: "#ffffff", strength }, color),
    colorMix({ target: "#111111", strength }, color),
  ];

  return dark ? surface.reverse() : surface;
}

function generateMaterialVariants(contrast, [bg, fg], color) {
  const strength = 90 * numberFromPercentage(contrast);
  const interpolate = (target) =>
    colorInterpolation(colorMix, { target, strength, steps: 5 }, color);

  return [...interpolate(bg).reverse(), ...interpolate(fg)];
}

function generateMaterialAccents(
  contrast,
  variants,
  color,
  accented = false,
  dark = false,
) {
  const PERCENTAGE = 50;
  const HUE = 120;

  const limit = (max = 90) => max * numberFromPercentage(contrast);
  const interpolate = (properties) =>
    colorInterpolation(colorAdjustment, properties, color).map((target, pos) =>
      colorMix({ target, strength: limit(100) }, variants[pos])
    );

  return accented
    ? [
      ...interpolate({
        lightness: limit(dark ? -PERCENTAGE : PERCENTAGE),
        chroma: limit(-PERCENTAGE),
        hue: limit(-HUE),
        steps: 5,
      }).reverse(),
      ...interpolate({
        lightness: limit(dark ? PERCENTAGE : -PERCENTAGE),
        chroma: limit(PERCENTAGE),
        hue: limit(HUE),
        steps: 5,
      }),
    ]
    : [];
}

function generateArtisticVariants(contrast, { tints, tones, shades }, color) {
  const strength = 90 * numberFromPercentage(contrast);
  const interpolate = (target, steps) =>
    colorInterpolation(colorMix, { target, strength, steps }, color);

  return [
    tints ? interpolate("#ffffff", tints) : [],
    tones ? interpolate("#aaaaaa", tones) : [],
    shades ? interpolate("#111111", shades) : [],
  ];
}

function generateStates(contrast, [, fg], color, stated = false) {
  const strength = 90 * numberFromPercentage(contrast);
  return stated
    ? [
      colorMix({ target: "#dddddd", strength }, color),
      colorMix({ target: "#2ecc40", strength }, color),
      colorMix({ target: "#ffdc00", strength }, color),
      colorMix({ target: "#ff4136", strength }, color),
    ].map((states) => colorMix({ target: fg, strength: strength / 3 }, states))
    : [];
}

function materialConfiguration(
  { contrast = 100, accented = false, stated = false, dark = false },
  color,
) {
  // [bg, fg]
  const ui = generateSurface(contrast, color, dark);

  // [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const variants = generateMaterialVariants(contrast, ui, color);

  // [A100, A200, A300, A400, A500, A600, A700, A800, A900]
  const accents = generateMaterialAccents(
    contrast,
    variants,
    color,
    accented,
    dark,
  );

  // [PENDING, SUCCESS, WARNING, ERROR]
  const states = generateStates(contrast, ui, color, stated);

  return [ui, [variants, accents], states];
}

function artisticConfiguration(
  {
    contrast = 100,
    tints = 3,
    tones = 3,
    shades = 3,
    stated = false,
    dark = false,
  },
  color,
) {
  // [bg, fg]
  const ui = generateSurface(contrast, color, dark);

  // [tints[], tones[], shades[]]
  const variants = generateArtisticVariants(
    contrast,
    { tints, tones, shades },
    color,
  );

  const states = generateStates(contrast, ui, color, stated);

  return [ui, variants, states];
}

// Accessibility Internals

function calculateRelativeLuminance(color) {
  const [, [R, G, B]] = parser(
    extractor(["rgb", rgbSerializer(conversion(color, "rgb"))]),
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

function paletteWcagContrast({ rating = "AA", large = false }, palette) {
  // Extract palette datasets
  const [ui, variants, state] = palette;
  const [background] = ui;

  return [
    ui,
    variantContrastWcag({ rating, large, background }, variants),
    state,
  ];
}

function comparePerceptualLightness(bg, fg) {
  const [, bgValues] = extractor([
    "oklch",
    oklchSerializer(conversion(bg, "oklch")),
  ]);
  const [, fgValues] = extractor([
    "oklch",
    oklchSerializer(conversion(fg, "oklch")),
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

function paletteColorimetricContrast({ min = 75, max }, palette) {
  const [ui, variants, state] = palette;
  const [background] = ui;

  return [
    ui,
    variantsColorimetricContrast({ min, max, background }, variants),
    state,
  ];
}

// Color Token Internals

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

// Color Output Internals

function gplSwatch(color) {
  return conversion(color, "rgb")[1]
    .map((component) => String(component).padStart(3, " "))
    .slice(0, 3)
    .join("\t");
}

function gpl(dict) {
  const { project, ...palette } = dict;

  const {
    name = "Unknown",
    author = "Anonymous",
    version = "0.1.0",
    license = "Unlicense",
    bump = "manual",
  } = project;

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  const identifier = (collected, current, delim) => {
    if (current === "base") {
      return collected;
    }

    if (collected) {
      return [collected, current].join(delim);
    }

    return current;
  };

  const assemble = (head, node) =>
    Object.entries(node).reduce((str, [key, value]) => {
      const KEY = key.toUpperCase();

      // Ignore metadata
      if (key === "metadata") {
        return str;
      }

      if (typeof value === "object") {
        return str.concat(assemble(identifier(head, KEY, " "), value));
      }
      return str.concat(
        gplSwatch(value),
        "\t",
        identifier(head, KEY, " "),
        ` (${hexSerializer(conversion(value, "hex"))})`,
        "\n",
      );
    }, "");

  const timestamp = () => {
    const TIMESTAMP = new Date(Date.now());
    return [
      TIMESTAMP.toLocaleDateString(),
      TIMESTAMP.toLocaleTimeString(),
    ].join(" ");
  };

  return `
GIMP Palette
Name: ${name} (v${autobump ? bumpVersion(project) : version})
# Owned by ${author}
# License: ${license}
# ${timestamp()}

Columns: 6
${assemble("", palette)}
`.trimStart();
}

function sketchpaletteSwatch(color) {
  const swatch = serialize(conversion(color, "rgb"));
  const [, [red, green, blue, alpha]] = parser(extractor(["rgb", swatch]));

  return { red, green, blue, alpha };
}

function sketchpalette(dict) {
  const { project: _, ...palette } = dict;

  const assemble = (tree) =>
    Object.entries(tree).reduce((acc, [key, data]) => {
      // Ignore metadata
      if (key === "metadata") return acc;

      if (typeof data === "object") {
        return acc.concat(assemble(data));
      }

      return acc.concat(sketchpaletteSwatch(data));
    }, []);

  return JSON.stringify({
    colors: assemble(palette),
    pluginVersion: "1.4",
    compatibleVersion: "1.4",
  });
}
