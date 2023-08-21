function CheckOddOccurances (sentence) {
    const sentenceArr = sentence.toLowerCase().split(' ');
    let countTracker = {};
    sentenceArr.forEach(function (word) {
        if (!countTracker.hasOwnProperty(word))
            countTracker[word] = 0;
        countTracker[word]++;
    });

    // take only the words which are seen an odd number of times
    let oddWords = Object.entries(countTracker).filter(([a, b]) => b % 2 === 1).map(([a,b]) => a);
    countTracker = {};
    let sortedResult = [] // to guarantee order, we have to traverse the array again
    for (let word of sentenceArr) {
        // only if we have yet to print this value
        if (!countTracker.hasOwnProperty(word)) { // first should be the logN check
            if (oddWords.includes(word)) { // then the O(N) linear check
                countTracker[word] = 1;
                sortedResult.push(word);
            }
        }
    }

    console.log(sortedResult.join(' '));
}

CheckOddOccurances('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');
console.log('\n');
CheckOddOccurances('Cake IS SWEET is Soft CAKE sweet Food');