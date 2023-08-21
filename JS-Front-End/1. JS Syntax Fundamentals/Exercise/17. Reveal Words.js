function RevealWords(rawKeywords, wholeText) {
    let keywords = rawKeywords.split(', ');
    let wholeTextSplit = wholeText.split(' ');

    for (let i = 0; i < wholeTextSplit.length; i++) {
        let wordLen = 0;
        let word = wholeTextSplit[i];
        if (word[0] === '*')
            wordLen = word.length;
        if (wordLen !== 0) {
            for (let keyword of keywords) {
                if (keyword.length === wordLen) {
                    word = keyword;
                    wholeTextSplit.splice(i, 1, keyword);
                    break;
                }
            }
        }
    }

    console.log(wholeTextSplit.join(' '));
}