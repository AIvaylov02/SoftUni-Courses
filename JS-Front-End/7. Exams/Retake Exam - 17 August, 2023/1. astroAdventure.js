function adventureInSpace(inputArr) {
    // in order for correct printing we shouldn't use an object, but an array to hold the astronauts

    function explore(astronautsTeam, name, energyNeededForExploration) {
        const astronaut = astronautsTeam.find((astro) => name === astro.name);
        if (typeof astronaut === 'undefined')
            return; // we don't have that astronaut in our collection
        if (astronaut.energyReserves >= energyNeededForExploration) {
            astronaut.energyReserves -= energyNeededForExploration;
            console.log(`${name} has successfully explored a new area and now has ${astronaut.energyReserves} energy!`);
        } else {
            // should this message be printed if the astronaut doens't exists in the array ?
            console.log(`${name} does not have enough energy to explore!`);
        }
        
    }

    function refuel(astronautsTeam, name, fuel) {
        const astronaut = astronautsTeam.find((astro) => name === astro.name);
        if (typeof astronaut === 'undefined')
            return; // we don't have that astronaut in our collection

        const MAXIMUM_ENERGY = 200;
        const maxEnergyThatCanBeRefueled = MAXIMUM_ENERGY - astronaut.energyReserves;
        if (fuel > maxEnergyThatCanBeRefueled) {
            fuel = maxEnergyThatCanBeRefueled;
        }
            
        astronaut.energyReserves += fuel;
        console.log(`${name} refueled their energy by ${fuel}!`);
    }

    function breathe(astronautsTeam, name, oxygenToReplenish) {
         const astronaut = astronautsTeam.find((astro) => name === astro.name);
        if (typeof astronaut === 'undefined')
            return; // we don't have that astronaut in our collection

        const MAXIMUM_OXYGEN = 100;
        const maxOxygenThatCanBeReplenished = MAXIMUM_OXYGEN - astronaut.oxygenLevel;
        if (oxygenToReplenish > maxOxygenThatCanBeReplenished) {
            oxygenToReplenish = maxOxygenThatCanBeReplenished;
        }
            
        astronaut.oxygenLevel += oxygenToReplenish;
        console.log(`${name} took a breath and recovered ${oxygenToReplenish} oxygen!`);
    }
    


    let astrounautsCountLeftToReceive = inputArr.shift();

    let astronautsTeam = []; // array of <objects>
    while (astrounautsCountLeftToReceive > 0) {
        const astronautInfo = inputArr.shift().split(' ');
        const astronaut = {
            name: astronautInfo[0],
            oxygenLevel: Number(astronautInfo[1]),
            energyReserves: Number(astronautInfo[2])
        }

        astronautsTeam.push(astronaut);
        astrounautsCountLeftToReceive--;
    }
    
    const commandParser = {
        'Explore': explore,
        'Refuel': refuel,
        'Breathe': breathe,
    };
    // we have received all astronauts, time to do operations with them
    let rawCommand = inputArr.shift();
    while (rawCommand != 'End') {
        const splitCmd = rawCommand.split(' - ');
        const action = splitCmd[0];
        const name = splitCmd[1];
        const amount = Number(splitCmd[2]);

        commandParser[action](astronautsTeam, name, amount);

        rawCommand = inputArr.shift();
    }
    // we have received all commands that will modify the collection, time for final printing
    astronautsTeam.forEach((astronaut) => 
    console.log(`Astronaut: ${astronaut.name}, Oxygen: ${astronaut.oxygenLevel}, Energy: ${astronaut.energyReserves}`)); 

}

adventureInSpace([  '3',
'John 50 120',
'Kate 80 180',
'Rob 70 150',
'Explore - John - 50',
'Refuel - Kate - 30',
'Breathe - Rob - 20',
'End']
);

console.log('\n');
adventureInSpace([    '4',
'Alice 60 100',
'Bob 40 80',
'Charlie 70 150',
'Dave 80 180',
'Explore - Bob - 60',
'Refuel - Alice - 30',
'Breathe - Charlie - 50',
'Refuel - Dave - 40',
'Explore - Bob - 40',
'Breathe - Charlie - 30',
'Explore - Alice - 40',
'End']
);