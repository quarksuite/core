import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { output, palette, tokens } from "../../color.js";

describe("output(format, dict)", () => {
  const swatch = "rebeccapurple";
  const [material, artistic] = [
    tokens(palette({}, swatch)),
    tokens(palette({ configuration: "artistic" }, swatch)),
  ];

  const removeTimestamp = (format) =>
    format.replace(
      /[\d/]+ [\d:]+ (?:AM|PM)?/,
      "[Timestamp replaced for testing]",
    );

  describe("format = 'gpl'", () => {
    it("should generate gpl palette from both palette token configurations", () => {
      expect(removeTimestamp(output("gpl", { project: {}, ...material }))).toBe(
        `GIMP Palette
Name: Unknown (v0.1.0)
# Owned by Anonymous
# License: Unlicense
# [Timestamp replaced for testing]

Columns: 6
238	234	246	50 (#eeeaf6)
209	197	228	100 (#d1c5e4)
181	161	210	200 (#b5a1d2)
154	125	192	300 (#9a7dc0)
127	 89	173	400 (#7f59ad)
 85	 46	126	500 (#552e7e)
 69	 41	100	600 (#452964)
 53	 35	 75	700 (#35234b)
 38	 28	 52	800 (#261c34)
 24	 21	 29	900 (#18151d)
255	255	255	BG (#ffffff)
 17	 17	 17	FG (#111111)

`,
      );
      expect(removeTimestamp(output("gpl", { project: {}, ...artistic }))).toBe(
        `GIMP Palette
Name: Unknown (v0.1.0)
# Owned by Anonymous
# License: Unlicense
# [Timestamp replaced for testing]

Columns: 6
255	255	255	BG (#ffffff)
 17	 17	 17	FG (#111111)
145	113	186	LIGHT 100 (#9171ba)
190	173	216	LIGHT 200 (#beadd8)
238	234	246	LIGHT 300 (#eeeaf6)
121	 90	160	MUTED 100 (#795aa0)
142	125	166	MUTED 200 (#8e7da6)
163	159	169	MUTED 300 (#a39fa9)
 74	 42	109	DARK 100 (#4a2a6d)
 48	 33	 67	DARK 200 (#302143)
 24	 21	 29	DARK 300 (#18151d)

`,
      );
    });
  });

  describe("format = 'sketchpalette'", () => {
    it("should generate sketchpalette palette from both palette token configurations", () => {
      expect(
        JSON.parse(output("sketchpalette", { project: {}, ...material })),
      ).toEqual({
        colors: [
          {
            red: 0.9333333333333333,
            green: 0.9176470588235294,
            blue: 0.9647058823529412,
            alpha: 1,
          },
          {
            red: 0.8196078431372549,
            green: 0.7725490196078432,
            blue: 0.8941176470588236,
            alpha: 1,
          },
          {
            red: 0.7098039215686275,
            green: 0.6313725490196078,
            blue: 0.8235294117647058,
            alpha: 1,
          },
          {
            red: 0.6039215686274509,
            green: 0.49019607843137253,
            blue: 0.7529411764705882,
            alpha: 1,
          },
          {
            red: 0.4980392156862745,
            green: 0.34901960784313724,
            blue: 0.6784313725490196,
            alpha: 1,
          },
          {
            red: 0.3333333333333333,
            green: 0.1803921568627451,
            blue: 0.49411764705882355,
            alpha: 1,
          },
          {
            red: 0.27058823529411763,
            green: 0.1607843137254902,
            blue: 0.39215686274509803,
            alpha: 1,
          },
          {
            red: 0.20784313725490197,
            green: 0.13725490196078433,
            blue: 0.29411764705882354,
            alpha: 1,
          },
          {
            red: 0.14901960784313725,
            green: 0.10980392156862745,
            blue: 0.20392156862745098,
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
        JSON.parse(output("sketchpalette", { project: {}, ...artistic })),
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
