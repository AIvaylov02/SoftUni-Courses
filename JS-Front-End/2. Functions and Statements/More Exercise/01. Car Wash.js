function attemptCarWash(commands) {

    const carwash = {
        'soap': carCleanedValue => carCleanedValue + 10,
        'water': carCleanedValue => carCleanedValue * 1.2,
        'vacuum cleaner': carCleanedValue => carCleanedValue * 1.25,
        'mud': carCleanedValue => carCleanedValue * 0.9
    }

    let carCleanedValue = 0;
    for (let command of commands) {
        carCleanedValue = carwash[command](carCleanedValue)
    }
    console.log(`The car is ${carCleanedValue.toFixed(2)}% clean.`);
}

attemptCarWash(['soap', 'soap', 'vacuum cleaner', 'mud', 'soap', 'water']);
console.log('\n');
attemptCarWash(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);