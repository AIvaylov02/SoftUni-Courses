function CalculateFruitPrice(fruit, weight, fruitPrice) {
    weight /= 1000; // convert grams to kilograms
    let money = fruitPrice * weight;
    console.log(`I need $${money.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruit}.`);
}