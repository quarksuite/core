// [[file:../README.org::*bind (=utilities/bind.js=)][bind (=utilities/bind.js=):1]]
/**
 * A higher order function that accepts a function and some of its arguments;
 * returning a function waiting for the rest of its arguments.
 *
 * @example Binding add to add8
 *
 * ```ts
 * const add = (y, x) => x + y;
 * const add8 = bind(add, 8);
 *
 * add8(2) // 10
 * ```
 *
 * @remarks
 * `bind` is essential for converting complex utilities into preset data
 * operators which can then be `compose`d and `pipe`d.
 *
 * Additionally, you can chain bind to approximate a full curry of a function:
 * `(z, y, x) => unknown` to `(z) => (y) => (x) => unknown`
 *
 * @param {(...args: unknown[]) => unknown} func - a variadic function to initialize
 * @param {unknown[]} initial - the arguments to apply
 * @returns {((...remaining: unknown) => unknown) | unknown} A function waiing for remaining arguments or the result of calling the function if `initial = total arguments`  */
export function bind(func, ...initial) {
  return func.length === initial.length
    ? func(...initial)
    : (...remaining) => func(...initial, ...remaining);
}
// bind (=utilities/bind.js=):1 ends here
