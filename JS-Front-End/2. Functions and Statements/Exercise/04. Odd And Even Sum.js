function CalculateEvenAndOddNumbers(number) {
    let oddSum = 0;
    let evenSum = 0;
    while (number != 0) {
        let remainder = number % 10;
        if (remainder % 2 === 0)
            evenSum += remainder;
        else
            oddSum += remainder;

        number = Math.floor(number / 10);
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

CalculateEvenAndOddNumbers(1000435);
CalculateEvenAndOddNumbers(3495892137259234);