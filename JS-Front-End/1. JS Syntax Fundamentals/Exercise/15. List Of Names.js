function sortNames(arr) {

    arr.sort();

    let index = 1;
    for (let word of arr) {
        console.log(`${index}.${word}`);
        index++;
    }
}

sortNames(["John", "Bob", "Christina", "Ema"])
// TODOOOOO, corner case somewhere