// [[file:~/Code/project/@quarksuite/core/README.org::*compose (=src/utilities/compose.js=)][compose (=src/utilities/compose.js=):1]]
import { ErrorTemplate } from "../internals/error.js";

// Error handling
const isFunction = (x) => typeof x === "function";
const hasArity1 = (x) => x.length === 1;

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

/** A predicate for stating that x has a single argument. */
const ArityError = (output) =>
  ErrorTemplate({
    message: "not a data operator",
    reason: `
This error indicates that one or more of the functions is
not a data operator. That is, not a single argument function.
`,
    suggestion: `
Check that every function in your composition chain has an arity of 1.
Ex: (data: any) => any
`,
    output,
  });

/** A variadic functional composition */
export function compose(...operators) {
  return (data) =>
    operators.reduce((value, func) => {
      if (!isFunction(func)) return FuncError(func);
      if (!hasArity1(func)) return ArityError(func);
      return func(value);
    }, data);
}
// compose (=src/utilities/compose.js=):1 ends here
