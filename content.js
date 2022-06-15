/// <reference types="./types/content.d.ts" />

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

/**
 * @typedef {{ [fraction: string]: string; }} GridFr - grid fractionals (derived from ratio)
 * @typedef {{
 *   columns: number;
 *   rows: number;
 *   col: {
 *     [tracks: string]: string | number | GridFr;
 *     fr: GridFr;
 *   },
 *   row: {
 *     [tracks: string]: string | number | GridFr;
 *     fr: GridFr;
 *   }
 * }} GridTokens - generated grid token structure
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
export function grid(settings, columns) {
  const { rows = columns, ratio = 1.5 } = settings;

  return generateGrid({ rows, ratio }, columns);
}

function generateGrid({ rows, ratio = 1.5 }, columns) {
  return {
    columns,
    rows,
    ...[columns, rows].reduce((acc, values, i) => {
      const axes = ["col", "row"];
      const tracks = (dim) =>
        Array(dim)
          .fill(0)
          .map((x, pos) => ++x + pos)
          .reduce((acc, v) => ({ ...acc, [-v]: -v, [v]: v }), {});

      return {
        ...acc,
        [axes[i]]: {
          ...tracks(values),
          fr: assemble({ type: "bidirectional", ratio, values }, "1fr"),
        },
      };
    }, {}),
  };
}

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
 * @param {number} [settings.ratio] - the scale ratio
 * @param {number} [settings.values] - the number of scale values to generate
 *
 * @param {string} [settings.inversion] - set the output units for the inverse (bidirectional)
 *
 * @param {ScaleValue} [settings.floor] - set the range floor (ranged)
 * @param {boolean} [settings.trunc] - truncate the values? (ranged)
 * @param {boolean} [settings.reverse] - reverse the context (ranged)
 *
 * @param {RootValue} root - the root value to generate from
 * @returns {ScaleTokens} the generated scale tokens
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
export function scale(settings, root) {
  const {
    configuration = "bidirectional",
    inversion,
    ratio = 1.5,
    values = 6,
  } = settings;

  if (configuration === "ranged") {
    const { floor = 1, trunc = false, reverse = false } = settings;
    return assemble(
      { configuration, floor, trunc, reverse, ratio, values },
      root,
    );
  }

  return assemble({ configuration, inversion, ratio, values }, root);
}

function create({ ratio = 1.5, values = 6 }, root) {
  const [value, unit] = parse(root);

  if (Array.isArray(ratio)) {
    return [
      ...new Set(
        Array(values)
          .fill(value)
          .reduce(
            (acc, base, pos) => [
              ...acc,
              ...ratio.map((r) => serialize([base * r ** pos, unit])),
            ],
            [],
          ),
      ),
    ]
      .slice(0, values)
      .sort((a, b) => a - b);
  }

  return Array(values)
    .fill(value)
    .map((base, pos) => serialize([base * ratio ** pos, unit]));
}

function parse(root) {
  const [value, unit] = typeof root === "string"
    ? root.split(/(\d+(?:\.\d+){0,})/g).slice(1)
    : [root, ""];
  return [Number(value), unit.startsWith(".") ? unit.slice(1) : unit];
}

function serialize([n, unit]) {
  if (unit) {
    return String(+n.toPrecision(5)).concat(unit);
  }

  return +n.toPrecision(5);
}

function assemble(settings, root) {
  const [, unit] = parse(root);

  const {
    configuration = "bidirectional",
    inversion = unit,
    ratio = 1.5,
    values = 6,
  } = settings;
  const [initial, ...x] = create({ ratio, values }, root);

  if (configuration === "unidirectional") {
    return {
      base: initial,
      ...x.reduce((acc, value, pos) => {
        return { ...acc, ["x".concat(String(++pos + 1))]: value };
      }, {}),
    };
  }

  if (configuration === "ranged") {
    const { floor: min = 1, trunc = false, reverse = false } = settings;

    const [, ...x] = create({ ratio, values }, 1);

    const [floor] = parse(min);
    const [ceiling] = parse(initial);

    const range = x
      .map((value) => {
        const [n] = parse(value);
        // @ts-ignore: parse() always returns a number or NaN
        const calculated = floor + (ceiling - floor) / n;

        return trunc ? Math.trunc(calculated) : calculated;
      })
      .filter((n) => n > floor && n < ceiling)
      .sort((a, b) => a - b)
      .map((n) => serialize([n, unit]));

    return reverse
      ? {
        base: serialize([floor, unit]),
        ...range.reduce(
          (acc, value, pos) => ({
            ...acc,
            ["i".concat(String(++pos + 1))]: value,
          }),
          {},
        ),
        max: serialize([ceiling, unit]),
      }
      : {
        base: serialize([ceiling, unit]),
        ...range.reverse().reduce(
          (acc, value, pos) => ({
            ...acc,
            ["i".concat(String(++pos + 1))]: value,
          }),
          {},
        ),
        min: serialize([floor, unit]),
      };
  }

  const d = x.map((value) => {
    const [base] = parse(initial);
    const [n] = parse(value);

    // @ts-ignore: parse() always returns a number or NaN
    return serialize([base ** 2 / n, inversion]);
  });

  return {
    base: initial,
    ...x.reduce((acc, value, pos) => {
      return { ...acc, ["x".concat(String(++pos + 1))]: value };
    }, {}),
    ...d.reduce((acc, value, pos) => {
      return { ...acc, ["d".concat(String(++pos + 1))]: value };
    }, {}),
  };
}
