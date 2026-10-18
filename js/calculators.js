/* Shared calculations work both in a browser script and in Node tests. */
(function (root, factory) {
  const calculations = factory();
  if (typeof module === "object" && module.exports) module.exports = calculations;
  else root.WellframeCalculators = calculations;
})(globalThis, function () {
  /** BMI screening calculation using metric inputs. */
  function calculateBmi(weightKg, heightCm) {
    if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm)) {
      throw new TypeError("Weight and height must be finite numbers.");
    }
    if (weightKg <= 0 || heightCm <= 0) {
      throw new RangeError("Weight and height must be greater than zero.");
    }
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  }

  /** Standard adult screening groups; not intended for children or teens. */
  function getBmiCategory(bmi) {
    if (!Number.isFinite(bmi) || bmi <= 0) throw new RangeError("BMI must be a positive finite number.");
    if (bmi < 18.5) return { label: "Underweight", message: "BMI is below the standard adult reference range." };
    if (bmi < 25) return { label: "Healthy weight", message: "BMI falls within the standard adult reference range." };
    if (bmi < 30) return { label: "Overweight", message: "BMI is above the standard adult reference range." };
    return { label: "Obesity", message: "BMI is in the obesity range of the standard adult screening categories." };
  }

  function poundsToKilograms(pounds) {
    if (!Number.isFinite(pounds)) throw new TypeError("Pounds must be a finite number.");
    return pounds * 0.45359237;
  }

  function feetAndInchesToCentimeters(feet, inches) {
    if (!Number.isFinite(feet) || !Number.isFinite(inches)) throw new TypeError("Feet and inches must be finite numbers.");
    return (feet * 12 + inches) * 2.54;
  }

  return Object.freeze({ calculateBmi, getBmiCategory, poundsToKilograms, feetAndInchesToCentimeters });
});
