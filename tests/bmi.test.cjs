const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateBmi, feetAndInchesToCentimeters, getBmiCategory, poundsToKilograms } = require("../js/calculators.js");

test("BMI uses kilograms and meters and preserves precision", () => {
  assert.equal(calculateBmi(68, 170).toFixed(2), "23.53");
});

test("adult BMI category boundaries use standard cutoffs", () => {
  assert.equal(getBmiCategory(18.49).label, "Underweight");
  assert.equal(getBmiCategory(18.5).label, "Healthy weight");
  assert.equal(getBmiCategory(24.99).label, "Healthy weight");
  assert.equal(getBmiCategory(25).label, "Overweight");
  assert.equal(getBmiCategory(29.99).label, "Overweight");
  assert.equal(getBmiCategory(30).label, "Obesity");
});

test("imperial measurements convert to metric", () => {
  assert.equal(poundsToKilograms(150), 68.0388555);
  assert.equal(feetAndInchesToCentimeters(5, 7), 170.18);
});

test("calculation helpers reject invalid values", () => {
  assert.throws(() => calculateBmi(0, 170), RangeError);
  assert.throws(() => calculateBmi(Number.NaN, 170), TypeError);
  assert.throws(() => getBmiCategory(-1), RangeError);
});
