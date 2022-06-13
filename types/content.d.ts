/**
 * @typedef {"thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black"} TextWeights
 * @typedef {"sans" | "serif" | "monospace"} TextSystem
 *
 * @typedef {{ [key: string]: number; }} TextWeightsTokens
 * @typedef {{
 *   family: string;
 * } & TextWeightsTokens} TextTokens
 */
/**
 * An action that takes a `font` string and generates text tokens according to
 * user `settings`.
 *
 * @param {object} settings - text settings
 * @param {TextWeights[]} [settings.weights] - set text weights
 * @param {TextSystem} [settings.system] - set system font stack
 *
 * @param {string} font - a custom font (or `""` for just the system stack)
 * @returns {TextTokens} the generated text tokens
 *
 * @example
 * Text token examples
 *
 * ```js
 * text({ system: "sans", weights: ["regular", "bold"] }, "") // empty string means system font stack only
 * text({ system: "sans", weights: ["regular", "bold"] }, "Work Sans") // otherwise custom font is first in stack
 * ```
 */
export function text(settings: {
    weights?: TextWeights[];
    system?: TextSystem;
}, font: string): TextTokens;
/** @typedef {number[]} ModularScale */
/**
 * An action that takes a `base` value and generates modular scale data
 * according to user `settings`.
 *
 * @param {object} settings - modular scale settings
 * @param {number | number[]} [settings.ratio] - set scale ratio(s)
 * @param {number} [settings.values] - set number of scale values
 *
 * @param {number} base - base value to generate from
 * @returns {ModularScale} modular scale data
 *
 * @example
 * Modular scale generation examples
 *
 * ```js
 * ms({ ratio: 1.5, values: 6 }, 1);
 * ms({ ratio: [1.25, 1.5, 1.75], values: 6 }, 1); // multiple ratios allowed
 * ```
 *
 * @see {@link modify}
 * @see {@link tokens}
 */
export function ms(settings: {
    ratio?: number | number[];
    values?: number;
}, base: number): ModularScale;
/**
 * An action that takes a generated `ms` and updates each value via a
 * `calc` modifier.
 *
 * @param {(n: number) => number} calc - the recalculation function
 * @param {ModularScale} ms - the input modular scale data
 * @returns {ModularScale} the modified scale data
 *
 * @example
 * Modular scale modification examples
 *
 * ```js
 * const scale = ms({ ratio: 1.25, values: 4 }, 1);
 *
 * modify((n) => n ** 3, scale);
 * modify((n) => n / 2, scale);
 * ```
 *
 * @see {@link tokens}
 */
export function modify(calc: (n: number) => number, ms: ModularScale): ModularScale;
/** @typedef {`${"bi" | "uni"}directional` | "ranged" | "grid"} OutputType */
/**
 * @typedef {string | number} ContentValue
 * @typedef {{base: ContentValue; [scale: string]: ContentValue}} DirectionalTokens
 * @typedef {{base: ContentValue; [scale: string]: ContentValue; max: ContentValue}} MinimumRangedContext
 * @typedef {{base: ContentValue; [scale: string]: ContentValue; min: ContentValue}} MaximumRangedContext
 * @typedef {MinimumRangedContext | MaximumRangedContext} RangedTokens
 *
 * @typedef {{ [tracks: string]: number; }} GridTracks
 * @typedef {{columns: number; rows: number; cols: GridTracks; row: GridTracks; }} GridTokens
 */
/**
 * An action that takes a generated `ms` and outputs content tokens according
 * to user `settings`.
 *
 * @param {object} settings - content token settings
 * @param {OutputType} [settings.type] - set the output type
 *
 * @param {string} [settings.unit] - set the output units (bidirectional, unidirectional, ranged)
 *
 * @param {string} [settings.inversion] - set the output units for the inverse (bidirectional)
 *
 * @param {number} [settings.min] - set the minimum range value (ranged)
 * @param {number} [settings.max] - set the maximum range value (ranged)
 * @param {boolean} [settings.trunc] - truncate the values? (ranged)
 * @param {"min" | "max"} [settings.context] - set the token context (ranged)
 *
 * @param {ModularScale} ms - the input modular scale data
 * @returns {DirectionalTokens | RangedTokens | GridTokens} the generated content tokens
 *
 * @example
 * Content token generation examples
 *
 * ```js
 * const scale = ms({ ratio: 1.4, values: 7 }, 1);
 *
 * tokens({ type: "bidirectional", unit: "rem", inversion: "em" }, scale) // text size
 * tokens({ type: "ranged", min: 45, max: 75, unit: "ch", context: "max" }, scale) // text measure
 * tokens({ type: "ranged", min: 1.25, max: 1.5, context: "max" }, scale) // text leading
 *
 * tokens({ type: "grid" }, scale) // CSS grid tracks
 * ```
 */
export function tokens(settings: {
    type?: OutputType;
    unit?: string;
    inversion?: string;
    min?: number;
    max?: number;
    trunc?: boolean;
    context?: "min" | "max";
}, ms: ModularScale): DirectionalTokens | RangedTokens | GridTokens;
export type TextWeights = "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
export type TextSystem = "sans" | "serif" | "monospace";
export type TextWeightsTokens = {
    [key: string]: number;
};
export type TextTokens = {
    family: string;
} & TextWeightsTokens;
export type ModularScale = number[];
export type OutputType = `${"bi" | "uni"}directional` | "ranged" | "grid";
export type ContentValue = string | number;
export type DirectionalTokens = {
    [scale: string]: ContentValue;
    base: ContentValue;
};
export type MinimumRangedContext = {
    [scale: string]: ContentValue;
    base: ContentValue;
    max: ContentValue;
};
export type MaximumRangedContext = {
    [scale: string]: ContentValue;
    base: ContentValue;
    min: ContentValue;
};
export type RangedTokens = MinimumRangedContext | MaximumRangedContext;
export type GridTracks = {
    [tracks: string]: number;
};
export type GridTokens = {
    columns: number;
    rows: number;
    cols: GridTracks;
    row: GridTracks;
};
