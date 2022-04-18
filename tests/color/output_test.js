// [[file:../../Notebook.org::*output Tests][output Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { tokens, palette, output } from "../../color.js";

describe("output(format, dict)", () => {
  const swatch = "rebeccapurple";
  const [material, artistic] = [
    tokens(palette({}, swatch)),
    tokens(palette({ configuration: "artistic" }, swatch)),
  ];

  const removeTimestamp = (format) =>
    format.replace(
      /[\d/]+ [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]"
    );

  describe("format = 'gpl'", () => {
    it("should generate gpl palette from both palette token configurations", () => {
      expect(removeTimestamp(output("gpl", { project: {}, ...material })))
        .toBe(`GIMP Palette
Name: Unknown (v0.1.0)
# Owned by Anonymous
# License: Unlicense
# [Timestamp replaced for testing]

Columns: 6
238\t234\t246\t50 (#eeeaf6)\n214\t203\t231\t100 (#d6cbe7)\n190\t173\t216\t200 (#beadd8)\n167\t143\t201\t300 (#a78fc9)\n145\t113\t186\t400 (#9171ba)\n123\t 83\t170\t500 (#7b53aa)\n 81\t 45\t120\t600 (#512d78)\n 61\t 38\t 88\t700 (#3d2658)\n 42\t 30\t 57\t800 (#2a1e39)\n 24\t 21\t 29\t900 (#18151d)\n255\t255\t255\tBG (#ffffff)\n 17\t 17\t 17\tFG (#111111)

`);
      expect(removeTimestamp(output("gpl", { project: {}, ...artistic })))
        .toBe(`GIMP Palette
Name: Unknown (v0.1.0)
# Owned by Anonymous
# License: Unlicense
# [Timestamp replaced for testing]

Columns: 6
255\t255\t255\tBG (#ffffff)\n 17\t 17\t 17\tFG (#111111)\n145\t113\t186\tLIGHT 100 (#9171ba)\n190\t173\t216\tLIGHT 200 (#beadd8)\n238\t234\t246\tLIGHT 300 (#eeeaf6)\n121\t 90\t160\tMUTED 100 (#795aa0)\n142\t125\t166\tMUTED 200 (#8e7da6)\n163\t159\t169\tMUTED 300 (#a39fa9)\n 74\t 42\t109\tDARK 100 (#4a2a6d)\n 48\t 33\t 67\tDARK 200 (#302143)\n 24\t 21\t 29\tDARK 300 (#18151d)

`);
    });
  });

  describe("format = 'sketchpalette'", () => {
    it("should generate sketchpalette palette from both palette token configurations", () => {
      expect(
        JSON.parse(output("sketchpalette", { project: {}, ...material }))
      ).toEqual({
        colors: [
          {
            red: 0.9333333333333333,
            green: 0.9176470588235294,
            blue: 0.9647058823529412,
            alpha: 1,
          },
          {
            red: 0.8392156862745098,
            green: 0.796078431372549,
            blue: 0.9058823529411765,
            alpha: 1,
          },
          {
            red: 0.7450980392156863,
            green: 0.6784313725490196,
            blue: 0.8470588235294118,
            alpha: 1,
          },
          {
            red: 0.6549019607843137,
            green: 0.5607843137254902,
            blue: 0.788235294117647,
            alpha: 1,
          },
          {
            red: 0.5686274509803921,
            green: 0.44313725490196076,
            blue: 0.7294117647058823,
            alpha: 1,
          },
          {
            red: 0.4823529411764706,
            green: 0.3254901960784314,
            blue: 0.6666666666666666,
            alpha: 1,
          },
          {
            red: 0.3176470588235294,
            green: 0.17647058823529413,
            blue: 0.47058823529411764,
            alpha: 1,
          },
          {
            red: 0.23921568627450981,
            green: 0.14901960784313725,
            blue: 0.34509803921568627,
            alpha: 1,
          },
          {
            red: 0.16470588235294117,
            green: 0.11764705882352941,
            blue: 0.2235294117647059,
            alpha: 1,
          },
          {
            red: 0.09411764705882353,
            green: 0.08235294117647059,
            blue: 0.11372549019607843,
            alpha: 1,
          },
          { red: 1, green: 1, blue: 1, alpha: 1 },
          {
            red: 0.06666666666666667,
            green: 0.06666666666666667,
            blue: 0.06666666666666667,
            alpha: 1,
          },
        ],
        pluginVersion: "1.4",
        compatibleVersion: "1.4",
      });
      expect(
        JSON.parse(output("sketchpalette", { project: {}, ...artistic }))
      ).toEqual({
        colors: [
          { red: 1, green: 1, blue: 1, alpha: 1 },
          {
            red: 0.06666666666666667,
            green: 0.06666666666666667,
            blue: 0.06666666666666667,
            alpha: 1,
          },
          {
            red: 0.5686274509803921,
            green: 0.44313725490196076,
            blue: 0.7294117647058823,
            alpha: 1,
          },
          {
            red: 0.7450980392156863,
            green: 0.6784313725490196,
            blue: 0.8470588235294118,
            alpha: 1,
          },
          {
            red: 0.9333333333333333,
            green: 0.9176470588235294,
            blue: 0.9647058823529412,
            alpha: 1,
          },
          {
            red: 0.4745098039215686,
            green: 0.35294117647058826,
            blue: 0.6274509803921569,
            alpha: 1,
          },
          {
            red: 0.5568627450980392,
            green: 0.49019607843137253,
            blue: 0.6509803921568628,
            alpha: 1,
          },
          {
            red: 0.6392156862745098,
            green: 0.6235294117647059,
            blue: 0.6627450980392157,
            alpha: 1,
          },
          {
            red: 0.2901960784313726,
            green: 0.16470588235294117,
            blue: 0.42745098039215684,
            alpha: 1,
          },
          {
            red: 0.18823529411764706,
            green: 0.12941176470588237,
            blue: 0.2627450980392157,
            alpha: 1,
          },
          {
            red: 0.09411764705882353,
            green: 0.08235294117647059,
            blue: 0.11372549019607843,
            alpha: 1,
          },
        ],
        pluginVersion: "1.4",
        compatibleVersion: "1.4",
      });
    });
  });
});

run();
// output Tests:1 ends here
