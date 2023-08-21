function capitalizeWords(rawInput) {
    const regExpression = /\w+/g;
    const foundMatches = rawInput.match(regExpression);
    const capitalizedMatches = foundMatches.map(word => word.toUpperCase());
    console.log(capitalizedMatches.join(', '));
}

capitalizeWords('Hi, how are you?');
capitalizeWords('hello');