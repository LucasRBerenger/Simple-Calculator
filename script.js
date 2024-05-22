document.addEventListener('DOMContentLoaded', () => {

    const display = document.getElementById('number');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let operator = '';
    let firstNumber = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                // Numbers and decimal point
                currentInput += value;
                display.value = currentInput;
            } else if (value === 'C') {
                // Clear all
                currentInput = '';
                operator = '';
                firstNumber = '';
                display.value = '';
            } else if (value === 'DEL') {
                // Erase last character
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (value === '=') {
                // Do operation
                if (firstNumber !== '' && operator !== '' && currentInput !== '') {
                    const result = calculate(Number(firstNumber), Number(currentInput), operator);
                    display.value = result;
                    currentInput = result.toString();
                    operator = '';
                    firstNumber = '';
                } else if (firstNumber !== '' && operator !== '') {
                    const result = calculateSpecial(Number(firstNumber), operator);
                    display.value = result;
                    currentInput = result.toString();
                    operator = '';
                    firstNumber = '';
                }
            } else {
                // Operators (+, -, ×, ÷, %)
                if (currentInput !== '') {
                    if (firstNumber === '') {
                        firstNumber = currentInput;
                    } else {
                        firstNumber = calculate(Number(firstNumber), Number(currentInput), operator);
                        display.value = firstNumber;
                    }
                    currentInput = '';
                }
                operator = value;
            }
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '×':
                return num1 * num2;
            case '÷':
                return num1 / num2;
            case '%':
                return num1 / 100;
            case '√':
                return Math.sqrt(num1);
            default:
                return 0;
        }
    }

    function calculateSpecial(num1, operator) {
        switch (operator) {
            case '%':
                return num1 / 100;
            case '√':
                return Math.sqrt(num1);
            default:
                return 0;
        }
    }
    // The program does not exhibit the operator symbol or the second number, for way to simplify logics
    // For special operators, first put number, after operator, and then equal
});
