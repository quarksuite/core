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
export function text(settings, font) {
  // Set defaults
  const { system = "sans", weights = ["regular", "bold"] } = settings;

  return textFamily({ system, weights }, font);
}

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
export function ms(settings, base) {
  // Set defaults
  const { ratio = 1.5, values = 6 } = settings;

  return create({ ratio, values }, base);
}

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
export function modify(calc, ms) {
  return update(calc, ms);
}

/** @typedef {`${"bi" | "uni"}directional` | "ranged" | "grid"} OutputType */

/**
 * @typedef {string | number} ContentValue
 * @typedef {{base: ContentValue; [scale: string]: ContentValue}} DirectionalTokens
 * @typedef {{base: ContentValue [scale: string]: ContentValue; max: ContentValue}} MinimumRangedContext
 * @typedef {{base: ContentValue [scale: string]: ContentValue; min: ContentValue}} MaximumRangedContext
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
export function tokens(settings, ms) {
  // Set defaults
  const { type = "bidirectional", unit = undefined } = settings;

  return assemble({ ...settings, type, unit }, ms);
}

function create({ values = 6, ratio = 1.5 }, base) {
  if (Array.isArray(ratio)) {
    return [
      ...new Set(
        Array(values)
          .fill(base)
          .reduce(
            (acc, base, pos) => [...acc, ...ratio.map((r) => base * r ** pos)],
            [],
          ),
      ),
    ]
      .slice(0, values)
      .sort((a, b) => a - b);
  }

  return Array(values)
    .fill(base)
    .map((base, pos) => base * ratio ** pos);
}

function update(calc, ms) {
  return ms.map((n) => calc(n));
}

function unidirectional(ms) {
  const [base, ...x] = ms;

  return [base, x];
}

function bidirectional(ms) {
  const [base, ...x] = ms;
  const d = update((n) => base ** 2 / n, x);

  return [base, x, d];
}

function ranged({ min = 1, max = 10, trunc = false }, ms) {
  const [, ...x] = ms;

  const range = update((n) => {
    const value = min + (max - min) / n;
    return trunc ? Math.trunc(value) : value;
  }, x)
    .filter((n) => n > min && n < max)
    .sort((a, b) => a - b);

  return [min, range, max];
}

function output(unit, n) {
  return unit ? String(+n.toPrecision(5)).concat(unit) : +n.toPrecision(5);
}

const SYSTEM_FONT_STACKS = {
  sans:
    "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
  serif:
    "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  monospace:
    "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
};

function generateStack(fallback, font) {
  if (font === null || font === "") return SYSTEM_FONT_STACKS[fallback];
  return [font, SYSTEM_FONT_STACKS[fallback]].join(", ");
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

function generateWeights(weights) {
  return weights.reduce((acc, key) => {
    const value = fontWeights(key);

    return { ...acc, [key]: value };
  }, {});
}

function textFamily({ system = "sans", weights = ["regular", "bold"] }, font) {
  return {
    family: generateStack(system, font),
    ...generateWeights(weights),
  };
}

function assemble(settings, ms) {
  const {
    type = "bidirectional",
    unit = undefined,
    inversion = unit,
  } = settings;

  if (type === "unidirectional") {
    const [base, x] = unidirectional(ms);

    return {
      base: output(unit, base),
      ...x
        .map((v) => output(unit, v))
        .reduce((acc, v, pos) => ({ ...acc, ["x".concat(++pos + 1)]: v }), {}),
    };
  }

  if (type === "ranged") {
    const { min = 1, max = 10, trunc = false, context = "min" } = settings;
    const [, range] = ranged({ min, max, trunc }, ms);

    return context === "max"
      ? {
        base: output(unit, max),
        ...range
          .map((v) => output(unit, v))
          .reverse()
          .reduce(
            (acc, v, pos) => ({ ...acc, ["i".concat(++pos + 1)]: v }),
            {},
          ),
        min: output(unit, min),
      }
      : {
        base: output(unit, min),
        ...range
          .map((v) => output(unit, v))
          .reduce(
            (acc, v, pos) => ({ ...acc, ["i".concat(++pos + 1)]: v }),
            {},
          ),
        max: output(unit, max),
      };
  }

  if (type === "grid") {
    const columns = ms.length;
    const [, ratio] = ms;
    const rows = Math.round(columns / ratio);
    const cells = (dim) =>
      Array(dim)
        .fill(0)
        .map((x, pos) => ++x + pos)
        .reduce((acc, v) => ({ ...acc, [-v]: -v, [v]: v }), {});

    return {
      columns,
      rows,
      col: cells(columns),
      row: cells(rows),
    };
  }

  const [base, x, d] = bidirectional(ms);

  return {
    base: output(unit, base),
    ...x
      .map((v) => output(unit, v))
      .reduce((acc, v, pos) => ({ ...acc, ["x".concat(++pos + 1)]: v }), {}),
    ...d
      .map((v) => output(inversion, v))
      .reduce((acc, v, pos) => ({ ...acc, ["d".concat(++pos + 1)]: v }), {}),
  };
}
