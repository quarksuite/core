// Project: Quarks System Core (v1.2.0)
// Author: Chatman R. Jr <crjr.code@protonmail.com>
// Repository: https://github.com/quarksuite/core
// License: Unlicense

// Summary:
// A library for creating, assembling, and distributing foundational design
// tokens for web projects.

// Notes:
// The source code follows a naming style with the following rules.
//
// - Higher level token spec assemblers use PascalCase
// - Lower level data generators/token exporters use snake_case
// - Internals use conventional camelCase
//

/** @typedef {{
    color: QSPaletteMaterial | QSPaletteArtistic
    text: {
    primary: QSTextFamily,
    secondary: QSTextFamily,
    source: QSTextFamily,
    size: QSGeneralSubcategory,
    measure: QSGeneralSubcategoryRange,
    leading: QSGeneralSubcategoryRange,
    unit: QSGeneralSubcategory
    },
    grid: {
    columns: number,
    rows: number,
    fr: QSGeneralSubcategory,
    col: Pick<QSGridDimensions, "col">,
    row: Pick<QSGridDimensions, "row">
    },
    viewport: QSViewport,
    animation: {
    duration: QSGeneralSubcategoryRange,
    easing: QSAnimationCubicBezier
    },
    ms: QSGeneralSubcategory
}} QSBootstrapperTokens */

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
 * @param {object} [config.ms] - customize the global modular scale
 * @param {number} [config.ms.initial] - the initial value to genenerate from
 * @param {number} [config.ms.ratio] - the ratio to calculate each scale value
 * @param {number} [config.ms.limit] - the global maximum for generated values
 *
 * @param {object} [config.text] - customize the text tokens
 *
 * @param {object} [config.text.primary] - settings for the primary font
 * @param {string | null} [config.text.primary.family] - the primary font family (if null, only system stack is used)
 * @param {QSTextFamilySystem} [config.text.primary.system] - the system font stack (appended to primary font if defined)
 * @param {QSTextFamilyStyle[]} [config.text.primary.weights] - the font weights to define
 *
 * @param {object} [config.text.secondary] - settings for the secondary font
 * @param {string | null} [config.text.secondary.family] - the secondary font family (if null, only system stack is used)
 * @param {QSTextFamilySystem} [config.text.secondary.system] - the system font stack (appended to secondary font if defined)
 * @param {QSTextFamilyStyle[]} [config.text.secondary.weights] - the font weights to define
 *
 * @param {object} [config.text.source] - settings for the source font
 * @param {string | null} [config.text.source.family] - the source font family (if null, only system stack is used)
 * @param {QSTextFamilySystem} [config.text.source.system] - the system font stack (appended to source font if defined)
 * @param {QSTextFamilyStyle[]} [config.text.source.weights] - the font weights to define
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
 * @param {QSViewportDimensions[]} [config.viewport.context] - the viewport context to generate
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
 * @returns {QSBootstrapperTokens} Quarks System Dictionary tokens
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
 * @see {@link BlendedPalette} for color.type "blended" options
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
 */
