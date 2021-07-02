// [[file:../../../../Mod.org::*Math][Math:1]]
import { compose } from "../../fp.js";
// Math:1 ends here

// [[file:../../../../Mod.org::*Arithmetic][Arithmetic:1]]
const add = (y, x) => x + y;
const multiply = (y, x) => x * y;
const divide = (y, x) => x / y;
const remainder = (y, x) => x % y;
// Arithmetic:1 ends here

// [[file:../../../../Mod.org::*Limiters][Limiters:1]]
export const precision = (value) => +value.toPrecision(5);
export const normalize = (b, a, x) => (x < a ? a : x > b ? b : precision(x));
// Limiters:1 ends here

// [[file:../../../../Mod.org::*Hexadecimal][Hexadecimal:1]]
export const hexFragmentToRgb = (fragment) => parseInt(fragment, 16);
export const hexFragmentFromRgb = (channel) =>
  channel.toString(16).padStart(2, "0");
// Hexadecimal:1 ends here

// [[file:../../../../Mod.org::*Percent Calculations][Percent Calculations:1]]
export const numberToPercent = (n) => multiply(100, n);
export const numberFromPercent = (percentage) => divide(100, percentage);
// Percent Calculations:1 ends here

// [[file:../../../../Mod.org::*RGB Component Calculations][RGB Component Calculations:1]]
export const numberToRgb = (n) => multiply(255, n);
export const numberFromRgb = (channel) => divide(255, channel);
export const rgbFromPercent = compose(
  numberFromPercent,
  numberToRgb,
  Math.round,
);
export const hexFragmentFromNumber = compose(
  numberToRgb,
  Math.round,
  hexFragmentFromRgb,
);
// RGB Component Calculations:1 ends here

// [[file:../../../../Mod.org::*Hue Calculations][Hue Calculations:1]]
export const radToDegrees = (radians) =>
  compose(
    () => divide(Math.PI, 180),
    (result) => multiply(result, radians),
    (degrees) => precision(degrees),
  )();
export const radFromDegrees = (degrees) =>
  compose(
    () => divide(180, Math.PI),
    (result) => multiply(result, degrees),
    (radians) => precision(radians),
  )();
export const gradToDegrees = (gradians) =>
  compose(
    () => divide(200, 180),
    (result) => multiply(result, gradians),
    (degrees) => precision(degrees),
  )();
export const numberToDegrees = (n) => multiply(360, n);
export const hueCorrection = (hue) =>
  normalize(
    360,
    -360,
    Math.sign(hue) === -1 ? Math.abs(add(360, hue)) : hue > 360
      ? remainder(360, hue)
      : hue,
  );
// Hue Calculations:1 ends here
