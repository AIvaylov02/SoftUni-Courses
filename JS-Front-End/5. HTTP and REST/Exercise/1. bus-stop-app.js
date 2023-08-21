function getInfo() {
    const busStopId = document.getElementById('stopId').value;
    const listToPlaceIn = document.getElementById('buses');
    listToPlaceIn.innerHTML = ""; // reset the list elements which were selected beforehand
    const nodeOfBusStopName = document.getElementById('stopName');
    const searchedURL = `http://localhost:3030/jsonstore/bus/businfo/${busStopId}`;

    fetch(searchedURL)
        .then(returnedData => returnedData.json())
        .then(busStop => {
            nodeOfBusStopName.textContent = busStop.name;

            

            Object.entries(busStop.buses).map(([busNumber, arrivalMinutes]) => {
                const newNode = document.createElement('li');
                newNode.textContent = `Bus ${busNumber} arrives in ${arrivalMinutes} minutes`;
                listToPlaceIn.appendChild(newNode);
            })
        })
        .catch(() => {
            nodeOfBusStopName.textContent = "Error";
        });

}