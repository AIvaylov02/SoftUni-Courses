function makeDictionary(splitJSONInfo) {
    let dictionary = {};
    for (const rawWord of splitJSONInfo) {
        const parsedObject = Object.entries(JSON.parse(rawWord));
        const term = parsedObject[0][0];
        const definition = parsedObject[0][1];
        dictionary[term] = definition;

    }

    let sortedTermsCollection = Object.keys(dictionary).sort();
    let printableDictionary = sortedTermsCollection.map((term) => `Term: ${term} => Definition: ${dictionary[term]}`);
    console.log(printableDictionary.join('\n'));
}

makeDictionary([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}']
    )