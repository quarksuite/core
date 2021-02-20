// [[file:../../../../README.org::*Hex RGB Fragments][Hex RGB Fragments:1]]
/** Helper for converting hex->int */
export const hexFragmentToChannel = (fragment) => parseInt(fragment, 16);

/** Helper for converting int->hex */
export const channelToHexFragment = (channel) =>
channel.toString(16).padStart(2, "0");
// Hex RGB Fragments:1 ends here

// [[file:../../../../README.org::*Math][Math:1]]
/** Helper to set significant digits */
const significant = (digits, value) => +value.toPrecision(digits);

/** x + y */
const sum = (y, x) => significant(6, x + y);

/** x ✕ y */
const product = (y, x) => significant(6, x * y);

/** x ÷ y */
const quotient = (y, x) => significant(6, x / y);

/** x % y */
const remainder = (y, x) => significant(6, x % y);

// Hrad, Hgrad, Hturn -> hue

/** Formula: n° = n㎭ ✕ 180∕π */
export const calcHueFromRad = (radians) =>
Math.round(product(quotient(Math.PI, 180), radians));

/** Formula: n° = nᵍ✕ 180∕200 */
export const calcHueFromGrad = (gradians) =>
Math.round(product(quotient(200, 180), gradians));

/** Formula: n° = n% ✕ 360 */
export const calcHueFromTurn = (turn) => Math.round(product(360, turn));

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
Math.round(calcChannelFromFraction(calcFractionFromPercent(percentage)));

/** Normalization to define boundaries */
export const normalize = (a, x, b) => Math.round(Math.min(Math.max(x, a), b));

// Alpha

/** Helper to convert alpha value to hex fragment */
export const calcHexFragmentFromAlpha = (alpha) =>
channelToHexFragment(Math.round(calcChannelFromFraction(alpha)));

// Differential helper for color mixing

/** Calculate the differential between original and offset */
export const calcDifferential = (original, target, p) =>
significant(6, ((1 - p) * original ** 2 + p * target ** 2) ** 0.5);
// Math:1 ends here
