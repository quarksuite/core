// [[file:Mod.org::*Numeric Color Scale][Numeric Color Scale:1]]
export function NumericColorScale(data) {
  return data.reduce(
    (acc, value, index) => ({ ...acc, [`${++index}`.padEnd(3, "0")]: value }),
    {},
  );
}
// Numeric Color Scale:1 ends here

// [[file:Mod.org::*Modular Scale Types][Modular Scale Types:1]]
export function BidirectionalScale(keys, data) {
  const [x, d] = keys;
  const [multiply, divide] = Array.from(data);
  return {
    ...VariantScale(x, multiply),
    ...VariantScale(d, divide),
  };
}

export function UnidirectionalScale(key, data) {
  return VariantScale(key, data);
}

export function RangedScale(
  [rangeKey, floorKey] = ["fragment", "min"],
  [base, range, min],
) {
  return {
    base,
    [rangeKey]: range,
    [floorKey]: min,
  };
}

function VariantScale(key, [, ...values]) {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [[key, index + 2].join("")]: value,
    }),
    {},
  );
}
// Modular Scale Types:1 ends here
