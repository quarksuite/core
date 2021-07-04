// [[file:Mod.org::*Formulas][Formulas:1]]

// Formulas:1 ends here

// [[file:Mod.org::*Palette Formulas][Palette Formulas:1]]
export function MaterialPalette(
  { light = 95, dark = 70, scheme = undefined, format = undefined },
  color
) {
  return pipe(
    color,
    curry(paletteSettings)({ format, scheme }),
    curry(generateMaterialPalette)({ light, dark })
  );
}

function paletteSettings({ scheme, format }, color) {
  return pipe(
    color,
    color => (format ? format(color) : hex(color)),
    color => (scheme ? scheme(color) : [color])
  );
}

function generateMaterialPalette({ light, dark }, palette) {
  return pipe(
    palette,
    palette => palette.map(color => material({ light, dark }, color)),
    palette =>
      palette.reduce((acc, value, index) => {
        return {
          ...acc,
          [paletteCategories(index)]: {
            ...value.reduce(
              (a, v, i) => ({
                ...a,
                ...(i === 0 ? { 50: v } : { [`${i}`.padEnd(3, "0")]: v })
              }),
              {}
            )
          }
        };
      }, {})
  );
}

export function StandardPalette(
  {
    format = undefined,
    scheme = undefined,
    contrast = 95,
    tints = 3,
    shades = 2
  },
  color
) {
  return pipe(
    color,
    curry(paletteSettings)({ format, scheme }),
    curry(generateStandardPalette)({ contrast, values: { tints, shades } })
  );
}

export function InterpolatedPalette(
  {
    lightness = 0,
    chroma = 0,
    hue = 0,
    values = 3,
    contrast = 95,
    tints = 2,
    shades = 2,
    format = undefined
  },
  color
) {
  return pipe(
    interpolate(
      { lightness, chroma, hue, values },
      format ? format(color) : hex(color)
    ),
    curry(generateStandardPalette)({ contrast, values: { tints, shades } })
  );
}

export function BlendedPalette(
  {
    values = 3,
    amount = 100,
    target = "black",
    contrast = 95,
    tints = 2,
    shades = 2,
    format = undefined
  },
  color
) {
  return pipe(
    blend({ values, amount, target }, format ? format(color) : hex(color)),
    curry(generateStandardPalette)({
      contrast,
      values: { tints, shades }
    })
  );
}


function generateStandardPalette({ contrast, values }, palette) {
  return pipe(
    palette,
    palette =>
      palette.map((color, index) => {
        const category = paletteCategories(index);
        const light = tints({ values: values.tints, amount: contrast }, color);
        const dark = shades(
          { values: values.shades, amount: contrast / 1.25 },
          color
        );
        const fillDark = shades(
          { values: values.tints + values.shades, amount: contrast / 1.25 },
          color
        );

        return [
          category,
          category === "main" ? [color, light, dark] : [color, fillDark]
        ];
      }),
    palette =>
      palette.reduce((acc, [key, data], index) => {
        const [base, ...variants] = data;
        const [a, b] = variants;

        return {
          ...acc,
          [key]: {
            base,
            ...(variants.length === 2
              ? {
                  light: NumericScale(a),
                  dark: NumericScale(b)
                }
              : { dark: NumericScale(a) })
          }
        };
      }, {})
  );
}

function paletteCategories(index) {
  return new Map([
    [0, "main"],
    [1, "accent"],
    [2, "highlight"],
    [3, "link"],
    [4, "spot"],
    [5, "splash"]
  ]).get(index);
}
// Palette Formulas:1 ends here

// [[file:Mod.org::*Typography Formulas][Typography Formulas:1]]
export function TextStack(fallback, font = null) {
  return font === null
    ? "".concat(systemfonts([fallback]))
    : [font, ...systemfonts([fallback])].join(", ");
}

export function TextStyle(weights) {
  return weights.reduce((acc, weight) => {
    const key = fontWeights(weight);

    return { ...acc, [key]: weight };
  }, {});
}

function fontWeights(weight) {
  return new Map([
    [100, "thin"],
    [200, "extralight"],
    [300, "light"],
    [400, "regular"],
    [500, "medium"],
    [600, "semibold"],
    [700, "bold"],
    [800, "extrabold"],
    [900, "black"]
  ]).get(weight)
}

export const TextSize = curry(Content)(["rem", "em"])

function Content([unit, inversionUnit], scale) {
  const [base] = Array.from(scale);
  const values = Array.from(scale);

  return {
    base: pipe(
      [base],
      curry(units)(unit)
    ).toString(),
    ...BidirectionalScale(
      ["x", "d"],
      [
        units(unit, values),
        pipe(
          values,
          curry(update)(n => base / n),
          curry(units)(inversionUnit ? inversionUnit : unit)
        )
      ]
    )
  };
}

