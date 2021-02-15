// [[file:../../README.org::*error (=src/internals/error.js=)][error (=src/internals/error.js=):1]]
/** Error message template */
export function ErrorTemplate(
  { message, reason, suggestion, output } = {
    message: "something went wrong",
    reason: "here's why",
    suggestion: "try this",
    output: undefined,
  },
) {
  throw new Error(`
ERROR: ${message.trimEnd()}
${"=".repeat(60)}
REASON: ${reason.trimEnd()}
TRY: ${suggestion.trimEnd()}
${"-".repeat(60)}
OUTPUT: ${output};
`);
}
// error (=src/internals/error.js=):1 ends here
