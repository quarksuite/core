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
export function convert(to: CSSColorFormats, color: string): string;
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
export function adjust(settings: {
    lightness?: number;
    chroma?: number;
    hue?: number;
    alpha?: number;
    steps?: number;
}, color: string): string | string[];
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
export function mix(settings: {
    target?: string;
    strength?: number;
    steps?: number;
}, color: string): string | string[];
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
export function harmony(settings: {
    configuration?: ColorHarmonies;
    accented?: boolean;
}, color: string): [string, string, string?, string?];
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
export function vision(settings: {
    as?: ColorVision;
    method?: CVDMethod;
    severity?: number;
    steps?: number;
}, color: string): string | string[];
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
export function contrast(settings: {
    factor?: number;
    severity?: number;
    steps?: number;
}, color: string): string | string[];
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
export function illuminant(settings: {
    K?: number;
    intensity?: number;
    steps?: number;
}, color: string): string | string[];
/**
 * @typedef {(string[] | string[][])[]} PaletteData - palette data configurations
 * material: [[bg, fg], [main, accents | []], states | []]
 * artsitic: [[bg, fg], [tints | [], tones | [], shades | []], accents | []]
 */
/**
 * An action that takes any valid CSS `color` and generates a palette according
 * to user `settings`.
 *
 * @param {object} settings - palette settings
 * @param {"material" | "artistic"} [settings.configuration] - set the palette configuration
 * @param {number} [settings.contrast] - set the overall palette contrast (both configurations)
 * @param {boolean} [settings.accents] - include accent colors? (both configurations)
 * @param {boolean} [settings.dark] - toggle dark mode? (both configurations)
 *
 * @param {boolean} [settings.states] - include interface states? (material)
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
 * palette({ configuration: "material", accents: true }, swatch);
 *
 * // Optionally including interface states
 * palette({ configuration: "material", states: true }, swatch);
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
 * // Optionally including accents
 * palette({ configuration: "artistic", accents: true }, swatch);
 *
 * // Optionally set dark mode
 * palette({ configuration: "artistic", dark: true }, swatch);
 * ```
 *
 * @see {@link accessibility}
 * @see {@link tokens}
 */
export function palette(settings: {
    configuration?: "material" | "artistic";
    contrast?: number;
    accents?: boolean;
    dark?: boolean;
    states?: boolean;
    tints?: number;
    tones?: number;
    shades?: number;
}, color: string): PaletteData;
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
export function accessibility(settings: {
    mode?: "standard" | "custom";
    rating?: "AA" | "AAA";
    large?: boolean;
    min?: number;
    max?: number;
}, palette: PaletteData): PaletteData;
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
 *   a50: string;
 *   a100: string;
 *   a200: string;
 *   a300: string;
 *   a400: string;
 *   a500: string;
 *   a600: string;
 *   a700: string;
 *   a800: string;
 *   a900: string; }>} MaterialVariantTokens - MAIN, ACCENT?
 *
 * @typedef {Partial<{
 *   light: { [key: string]: string };
 *   muted: { [key: string]: string };
 *   dark: { [key: string]: string }; }>} ArtisticVariantTokens - LIGHT?, MUTED?, DARK?
 *
 * @typedef {Partial<{ accent: { [key: string]: string; } }>} ArtisticAccentTokens
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
 * @typedef {SurfaceTokens & ArtisticVariantTokens & ArtisticAccentTokens} ArtisticTokens
 * @typedef {MaterialTokens | ArtisticTokens} PaletteTokens - assembled palette token object
 */
/**
 * An emitter that takes a generated `palette` and assembles it into a collection
 * of color tokens for use as-is or with an exporter.
 *
 * @param {PaletteData} palette - generated palette data
 * @returns {PaletteTokens} assembled color tokens
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
export function tokens(palette: PaletteData): PaletteTokens;
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
export function output(format: PaletteFormat, dict: ColorDictionary): string;
export type CSSColorFormats = "hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "lab" | "lch" | "oklab" | "oklch";
export type ColorHarmonies = "dyadic" | "complementary" | "analogous" | "split" | "clash" | "triadic" | "double" | "tetradic" | "square";
export type CVD = "prot" | "deuter" | "trit";
export type CVDMethod = "brettel" | "vienot";
export type ColorVision = "achromatopsia" | `${CVD}anomaly` | `${CVD}anopia`;
/**
 * - palette data configurations
 * material: [[bg, fg], [main, accents | []], states | []]
 * artsitic: [[bg, fg], [tints | [], tones | [], shades | []], accents | []]
 */
export type PaletteData = (string[] | string[][])[];
/**
 * - BG, FG
 */
export type SurfaceTokens = {
    bg: string;
    fg: string;
};
/**
 * - MAIN, ACCENT?
 */
export type MaterialVariantTokens = Partial<{
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    a50: string;
    a100: string;
    a200: string;
    a300: string;
    a400: string;
    a500: string;
    a600: string;
    a700: string;
    a800: string;
    a900: string;
}>;
/**
 * - LIGHT?, MUTED?, DARK?
 */
export type ArtisticVariantTokens = {
    light?: {
        [key: string]: string;
    };
    muted?: {
        [key: string]: string;
    };
    dark?: {
        [key: string]: string;
    };
};
export type ArtisticAccentTokens = {
    accent?: {
        [key: string]: string;
    };
};
export type StateTokens = Partial<{
    state: {
        pending: string;
        success: string;
        warning: string;
        error: string;
    };
}>;
export type MaterialTokens = SurfaceTokens & MaterialVariantTokens & StateTokens;
export type ArtisticTokens = SurfaceTokens & ArtisticVariantTokens & ArtisticAccentTokens;
/**
 * - assembled palette token object
 */
export type PaletteTokens = MaterialTokens | ArtisticTokens;
export type ProjectSettings = Partial<{
    name: string;
    author: string;
    version: string;
    license: string;
    bump: string;
    metadata: {
        description?: string;
        comments?: string;
    };
}>;
export type ColorValue = string;
export type ColorSubcategory = {
    [variant: string]: string | ColorSubcategory;
};
export type ColorSchema = {
    [category: string]: string | {} | ColorSubcategory | ColorSchema;
};
export type ColorDictionary = {
    [palettes: string]: ColorSchema;
    project: ProjectSettings;
};
export type PaletteFormat = "gpl" | "sketchpalette";
