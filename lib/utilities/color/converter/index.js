// [[file:../../../../Mod.org::*Converter][Converter:1]]
import { compose, pipe } from "../../fp.js";
import { validator } from "../validator/index.js";
import {
  cielabToRgb,
  cmykToRgb,
  hexToRgb,
  hslToRgb,
  hwbToRgb,
  oklabToRgb,
} from "./color_to_rgb.js";
import {
  cielabFromRgb,
  cmykFromRgb,
  hexFromRgb,
  hslFromRgb,
  hwbFromRgb,
  oklabFromRgb,
} from "./color_from_rgb.js";
import {
  cielabFromCielch,
  cielabToCielch,
  hexFromNamedColor,
} from "./linkers.js";
// Converter:1 ends here

// [[file:../../../../Mod.org::*Converter][Converter:2]]
const INPUT_TO_RGB = {
  named: compose(hexFromNamedColor, passthrough, hexToRgb),
  hex: hexToRgb,
  rgb: compose(hexFromRgb, passthrough, hexToRgb), // identity
  hsl: hslToRgb,
  cmyk: cmykToRgb,
  hwb: hwbToRgb,
  cielab: cielabToRgb,
  cielch: compose(cielabFromCielch, passthrough, cielabToRgb),
  oklab: oklabToRgb,
};

const OUTPUT_FROM_RGB = {
  hex: hexFromRgb,
  rgb: compose(hexFromRgb, passthrough, hexToRgb),
  hsl: hslFromRgb,
  cmyk: cmykFromRgb,
  hwb: hwbFromRgb,
  cielab: cielabFromRgb,
  cielch: compose(cielabFromRgb, passthrough, cielabToCielch),
  oklab: oklabFromRgb,
};

export function passthrough([, color]) {
  return color;
}

export function convert(output, color) {
  const [input, value] = validator(color);
  return pipe(
    validator(color),
    ([input, color]) => INPUT_TO_RGB[input](color),
    ([, color]) => OUTPUT_FROM_RGB[output](color),
  );
}
// Converter:2 ends here
