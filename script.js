class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }
    delete() {

    }
    appendNumber(number) {
        this.current = number;
    }
    chooseOperation(operation) {

    }
    compute() {

    }
    updateDisplay() {
        this.currentTextElement.innerText = this.current;
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operations]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement, currentTextElement) 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

/*
const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b; 
};

const multiply = function(a, b) {
  return a * b; 
};

const divide = function(a, b) {
    return a / b; 
  };

const operate = (operator, a, b) {
    let a = Number(a);
    let b = Number(b); 
    switch(operator) {
        case +:
            return add(a, b); 
        case -: 
            return subtract(a, b);
        case *:
            return multiply(a, b); 
        case /: 
            if (b === 0) {
                return undefined
            } else {
                return divide(a, b);
            }
    }
}; 
*/