// [[file:README.org::*compose][compose:1]]
import { ErrorTemplate } from "./internals/error.js";

// Error handling
const isFunction = (x) => typeof x === "function";

/** Error thrown when value is not a function. */
const FuncError = (output) =>
  ErrorTemplate({
    message: "not a function",
    reason: `
This error indicates that one or more of the values is not a
function, so it can't be composed.
`,
    suggestion: `
Check that every value in your composition chain is a function.
`,
    output,
  });

/**
 * A higher order function that accepts a sequence of data operators and combines them
 * into a new function waiting for data.
 *
 * @example Splitting a string after upcasing it.
 *
 * ```ts
 *  const upper = (data) => data.toUpperCase();
 *  const split = (data) => data.split("");
 *
 *  const splitCapitalLetters = compose(upper, split);
 *
 *  splitCapitalLetters("hello"); // ["H", "E", "L", "L", "O"]
 * ```
 *
 * @remark
 * A data operator is also called a unary function. These are both ways of saying a function
 * takes a single argument.
 *
 * @param {((data: any) => any)[]} operators - a sequence of functions to combine
 * @returns {(data: any) => any} the composed function waiting for data  */
export function compose(...operators) {
  return (data) =>
    operators.reduce((value, func) => {
      if (!isFunction(func)) return FuncError(func);
      return func(value);
    }, data);
}
// compose:1 ends here

// [[file:README.org::*pipe][pipe:1]]
/**
 * A higher order function that pipes data through a sequence of functions and
 * outputs the result.
 *
 * @example Transforming a string into an upcased array.

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
 * @param {any} data - the data to pass through the pipeline
 * @param {((data: any) => any)[]} operators - the sequence of functions to transform data
 * @returns {any} The transformed data
 */
export function pipe(data, ...operators) {
  return compose(...operators)(data);
}
// pipe:1 ends here
