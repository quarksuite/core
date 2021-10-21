import {
  color_adjust,
  color_blend,
  color_format_compare,
  color_interpolation,
  color_material,
  color_mix,
  color_shades,
  color_tints,
  color_to_cielab,
  color_to_cielch,
  color_to_cmyk,
  color_to_hex,
  color_to_hsl,
  color_to_hwb,
  color_to_oklab,
  color_to_rgb,
  color_to_scheme_analogous,
  color_to_scheme_clash,
  color_to_scheme_complementary,
  color_to_scheme_dyadic,
  color_to_scheme_hexagon,
  color_to_scheme_split_complementary,
  color_to_scheme_square,
  color_to_scheme_star,
  color_to_scheme_tetradic,
  color_to_scheme_triadic,
  color_tones,
  palette_contrast,
  palette_filter,
  palette_shift,
  palette_sort,
} from "../utilities.js";
import {
  benchmark,
  data,
  exception,
  init,
  string,
  suite,
} from "../tests/index.js";

const color = "dodgerblue";
const formats = [
  color_to_hex,
  color_to_rgb,
  color_to_hsl,
  color_to_cmyk,
  color_to_hwb,
  color_to_cielab,
  color_to_cielch,
  color_to_oklab,
];
const schemes = [
  color_to_scheme_dyadic,
  color_to_scheme_analogous,
  color_to_scheme_complementary,
  color_to_scheme_split_complementary,
  color_to_scheme_triadic,
  color_to_scheme_clash,
  color_to_scheme_tetradic,
  color_to_scheme_square,
  color_to_scheme_star,
  color_to_scheme_hexagon,
];
const variants = [color_tints, color_tones, color_shades];

const testColorFormats = [
  "Formats",
  ["hex", string(color_to_hex(color), "#1e90ff")],
  ["rgb", string(color_to_rgb(color), "rgb(30, 144, 255)")],
  ["hsl", string(color_to_hsl(color), "hsl(209.6, 100%, 55.882%)")],
  [
    "device-cmyk",
    string(color_to_cmyk(color), "device-cmyk(88.235% 43.529% 0% 0%)"),
  ],
  ["hwb", string(color_to_hwb(color), "hwb(209.6 11.765% 0%)")],
  ["lab", string(color_to_cielab(color), "lab(58.362% 0.8897 -64.779)")],
  ["lch", string(color_to_cielch(color), "lch(58.362% 64.785 270.79)")],
  ["oklab", string(color_to_oklab(color), "oklab(65.201% 0.1901 253.21)")],
  ["reject invalid color", formats.forEach((f) => exception(f, "invalid"))],
  [
    "valid with alpha component",
    data(color_format_compare(formats, color_adjust({ alpha: -25 }, color)), {
      original: "#1e90ffbf",
      hex: "#1e90ffbf",
      rgb: "rgba(30, 144, 255, 0.74902)",
      hsl: "hsla(209.6, 100%, 55.882%, 0.74902)",
      cmyk: "device-cmyk(88.235% 43.529% 0% 0% / 0.74902)",
      hwb: "hwb(209.6 11.765% 0% / 0.74902)",
      cielab: "lab(58.362% 0.8897 -64.779 / 0.74902)",
      cielch: "lch(58.362% 64.785 270.79 / 0.74902)",
      oklab: "oklab(65.201% 0.1901 253.21 / 0.74902)",
    }),
  ],
];

