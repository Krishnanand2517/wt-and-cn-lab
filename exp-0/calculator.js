const display = document.getElementById("display");
let currentExpression = "0";

function factorial(n) {
  if (n < 0 || n % 1 !== 0) {
    return NaN; // Not defined for negative integers
  }
  if (n === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function updateDisplay() {
  display.textContent = currentExpression;
}

function appendValue(value) {
  if (currentExpression === "0" && value !== ".") {
    currentExpression = value;
  } else {
    currentExpression += value;
  }
  updateDisplay();
}

function appendFunction(funcName) {
  if (currentExpression === "0") {
    currentExpression = funcName + "(";
  } else {
    currentExpression += funcName + "(";
  }
  updateDisplay();
}

function clearDisplay() {
  currentExpression = "0";
  updateDisplay();
}

function clearLastEntry() {
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
  } else {
    currentExpression = "0";
  }
  updateDisplay();
}

function calculateResult() {
  try {
    let expressionToEvaluate = currentExpression
      .split("÷")
      .join("/")
      .split("×")
      .join("*")
      .split("^")
      .join("**")
      .split("sin(")
      .join("Math.sin(")
      .split("cos(")
      .join("Math.cos(")
      .split("tan(")
      .join("Math.tan(")
      .split("log(")
      .join("Math.log10(")
      .split("sqrt(")
      .join("Math.sqrt(")
      .split("factorial(")
      .join("factorial(");

    const result = eval(expressionToEvaluate);

    // Check for invalid results
    if (isNaN(result) || !isFinite(result)) {
      currentExpression = "Error";
    } else {
      // Round the result
      currentExpression = String(parseFloat(result.toPrecision(12)));
    }
  } catch (error) {
    console.error("Calculation Error:", error);
    currentExpression = "Error";
  }
  updateDisplay();
}
