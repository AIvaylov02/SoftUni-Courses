function subtract() {
    const firstNumber = Number(document.getElementById('firstNumber').value);
    const secondNumber = Number(document.getElementById('secondNumber').value);

    const resultValue = firstNumber - secondNumber;
    document.getElementById('result').textContent = resultValue;
}
