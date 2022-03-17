// color_simulate Tests

// [[file:../../Notebook.org::*color_simulate Tests][color_simulate Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_simulate } from "../color.js";

describe("color_simulate(settings, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => color_simulate({}, "invalid")).toThrow();
  });

  const [red, green, blue, purple] = [
    "crimson",
    "chartreuse",
    "dodgerblue",
    "rebeccapurple",
  ];

  const colorblindness = {
    achromatopsia: {
      red: [red, "#787878"],
      green: [green, "#d6ddd4"],
      blue: [blue, "#909090"],
      purple: [purple, "#525252"],
    },
    protanomaly: {
      brettel: {
        red: [red, ["#dc143c", "#c62d3c", "#ab3d3d", "#8a483d"]],
        green: [green, ["#7fff00", "#b6fb00", "#ddf800", "#fcf400"]],
        blue: [blue, ["#1e90ff", "#2090ff", "#2290ff", "#2390ff"]],
        purple: [purple, ["#663399", "#543799", "#3d3b99", "#0a3f99"]],
      },
      vienot: {
        red: [red, ["#dc143c", "#c52e3c", "#aa3d3d", "#87493d"]],
        green: [green, ["#7fff00", "#a7fd00", "#c6fa00", "#dff700"]],
        blue: [blue, ["#1e90ff", "#4c8eff", "#658cff", "#798bff"]],
        purple: [purple, ["#663399", "#5e3599", "#543799", "#493999"]],
      },
    },
    protanopia: {
      brettel: {
        red: [red, ["#59523e"]],
        green: [green, ["#fff000"]],
        blue: [blue, ["#2590ff"]],
        purple: [purple, ["#004299"]],
      },
      vienot: {
        red: [red, ["#53533e"]],
        green: [green, ["#f5f500"]],
        blue: [blue, ["#8989ff"]],
        purple: [purple, ["#3b3b99"]],
      },
    },
    deuteranomaly: {
      brettel: {
        red: [red, ["#dc143c", "#cc4239", "#ba5937", "#a56b34"]],
        green: [green, ["#7fff00", "#aaf612", "#c9ed1c", "#e4e324"]],
        blue: [blue, ["#1e90ff", "#1f90ff", "#2190ff", "#2290ff"]],
        purple: [purple, ["#663399", "#593d99", "#4a4599", "#364c98"]],
      },
      vienot: {
        red: [red, ["#dc143c", "#ca4539", "#b65e36", "#9e7033"]],
        green: [green, ["#7fff00", "#a0f80e", "#baf217", "#d0eb1e"]],
        blue: [blue, ["#1e90ff", "#458bff", "#5c86ff", "#6d81ff"]],
        purple: [purple, ["#663399", "#5f3999", "#583e99", "#504299"]],
      },
    },
    deuteranopia: {
      brettel: {
        red: [red, ["#8c7a31"]],
        green: [green, ["#fbd82a"]],
        blue: [blue, ["#2390ff"]],
        purple: [purple, ["#0e5398"]],
      },
      vienot: {
        red: [red, ["#808030"]],
        green: [green, ["#e3e324"]],
        blue: [blue, ["#7c7cff"]],
        purple: [purple, ["#474799"]],
      },
    },
    // Brettel 1997 is the only known accurate tritanope simulating algorithm, so both
    // methods use it by default.
    tritanomaly: {
      brettel: {
        red: [red, ["#dc143c", "#dc123f", "#dc1042", "#dc0e45"]],
        green: [green, ["#7fff00", "#8bfa8c", "#95f5bf", "#9ff0e5"]],
        blue: [blue, ["#1e90ff", "#0094f2", "#0098e4", "#009cd5"]],
        purple: [purple, ["#663399", "#623b8b", "#5e417b", "#5a4767"]],
      },
      vienot: {
        red: [red, ["#dc143c", "#dc123f", "#dc1042", "#dc0e45"]],
        green: [green, ["#7fff00", "#8bfa8c", "#95f5bf", "#9ff0e5"]],
        blue: [blue, ["#1e90ff", "#0094f2", "#0098e4", "#009cd5"]],
        purple: [purple, ["#663399", "#623b8b", "#5e417b", "#5a4767"]],
      },
    },
    tritanopia: {
      brettel: {
        red: [red, ["#dc0c48"]],
        green: [green, ["#a7ebff"]],
        blue: [blue, ["#00a0c5"]],
        purple: [purple, ["#554c4d"]],
      },
      vienot: {
        red: [red, ["#dc0c48"]],
        green: [green, ["#a7ebff"]],
        blue: [blue, ["#00a0c5"]],
        purple: [purple, ["#554c4d"]],
      },
    },
  };

  describe("settings.condition = 'colorblindness'", () => {
    describe("settings.type = 'achromatopsia'", () => {
      it("should correctly simulate achromatopsia", () => {
        Object.values(colorblindness.achromatopsia).forEach(
          ([input, output]) => {
            expect(
              color_simulate(
                {
                  condition: "colorblindness",
                  type: "achromatopsia",
                },
                input,
              ),
            ).toBe(output);
          },
        );
      });
    });
    Object.entries(colorblindness)
      .filter(([category]) => category !== "achromatopsia")
      .forEach(([type, data]) => {
        describe(`settings.type = '${type}'`, () => {
          Object.entries(data).forEach(([method, $data]) => {
            it(`should correctly simulate ${type} with ${method} method from samples`, () => {
              Object.values($data).forEach(([input, results]) => {
                results.forEach((output, pos) => {
                  expect(
                    color_simulate(
                      {
                        condition: "colorblindness",
                        method,
                        type,
                        strength: 25 * pos,
                      },
                      input,
                    ),
                  ).toBe(output);
                });
              });
            });
          });
        });
      });
  });

  const sensitivity = {
    0: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    25: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    50: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    75: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    100: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
  };

  const illuminant = {
    1000: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    1200: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    1400: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    1800: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    2400: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    3600: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    4800: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    6400: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
    7200: {
      red: [red, []],
      green: [green, []],
      blue: [blue, []],
    },
  };
});

run();
// color_simulate Tests:1 ends here
