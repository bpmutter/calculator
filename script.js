
//operators for calculator
let add = function (a, b) {
  a = Number(a);
  b = Number(b);
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
  if (operator == "add") return add(a, b);
  if (operator == "subtract") return subtract(a, b);
  if (operator == "multiply") return multiply(a, b);
  if (operator == "divide") return divide(a, b);
  else return console.log("ERROR with operator");

}

const displayContent = document.getElementById("displayNumber");
//display value on the screen
let displayButtons = document.querySelectorAll('.numButton');
for (const button of displayButtons) {
  button.addEventListener("click", () => {
    displayContent.innerHTML += button.innerHTML;
  });
}
let operatorName; //set operator name to be used in compute function below
let operatorOn = false; //determine if operator in use for calculations with multiple operators
const operators = document.querySelectorAll(".operator");
for (let operator of operators) {
  operator.addEventListener("click", () => {
    if (operatorOn == true) {
      computeVal();
    }
    operatorName = operator.name;
    displayContent.innerHTML += operator.innerHTML;
    operatorOn = true;
  });
}

let compute = document.getElementById("equals");
compute.addEventListener("click", () => {
  if (operatorOn == true) {
    computeVal();
  }
  else return;
});

let computeVal = function () {
  const re = /\*|\+|\/|-/;
  const contentArr = displayContent.innerHTML.split(re);

  let num1 = contentArr[0];
  let num2 = contentArr[1];

  let solutionVal = operate(num1, num2, operatorName);
  solutionVal = cleanSolution(solutionVal);
  displayContent.innerHTML = solutionVal;
  operatorOn = false;
}

//support function for compute to make solution pretty
const cleanSolution = function (solution) {
  solution = Math.round(solution * 100) / 100;
  return solution;
}


let clearDisplay = function () {
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", () => {
    displayContent.innerHTML = "";
    operatorOn = false;
  });
}

let deleteVal = function () {
  const deleteButton = document.getElementById("delete");
  deleteButton.addEventListener("click", () => {
    displayContent.innerHTML = displayContent.innerHTML.substring(0,
      displayContent.innerHTML.length - 1);
  });

}

clearDisplay();
deleteVal();
