function printNumberMatrix(number) {
    for (let i = 0; i < number; i++)
        console.log(`${number} `.repeat(number-1) + number);
}

printNumberMatrix(3);
printNumberMatrix(5);