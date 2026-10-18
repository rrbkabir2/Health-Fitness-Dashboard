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

  /** WHO international adult screening groups; intended for adults aged 20+. */
  function getBmiCategory(bmi) {
    if (!Number.isFinite(bmi) || bmi <= 0) throw new RangeError("BMI must be a positive finite number.");
    // Classify the same rounded value shown in the interface so the label and result never disagree.
    const shownBmi = Number(bmi.toFixed(2));
    const categories = [
      {
        max: 18.5,
        label: "Underweight",
        explanation: "A BMI below 18.5 is in the adult underweight range. BMI alone cannot show why a person's weight is low.",
        risks: ["Nutritional deficiencies", "Anemia", "Weakened immune function", "Reduced muscle strength", "Increased risk of bone problems"],
        lifestyle: ["Choose regular meals with a variety of nutrient-rich foods.", "If weight gain is appropriate, ask a healthcare professional for a safe, individual plan.", "Choose movement that feels safe and suitable for you."],
        consult: "Consider speaking with a healthcare professional if you have unexpected weight loss, ongoing weakness or fatigue, appetite changes, or concerns about nutrition."
      },
      {
        max: 25,
        label: "Normal weight",
        explanation: "This BMI range is generally associated with lower weight-related health risks. A normal BMI does not guarantee good health or rule out other conditions.",
        risks: ["This range is generally associated with lower weight-related risks.", "Blood pressure, cholesterol, blood sugar, family history, and other factors still matter."],
        lifestyle: ["Continue balanced eating, regular activity that suits your abilities, and healthy sleep habits.", "Use routine health visits to review concerns and recommended checks."],
        consult: "A healthcare professional can help with any symptoms or health concerns, whatever your BMI."
      },
      {
        max: 30,
        label: "Overweight",
        explanation: "This BMI range can be associated with a higher chance of some weight-related health conditions. It does not mean that you have any of them.",
        risks: ["Type 2 diabetes", "High blood pressure", "High cholesterol", "Cardiovascular disease", "Fatty liver disease"],
        lifestyle: ["Aim for varied, balanced meals and regular movement that fits your health and abilities.", "Sleep and stress habits can also be part of overall health.", "Focus on sustainable routines rather than a promised amount or speed of weight change."],
        consult: "Consider discussing your overall risk with a healthcare professional, especially if you have symptoms, existing conditions, or a family history of related conditions."
      },
      {
        max: 35,
        label: "Obesity Class I",
        explanation: "This BMI range is associated with a greater likelihood of some weight-related health complications. BMI is only one screening measure and cannot tell your personal risk.",
        risks: ["Type 2 diabetes", "Cardiovascular disease and high blood pressure", "Sleep apnea", "Joint problems", "Fatty liver disease"],
        lifestyle: ["Build manageable routines around balanced meals, movement, sleep, and wellbeing.", "A healthcare professional can help adapt any changes to your needs and medical history.", "Avoid extreme diets or exercise changes without professional guidance."],
        consult: "Consider speaking with a healthcare professional to review your individual health factors and discuss appropriate support."
      },
      {
        max: 40,
        label: "Obesity Class II",
        explanation: "The likelihood of weight-related complications generally increases across obesity classes, but this category does not predict whether an individual will develop a condition.",
        risks: ["Type 2 diabetes", "Cardiovascular disease and high blood pressure", "Sleep apnea", "Joint problems", "Fatty liver disease"],
        lifestyle: ["Choose realistic, supportive habits that can fit your daily life and abilities.", "A healthcare professional can help create a safe plan based on your history and preferences.", "Avoid extreme diets or exercise changes without professional guidance."],
        consult: "It may be helpful to arrange a conversation with a healthcare professional about screening, symptoms, and support options."
      },
      {
        max: Infinity,
        label: "Obesity Class III",
        explanation: "This is the highest adult BMI obesity class. Weight-related complications are generally more likely as obesity class increases, but BMI alone cannot determine an individual's health or diagnosis.",
        risks: ["Type 2 diabetes", "Cardiovascular disease and high blood pressure", "Sleep apnea", "Joint problems", "Fatty liver disease"],
        lifestyle: ["Focus on supportive, sustainable routines that fit your health and abilities.", "A healthcare professional can help tailor care and discuss support options without relying on BMI alone.", "Avoid extreme diets or exercise changes without professional guidance."],
        consult: "Consider arranging a healthcare visit to discuss your personal risk factors, any symptoms, and options that suit your circumstances."
      }
    ];
    const category = categories.find((item) => shownBmi < item.max);
    return { ...category, bmi: shownBmi };
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
