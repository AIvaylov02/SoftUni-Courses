function SortNumbers(arr) {
    arr = arr.sort(function compareFn(a, b) {
        if (a < b)
            return -1;
        else if (a === b)
            return 0;
        else
            return 1;
    }); // sort the array at first glance to make a new one possible
    sortedArr = [];
    isSmallNumbersTurn = true;
    let element = undefined;
    while (arr.length != 0) {
        if (isSmallNumbersTurn) { // if it is even turn than pop from front and add to back
            element = arr.shift();
            isSmallNumbersTurn = false;
        } else {
            element = arr.pop();
            isSmallNumbersTurn = true;
        }

        sortedArr.push(element);
    }

    return sortedArr;
}

console.log(SortNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));