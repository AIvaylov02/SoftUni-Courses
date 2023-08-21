function FactorialDivison(biggerNum, smallerNum) {
    // the idea is to only calculate the difference 
    // between the two factorials as otherwise the 
    // numbers rise faster than exponential, so we shouldn't calculate them before hand
    // 4! / 2! can be expressed as (4*3*2*1) / (2*1) which is the same as 4*3 or product(from lowerBoundDiff, to upperBoundDiff)

    let needsToBeReciprocrial = false;
    let difference = 1; // if biggerNum === smallerNum, this is the base operator of multiplication
    if (biggerNum < smallerNum) {
        let temp = biggerNum;
        biggerNum = smallerNum;
        smallerNum = temp;
        needsToBeReciprocrial = true;
    }
        
    for (let i = smallerNum + 1; i <= biggerNum; i++)
        difference *= i;
    
    if (needsToBeReciprocrial)
        console.log((1 / difference).toFixed(2));
    else
        console.log(difference.toFixed(2));
}

FactorialDivison(5, 2);
FactorialDivison(6, 2);
FactorialDivison(2, 4);