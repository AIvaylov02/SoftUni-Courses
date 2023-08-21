function calculate(x, y, z) {

    function sum() {
        return x + y;
    }

    function subtract() {
        return sum() - z;
    }

    return subtract();
}

console.log(calculate(10, 2, 3));