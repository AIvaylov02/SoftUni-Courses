function StoreProvisions(currentStock, orderedStock) {
    
    function TransferSupplies(fromStock, toDockingPlace) {
        for (let i = 0; i < fromStock.length; i+=2) {
            let stock = fromStock[i];
            let quantity = Number(fromStock[i+1]);
            if (!toDockingPlace.hasOwnProperty(stock))
                toDockingPlace[stock] = quantity;
            else
                toDockingPlace[stock] += quantity;
        }
    }

    let supplies = {};
    TransferSupplies(currentStock, supplies);
    TransferSupplies(orderedStock, supplies);
    let keys = Object.keys(supplies);
    for (let product of keys)
        console.log(`${product} -> ${supplies[product]}`);
}

StoreProvisions(['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']);
console.log('\n');
StoreProvisions (['Salt', '2', 'Fanta', '4', 'Apple', '14', 'Water', '4', 'Juice', '5'],
    ['Sugar', '44', 'Oil', '12', 'Apple', '7', 'Tomatoes', '7', 'Bananas', '30']);