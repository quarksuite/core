// color_adjust Tests

// [[file:../../Notebook.org::*color_adjust Tests][color_adjust Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_adjust } from "../color.js";

describe("color_adjust(properties, color)", () => {
  it("should reject invalid colors", () => {
    expect(() => color_adjust({}, "invalid")).toThrow();
  });

  it("should correctly adjust lightness of samples", () => {
    expect(color_adjust({ lightness: -25 }, "white")).toBe("#aeaeae");
    expect(color_adjust({ lightness: 25 }, "gray")).toBe("#cdcdcd");
    expect(color_adjust({ lightness: 50 }, "black")).toBe("#636363");
    expect(color_adjust({ lightness: -25 }, "red")).toBe("#a10000");
    expect(color_adjust({ lightness: 10 }, "orange")).toBe("#ffc644");
    expect(color_adjust({ lightness: -16 }, "yellow")).toBe("#cbc900");
    expect(color_adjust({ lightness: -32 }, "lime")).toBe("#009300");
    expect(color_adjust({ lightness: 16 }, "cyan")).toBe("#54ffff");
    expect(color_adjust({ lightness: 32 }, "blue")).toBe("#479dff");
    expect(color_adjust({ lightness: 24 }, "purple")).toBe("#cf5fcc");
    expect(color_adjust({ lightness: -24 }, "magenta")).toBe("#a900ad");
  });

  it("should correctly adjust chroma of samples", () => {
    expect(color_adjust({ chroma: 50 }, "white")).toBe("#ffdbfc");
    expect(color_adjust({ chroma: 50 }, "gray")).toBe("#bb5d7d");
    expect(color_adjust({ chroma: 75 }, "black")).toBe("#060000");
    expect(color_adjust({ chroma: -25 }, "red")).toBe("#e64a3b");
    expect(color_adjust({ chroma: -10 }, "orange")).toBe("#f6a941");
    expect(color_adjust({ chroma: -16 }, "yellow")).toBe("#fcfe66");
    expect(color_adjust({ chroma: -32 }, "lime")).toBe("#71f56a");
    expect(color_adjust({ chroma: -75 }, "cyan")).toBe("#e0e0e0");
    expect(color_adjust({ chroma: 32 }, "blue")).toBe("#1e00ff");
    expect(color_adjust({ chroma: 24 }, "purple")).toBe("#8d008f");
    expect(color_adjust({ chroma: -24 }, "magenta")).toBe("#f04bee");
  });

  it("should correctly adjust hue of samples", () => {
    expect(color_adjust({ hue: 30 }, "white")).toBe("#ffffff");
    expect(color_adjust({ hue: 60 }, "gray")).toBe("#808080");
    expect(color_adjust({ hue: 90 }, "black")).toBe("#000000");
    expect(color_adjust({ hue: 150 }, "red")).toBe("#00b48c");
    expect(color_adjust({ hue: 180 }, "orange")).toBe("#5bc0ff");
    expect(color_adjust({ hue: 210 }, "yellow")).toBe("#ffc2ff");
    expect(color_adjust({ hue: 240 }, "lime")).toBe("#ff6072");
    expect(color_adjust({ hue: 270 }, "cyan")).toBe("#f0e55d");
    expect(color_adjust({ hue: 300 }, "blue")).toBe("#0075a4");
    expect(color_adjust({ hue: 330 }, "purple")).toBe("#5e21a6");
    expect(color_adjust({ hue: 360 }, "magenta")).toBe("#ff00ff");
  });

  it("should correctly adjust alpha of samples", () => {
    expect(color_adjust({ alpha: -10 }, "white")).toBe("#ffffffe6");
    expect(color_adjust({ alpha: -20 }, "gray")).toBe("#808080cc");
    expect(color_adjust({ alpha: -30 }, "black")).toBe("#000000b3");
    expect(color_adjust({ alpha: -40 }, "red")).toBe("#ff000099");
    expect(color_adjust({ alpha: -50 }, "orange")).toBe("#ffa50080");
    expect(color_adjust({ alpha: -60 }, "yellow")).toBe("#ffff0066");
    expect(color_adjust({ alpha: -70 }, "lime")).toBe("#00ff004d");
    expect(color_adjust({ alpha: -80 }, "cyan")).toBe("#00ffff33");
    expect(color_adjust({ alpha: -90 }, "blue")).toBe("#0000ff1a");
    expect(color_adjust({ alpha: -100 }, "purple")).toBe("#80008000");
    expect(color_adjust({ alpha: -110 }, "magenta")).toBe("#ff00ff00");
  });
});

run();
// color_adjust Tests:1 ends here