export function Quarks(config = {}) {
  // Set default color options
  const { base = "gray", type = "material", ...modifiers } = config.color || {};

  // Set default global modular scale options
  const { initial = 1, ratio = 1.5, limit = 6 } = config.ms || {};

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

  // Set default grid options (if ratio is multithreaded, the grid ratio is the average of the values)
  const {
    columns: COLUMNS = limit,
    ratio: GRID_RATIO = Array.isArray(ratio)
      ? ratio.reduce((acc, v) => acc + v, 0) / ratio.length
      : ratio,
  } = config.grid || {};

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

function paletteFromType(base, type, modifiers = {}) {
  return {
    material: MaterialPalette(modifiers, base),
    artistic: ArtisticPalette(modifiers, base),
    blended: BlendedPalette(modifiers, base),
    interpolated: InterpolatedPalette(modifiers, base),
  }[type];
}

/** @typedef {"dyadic" | "complementary" | "analgous" | "split" | "triadic" | "clash" | "tetradic" | "square" | "star" | "hexagon"} QSPaletteScheme - built-in color schemes for palette formulas */

/** @typedef {"hex" | "rgb" | "hsl" | "cmyk" | "hwb" | "cielab" | "cielch" | "oklab"} QSPaletteFormat - built-in color formats for palette formulas */

/** @typedef {{
  [category: string]: {
    50: string,
    100: string,
    200: string,
    300: string
    400: string,
    500: string,
    600: string,
    700: string,
    800: string,
    900: string
  }
  }} QSPaletteMaterial - material palette color token structure */

/** @typedef {{
  [category: string]: {
    base: string,
    light?: {
      [index: string | number]: string
    },
    muted?: {
      [index: string | number]: string
    },
    dark?: {
      [index: string | number]: string
    },
  }
}} QSPaletteArtistic - artistic palette color tokens structure  */

/**
 * A palette formula to generate `50-900` material-esque color tokens.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.light] - adjust the overall light contrast of the palette
 * @param {number} [modifiers.dark] - adjust the overall dark contrast of the palette
 *
 * @param {QSPaletteScheme} [modifiers.scheme] - configure the palette to use a color scheme
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteMaterial} Material color palette
 *
 * @remarks
 * If `modifiers.scheme` is set, the colors are mapped to an alphabetical index.
 * Since the most complex scheme is `"hexagon"`, this means the range is `a-f`.
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * MaterialPalette({}, "dodgerblue");
 * ```
 *
 * @example
 * Adjust overall light/dark color contrast
 * ```ts
 * MaterialPalette({ light: 84, dark: 73 }, "dodgerblue");
 * ```
 *
 * @example
 * Set a color scheme to use
 * ```ts
 * MaterialPalette({ light: 84, dark: 73, scheme: "complementary" }, "dodgerblue");
 * ```
 *
 * @example
 * Set a palette format
 * ```ts
 * MaterialPalette({ light: 84, dark: 73, scheme: "complementary", format: "rgb" }, "dodgerblue");
 * ```
 */
export function MaterialPalette(modifiers, color) {
  // Set default modifiers
  const {
    light = 95,
    dark = 75,
    scheme = undefined,
    format = undefined,
  } = modifiers;

  return fn_pipe(
    color,
    fn_curry(paletteSettings, { format, scheme }),
    fn_curry(generateMaterialPalette, { light, dark }),
  );
}

/**
 * A palette formula to generate a standard artistic color palette.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory
 *
 * @param {QSPaletteScheme} [modifiers.scheme] - configure the palette to use a color scheme
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic} Artistic color palette
 *
 * @remarks
 * If `modifiers.scheme` is set, the colors are mapped to an alphabetical index.
 * Since the most complex scheme is `"hexagon"`, this means the range is `a-f`.
 *
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * ArtisticPalette({}, "crimson");
 * ```
 *
 * @example
 * Set the variant contrast
 * ```ts
 * ArtisticPalette({ contrast: 80 }, "crimson");
 * ```
 *
 * @example
 * Setting tints, tones and/or shades
 * ```ts
 * ArtisticPalette({ contrast: 80, tints: 4, tones: 1, shades: 4 }, "crimson");
 * ```
 *
 * @example
 * Set a color scheme to use
 * ```ts
 * ArtisticPalette({ contrast: 80, tints: 4, tones: 1, shades: 4, scheme: "complementary" }, "crimson");
 * ```
 *
 * @example
 * Set a palette format
 * ```ts
 * ArtisticPalette({ contrast: 80, tints: 4, tones: 1, shades: 4, scheme: "complementary", format: "rgb" }, "crimson");
 * ```
 */
export function ArtisticPalette(modifiers, color) {
  // Set default modifiers
  const {
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    format = undefined,
    scheme = undefined,
  } = modifiers;

  return fn_pipe(
    color,
    fn_curry(paletteSettings, { format, scheme }),
    fn_curry(generateArtisticPalette, {
      contrast,
      values: { tints, tones, shades },
    }),
  );
}

/**
 * An advanced palette formula to generate a color palette from interpolation.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.lightness] - interpolate to target lightness/luminance (+: brighten, -: darken)
 * @param {number} [modifiers.chroma] - interpolate to target chroma/intensity (+: saturate, -: desaturate)
 * @param {number} [modifiers.hue] - interpolate by hue rotation (+: right rotation, -: left rotation)
 * @param {number} [modifiers.alpha] - interpolate to target transparency (+: more opaque, -: more transparent)
 * @param {number} [modifiers.values] - total number of color categories
 *
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette (artistic)
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory (artistic)
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory (artistic)
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory (artistic)
 *
 * @param {boolean} [modifiers.material] - use material palette configuration?
 * @param {number} [modifiers.light] - overall light contrast of the palette (material)
 * @param {number} [modifiers.dark] - overall dark contrast of the palette (material)
 *
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic | QSPaletteMaterial} Color palette from interpolation
 *
 * @remarks
 * The colors you can generate are theoretically infinite, but the formula will only return
 * *unique* colors. There is no internal mechanism checking for similar colors, so it's up to you
 * to ensure your palette is distinct. The alphabetical index for color categories runs from `a-z`,
 * and it is derived from `values` which defines the **interpolation steps**.
 *
 * If you're unsure you need this level of control, @see {@link MaterialPalette}
 * and @see {@link ArtisticPalette}.
 *
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette.
 *
 * If `modifiers.material` is true, the palette will use the material structure
 * and *its* modifiers instead of the artistic.
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * InterpolatedPalette({}, "chartreuse");
 * ```
 *
 * @example
 * Set interpolated properties and output values
 * ```ts
 * InterpolatedPalette({ lightness: 20, chroma: -0.16, values: 4 }, "chartreuse");
 * ```
 *
 * @example
 * Accepts the artistic configuration modifiers by default
 * ```ts
 * InterpolatedPalette({ lightness: 20, chroma: -0.16, values: 4, tints: 2, tones: 1, shades: 6 }, "chartreuse");
 * ```
 *
 * @example
 * Material configuration toggle (and its modifiers)
 * ```ts
 * InterpolatedPalette({ lightness: 20, chroma: -0.16, values: 4, material: true, light: 78 }, "chartreuse");
 * ```
 *
 * @example
 * Set the palette format
 * ```ts
 * InterpolatedPalette({ lightness: 20, chroma: -0.16, values: 4, material: true, light: 78, format: "hsl" }, "chartreuse");
 * ```
 */
export function InterpolatedPalette(modifiers, color) {
  // Set default modifiers
  const {
    lightness = 0,
    chroma = 0,
    hue = 0,
    alpha = 0,
    values = 1,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    material = false,
    light = 90,
    dark = 75,
    format = undefined,
  } = modifiers;

  return fn_pipe(
    color,
    fn_curry(paletteSettings, { format }),
    ([color]) => [
      color,
      ...(values === 1 ? [] : color_interpolation(
        { lightness, chroma, hue, alpha, values: values - 1 },
        color,
      )),
    ],
    material
      ? fn_curry(generateMaterialPalette, { light, dark })
      : fn_curry(generateArtisticPalette, {
        contrast,
        values: { tints, tones, shades },
      }),
  );
}

/**
 * An advanced palette formula to generate a color palette from color blending.
 *
 * @param {object} modifiers - the available modifiers for customizing output
 * @param {number} [modifiers.amount] - the total amount of color mixture (100 will fully mix)
 * @param {string} [modifiers.target] - the blend target color
 * @param {number} [modifiers.values] - total number of color categories
 *
 * @param {number} [modifiers.contrast] - adjust the overall contrast of the palette (artistic)
 * @param {number} [modifiers.tints] - the number of tints to create for each subcategory (artistic)
 * @param {number} [modifiers.tones] - the number of tones to create for each subcategory (artistic)
 * @param {number} [modifiers.shades] - the number of shades to create for each subcategory (artistic)
 *
 * @param {boolean} [modifiers.material] - use material palette configuration
 * @param {number} [modifiers.light] - adjust the overall light contrast of the palette (material)
 * @param {number} [modifiers.dark] - adjust the overall dark contrast of the palette (material)
 *
 * @param {QSPaletteFormat} [modifiers.format] - set the palette color format
 *
 * @param {string} color - the base color to generate from
 *
 * @returns {QSPaletteArtistic | QSPaletteMaterial} Color palette from blending
 *
 * @remarks
 * The colors you can generate are theoretically infinite, but the formula will only return
 * *unique* colors. There is no internal mechanism checking for similar colors, so it's up to you
 * to ensure your palette is distinct. The alphabetical index for color categories runs from `a-z`,
 * and it is derived from `values` which defines the **mixture steps**.
 *
 * If you're unsure you need this level of control, @see {@link MaterialPalette}
 * and @see {@link ArtisticPalette}.
 *
 * If `tints`, `tones`, or `shades` is set to `0`, the corresponding variants are
 * stripped from the palette.
 *
 * If `modifiers.material` is true, the palette will use the material structure
 * and *its* modifiers instead of the artistic.
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * BlendedPalette({}, "rebeccapurple");
 * ```
 *
 * @example
 * Setting the blend target and amount of mixture with output values
 * ```ts
 * BlendedPalette({ target: "cornsilk", amount: 75, values: 5}, "rebeccapurple");
 * ```
 *
 * @example
 * Accepts artistic configuration modifiers by default
 * ```ts
 * BlendedPalette({ target: "cornsilk", amount: 75, values: 5, tints: 3, tones: 2, shades: 4, contrast: 90 }, "rebeccapurple");
 * ```
 *
 * @example
 * Material palette toggle (and its modifiers)
 * ```ts
 * BlendedPalette({ target: "cornsilk", amount: 75, values: 5, material: true, dark: 85 }, "rebeccapurple");
 * ```
 *
 * @example
 * Set the palette format
 * ```ts
 * BlendedPalette({ target: "cornsilk", amount: 75, values: 5, material: true, dark: 85, format: "rgb" }, "rebeccapurple");
 * ```
 */
export function BlendedPalette(modifiers, color) {
  // Set default modifiers
  const {
    amount = 50,
    target = "black",
    values = 1,
    contrast = 95,
    tints = 3,
    tones = 3,
    shades = 3,
    material = false,
    light = 90,
    dark = 75,
    format = undefined,
  } = modifiers;

  return fn_pipe(
    color,
    fn_curry(paletteSettings, { format }),
    ([color]) => [
      color,
      ...(values === 1
        ? []
        : color_blend({ target, amount, values: values - 1 }, color)),
    ],
    material ? fn_curry(generateMaterialPalette, { light, dark })
    : fn_curry(generateArtisticPalette, {
      contrast,
      values: { tints, tones, shades },
    }),
  );
}

function paletteSettings({ scheme, format }, color) {
  return fn_pipe(
    color,
    (color) => (format ? color_inspect(color).to[format] : color_to_hex(color)),
    (color) => (scheme ? setScheme(scheme, color) : [color]),
  );
}

function setScheme(scheme, color) {
  return {
    dyadic: color_to_scheme_dyadic(color),
    analogous: color_to_scheme_analogous(color),
    complementary: color_to_scheme_complementary(color),
    split: color_to_scheme_split(color),
    triadic: color_to_scheme_triadic(color),
    clash: color_to_scheme_clash(color),
    tetradic: color_to_scheme_tetradic(color),
    square: color_to_scheme_square(color),
    star: color_to_scheme_star(color),
    hexagon: color_to_scheme_hexagon(color),
  }[scheme];
}

function generateMaterialPalette({ light, dark }, palette) {
  return fn_pipe(
    palette,
    (palette) => palette.map((color) => color_material({ light, dark }, color)),
    (palette) =>
      palette.reduce((acc, value, index) => {
        return {
          ...acc,
          [alphabeticalCategories(index)]: {
            ...value.reduce(
              (a, v, i) => ({
                ...a,
                ...(i === 0 ? { 50: v } : { [`${i}`.padEnd(3, "0")]: v }),
              }),
              {},
            ),
          },
        };
      }, {}),
  );
}

function generateArtisticPalette({ contrast, values }, palette) {
  // Oklab trends a little dark, so tones and shades need adjustment
  const ADJUSTMENT_VALUE = 1.27;

  return fn_pipe(
    palette,
    (palette) =>
      palette.map((color, index) => {
        const category = alphabeticalCategories(index);
        const light = color_tints(
          {
            values: values.tints,
            contrast,
          },
          color,
        );
        const muted = color_tones(
          {
            values: values.tones,
            contrast: contrast / ADJUSTMENT_VALUE,
          },
          color,
        );
        const dark = color_shades(
          { values: values.shades, contrast: contrast / ADJUSTMENT_VALUE },
          color,
        );

        return [category, [color, light, muted, dark]];
      }),
    (palette) =>
      palette.reduce((acc, [key, [base, light, muted, dark]]) => {
        const variants = {
          ...(light.length ? { light: NumericColorScale(light) } : {}),
          ...(muted.length ? { muted: NumericColorScale(muted) } : {}),
          ...(dark.length ? { dark: NumericColorScale(dark) } : {}),
        };
        return {
          ...acc,
          [key]: {
            base,
            ...variants,
          },
        };
      }, {}),
  );
}

function alphabeticalCategories(index) {
  return new Map([
    ...Array(26)
      .fill(65)
      .map((v, i) => {
        const category = String.fromCharCode(v + i).toLowerCase(); // starting from "a"
        return [i, category];
      }),
  ]).get(index);
}

/** @typedef {"sans" | "serif" | "monospace"} QSTextFamilySystem - available system font stacks */
/** @typedef {"thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black"} QSTextFamilyStyle - available font styles */
/** @typedef {QSTextFamilyStyle[]} QSTextFamilyWeights - font weights to emit with font family */

/**
 * @typedef {{family: string, [weight: string]: string}} QSTextFamily - text family token structure
 */

/**
 * A typography formula for generating font family tokens.
 *
 * @param {object} modifiers - font family settings
 * @param {QSTextFamilySystem} [modifiers.system] - system font stack to use
 * @param {QSTextFamilyWeights} [modifiers.weights] - font weights to generate (as keywords)
 *
 * @param {string} font - custom font family to prepend to system stack
 *
 * @returns {QSTextFamily} Text family tokens
 *
 * @remarks
 * `weights` keywords match to the following values:
 *
 * + `"thin"` = `100`
 * + `"extralight"` = `200`
 * + `"light"` = `300`
 * + `"regular"` = `400`
 * + `"medium"` = `500`
 * + `"semibold"` = `600`
 * + `"bold"` = `700`
 * + `"extrabold"` = `800`
 * + `"black"` = `900`
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * TextFamily({})
 * ```
 *
 * @example
 * Set a custom family
 * ```ts
 * TextFamily({}, "Open Sans");
 * ```
 *
 * @example
 * Set the system stack
 * ```ts
 * TextFamily({ system: "serif" }, "Open Sans");
 * ```
 *
 * @example
 * Set the weights
 * ```ts
 * TextFamily({ system: "serif", weights: ["light", "regular", "bold", "black"] }, "Open Sans");
 * ```
 */
export function TextFamily(modifiers, font = null) {
  // Set default modifiers
  const { system = "sans", weights = ["regular", "bold"] } = modifiers;

  return {
    family: generateStack(system, font),
    ...generateWeights(weights),
  };
}

function generateStack(fallback, font = null) {
  return font === null
    ? data_systemfonts(fallback)
    : [font, data_systemfonts(fallback)].join(", ");
}

function generateWeights(weights) {
  return weights.reduce((acc, key) => {
    const value = fontWeights(key);

    return { ...acc, [key]: value };
  }, {});
}

function fontWeights(key) {
  return new Map([
    ["thin", 100],
    ["extralight", 200],
    ["light", 300],
    ["regular", 400],
    ["medium", 500],
    ["semibold", 600],
    ["bold", 700],
    ["extrabold", 800],
    ["black", 900],
  ]).get(key);
}

/**
 * A text formula for generating text size tokens.
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Text size tokens
 *
 * @remarks
 * This formula outputs text sizes in `rem` units for larger, `em` for smaller
 *
 * @see
 * {@link Subcategory} for the general formula you can use if you need a less
 * opinionated dataset
 *
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Generating font sizes
 * ```ts
 * // Default modular scale
 * TextSize(ms_create({}, 1))
 *
 * // Custom modular scale
 * TextSize(ms_create({ ratio: 1.618 }, 1))
 * ```
 */
export function TextSize(ms) {
  return Subcategory({ unit: "rem", inversionUnit: "em" }, ms);
}

/**
 * A text formula for generating text leading/line height tokens.
 *
 * @param {object} modifiers - text leading modifiers
 * @param {number} [modifiers.normal] - the default line height
 * @param {number} [modifiers.tight] - the mininmum line height
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategoryRange} Text leading tokens
 *
 * @remarks
 * This formula fits convention and outputs unitless values
 *
 * @see
 * {@link SubcategoryRange} for the general formula you can use if you need a less
 * opinionated dataset
 *
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * TextLeading({}, ms_create({}, 1))
 * ```
 *
 * @example
 * Set normal and tightest line height
 * ```ts
 * TextLeading({ normal: 1.75, tight: 1.25 }, ms_create({}, 1))
 * ```
 */
export function TextLeading(modifiers, ms) {
  // Set default modifiers
  const { normal = 1.5, tight = 1.125 } = modifiers;

  return SubcategoryRange(
    {
      min: tight,
      max: normal,
      keys: ["narrow", "tight"],
    },
    ms,
  );
}

/**
 * A text formula for generating text measure/line length tokens.
 *
 * @param {object} modifiers - text leading modifiers
 * @param {number} [modifiers.min] - the minimum line length
 * @param {number} [modifiers.max] - the maximum line length
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategoryRange} Text measure tokens
 *
 * @remarks
 * This formula outputs values as `ch` units so that the browser derives measure
 * from the (approximate) attributes of the text itself.
 *
 * @see
 * {@link SubcategoryRange} for the general formula you can use if you need a less
 * opinionated dataset
 *
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * TextMeasure({}, ms_create({}, 1))
 * ```
 *
 * @example
 * Set minimum and maximum line length
 * ```ts
 * TextMeasure({ min: 48, max: 75 }, ms_create({}, 1))
 * ```
 */
export function TextMeasure(modifiers, ms) {
  // Set default modifiers
  const { min = 45, max = 75 } = modifiers;

  return SubcategoryRange(
    {
      min,
      max,
      unit: "ch",
      keys: ["segment", "minimum"],
      trunc: true,
    },
    ms,
  );
}

/**
 * A text formula for generating text unit/spacing tokens.
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Text unit tokens
 *
 * @remarks
 * This formula outputs values as `ex` units so that the browser derives spacing
 * from the (approximate) attributes of the text itself.
 *
 * @see
 * {@link Subcategory} for the general formula you can use if you need a less
 * opinionated dataset
 *
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Generating spacing tokens
 * ```ts
 * // Default modular scale
 * TextUnits(ms_create({}, 1))
 *
 * // Custom modular scale
 * TextUnits(ms_create({ ratio: 1.618 }, 1))
 * ```
 */
export function TextUnits(ms) {
  return Subcategory({ unit: "ex" }, ms);
}

/** @typedef {{
  col: { [column: string]: number },
  row: { [row: string]: number }
}} QSGridDimensions - grid cell tokens structure */

/** @typedef {"w" | "h" | "min" | "max"} QSViewportDimensions - available viewport subcategories */

/** @typedef {QSViewportDimensions[]} QSViewportContext - viewport token subcategory keywords */

/** @typedef {{
  width?: { base: string, [value: string]: string },
  height?: { base: string, [value: string]: string },
  min?: { base: string, [value: string]: string },
  max?: { base: string, [value: string]: string },
}} QSViewport - viewport token structure */

/**
 * A layout formual for generation grid fractional values.
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Grid layout tokens
 *
 * @remarks
 * This formula outputs values as `fr` units following the spec.
 *
 * @see
 * {@link Subcategory} for the general formula you can use if you need a less
 * opinionated dataset
 *
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Generating grid fractional values
 * ```ts
 * // Default modular scale
 * GridFractions(ms_create({}, 1))
 *
 * // Custom modular scale
 * GridFractions(ms_create({ ratio: 1.618 }, 1))
 * ```
 */
export function GridFractions(ms) {
  return Subcategory({ unit: "fr" }, ms);
}

/**
 * A layout formula for generating grid track tokens.
 *
 * @param {number} columns - the number of columns to generate
 * @param {number} [rows] - the number of rows to generate (rows = columns by default)
 *
 * @returns {QSGridDimensions} Grid dimensional tokens
 *
 * @remarks
 * This formula outputs row and column properties corresponding with the defined settings.
 * Each token value is either `n` or `"-n"` where n is a track number.

 * @example
 * Generating grid track tokens
 * ```ts
 * // Single parameter sets columns AND rows
 * GridDimensions(7)
 *
 * // Set custom rows
 * GridDimensions(7, 4)
 * ```
 */
export function GridDimensions(columns, rows = columns) {
  const xs = spanCalculation(columns);
  const ys = spanCalculation(rows);

  const mirror = (values) =>
    values.reduce((acc, v) => ({ ...acc, [v]: v }), {});

  return {
    col: {
      ...mirror(xs),
      ...mirror(ms_modify((x) => -x, xs)),
    },
    row: {
      ...mirror(ys),
      ...mirror(ms_modify((y) => -y, ys)),
    },
  };
}

function spanCalculation(xs) {
  return Array(xs)
    .fill(1)
    .map((x, pos) => x + pos);
}

/**
 * A layout formula for generating raw modular scale figures for calculation
 * and on-the-fly adjustment.
 *
 * @param {number[]} ms - the modular scale
 *
 * @returns {QSGeneralSubcategory} Raw scale calculation tokens
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Generating raw scale values for calculation
 * ```ts
 * // Default modular scale
 * FigureCalculations(ms_create({}, 1))
 *
 * // Custom modular scale
 * FigureCalculations(ms_create({ ratio: 1.618 }, 1))
 * ```
 */
export function FigureCalculations(ms) {
  return Subcategory({}, ms);
}

/**
 * A layout formula for generating viewport tokens.
 *
 * @param {object} modifiers - text leading modifiers
 * @param {number} [modifiers.threshold] - minimum viewport value
 * @param {number} [modifiers.full] - maximum viewport value
 * @param {QSViewportContext} [modifiers.context] - the viewport dimensions to generate
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSViewport} Viewport tokens
 *
 * @remarks
 * The value units correspond to the contexts defined.
 *
 * + `"w"` = `vw`
 * + `"h"` = `vh`
 * + `"min"` = `vmin`
 * + `"max"` = `vmax`
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * Viewport({}, ms_create({}, 1));
 * ```
 *
 * @example
 * Setting the threshold and full view
 * ```ts
 * Viewport({ threshold: 25, full: 75 }, ms_create({}, 1));
 * ```
 *
 * @example
 * Narrowing the context
 * ```ts
 * Viewport({ threshold: 25, full: 75, context: ["w", "h"] }, ms_create({}, 1));
 * ```
 */
export function Viewport(modifiers, ms) {
  // Set default modifiers
  const {
    threshold = 5,
    full = 100,
    context = ["w", "h", "min", "max"],
  } = modifiers;

  return context.reduce((acc, target) => {
    const [key, unit] = viewportTargets(target);

    return {
      ...acc,
      [key]: SubcategoryRange(
        {
          min: threshold,
          max: full,
          keys: ["segment", "threshold"],
          unit,
          trunc: true,
        },
        ms,
      ),
    };
  }, {});
}

function viewportTargets(target) {
  return new Map([
    ["w", ["width", "vw"]],
    ["h", ["height", "vh"]],
    ["min", ["min", "vmin"]],
    ["max", ["max", "vmax"]],
  ]).get(target);
}

/** @typedef {{
  x: number[],
  y: number[]
}} QSAnimationCubicBezier - cubic bezier token structure */

/**
 * An animation formula for generating duration tokens.
 *
 * @param {object} modifiers - duration modifiers
 * @param {number} [modifiers.fastest] - fastest duration (in milliseconds)
 * @param {number} [modifiers.slowest] - slowest duration (in milliseconds)
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategoryRange} Animation duration tokens
 *
 * @remarks
 * This formula does no internal conversion, so you *will* have to pass in milliseconds.
 * As such, the output units are also `ms`.
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * AnimationDuration({}, ms_create({}, 1));
 * ```
 *
 * @example
 * Setting the fastest and slowest durations
 * ```ts
 * AnimationDuration({ fastest: 150, slowest: 700 }, ms_create({}, 1));
 * ```
 */
export function AnimationDuration(modifiers, ms) {
  // Set default modifiers
  const { fastest = 250, slowest = 1000 } = modifiers;

  return SubcategoryRange(
    {
      min: fastest,
      max: slowest,
      unit: "ms",
      keys: ["interval", "fastest"],
    },
    ms,
  );
}

/**
 * An animation formula for generating `cubic-bezier()` timing values.
 *
 * @param {object} modifiers - duration modifiers
 * @param {number} [modifiers.floor] - minimum `y` value
 * @param {number} [modifiers.ceiling] - maximum `y` value
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSAnimationCubicBezier} Cubic bezier easing tokens
 *
 * @remarks
 * This formula outputs `x` and `y` scales calculated from the input scale.
 * `x` contains a `0-1` range of values defining the *bounds* of the bezier curve,
 * while `y` contains a range calcuated from the floor and ceiling. `y` is unbound
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * AnimationCubicBezier({}, ms_create({}, 1))
 * ```
 *
 * @example
 * Setting a custom floor and ceiling for `y` values
 * ```ts
 * AnimationCubicBezier({}, ms_create({}, 1))
 * ```
 */
export function AnimationCubicBezier(modifiers, ms) {
  const [maximum] = ms.slice(-1);

  const { floor = 0, ceiling = 1 } = modifiers;

  const XS = new Set(
    ms_modify((n) => precision(n / maximum), ms).filter((n) => n > 0 && n < 1),
  );

  const YS = new Set(
    ms_modify((n) => precision(floor + (ceiling - floor) / n), ms).filter(
      (n) => n > floor && n < ceiling,
    ),
  );

  return {
    x: [0, ...XS, 1],
    y: [floor, ...Array.from(YS).reverse(), ceiling],
  };
}

/** @typedef {{
  base: string | number,
  [value: string]: string | number
  }} QSGeneralSubcategory - general subcategory structure */

/** @typedef {{
    base: string | number,
    [value: string]: string | number | (string | number)[]
}} QSGeneralSubcategoryRange - general subcategory range structure */

/**
 * A formula for generating arbitrary subcategories.
 *
 * @param {object} modifiers - general subcategory modifiers
 * @param {CSSUnits} [modifiers.unit] - output value units (unitless by default)
 * @param {string} [modifiers.inversionUnit] - output inversion units
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Custom general subcategory
 *
 * @remarks
 * The output contains a `base` value with variants prefixed with `x` and `"-x"`.
 * `x` values are larger, `"-x"` values are inversions (smaller)
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * Subcategory({}, ms_create({}, 1));
 * ```
 *
 * @example
 * Set an output unit
 * ```ts
 * Subcategory({ unit: "rem" }, ms_create({}, 1));
 * ```
 *
 * @example
 * Set an inverse unit
 * ```ts
 * Subcategory({ unit: "rem", inversionUnit: "em" }, ms_create({}, 1));
 * ```
 */
export function Subcategory(modifiers, ms) {
  const values = Array.from(ms);
  const [base] = values;

  // Calculate the inverse
  const inverse = ms_modify((n) => base ** 2 / n, values);

  // Set default modifiers
  const { unit = undefined, inversionUnit = undefined } = modifiers;

  const raw = (values) => values.map((n) => precision(n));

  return {
    base: unit ? fn_pipe([base], fn_curry(ms_units, unit)).toString() : base,
    ...generateScale(
      ["x", "-x"],
      [
        unit ? ms_units(unit, values) : raw(values),
        fn_pipe(
          inverse,
          unit ? fn_curry(ms_units, inversionUnit ? inversionUnit : unit) : raw,
        ),
      ],
    ),
  };
}

/**
 * A formula for generating arbitrary subcategories (unidirectional).
 *
 * @param {object} modifiers - general subcategory modifiers
 * @param {CSSUnits} [modifiers.unit] - output value units (unitless by default)
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Custom unidirectional subcategory
 *
 * @remarks
 * The output contains a `base` value with variants prefixed with `x`.
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * SubcategoryUnidirectional({}, ms_create({}, 1));
 * ```
 *
 * @example
 * Set an output unit
 * ```ts
 * SubcategoryUnidirectional({ unit: "rem" }, ms_create({}, 1));
 * ```
 */
export function SubcategoryUnidirectional(modifiers, ms) {
  const [base] = Array.from(ms);
  const values = Array.from(ms);

  // Set default modifiers
  const { unit = undefined } = modifiers;

  const raw = (values) => values.map((n) => precision(n));
  const output = fn_curry(ms_units, unit);

  return {
    base: unit ? output([base]).toString() : base,
    ...generateUnidirectional("x", fn_pipe(values, unit ? output : raw)),
  };
}

/**
 * A formula for generating arbitrary subcategories (ranged).
 *
 * @param {object} modifiers - general subcategory modifiers
 * @param {number} [modifiers.min] - minimum output value
 * @param {number} [modifiers.max] - maximum output value
 * @param {CSSUnits} [modifiers.unit] - unit to attach to values
 * @param {[string, string]} [modifiers.keys] - a tuple defining the range property and minimum value key
 * @param {boolean} [modifiers.trunc] - generate values as integers?
 *
 * @param {number[]} ms - the modular scale to generate values from
 *
 * @returns {QSGeneralSubcategory} Custom ranged subcategory
 *
 * @remarks
 * The output contains a `base` value which is the maximum, a range scale calculated
 * from the input scale, and a minimum value.
 *
 * If you don't define keys, the properties will be `base`, `segment` for the range,
 * and `minimum` for the cutoff
 *
 * @see
 * {@link ms_create} for generating a scale to pass in
 *
 * @example
 * Empty object sets defaults
 * ```ts
 * SubcategoryRange({}, ms_create({}, 1));
 * ```
 *
 * @example
 * Set minimum and maximum values
 * ```ts
 * SubcategoryRange({ min: 15, max: 90 }, ms_create({}, 1));
 * ```
 *
 * @example
 * Set the output units
 * ```ts
 * SubcategoryRange({ min: 1, max: 100, unit: "%" }, ms_create({}, 1));
 * ```
 *
 * @example
 * Redefine the range and minimum keys
 * ```ts
 * SubcategoryRange({ min: 1, max: 100, unit: "%", keys: ["portion", "minimal"] }, ms_create({}, 1));
 * ```
 *
 * @example
 * Truncate the output as integers
 * ```ts
 * SubcategoryRange({ min: 1, max: 100, unit: "%", keys: ["portion", "minimal"], trunc: true }, ms_create({}, 1));
 * ```
 */
export function SubcategoryRange(modifiers, ms) {
  // Set default modifiers
  const {
    min = 1,
    max = 10,
    unit = undefined,
    keys = ["segment", "minimum"],
    trunc = false,
  } = modifiers;

  const output = fn_curry(ms_units, unit);

  return generateRange(keys, [
    unit ? output([max]).toString() : precision(max),
    fn_pipe(
      Array.from(
        new Set(
          ms_modify((n) => {
            const RANGE = min + (max - min) / n;
            return trunc ? Math.trunc(RANGE) : RANGE;
          }, ms),
        ),
      ),
      (ms) => ms.map((n) => precision(n)),
      (ms) => ms.filter((n) => n > min && n < max),
      unit ? output : (ms) => ms,
    ),
    unit ? output([min]).toString() : precision(min),
  ]);
}

function generateScale([x, d] = ["x", "d"], ms) {
  const [multiply, divide] = Array.from(ms);
  return {
    ...generateVariants(x, multiply),
    ...generateVariants(d, divide),
  };
}

function generateUnidirectional(x = "x", ms) {
  return generateVariants(x, ms);
}

function generateRange(
  [rangeKey, floorKey] = ["fragment", "min"],
  [base, range, min],
) {
  return {
    base,
    [rangeKey]: range,
    [floorKey]: min,
  };
}

function generateVariants(key, [, ...values]) {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [[key, index + 2].join("")]: value,
    }),
    {},
  );
}