const testColorAdjustment = [
  "Adjustment",
  ["reject invalid color", exception(color_adjust, "invalid")],
  ["default configuration", string(color_adjust({}, color), "#1e90ff")],
  [
    "adjusting lightness",
    string(color_adjust({ lightness: -10 }, color), "#0070dc"),
    string(color_adjust({ lightness: -20 }, color), "#0050ba"),
    string(color_adjust({ lightness: -30 }, color), "#003099"),
    string(color_adjust({ lightness: -40 }, color), "#000579"),
    string(color_adjust({ lightness: 10 }, color), "#47b1ff"),
    string(color_adjust({ lightness: 20 }, color), "#6ad2ff"),
    string(color_adjust({ lightness: 30 }, color), "#8cf4ff"),
    string(color_adjust({ lightness: 40 }, color), "#adffff"),
  ],
  [
    "adjusting chroma",
    string(color_adjust({ chroma: -10 }, color), "#6893c6"),
    string(color_adjust({ chroma: -20 }, color), "#909090"),
    string(color_adjust({ chroma: -30 }, color), "#909090"),
    string(color_adjust({ chroma: -40 }, color), "#909090"),
    string(color_adjust({ chroma: 10 }, color), "#0085ff"),
    string(color_adjust({ chroma: 20 }, color), "#006dff"),
    string(color_adjust({ chroma: 30 }, color), "#0030ff"),
    string(color_adjust({ chroma: 40 }, color), "#0000ff"),
  ],
  [
    "adjusting hue",
    string(color_adjust({ hue: -15 }, color), "#009bf4"),
    string(color_adjust({ hue: -30 }, color), "#00a4e3"),
    string(color_adjust({ hue: -45 }, color), "#00accc"),
    string(color_adjust({ hue: -60 }, color), "#00b0b0"),
    string(color_adjust({ hue: 15 }, color), "#5f85ff"),
    string(color_adjust({ hue: 30 }, color), "#847afe"),
    string(color_adjust({ hue: 45 }, color), "#a06ff2"),
    string(color_adjust({ hue: 60 }, color), "#b866e0"),
  ],
  [
    "adjusting alpha",
    string(color_adjust({ alpha: -10 }, color), "#1e90ffe6"),
    string(color_adjust({ alpha: -20 }, color), "#1e90ffcc"),
    string(color_adjust({ alpha: -30 }, color), "#1e90ffb3"),
    string(color_adjust({ alpha: -40 }, color), "#1e90ff99"),
  ],
];

const testColorMixture = [
  "Mixture",
  [
    "reject invalid color",
    exception(color_mix, {}, "invalid"),
    exception(color_mix, { target: "invalid" }, color),
  ],
  ["default configuration", string(color_mix({}, color), "#053463")],
  [
    "setting a target color",
    string(color_mix({ target: "coral" }, color), "#a993b3"),
    string(color_mix({ target: "chartreuse" }, color), "#42ceb7"),
    string(color_mix({ target: "rebeccapurple" }, color), "#5a63cb"),
    string(color_mix({ target: color }, color), "#1e90ff"),
  ],
  [
    "setting mixture amount",
    string(color_mix({ amount: 0 }, color), "#1e90ff"),
    string(color_mix({ amount: 10 }, color), "#197dde"),
    string(color_mix({ amount: 20 }, color), "#136abe"),
    string(color_mix({ amount: 30 }, color), "#0e579e"),
    string(color_mix({ amount: 40 }, color), "#094580"),
    string(color_mix({ amount: 50 }, color), "#053463"),
    string(color_mix({ amount: 60 }, color), "#032448"),
    string(color_mix({ amount: 70 }, color), "#01152e"),
    string(color_mix({ amount: 80 }, color), "#000716"),
    string(color_mix({ amount: 90 }, color), "#000103"),
    string(color_mix({ amount: 100 }, color), "#000000"),
  ],
];

suite(
  "Color Utilities",
  testColorFormats,
  testColorAdjustment,
  testColorMixture,
);

