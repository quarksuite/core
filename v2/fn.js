// fn_process Implementation

// [[file:../Notebook.org::*fn_process Implementation][fn_process Implementation:1]]
export function fn_process(...emitters) {
  return compose(...emitters);
}
// fn_process Implementation:1 ends here

// fn_preset Implementation

// [[file:../Notebook.org::*fn_preset Implementation][fn_preset Implementation:1]]
export function fn_preset(action, y) {
  return (x) => action(y, x);
}
// fn_preset Implementation:1 ends here

// fn_pipeline Implementation

// [[file:../Notebook.org::*fn_pipeline Implementation][fn_pipeline Implementation:1]]
export function fn_pipeline(x, ...processes) {
  return compose(...processes)(x);
}
// fn_pipeline Implementation:1 ends here

// fn_propagate Implementation

// [[file:../Notebook.org::*fn_propagate Implementation][fn_propagate Implementation:1]]
export function fn_propagate(emitter, xs) {
  return xs.map((x) => emitter(x));
}
// fn_propagate Implementation:1 ends here

// Composition Internals

// [[file:../Notebook.org::*Composition Internals][Composition Internals:1]]
function compose(...fns) {
  return (x) => fns.reduce((g, f) => f(g), x);
}
// Composition Internals:1 ends here
