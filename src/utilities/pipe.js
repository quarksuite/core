// [[file:~/Code/project/@quarksuite/core/README.org::*pipe (=src/utilities/pipe.js=)][pipe (=src/utilities/pipe.js=):1]]
import { compose } from "./compose.js";

/** A data transformation utility */
export function pipe(data, ...operators) {
  return compose(...operators)(data);
}
// pipe (=src/utilities/pipe.js=):1 ends here
