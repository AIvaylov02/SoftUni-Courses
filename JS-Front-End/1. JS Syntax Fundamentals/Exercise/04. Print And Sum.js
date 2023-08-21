function PrintAndSumInterval(lowerLimit, upperLimit) {
    sum = 0;
    interval = [];
    while (lowerLimit <= upperLimit)
    {
        interval.push(lowerLimit);
        sum += lowerLimit;
        lowerLimit++;
    }
    console.log(interval.join(' '));
    console.log(`Sum: ${sum}`);
}