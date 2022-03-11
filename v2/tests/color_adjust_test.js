// color_adjust Tests

// [[file:../../Notebook.org::*color_adjust Tests][color_adjust Tests:1]]
import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { color_adjust } from "../color.js";

describe("color_adjust(settings, color)", () => {
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

  it("should allow interpolation when settings.steps is defined", () => {
    expect(
      color_adjust({ lightness: -25, chroma: 50, steps: 10 }, "white"),
    ).toEqual([
      "#fff3f6",
      "#fee8ee",
      "#fddce5",
      "#fcd1dc",
      "#fac5d4",
      "#f8bacc",
      "#f6aec3",
      "#f3a3bb",
      "#f197b3",
      "#ee8bab",
    ]);
    expect(
      color_adjust({ lightness: 25, chroma: 50, steps: 10 }, "gray"),
    ).toEqual([
      "#8e8587",
      "#9d898e",
      "#ab8e96",
      "#ba929d",
      "#c896a4",
      "#d69aac",
      "#e59eb3",
      "#f3a3bb",
      "#ffa7c3",
      "#ffaaca",
    ]);
    expect(
      color_adjust({ lightness: 50, chroma: 75, steps: 10 }, "black"),
    ).toEqual([
      "#010000",
      "#0b0003",
      "#1c010a",
      "#2e0215",
      "#420420",
      "#56072b",
      "#6b0b38",
      "#811044",
      "#981551",
      "#b01a5f",
    ]);
    expect(
      color_adjust({ lightness: -25, chroma: -25, hue: 150, steps: 10 }, "red"),
    ).toEqual([
      "#ef2200",
      "#d93900",
      "#bf4c00",
      "#a05a00",
      "#7c6300",
      "#536900",
      "#066b00",
      "#006a00",
      "#006527",
      "#005d44",
    ]);
    expect(
      color_adjust(
        { lightness: 10, chroma: -10, hue: 180, steps: 10 },
        "orange",
      ),
    ).toEqual([
      "#ebb700",
      "#cfc824",
      "#aed754",
      "#85e27f",
      "#55eba9",
      "#01efd0",
      "#00f0f4",
      "#1bedff",
      "#5ee8ff",
      "#8ee2ff",
    ]);
    expect(
      color_adjust(
        { lightness: -16, chroma: -16, hue: 210, steps: 10 },
        "yellow",
      ),
    ).toEqual([
      "#beff67",
      "#69ffa3",
      "#00ffd7",
      "#00ffff",
      "#00f8ff",
      "#00e5ff",
      "#7cd1ff",
      "#b0bcff",
      "#d5a9ff",
      "#f099ff",
    ]);
    expect(
      color_adjust(
        { lightness: -32, chroma: -32, hue: 240, steps: 10 },
        "lime",
      ),
    ).toEqual([
      "#00fe9e",
      "#00f0e8",
      "#00d7ff",
      "#00b6ff",
      "#4192ff",
      "#9270ff",
      "#ba52f5",
      "#cf36ba",
      "#d71b78",
      "#d10f2f",
    ]);
    expect(
      color_adjust({ lightness: 16, chroma: -75, hue: 270, steps: 10 }, "cyan"),
    ).toEqual([
      "#6af9ff",
      "#abf1ff",
      "#ddebff",
      "#ffe9ff",
      "#ffecff",
      "#fff4ff",
      "#fff9f8",
      "#fffefc",
      "#ffffff",
    ]);
    expect(
      color_adjust({ lightness: 32, chroma: 32, hue: 300, steps: 10 }, "blue"),
    ).toEqual([
      "#7700fc",
      "#b700cd",
      "#eb007e",
      "#ff0000",
      "#ee5b00",
      "#9ea300",
      "#00d200",
      "#00eb98",
      "#00eaff",
    ]);
    expect(
      color_adjust(
        { lightness: 24, chroma: 24, hue: 330, steps: 10 },
        "purple",
      ),
    ).toEqual([
      "#a1004d",
      "#b10000",
      "#aa3700",
      "#876400",
      "#2d8600",
      "#009b55",
      "#009fb2",
      "#0092f9",
      "#4179ff",
      "#aa5eff",
    ]);
    expect(
      color_adjust(
        { lightness: -24, chroma: -24, hue: 360, steps: 10 },
        "magenta",
      ),
    ).toEqual([
      "#ff0080",
      "#ff0000",
      "#e95500",
      "#8c8a00",
      "#00a200",
      "#009f88",
      "#0082da",
      "#0050fd",
      "#6e05e5",
      "#9c009e",
    ]);
  });
});

run();
// color_adjust Tests:1 ends here
