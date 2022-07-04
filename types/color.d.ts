/** @typedef {"hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "lab" | "lch" | "oklab" | "oklch"} CSSColorFormats */
/**
 * An action that takes any valid CSS `color` and converts it `to` another format.
 *
 * @param {CSSColorFormats} to - the target format
 *
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
 *   a900: string; }>} MaterialVariantTokens - MAIN, ACCENTS?
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
 * An action that takes any valid CSS `color` and generates color tokens
 * according to user settings.
 *
 * @param {object} settings - palette settings
 * @param {"material" | "artistic"} [settings.configuration] - set the palette configuration
 * @param {number} [settings.contrast] - set the overall palette contrast
 * @param {boolean} [settings.accents] - generate accent colors?
 * @param {boolean} [settings.dark] - using dark mode?
 *
 * @param {boolean} [settings.states] - generate interface states? (material)
 *
 * @param {number} [settings.tints] - set number of tints to generate (artistic)
 * @param {number} [settings.tones] - set number of tones to generate (artistic)
 * @param {number} [settings.shades] - set number of shades to generate (artistic)
 *
 * @param {string} color - the input color
 * @returns {PaletteTokens} the generated palette
 *
 * @example
 * Generating a material-esque palette
 *
 * ```js
 * const swatch = "#feb07f";
 *
 * palette({ configuration: "material" }, swatch);
 *
 * // adjust contrast
 * palette({ configuration: "material", contrast: 90 }, swatch);
 *
 * // with accents
 * palette({ configuration: "material", accents: true }, swatch);
 *
 * // with interface states
 * palette({ configuration: "material", states: true }, swatch);
 *
 * // dark mode
 * palette({ configuration: "material", dark: true }, swatch);
 * ```
 *
 * @example
 * Generating an artistic palette
 *
 * ```js
 * const swatch = "#3a0ffa";
 *
 * palette({ configuration: "artistic" }, swatch);
 *
 * // adjust contrast
 * palette({ configuration: "artistic", contrast: 95 }, swatch);
 *
 * // with accents
 * palette({ configuration: "artistic", accents: true }, swatch);
 *
 * // adjust generated variants (tints, tones, shades)
 * palette({ configuration: "artistic", tints: 2, tones: 0, shades: 4 }, swatch);
 *
 * // dark mode
 * palette({ configuration: "artistic", dark: true }, swatch);
 * ```
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
}, color: string): PaletteTokens;
/**
 * An action that takes a generated `palette` and filters it for accessibility
 * according to user `settings`.
 *
 * @param {object} settings - accessibility settings
 * @param {"standard" | "custom"} [settings.mode] - set the accesibility mode
 *
 * @param {"AA" | "AAA"} [settings.rating] - set color contrast rating
 * @param {boolean} [settings.large] - use large text rating?
 *
 * @param {number} [settings.min] - set minimum contrast from background (as a percentage)
 * @param {number} [settings.max] - set maximum contrast from background (as a percentage)
 *
 * @param {PaletteTokens} palette - generated palette
 * @returns {PaletteTokens} the filtered palette
 *
 * @example
 * WCAG standard mode
 *
 * ```js
 * const swatch = "#eca0ff";
 * const tokens = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * // AA
 * a11y({ mode: "standard", rating: "AA" }, tokens);
 *
 * // AA (large)
 * a11y({ mode: "standard", rating: "AA", large: true }, tokens);
 *
 * // AAA
 * a11y({ mode: "standard", rating: "AAA" }, tokens);
 * ```
 *
 * @example
 * Custom colorimetric comparison mode
 *
 * ```js
 * const swatch = "#0ca08f";
 * const tokens = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * // valid if perceptual lightness has a 60% difference from background
 * a11y({ mode: "custom", min: 60 }, tokens);
 *
 * // valid if perceptual lightness has a 60-75% difference from background
 * a11y({ mode: "standard", min: 60, max: 75 }, tokens);
 * ```
 */
export function a11y(settings: {
    mode?: "standard" | "custom";
    rating?: "AA" | "AAA";
    large?: boolean;
    min?: number;
    max?: number;
}, palette: PaletteTokens): PaletteTokens;
/**
 * @typedef {"prot" | "deuter" | "trit"} CVD
 * @typedef {"brettel" | "vienot"} CVDMethod
 * @typedef {"achromatopsia" | `${CVD}anomaly` | `${CVD}anopia`} ColorVision
 */
