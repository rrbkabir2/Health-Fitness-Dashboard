const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateBmi, feetAndInchesToCentimeters, getBmiCategory, poundsToKilograms } = require("../js/calculators.js");

test("BMI uses kilograms and meters and preserves precision", () => {
  assert.equal(calculateBmi(68, 170).toFixed(2), "23.53");
});

test("adult BMI categories match the displayed WHO classification boundaries", () => {
  assert.equal(getBmiCategory(18.49).label, "Underweight");
  assert.equal(getBmiCategory(18.5).label, "Normal weight");
  assert.equal(getBmiCategory(24.99).label, "Normal weight");
  assert.equal(getBmiCategory(25).label, "Overweight");
  assert.equal(getBmiCategory(29.99).label, "Overweight");
  assert.equal(getBmiCategory(30).label, "Obesity Class I");
  assert.equal(getBmiCategory(34.99).label, "Obesity Class I");
  assert.equal(getBmiCategory(35).label, "Obesity Class II");
  assert.equal(getBmiCategory(39.99).label, "Obesity Class II");
  assert.equal(getBmiCategory(40).label, "Obesity Class III");
});

test("category and health guidance match the displayed rounded BMI", () => {
  const result = getBmiCategory(24.999);
  assert.equal(result.bmi, 25);
  assert.equal(result.label, "Overweight");
  assert.ok(result.risks.includes("Type 2 diabetes"));
  assert.ok(result.lifestyle.length > 0);
  assert.ok(result.consult.length > 0);
});

test("each BMI category provides non-diagnostic information and guidance", () => {
  for (const bmi of [17, 22, 27, 32, 37, 42]) {
    const result = getBmiCategory(bmi);
    assert.ok(result.explanation.length > 0);
    assert.ok(result.risks.length > 0);
    assert.ok(result.lifestyle.length > 0);
    assert.ok(result.consult.length > 0);
  }
  const normal = getBmiCategory(22);
  assert.match(normal.explanation, /lower weight-related health risks/i);
  assert.match(normal.explanation, /does not guarantee/i);
  assert.match(getBmiCategory(37).explanation, /generally increases/i);
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
