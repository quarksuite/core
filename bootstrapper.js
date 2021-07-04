// [[file:Mod.org::*Bootstrapper][Bootstrapper:1]]

// Bootstrapper:1 ends here

// [[file:Mod.org::*Quarks System Standard][Quarks System Standard:1]]
export function Quarks({
  color = "gainsboro",
  scale: { initial = 1, ratio = 1.5, limit = 6 } = {},
  tokens: {
    palette: { formula = Standard, modifiers = { tints: 4, shades: 4 } } = {},
    text: {
      body: {
        family: BODY_FAMILY = null,
        system: BODY_SYSTEM_STACK = "sans",
        weights: BODY_WEIGHTS = [400, 700]
      } = {},
      headings: {
        family: HEADING_FAMILY = null,
        system: HEADING_SYSTEM_STACK = "serif",
        weights: HEADING_WEIGHTS = [300, 700, 900]
      } = {},
      code: {
        family: CODE_FAMILY = null,
        system: CODE_SYSTEM_STACK = "monospace",
        weights: CODE_WEIGHTS = [400, 700]
      } = {},
      size: { values: TEXT_VALUES = limit } = {}
    } = {},
    content: {
      measure: { min = 45, max = 75, values: CPL_VALUES = limit } = {},
      whitespace: { values: SPACING_VALUES = limit } = {}
    } = {},
    layout: {
      grid: { columns: GRID_COLUMNS = limit, ratio: GRID_RATIO = ratio } = {}
    } = {},
    viewport: {
      threshold = 5,
      full = 100,
      context = ["w", "h"],
      values: VIEWPORT_VALUES = limit
    } = {}
  } = {}
} = {}) {
  const SCALE = ms({ ratio, values: limit }, initial);
  const [TEXT, MEASURE, WHITESPACE, FR, VP] = [
    TEXT_VALUES,
    CPL_VALUES,
    SPACING_VALUES,
    GRID_COLUMNS,
    VIEWPORT_VALUES
  ].map(values => ms({ ratio, values }, initial));

  const GRID_ROWS = Math.round(GRID_COLUMNS / GRID_RATIO);

  return {
    color: formula(modifiers, color),
    text: {
      body: {
        family: Stack(BODY_SYSTEM_STACK, BODY_FAMILY),
        style: Style(BODY_WEIGHTS)
      },
      headings: {
        family: Stack(HEADING_SYSTEM_STACK, HEADING_FAMILY),
        style: Style(HEADING_WEIGHTS)
      },
      code: {
        family: Stack(CODE_SYSTEM_STACK, CODE_FAMILY),
        style: Style(CODE_WEIGHTS)
      },
      size: Size(TEXT)
    },
    content: {
      measure: Measure({ min, max }, MEASURE),
      rhythm: Spacing(WHITESPACE)
    },
    layout: {
      grid: {
        columns: GRID_COLUMNS,
        rows: GRID_ROWS,
        gap: Spacing(WHITESPACE),
        fr: GridFractions(FR),
        ...GridDimensions(GRID_COLUMNS, GRID_ROWS)
      }
    },
    viewport: {
      ...Viewport(
        {
          threshold,
          full,
          context
        },
        VP
      )
    },
    calc: Calculations(SCALE)
  };
}
// Quarks System Standard:1 ends here
