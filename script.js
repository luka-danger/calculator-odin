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
        // Get last value from string and remove 
        this.current = this.current.toString().slice(0, -1);
    }
    appendNumber(number) {
        // Prevent multiple decimal points from being added 
        if (number === '.' && this.current.includes('.')) return; 
        // Continuously add numbers to display
        this.current = this.current.toString() + number.toString();
    }
    chooseOperation(operation) {
        // Prevent selecting operator if no operand selected
        if (this.current === '') return; 
        if (this.previous != '') {
            this.compute()
        }
        this.operation = operation;
        this.previous = this.current; 
        this.current = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        // Prevent code from running if user clicks '=' w/o 2nd operand 
        if (isNaN(prev) || isNaN(curr)) return;
        // Switch / Case (Think: multiple if statements chained on single object)
        // Assigns .operation ('+') to execute code inside of case
        switch (this.operation) {
            case '+': 
                computation = prev + curr
                break
            case '-': 
                computation = prev - curr
                break
            case 'x': 
                computation = prev * curr
                break
            case '/': 
                computation = prev / curr
                break
            default: 
                return 
        }
        // Calculator will display computation 
        this.current = computation;
        // Sets operation to non-selected
        this.operation = undefined;
        // Clears previous operand 
        this.previous = '';
    }
    
    getDisplayNumber(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        // Split string on decimal character
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    } 

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.current);
        if (this.operation != null) {
            this.previousTextElement.innerText = 
                `${this.getDisplayNumber(this.previous)} ${this.operation}`
        } else {
            this.previousTextElement.innerText = '';
        }
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
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
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})