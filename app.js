let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const display = document.querySelector(".display");

function buttonClicked(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  display.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case "-":
    case "+":
    case "*":
    case "/":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // Allow negative numbers at the start
    if (symbol === "-") {
      buffer = "-";
    }
    return;
  }

  const floatBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "";
}

function flushOperation(floatBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += floatBuffer;
      break;
    case "-":
      runningTotal -= floatBuffer;
      break;
    case "*":
      runningTotal *= floatBuffer;
      break;
    case "/":
      if (floatBuffer !== 0) {
        runningTotal /= floatBuffer;
      } else {
        display.innerText = "Error";
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        return;
      }
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClicked(event.target.innerText);
    });
}

init();