const testColorInterpolation = [
  "Interpolation",
  ["reject invalid color", exception(color_interpolation, {}, "invalid")],
  ["default configuration", data(color_interpolation({}, color), ["#1e90ff"])],
  [
    "interpolate lightness",
    data(color_interpolation({ lightness: 60 }, color), [
      "#38a3ff",
      "#4eb7ff",
      "#63cbff",
      "#77dfff",
      "#8cf4ff",
      "#a0ffff",
      "#b4ffff",
      "#c8ffff",
      "#ddffff",
      "#f2ffff",
    ]),
    data(color_interpolation({ lightness: 80 }, color), [
      "#40aaff",
      "#5cc4ff",
      "#77dfff",
      "#92fbff",
      "#adffff",
      "#c8ffff",
      "#e4ffff",
      "#ffffff",
    ]),
    data(color_interpolation({ lightness: 100 }, color), [
      "#47b1ff",
      "#6ad2ff",
      "#8cf4ff",
      "#adffff",
      "#cfffff",
      "#f2ffff",
      "#ffffff",
    ]),
  ],
  [
    "interpolate chroma",
    data(color_interpolation({ chroma: 60 }, color), [
      "#008aff",
      "#0081ff",
      "#0073ff",
      "#005cff",
      "#0030ff",
      "#0000ff",
      "#3600ff",
    ]),
    data(color_interpolation({ chroma: 80 }, color), [
      "#0088ff",
      "#0078ff",
      "#005cff",
      "#0000ff",
      "#5500ff",
      "#8200ff",
      "#a700ff",
    ]),
    data(color_interpolation({ chroma: 100 }, color), [
      "#0085ff",
      "#006dff",
      "#0030ff",
      "#0000ff",
      "#3600ff",
      "#7800ff",
      "#a700ff",
      "#ab00ff",
    ]),
  ],
  [
    "interpolate hue",
    data(color_interpolation({ hue: 90 }, color), [
      "#4c89ff",
      "#6782ff",
      "#7d7cff",
      "#9075fa",
      "#a06ff2",
      "#af69e8",
      "#bc64dc",
      "#c75fce",
      "#d25abe",
      "#da56ad",
    ]),
    data(color_interpolation({ hue: 180 }, color), [
      "#6782ff",
      "#9075fa",
      "#af69e8",
      "#c75fce",
      "#da56ad",
      "#e75188",
      "#ed525f",
      "#ec592b",
      "#e36700",
      "#d37700",
    ]),
    data(color_interpolation({ hue: 360 }, color), [
      "#9075fa",
      "#c75fce",
      "#e75188",
      "#ec592b",
      "#d37700",
      "#9a9600",
      "#24ac3b",
      "#00b297",
      "#00a7da",
      "#1e90ff",
    ]),
  ],
  [
    "adjust alpha",
    data(color_interpolation({ alpha: -60 }, color), [
      "#1e90fff0",
      "#1e90ffe0",
      "#1e90ffd1",
      "#1e90ffc2",
      "#1e90ffb3",
      "#1e90ffa3",
      "#1e90ff94",
      "#1e90ff85",
      "#1e90ff75",
      "#1e90ff66",
    ]),
    data(color_interpolation({ alpha: -80 }, color), [
      "#1e90ffeb",
      "#1e90ffd6",
      "#1e90ffc2",
      "#1e90ffad",
      "#1e90ff99",
      "#1e90ff85",
      "#1e90ff70",
      "#1e90ff5c",
      "#1e90ff47",
      "#1e90ff33",
    ]),
  ],
  [
    "setting the number of output values",
    data(color_interpolation({ lightness: 64, values: 4 }, color), [
      "#5cc4ff",
      "#92fbff",
      "#c8ffff",
      "#ffffff",
    ]),
    data(color_interpolation({ chroma: 64, values: 4 }, color), [
      "#0078ff",
      "#0000ff",
      "#5500ff",
    ]),
    data(color_interpolation({ hue: 270, values: 4 }, color), [
      "#c261d5",
      "#ed5548",
      "#b38b00",
      "#00b16d",
    ]),
    data(color_interpolation({ alpha: -64, values: 4 }, color), [
      "#1e90ffd6",
      "#1e90ffad",
      "#1e90ff85",
      "#1e90ff5c",
    ]),
  ],
];

const testColorBlend = [
  "Blending",
  [
    "reject invalid color",
    exception(color_blend, {}, "invalid"),
    exception(color_blend, { target: "invalid" }, color),
  ],
  [
    "default configuration",
    data(color_blend({}, color), [
      "#197dde",
      "#136abe",
      "#0e579e",
      "#094580",
      "#053463",
      "#032448",
      "#01152e",
      "#000716",
      "#000103",
      "#000000",
    ]),
  ],
  [
    "setting a blend target",
    data(color_blend({ target: "coral" }, color), [
      "#4c92f0",
      "#6994e1",
      "#8094d2",
      "#9594c3",
      "#a993b3",
      "#bb91a3",
      "#cd8e91",
      "#de8a7e",
      "#ef8569",
      "#ff7f50",
    ]),
    data(color_blend({ target: "chartreuse" }, color), [
      "#1e9ef2",
      "#23abe5",
      "#2cb7d6",
      "#37c3c7",
      "#42ceb7",
      "#4ed8a5",
      "#5ae290",
      "#66ec77",
      "#73f655",
      "#7fff00",
    ]),
    data(color_blend({ target: "rebeccapurple" }, color), [
      "#3587f4",
      "#437eea",
      "#4d75df",
      "#546cd5",
      "#5a63cb",
      "#5e5ac1",
      "#6151b7",
      "#6447ad",
      "#653da3",
      "#663399",
    ]),
  ],
  [
    "setting blend amount",
    data(color_blend({ amount: 25 }, color), [
      "#1d8bf7",
      "#1b86ee",
      "#1a81e6",
      "#197dde",
      "#1778d6",
      "#1673ce",
      "#156ec5",
      "#136abe",
      "#1265b6",
      "#1160ae",
    ]),
    data(color_blend({ amount: 50 }, color), [
      "#1b86ee",
      "#197dde",
      "#1673ce",
      "#136abe",
      "#1160ae",
      "#0e579e",
      "#0c4e8f",
      "#094580",
      "#073d71",
      "#053463",
    ]),
    data(color_blend({ amount: 75 }, color), [
      "#1a81e6",
      "#1673ce",
      "#1265b6",
      "#0e579e",
      "#0a4a87",
      "#073d71",
      "#05305c",
      "#032448",
      "#011934",
      "#010e22",
    ]),
  ],
  [
    "setting the number of output values",
    data(color_blend({ values: 4 }, color), [
      "#1160ae",
      "#053463",
      "#010e22",
      "#000000",
    ]),
  ],
];

