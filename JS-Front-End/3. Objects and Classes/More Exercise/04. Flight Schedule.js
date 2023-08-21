function correspondFlights(matrix) {

    function createFlight(code, destination) {
        return {
            code: code,
            destination: destination,
            status: "Ready to fly"
        }
    }

    function loadOriginalFlights(airport, originalFlightsArr) {
        for (const flightRawInfo of originalFlightsArr) {
            const [flightNum, ...destinationNameParts] = flightRawInfo.split(' ');
            const destination = destinationNameParts.join(' ');
            airport[flightNum] = createFlight(flightNum, destination);
        }
    }

    function overloadSomeFlights(airport, changedFlightsArr) {
        for (const flightRawInfo of changedFlightsArr) {
            const flightSplitInfo = flightRawInfo.split(' ');
            if (airport.hasOwnProperty(flightSplitInfo[0]))
                airport[flightSplitInfo[0]].status = "Cancelled";
        }
    }

    

    function printSearchedFlights(airport, statusArr) {
        const status = statusArr[0];
        const searchedFlights = 
            Object.values(airport).filter(flight => flight.status === status)
            .map((flight) => {
                return {
                    Destination: `${flight.destination}`,
                    Status: `${flight.status}`
                }
            });
        searchedFlights.forEach(flight => console.log(flight));
        
    }

    let airport = {};
    loadOriginalFlights(airport, matrix[0]);
    overloadSomeFlights(airport, matrix[1]);
    printSearchedFlights(airport, matrix[2]);

}

correspondFlights([['WN269 Delaware',
'FL2269 Oregon',
'WN498 Las Vegas',
'WN3145 Ohio',
'WN612 Alabama',
'WN4010 New York',
'WN1173 California',
'DL2120 Texas',
'KL5744 Illinois',
'WN678 Pennsylvania'],
['DL2120 Cancelled',
'WN612 Cancelled',
'WN1173 Cancelled',
'SK430 Cancelled'],
['Cancelled']
]);

console.log('\n');
correspondFlights([['WN269 Delaware',
'FL2269 Oregon',
'WN498 Las Vegas',
'WN3145 Ohio',
'WN612 Alabama',
'WN4010 New York',
'WN1173 California',
'DL2120 Texas',
'KL5744 Illinois',
'WN678 Pennsylvania'],
['DL2120 Cancelled',
'WN612 Cancelled',
'WN1173 Cancelled',
'SK330 Cancelled'],
['Ready to fly']]);