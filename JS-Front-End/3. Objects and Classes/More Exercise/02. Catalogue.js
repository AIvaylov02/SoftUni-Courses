function sortProducts(rawArr) {
    // take the initial input of products into raw dict
    let dictionary = {};
    for (const rawProduct of rawArr) {
        const product = rawProduct.split(' : ');
        const name = product[0];
        dictionary[name] = Number(product[1]);
    }
    
    function sortByKeys([keyOne, priceOne], [keyTwo, priceTwo]) {
        return keyOne.localeCompare(keyTwo);
    }

    // sort the dictionary
    const sortedDictionary = Object.entries(dictionary).sort(sortByKeys);
    // group by letters
    let groupsByLetters = {};
    for (const product of sortedDictionary) {
        const word = product[0];
        let correspondingLetter = word[0];
        if (!groupsByLetters.hasOwnProperty(correspondingLetter))
            groupsByLetters[correspondingLetter] = [];
        groupsByLetters[correspondingLetter].push(product); // products will be sorted in the groups as we place them in ascending order, only will have to sort the letters
    }

    //sort the letters
    groupsByLetters = Object.entries(groupsByLetters).sort(sortByKeys);
    // make the final printing
    for (const [letter, products] of groupsByLetters) {
        console.log(letter);
        for (const [productName, price] of products)
            console.log(`  ${productName}: ${price}`);
    }
}

sortProducts([
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'Appricot : 20.4',
    'T-Shirt : 10'
    ]);