const testColorMaterial = [
  "Material Design-esque",
  ["reject invalid color", exception(color_material, {}, "invalid")],
  [
    "default configuration",
    data(color_material({}, color), [
      "#f5faff",
      "#cfe6ff",
      "#a8d2ff",
      "#81bdff",
      "#57a7ff",
      "#1d8efb",
      "#136abe",
      "#094580",
      "#032448",
      "#000716",
    ]),
  ],
  [
    "adjust the light contrast",
    data(color_material({ light: 50 }, color), [
      "#9acaff",
      "#85bfff",
      "#70b4ff",
      "#5aa8ff",
      "#409cff",
      "#1f95ff",
      "#136abe",
      "#094580",
      "#032448",
      "#000716",
    ]),
  ],
  [
    "adjust the dark contrast",
    data(color_material({ dark: 50 }, color), [
      "#f5faff",
      "#cfe6ff",
      "#a8d2ff",
      "#81bdff",
      "#57a7ff",
      "#1d8bf7",
      "#1778d6",
      "#1160ae",
      "#0a4a87",
      "#053463",
    ]),
  ],
  [
    "adjust contrast in tandem",
    data(color_material({ light: 75, dark: 50 }, color), [
      "#cde5ff",
      "#afd5ff",
      "#90c4ff",
      "#70b4ff",
      "#4da2ff",
      "#1d8dfb",
      "#1778d6",
      "#1160ae",
      "#0a4a87",
      "#053463",
    ]),
  ],
];

const testColorSchemes = [
  "Schemes",
  ["reject invalid color", schemes.forEach((f) => exception(f, "invalid"))],
  ["dyadic", data(color_to_scheme_dyadic(color), ["#1e90ff", "#da56ad"])],
  [
    "complementary",
    data(color_to_scheme_complementary(color), ["#1e90ff", "#d37700"]),
  ],
  [
    "analogous",
    data(color_to_scheme_analogous(color), ["#1e90ff", "#a06ff2", "#da56ad"]),
  ],
  [
    "split complementary",
    data(color_to_scheme_split_complementary(color), [
      "#1e90ff",
      "#df6855",
      "#b58c00",
    ]),
  ],
  [
    "triadic",
    data(color_to_scheme_triadic(color), ["#1e90ff", "#ec516e", "#5da600"]),
  ],
  [
    "clash",
    data(color_to_scheme_clash(color), ["#1e90ff", "#da56ad", "#00b16d"]),
  ],
  [
    "tetradic",
    data(color_to_scheme_tetradic(color), [
      "#1e90ff",
      "#a06ff2",
      "#d37700",
      "#9f9600",
    ]),
  ],
  [
    "square",
    data(color_to_scheme_square(color), [
      "#1e90ff",
      "#da56ad",
      "#d37700",
      "#00b16d",
    ]),
  ],
  [
    "star",
    data(color_to_scheme_star(color), [
      "#1e90ff",
      "#c75fce",
      "#ec592b",
      "#9a9600",
      "#00b297",
    ]),
  ],
  [
    "hexagon",
    data(color_to_scheme_hexagon(color), [
      "#1e90ff",
      "#b866e0",
      "#ec516e",
      "#d37700",
      "#5da600",
      "#00b0b0",
    ]),
  ],
];

