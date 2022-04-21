// Last typedef is borrowed from: https://dev.to/badhusband/comment/1dk7c

/**
 * @template {any[]} T
 *
 * @typedef {T extends [...any[], infer R] ? R : never } Last - Selects the last item of a tuple
 */

/**
 * @template {readonly [(x: any) => any, ...Array<(x: any) => any>, (x: any) => any]>} EmitterSequence
 */

/**
 * A workflow helper that combines a sequence of `emitters` into a new emitter.
 *
 * @template {EmitterSequence} Sequence
 *
 * @param {Sequence} emitters - the sequence of emitters to combine
 * @returns {Last<Sequence>} The last emitter in the sequence
 *
 * @remarks
 * This workflow helper is excellent for combining simple emitters into complex
 * processes. The main use case is wrapping common data processing patterns into a
 * reusable interface.
 *
 * @example
 * Desaturate and lighten any valid CSS color before converting to hex
 *
 * ```js
 * const desat = preset(adjust, { chroma: -20 });
 * const lighten = preset(adjust, { lightness: 25 });
 * const hex = preset(convert, "hex");
 *
 * const base = process(desat, lighten, hex);
 *
 * base("dodgerblue");
 * ```
 *
 * @see {@link preset}
 */
export function process(...emitters) {
  return compose(...emitters);
}

/**
 * A workflow helper that converts an `action` into an emitter by presetting its
 * `y` modifier.
 *
 * @template X, Y, Result
 *
 * @param {(y: Y, x: X) => Result} action - the action to preset
 * @param {Y} y - the action modifier to preset
 * @returns {(x: X) => Result}
 *
 * @remarks
 * This workflow helper will be invaluable when you find yourself repeating actions
 * in multiple places on the same data. It's also what enables the powerful data
 * composition patterns provided by the other helpers.
 *
 * `preset` is the fulcrum of advanced QuarkSuite use.
 *
 * @example
 * Generate a rainbow hue from any valid CSS color
 *
 * ```js
 * const rainbow = preset(adjust, { hue: 360, steps: 8 });
 *
 * rainbow("chartreuse");
 * ```
 */
export function preset(action, y) {
  return (x) => action(y, x);
}

/**
 * A workflow helper that transforms data of type `x` (any valid data type)
 * through a sequence of `emitters`.
 *
 * @template X
 * @template {EmitterSequence} Sequence
 *
 * @param {X} x - the data to pass through the sequence
 * @param {Sequence} emitters - the sequence of emitters
 * @returns {ReturnType<Last<Sequence>>} the transformed data
 *
 * @remarks
 * This workflow helper is useful when you want immediate data processing.
 * Pipelines can use the output of other pipelines as input which makes chaining
 * operations painless.
 *
 * @example
 * A color to accented triadic scheme pipeline
 *
 * ```js
 * const intensify = preset(adjust, { chroma: 30 });
 * const withMagenta = preset(mix, { target: "magenta", strength: 42 });
 * const scheme = preset(harmony, { configuration: "triadic", accented: true });
 *
 * pipeline("crimson", intensify, withMagenta, scheme);
 * ```
 *
 * @see {@link preset}
 */
export function pipeline(x, ...emitters) {
  return compose(...emitters)(x);
}

/**
 * A workflow helper that maps the execution result of an `emitter` to a
 * collection of `xs`.
 *
 * @template X, R
 * @template {X[]} Collection
 *
 * @param {(x: X) => R} emitter - the emitter to execute on each value
 * @param {Collection} xs - the collection of values to map execution
 * @returns {R[]} the collection of results
 *
 * @remarks
 * This workflow helper comes in handy when you have a scale of values and you
 * want to perform an operation on *each* one. `xs` doesn't have to be a generated
 * scale. It can also be any grouping of values with the same type.
 *
 * @example
 * Propagating an analogous color harmony over an interpolated blend
 *
 * ```js
 * const xs = mix({
 *   target: "rebeccapurple",
 *   strength: 75,
 *   steps: 4
 * }, "dodgerblue");
 *
 * propagate(preset(harmony, { configuration: "analogous" }), xs);
 * ```
 *
 * @example
 * Grouping values for batch operation
 *
 * ```js
 * const red = adjust({ lightness: 25 }, "crimson");
 * const green = adjust({ lightness: -25 * 1.25 }, "chartreuse");
 * const blue = adjust({ lightness: -25 * 1.5 }, "dodgerblue");
 *
 * propagate(preset(mix, { target: "magenta" }), [red, green, blue]);
 * ```
 *
 * @see {@link preset}
 */
export function propagate(emitter, xs) {
  return xs.map((x) => emitter(x));
}

/**
 * A workflow helper that maps a collection of `xs` to a sequence of `emitters`.
 *
 * @template X
 * @template {X[]} Collection
 * @template {EmitterSequence} Sequence
 *
 * @param {Collection} xs - the collection to process
 * @param {Sequence} emitters - the sequence of emitters
 * @returns {{ [P in keyof Sequence]: ReturnType<Sequence[P]> }} the collection of results
 *
 * @remarks
 * This workflow helper will aid you in situations where you have a collection
 * of values that you want to *individually* process. If you don't want to alter
 * a value at a given index, set the emitter that matches it to `undefined`.
 *
 * The `emitters` sequence maps to the length of the collection, so if you pass
 * in two emitters only the first two items in the collection will be processed.
 *
 * Finally, you can target **specific values** in the collection by invoking your
 * emitters only at their corresponding positions.
 *
 * @example
 * Delegating color adjustments to a tetradic harmony
 *
 * ```js
 * const scheme = harmony({ configuration: "tetradic" }, "coral");
 *
 * const adjusted = delegate(
 *   scheme,
 *   undefined, // no need to alter the base color
 *   preset(adjust, { lightness: 10 }),
 *   preset(adjust, { lightness: 15 }),
 *   preset(adjust, { lightness: 20 })
 * );
 * ```
 *
 * @see {@link preset}
 */
export function delegate(xs, ...emitters) {
  return xs.map((x, pos) => (emitters[pos] ? emitters[pos](x) : x));
}

function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}
