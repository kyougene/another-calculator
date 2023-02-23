const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const allClearButton = document.querySelector('#allclear');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('#equal');
const displayBottom = document.querySelector('.bottom');
const displayTop = document.querySelector('.top');

class Calculator {
    constructor (prevOperandTextElement, currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.prevOperandTextElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }

    compute() {
        let result; 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation){
            case '+':
                result = prev + current;
                break
            case '-':
                result = prev - current;
                break
            case '÷':
                result = prev / current;
                break
            case '*':
                result = prev * current;
            default: 
                return;
        }
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    allClear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
}

const calculator = new Calculator (displayTop, displayBottom);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', ()=>{
    calculator.allClear();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener ('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', ()=> {
    calculator.compute();
    calculator.updateDisplay();
})