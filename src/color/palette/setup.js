// [[file:../../../README.org::*Color Palette (=src/color/palette/index.js=)][Color Palette (=src/color/palette/index.js=):2]]
import { mix } from "../mix/index.js";

export const generate = (color, target, contrast, count) =>
  Array.from(Array(count).fill(color)).map((base, index) =>
    mix(contrast - (contrast / count) * index, target, base)
  );
// Color Palette (=src/color/palette/index.js=):2 ends here
