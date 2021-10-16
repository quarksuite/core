// [[file:Mod.org::*Importing the Bootstrapper Helpers][Importing the Bootstrapper Helpers:1]]
import {
  AnimationCubicBezier,
  AnimationDuration,
  ArtisticPalette,
  BlendedPalette,
  FigureCalculations,
  GridDimensions,
  GridFractions,
  InterpolatedPalette,
  MaterialPalette,
  TextFamily,
  TextLeading,
  TextMeasure,
  TextSize,
  TextUnits,
  Viewport,
} from "./formulas.js";
import { ms_create } from "./utilities.js";
// Importing the Bootstrapper Helpers:1 ends here

// [[file:Mod.org::*Quarks System Dictionary Typedefs][Quarks System Dictionary Typedefs:1]]
/**
 * @typedef {object} QSDMetadata - Quarks System Dictionary general metadata (can be project or category local)
 * @property {string} description - category description (can be multiline)
 * @property {string} comments - supplementary information (can be multiline)
 */

/**
 * @typedef {object} QSDProject - Quarks System Dictionary project metadata (required by token exporters)
 * @property {string} name - project name (e.g. "Your Project Name")
 * @property {string} author - project author (e.g. "Ed N. Bacon", "Compucorp")
 * @property {string} version - project version (e.g. "0.0.0")
 * @property {"major" | "minor" | "patch" | "pre" | "build" } [bump] - optional autoversioning
 * @property {string} license - project license (e.g. "Unlicense")
 * @property {QSDMetadata} [metadata] - optional project metadata
 */

/**
 * @typedef {string | number} QSDValue - token value
 */

/**
 * @typedef {QSDValue[]} QSDScale - array of token values
 */

/**
 * @typedef {{base: QSDValue, [index: string]: QSDValue | QSDScale | QSDSubcategory }} QSDSubcategory - token subcategory (base represents default, any other properties are variants)
 */

/**
 * @typedef {{[index: string]: QSDValue | QSDScale | QSDSubcategory| QSDMetadata | object | QSDTokens }} QSDTokens - design tokens (consumed recursively by token exporters)
 */

/**
 * @typedef {{project?: QSDProject, [index: string]: QSDTokens }} QSD - Quarks System Dictionary design token spec
 */
// Quarks System Dictionary Typedefs:1 ends here

// [[file:Mod.org::*Bootstrapper Implementation][Bootstrapper Implementation:1]]
/**
 * A bootstrapper for quickly generating a Quarks System Dictionary. You will
 * still need to attach the project metadata before using the token exporters.
 *
 * @param {object} config - customize the bootstrapper output
 *
 * @param {object} [config.color] - customize the palette tokens
 * @param {string} [config.color.base] - the base color to generate from
 * @param {"material" | "artistic" | "blended" | "interpolated"} [config.color.type] - color palette type ("material" by default)
 *
 * @param {object} [config.scale] - customize the global modular scale
 * @param {number} [config.scale.initial] - the initial value to genenerate from
 * @param {number} [config.scale.ratio] - the ratio to calculate each scale value
 * @param {number} [config.scale.limit] - the global maximum for generated values
 *
 * @param {object} [config.text] - customize the text tokens
 *
 * @param {object} [config.text.primary] - settings for the primary font
 * @param {string | null} [config.text.primary.family] - the primary font family (if null, only system stack is used)
 * @param {"sans" | "serif" | "monospace"} [config.text.primary.system] - the system font stack (appended to primary font if defined)
 * @param {("thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black")[]} [config.text.primary.weights] - the font weights to define
 *
 * @param {object} [config.text.secondary] - settings for the secondary font
 * @param {string | null} [config.text.secondary.family] - the secondary font family (if null, only system stack is used)
 * @param {"sans" | "serif" | "monospace"} [config.text.secondary.system] - the system font stack (appended to secondary font if defined)
 * @param {("thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black")[]} [config.text.secondary.weights] - the font weights to define
 *
 * @param {object} [config.text.source] - settings for the source font
 * @param {string | null} [config.text.source.family] - the source font family (if null, only system stack is used)
 * @param {"sans" | "serif" | "monospace"} [config.text.source.system] - the system font stack (appended to source font if defined)
 * @param {("thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black")[]} [config.text.source.weights] - the font weights to define
 *
 * @param {object} [config.text.measure] - settings for the measure (line length)
 * @param {number} [config.text.measure.min] - the minimum measure
 * @param {number} [config.text.measure.max] - the maximum measure
 *
 * @param {object} [config.text.leading] - settings for the leading (line height)
 * @param {number} [config.text.leading.normal] - the default line height
 * @param {number} [config.text.leading.tight] - the minimum line height
 *
 * @param {number} [config.text.values] - set an individual limit for generated text values
 *
 * @param {object} [config.grid] - customize the grid tokens
 * @param {number} [config.grid.columns] - number of columns in the grid (defaults to global scale limit)
 * @param {number} [config.grid.ratio] - the individual ratio used to calculate number of rows (defaults to global scale ratio)
 *
 * @param {object} [config.viewport] - customize the viewport tokens
 * @param {number} [config.viewport.threshold] - the minimum viewport value
 * @param {number} [config.viewport.full] - the maximum viewport value
 * @param {("w" | "h" | "min" | "max")[]} [config.viewport.context] - the viewport context to generate
 * @param {number} [config.viewport.values] - set an individual limit for generated viewport values
 *
 * @param {object} [config.animation] - customize the animation tokens
 *
 * @param {object} [config.animation.duration] - settings for animation duration (in milliseconds)
 * @param {number} [config.animation.duration.fastest] - the minimum duration
 * @param {number} [config.animation.duration.slowest] - the maximum duration
 *
 * @param {object} [config.animation.easing] - settings for custom cubic bezier values
 * @param {number} [config.animation.easing.floor] - minimum value for y
 * @param {number} [config.animation.easing.ceiling] - maximum value for y
 *
 * @param {number} [config.animation.values] - set an individual limit for generated animation values
 *
 * @returns {QSDTokens} - Quarks System Dictionary tokens
 *
 * @remarks
 * `color.type` corresponds with a built-in palette formula. You can pass in
 * additional settings depending on what the color palette type allows.
 *
 * `animation.easing` will never output `x` values outside of the `0-1` range as
 * those are the boundaries of x values in the `cubic-bezier()` CSS timing function.
 * `y` values, on the other hand, have no set bounds
 *
 * @see {@link MaterialPalette} for color.type "material" options
 * @see {@link ArtisticPalette} for color.type "artistic" options
 * @see {@link InterpolatedPalette} for color.type "interpolated" options
 * @see {@link BlendedPalette} for color.type blended options
 *
 * @example
 * Generating the full collection of defaults.
 * ```ts
 * const dict = Quarks();
 * ```
 *
 * @example
 * Customizing the output
 * ```ts
 * const dict = Quarks({
 *   color: { base: "rebeccapurple", type: "artistic", scheme: "triadic" }
 * });
 * ```
 *
 * @example
 * Narrowing the output
 * ```ts
 * const palette = Quarks({
 *   color: { base: "chartreuse", scheme: "complementary" }
 * }).color
 * ```
 *
 * @see {@link https://github.com/quarksuite/core/blob/main/api#quarks | Quarks() API documentation}
 */
