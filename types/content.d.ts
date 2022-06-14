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
/**
 * @typedef {{ [fraction: string]: string; }} GridFr
 * @typedef {{
 *   columns: number;
 *   rows: number;
 *   col: {
 *     [tracks: string]: number;
 *     fr: GridFr;
 *   },
 *   row: {
 *     [tracks: string]: number;
 *     fr: GridFr;
 *   }
 * }} GridTokens
 */
/**
 * An action that takes a number of `columns` and outputs grid tokens according
 * to user `settings`.
 *
 * @param {object} settings - grid settings
 * @param {number} [settings.ratio] - grid fraction ratio
 * @param {number} [settings.rows] - number of rows to generate
 *
 * @param {number} columns - number of columns to generate
 *
 * @returns {GridTokens} the generated grid tokens
 *
 * @example
 * Grid token generation examples
 *
 * ```js
 * const columns = 5
 *
 * // Setting just columns will also set the rows
 * grid({}, columns);
 *
 * // Setting rows explicitly
 * grid({ rows: 3 }, columns);
 *
 * // Setting the grid fraction ratio
 * grid({ ratio: 1.25 }, columns);
 * ```
 */
export function grid(settings: {
    ratio?: number;
    rows?: number;
}, columns: number): GridTokens;
/**
 * @typedef {string | number} ScaleValue - scale value (may be unitless)
 * @typedef {`${"bi" | "uni"}directional` | "ranged"} ScaleConfiguration
 * @typedef {ScaleValue} RootValue - scale root (initial) value
 * @typedef {{base: ScaleValue; [variants: string]: ScaleValue}} DirectionalTokens
 * @typedef {{base: ScaleValue; [range: string]: ScaleValue; max: ScaleValue}} MinimumRangedContext
 * @typedef {{base: ScaleValue; [range: string]: ScaleValue; min: ScaleValue}} MaximumRangedContext
 * @typedef {MinimumRangedContext | MaximumRangedContext} RangedTokens
 * @typedef {DirectionalTokens | RangedTokens} ScaleTokens
 */
/**
 * An action that takes a `root` CSS value and outputs a modular scale according
 * to user `settings`.
 *
 * @param {object} settings - scale token settings
 * @param {ScaleConfiguration} [settings.configuration] - set the scale configuration
 *
 * @param {string} [settings.inversion] - set the output units for the inverse (bidirectional)
 *
 * @param {ScaleValue} [settings.floor] - set the range floor (ranged)
 * @param {boolean} [settings.trunc] - truncate the values? (ranged)
 * @param {boolean} [settings.reverse] - reverse the context (ranged)
 *
 * @param {RootValue} root - the root value to generate from
 * @returns {ScaleValue} the generated scale tokens
 *
 * @example
 * Scale generation examples
 *
 * ```js
 * scale({ configuration: "bidirectional", inversion: "em" }, "1rem"); // text size
 * scale({ configuration: "ranged", floor: "45ch", trunc: true }, "75ch"); // text measure
 * scale({ configuration: "ranged", floor: 1.25 }, 1.5) // text leading
 * ```
 *
 * @remarks
 * When using the ranged type, you must set your *maximum* value as the root.
 * Otherwise, use the minimum value for directional types.
 */
export function scale(settings: {
    configuration?: ScaleConfiguration;
    inversion?: string;
    floor?: ScaleValue;
    trunc?: boolean;
    reverse?: boolean;
}, root: RootValue): ScaleValue;
export type TextWeights = "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
export type TextSystem = "sans" | "serif" | "monospace";
export type TextWeightsTokens = {
    [key: string]: number;
};
export type TextTokens = {
    family: string;
} & TextWeightsTokens;
export type GridFr = {
    [fraction: string]: string;
};
export type GridTokens = {
    columns: number;
    rows: number;
    col: {
        [tracks: string]: number;
        fr: GridFr;
    };
    row: {
        [tracks: string]: number;
        fr: GridFr;
    };
};
/**
 * - scale value (may be unitless)
 */
export type ScaleValue = string | number;
export type ScaleConfiguration = `${"bi" | "uni"}directional` | "ranged";
/**
 * - scale root (initial) value
 */
export type RootValue = ScaleValue;
export type DirectionalTokens = {
    [variants: string]: ScaleValue;
    base: ScaleValue;
};
export type MinimumRangedContext = {
    [range: string]: ScaleValue;
    base: ScaleValue;
    max: ScaleValue;
};
export type MaximumRangedContext = {
    [range: string]: ScaleValue;
    base: ScaleValue;
    min: ScaleValue;
};
export type RangedTokens = MinimumRangedContext | MaximumRangedContext;
export type ScaleTokens = DirectionalTokens | RangedTokens;
