const form = document.querySelector("#bmi-form");
const formError = document.querySelector("#form-error");
const heightMetric = document.querySelector("#height-metric");
const heightImperial = document.querySelector("#height-imperial");
const weightMetric = document.querySelector("#weight-metric");
const weightImperial = document.querySelector("#weight-imperial");
const emptyResult = document.querySelector("#empty-result");
const calculatedResult = document.querySelector("#calculated-result");
const bmiValue = document.querySelector("#bmi-value");
const bmiCategory = document.querySelector("#bmi-category");
const resultMessage = document.querySelector("#result-message");
const scaleMarker = document.querySelector("#scale-marker");
const { calculateBmi, feetAndInchesToCentimeters, getBmiCategory, poundsToKilograms } = window.WellframeCalculators;

const selectedUnits = { height: "cm", weight: "kg" };

function setUnit(group, unit) {
  selectedUnits[group] = unit;
  document.querySelectorAll(`[data-unit-group="${group}"]`).forEach((button) => {
    const isSelected = button.dataset.unit === unit;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (group === "height") {
    heightMetric.classList.toggle("hidden", unit !== "cm");
    heightImperial.classList.toggle("hidden", unit !== "ft");
    heightMetric.setAttribute("aria-hidden", String(unit !== "cm"));
    heightImperial.setAttribute("aria-hidden", String(unit !== "ft"));
  } else {
    weightMetric.classList.toggle("hidden", unit !== "kg");
    weightImperial.classList.toggle("hidden", unit !== "lb");
    weightMetric.setAttribute("aria-hidden", String(unit !== "kg"));
    weightImperial.setAttribute("aria-hidden", String(unit !== "lb"));
  }
  clearError();
}

document.querySelectorAll(".unit-option").forEach((button) => {
  button.addEventListener("click", () => setUnit(button.dataset.unitGroup, button.dataset.unit));
});

function readNumber(id, label) {
  const input = document.getElementById(id);
  const raw = input.value.trim();
  if (!raw) throw new Error(`Please enter your ${label.toLowerCase()}.`);
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`Please enter a valid ${label.toLowerCase()}.`);
  return value;
}

function getHeightCm() {
  if (selectedUnits.height === "cm") {
    const cm = readNumber("height-cm", "height");
    if (cm < 90 || cm > 250) throw new Error("Enter a height between 90 and 250 cm.");
    return cm;
  }
  const feetInput = document.querySelector("#height-ft").value.trim();
  const inchesInput = document.querySelector("#height-in").value.trim();
  if (!feetInput && !inchesInput) throw new Error("Please enter your height.");
  const feet = feetInput ? Number(feetInput) : 0;
  const inches = inchesInput ? Number(inchesInput) : 0;
  if (!Number.isFinite(feet) || !Number.isFinite(inches)) throw new Error("Enter a valid height in feet and inches.");
  if (feet < 0 || feet > 8 || inches < 0 || inches >= 12 || (feet === 0 && inches === 0)) {
    throw new Error("Enter a realistic height: 2–8 feet and less than 12 additional inches.");
  }
  const cm = feetAndInchesToCentimeters(feet, inches);
  if (cm < 90 || cm > 250) throw new Error("Enter a height between 2′ 11″ and 8′ 2″.");
  return cm;
}

function getWeightKg() {
  const weight = selectedUnits.weight === "kg"
    ? readNumber("weight-kg", "weight")
    : poundsToKilograms(readNumber("weight-lb", "weight"));
  if (weight < 20 || weight > 500) {
    throw new Error(selectedUnits.weight === "kg" ? "Enter a weight between 20 and 500 kg." : "Enter a weight between 44.1 and 1,102 lb.");
  }
  return weight;
}

function showError(message) { formError.textContent = message; }

function clearError() {
  formError.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();
  try {
    const heightCm = getHeightCm();
    const weightKg = getWeightKg();
    const bmi = calculateBmi(weightKg, heightCm);
    if (!Number.isFinite(bmi) || bmi <= 0) throw new Error("Those measurements could not be calculated. Please check your entries.");
    const category = getBmiCategory(bmi);
    bmiValue.textContent = bmi.toFixed(2);
    bmiCategory.textContent = category.label;
    resultMessage.textContent = category.message;
    // Map the visible 10–40 BMI range across the scale; values beyond it rest at an endpoint.
    scaleMarker.style.left = `${Math.max(0, Math.min(100, ((bmi - 10) / 30) * 100))}%`;
    emptyResult.classList.add("hidden");
    calculatedResult.classList.remove("hidden");
  } catch (error) {
    showError(error.message);
  }
});

form.addEventListener("reset", () => {
  window.requestAnimationFrame(() => {
    setUnit("height", "cm");
    setUnit("weight", "kg");
    clearError();
    calculatedResult.classList.add("hidden");
    emptyResult.classList.remove("hidden");
  });
});

// Keep the date label purely presentational and local to the device.
const today = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date());
document.querySelector("#today-label").textContent = today.toUpperCase();
