import { data_clrs, data_systemfonts } from "../mod.js";
import { benchmark, data, exception, init, suite } from "./index.js";

const testOutputClrs = [
  "Colors (https://clrs.cc)",
  ["reject undefined key", exception(data_clrs, "cornsilk")],
  [
    "query a key",
    data(
      [
        "navy",
        "aqua",
        "blue",
        "teal",
        "lime",
        "green",
        "olive",
        "maroon",
        "fuchsia",
        "purple",
        "red",
        "orange",
        "yellow",
        "silver",
        "gray",
        "grey",
        "white",
        "black",
      ].map((color) => data_clrs(color)),
      [
        "#001f3f",
        "#7fdbff",
        "#0074d9",
        "#39cccc",
        "#01ff70",
        "#2ecc40",
        "#3d9970",
        "#85144b",
        "#f012be",
        "#b10dc9",
        "#ff4136",
        "#ff851b",
        "#ffdc00",
        "#dddddd",
        "#aaaaaa",
        "#aaaaaa",
        "#ffffff",
        "#111111",
      ],
    ),
  ],
];

const testSystemFont = [
  "System Font Stacks (https://systemfontstack.com)",
  ["reject undefined key", exception(data_systemfonts)],
  [
    "query a key",
    data(
      ["sans", "serif", "monospace"].map((family) => data_systemfonts(family)),
      [
        "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
        "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
      ],
    ),
  ],
];

suite("Data Utilities", testOutputClrs, testSystemFont);

benchmark(data_clrs, "teal");
benchmark(data_systemfonts, "sans");

init(7);
