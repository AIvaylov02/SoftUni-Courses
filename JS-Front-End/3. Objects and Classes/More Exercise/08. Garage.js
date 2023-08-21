function parkCars(inputArr) {

    function createCar(splitRawInput) {
        const rawCarInfo = splitRawInput.split(', ');
        let car = {};
        for (const rawAttributeInfo of rawCarInfo) {
            const [attributeName, attributeValue] = rawAttributeInfo.split(': ');
            car[attributeName] = attributeValue;
        }
        return car;
    }

    function acceptCarsFromInput(inputArr, parking) {
        for (const rawInput of inputArr) {
            const splitInput = rawInput.split(' - ');
            const garageNum = Number(splitInput[0]);
            const car = createCar(splitInput[1]);
            
            if (!parking.hasOwnProperty(garageNum))
                parking[garageNum] = [];
            parking[garageNum].push(car);
        }
    }

    function convertCarToPrintableFormat(car) {
        const carInfo = Object.entries(car).map(([attribute, value]) => `${attribute} - ${value}`);
        return `--- ${carInfo.join(', ')}\n`;
    }

    function convertParkingToPrintableFormat(garageNum, parking) {
        let result = `Garage № ${garageNum}\n`;
        let carsInfo = '';
        for (const car of parking[garageNum])
            carsInfo += convertCarToPrintableFormat(car);
        carsInfo = carsInfo.slice(0, carsInfo.length - 1); // remove the \n character in  the last car to avoid double new line when printing
        result += carsInfo;
        return result;
    }

    function printParking(parkingObj) {
        const parking = Object.keys(parkingObj);
        for (let garageNum of parking) {
            garageNum = Number(garageNum);
            console.log(convertParkingToPrintableFormat(garageNum, parkingObj));
        }     
    }

    let parking = {};
    acceptCarsFromInput(inputArr, parking);
    printParking(parking);
}

parkCars(['1 - color: blue, fuel type: diesel', 
'1 - color: red, manufacture: Audi', 
'2 - fuel type: petrol',
 '4 - color: dark blue, fuel type: diesel, manufacture: Fiat']);
console.log('\n');
parkCars(['1 - color: green, fuel type: petrol',
'1 - color: dark red, manufacture: WV',
'2 - fuel type: diesel',
'3 - color: dark blue, fuel type: petrol']);