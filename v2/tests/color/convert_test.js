// [[file:../../../Notebook.org::*convert Tests][convert Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { convert } from "../../color.js";

describe("convert(to, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => convert("hex", "invalid")).toThrow();
  });

  const conversions = {
    hex: [
      ["black", "#000000"],
      ["gray", "#808080"],
      ["white", "#ffffff"],
      ["red", "#ff0000"],
      ["orange", "#ffa500"],
      ["yellow", "#ffff00"],
      ["lime", "#00ff00"],
      ["cyan", "#00ffff"],
      ["blue", "#0000ff"],
      ["purple", "#800080"],
      ["magenta", "#ff00ff"],
    ],
    rgb: [
      ["black", "rgb(0, 0, 0)"],
      ["gray", "rgb(128, 128, 128)"],
      ["white", "rgb(255, 255, 255)"],
      ["red", "rgb(255, 0, 0)"],
      ["orange", "rgb(255, 165, 0)"],
      ["yellow", "rgb(255, 255, 0)"],
      ["lime", "rgb(0, 255, 0)"],
      ["cyan", "rgb(0, 255, 255)"],
      ["blue", "rgb(0, 0, 255)"],
      ["purple", "rgb(128, 0, 128)"],
      ["magenta", "rgb(255, 0, 255)"],
    ],
    hsl: [
      ["black", "hsl(0, 0%, 0%)"],
      ["gray", "hsl(0, 0%, 50.196%)"],
      ["white", "hsl(0, 0%, 100%)"],
      ["red", "hsl(0, 100%, 50%)"],
      ["orange", "hsl(38.824, 100%, 50%)"],
      ["yellow", "hsl(60, 100%, 50%)"],
      ["lime", "hsl(120, 100%, 50%)"],
      ["cyan", "hsl(180, 100%, 50%)"],
      ["blue", "hsl(240, 100%, 50%)"],
      ["purple", "hsl(300, 100%, 25.098%)"],
      ["magenta", "hsl(300, 100%, 50%)"],
    ],
    cmyk: [
      ["black", "device-cmyk(0% 0% 0% 100%)"],
      ["gray", "device-cmyk(0% 0% 0% 49.804%)"],
      ["white", "device-cmyk(0% 0% 0% 0%)"],
      ["red", "device-cmyk(0% 100% 100% 0%)"],
      ["orange", "device-cmyk(0% 35.294% 100% 0%)"],
      ["yellow", "device-cmyk(0% 0% 100% 0%)"],
      ["lime", "device-cmyk(100% 0% 100% 0%)"],
      ["cyan", "device-cmyk(100% 0% 0% 0%)"],
      ["blue", "device-cmyk(100% 100% 0% 0%)"],
      ["purple", "device-cmyk(0% 100% 0% 49.804%)"],
      ["magenta", "device-cmyk(0% 100% 0% 0%)"],
    ],
    hwb: [
      ["black", "hwb(0 0% 100%)"],
      ["gray", "hwb(0 50.196% 49.804%)"],
      ["white", "hwb(0 100% 0%)"],
      ["red", "hwb(0 0% 0%)"],
      ["orange", "hwb(38.824 0% 0%)"],
      ["yellow", "hwb(60 0% 0%)"],
      ["lime", "hwb(120 0% 0%)"],
      ["cyan", "hwb(180 0% 0%)"],
      ["blue", "hwb(240 0% 0%)"],
      ["purple", "hwb(300 0% 49.804%)"],
      ["magenta", "hwb(300 0% 0%)"],
    ],
    lab: [
      ["black", "lab(0% 0 0)"],
      ["gray", "lab(53.585% 0 0)"],
      ["white", "lab(100% 0 0)"],
      ["red", "lab(54.292% 80.812 69.885)"],
      ["orange", "lab(75.59% 27.519 79.116)"],
      ["yellow", "lab(97.607% -15.753 93.388)"],
      ["lime", "lab(87.818% -79.287 80.99)"],
      ["cyan", "lab(90.665% -50.665 -14.962)"],
      ["blue", "lab(29.568% 68.299 -112.029)"],
      ["purple", "lab(29.692% 56.118 -36.291)"],
      ["magenta", "lab(60.17% 93.55 -60.499)"],
    ],
    lch: [
      ["black", "lch(0% 0 0)"],
      ["gray", "lch(53.585% 0 0)"],
      ["white", "lch(100% 0 0)"],
      ["red", "lch(54.292% 106.839 40.853)"],
      ["orange", "lch(75.59% 83.766 70.821)"],
      ["yellow", "lch(97.607% 94.708 99.575)"],
      ["lime", "lch(87.818% 113.34 134.391)"],
      ["cyan", "lch(90.665% 52.828 196.452)"],
      ["blue", "lch(29.568% 131.207 301.369)"],
      ["purple", "lch(29.692% 66.83 327.109)"],
      ["magenta", "lch(60.17% 111.408 327.109)"],
    ],
    oklab: [
      ["black", "oklab(0% 0 0)"],
      ["gray", "oklab(59.987% 0 0)"],
      ["white", "oklab(100% 0 0)"],
      ["red", "oklab(62.796% 0.22486 0.12585)"],
      ["orange", "oklab(79.269% 0.05661 0.16138)"],
      ["yellow", "oklab(96.798% -0.07137 0.19857)"],
      ["lime", "oklab(86.644% -0.23389 0.1795)"],
      ["cyan", "oklab(90.54% -0.14944 -0.0394)"],
      ["blue", "oklab(45.201% -0.03246 -0.31153)"],
      ["purple", "oklab(42.091% 0.1647 -0.10147)"],
      ["magenta", "oklab(70.167% 0.27457 -0.16916)"],
    ],
    oklch: [
      ["black", "oklch(0% 0 0)"],
      ["gray", "oklch(59.987% 0 0)"],
      ["white", "oklch(100% 0 0)"],
      ["red", "oklch(62.796% 0.25768 29.234)"],
      ["orange", "oklch(79.269% 0.17103 70.67)"],
      ["yellow", "oklch(96.798% 0.21101 109.769)"],
      ["lime", "oklch(86.644% 0.29483 142.495)"],
      ["cyan", "oklch(90.54% 0.15455 194.769)"],
      ["blue", "oklch(45.201% 0.31321 264.052)"],
      ["purple", "oklch(42.091% 0.19345 328.363)"],
      ["magenta", "oklch(70.167% 0.32249 328.363)"],
    ],
  };

  Object.entries(conversions).forEach(([format, samples]) => {
    describe(`to = '${format}'`, () => {
      it("should correctly convert all color samples", () => {
        samples.forEach(([input, output]) => {
          expect(convert(format, input)).toBe(output);
        });
      });
    });
  });
});

run();
// convert Tests:1 ends here
