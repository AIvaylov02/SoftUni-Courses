function PrintNthElements(array, step) {
    nthElements = [];
    for (let i = 0; i < array.length; i += step)
        nthElements.push(array[i]);
    return nthElements;
}