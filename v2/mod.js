// Spec

// The library begins with an entry point =mod.js= that aggregates all the functionality to make it easier to experiment
// during development before you've settled on what you need. QuarkSuite v2 separates all functionality by its input type.


// [[file:../Notebook.org::*Spec][Spec:1]]
// Package all utility types

export * as fn from "./fn.js";
export * as color from "./color.js";
export * as ms from "./ms.js";
export * as tokens from "./tokens.js";
// Spec:1 ends here