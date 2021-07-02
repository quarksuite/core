// [[file:../Mod.org::*Error Handling][Error Handling:1]]
export class QSCError extends Error {
  constructor({
    name = "Unknown Error",
    reason = "here's why",
    suggestion = "try this",
  } = {}) {
    super();
    this.name = name;
    this.message = `
${reason}
${suggestion}
${"=".repeat(80)}
`;
  }
}
// Error Handling:1 ends here
