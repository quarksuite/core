// [[file:Mod.org::*Importing the Bootstrapper Helpers][Importing the Bootstrapper Helpers:1]]
import {
  AnimationCubicBezier,
  AnimationDuration,
  BlendedPalette,
  FigureCalculations,
  GridDimensions,
  GridFractions,
  InterpolatedPalette,
  MaterialPalette,
  StandardPalette,
  TextLeading,
  TextMeasure,
  TextSize,
  TextStack,
  TextStyle,
  TextUnits,
  Viewport,
} from "./formulas.js";
import { ms_create } from "./utilities.js";
// Importing the Bootstrapper Helpers:1 ends here

// [[file:Mod.org::*Quarks System Standard][Quarks System Standard:1]]
export function Quarks({
  color: { base = "gray", type = MaterialPalette, ...modifiers } = {},
  scale: { initial = 1, ratio = 1.5, limit = 6 } = {},
  text: {
    body: { family: BODY = null, weights: BODY_WEIGHTS = [400, 700] } = {},
    headings: {
      family: HEADING = BODY,
      weights: HEADING_WEIGHTS = BODY_WEIGHTS,
    } = {},
    code: { family: CODE = null, weights: CODE_WEIGHTS = BODY_WEIGHTS } = {},
    measure: { min = 45, max = 75 } = {},
    leading: { normal = 1.5, tight = 1.125 } = {},
    values: TEXT_VALUES = limit,
  } = {},
  grid: { columns: COLUMNS = limit, ratio: GRID_RATIO = ratio } = {},
  viewport: {
    threshold = 10,
    full = 100,
    context = ["width", "height"],
    values: VP_VALUES = limit,
  } = {},
  animation: {
    duration: { fastest = 250, slowest = 1000 } = {},
    easing: { floor = 0, ceiling = 1 } = {},
    values: ANIMATION_VALUES = limit,
  } = {},
} = {}) {
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
    color: type({ ...modifiers }, base),
    text: {
      body: {
        family: TextStack("sans", BODY),
        weight: TextStyle(BODY_WEIGHTS),
      },
      headings: {
        family: TextStack("serif", HEADING),
        weight: TextStyle(HEADING_WEIGHTS),
      },
      code: {
        family: TextStack("monospace", CODE),
        weight: TextStyle(CODE_WEIGHTS),
      },
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
// Quarks System Standard:1 ends here
