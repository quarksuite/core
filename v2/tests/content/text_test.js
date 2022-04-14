// [[file:../../../Notebook.org::*text Tests][text Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { text } from "../../content.js";

describe("text(settings, font)", () => {
  it("should work with default settings", () => {
    expect(text({}, "")).toEqual({
      family:
        "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      regular: 400,
      bold: 700,
    });
  });

  describe("settings.system", () => {
    it("system = 'sans'", () =>
      expect(text({ system: "sans" }, "")).toEqual({
        family:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        regular: 400,
        bold: 700,
      }));
    it("system = 'serif'", () =>
      expect(text({ system: "serif" }, "")).toEqual({
        family:
          "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
        regular: 400,
        bold: 700,
      }));
    it("system = 'monospace'", () =>
      expect(text({ system: "monospace" }, "")).toEqual({
        family:
          "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
        regular: 400,
        bold: 700,
      }));
  });

  describe("settings.weights", () => {
    it("should map weight keys to corresponding weight values", () => {
      expect(text({ weights: ["light", "regular", "bold"] }, "")).toEqual({
        family:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        light: 300,
        regular: 400,
        bold: 700,
      });
      expect(text({ weights: ["thin", "black"] }, "")).toEqual({
        family:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        thin: 100,
        black: 900,
      });
      expect(
        text(
          {
            weights: [
              "thin",
              "extralight",
              "light",
              "regular",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
            ],
          },
          ""
        )
      ).toEqual({
        family:
          "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      });
    });
  });

  it("should allow setting a custom lead font", () => {
    expect(text({}, "Mozilla Slab")).toEqual({
      family:
        "Mozilla Slab, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      regular: 400,
      bold: 700,
    });
    expect(text({}, "Work Sans")).toEqual({
      family:
        "Work Sans, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      regular: 400,
      bold: 700,
    });
  });
});

run();
// text Tests:1 ends here
