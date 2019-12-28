
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
  a = Number(a);
  b = Number(b);
  if (operator == "add") return add(a, b);
  if (operator == "subtract") return subtract(a, b);
  if (operator == "multiply") return multiply(a, b);
  if (operator == "divide") return divide(a, b);
  else return console.log("ERROR with operator");

}

//variable to show the numbers on screen
const displayContent = document.getElementById("displayNumber");

//numbers to be used in the calculations
let firstNum = "";
let secondNum = "";

let operatorName; //set operator name to be used in compute function below
let operatorOn = false; //determine if operator in use for calculations with multiple operators

//display value on the screen
let displayButtons = document.querySelectorAll('.numButton');
for (const button of displayButtons) {
  button.addEventListener("click", () => {

    if (operatorOn == false) {
      if (firstNum.toString().includes(".") && button.name == "decimal") {
        alert("only 1 decimal point per number pls!")
      }
      else {
        firstNum += button.innerHTML;
        displayContent.innerHTML = cleanNumber(firstNum);
        console.log("first num is " + firstNum);
      }
    }
    else if (operatorOn == true) {
      if (secondNum.toString().includes(".") && button.name == "decimal") {
        alert("only 1 decimal point per number pls!")
      }
      else {
        secondNum += button.innerHTML;
        displayContent.innerHTML = cleanNumber(secondNum);
        console.log("second num is " + secondNum)
      }
    }
    else return;



  });
}

let operators = document.querySelectorAll(".operator");
for (let operator of operators) {
  operator.addEventListener("click", () => {
    if (operatorOn == true && secondNum === "") {
      clearOperatorColor();
    }
    else if (operatorOn == true && secondNum !== "") {
      computeVal();
    }
    operatorName = operator.name;
    operator.style.backgroundColor = "green";
    operatorOn = true;
  });
}

let compute = document.getElementById("equals");
compute.addEventListener("click", () => {
  if (operatorOn == true && secondNum === "") {
    secondNum = firstNum;
    computeVal();
  }
  else if (operatorOn == true) {
    computeVal();
  }
  else return;
});

let computeVal = function () {
  if (operatorName == "divide" && secondNum == 0) {
    alert("You can't divide by 0!!");
    resetCalc();
  }
  else {
    let solutionVal = operate(firstNum, secondNum, operatorName);
    solutionVal = cleanSolution(solutionVal);
    firstNum = solutionVal;
    displayContent.innerHTML = firstNum;
    secondNum = "";
    operatorOn = false;
    clearOperatorColor();
  }
}

//support function for compute to make solution pretty
const cleanSolution = function (solution) {
  solution = Math.round(solution * 1000) / 1000;
  solution = cleanNumber(solution);
  return solution;
}

//support function to remove color from active operator
const clearOperatorColor = function () {
  for (let i = 0; i < operators.length; i++) {
    operators[i].style.backgroundColor = "#0F1B16";
  }
}
//suppport function to make sure that numbers fit within the box and don't have anythign weird
const cleanNumber = function (num) {
  if (num.toString().length > 9) {
    let numClean = Number.parseFloat(num).toExponential(3);
    return numClean;
  }
  else return num;
}


const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  resetCalc();
});

//support fxn to reset calculator
const resetCalc = function () {
  firstNum = "";
  secondNum = "";
  operatorName = "";
  displayContent.innerHTML = "";
  operatorOn = false;
  clearOperatorColor();
}


const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
  if (operatorOn == false) {
    firstNum = firstNum.toString().substring(0, firstNum.toString().length - 1)
    displayContent.innerHTML = firstNum;

  }
  else if (operatorOn == true) {
    secondNum = secondNum.toString().substring(0, secondNum.toString().length - 1)
    displayContent.innerHTML = secondNum;
  }
});