/**
 * A formula for generating arbitrary numeric color tokens.
 *
 * @param {string[]} palette - the palette to generate the tokens from
 *
 * @returns {{ [index: string | number]: string }} Numeric color scale tokens
 *
 * @remarks
 * The color tokens are output as a range of `100-`. There is no cutoff,
 * because I don't want to make assumptions about how many colors you need.
 *
 * That said, if you use a palette generated from the included color variant utilities,
 * they all output a scale where the first (`100`) has the least contrast from the
 * input color and the last value has the greatest.
 *
 * @see
 * {@link color_tints} for generating tint variants
 * {@link color_tones} for generating tone variants
 * {@link color_shades} for generating shade variants
 *
 * @example
 * Generating numeric color scales from palettes
 * ```ts
 * // Custom material color scale
 * NumericColorScale(color_material({}, "crimson"));
 *
 * // Tint color scale
 * NumericColorScale(color_tints({}, "chartreuse"));
 *
 * // Tone color scale
 * NumericColorScale(color_tones({ contrast: 75 }, "cornflower"));
 *
 * // Shade color scale
 * NumericColorScale(color_shades({ values: 6 }, "cornsilk"))
 * ```
 */
export function NumericColorScale(palette) {
  return palette.reduce(
    (acc, value, index) => ({ ...acc, [`${++index}`.padEnd(3, "0")]: value }),
    {},
  );
}

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

const CLRS = {
  navy: "#001f3f",
  blue: "#0074d9",
  aqua: "#7fdbff",
  teal: "#39cccc",
  olive: "#3d9970",
  green: "#2ecc40",
  lime: "#01ff70",
  yellow: "#ffdc00",
  orange: "#ff851b",
  red: "#ff4136",
  maroon: "#85144b",
  fuchsia: "#f012be",
  purple: "#b10dc9",
  black: "#111111",
  gray: "#aaaaaa",
  grey: "#aaaaaa",
  silver: "#dddddd",
  white: "#ffffff",
};

const SYSTEM_FONT_STACKS = {
  sans:
    "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
  serif:
    "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  monospace:
    "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
};

/**
 * A utility for combining the behavior of other utilities.
 *
 * @template X, FX
 * @template R, Result
 * @template {(x: FX) => R} UnaryFn
 * @template {UnaryFn[]} Pipeline
 * @template {(x : X) => Result} Fn
 *
 * @param {Pipeline} fns - utilities to combine
 * @returns {Fn} Combined function waiting for data
 *
 * @remarks
 * My implementation of `compose` internally is *technically* `composePipe`
 * but I didn't want to write it in a way I'd never actually use it.
 *
 * Just be aware that a classical compose function applies its sequence
 * **right to left**.
 *
 * @see
 * {@link https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj} for a brief explanation of function composition in JavaScript.
 *
 * @example
 * Extract RGB values from any valid CSS color
 * ```ts
 * const extract_rgb = fn_compose(
 *   color_to_rgb,
 *   color_inspect,
 *   (data) => data.parsed,
 *   ([r, g, b, a]) => ({ r, g, b, a })
 * );
 *
 * extract_rgb("crimson");
 * ```
 */
