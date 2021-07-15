import { describe, expect, it, run } from "https://deno.land/x/tincan/mod.ts";
import { Maven } from "https://deno.land/x/merlin/mod.ts";

const setup = new Maven();

export function string(actual, desired) {
  return expect(actual).toBe(desired);
}

export function data(actual, desired) {
  return expect(actual).toEqual(desired);
}

export function exception(fn, ...args) {
  return expect(() => fn(...args)).toThrow();
}

export function suite(context, ...scenarios) {
  return describe(context, () =>
    scenarios.forEach(([desc, ...tests]) =>
      describe(desc, () =>
        tests.forEach(([desc, test]) => it(desc, () => test))
      )
    )
  );
}

export function benchmark(func, ...args) {
  return setup.Bench({
    name: func.name,
    fn() {
      return func(...args);
    },
    steps: 100,
  });
}

export function init(results = 7) {
  return setup.runBench().then(setup.Result(results)).then(run());
}
