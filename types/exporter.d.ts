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
 * @typedef {string | number} TokenValue
 *
 * @typedef {{base: TokenValue; [variant: string]: TokenValue | TokenSubcategory }} TokenSubcategory
 *
 * @typedef {{ [category: string]: TokenValue | TokenSubcategory | {} | TokenSchema }} TokenSchema
 *
 * @typedef {{
 *   project: ProjectSettings;
 *   [tokens: string]: TokenSchema;
 * }} Dictionary
 */
/**
 * @typedef {"css" | "scss" | "less" | "styl"} StylesheetFormat
 * @typedef {"json" | "yaml"} DataFormat
 * @typedef {"tailwindcss" | "style-dictionary"} SchemaFormat
 */
/**
 * An exporter that takes a complete token `dict` and prepares a file-ready
 * template string for a given stylesheet `format`.
 *
 * @param {StylesheetFormat} format - the target stylesheet format
 * @param {Dictionary} dict - the input token dictionary
 * @returns {string} file-ready stylesheet output
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
 * Token dictionary stylesheet export example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { stylesheet } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const css = stylesheet("css", dict);
 * export const scss = stylesheet("scss", dict);
 * export const less = stylesheet("less", dict);
 * export const styl = stylesheet("styl", dict);
 * ```
 */
export function stylesheet(format: StylesheetFormat, dict: Dictionary): string;
/**
 * An exporter that takes a complete token `dict` and prepares a file-ready
 * template string for a given data `format`.
 *
 * @param {DataFormat} format - the target data format
 * @param {Dictionary} dict - the input token dictionary
 * @returns {string} file-ready data output
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
 * Token dictionary data export example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { data } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const json = data("json", dict);
 * export const yaml = data("yaml", dict);
 * ```
 */
export function data(format: DataFormat, dict: Dictionary): string;
/**
 * An exporter that takes a complete token `dict` and translates the data
 * to a given `format` schema.
 *
 * @param {SchemaFormat} format - the target schema
 * @param {Dictionary} dict - the input token dictionary
 * @returns {object} the output data
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
 * Token dictionary stylesheet export example
 *
 * ```js
 * import { palette } from "https://x.nest.land/quarksuite:core@2.0.0/color.js";
 * import { text, scale } from "https://x.nest.land/quarksuite:core@2.0.0/content.js";
 * import { schema } from "https://x.nest.land/quarksuite:core@2.0.0/exporter.js";
 *
 * const swatch = "dodgerblue";
 *
 * ratio = 1.5;
 * values = 6;
 *
 * const dict = {
 *   project: {
 *     name: "Example Stylesheet Variables",
 *     version: "0.1.0",
 *     author: "John Q. Public",
 *     license: "MIT",
 *   }, // required by every exporter
 *   esv: {
 *     color: palette({ configuration: "material" }, "dodgerblue"),
 *     text: {
 *       body: text({ system: "sans", weights: ["regular", "bold"] }, ""),
 *       size: scale({ configuration: "bidirectional", ratio, values }, "1rem"),
 *       measure: scale({ configuration: "ranged", floor: 45, trunc: true, ratio, values }, "75ch"),
 *       leading: scale({ configuration: "ranged", floor: 1.25, ratio, values }, 1.5),
 *       spacing: scale({ configuration: "bidirectional", ratio, values }, "1ex")
 *     }
 *   }
 * }
 *
 * export const theme = schema("tailwindcss", dict);
 * export const tokens = schema("style-dictionary", dict);
 * ```
 */
export function schema(format: SchemaFormat, dict: Dictionary): object;
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
export type TokenValue = string | number;
export type TokenSubcategory = {
    [variant: string]: TokenValue | TokenSubcategory;
    base: TokenValue;
};
export type TokenSchema = {
    [category: string]: {} | TokenValue | TokenSubcategory | TokenSchema;
};
export type Dictionary = {
    [tokens: string]: TokenSchema;
    project: ProjectSettings;
};
export type StylesheetFormat = "css" | "scss" | "less" | "styl";
export type DataFormat = "json" | "yaml";
export type SchemaFormat = "tailwindcss" | "style-dictionary";