export function fn_compose(...fns) {
  return compose(...fns);
}

/**
 * A utility for preloading the modifiers of a binary utility.
 *
 * @template Y, FY
 * @template X, FX
 * @template R, Result
 * @template {(y: FY, x: FX) => R} BinaryFn
 * @template {(x : X) => Result} Fn
 *
 * @param {BinaryFn} fn - utility to transform
 * @param {Y} modifier - output modifier
 * @returns {Fn} Pending data operation
 *
 * @remarks
 * The implementation of `fn_curry` is written especially for binary
 * functions because of the explicit design of this library where a function
 * will either have one argument (the data itself) or two (the output modifier, the data itself).
 *
 * @see
 * {@link https://www.codementor.io/@michelre/currying-in-javascript-g6212s8qv} for a brief explanation of currying in JavaScript.
 *
 * @example
 * Desaturating and brightening any valid color
 * ```ts
 * const baseColorAdjustment = fn_curry(color_adjust, { lightness: 30, chroma: -25 });
 *
 * baseColorAdjustment("coral");
 * ```
 */
export function fn_curry(fn, modifier) {
  return curry(fn)(modifier);
}

/**
 * A utility for constructing data pipelines.
 *
 * @template X, FX
 * @template R, Result
 * @template {(x: FX) => R} UnaryFn
 * @template {UnaryFn[]} Pipeline
 *
 * @param {X} x - data to pipe
 * @param {Pipeline} fns - pipeline operations
 * @returns {Result} Pipeline output
 *
 * @remarks
 * This implementation of pipe is not a classical implementation of pipe.
 *
 * Rather, it's built for the specific types of data that this library consumes.
 * By setting the data to transform as the *first* argument, the pipeline will
 * refuse to work if any of the functions in the sequence (or their output)
 * does not return the expected type.
 *
 * @example
 * Color to palette CSS pipeline
 * ```ts
 * fn_pipe(
 *   "chartreuse",
 *   fn_curry(MaterialPalette, { scheme: "triadic" }),
 *   (color) => ({ color }),
 *   (tokens) => ({
 *      project: {
 *       name: "Sample Color Palette",
 *       author: "Ed N. Bacon",
 *       version: "0.1.0",
 *       license: "Unlicense"
 *     },
 *     tok: tokens
 *   }),
 *   tokens_to_css
 * )
 * ```
 */
export function fn_pipe(x, ...fns) {
  return pipe(x, ...fns);
}

/**
 * A utility that filters namespace import functions by type.
 *
 * @param {string} type - the type to check
 * @param {object} namespace - the namespace import
 * @returns {Array<((y: unknown, x: unknown) => unknown) | ((x: unknown) => unknown)>}
 *
 * @example
 * Filtering a namespace
 * ```ts
 * import * as Q from "https://x.nest.land/quarksuite:core@1.1.0/mod.js";
 *
 * const color = fn_filter("color", Q);
 * const ms = fn_filter("ms", Q);
 * ```
 *
 * @remarks
 * This utility conveniently maps functions of `type` to an array that
 * `fn_to_factory` can use to create an object factory.
 *
 * @see {@link fn_to_factory}
 */
export function fn_filter(type, namespace) {
  return Object.entries(namespace)
    .filter(([name]) => name.startsWith(type))
    .map(([, fn]) => fn);
}

/**
 * A utility for translating functions as methods of a an object factory.
 *
 * @param {Array<((y: unknown, x: unkown) => unknown) | ((x: unknown) => unknown)>} fns - the functions to translate
 * @returns {(x: unknown) => object} An object factory waiting for initialization
 *
 * @example
 * Generating an object factory from directly imported QSC utilities
 * ```ts
 * import {
 *   color_to_hex,
 *   color_mix,
 *   color_adjust
 * } from "https://x.nest.land/quarksuite:core@1.1.0/mod.js";
 *
 * const Color = fn_to_factory([
 *   color_to_hex,
 *   color_mix,
 *   color_adjust
 * ]);
 *
 * const { value: swatch } = Color("lime")
 *   .to_hex()
 *   .mix({ amount: 75, target: "blue" })
 *   .adjust({ chroma: -5 });
 *
 * console.log(swatch) // "#3878c6"
 * ```
 *
 * @example
 * Propagation
 * ```ts
 * import {
 *   color_to_hex,
 *   color_mix,
 *   color_adjust,
 *   color_analogous
 * } from "https://x.nest.land/quarksuite:core@1.1.0/mod.js";
 *
 * const Color = fn_to_factory([
 *   color_to_hex,
 *   color_mix,
 *   color_adjust,
 *   color_analogous
 * ])
 *
 * const { value: main } = Color("coral")
 *   .to_hex()
 *   .mix({ target: "dodgerblue"})
 *   .analogous()
 *   .$_adjust({ chroma: -5 });
 *
 * console.log(swatch) // ["#d29385", "#c19f6b", "#9bad75"]
 * ```
 *
 * @remarks
 * Each function passed in will have its type stripped as a method.
 * e. g.: (`color_to_hex() -> object.to_hex()`)
 *
 * In addition:
 *
 * + The factory object has a `data` getter (state represented by `x`)
 * + Each method includes propagated siblings (`$_`, `$$_`)
 *   - `$_` cycles through values in its execution
 *   - `$$_` cycles through scales in its execution
 */
export function fn_to_factory(fns) {
  return (x) =>
    Object.create({
      x,
      get data() {
        return this.x;
      },
      ...[].concat(fns).reduce(asMethods, {}),
    });
}

function asMethods(acc, fn) {
  const name = fn.name.split("_").splice(1).join("_");
  const exec = (y, x) => (y ? fn(y, x) : fn(x));

  return {
    ...acc,

    [name](y = undefined) {
      this.x = exec(y, this.x);

      return this;
    },

    [["$_", name].join("")](...args) {
      const propagate = (collection) => {
        let [y] = args;

        return collection.map((x) => {
          return Array.isArray(x) ? propagate(x) : exec(y, x);
        });
      };

      this.x = propagate(this.x);
      return this;
    },

    [["$$_", name].join("")](...args) {
      const propagate = (collection) => {
        let [y] = args;

        return collection.map((xs) => {
          return Array.isArray(xs) && !xs.every((x) => Array.isArray(x))
            ? propagate(xs)
            : xs.map((x) => exec(y, x));
        });
      };

      this.x = propagate(this.x);
      return this;
    },
  };
}

/**
 * A utility to convert a valid CSS color to its hexadecimal equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hex(color) {
  return compose(curry(convert)("hex"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `rgb()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_rgb(color) {
  return compose(curry(convert)("rgb"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `hsl()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hsl(color) {
  return compose(curry(convert)("hsl"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `device-cmyk()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cmyk(color) {
  return compose(curry(convert)("cmyk"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `hwb()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_hwb(color) {
  return compose(curry(convert)("hwb"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `lab()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cielab(color) {
  return compose(curry(convert)("cielab"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its `lch()` equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 */
export function color_to_cielch(color) {
  return compose(curry(convert)("cielch"), passthrough)(color);
}

/**
 * A utility to convert a valid CSS color to its Oklab (LCh) equivalent.
 *
 * @param {string} color - the color to convert
 * @returns {string}
 *
 * @remarks
 * Oklab is non-standard and has no browser support, so convert any Oklab
 * colors to a standard format before using them.
 */
export function color_to_oklab(color) {
  return compose(curry(convert)("oklab"), passthrough)(color);
}

/**
 * A utility that allows you to inspect useful data about a color.
 *
 * @param {string} color - the color to inspect
 * @returns {{
 *  original: string,
 *  extracted: string[],
 *  parsed: number[],
 *  to: {
 *    hex: string,
 *    rgb: string,
 *    hsl: string,
 *    cmyk: string,
 *    hwb: string,
 *    cielab: string,
 *    cielch: string,
 *    oklab: string,
 *  }
 * }}
 *
 * @remarks
 * `original` property is the unaltered valid color input.
 *
 * The `extracted` property of the returned object contains the color's raw components,
 * while the `parsed` property contains its calculated values.
 *
 * + hex channels become rgb values
 * + rgb channels are converted to the `0-1` range
 * + degree values converted to radians
 * + etc...
 *
 * `to` is an object containing all the valid color formats the inspected color can convert to.
 */
export function color_inspect(color) {
  const [format, _value] = validator(color);

  // If validated as a named color, convert to hex
  const value = format === "named" ? color_to_hex(_value) : _value;

  return {
    original: _value,
    extracted: extractor(value)[1],
    parsed: parser(value)[1],
    to: {
      hex: color_to_hex(color),
      rgb: color_to_rgb(color),
      hsl: color_to_hsl(color),
      cmyk: color_to_cmyk(color),
      hwb: color_to_hwb(color),
      cielab: color_to_cielab(color),
      cielch: color_to_cielch(color),
      oklab: color_to_oklab(color),
    },
  };
}

/**
 * A utility that allows you to adjust the properties of any valid CSS color.
 *
 * @param {object} properties - the properties to adjust
 * @param {number} [properties.lightness] - adjust the color lightness/luminance
 * @param {number} [properties.chroma] - adjust the color chroma/intensity
 * @param {number} [properties.hue] - adjust the hue
 * @param {number} [properties.alpha] - adjust the alpha transparency
 *
 * @param {string} color - the color to adjust
 * @returns {string}
 */
export function color_adjust(properties, color) {
  // Initialize properties
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = properties;

  return pipe(
    color_to_oklab(color),
    extractor,
    ([, [L, C, H, A]]) => [
      normalize(200, 0, parseFloat(L) + lightness),
      normalize(1, 0, parseFloat(C) + numberFromPercent(chroma)),
      hueCorrection(parseFloat(H) + hue),
      parseFloat(A ?? 1) + numberFromPercent(alpha),
    ],
    ([L, C, H, A]) => output(["oklab", [String(L).concat("%"), C, H, A]]),
    curry(revert)(color),
  );
}

function revert(color, output) {
  return pipe(
    output,
    validator,
    ([, output]) => [output, color],
    ([output, color]) =>
      pipe(
        color,
        validator,
        ([format]) =>
          format === "named"
            ? color_to_hex(output)
            : convert(format, output)[1],
      ),
    (output) => validator(output)[1],
  );
}

/**
 * A utility for mixing any valid CSS color with a target color.
 *
 * @param {object} modifiers - mixture options
 * @param {number} [modifiers.amount] - amount to mix with target
 * @param {string} [modifiers.target] - the target color to mix
 *
 * @param {string} color - the color to mix
 * @returns {string}
 */
export function color_mix(modifiers, color) {
  // set default modifiers
  const { amount = 50, target = "black" } = modifiers;

  return pipe(
    calculateMix(color, target, numberFromPercent(amount)),
    ([L, a, b, A]) => [
      numberToPercent(L).toString().concat("%"),
      Math.sqrt(a ** 2 + b ** 2).toFixed(4),
      hueCorrection(radToDegrees(Math.atan2(b, a))),
      A,
    ],
    (components) => output(["oklab", components]),
    curry(revert)(color),
  );
}

function calculateMix(original, target, amount) {
  const [OL, Oa, Ob, OA] = pipe(
    original,
    color_to_oklab,
    parser,
    ([, components]) => components,
  );
  const [TL, Ta, Tb, TA] = pipe(
    target,
    color_to_oklab,
    parser,
    ([, components]) => components,
  );

  return [
    [OL, TL],
    [Oa, Ta],
    [Ob, Tb],
    [OA, TA],
  ].map(([X, Y]) => X + (Y - X) * amount);
}

/**
 * A utility to create an interpolated color scale from any valid CSS color.
 *
 * @param {object} modifiers - color interpolation options
 * @param {number} [modifiers.lightness] - adjust the color lightness/luminance
 * @param {number} [modifiers.chroma] - adjust the color chroma/intensity
 * @param {number} [modifiers.hue] - adjust the hue
 * @param {number} [modifiers.alpha] - adjust the alpha transparency
 * @param {number} [modifiers.values] - the number of output values (interpolation steps)
 *
 * @param {string} color - the color to interpolate
 * @returns {string[]}
 */
export function color_interpolation(modifiers, color) {
  // Set default modifiers
  const {
    lightness = 0,
    chroma = 0,
    hue = 0,
    alpha = 0,
    values = 10,
  } = modifiers;

  const calculateProperty = (property, pos) =>
    property - (property / values) * pos;

  return [
    ...new Set(
      Array.from({ length: values }, (_, pos) =>
        color_adjust(
          {
            lightness: calculateProperty(lightness, pos),
            chroma: calculateProperty(chroma, pos),
            hue: calculateProperty(hue, pos),
            alpha: calculateProperty(alpha, pos),
          },
          color,
        )).reverse(),
    ),
  ];
}

/**
 * A utility to create a blended color scale from any valid CSS color.
 *
 * @param {object} modifiers - color blending options
 * @param {number} [modifiers.amount] - total amount of mixture with target
 * @param {string} [modifiers.target] - the blend target
 * @param {number} [modifiers.values] - the number of output values (blend steps)
 *
 * @param {string} color - the color to interpolate
 * @returns {string[]}
 */
