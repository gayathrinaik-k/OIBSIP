const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";
let currentInput = "";
let justCalculated = false;


// ------------------------------------
// Button Events
// ------------------------------------

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const value = button.getAttribute("data-value");

        if (value >= "0" && value <= "9") {
            enterNumber(value);
        }

        else if (value === ".") {
            enterDecimal();
        }

        else if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/"
        ) {
            enterOperator(value);
        }

        else if (value === "=") {
            calculateResult();
        }

        else if (value === "C") {
            clearCalculator();
        }

        else if (value === "DEL") {
            deleteLastCharacter();
        }
    });
});


// ------------------------------------
// Number
// ------------------------------------

function enterNumber(number) {

    if (justCalculated) {
        expression = "";
        currentInput = "";
        justCalculated = false;
    }

    currentInput += number;
    expression += number;

    display.value = expression;
}


// ------------------------------------
// Decimal
// ------------------------------------

function enterDecimal() {

    if (justCalculated) {
        expression = "";
        currentInput = "";
        justCalculated = false;
    }

    if (!currentInput.includes(".")) {

        if (currentInput === "") {
            currentInput = "0";
            expression += "0";
        }

        currentInput += ".";
        expression += ".";

        display.value = expression;
    }
}


// ------------------------------------
// Operator
// ------------------------------------

function enterOperator(operator) {

    if (currentInput === "") {
        return;
    }

    // Don't allow two operators together
    const lastCharacter = expression.slice(-1);

    if (
        lastCharacter === "+" ||
        lastCharacter === "-" ||
        lastCharacter === "*" ||
        lastCharacter === "/"
    ) {
        return;
    }

    let displayOperator = operator;

    if (operator === "*") {
        displayOperator = "×";
    }

    else if (operator === "/") {
        displayOperator = "÷";
    }

    else if (operator === "-") {
        displayOperator = "−";
    }

    expression += operator;
    currentInput = "";

    display.value = expression.replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−");
}


// ------------------------------------
// Calculate Result
// ------------------------------------

function calculateResult() {

    if (expression === "") {
        return;
    }

    const lastCharacter = expression.slice(-1);

    // Don't calculate if expression ends with operator
    if (
        lastCharacter === "+" ||
        lastCharacter === "-" ||
        lastCharacter === "*" ||
        lastCharacter === "/"
    ) {
        return;
    }


    const numbers = expression.split(/[+\-*/]/);
    const operators = expression.match(/[+\-*/]/g);


    if (!numbers || numbers.length === 0) {
        return;
    }


    let result = parseFloat(numbers[0]);


    // Sequential calculation
    for (let i = 0; i < operators.length; i++) {

        const nextNumber = parseFloat(numbers[i + 1]);

        switch (operators[i]) {

            case "+":
                result = result + nextNumber;
                break;

            case "-":
                result = result - nextNumber;
                break;

            case "*":
                result = result * nextNumber;
                break;

            case "/":

                if (nextNumber === 0) {

                    display.value = "Cannot divide by zero";

                    expression = "";
                    currentInput = "";
                    justCalculated = true;

                    return;
                }

                result = result / nextNumber;
                break;
        }
    }


    display.value = result;

    expression = result.toString();
    currentInput = result.toString();

    justCalculated = true;
}


// ------------------------------------
// Clear
// ------------------------------------

function clearCalculator() {

    expression = "";
    currentInput = "";
    justCalculated = false;

    display.value = "0";
}


// ------------------------------------
// Delete
// ------------------------------------

function deleteLastCharacter() {

    if (justCalculated) {
        clearCalculator();
        return;
    }

    if (expression.length === 0) {
        return;
    }

    const lastCharacter = expression.slice(-1);

    expression = expression.slice(0, -1);


    if (
        lastCharacter === "+" ||
        lastCharacter === "-" ||
        lastCharacter === "*" ||
        lastCharacter === "/"
    ) {
        currentInput = "";
    }

    else {
        currentInput = currentInput.slice(0, -1);
    }


    display.value = expression
        .replace(/\*/g, "×")
        .replace(/\//g, "÷")
        .replace(/-/g, "−");

    if (expression === "") {
        display.value = "0";
    }
}
