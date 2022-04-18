// [[file:Notebook.org::*text Implementation][text Implementation:1]]
export function text(settings, font) {
  // Set defaults
  const { system = "sans", weights = ["regular", "bold"] } = settings;

  return textFamily({ system, weights }, font);
}
// text Implementation:1 ends here

// [[file:Notebook.org::*ms Implementation][ms Implementation:1]]
export function ms(settings, base) {
  // Set defaults
  const { ratio = 1.5, values = 6 } = settings;

  return create({ ratio, values }, base);
}
// ms Implementation:1 ends here

// [[file:Notebook.org::*modify Implementation][modify Implementation:1]]
export function modify(calc, ms) {
  return update(calc, ms);
}
// modify Implementation:1 ends here

// [[file:Notebook.org::*tokens (Content) Implementation][tokens (Content) Implementation:1]]
export function tokens(settings, ms) {
  // Set defaults
  const { type = "bidirectional", unit = undefined } = settings;

  return assemble({ ...settings, type, unit }, ms);
}
// tokens (Content) Implementation:1 ends here

// [[file:Notebook.org::*Creating a Raw Modular Scale][Creating a Raw Modular Scale:1]]
function create({ values = 6, ratio = 1.5 }, base) {
  if (Array.isArray(ratio)) {
    return [
      ...new Set(
        Array(values)
          .fill(base)
          .reduce(
            (acc, base, pos) => [...acc, ...ratio.map((r) => base * r ** pos)],
            []
          )
      ),
    ]
      .slice(0, values)
      .sort((a, b) => a - b);
  }

  return Array(values)
    .fill(base)
    .map((base, pos) => base * ratio ** pos);
}
// Creating a Raw Modular Scale:1 ends here

// [[file:Notebook.org::*Scale Modification][Scale Modification:1]]
function update(calc, ms) {
  return ms.map((n) => calc(n));
}
// Scale Modification:1 ends here

// [[file:Notebook.org::*Scale Configurations][Scale Configurations:1]]
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
    let value = min + (max - min) / n;
    return trunc ? Math.trunc(value) : value;
  }, x)
        .filter((n) => n > min && n < max)
        .sort((a, b) => a - b);

  return [min, range, max];
}
// Scale Configurations:1 ends here

// [[file:Notebook.org::*Scale Units][Scale Units:1]]
function output(unit, n) {
  return unit ? String(+n.toPrecision(5)).concat(unit) : +n.toPrecision(5);
}
// Scale Units:1 ends here

// [[file:Notebook.org::*Text Families][Text Families:1]]
const SYSTEM_FONT_STACKS = {
  sans: "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
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
// Text Families:1 ends here

// [[file:Notebook.org::*Token Assembly][Token Assembly:1]]
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
            {}
          ),
        min: output(unit, min),
      }
    : {
      base: output(unit, min),
      ...range
        .map((v) => output(unit, v))
        .reduce(
          (acc, v, pos) => ({ ...acc, ["i".concat(++pos + 1)]: v }),
          {}
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
// Token Assembly:1 ends here
