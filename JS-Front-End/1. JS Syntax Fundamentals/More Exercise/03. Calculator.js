function calculate(num1, operator, num2) {
    const calculator = {
        '+': (num1, num2) => num1 + num2,
        '-': (num1, num2) => num1 - num2,
        '*': (num1, num2) => num1 * num2,
        '/' : (num1, num2) => {
            if (num2 !== 0)
                return num1 / num2;
        }
    }
    const result = calculator[operator](num1, num2);
    console.log(result.toFixed(2));
}

calculate(5, '+', 10);
calculate(25.5, '-', 3)