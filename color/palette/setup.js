// [[file:../../README.org::*Palette Creation (=color/palette/index.js=)][Palette Creation (=color/palette/index.js=):2]]
import { mix } from "../mix/index.js";

export const generate = (color, target, contrast, count) =>
  Array.from(Array(count).fill(color)).map((base, index) =>
    mix(contrast - (contrast / count) * index, target, base)
  );
// Palette Creation (=color/palette/index.js=):2 ends here
