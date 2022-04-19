export function process(...emitters) {
  return compose(...emitters);
}

export function preset(action, y) {
  return (x) => action(y, x);
}

export function pipeline(x, ...processes) {
  return compose(...processes)(x);
}

export function propagate(emitter, xs) {
  return xs.map((x) => emitter(x));
}

export function delegate(emitters, xs) {
  return emitters
    .map((f, pos) => (xs[pos] ? f(xs[pos]) : undefined))
    .filter((result) => result !== undefined);
}

function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}