export function Quarks(config = {}) {
  // Set default color options
  const { base = "gray", type = "material", ...modifiers } = config.color || {};

  // Set default global modular scale options
  const { initial = 1, ratio = 1.5, limit = 6 } = config.scale || {};

  // Set default text options
  const {
    primary: {
      family: PRIMARY = null,
      system: PRIMARY_FALLBACK = "sans",
      weights: PRIMARY_WEIGHTS = ["regular", "bold"],
    } = {},
    secondary: {
      family: SEC = null,
      system: SEC_FALLBACK = "serif",
      weights: SEC_WEIGHTS = PRIMARY_WEIGHTS,
    } = {},
    source: {
      family: SRC = null,
      system: SRC_FALLBACK = "monospace",
      weights: SRC_WEIGHTS = PRIMARY_WEIGHTS,
    } = {},
    measure: { min = 45, max = 75 } = {},
    leading: { normal = 1.5, tight = 1.125 } = {},
    values: TEXT_VALUES = limit,
  } = config.text || {};

  // Set default grid options
  const { columns: COLUMNS = limit, ratio: GRID_RATIO = ratio } = config.grid ||
    {};

  // Set default viewport options
  const {
    threshold = 10,
    full = 100,
    context = ["w", "h"],
    values: VP_VALUES = limit,
  } = config.viewport || {};

  // Set default animation options
  const {
    duration: { fastest = 250, slowest = 1000 } = {},
    easing: { floor = 0, ceiling = 1 } = {},
    values: ANIMATION_VALUES = limit,
  } = config.animation || {};

  // Create global modular scale
  const SCALE = ms_create({ ratio, values: limit }, initial);

  // If config has limits defined, use those instead of global
  const [TEXT, GRID, VP, ANIMATION] = [
    TEXT_VALUES,
    COLUMNS,
    VP_VALUES,
    ANIMATION_VALUES,
  ].map((values) => ms_create({ ratio, values }, initial));

  // Generate grid rows from ratio
  const ROWS = Math.round(COLUMNS / GRID_RATIO);

  return {
    color: paletteFromType(base, type, modifiers),
    text: {
      primary: TextFamily(
        {
          system: PRIMARY_FALLBACK,
          weights: PRIMARY_WEIGHTS,
        },
        PRIMARY,
      ),
      secondary: TextFamily(
        { system: SEC_FALLBACK, weights: SEC_WEIGHTS },
        SEC,
      ),
      source: TextFamily(
        {
          system: SRC_FALLBACK,
          weights: SRC_WEIGHTS,
        },
        SRC,
      ),
      size: TextSize(TEXT),
      measure: TextMeasure({ min, max }, TEXT),
      leading: TextLeading({ normal, tight }, TEXT),
      unit: TextUnits(TEXT),
    },
    grid: {
      columns: COLUMNS,
      rows: ROWS,
      fr: GridFractions(GRID),
      ...GridDimensions(COLUMNS, ROWS),
    },
    viewport: Viewport({ threshold, full, context }, VP),
    animation: {
      duration: AnimationDuration({ fastest, slowest }, ANIMATION),
      easing: AnimationCubicBezier({ floor, ceiling }, ANIMATION),
    },
    ms: FigureCalculations(SCALE),
  };
}
// Bootstrapper Implementation:1 ends here

// [[file:Mod.org::*Bootstrapper Palette Types][Bootstrapper Palette Types:1]]
function paletteFromType(base, type, modifiers = {}) {
  return {
    material: MaterialPalette(modifiers, base),
    artistic: ArtisticPalette(modifiers, base),
    blended: BlendedPalette(modifiers, base),
    interpolated: InterpolatedPalette(modifiers, base),
  }[type];
}
// Bootstrapper Palette Types:1 ends here
