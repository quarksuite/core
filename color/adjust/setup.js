// [[file:../../README.org::*Properties Adjustment (=color/adjust/index.js=)][Properties Adjustment (=color/adjust/index.js=):2]]
import * as format from "../../internals/color/format/index.js";
import * as revert from "../conversion/index.js";

// Secondary format validation
export const preserve = (target, color) =>
  Object.values({
    hex: format.hex.validate(color) && revert.hex(target),
    named: format.named.validate(color) && revert.hex(target),
    rgb: format.rgb.validate(color) && revert.rgb(target),
    hsl: format.hsl.validate(color) && revert.hsl(target),
    cmyk: format.cmyk.validate(color) && revert.cmyk(target),
    hwb: format.hwb.validate(color) && revert.hwb(target),
    lab: format.lab.validate(color) && revert.lab(target),
    lch: format.lch.validate(color) && revert.lch(target),
  })
    .filter((matched) => !!matched)
    .toString();
// Properties Adjustment (=color/adjust/index.js=):2 ends here
