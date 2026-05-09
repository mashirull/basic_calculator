const result = document.getElementById("result");
const history = document.getElementById("history");

function appendValue(value) {
  if (result.value === "0" && value !== ".") {
    result.value = value;
  } else {
    result.value += value;
  }
}

function clearDisplay() {
  result.value = "0";
  history.innerText = "";
}

function deleteLast() {
  result.value = result.value.slice(0, -1);

  if (result.value === "") {
    result.value = "0";
  }
}

function calculate() {
  try {
    let expression = result.value;

    // Replace percentage
    expression = expression.replace(/%/g, "/100");

    // Check division by zero
    if (expression.includes("/0")) {
      throw new Error("Cannot divide by zero");
    }

    let answer = eval(expression);

    history.innerText = result.value + " =";
    result.value = answer;

  } catch (error) {
    result.value = "Error";
  }
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const allowedKeys = [
    "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".",
    "%"
  ];

  if (allowedKeys.includes(e.key)) {
    appendValue(e.key);
  }

  else if (e.key === "Enter") {
    calculate();
  }

  else if (e.key === "Backspace") {
    deleteLast();
  }

  else if (e.key === "Escape") {
    clearDisplay();
  }
});