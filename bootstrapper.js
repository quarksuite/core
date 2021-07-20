// [[file:Mod.org::*Bootstrapper][Bootstrapper:1]]
import {
  FigureCalculations,
  GridDimensions,
  GridFractions,
  MaterialPalette,
  Spacing,
  TextLeading,
  TextMeasure,
  TextSize,
  TextStack,
  TextStyle,
  Viewport,
} from "./formulas.js";
import { ms_create } from "./utilities.js";
// Bootstrapper:1 ends here

// [[file:Mod.org::*Quarks System Standard][Quarks System Standard:1]]
export function Quarks({
  color = "gray",
  scale: { initial = 1, ratio = 1.5, limit = 6 } = {},
  tokens: {
    palette: { formula = MaterialPalette, modifiers = {} } = {},
    text: {
      body: {
        family: BODY_FAMILY = null,
        system: BODY_SYSTEM_STACK = "sans",
        weights: BODY_WEIGHTS = [400, 700],
      } = {},
      headings: {
        family: HEADING_FAMILY = null,
        system: HEADING_SYSTEM_STACK = "serif",
        weights: HEADING_WEIGHTS = [700],
      } = {},
      code: {
        family: CODE_FAMILY = null,
        system: CODE_SYSTEM_STACK = "monospace",
        weights: CODE_WEIGHTS = BODY_WEIGHTS,
      } = {},
      leading: { normal = 1.5, tight = 1.125 } = {},
      values: TEXT_VALUES = limit,
    } = {},
    content: {
      measure: { min = 45, max = 75, values: CPL_VALUES = limit } = {},
      whitespace: { values: SPACING_VALUES = limit } = {},
    } = {},
    layout: {
      grid: { columns: GRID_COLUMNS = limit, ratio: GRID_RATIO = ratio } = {},
    } = {},
    viewport: {
      threshold = 5,
      full = 100,
      context = ["w", "h"],
      values: VIEWPORT_VALUES = limit,
    } = {},
  } = {},
} = {}) {
  const SCALE = ms_create({ ratio, values: limit }, initial);
  const [TEXT, MEASURE, WHITESPACE, FR, VP] = [
    TEXT_VALUES,
    CPL_VALUES,
    SPACING_VALUES,
    GRID_COLUMNS,
    VIEWPORT_VALUES,
  ].map((values) => ms_create({ ratio, values }, initial));

  const GRID_ROWS = Math.round(GRID_COLUMNS / GRID_RATIO);

  return {
    color: formula(modifiers, color),
    text: {
      body: {
        family: TextStack(BODY_SYSTEM_STACK, BODY_FAMILY),
        style: TextStyle(BODY_WEIGHTS),
      },
      headings: {
        family: TextStack(HEADING_SYSTEM_STACK, HEADING_FAMILY),
        style: TextStyle(HEADING_WEIGHTS),
      },
      code: {
        family: TextStack(CODE_SYSTEM_STACK, CODE_FAMILY),
        style: TextStyle(CODE_WEIGHTS),
      },
      size: TextSize(TEXT),
      leading: TextLeading({ normal, tight }, TEXT),
    },
    content: {
      measure: TextMeasure({ min, max }, MEASURE),
      whitespace: Spacing(WHITESPACE),
    },
    layout: {
      grid: {
        columns: GRID_COLUMNS,
        rows: GRID_ROWS,
        fr: GridFractions(FR),
        ...GridDimensions(GRID_COLUMNS, GRID_ROWS),
      },
    },
    viewport: Viewport(
      {
        threshold,
        full,
        context,
      },
      VP,
    ),
    calc: FigureCalculations(SCALE),
  };
}
// Quarks System Standard:1 ends here
