// [[file:../../../Notebook.org::*harmony Tests][harmony Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { harmony } from "../../color.js";

describe("harmony(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => harmony({}, "invalid")).toThrow();
  });

  const harmonies = {
    dyadic: [
      ["red", ["#ff0000", "#ef4600"]],
      ["orange", ["#ffa500", "#d4bd00"]],
      ["yellow", ["#ffff00", "#a2ff86"]],
      ["lime", ["#00ff00", "#00ffbe"]],
      ["cyan", ["#00ffff", "#48f5ff"]],
      ["blue", ["#0000ff", "#6e00ec"]],
      ["purple", ["#800080", "#95004c"]],
      ["magenta", ["#ff00ff", "#ff009d"]],
    ],
    complementary: [
      ["red", ["#ff0000", "#00a9db"]],
      ["orange", ["#ffa500", "#5bc0ff"]],
      ["yellow", ["#ffff00", "#f4d8ff"]],
      ["lime", ["#00ff00", "#ff7dff"]],
      ["cyan", ["#00ffff", "#ffb3bf"]],
      ["blue", ["#0000ff", "#a02000"]],
      ["purple", ["#800080", "#006600"]],
      ["magenta", ["#ff00ff", "#00cd00"]],
    ],
    analogous: [
      ["red", ["#ff0000", "#ef4600", "#c57500"]],
      ["orange", ["#ffa500", "#d4bd00", "#95d150"]],
      ["yellow", ["#ffff00", "#a2ff86", "#00ffde"]],
      ["lime", ["#00ff00", "#00ffbe", "#00ffff"]],
      ["cyan", ["#00ffff", "#48f5ff", "#96e3ff"]],
      ["blue", ["#0000ff", "#6e00ec", "#9e00b2"]],
      ["purple", ["#800080", "#95004c", "#9c0000"]],
      ["magenta", ["#ff00ff", "#ff009d", "#ff0000"]],
    ],
    split: [
      ["red", ["#ff0000", "#00b48c", "#0090ff"]],
      ["orange", ["#ffa500", "#00d2ff", "#a9acff"]],
      ["yellow", ["#ffff00", "#9cf3ff", "#ffc2ff"]],
      ["lime", ["#00ff00", "#df9eff", "#ff62e5"]],
      ["cyan", ["#00ffff", "#ffb4f8", "#ffbd87"]],
      ["blue", ["#0000ff", "#c50000", "#5d5c00"]],
      ["purple", ["#800080", "#475700", "#006a4e"]],
      ["magenta", ["#ff00ff", "#92b100", "#00d5a0"]],
    ],
    triadic: [
      ["red", ["#ff0000", "#00ae00", "#4f6fff"]],
      ["orange", ["#ffa500", "#00dcd5", "#de99ff"]],
      ["yellow", ["#ffff00", "#00ffff", "#ffb3ff"]],
      ["lime", ["#00ff00", "#61c4ff", "#ff6072"]],
      ["cyan", ["#00ffff", "#ffbfff", "#ffd05c"]],
      ["blue", ["#0000ff", "#ce0000", "#007700"]],
      ["purple", ["#800080", "#773e00", "#006384"]],
      ["magenta", ["#ff00ff", "#ef8200", "#00c8ff"]],
    ],
    clash: [
      ["red", ["#ff0000", "#7b9900", "#a34fff"]],
      ["orange", ["#ffa500", "#23dc96", "#ff8cdc"]],
      ["yellow", ["#ffff00", "#00ffff", "#ffb3b9"]],
      ["lime", ["#00ff00", "#00e9ff", "#ff8300"]],
      ["cyan", ["#00ffff", "#d5d0ff", "#f0e55d"]],
      ["blue", ["#0000ff", "#c00061", "#008048"]],
      ["purple", ["#800080", "#931700", "#0051a8"]],
      ["magenta", ["#ff00ff", "#ff3800", "#00a6ff"]],
    ],
    double: [
      ["red", ["#ff0000", "#ef4600", "#00a9db", "#0090ff"]],
      ["orange", ["#ffa500", "#d4bd00", "#5bc0ff", "#a9acff"]],
      ["yellow", ["#ffff00", "#a2ff86", "#f4d8ff", "#ffc2ff"]],
      ["lime", ["#00ff00", "#00ffbe", "#ff7dff", "#ff62e5"]],
      ["cyan", ["#00ffff", "#48f5ff", "#ffb3bf", "#ffbd87"]],
      ["blue", ["#0000ff", "#6e00ec", "#a02000", "#5d5c00"]],
      ["purple", ["#800080", "#95004c", "#006600", "#006a4e"]],
      ["magenta", ["#ff00ff", "#ff009d", "#00cd00", "#00d5a0"]],
    ],
    tetradic: [
      ["red", ["#ff0000", "#de5f00", "#00a9db", "#0080ff"]],
      ["orange", ["#ffa500", "#b7c826", "#5bc0ff", "#c5a2ff"]],
      ["yellow", ["#ffff00", "#5bffb3", "#f4d8ff", "#ffb9ff"]],
      ["lime", ["#00ff00", "#00fff5", "#ff7dff", "#ff5cb0"]],
      ["cyan", ["#00ffff", "#72edff", "#ffb3bf", "#ffc56e"]],
      ["blue", ["#0000ff", "#8800d3", "#a02000", "#016c00"]],
      ["purple", ["#800080", "#9b002d", "#006600", "#00686b"]],
      ["magenta", ["#ff00ff", "#ff0061", "#00cd00", "#00d1d7"]],
    ],
    square: [
      ["red", ["#ff0000", "#7b9900", "#00a9db", "#a34fff"]],
      ["orange", ["#ffa500", "#23dc96", "#5bc0ff", "#ff8cdc"]],
      ["yellow", ["#ffff00", "#00ffff", "#f4d8ff", "#ffb3b9"]],
      ["lime", ["#00ff00", "#00e9ff", "#ff7dff", "#ff8300"]],
      ["cyan", ["#00ffff", "#d5d0ff", "#ffb3bf", "#f0e55d"]],
      ["blue", ["#0000ff", "#c00061", "#a02000", "#008048"]],
      ["purple", ["#800080", "#931700", "#006600", "#0051a8"]],
      ["magenta", ["#ff00ff", "#ff3800", "#00cd00", "#00a6ff"]],
    ],
  };

  Object.entries(harmonies).forEach(([configuration, samples]) => {
    describe(`settings.configuration = '${configuration}'`, () => {
      it(`should correctly generate a ${configuration} color harmony from samples`, () => {
        samples.forEach(([input, output]) => {
          expect(harmony({ configuration }, input)).toEqual(output);
        });
      });
    });
  });

  const harmoniesAccented = {
    dyadic: [
      ["red", ["#ff0000", "#ef4600", "#00a9db"]],
      ["orange", ["#ffa500", "#d4bd00", "#5bc0ff"]],
      ["yellow", ["#ffff00", "#a2ff86", "#f4d8ff"]],
      ["lime", ["#00ff00", "#00ffbe", "#ff7dff"]],
      ["cyan", ["#00ffff", "#48f5ff", "#ffb3bf"]],
      ["blue", ["#0000ff", "#6e00ec", "#a02000"]],
      ["purple", ["#800080", "#95004c", "#006600"]],
      ["magenta", ["#ff00ff", "#ff009d", "#00cd00"]],
    ],
    analogous: [
      ["red", ["#ff0000", "#ef4600", "#c57500", "#00a9db"]],
      ["orange", ["#ffa500", "#d4bd00", "#95d150", "#5bc0ff"]],
      ["yellow", ["#ffff00", "#a2ff86", "#00ffde", "#f4d8ff"]],
      ["lime", ["#00ff00", "#00ffbe", "#00ffff", "#ff7dff"]],
      ["cyan", ["#00ffff", "#48f5ff", "#96e3ff", "#ffb3bf"]],
      ["blue", ["#0000ff", "#6e00ec", "#9e00b2", "#a02000"]],
      ["purple", ["#800080", "#95004c", "#9c0000", "#006600"]],
      ["magenta", ["#ff00ff", "#ff009d", "#ff0000", "#00cd00"]],
    ],
    split: [
      ["red", ["#ff0000", "#00b48c", "#00a9db", "#0090ff"]],
      ["orange", ["#ffa500", "#00d2ff", "#5bc0ff", "#a9acff"]],
      ["yellow", ["#ffff00", "#9cf3ff", "#f4d8ff", "#ffc2ff"]],
      ["lime", ["#00ff00", "#df9eff", "#ff7dff", "#ff62e5"]],
      ["cyan", ["#00ffff", "#ffb4f8", "#ffb3bf", "#ffbd87"]],
      ["blue", ["#0000ff", "#c50000", "#a02000", "#5d5c00"]],
      ["purple", ["#800080", "#475700", "#006600", "#006a4e"]],
      ["magenta", ["#ff00ff", "#92b100", "#00cd00", "#00d5a0"]],
    ],
    triadic: [
      ["red", ["#ff0000", "#00ae00", "#00a9db", "#4f6fff"]],
      ["orange", ["#ffa500", "#00dcd5", "#5bc0ff", "#de99ff"]],
      ["yellow", ["#ffff00", "#00ffff", "#f4d8ff", "#ffb3ff"]],
      ["lime", ["#00ff00", "#61c4ff", "#ff7dff", "#ff6072"]],
      ["cyan", ["#00ffff", "#ffbfff", "#ffb3bf", "#ffd05c"]],
      ["blue", ["#0000ff", "#ce0000", "#a02000", "#007700"]],
      ["purple", ["#800080", "#773e00", "#006600", "#006384"]],
      ["magenta", ["#ff00ff", "#ef8200", "#00cd00", "#00c8ff"]],
    ],
  };

  Object.entries(harmoniesAccented).forEach(([configuration, samples]) => {
    describe(`settings.configuration = '${configuration}'`, () => {
      it(`should correctly generate an accented ${configuration} color harmony from samples`, () => {
        samples.forEach(([input, output]) => {
          expect(harmony({ configuration, accented: true }, input)).toEqual(output);
        });
      });
    });
  });
});

run();
// harmony Tests:1 ends here
