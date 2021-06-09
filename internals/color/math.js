// [[file:../../README.org::*Math (=internals/color/math.js=)][Math (=internals/color/math.js=):1]]
/** Helper for converting hex->int */
export const hexFragmentToChannel = (fragment) => parseInt(fragment, 16);

/** Helper for converting int->hex */
export const channelToHexFragment = (channel) =>
  channel.toString(16).padStart(2, "0");
// Math (=internals/color/math.js=):1 ends here

// [[file:../../README.org::*Math (=internals/color/math.js=)][Math (=internals/color/math.js=):2]]
const significant = (digits, value) => +value.toPrecision(digits);
/** Helper to limit precision */
export const enforcePrecision = significant.bind(null, 5);

/** x + y */
const sum = (y, x) => enforcePrecision(x + y);

/** x ✕ y */
const product = (y, x) => enforcePrecision(x * y);

/** x ÷ y */
const quotient = (y, x) => enforcePrecision(x / y);

/** x % y */
const remainder = (y, x) => enforcePrecision(x % y);

// Hrad, Hgrad, Hturn -> hue

/** Formula: n° = n㎭ ✕ 180∕π */
export const calcHueFromRad = (radians) =>
  product(quotient(Math.PI, 180), radians);

/** Formula: n° = nᵍ✕ 180∕200 */
export const calcHueFromGrad = (gradians) =>
  product(quotient(200, 180), gradians);

/** Formula: n° = n% ✕ 360 */
export const calcHueFromTurn = (turn) => product(360, turn);

// Hue correction

/** Formula: n° = -n + 360 */
export const correctHueCounterClockwise = (hue) => sum(360, hue);

/** Formula: n° = n % 360 */
export const correctHueClockwise = (hue) => remainder(360, hue);

// Saturation, lightness

/** Formula: n = n%∕100 */
export const calcFractionFromPercent = (percentage) =>
  quotient(100, percentage);

/** Formula: n = n ✕ 100 */
export const calcPercentFromFraction = (fraction) => product(100, fraction);

// RGB calculations

/** Formula: n = n ✕ 255 */
export const calcChannelFromFraction = (fraction) => product(255, fraction);

/** Formula: n = n∕255 */
export const calcFractionFromChannel = (channel) => quotient(255, channel);

/** Formula: n = n%∕100 ✕ 255 */
export const calcChannelFromPercent = (percentage) =>
  calcChannelFromFraction(calcFractionFromPercent(percentage));

/** Normalization to define boundaries */
export const normalize = (a, x, b) => Math.min(Math.max(x, a), b);

// Alpha

/** Helper to convert alpha value to hex fragment */
export const calcHexFragmentFromAlpha = (alpha) =>
  channelToHexFragment(calcChannelFromFraction(alpha));
// Math (=internals/color/math.js=):2 ends here
