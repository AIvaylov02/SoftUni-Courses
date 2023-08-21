function modifyNumber(num) {

    function sumDigits(num) {
        if (num == 0)
            return 0;
        return num % 10 + sumDigits(Math.floor(num / 10));
    }
    
    function getDigitsCount(num) {
        let digitsCount = 0;
        while (num !== 0) {
            num = Math.floor(num / 10);
            digitsCount++;
        }
        return digitsCount;
    }

    function calculateAverage(num) {
        const digitsCount = getDigitsCount(num);
        if (digitsCount === 0)
            return 0;
        return sumDigits(num) / digitsCount;
    }

    let average = calculateAverage(num);
    const AVERAGE_THRESHHOLD = 5;
    const EPSILON = 0.000000001;
    const DIGIT_TO_APPEND_FOR_CALIBRATION = 9;
    
    while (average < AVERAGE_THRESHHOLD || (Math.abs(average - AVERAGE_THRESHHOLD) < EPSILON)) {
        num = num * 10 + DIGIT_TO_APPEND_FOR_CALIBRATION;
        average = calculateAverage(num);
    }
    console.log(num);
}

modifyNumber(101);
console.log('\n');
modifyNumber(5835);