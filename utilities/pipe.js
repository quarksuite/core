// [[file:../README.org::*pipe (=utilities/pipe.js=)][pipe (=utilities/pipe.js=):1]]
import { compose } from "./compose.js";

/**
 * A higher order function that pipes data through a sequence of functions and
 * outputs the result.
 *
 * ```ts
 * const upper = (data) => data.toUpperCase();
 * const split = (data) => data.split("");
 *
 * pipe("hello", upper, split); // ["H", "E", "L", "L", "O"]
 * ```
 *
 * @remarks
 * This function simply inverts `compose` so that the data is immediately transformed
 * instead of combining the functions.
 *
 * @param {unknown} data - the data to pass through the pipeline
 * @param {((data: unknown) => unknown)[]} operators - the sequence of functions to transform data
 * @returns {unknown} The transformed data
 */
export function pipe(data, ...operators) {
  return compose(...operators)(data);
}
// pipe (=utilities/pipe.js=):1 ends here