export function color_blend(modifiers, color) {
  // Set default modifiers
  const { amount = 100, target = "black", values = 10 } = modifiers;

  return [
    ...new Set(
      Array.from(
        { length: values },
        (_, pos) =>
          color_mix(
            { amount: amount - (amount / values) * pos, target },
            color,
          ),
      ).reverse(),
    ),
  ];
}

/**
 * A utility to create a material-esque color scale from any valid CSS color.
 *
 * @param {object} modifiers - color interpolation options
 * @param {number} [modifiers.light] - overall light color contrast
 * @param {number} [modifiers.dark] - overall dark color contrast
 *
 * @param {string} color - the color to generate from
 * @returns {string[]}
 */
export function color_material(modifiers, color) {
  // Set default modifiers
  const { light = 95, dark = 80 } = modifiers;

  return [
    ...color_tints({ contrast: light, values: 5 }, color).reverse(),
    color_mix(
      {
        amount: dark,
        target: color_mix(
          { amount: light / 10 - dark / 10, target: "black" },
          color,
        ),
      },
      color,
    ),
    ...color_shades({ contrast: dark, values: 4 }, color),
  ];
}

/**
 * A utility to generate a dyadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string]} `[a, b]` where `a = color`, `b = 90deg clockwise from a`
 */
export function color_to_scheme_dyadic(color) {
  return generateUniformScheme({ count: 2, arc: 90 }, color);
}

/**
 * A utility to generate a complementary color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string]} `[a, b]` where `a = color`, `b = 180deg from a`
 */
export function color_to_scheme_complementary(color) {
  return generateUniformScheme({ count: 2, arc: 180 }, color);
}

/**
 * A utility to generate an analogous color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string]} `[a, b, c]` where `a = color`, `b,c = 45deg spread from a`
 */
export function color_to_scheme_analogous(color) {
  return generateUniformScheme({ count: 3, arc: 45 }, color);
}

/**
 * A utility to generate an split-complementary color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string]} `[a, b, c]` where `a = color`, `b = 30deg left of opposite`, `c = 30deg right of opposite`
 */
export function color_to_scheme_split(color) {
  const [origin, complement] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: -30 }, complement),
    color_adjust({ hue: 30 }, complement),
  ];
}

/**
 * A utility to generate a triadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string]} `[a, b, c]` where `a = color`, `b,c = 120deg spread from a`
 */
export function color_to_scheme_triadic(color) {
  return generateUniformScheme({ count: 3, arc: 120 }, color);
}

/**
 * A utility to generate a triadic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string]} `[a, b, c]` where `a = color`, `b = 90deg right of a`, `c = 90deg left of a`
 */
export function color_to_scheme_clash(color) {
  const [origin, right, , left] = Array.from(color_to_scheme_square(color));
  return [origin, right, left];
}

/**
 * A utility to generate a tetradic color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string, string]} `[a, b, c, d]` where `a = color`, `b = 45deg right of a`, `c = 180deg from a`, `d = 45deg right of c`
 */
export function color_to_scheme_tetradic(color) {
  const [origin, opposite] = Array.from(color_to_scheme_complementary(color));
  return [
    origin,
    color_adjust({ hue: 45 }, origin),
    opposite,
    color_adjust({ hue: 45 }, opposite),
  ];
}

/**
 * A utility to generate a square color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string, string]} `[a, b, c, d]` where `a = color`, `b,c,d = 90deg spread from a`
 */
export function color_to_scheme_square(color) {
  return generateUniformScheme({ count: 4, arc: 90 }, color);
}

/**
 * A utility to generate a five color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string, string, string]} `[a, b, c, d, e]` where `a = color`, `b,c,d,e = 72deg spread from a`
 */
export function color_to_scheme_star(color) {
  return generateUniformScheme({ count: 5, arc: 72 }, color);
}

/**
 * A utility to generate a six color scale from any valid CSS color.
 *
 * @param {string} color - the input color
 * @returns {[string, string, string, string, string, string]} `[a, b, c, d, e, f]` where `a = color`, `b,c,d,e,f = 60deg spread from a`
 */
export function color_to_scheme_hexagon(color) {
  return generateUniformScheme({ count: 6, arc: 60 }, color);
}

function generateUniformScheme({ count, arc }, color) {
  return Array.from(
    { length: count },
    (_, pos) => color_adjust({ hue: arc * pos }, color),
  );
}

/**
 * A utility to generate tints of any valid CSS color.
 *
 * @param {object} modifiers - tint options
 * @param {number} [modifiers.contrast] - percentage of contrast between tints
 * @param {number} [modifiers.values] - number of tints to generate
 *
 * @param color - the input color
 * @returns {string[]} The output tints
 */
export function color_tints(modifiers, color) {
  // Set default modifiers
  const { contrast = 95, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "white" }, color);
}

/**
 * A utility to generate tones of any valid CSS color.
 *
 * @param {object} modifiers - tone options
 * @param {number} [modifiers.contrast] - percentage of contrast between tones
 * @param {number} [modifiers.values] - number of tones to generate
 *
 * @param color - the input color
 * @returns {string[]} The output tones
 */
export function color_tones(modifiers, color) {
  // Set default modifiers
  const { contrast = 90, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "gray" }, color);
}
/**
 * A utility to generate shades of any valid CSS color.
 *
 * @param {object} modifiers - shade options
 * @param {number} [modifiers.contrast] - percentage of contrast between shades
 * @param {number} [modifiers.values] - number of shades to generate
 *
 * @param color - the input color
 * @returns {string[]} The output shades
 */
export function color_shades(modifiers, color) {
  // Set default modifiers
  const { contrast = 80, values = 3 } = modifiers;

  return color_blend({ amount: contrast, values, target: "black" }, color);
}

/**
 * A utility to update a generated color scale by a given set of properties.
 *
 * @param {object} modifiers - palette shifting options
 * @param {number} [modifiers.lightness] - shift the palette lightness/luminance
 * @param {number} [modifiers.chroma] - shift the palette chroma/intensity
 * @param {number} [modifiers.hue] - shift the palette hue
 * @param {number} [modifiers.alpha] - shift the palette alpha transparency
 *
 * @param {string[]} palette - the palette to modify
 * @returns {string[]} New adjusted palette
 *
 * @remarks
 * A color scale is just a plain array, generated or not. So you can also use this
 * utility to batch adjust arbitrary colors (so long as they're valid).
 */
export function palette_shift(modifiers, palette) {
  // Set default modifiers
  const { lightness = 0, chroma = 0, hue = 0, alpha = 0 } = modifiers;

  return Array.from(
    new Set(
      palette.map((color) =>
        color_adjust({ lightness, chroma, hue, alpha }, color)
      ),
    ),
  );
}

/**
 * A utility to conditionally sort a generated color scale by a given property.
 *
 * @param {object} condition - palette sorting conditions
 * @param {"lightness" | "chroma" | "hue" | "alpha"} condition.property - the property to sort by
 * @param {"asc" | "desc"} [condition.order] - the sorting order
 *
 * @param {string[]} palette - the palette to sort
 * @returns {string[]} New sorted palette
 *
 * @remarks
 * This utility is geared for perceptually accurate sorting, so the format
 * doesn't necessarily matter. That said, it will coerce all colors in the
 * scale to the format of the *first* color to ensure uniform output.
 */
export function palette_sort(condition, palette) {
  // Set default sort conditions
  const { property, order = "asc" } = condition;

  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(sortPalette)({ by: property, order }),
    curry(paletteFromOklab)(color),
  );
}

function paletteToOklabValues(palette) {
  return pipe(
    Array.from(palette),
    (palette) => palette.map((color) => color_to_oklab(color)),
    (palette) => palette.map((color) => extractor(color)),
    (palette) => palette.map(([, color]) => color),
    (palette) => palette.map((color) => color.map((C) => parseFloat(C))),
  );
}

function sortPalette({ by, order }, palette) {
  const evalCondition = (a, b) => (order === "desc" ? b - a : a - b);
  const sortingConditions = (property) =>
    new Map([
      ["lightness", ([A], [B]) => evalCondition(A, B)],
      ["chroma", ([, A], [, B]) => evalCondition(A, B)],
      ["hue", ([, , A], [, , B]) => evalCondition(A, B)],
      ["alpha", ([, , , A], [, , , B]) => evalCondition(A, B)],
    ]).get(property);

  return palette.sort(sortingConditions(by));
}

function paletteFromOklab(input, palette) {
  return pipe(
    palette,
    (palette) =>
      palette.map(([L, C, H, A]) =>
        output(["oklab", [L.toString().concat("%"), C, H, A ?? 1]])
      ),
    (palette) =>
      Array.from(new Set(palette.map((color) => revert(input, color)))),
  );
}

/**
 * A utility to conditionally filter a generated color scale by a given property.
 *
 * @param {object} condition - palette filtering conditions
 * @param {"lightness" | "chroma" | "hue" | "alpha"} condition.property - the filtering target
 * @param {number} condition.min - the threshold value
 * @param {number} [condition.max] - the optional gate value
 *
 * @param {string[]} palette - the palette to filter
 * @returns {string[]} New filtered palette
 *
 * @remarks
 * This utility is geared for perceptually accurate filtering, so the format
 * doesn't necessarily matter. That said, it will coerce all colors in the
 * scale to the format of the *first* color to ensure uniform output.
 *
 * Also be aware that filtering is inclusive.
 */
export function palette_filter(condition, palette) {
  // Set default filtering conditions
  const { property, min, max = 0 } = condition;

  const [, color] = validator(palette[0]);
  return pipe(
    palette,
    paletteToOklabValues,
    curry(flushPalette)({ by: property, min, max }),
    curry(paletteFromOklab)(color),
  );
}

function flushPalette({ by, min, max }, palette) {
  return palette.filter(parseFlushCondition({ by, min, max }));
}

function parseFlushCondition({ by, min, max }) {
  const filterCondition = (v) => (max ? v >= min && v <= max : v > min);
  const filterConditionAsNumber = (v) =>
    max
      ? v > numberFromPercent(min) && v < numberFromPercent(max)
      : v > numberFromPercent(min);
  const matchProperty = (property) =>
    new Map([
      ["lightness", ([V]) => filterCondition(V)],
      ["chroma", ([, V]) => filterConditionAsNumber(V)],
      ["hue", ([, , V]) => filterCondition(V)],
      ["alpha", ([, , , V]) => filterConditionAsNumber(V)],
    ]).get(property);

  return matchProperty(by);
}

/**
 * A data utility for using colors from the Colors (https://clrs.cc) project.
 *
 * @param {"navy" | "blue" | "aqua" | "teal" | "lime" | "olive" | "green" | "lime" | "yellow" | "maroon" | "fuchsia" | "purple" | "black" | "gray" | "grey" | "silver" | "white"} keyword - defined color keywords
 * @returns {string} Value matching color keyword
 */
export function data_clrs(keyword) {
  return CLRS[keyword] || UndefinedInClrsError();
}

function UndefinedInClrsError() {
  throw new QSCError({
    name: "No Matching Keyword in Colors",
    reason: `
This error throws when the input doesn't match any defined
keywords in the Colors project.
`,
    suggestion: `
Valid colors in the Colors (https://clrs.cc) project:

+--------------------------------------+
| navy   | blue      | aqua   | teal   |
+--------------------------------------+
| olive  | green     | lime   | yellow |
+--------------------------------------+
| maroon | fuschia   | purple | black  |
+--------------------------------------+
| gray/grey | silver | white  |        |
+--------------------------------------+
`,
  });
}

/**
 * A utility that filters a generated color scale by WCAG contrast ratio recommendations.
 *
 * @param {object} condition - contrast ratio options
 * @param {"AA" | "AAA"} [condition.rating] - the target contrast grade
 * @param {boolean} [condition.enhanced] - use the enhanced grading?
 * @param {string} [condition.background] - the background color to compare against
 *
 * @param {string[]} palette - the palette to filter
 * @returns {string[]} New filtered palette
 *
 * @remarks
 * "AA" rating is set by default. The background color is "white" by default
 */
export function palette_contrast(condition, palette) {
  // Set default modifiers
  const { rating = "AA", enhanced = false, background = "white" } = condition;

  return palette.filter((foreground) => {
    const CONTRAST_RATIO = calculateWCAGContrastRatio(background, foreground);
    return contrastCriteria(CONTRAST_RATIO, enhanced).get(rating);
  });
}

function calculateWCAGContrastRatio(a, b) {
  return [a, b]
    .map((color) => calculateRelativeLuminance(color))
    .sort((a, b) => b - a)
    .map((L) => L + 0.05)
    .reduce((L1, L2) => precision(L1 / L2));
}

function contrastCriteria(ratio, enhanced) {
  return new Map([
    ["AA", enhanced ? ratio >= 4.5 : ratio >= 3.1],
    ["AAA", enhanced ? ratio >= 7 : ratio >= 4.5],
  ]);
}

function calculateRelativeLuminance(color) {
  return pipe(
    color,
    color_to_rgb,
    parser,
    ([, [R, G, B]]) => [R, G, B],
    rgbToLrgb,
    ([R, G, B]) => 0.2126 * R + 0.7152 * G + 0.0722 * B,
  );
}

