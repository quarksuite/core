// [[file:~/Code/project/@quarksuite/core/README.org::*bind (=src/utilities/bind.js=)][bind (=src/utilities/bind.js=):1]]
/** A function decomposition utility */
export function bind(func, ...initial) {
  return (func.length === initial.length)
    ? func(...initial)
    : ((...remaining) => func(...initial, ...remaining));
}
// bind (=src/utilities/bind.js=):1 ends here
