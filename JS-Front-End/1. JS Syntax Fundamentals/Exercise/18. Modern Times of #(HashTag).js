function ExtractValidWords(input) {
    const MAGICAL_CHAR = '#'

    splitInput = input.split(' ');

    // for each the whole array consisting of words
    for (let word of splitInput) {
        let index = 0;
        // if the word doesn't start with magical character, skip the word
        if (word[index] !== MAGICAL_CHAR)
            continue;
        // traverse the rest of the word to check if it consists of only characters
        let isLetter = undefined;
        while (++index < word.length) {
            isLetter = (word[index] >= 'a' && word[index] <= 'z') || (word[index] >= 'A' && word[index] <= 'Z');
            if (!isLetter)
                break;
        }
        if (!isLetter) // if there exists a non-letter character, skip this word
            continue;
        // print if it still valid after all check-ups
        console.log(word.substring(1));
    }
}

ExtractValidWords('Nowadays everyone uses # to tag a #special word in #socialMedia');
ExtractValidWords('The symbol # is known #variously in English-speaking #regions as the #number sign');