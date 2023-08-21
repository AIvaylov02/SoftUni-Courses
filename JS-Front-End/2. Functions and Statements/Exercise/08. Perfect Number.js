function isPerfectNumberResult(number) {
    
    // helper function, which will return an array of divisors of the given number
    function GetDivisors(number) {
        result = [];
        for (let i = 1; i < number; i++) {
            if (number % i === 0)
                result.push(i);
        }
        return result;
    }

    
    function SumArray(arr) {
        let sum = 0;
        for (let num of arr)
            sum += num;
        return sum;
    }

    function isPerfectNumber(number) {
        if (number <= 0)
            return false;
        return SumArray(GetDivisors(number)) === number;
    }
    
    if (isPerfectNumber(number))
        console.log("We have a perfect number!");
    else
        console.log("It's not so perfect.");
}

isPerfectNumberResult(6);
isPerfectNumberResult(28);
isPerfectNumberResult(1236498);