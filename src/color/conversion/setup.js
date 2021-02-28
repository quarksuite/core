// [[file:../../../README.org::*Color Format Conversion (=src/color/conversion/index.js=)][Color Format Conversion (=src/color/conversion/index.js=):2]]
import * as format from "../../internals/color/format/index.js";
import * as convert from "../../internals/color/convert/index.js";
import { ErrorTemplate } from "../../internals/error.js";
import { pipe } from "../../utilities/pipe.js";

const ColorError = (output) =>
  ErrorTemplate({
    message: "not a valid CSS color format",
    reason: `
This error indicates that the input for conversion is not actually a color.
`,
    suggestion: `
Ensure that the input is a valid CSS color.

Examples:

#deaded
#bea
#face
#abcdef68

aliceblue
rebeccapurple

rgb(110, 33, 229)
rgba(139, 110, 19, 0.5)

hsl(300, 89%, 38%)
hsla(3.4rad, 100%, 25%, 0.99)

device-cmyk(0 1 1 0)
device-cmyk(78% 39% 0 0)

hwb(190 39% 3%)

lab(64% 19 -47)

lch(38% 78 147)
`,
    output,
  });

const parseColor = (color, input, ...conversionChain) =>
  input.validate(color) && pipe(color, input.extract, ...conversionChain);

const parseNamedColor = (color, chain = false, ...conversionChain) =>
  format.named.validate(color) && chain
    ? pipe(color, convert.named.hex, format.hex.extract, ...conversionChain)
    : pipe(color, convert.named.hex);

const parseSelf = (color, input) => input.validate(color) && color;

// Possible RGB hex conversion chains
export const hex = (color) =>
  Object.values({
    hex: parseSelf(color, format.hex),
    named: parseNamedColor(color),
    rgb: parseColor(color, format.rgb, convert.rgb.hex),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hex,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible RGB conversion chains
export const rgb = (color) =>
  Object.values({
    hex: parseColor(color, format.hex, convert.hex.rgb),
    named: parseNamedColor(color, true, convert.hex.rgb),
    rgb: parseSelf(color, format.rgb),
    hsl: parseColor(color, format.hsl, convert.hsl.rgb),
    cmyk: parseColor(color, format.cmyk, convert.cmyk.rgb),
    hwb: parseColor(color, format.hwb, convert.hwb.rgb),
    lab: parseColor(color, format.lab, convert.lab.rgb),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible HSL conversion chains
export const hsl = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.hsl),
    hsl: parseSelf(color, format.hsl),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hsl,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CMYK conversion chains
export const cmyk = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.cmyk),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    cmyk: parseSelf(color, format.cmyk),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.cmyk,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible HWB conversion chains
export const hwb = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),

    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    hwb: parseSelf(color, format.hwb),
    lab: parseColor(
      color,
      format.lab,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
    lch: parseColor(
      color,
      format.lch,
      convert.lch.lab,
      format.lab.extract,
      convert.lab.rgb,
      format.rgb.extract,
      convert.rgb.hwb,
    ),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CIE Lab conversion chains
export const lab = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    rgb: parseColor(color, format.rgb, convert.rgb.lab),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.lab,
    ),
    lab: parseSelf(color, format.lab),
    lch: parseColor(color, format.lch, convert.lch.lab),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);

// Possible CIE LCH conversion chains
export const lch = (color) =>
  Object.values({
    hex: parseColor(
      color,
      format.hex,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    named: parseNamedColor(
      color,
      true,
      convert.hex.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    rgb: parseColor(
      color,
      format.rgb,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    hsl: parseColor(
      color,
      format.hsl,
      convert.hsl.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    cmyk: parseColor(
      color,
      format.cmyk,
      convert.cmyk.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    hwb: parseColor(
      color,
      format.hwb,
      convert.hwb.rgb,
      format.rgb.extract,
      convert.rgb.lab,
      format.lab.extract,
      convert.lab.lch,
    ),
    lab: parseColor(color, format.lab, convert.lab.lch),
    lch: parseSelf(color, format.lch),
  })
    .filter((found) => !!found)
    .toString() || ColorError(color);
// Color Format Conversion (=src/color/conversion/index.js=):2 ends here
