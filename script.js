
//operators for calculator
let add = function (a, b) {
  return a + b;
}
let subtract = function (a, b) {
  return a - b;
}
let multiply = function (a, b) {
  return a * b;
}
let divide = function (a, b) {
  return a / b;
}

//general function to call the above operators
let operate = function (a, b, operator) {
  return operator(a, b);
}

const displayContent = document.getElementById("displayNumber");
//display value on the screen
let displayValue = function () {
  let displayButtons = document.querySelectorAll('.numButton');

  for (const button of displayButtons) {
    button.addEventListener("click", () => {
      displayContent.innerHTML = displayContent.innerHTML + button.innerHTML;
    })
  }

}
let clearDisplay = function () {
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", () => {
    displayContent.innerHTML = "";
  })
}

displayValue();
clearDisplay();
