// [[file:../../README.org::*compose (=src/utilities/compose.js=)][compose (=src/utilities/compose.js=):1]]
import { ErrorTemplate } from "../internals/error.js";

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
 * @param {((data: unknown) => unknown)[]} operators - a sequence of functions to combine
 * @returns {(data: unknown) => unknown} the composed function waiting for data  */
export function compose(...operators) {
  return (data) =>
    operators.reduce((value, func) => {
      if (!isFunction(func)) return FuncError(func);
      return func(value);
    }, data);
}
// compose (=src/utilities/compose.js=):1 ends here