export function TextLeading({ normal = 1.5, tight = 1.125 }, scale) {
  const [base, ratio] = Array.from(scale);

  return Object.entries(
    ContentRange(
      {
        min: tight,
        max: normal,
        unit: "",
        keys: ["narrow", "tight"],
        calc: n => tight + (normal - tight) / (base * ratio ** n)
      },
      scale
    )
  ).reduce((acc, [key, value]) => {
    if (Array.isArray(value))
      return { ...acc, [key]: value.map(n => parseFloat(n)) };
    return { ...acc, [key]: parseFloat(value) };
  }, {});
}

export function ContentMeasure({ min = 45, max = 75 }, scale) {
  const [base, ratio] = Array.from(scale);
  return ContentRange(
    {
      min,
      max,
      unit: "ch",
      keys: ["segment", "minimum"],
      calc: n => Math.trunc(min + (max - min) / (base * ratio ** n))
    },
    scale
  );
}

function ContentRange({ min, max, unit, keys, calc }, scale) {
  const SCALE = Array.from(update(calc, scale));
  const output = curry(units)(unit);

  return RangedScale(keys, [
    output([max]).toString(),
    pipe(
      SCALE,
      scale => Array.from(new Set(SCALE)),
      scale => scale.filter(n => n > min && n < max),
      output
    ),
    output([min]).toString()
  ]);
}
// Typography Formulas:1 ends here

// [[file:Mod.org::*Layout Formulas][Layout Formulas:1]]
export const LayoutSpacing = curry(Content)(["ex"]);
export const GridFractions = curry(ContentUnidirectional)({ key: "x", unit: "fr" })

export function GridDimensions(columns, rows) {
  return {
    x: assembleSpan(columns),
    y: assembleSpan(rows)
  };
}

function assembleSpan(dimension) {
  const SCALE = spanCalculation(dimension);
  const [base] = SCALE;
  return {
    base,
    ...UnidirectionalScale("", SCALE)
  };
}

function spanCalculation(xs) {
  return Array(xs)
    .fill(1)
    .map((x, pos) => x + pos);
}

function ContentUnidirectional({ key, unit }, scale) {
  const [base] = Array.from(scale);
  const values = Array.from(scale);
  const output = curry(units)(unit);

  return {
    base: pipe(
      [base],
      output
    ).toString(),
    ...UnidirectionalScale(
      key,
      pipe(
        values,
        output
      )
    )
  };
}

export function FigureCalculations(scale) {
  const [base] = Array.from(scale);
  const values = Array.from(scale);

  return {
    base,
    ...UnidirectionalScale("x", values.map(n => precision(n)))
  };
}
// Layout Formulas:1 ends here

// [[file:Mod.org::*Viewport Formulas][Viewport Formulas:1]]
export function Viewport(
  { threshold = 5, full = 100, context = ["w", "h", "min", "max"] },
  scale
) {
  const [base, ratio] = Array.from(scale);

  return context.reduce((acc, target) => {
    const [key, unit] = viewportTargets(target);

    return {
      ...acc,
      [key]: ContentRange(
        {
          min: threshold,
          max: full,
          keys: ["segment", "threshold"],
          unit,
          calc: n =>
            Math.trunc(threshold + (full - threshold) / (base * ratio ** n))
        },
        scale
      )
    };
  }, {});
}

function viewportTargets(target) {
  return new Map([
    ["width", ["width", "vw"]],
    ["w", ["width", "vw"]],
    ["height", ["height", "vh"]],
    ["h", ["height", "vh"]],
    ["minimum", ["min", "vmin"]],
    ["min", ["min", "vmin"]],
    ["maximum", ["max", "vmax"]],
    ["max", ["max", "vmax"]]
  ]).get(target);
}
// Viewport Formulas:1 ends here

// [[file:Mod.org::*Numeric Color Scale][Numeric Color Scale:1]]
export function NumericColorScale(data) {
  return data.reduce(
    (acc, value, index) => ({ ...acc, [`${++index}`.padEnd(3, "0")]: value }),
    {}
  );
}
// Numeric Color Scale:1 ends here

// [[file:Mod.org::*Modular Scale Types][Modular Scale Types:1]]
export function BidirectionalScale(keys, data) {
  const [x, d] = keys;
  const [multiply, divide] = Array.from(data);
  return {
    ...VariantScale(x, multiply),
    ...VariantScale(d, divide)
  };
}

export function UnidirectionalScale(key, data) {
  return VariantScale(key, data);
}

export function RangedScale(
  [rangeKey, floorKey] = ["fragment", "min"],
  [base, range, min]
) {
  return {
    base,
    [rangeKey]: range,
    [floorKey]: min
  };
}

function VariantScale(key, [, ...values]) {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [[key, index + 2].join("")]: value
    }),
    {}
  );
}
// Modular Scale Types:1 ends here
