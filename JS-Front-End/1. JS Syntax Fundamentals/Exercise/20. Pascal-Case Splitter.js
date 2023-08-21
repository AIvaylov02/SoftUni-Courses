function SplitPascalCase (pascalWord) { // ironically it is written in camelCase :D
    splitWords = [];
    let startIndex = 0;
    let endIndex = 0;
    for (let i = 1; i < pascalWord.length; i++) {
        if (pascalWord[i] >= 'A' && pascalWord[i] <= 'Z') {
            // i is at the position of the next capital letter
            endIndex = i - 1; 
            let newWord = pascalWord.substring(startIndex, endIndex + 1);
            splitWords.push(newWord);
            startIndex = endIndex + 1;
        }
    }
    // corner case to add the last word to the collection
    // indexes should be valid, otherwise the name is not corresponding, substrings interval is [start, end)
    endIndex = pascalWord.length - 1;
    splitWords.push(pascalWord.substring(startIndex, endIndex + 1));

    console.log(splitWords.join(', '));
}

SplitPascalCase('SplitMeIfYouCanHaHaYouCantOrYouCan');
SplitPascalCase('HoldTheDoor');
SplitPascalCase('ThisIsSoAnnoyingToDo');