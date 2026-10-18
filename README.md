# Wellframe - Health & Fitness Dashboard

Wellframe is a small, browser-based health and fitness project. It is being built in stages. The current version provides a responsive BMI calculator and a simple dashboard-style interface.

## Objectives

- Make basic health calculations easy to understand.
- Explain the formula and assumptions behind each estimate.
- Keep the first version simple to run and easy to extend.
- Keep calculations in the browser and avoid sending measurements to a server.
- Present BMI as a screening measure, not as a diagnosis or a complete picture of health.

## Features in this version

- BMI calculator with metric and imperial height and weight inputs.
- Input checks for missing, nonnumeric, zero, negative, and unrealistic values.
- BMI result shown to two decimal places, with six adult categories and a visual scale.
- Expandable, category-specific health information with possible risk associations, general lifestyle ideas, and guidance on when to contact a healthcare professional.
- Clear reminders that categories are intended for adults aged 20+ and risk information is not a diagnosis or a prediction.
- Reset button, formula explanation, and health disclaimer.
- Responsive dashboard layout with in-page Overview and Calculators navigation.
- Empty result state before a calculation is made.
- Calculation helper tests for BMI, category boundaries, unit conversion, and invalid values.

The BMI scale is a visual guide covering BMI values from 10 to 50. The marker stops at the ends of the scale for values outside that range.

## Technologies

- HTML5 for page structure and forms.
- CSS3 for styling, responsive layout, and focus states.
- Vanilla JavaScript for form behavior and calculations.
- Node.js built-in test runner for calculation tests.
- Python's built-in HTTP server for local preview (no Python packages required).

No framework, package install, external font, API, or backend is required.

## Folder structure

```text
.
|-- index.html              Main page
|-- css/
|   `-- style.css           Layout, colors, and responsive styles
|-- js/
|   |-- app.js              Form, validation, and page interactions
|   `-- calculators.js      Reusable BMI and unit conversion helpers
|-- tests/
|   `-- bmi.test.cjs        BMI and conversion tests
|-- AGENTS.md               Project architecture and coding rules
|-- CHANGELOG.md            Notable project changes
|-- HANDOFF.md              Current work and next step
|-- PROJECT_STATUS.md       Progress and known limitations
|-- TASK_TRACKER.md         Numbered implementation plan
`-- README.md               This file
```

## Run locally

You need Python 3 to serve the page locally and Node.js 18 or later to run the tests. You do not need to install npm packages.

1. Open this project folder in VS Code.
2. Choose **Terminal > New Terminal**.
3. Start the local web server:

   ```powershell
   python -m http.server 8000 --bind 127.0.0.1
   ```

   On some Windows installations, use `py` instead:

   ```powershell
   py -m http.server 8000 --bind 127.0.0.1
   ```

4. Open this address in your browser: <http://127.0.0.1:8000/>
5. To stop the server, return to the terminal and press **Ctrl+C**.

The page can also be opened directly from `index.html` in a browser. The local server command above is the recommended preview method.

## Test the features

### Automated calculation tests

In a second VS Code terminal, from the project folder, run:

```powershell
node --test tests/bmi.test.cjs
```

The tests cover a known BMI result, the standard adult category boundaries, pounds-to-kilograms and feet/inches-to-centimeters conversion, and invalid helper inputs.

To check JavaScript syntax:

```powershell
node --check js/app.js
node --check js/calculators.js
```

### Manual browser checks

1. Open the local site and confirm the result card starts in its empty state and the health information section is hidden.
2. Use the Overview and Calculators links and confirm each moves to its page section.
3. In metric mode, enter height `170` cm and weight `68` kg. Select **Calculate my BMI**. The result should be `23.53` and the category should be **Healthy weight**.
4. Select `ft / in` and `lb`. Enter `5` feet, `7` inches, and `150` pounds. The result should be `23.49`.
5. Try submitting with a field empty, then try zero or an unrealistic measurement. A clear validation message should appear.
6. Select **Reset**. The inputs should clear, the units should return to cm and kg, and the result should return to its empty state.
7. After calculating, expand **Health Conditions and Risk Information**. Confirm the explanation, possible risks, lifestyle guidance, and consultation note match the displayed category. Reset and calculate again to check another category. Try values that produce BMI 17, 22, 27, 32, 37, and 42 to cover all six categories.

The current version has been checked in headless Chrome for all six categories, category-specific risk information, expand/collapse, reset behavior, and mobile/desktop layouts. The automated test command checks calculation helpers; it does not drive the browser UI.

## BMI formula and categories

BMI is calculated from weight and height:

```text
BMI = weight in kilograms / (height in meters * height in meters)
```

For example, 68 kg and 170 cm gives `68 / (1.7 * 1.7)`, or about `23.53`.

For imperial input, the app first converts pounds to kilograms and feet/inches to centimeters:

```text
kilograms = pounds * 0.45359237
centimeters = (feet * 12 + inches) * 2.54
```

Then it uses the same BMI formula. The calculator classifies the rounded, displayed BMI using these adult screening categories:

| BMI | Category |
| --- | --- |
| Below 18.5 | Underweight |
| 18.5 to below 25 | Normal weight |
| 25 to below 30 | Overweight |
| 30 to below 35 | Obesity Class I |
| 35 to below 40 | Obesity Class II |
| 40 or higher | Obesity Class III |

The category bands follow the international adult BMI classification. This interface is intended only for adults aged 20 and older. The category health risks are possible associations, not predictions. Weight-related risks generally increase across obesity classes, but people in the same category can have different risks. BMI does not distinguish muscle from fat or show where weight is carried. Individual health also depends on age, medical history, waist circumference, and lifestyle. A normal BMI does not guarantee good health. The tool does not diagnose disease or provide medical advice.

Health information is summarized from public health references: [WHO BMI classification](https://publications.iarc.who.int/uploads/media/publication_inline/0001/02/82d18313a09991bbf4135a18f9472379ed1f99d1.pdf), [CDC BMI screening guidance](https://www.cdc.gov/bmi/about/), [CDC information on possible obesity-related conditions](https://www.cdc.gov/obesity/php/about/consequences.html), and [NHS underweight guidance](https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/).

## Privacy and data

- BMI calculations happen locally in your browser.
- This version does not save your measurements and does not send them to a backend.
- The application code has no analytics, tracking, external API, or third-party script requests.
- The Python command serves the project on your own computer at `127.0.0.1`.
- Future dashboard versions may use browser `localStorage`. It is not encrypted and must not be treated as secure storage for sensitive health information.

## Screenshots

Screenshots will be added after they are captured from the finished interface.

- Desktop screenshot: *placeholder - not captured yet*
- Mobile screenshot: *placeholder - not captured yet*

## Future improvements

These features are planned and are not part of the current version:

- BMR, TDEE, calorie, rough ideal-weight, waist-to-height, and water estimates.
- More unit conversions.
- A user profile and local weight history.
- Weight goals, habits, charts, and food/activity journals.
- JSON data export and import, local data deletion controls, and a privacy notice in the app.
- Light and dark themes.
- More browser, keyboard, and responsive layout checks.

## License

No license file has been added yet. Until a license is chosen and included in the repository, do not assume that this project grants permission to reuse or redistribute the code.
