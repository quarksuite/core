// [[file:../../Mod.org::*Currying][Currying:1]]
export function curry(fn) {
  return (...initial) =>
    initial.length >= fn.length
      ? fn.apply(this, initial)
      : (...remaining) => fn.apply(this, initial.concat(remaining));
}
// Currying:1 ends here

// [[file:../../Mod.org::*Composition][Composition:1]]
export function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}
// Composition:1 ends here

// [[file:../../Mod.org::*Pipelining][Pipelining:1]]
export function pipe(x, ...fns) {
  return compose(...fns)(x);
}
// Pipelining:1 ends here
