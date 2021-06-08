// [[file:../README.org::*Error Handling (=internals/error.js=)][Error Handling (=internals/error.js=):1]]
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
// Error Handling (=internals/error.js=):1 ends here
