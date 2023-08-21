function mineBitcoins(goldIncomeGramageArray) {
    const PRICE_PER_GRAM_OF_GOLD = 67.51;
    const PRICE_OF_BITCOIN = 11949.16;

    let accumulatedMoney = 0;
    const NO_BITCOIN_BOUGHT = -1;
    let dayOfFirstBitcoin = NO_BITCOIN_BOUGHT;
    let boughtBitcoins = 0;
    for (let miningDay = 1; miningDay <= goldIncomeGramageArray.length; miningDay++) {
        let currentDayIncome = goldIncomeGramageArray[miningDay - 1] * PRICE_PER_GRAM_OF_GOLD;
        const THEFT_PER_NUMBER_OF_DAYS = 3;
        if (miningDay % THEFT_PER_NUMBER_OF_DAYS === 0) {
            const THEFT_MULTIPLIER_IN_PERCENT = 30;
            currentDayIncome *= (100 - THEFT_MULTIPLIER_IN_PERCENT) / 100;
        }
        accumulatedMoney += currentDayIncome;
        while (accumulatedMoney > PRICE_OF_BITCOIN) {
            if (boughtBitcoins === 0) {
                dayOfFirstBitcoin = miningDay;
            }
            boughtBitcoins++;
            accumulatedMoney -= PRICE_OF_BITCOIN;
        }
    }

    console.log(`Bought bitcoins: ${boughtBitcoins}`);
    if (dayOfFirstBitcoin !== NO_BITCOIN_BOUGHT)
        console.log(`Day of the first purchased bitcoin: ${dayOfFirstBitcoin}`);
    console.log(`Left money: ${accumulatedMoney.toFixed(2)} lv.`);
}

mineBitcoins([100, 200, 300]);
console.log('\n');
mineBitcoins([50, 100]);
console.log('\n');
mineBitcoins([3124.15, 504.212, 2511.124]);