// [[file:Mod.org::*Bootstrapper][Bootstrapper:1]]
import {
  AnimationCubicBezier,
  AnimationDuration,
  FigureCalculations,
  GridDimensions,
  GridFractions,
  MaterialPalette,
  TextLeading,
  TextMeasure,
  TextSize,
  TextStack,
  TextStyle,
  TextUnits,
  Viewport,
} from "./formulas.js";
import { ms_create } from "./utilities.js";
// Bootstrapper:1 ends here

// [[file:Mod.org::*Quarks System Standard][Quarks System Standard:1]]
export function Quarks({
  color = "gray",
  scale: { initial = 1, ratio = 1.5, limit = 6 } = {},
  tokens: {
    color: { formula = MaterialPalette, modifiers = {} } = {},
    text: {
      family: {
        body: BODY_FAMILY = null,
        headings: HEADING_FAMILY = null,
        code: CODE_FAMILY = null,
      } = {},
      fallback: {
        body: BODY_FALLBACK = "sans",
        headings: HEADING_FALLBACK = "serif",
        code: CODE_FALLBACK = "monospace",
      } = {},
      weights: {
        body: BODY_WEIGHTS = [400, 700],
        headings: HEADING_WEIGHTS = [700],
        code: CODE_WEIGHTS = BODY_WEIGHTS,
      } = {},
      measure: { min = 45, max = 75 } = {},
      leading: { normal = 1.5, tight = 1.125 } = {},
      values: TEXT_VALUES = limit,
    } = {},
    grid: { columns: GRID_COLUMNS = limit, ratio: GRID_RATIO = ratio } = {},
    viewport: {
      threshold = 5,
      full = 100,
      context = ["w", "h"],
      values: VIEWPORT_VALUES = limit,
    } = {},
    animation: {
      duration: { fastest = 250, slowest = 1000 } = {},
      easing: { floor = 0, ceiling = 1 } = {},
      values: ANIMATION_VALUES = limit,
    } = {},
  } = {},
} = {}) {
  const SCALE = ms_create({ ratio, values: limit }, initial);
  const [TEXT, GRID, VIEWPORT, ANIMATION] = [
    TEXT_VALUES,
    GRID_COLUMNS,
    VIEWPORT_VALUES,
    ANIMATION_VALUES,
  ].map((values) => ms_create({ ratio, values }, initial));

  const GRID_ROWS = Math.round(GRID_COLUMNS / GRID_RATIO);

  return {
    color: formula(modifiers, color),
    text: {
      family: {
        body: TextStack(BODY_FALLBACK, BODY_FAMILY),
        headings: TextStack(HEADING_FALLBACK, HEADING_FAMILY),
        code: TextStack(CODE_FALLBACK, CODE_FAMILY),
      },
      weight: {
        body: TextStyle(BODY_WEIGHTS),
        headings: TextStyle(HEADING_WEIGHTS),
        code: TextStyle(CODE_WEIGHTS),
      },
      size: TextSize(TEXT),
      measure: TextMeasure({ min, max }, TEXT),
      leading: TextLeading({ normal, tight }, TEXT),
      unit: TextUnits(TEXT),
    },
    grid: {
      columns: GRID_COLUMNS,
      rows: GRID_ROWS,
      fr: GridFractions(GRID),
      ...GridDimensions(GRID_COLUMNS, GRID_ROWS),
    },
    viewport: Viewport({ threshold, full, context }, VIEWPORT),
    animation: {
      duration: AnimationDuration({ fastest, slowest }, ANIMATION),
      easing: AnimationCubicBezier({ floor, ceiling }, ANIMATION),
    },
    ms: FigureCalculations(SCALE),
  };
}
// Quarks System Standard:1 ends here