/**
 * A data formula for using system font stacks (https://systemfontstack.com).
 *
 * @param {"sans" | "serif" | "monospace"} family - the stack to use
 * @returns {string} Font stack matching the family
 */
export function data_systemfonts(family) {
  return SYSTEM_FONT_STACKS[family] || NotASystemFontFamilyError();
}

function NotASystemFontFamilyError() {
  throw new QSCError({
    name: "Not a System Font Stack",
    reason: `
The value entered is not a valid system font family.
`,
    suggestion: `
The available values matching system font families are:

sans
serif
monospace
`,
  });
}

/**
 * A utility for creating modular scales from a base value.
 *
 * @param {object} modifiers - modular scale options
 * @param {number} [modifiers.ratio] - the ratio to calculate the scale
 * @param {number} [modifiers.values] - the total number of values to generate
 *
 * @param {number} base - the base value to generate from
 * @returns {number[]} A raw modular scale
 *
 * @remarks
 * This utility is the starting point for using modular scales in Quarks System
 * Core. Once generated, you can modify it with the other modular scale utilities.
 *
 * @see {@link ms_modify} for updating modular scales
 * @see {@link ms_split} for partitioning larger scales
 * @see {@link ms_units} for attaching CSS units
 */
export function ms_create(modifiers, base) {
  // Set default modifiers
  const { values = 6, ratio = 1.5 } = modifiers;

  return Array.isArray(ratio)
    ? Array.from(
      new Set(
        Array(values)
          .fill(base)
          .reduce(
            (acc, base, index) => [
              ...acc,
              ...ratio.map((r) => base * r ** index),
            ],
            [],
          ),
      ),
    )
      .slice(0, values)
      .sort((a, b) => a - b)
    : Array(values)
      .fill(base)
      .map((base, index) => base * ratio ** index);
}

/**
 * A utility for modifying a modular scale.
 *
 * @param {(n: number) => number} calc - the calculation that will modify each scale value
 * @param {number[]} ms - the scale to modify
 * @returns {number[]} New scale of recalculated values
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * The `n` parameter of the calc function represents existing scale values. So
 * `(n) => n / 2` means "divide each scale value by 2".
 *
 * @see {@link ms_create} for creating a modular scale
 */
export function ms_modify(calc, ms) {
  return unlessMS(
    ms.map((n) => calc(n)),
    ms,
  );
}

/**
 * A utility for splitting a modular scale into an array of partitions.
 *
 * @param {number} partitionSize - the number of values in each partition
 * @param {number[]} ms - the scale to partition
 * @returns {number[][]} New scale containing partitioned values
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * The scale values will fill partitions evenly. If the scale doesn't have enough
 * values to fill the last partition, it'll be filled with the remaining values.
 *
 * So a 25 value scale with a partition size of 3 will have the remainder (1) in
 * its last partition.
 *
 * @see {@link ms_create} for creating a modular scale
 */
export function ms_split(partitionSize, ms) {
  return unlessMS(
    Array.from(ms).reduceRight(
      (acc, _n, _index, array) => [...acc, array.splice(0, partitionSize)],
      [],
    ),
    ms,
  );
}

function unlessMS(body, data) {
  return Array.isArray(data) && data.every((n) => typeof n === "number")
    ? body
    : NotARawMSError(data);
}

function NotARawMSError() {
  throw new QSCError({
    name: "Not a Raw Modular Scale",
    reason: `
You've called a modular scale utility with something other than a modular
scale.
`,
    suggestion: `
Remember that scale modification functions only work on a scale of raw values.
Do all of your value transformations before you invoke ms_units().

Also, remember to create a raw scale with ms_create(). Such as the following:

ms_create({ values: 8, ratio: 1.618 }, 1);
`,
  });
}

/** @typedef {"cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px"} CSSAbsoluteUnits - supported CSS absolute units */
/** @typedef {"em" | "ex" | "ch" | "rem" | "lh" | "vw" | "vh" | "vmin" | "vmax"} CSSRelativeUnits - supported CSS relative units */
/** @typedef {"ms" | "s"} CSSTimingUnits - supported CSS timing units */
/** @typedef {CSSRelativeUnits | CSSAbsoluteUnits | CSSTimingUnits | "%"} CSSUnits - supported CSS units */

/**
 * A utility for attaching CSS relative/absolute units to a modular scale.
 *
 * @param {CSSUnits} unit - the target unit to attach to each value in the scale
 * @param {number[]} ms - the scale to transform
 * @returns {string[]} New scale with attached units
 *
 * @remarks
 * This utility will refuse to process anything that isn't a raw modular scale.
 *
 * Important to note: this utility doesn't do any calculation. Its only purpose is to
 * attach your units and limit the precision of scale values. I've found 5 decimal
 * places is a good balance for accuracy and usability.
 *
 * @see {@link ms_create} for creating a modular scale
 * @see {@link ms_modify} for performing calculations on raw scales
 */
export function ms_units(unit, ms) {
  return unlessMS(
    ms.map((n) => `${precision(n)}${unit}`, ms),
    ms,
  );
}

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
 * @typedef {string | number} QSValue - value
 */

/**
 * @typedef {QSValue[]} QSScale - array of values
 */

/**
 * @typedef {{base: QSValue, [index: string]: QSValue | QSScale | QSDSubcategory }} QSDSubcategory - token subcategory (base represents default, any other properties are variants)
 */

/**
 * @typedef {{[index: string]: QSValue | QSScale | QSDSubcategory| QSDMetadata | object | QSDTokens }} QSDTokens - design tokens (consumed recursively by token exporters)
 */

/**
 * @typedef {{project?: QSDProject, [index: string]: QSDTokens }} QSD - Quarks System Dictionary design token spec
 */

/**
 * A utility for exporting a complete Quarks System Dictionary as CSS custom properties.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are always wrapped in a `:root` selector.
 */
export function tokens_to_css(dict) {
  return cssFormatStructure({}, dict);
}

/**
 * A utility for exporting a complete Quarks System Dictionary as Sass variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Sass variables. No mapping.
 *
 * @see {@link tokens_to_styledict} for exporting tokens to Style Dictionary,
 * which does allow output as Sass maps
 */
export function tokens_to_scss(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "$" },
    },
    dict,
  );
}

/**
 * A utility for exporting a complete Quarks System Dictionary as Less variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Less variables.
 */
export function tokens_to_less(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "@" },
    },
    dict,
  );
}

/**
 * A utility for exporting a complete Quarks System Dictionary as Stylus variables.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 *
 * The tokens are basic Stylus variables.
 */
export function tokens_to_styl(dict) {
  return cssFormatStructure(
    {
      doc: ["\n/*!", " */\n"],
      metadata: ["", "// ", "\n\n"],
      wrapper: ["", "\n"],
      opts: { padding: "", prefix: "", assignment: " = ", suffix: "" },
    },
    dict,
  );
}

/**
 * A utility for exporting a complete Quarks System Dictionary as JSON data.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_json(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  return JSON.stringify({ project, tokens }, null, 2);
}

/**
 * A utility for exporting a complete Quarks System Dictionary as YAML data.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_yaml(dict) {
  const { project, ...tokens } = dict;
  const { bump = "manual" } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  // Then bump the version
  autobump && bumpVersion(project);

  // Recursively assemble the data tree
  const assemble = (level, tree) =>
    Object.entries(tree).reduce((str, [key, data]) => {
      if (typeof data === "string") return yamlDictValue(level, str, key, data);
      if (Array.isArray(data)) return yamlDictScale(level, str, key, data);
      if (key === "base") return yamlDictSubcategory(level, data);
      return str.concat(
        "".padStart(level),
        key,
        ":\n",
        assemble(level + 2, data),
      );
    }, "");

  return `
# ${timestampEmitter()}
${
    Object.entries({ project, tokens })
      .reduce((str, [key, data]) => {
        if (typeof data === "string") return yamlDictValue(0, str, key, data);
        if (Array.isArray(data)) return yamlDictScale(0, str, key, data);
        if (key === "base") return yamlDictSubcategory(0, data);
        return str.concat("\n", key, ":\n", assemble(2, data));
      }, "")
      .trimEnd()
  }
`;
}

/**
 * A utility for exporting Quarks System Dictionary colors as a GIMP/Inkscape palette.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_gpl(dict) {
  const { project, color } = dict;

  const {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  // Check if bump matches an automation keyword
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  const assemble = (head, node) =>
    Object.entries(node).reduce((str, [key, value]) => {
      const KEY = key.toUpperCase();

      // Ignore metadata
      if (key === "metadata") {
        return str;
      }

      if (typeof value === "object") {
        return str.concat(
          assemble(tokenStringIdentifier(head, KEY, " "), value),
        );
      }
      return str.concat(
        gimpPaletteSwatch(value),
        "\t",
        tokenStringIdentifier(head, KEY, " "),
        ` (${color_to_hex(value)})`,
        "\n",
      );
    }, "");

  return `
GIMP Palette
Name: ${name} (v${autobump ? bumpVersion(project) : version})
# Generator: Quarks System Core
# Owned by ${author}
# License: ${license}
${
    metadataEmitter(
      { commentDelim: ["#", "# ", "\n#"] },
      {
        description,
        comments,
      },
    )
  }
# ${timestampEmitter()}

Columns: 6
${assemble("", color)}
`.trimStart();
}

function gimpPaletteSwatch(color) {
  return pipe(color, color_to_rgb, extractor, ([, components]) =>
    components
      .map((C) => C.padStart(3, " "))
      .slice(0, 3)
      .join("\t"));
}

/**
 * A utility for exporting Quarks System Dictionary colors as a Sketch palette.
 *
 * @param {QSD} dict - the tokens to export
 * @returns {string}
 *
 * @remarks
 * By design, token exporters do *not* assume read/write access to your machine.
 * The output is a file-ready formatted string that you can output to a file using the
 * filesystem API of your choice.
 */
export function tokens_to_sketchpalette(dict) {
  const { project, color } = dict;

  const {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError();

  const assemble = (tree) =>
    Object.entries(tree).reduce((acc, [key, data]) => {
      // Ignore metadata
      if (key === "metadata") return acc;

      if (typeof data === "object") {
        return acc.concat(assemble(data));
      }

      if (Array.isArray(data)) {
        return acc.concat(data.map((color) => sketchSwatch(color)).flat());
      }

      return acc.concat(sketchSwatch(data));
    }, []);

  return JSON.stringify({
    colors: assemble(color),
    pluginVersion: "1.4",
    compatibleVersion: "1.4",
  });
}

function sketchSwatch(color) {
  return pipe(color, color_to_rgb, parser, ([, [red, green, blue, alpha]]) => ({
    red,
    green,
    blue,
    alpha,
  }));
}

/**
 * A utility for exporting a Quarks System Dictionary as TailwindCSS theme data.
 *
 * @param {QSD} dict - the tokens to transform
 * @returns {object}
 */
export function tokens_to_tailwindcss(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "base") return { ...acc, DEFAULT: data };

      // Skip past any metadata
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: data };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}

/**
 * A utility for exporting a Quarks System Dictionary as Style Dictionary tokens.
 *
 * @param {QSD} dict - the tokens to transform
 * @returns {object}
 */
export function tokens_to_styledict(dict) {
  const { project, ...tokens } = dict;

  const assemble = (node) =>
    Object.entries(node).reduce((acc, [key, data]) => {
      if (key === "metadata") return { ...acc };

      if (typeof data === "object") {
        return { ...acc, [key]: assemble(data) };
      }

      return { ...acc, [key]: { value: String(data) } };
    }, {});

  return (project && assemble(tokens)) || MissingProjectMetadataError();
}

function cssFormatStructure(
  {
    doc: [DOC_OPEN, DOC_CLOSE] = ["\n/**", " **/\n"],
    metadata: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    wrapper: [TOKENS_OPEN, TOKENS_CLOSE] = ["\n:root {", "\n}\n"],
    opts = { padding: "  " },
  } = {},
  { project, ...tokens },
) {
  let {
    name,
    author,
    version,
    license,
    bump = "manual",
    metadata: { description = "N/A", comments = "N/A" } = {},
  } = project || MissingProjectMetadataError(project);

  // Attach a dynamic property initializing the autorelease version
  const autobump = ["major", "minor", "patch", "pre", "build"].some(
    (keyword) => keyword === bump,
  );

  return "".concat(
    DOC_OPEN,
    `
 * Project: ${name} (v${autobump ? bumpVersion(project) : version})
 * Owned by: ${author}
 * License: ${license}
 * ${"=".repeat(64)}
${
      metadataEmitter(
        { commentDelim: [" *", " * ", ""] },
        {
          description,
          comments,
        },
      )
    }
 * ${"-".repeat(64)}
 * ${timestampEmitter()}
`,
    DOC_CLOSE,
    TOKENS_OPEN,
    tokenStringConstructor(
      { ...opts, commentDelim: [OPEN, DELIM, CLOSE] },
      tokens,
    ),
    TOKENS_CLOSE,
  );
}

