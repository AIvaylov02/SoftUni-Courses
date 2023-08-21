function checkOccurances(arr) {
    // parse the input
    [wordsToCheckFor,... textToCheckIn] = arr; 
    wordsToCheckFor = wordsToCheckFor.split(' ');
    
    // add the initial wordsToTrack dictionary
    let wordsTracker = {};
    wordsToCheckFor.forEach((word) => wordsTracker[word] = 0);

    // traverse the text to count the occurances of the searched words
    textToCheckIn.forEach(function (word) {
        if (wordsTracker.hasOwnProperty(word))
            wordsTracker[word]++;
    });

    //sort descending
    let searchedWordsResults = Object.keys(wordsTracker);
    searchedWordsResults = searchedWordsResults.sort((a, b) => wordsTracker[b] - wordsTracker[a]);
    for (const element of searchedWordsResults) {
        console.log(`${element} - ${wordsTracker[element]}`);
    }
}

checkOccurances([
    'this sentence',
    'In', 'this', 'sentence', 'you', 'have',
    'to', 'count', 'the', 'occurrences', 'of',
    'the', 'words', 'this', 'and', 'sentence',
    'because', 'this', 'is', 'your', 'task'
    ]);

checkOccurances([
    'is the',
    'first', 'sentence', 'Here', 'is', 
    'another', 'the', 'And', 'finally', 'the', 
    'the', 'sentence']);

checkOccurances([
    'az da sum',
    'da', 'da', 'da', 'da', 'da', 'da', 'da', 'da',
    'sum', 'sum', 'sum', 'sum', 
])