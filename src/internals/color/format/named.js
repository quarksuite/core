// [[file:../../../../README.org::*W3C-X11][W3C-X11:1]]
import { X11Colors } from "../../../data/color/w3c-x11.js";

/** Validate: W3C X11 named colors */
export const validate = (color) => !!X11Colors[color];
// W3C-X11:1 ends here
