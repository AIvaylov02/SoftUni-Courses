function FindWordInText(searchedWord, text) {

    let splitText = text.split(' ');
    let searchedWordLowerCase = searchedWord.toLowerCase();
    for (let word of splitText) {
        if (word.toLowerCase() === searchedWordLowerCase) {
            console.log(searchedWord);
            return;
        }
    }
    console.log(`${searchedWord} not found!`);
}

FindWordInText('javascript','JavaScript is the best programming language')
FindWordInText('python','JavaScript is the best programming language')