// [[file:../Notebook.org::*process Implementation][process Implementation:1]]
export function process(...emitters) {
  return compose(...emitters);
}
// process Implementation:1 ends here

// [[file:../Notebook.org::*preset Implementation][preset Implementation:1]]
export function preset(action, y) {
  return (x) => action(y, x);
}
// preset Implementation:1 ends here

// [[file:../Notebook.org::*pipeline Implementation][pipeline Implementation:1]]
export function pipeline(x, ...processes) {
  return compose(...processes)(x);
}
// pipeline Implementation:1 ends here

// [[file:../Notebook.org::*propagate Implementation][propagate Implementation:1]]
export function propagate(emitter, xs) {
  return xs.map((x) => emitter(x));
}
// propagate Implementation:1 ends here

// [[file:../Notebook.org::*delegate Implementation][delegate Implementation:1]]
export function delegate(emitters, xs) {
  return emitters
    .map((f, pos) => (xs[pos] ? f(xs[pos]) : undefined))
    .filter((result) => result !== undefined);
}
// delegate Implementation:1 ends here

// [[file:../Notebook.org::*Composition Internals][Composition Internals:1]]
function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}
// Composition Internals:1 ends here