const testColorVariants = [
  "Variants",
  [
    "reject invalid color",
    variants.forEach((f) => exception(f, {}, "invalid")),
  ],
  [
    "tints",
    data(color_tints({}, color), ["#74b6ff", "#b5d8ff", "#f5faff"]),
    data(color_tints({ contrast: 75 }, color), [
      "#65aeff",
      "#9acaff",
      "#cde5ff",
    ]),
    data(color_tints({ values: 6 }, color), [
      "#4fa3ff",
      "#74b6ff",
      "#95c7ff",
      "#b5d8ff",
      "#d5e9ff",
      "#f5faff",
    ]),
    data(color_tints({ contrast: 85, values: 9 }, color), [
      "#3f9cff",
      "#57a7ff",
      "#6cb2ff",
      "#81bcff",
      "#94c7ff",
      "#a8d1ff",
      "#bbdbff",
      "#cee5ff",
      "#e1efff",
    ]),
  ],
  [
    "tones",
    data(color_tones({}, color), ["#4b8ed9", "#6589b4", "#7a838d"]),
    data(color_tones({ contrast: 75 }, color), [
      "#468ee0",
      "#5e8bc0",
      "#7086a0",
    ]),
    data(color_tones({ values: 6 }, color), [
      "#398fec",
      "#4b8ed9",
      "#598cc6",
      "#6589b4",
      "#7086a0",
      "#7a838d",
    ]),
    data(color_tones({ contrast: 85, values: 9 }, color), [
      "#318ff3",
      "#3e8fe7",
      "#498edb",
      "#538dd0",
      "#5b8bc4",
      "#638ab8",
      "#6a88ac",
      "#7186a0",
      "#778494",
    ]),
  ],
  [
    "shades",
    data(color_shades({}, color), ["#105da9", "#042f5a", "#000716"]),
    data(color_shades({ contrast: 75 }, color), [
      "#1160ae",
      "#053463",
      "#010e22",
    ]),
    data(color_shades({ values: 6 }, color), [
      "#1776d3",
      "#105da9",
      "#094580",
      "#042f5a",
      "#021a36",
      "#000716",
    ]),
    data(color_shades({ contrast: 85, values: 9 }, color), [
      "#197ee0",
      "#146cc1",
      "#0f5aa3",
      "#0a4987",
      "#06396b",
      "#032a51",
      "#021b38",
      "#010d20",
      "#00030b",
    ]),
  ],
];

suite(
  "Color Scale Utilities",
  testColorInterpolation,
  testColorBlend,
  testColorMaterial,
  testColorSchemes,
  testColorVariants,
);

const palette = color_interpolation(
  {
    hue: 360,
  },
  color,
);

const testPaletteShift = [
  "Shifting",
  ["reject invalid colors", exception(palette_shift, {}, [color, "invalid"])],
  [
    "shift overall lightness",
    data(palette_shift({ lightness: 20 }, palette), [
      "#cdb6ff",
      "#ff9fff",
      "#ff93c6",
      "#ff9b6e",
      "#ffb75e",
      "#d9d65f",
      "#72ee7c",
      "#6cf4d6",
      "#69e8ff",
      "#6ad2ff",
    ]),
  ],
  [
    "shift overall chroma",
    data(palette_shift({ chroma: 10 }, palette), [
      "#9655ff",
      "#e022ed",
      "#ff0084",
      "#ff0000",
      "#f75600",
      "#a39600",
      "#00b700",
      "#00c295",
      "#00acff",
      "#0085ff",
    ]),
  ],
  [
    "shift overall hue",
    data(palette_shift({ hue: 180 }, palette), [
      "#9a9600",
      "#26ac3b",
      "#00b297",
      "#00a7da",
      "#009be5",
      "#8d81e1",
      "#c75fce",
      "#d6769b",
      "#da7d47",
      "#d37700",
    ]),
  ],
  [
    "shift overall alpha",
    data(palette_shift({ alpha: -30 }, palette), [
      "#9075fab3",
      "#c75fceb3",
      "#e75188b3",
      "#ec592bb3",
      "#d37700b3",
      "#9a9600b3",
      "#24ac3bb3",
      "#00b297b3",
      "#00a7dab3",
      "#1e90ffb3",
    ]),
  ],
];