/**
 * An action that takes a generated `palette` and overlays a color perception
 * simulator according to user `settings`.
 *
 * @param {object} [settings] - color perception simulation settings
 * @param {"vision" | "contrast" | "illuminant"} [settings.check] - set simulation target
 * @param {number} [settings.severity] - set severity of simulation (where applicable)
 *
 * @param {ColorVision} [settings.as] - set colorblindness to target
 * @param {CVDMethod} [settings.method] - set colorblindness algorithm to use
 *
 * @param {number} [settings.factor] - set contrast sensitivity gray factor
 *
 * @param {number} [settings.K] - set illuminant temperature
 *
 * @param {PaletteTokens} palette - generated palette
 * @returns {PaletteTokens} the simulated palette
 *
 * @example
 * Color vision simulator
 *
 * ```js
 * const swatch = "#ccf02f";
 * const tokens = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * // Achromatopsia
 * perception({ check: "vision", as: "achromatopsia" }, tokens);
 *
 * // Protanopia
 * perception({ check: "vision", as: "protanopia" }, tokens);
 *
 * // Deuteranopia
 * perception({ check: "vision", as: "deuteranopia" }, tokens);
 *
 * // Tritanopia
 * perception({ check: "vision", as: "tritanopia" }, tokens);
 *
 * // with severity (anomalous trichromacy simulations)
 * perception({ check: "vision", as: "protanomaly", severity: 40 }, tokens);
 * perception({ check: "vision", as: "deuteranomaly", severity: 60 }, tokens);
 * perception({ check: "vision", as: "tritanomaly", severity: 80 }, tokens);
 * ```
 *
 * @example
 * Contrast sensitivity simulator
 *
 * ```js
 * const swatch = "#ffa02f";
 * const tokens = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * // factor: 0-100% (black -> gray -> white)
 * perception({ check: "contrast", factor: 0 }, tokens);
 * perception({ check: "contrast", factor: 50 }, tokens);
 * perception({ check: "contrast", factor: 100 }, tokens);
 *
 * // with severity
 * perception({ check: "contrast", factor: 48, severity: 60 }, tokens);
 * ```
 *
 * @example
 * Illuminant simulator
 *
 * ```js
 * const swatch = "#ff5caf";
 * const tokens = palette({ configuration: "material", contrast: 95 }, swatch);
 *
 * // K: 1850-6600K (candlelight -> incandescent bulb -> studio lamp -> lcd)
 * perception({ check: "illuminant", K: 1850 }, tokens);
 * perception({ check: "illuminant", K: 2400 }, tokens);
 * perception({ check: "illuminant", K: 3200 }, tokens);
 * perception({ check: "illuminant", K: 6600 }, tokens);
 *
 * // with severity
 * perception({ check: "illuminant", K: 5000, severity: 75 }, tokens);
 * ```
 */
export function perception(settings?: {
    check?: "vision" | "contrast" | "illuminant";
    severity?: number;
    as?: ColorVision;
    method?: CVDMethod;
    factor?: number;
    K?: number;
}, palette: PaletteTokens): PaletteTokens;
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
 * const color = palette({
 *   configuration: "artistic",
 *   contrast: 95,
 *   tints: 9,
 *   tones: 9,
 *   shades: 9
 * }, swatch);
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
 * const color = palette({
 *   configuration: "artistic",
 *   contrast: 95,
 *   tints: 9,
 *   tones: 9,
 *   shades: 9
 * }, swatch);
 *
 * output("sketchpalette", { project: {}, ...color }); // project required by every exporter
 * ```
 */
export function output(format: PaletteFormat, dict: ColorDictionary): string;
export type CSSColorFormats = "hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "lab" | "lch" | "oklab" | "oklch";
export type ColorHarmonies = "dyadic" | "complementary" | "analogous" | "split" | "clash" | "triadic" | "double" | "tetradic" | "square";
/**
 * - BG, FG
 */
export type SurfaceTokens = {
    bg: string;
    fg: string;
};
/**
 * - MAIN, ACCENTS?
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
export type CVD = "prot" | "deuter" | "trit";
export type CVDMethod = "brettel" | "vienot";
export type ColorVision = "achromatopsia" | `${CVD}anomaly` | `${CVD}anopia`;
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
