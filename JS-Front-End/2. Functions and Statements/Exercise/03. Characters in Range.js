function printIntervalOfCharacters(startingChar, endingChar) {
    
    let startCharCode = startingChar.charCodeAt(0);
    let endingCharCharCode = endingChar.charCodeAt(0);
    
    if (endingCharCharCode < startCharCode) {
        let temp = endingCharCharCode;
        endingCharCharCode = startCharCode;
        startCharCode = temp
    }


    result = [];
    while (++startCharCode < endingCharCharCode) {
        result.push(String.fromCharCode(startCharCode));
    }

    console.log(result.join(' '));
}

printIntervalOfCharacters('C', '#');