const testPaletteSort = [
  "Sorting",
  ["reject invalid colors", exception(palette_sort, {}, [color, "invalid"])],
  [
    "sort by lightness",
    data(palette_sort({ by: "lightness" }, palette), [
      "#9075fa",
      "#24ac3b",
      "#e75188",
      "#c75fce",
      "#ec592b",
      "#1e90ff",
      "#9a9600",
      "#d37700",
      "#00a7da",
      "#00b297",
    ]),
    data(palette_sort({ by: "lightness", order: "desc" }, palette), [
      "#00b297",
      "#00a7da",
      "#d37700",
      "#9a9600",
      "#1e90ff",
      "#ec592b",
      "#c75fce",
      "#e75188",
      "#24ac3b",
      "#9075fa",
    ]),
  ],
  [
    "sort by chroma",
    data(palette_sort({ by: "chroma" }, palette), [
      "#00b297",
      "#00a7da",
      "#9a9600",
      "#d37700",
      "#c75fce",
      "#24ac3b",
      "#1e90ff",
      "#e75188",
      "#9075fa",
      "#ec592b",
    ]),
    data(palette_sort({ by: "chroma", order: "desc" }, palette), [
      "#ec592b",
      "#9075fa",
      "#e75188",
      "#1e90ff",
      "#24ac3b",
      "#c75fce",
      "#d37700",
      "#9a9600",
      "#00a7da",
      "#00b297",
    ]),
  ],
  [
    "sort by hue",
    data(palette_sort({ by: "hue" }, palette), [
      "#e75188",
      "#ec592b",
      "#d37700",
      "#9a9600",
      "#24ac3b",
      "#00b297",
      "#00a7da",
      "#1e90ff",
      "#9075fa",
      "#c75fce",
    ]),
    data(palette_sort({ by: "hue", order: "desc" }, palette), [
      "#c75fce",
      "#9075fa",
      "#1e90ff",
      "#00a7da",
      "#00b297",
      "#24ac3b",
      "#9a9600",
      "#d37700",
      "#ec592b",
      "#e75188",
    ]),
  ],
  [
    "sort by alpha",
    data(
      palette_sort(
        { by: "alpha" },
        color_interpolation({ alpha: -50, hue: 195 }, color),
      ),
      [
        "#bf840080",
        "#d772008c",
        "#e7620099",
        "#ed5644a6",
        "#eb5174b3",
        "#e0549ebf",
        "#ce5cc4cc",
        "#b566e2d9",
        "#9573f8e6",
        "#6b81fff2",
      ],
    ),
    data(
      palette_sort(
        { by: "alpha", order: "desc" },
        color_interpolation({ alpha: -50, hue: 195 }, color),
      ),
      [
        "#6b81fff2",
        "#9573f8e6",
        "#b566e2d9",
        "#ce5cc4cc",
        "#e0549ebf",
        "#eb5174b3",
        "#ed5644a6",
        "#e7620099",
        "#d772008c",
        "#bf840080",
      ],
    ),
  ],
];

const testPaletteFilter = [
  "Filtering",
  [
    "reject invalid colors",
    exception(palette_filter, { by: "hue", min: 20, max: 50 }, [
      color,
      "invalid",
    ]),
  ],
  [
    "filter by lightness",
    data(
      palette_filter(
        { by: "lightness", min: 75 },
        color_interpolation({ lightness: 30 }, color),
      ),
      ["#59c1ff", "#63cbff", "#6dd5ff", "#77dfff", "#82e9ff", "#8cf4ff"],
    ),
    data(
      palette_filter(
        { by: "lightness", min: 75, max: 80 },
        color_interpolation({ lightness: 30 }, color),
      ),
      ["#59c1ff"],
    ),
  ],
  [
    "filter by chroma",
    data(
      palette_filter(
        { by: "chroma", min: 22 },
        color_interpolation({ chroma: 40 }, color),
      ),
      ["#006dff", "#005cff", "#0044ff", "#0000ff"],
    ),
    data(
      palette_filter(
        { by: "chroma", min: 22, max: 24 },
        color_interpolation({ chroma: 40 }, color),
      ),
      ["#006dff"],
    ),
  ],
  [
    "filter by hue",
    data(
      palette_filter(
        { by: "hue", min: 90 },
        color_interpolation({ hue: 360 }, color),
      ),
      [
        "#9075fa",
        "#c75fce",
        "#9a9600",
        "#24ac3b",
        "#00b297",
        "#00a7da",
        "#1e90ff",
      ],
    ),
    data(
      palette_filter(
        { by: "hue", min: 90, max: 120 },
        color_interpolation({ hue: 360 }, color),
      ),
      ["#9a9600"],
    ),
  ],
  [
    "filter by alpha",
    data(
      palette_filter(
        { by: "alpha", min: 60 },
        color_interpolation({ alpha: -64 }, color),
      ),
      [
        "#1e90ffef",
        "#1e90ffde",
        "#1e90ffce",
        "#1e90ffbe",
        "#1e90ffad",
        "#1e90ff9d",
      ],
    ),
    data(
      palette_filter(
        { by: "alpha", min: 60, max: 62 },
        color_interpolation({ alpha: -64 }, color),
      ),
      ["#1e90ff9d"],
    ),
  ],
];

