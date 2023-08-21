function printDNA (helixRows) {
    // sadly it could also be hardcoded, but we will try to avoid that
    function generateRow(endChar, endCharRepeatsAtSide, letters, midChar, midCharRepeatsInMiddle) {
        return endChar.repeat(endCharRepeatsAtSide) + letters[0] + midChar.repeat(midCharRepeatsInMiddle) + letters[1] + endChar.repeat(endCharRepeatsAtSide);
    }

    function generateEvenRow(letters) {
        return generateRow('*', 1, letters, '-', 2);
    }

    // only asterikxes, no mid dashes
    function generateFirstRow(letters) {
        return generateRow('*', 2, letters, '-', 0);
    }

    // only dashes, no asterikxes
    function generateLastRow(letters) {
        return generateRow('*', 0, letters, '-', 4);
    }

    function splitHelixIntoTwos (str) {
        let collection = [];
        let currentWord = '';
        for (let i = 1; i <= str.length; i++) {
            currentWord += str[i - 1];
            if (i % 2 === 0) {
                collection.push(currentWord);
                currentWord = ''
            }
        }
        // although this should be invalid
        if (currentWord !== '')
            collection.push(currentWord);
        return collection;
    }

    const splitStr = splitHelixIntoTwos('ATCGTTAGGG');
    let rowPatterNumber = 1;
    let lettersToTakeIndex = 0;

    while (helixRows-- > 0) {
        
        const letters = splitStr[lettersToTakeIndex];
        lettersToTakeIndex++;
        lettersToTakeIndex %= 5; // will return valid indexes between [0, 4]
        let row = '';
        if (rowPatterNumber % 2 === 0) {
            row = generateEvenRow(letters);
        } else {
            if (rowPatterNumber % 3 == 0)// full dashes
                row = generateLastRow(letters);
            else
                row = generateFirstRow(letters);
        }


        rowPatterNumber++;
        if (rowPatterNumber / 2 > 2) // if it is 5 already
            rowPatterNumber = 1; // reset the counter
        console.log(row);
    }
}

printDNA(4);
console.log('\n');
printDNA(10);