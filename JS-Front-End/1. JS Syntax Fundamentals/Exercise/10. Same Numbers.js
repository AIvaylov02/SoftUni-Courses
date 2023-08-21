function CheckSimilarDigits(num) {
    if (num === 0) {
        console.log(true);
        console.log(0);
        return;
    }

    sum = 0;
    areSimilar = true;
    convertedNum = []
    while (num != 0) { // calculate the sum and create the num array
        sum += num % 10;
        convertedNum.unshift(num % 10);
        num = Math.floor(num / 10);
    }

    if (convertedNum.length > 1) {
        digit = convertedNum[0];
        while (convertedNum.length != 0) {
            toBeCompared = convertedNum.pop();
            if (toBeCompared !== digit) {
                areSimilar = false;
                break;
            }
        }
    }
    
    console.log(areSimilar);
    console.log(sum);
}