const testPaletteContrast = [
  "Contrast Ratio",
  [
    "reject invalid colors",
    exception(palette_contrast, {}, [color, "invalid"]),
  ],
  [
    "AA recommendation",
    data(palette_contrast({}, color_interpolation({}, color)), ["#1e90ff"]),
    data(palette_contrast({}, color_interpolation({ lightness: -80 }, color)), [
      "#0076e3",
      "#005dc8",
      "#0044ad",
      "#002992",
      "#000579",
      "#00005f",
      "#0e0046",
      "#0a002e",
      "#07002a",
    ]),
    data(
      palette_contrast(
        { rating: "AA", enhanced: true },
        color_interpolation({ lightness: -80 }, color),
      ),
      [
        "#005dc8",
        "#0044ad",
        "#002992",
        "#000579",
        "#00005f",
        "#0e0046",
        "#0a002e",
        "#07002a",
      ],
    ),
    data(
      palette_contrast(
        { rating: "AA", enhanced: true, background: "coral" },
        color_interpolation({ lightness: -80 }, color),
      ),
      ["#002992", "#000579", "#00005f", "#0e0046", "#0a002e", "#07002a"],
    ),
  ],
  [
    "AAA recommendation",
    data(
      palette_contrast({ rating: "AAA" }, color_interpolation({}, color)),
      [],
    ),
    data(
      palette_contrast(
        { rating: "AAA" },
        color_interpolation({ lightness: -80 }, color),
      ),
      [
        "#005dc8",
        "#0044ad",
        "#002992",
        "#000579",
        "#00005f",
        "#0e0046",
        "#0a002e",
        "#07002a",
      ],
    ),
    data(
      palette_contrast(
        { rating: "AAA", enhanced: true },
        color_interpolation({ lightness: -80 }, color),
      ),
      [
        "#0044ad",
        "#002992",
        "#000579",
        "#00005f",
        "#0e0046",
        "#0a002e",
        "#07002a",
      ],
    ),
    data(
      palette_contrast(
        { rating: "AAA", enhanced: true, background: "coral" },
        color_interpolation({ lightness: -80 }, color),
      ),
      ["#00005f", "#0e0046", "#0a002e", "#07002a"],
    ),
  ],
];

suite(
  "Palette Utilities",
  testPaletteShift,
  testPaletteSort,
  testPaletteFilter,
  testPaletteContrast,
);

formats.forEach((f) => benchmark(f, color));
benchmark(
  color_adjust,
  { lightness: 30, chroma: 5, hue: 180, alpha: -20 },
  color,
);

benchmark(color_mix, { target: "green", amount: 26 }, color);
benchmark(color_interpolation, { hue: 360, values: 26 }, color);
benchmark(color_blend, { values: 26 }, color);
benchmark(color_material, {}, color);

schemes.forEach((f) => benchmark(f, color));
variants.forEach((f) => benchmark(f, { values: 26 }, color));

benchmark(
  palette_shift,
  {},
  color_interpolation({ hue: 360, values: 26 }, color),
);

benchmark(
  palette_sort,
  {},
  color_interpolation({ hue: 360, values: 26 }, color),
);

benchmark(
  palette_filter,
  { by: "hue", min: 30, max: 120 },
  color_interpolation({ hue: 360, values: 26 }, color),
);

benchmark(
  palette_contrast,
  {},
  color_interpolation({ lightness: -50, values: 26 }, color),
);

init(7);