function MissingProjectMetadataError() {
  throw new QSCError({
    name: "Missing Project Metadata",
    reason: `
Formatters will not process a Quarks System Dictionary that's missing project
metadata. Its absence indicates that the current dictionary is still open
for modification.
`,
    suggestion: `
Be sure to include project metadata when you're ready to export your tokens.
Here's an example of the proper schema.

const finishedDict = {
  project: {
    name: "My Project",
    author: "Anonymous",
    version: "0.0.0",
    license: "Unlicense",
    // OPTIONAL can also be one of "major", "minor", "patch", "pre", "build" for automatic versioning
    bump: "manual",
    // OPTIONAL
    metadata: {
      description: "N/A",
      comments: "N/A"
    }
  },
  ...tokens
};

The first four properties are all required. Up to you if you want to include
a description or comments with your project.
`,
  });
}

function metadataEmitter(
  {
    commentDelim: [OPEN, DELIM, CLOSE] = ["\n  /**", "   * ", "\n   **/\n\n"],
    str = "",
  },
  meta,
) {
  return str.concat(
    [
      OPEN,
      Object.entries(meta).reduce((str, [key, value]) => {
        const lines = value.split("\n");

        if (lines.length > 1) {
          return str
            .concat(
              "\n",
              DELIM,
              key.toUpperCase(),
              ":",
              "\n",
              DELIM.trimEnd(),
              lines.join(`\n${DELIM}`),
            )
            .trimEnd();
        }

        return str.concat("\n", DELIM, key.toUpperCase(), ": ", lines);
      }, ""),
      CLOSE,
    ].join(""),
  );
}

function tokenStringConstructor(opts, dict) {
  return "".concat("\n", cssTokenEmitter(opts, "", dict));
}

function cssTokenEmitter(opts, head, node) {
  function assemble(head, node) {
    const { metadata, ...tokens } = node;
    return "".concat(
      (metadata && metadataEmitter(opts, metadata)) || "", // prepend metadata if defined
      Object.entries(tokens).reduce((str, [key, value]) => {
        const format = cssTokenAssembler(opts);
        if (typeof value === "object") {
          return str.concat(
            assemble(tokenStringIdentifier(head, key, "-"), value),
          );
        }

        return format(str, tokenStringIdentifier(head, key, "-"), value, "\n");
      }, ""),
    );
  }

  return assemble(head, node);
}

function cssTokenAssembler({
  padding = "",
  prefix = "--",
  assignment = ": ",
  suffix = ";",
  terminator = "\n",
}) {
  return function (str, key, value) {
    return str.concat(
      padding,
      prefix,
      key,
      assignment,
      value,
      suffix,
      terminator,
    );
  };
}

function tokenStringIdentifier(collected, current, delimiter) {
  return current === "base"
    ? collected
    : collected
    ? [collected, current].join(delimiter)
    : current;
}

function bumpVersion(project) {
  let [major, minor, patch, pre] = Array.from(
    project.version.split(/[.-]/g),
  ).map((n) => parseFloat(n));

  function next(keyword) {
    const bumped = new Map([
      ["major", [major + 1, 0, 0]],
      ["minor", [major, minor + 1, 0]],
      ["patch", [major, minor, patch + 1]],
      ["pre", [major, minor, patch, pre + 1 || 0]],
      ["build", [major, minor, patch, pre, Date.now()]],
    ]).get(keyword);

    return bumped;
  }

  const releaseConditions = (release) =>
    Array.from(
      new Map([
        [release.length === 3, release.join(".")],
        [
          release.length === 4,
          [release.slice(0, 3).join("."), release[3]].join("-"),
        ],
        [
          release.length === 5,
          [
            release.slice(0, 3).join("."),
            [release[3] ?? 0, release[4]].join("+"),
          ].join("-"),
        ],
      ]),
    )
      .filter(([condition]) => condition)
      .flatMap(([, release]) => release)
      .toString();

  project["version"] = releaseConditions(next(project.bump));

  return project.version;
}

function timestampEmitter() {
  const TIMESTAMP = new Date(Date.now());
  return `Updated on ${TIMESTAMP.toLocaleDateString()} at ${TIMESTAMP.toLocaleTimeString()}`;
}

function yamlDictSubcategory(level, data) {
  return Object.entries(data).reduce((str, [key, v]) => {
    if (Array.isArray(v)) return yamlDictScale(level, str, key, v);
    return yamlDictValue(level, str, key, v);
  }, "");
}

function yamlDictValue(level, str, key, value) {
  const isMultiline = value.split("\n").length > 1;
  if (isMultiline) {
    return str.concat(
      "".padStart(level),
      `${key}: |\n`,
      value
        .split("\n")
        .reduce((s, line) => s.concat("".padStart(level + 2), line, "\n"), ""),
    );
  }
  return str.concat("".padStart(level), key, ": ", value, "\n");
}

function yamlDictScale(level, str, key, value) {
  return str.concat(
    "".padStart(level),
    key,
    ":\n",
    value.reduce((s, v) => s.concat("".padStart(level + 2), "- ", v, "\n"), ""),
  );
}

function curry(fn) {
  return (...initial) =>
    initial.length >= fn.length
      ? fn.apply(this, initial)
      : (...remaining) => fn.apply(this, initial.concat(remaining));
}

function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}

function pipe(x, ...fns) {
  return compose(...fns)(x);
}

const INPUT_TO_RGB = {
  named: compose(hexFromNamedColor, passthrough, hexToRgb),
  hex: hexToRgb,
  rgb: compose(hexFromRgb, passthrough, hexToRgb), // identity
  hsl: hslToRgb,
  cmyk: cmykToRgb,
  hwb: hwbToRgb,
  cielab: cielabToRgb,
  cielch: compose(cielabFromCielch, passthrough, cielabToRgb),
  oklab: oklabToRgb,
};

const OUTPUT_FROM_RGB = {
  hex: hexFromRgb,
  rgb: compose(hexFromRgb, passthrough, hexToRgb),
  hsl: hslFromRgb,
  cmyk: cmykFromRgb,
  hwb: hwbFromRgb,
  cielab: cielabFromRgb,
  cielch: compose(cielabFromRgb, passthrough, cielabToCielch),
  oklab: oklabFromRgb,
};

function passthrough([, color]) {
  return color;
}

function convert(output, color) {
  const [input, value] = validator(color);
  return pipe(
    validator(color),
    ([input, color]) => INPUT_TO_RGB[input](color),
    ([, color]) => OUTPUT_FROM_RGB[output](color),
  );
}

const add = (y, x) => x + y;
const multiply = (y, x) => x * y;
const divide = (y, x) => x / y;
const remainder = (y, x) => x % y;

const precision = (value) => +value.toPrecision(5);
const normalize = (b, a, x) => (x < a ? a : x > b ? b : precision(x));

const hexFragmentToRgb = (fragment) => parseInt(fragment, 16);
const hexFragmentFromRgb = (channel) => channel.toString(16).padStart(2, "0");

const numberToPercent = (n) => multiply(100, n);
const numberFromPercent = (percentage) => divide(100, percentage);

const numberToRgb = (n) => multiply(255, n);
const numberFromRgb = (channel) => divide(255, channel);
const rgbFromPercent = compose(numberFromPercent, numberToRgb, Math.round);
const hexFragmentFromNumber = compose(
  numberToRgb,
  Math.round,
  hexFragmentFromRgb,
);

const radToDegrees = (radians) =>
  compose(
    () => divide(Math.PI, 180),
    (result) => multiply(result, radians),
    (degrees) => precision(degrees),
  )();
const radFromDegrees = (degrees) =>
  compose(
    () => divide(180, Math.PI),
    (result) => multiply(result, degrees),
    (radians) => precision(radians),
  )();
const gradToDegrees = (gradians) =>
  compose(
    () => divide(200, 180),
    (result) => multiply(result, gradians),
    (degrees) => precision(degrees),
  )();
const numberToDegrees = (n) => multiply(360, n);
const hueCorrection = (hue) =>
  normalize(
    360,
    -360,
    Math.sign(hue) === -1 ? Math.abs(add(360, hue)) : hue > 360
      ? remainder(360, hue)
      : hue,
  );

function hexToRgb(color) {
  const [, components] = parser(color);
  return pipe(output(["rgb", components]), validator);
}

function hslToRgb(color) {
  const [, [H, S, L, A]] = parser(color);

  // Calculate chroma
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - C / 2;

  const [R, G, B] = Array.from(calculateRGB(C, X, H))
    .filter(([, condition]) => condition)
    .flatMap(([evaluation]) => evaluation)
    .map((V) => pipe(V + m, numberToRgb, Math.round, curry(normalize)(255, 0)));

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

function calculateRGB(C, X, H) {
  return new Map([
    [[C, X, 0], 0 <= H && H < 60],
    [[X, C, 0], 60 <= H && H < 120],
    [[0, C, X], 120 <= H && H < 180],
    [[0, X, C], 180 <= H && H < 240],
    [[X, 0, C], 240 <= H && H < 300],
    [[C, 0, X], 300 <= H && H < 360],
  ]);
}

function cmykToRgb(color) {
  const [, [C, M, Y, K, A]] = parser(color);

  const [R, G, B] = [C, M, Y].map((V) =>
    pipe((1 - V) * (1 - K), numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

function hwbToRgb(color) {
  const [, [H, W, BLK, A]] = parser(color);

  // Achromacity
  if (W + BLK >= 1) {
    const GRAY = pipe(
      W / (W + BLK),
      numberToRgb,
      Math.round,
      curry(normalize)(255, 0),
    );

    return pipe(output(["rgb", [Array(3).fill(GRAY), A]]), validator);
  }

  const [R, G, B] = pipe(
    `hsl(${H}, 100%, 50%)`,
    hslToRgb,
    ([, color]) => parser(color),
    ([, color]) => color,
  ).map((V) =>
    pipe(
      V * (1 - W - BLK) + W,
      numberToRgb,
      Math.round,
      curry(normalize)(255, 0),
    )
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

function cielabToRgb(color) {
  const [, [L, a, b, A]] = parser(color);
  const [X, Y, Z] = cielabToCiexyz([L, a, b]);
  const [LR, LG, LB] = ciexyzToLrgb([X, Y, Z]);
  const [R, G, B] = lrgbToRgb([LR, LG, LB]).map((V) =>
    pipe(V, numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
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

function ciexyzToLrgb([X, Y, Z]) {
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

function oklabToRgb(color) {
  const [, [L, a, b, A]] = parser(color);
  const [LR, LG, LB] = oklabToLrgb([L, a, b]);

  const [R, G, B] = lrgbToRgb([LR, LG, LB]).map((V) =>
    pipe(V, numberToRgb, Math.round, curry(normalize)(255, 0))
  );

  return pipe(output(["rgb", [R, G, B, A]]), validator);
}

const LINEAR_LMS_CONE_ACTIVATIONS = [
  [0.3963377774, 0.2158037573],
  [0.1055613458, 0.0638541728],
  [0.0894841775, 1.291485548],
];

const LINEAR_RGB_OKLAB_MATRIX = [
  [4.076416621, 3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, 0.3413193965],
  [-0.0041960863, 0.7034186147, 1.707614701],
];

function oklabToLrgb([L, a, b]) {
  const [LONG, M, S] = LINEAR_LMS_CONE_ACTIVATIONS.map(([V1, V2], pos) => {
    if (pos === 0) return L + a * V1 + b * V2;
    if (pos === 1) return L - a * V1 - b * V2;
    return L - a * V1 - b * V2;
  }).map((V) => V ** 3);

  const [LR, LG, LB] = LINEAR_RGB_OKLAB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return LONG * V1 - M * V2 + S * V3;
    if (pos === 1) return LONG * V1 + M * V2 - S * V3;
    return LONG * V1 - M * V2 + S * V3;
  });

  return [LR, LG, LB];
}

function hexFromRgb(color) {
  const [, components] = parser(color);
  return pipe(
    output([
      "hex",
      components.map((V) =>
        pipe(
          V,
          numberToRgb,
          Math.round,
          curry(normalize)(255, 0),
          hexFragmentFromRgb,
        )
      ),
    ]),
    validator,
  );
}

function hslFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const MIN = Math.min(R, G, B);
  const MAX = Math.max(R, G, B);
  const DELTA = MAX - MIN;

  const L = calculateLightness(MIN, MAX);
  const [[H], S] = [
    Array.from(calculateHue(R, G, B, MAX, DELTA))
      .filter(([, condition]) => condition)
      .flatMap(([result]) => result),
    calculateSaturation(DELTA, L),
  ];

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "hsl",
      [
        hueCorrection(H),
        ...[S, L].map((V) =>
          pipe(V, numberToPercent, limitPercent, (value) => value.toString())
            .concat("%")
        ),
        A,
      ],
    ]),
    validator,
  );
}

function calculateLightness(cmin, cmax) {
  return (cmax + cmin) / 2;
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

function cmykFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const K = 1 - Math.max(R, G, B);
  const [C, M, Y] = [R, G, B].map((V) => (1 - V - K) / (1 - K));

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "cmyk",
      [
        ...[C, M, Y, K]
          .map((V) => (isNaN(V) ? 0 : pipe(V, numberToPercent, limitPercent)))
          .map((V) => V.toString().concat("%")),
        A,
      ],
    ]),
    validator,
  );
}

function hwbFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);

  const MAX = Math.max(R, G, B);
  const MIN = Math.min(R, G, B);
  const DELTA = MAX - MIN;

  const [H] = Array.from(calculateHue(R, G, B, MAX, DELTA))
    .filter(([, condition]) => condition)
    .flatMap(([result]) => result);

  const [W, BLK] = [MIN, 1 - MAX];

  const limitPercent = curry(normalize)(100, 0);

  return pipe(
    output([
      "hwb",
      [
        hueCorrection(H),
        ...[W, BLK].map((V) =>
          pipe(V, numberToPercent, limitPercent).toString().concat("%")
        ),
        A,
      ],
    ]),
    validator,
  );
}

function cielabFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);
  const [X, Y, Z] = rgbToCieXYZ([R, G, B]);
  const [L, a, b] = ciexyzToCielab([X, Y, Z]);

  return pipe(
    output(["cielab", [precision(L).toString().concat("%"), a, b, A]]),
    validator,
  );
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

  const [L, a, b] = [116 * FY - 16, 500 * (FX - FY), 200 * (FY - FZ)]
    .map((V) => precision(V))
    .map((V, pos) =>
      pos === 0 ? normalize(256, 0, V) : +normalize(128, -127, V).toFixed(4)
    );

  return [L, a, b];
}

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

function rgbToCieXYZ([R, G, B]) {
  const [LR, LG, LB] = rgbToLrgb([R, G, B]);

  const [x, y, z] = D65_REFERENCE_WHITE.map(
    ([V1, V2, V3]) => LR * V1 + LG * V2 + LB * V3,
  );

  const [X, Y, Z] = D50_CHROMATIC_ADAPTATION.map(
    ([V1, V2, V3]) => x * V1 + y * V2 + z * V3,
  );

  return [X, Y, Z];
}

function rgbToLrgb([R, G, B]) {
  return [R, G, B].map((V) =>
    V <= 0.04045 ? V / 12.92 : ((V + 0.055) / 1.055) ** 2.4
  );
}

function oklabFromRgb(color) {
  const [, [R, G, B, A]] = parser(color);
  const [l, a, b] = lrgbToOklab([R, G, B]);

  const L = precision(numberToPercent(l)).toString().concat("%");
  const c = normalize(0.5, 0, +Math.sqrt(a ** 2 + b ** 2).toFixed(4)); // toPrecision isn't strict enough
  const C = Math.sign(Math.round(c)) === -1 ? 0 : c;
  const H = pipe(Math.atan2(b, a), radToDegrees, hueCorrection);

  return pipe(output(["oklab", [L, C, H, A]]), validator);
}

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

function lrgbToOklab([R, G, B]) {
  const [LR, LG, LB] = rgbToLrgb([R, G, B]);

  const [L, M, S] = NONLINEAR_LMS_CONE_ACTIVATIONS.map(
    ([L, M, S]) => L * LR + M * LG + S * LB,
  ).map((V) => Math.cbrt(V));

  return RGB_OKLAB_MATRIX.map(([V1, V2, V3], pos) => {
    if (pos === 0) return V1 * L + V2 * M - V3 * S;
    if (pos === 1) return V1 * L - V2 * M + V3 * S;
    return V1 * L + V2 * M - V3 * S;
  });
}

function hexFromNamedColor(color) {
  return validator(NAMED_COLOR_KEYWORDS[color]);
}

function cielabToCielch(color) {
  const [, [L, a, b, A]] = parser(color);

  const C = normalize(132, 0, Math.sqrt(a ** 2 + b ** 2));
  const H = pipe(Math.atan2(b, a), radToDegrees, hueCorrection);

  return pipe(
    output(["cielch", [L.toString().concat("%"), C, H, A]]),
    validator,
  );
}

function cielabFromCielch(color) {
  const [, [L, C, H, A]] = parser(color);

  const [a, b] = [
    C * Math.cos(radFromDegrees(H)),
    C * Math.sin(radFromDegrees(H)),
  ].map((V) => normalize(128, -127, V));

  return pipe(
    output(["cielab", [L.toString().concat("%"), a, b, A]]),
    validator,
  );
}

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
};

function validator(color) {
  return (
    Object.entries(SUPPORTED_FORMATS)
      .map(([format, fn]) => [format, fn(color) && color])
      .find(([, color]) => color) || InvalidOrUnsupportedColorError()
  );
}

function InvalidOrUnsupportedColorError() {
  throw new QSCError({
    name: "Invalid or Unsupported Color",
    reason: `
The input matches none of Quarks System Core's supported color formats. It's
also possible you have a syntax error.
`,
    suggestion: `
Check your input color against these supported CSS color formats:

Named Colors
------------
coral
springgreen
dodgerblue
rebeccapurple

RGB Hex
-------
#f0f
#ca5e
#933cca
#99eefff7

Functional RGB
--------------
rgb(30, 110, 0)
rgb(19%, 38.9%, 70%)
rgba(255, 255, 255, 0.8)
rgb(129 22 108)
rgb(20% 2% 100% / 0.25)

Functional HSL
--------------
hsl(240, 39%, 81%)
hsla(120, 78%, 45%, 0.93)
hsl(2.5rad 29% 40%)
hsl(216.44grad 20% 90% / 0.75)

Device CMYK
-----------
device-cmyk(0 0.2 0.399 0)
device-cmyk(90% 0% 0% 37.5%)
device-cmyk(0% 39% 0% 0 / 0.88)

HWB
---
hwb(60 83% 0%)
hwb(90 0% 37%)
hwb(0.75turn 30% 25%)
hwb(300 29% 5% / 0.99)

CIELAB
------
lab(48% 101 -39)
lab(87% -33 0)
lab(59% -88 -2 / 0.5)

CIELCh(ab)
----------
lch(25% 49 180)
lch(75% 0 0)
lch(56.551 77.38 2rad / 0.6892)

Oklab (LCh)
-----------
NOTE: This format is non-standard. If you use it, be sure to
convert to a standard CSS format.

Example: color_to_hex("oklab(0% 0 0)")

oklab(59.4% 0.33 150)
oklab(33% 64% 0.2turn)
oklab(68.332% 0.16 1.778rad)
`,
  });
}

const NUMBER_TOKEN = /(?:-?(?!0\d)\d+(?:\.\d+)?)/;
const PERCENT_TOKEN = new RegExp(["(?:", NUMBER_TOKEN.source, "%)"].join(""));

const DELIMITER = /(?:[\s,]+)/;
const ALPHA_DELIMITER = new RegExp(DELIMITER.source.replace(",", ",/"));
const CSS4_DELIMITER = new RegExp(DELIMITER.source.replace(",", ""));
const CSS4_ALPHA_DELIMITER = new RegExp(
  ALPHA_DELIMITER.source.replace(",", ""),
);

const COMPONENT_TOKEN = new RegExp(
  ["(?:", PERCENT_TOKEN.source, "|", NUMBER_TOKEN.source, ")"].join(""),
);
const HUE_TOKEN = new RegExp(
  ["(?:", NUMBER_TOKEN.source, "(?:deg|g?rad|turn)?)"].join(""),
);

function namedValidator(color) {
  return !!NAMED_COLOR_KEYWORDS[color];
}

function hexValidator(color) {
  return /^#([\da-f]{3,4}){1,2}$/i.test(color);
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
    ...Array(2).fill(PERCENT_TOKEN),
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
    ...Array(2).fill(PERCENT_TOKEN),
  ]).test(color);
}

function cielabValidator(color) {
  return matchFunctionalFormat({ prefix: "lab", legacy: false }, [
    PERCENT_TOKEN,
    ...Array(2).fill(NUMBER_TOKEN),
  ]).test(color);
}

function cielchValidator(color) {
  return matchFunctionalFormat({ prefix: "lch", legacy: false }, [
    PERCENT_TOKEN,
    NUMBER_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}

function oklabValidator(color) {
  return matchFunctionalFormat({ prefix: "oklab", legacy: false }, [
    PERCENT_TOKEN,
    COMPONENT_TOKEN,
    HUE_TOKEN,
  ]).test(color);
}

function matchFunctionalFormat({ prefix, legacy = true }, tokens) {
  const VALUES = tokens.map((token) => token.source);

  const SEPARATOR = legacy ? DELIMITER.source : CSS4_DELIMITER.source;
  const ALPHA_SEPARATOR = legacy
    ? ALPHA_DELIMITER.source
    : CSS4_ALPHA_DELIMITER.source;

  return new RegExp(
    `(?:^${prefix}\\(`.concat(
      VALUES.join(SEPARATOR),
      `(?:${[ALPHA_SEPARATOR, COMPONENT_TOKEN.source].join("")})?\\))`,
    ),
  );
}

const extractor = compose(validator, ([format, color]) => [
  format,
  format === "hex" ? hexExtractor(color) : componentExtractor(color),
]);

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

const FORMAT_PARSERS = {
  hex: parseHex,
  rgb: parseRGB,
  hsl: parseHSL,
  cmyk: parseCMYK,
  hwb: parseHSL, // identical to HSL
  cielab: parseCielab,
  cielch: parseCielch,
  oklab: parseOklab,
};

const parser = compose(
  validator,
  ([format, color]) => FORMAT_PARSERS[format](color),
);

function parseHex(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "ff"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 3
          ? pipe(c, hexFragmentToRgb, numberFromRgb)
          : hexFragmentToRgb(c)
      ),
    ],
  );
}

function parseRGB(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        c.endsWith("%")
          ? parsePercent(c)
          : pos === 3
          ? parseNumber(c)
          : parseChannel(c)
      ),
    ],
  );
}

function parseHSL(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parseHue(c)
          : pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : parsePercent(c)
      ),
    ],
  );
}

function parseCMYK(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 5 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c) => c.endsWith("%") ? parsePercent(c) : parseNumber(c)),
    ],
  );
}

function parseCielab(color) {
  return parseCie((ab) => parseNumber(ab), color);
}

function parseCielch(color) {
  return parseCie(
    (c, pos) => (pos === 2 ? parseHue(c) : parseNumber(c)),
    color,
  );
}

function parseOklab(color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parsePercent(c)
          : pos === 1 || pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : parseHueAsRadians(c)
      ),
    ],
    ([format, [L, C, H, A]]) => [
      format,
      [L, C * Math.cos(H), C * Math.sin(H), A],
    ],
  );
}

function parseNumber(n) {
  return pipe(n, parseFloat, precision);
}

function parsePercent(percentage) {
  return pipe(percentage, parseFloat, numberFromPercent);
}

function parseChannel(channel) {
  return pipe(channel, parseFloat, numberFromRgb);
}

function parseHue(hue) {
  return hueCorrection(
    hue.endsWith("grad")
      ? gradToDegrees(parseFloat(hue))
      : hue.endsWith("rad")
      ? radToDegrees(parseFloat(hue))
      : hue.endsWith("turn")
      ? numberToDegrees(parseFloat(hue))
      : parseFloat(hue),
  );
}

function parseHueAsRadians(hue) {
  return hue.endsWith("rad") && !hue.endsWith("grad")
    ? parseNumber(hue)
    : pipe(hue, parseHue, radFromDegrees);
}

function parseCie(unique, color) {
  return pipe(
    extractor(color),
    ([format, components]) => [
      format,
      components.length === 4 ? components : [...components, "1"],
    ],
    ([format, components]) => [
      format,
      components.map((c, pos) =>
        pos === 0
          ? parseNumber(c)
          : pos === 3
          ? c.endsWith("%") ? parsePercent(c) : parseNumber(c)
          : unique(c, pos)
      ),
    ],
  );
}

function output(data) {
  return pipe(
    data,
    ([format, components]) => COLOR_ASSEMBLER(components)[format],
  );
}

function COLOR_ASSEMBLER(components) {
  return {
    hex: hexOutput(components),
    rgb: legacyOutput("rgb", components),
    hsl: legacyOutput("hsl", components),
    cmyk: modernOutput("device-cmyk", components),
    hwb: modernOutput("hwb", components),
    cielab: modernOutput("lab", components),
    cielch: modernOutput("lch", components),
    oklab: modernOutput("oklab", components),
  };
}

function hexOutput([R, G, B, A]) {
  return "#".concat(R, G, B, A === "ff" ? "" : A);
}

function legacyOutput(prefix, [C1, C2, C3, A]) {
  return `${A === 1 ? prefix : prefix.concat("a")}(`.concat(
    (A === 1 ? [C1, C2, C3] : [C1, C2, C3, precision(parseFloat(A))]).join(
      ", ",
    ),
    ")",
  );
}

function modernOutput(prefix, components) {
  return `${prefix}(`.concat(
    components.slice(0, components.length - 1).join(" "),
    components[components.length - 1] === 1
      ? ""
      : ` / ${precision(parseFloat(components.slice(-1)))}`,
    ")",
  );
}

class QSCError extends Error {
  constructor({
    name = "Unknown Error",
    reason = "here's why",
    suggestion = "try this",
  } = {}) {
    super();
    this.name = name;
    this.message = `
${reason}
${suggestion}
${"=".repeat(80)}
`;
  }
}
