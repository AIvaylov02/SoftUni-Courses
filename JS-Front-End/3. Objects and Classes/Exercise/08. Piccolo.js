function parkingManager(instructions) {
    let parkingLot = {};
    for (const instruction of instructions) {
        [direction, number] = instruction.split(', ');
        const INCOMING_CAR = 'IN';
        if (direction == INCOMING_CAR) // simulate a hash set
            parkingLot[number] = true; 
        else // remove car
            delete parkingLot[number];
    }
    
    // sort by numbers
    let carsInside = Object.keys(parkingLot);
    if (carsInside.length === 0)
        console.log("Parking Lot is Empty");
    else {
        carsInside = carsInside.sort();
        console.log(carsInside.join('\n'));
    }
}

parkingManager(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU']);

parkingManager(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']
);