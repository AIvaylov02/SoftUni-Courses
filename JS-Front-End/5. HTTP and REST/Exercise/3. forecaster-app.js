function attachEvents() {

    let symbolDictionary = {
        'Sunny': "☀",
        "Partly sunny": "⛅",
        'Overcast': "☁",
        'Rain': "☂",
        'Degrees': "°"
    }

    async function getLocationFromInput() { // fine
        const searchedLocationName = document.getElementById('location').value;
        const searchedLocation = await 
        (await fetch('http://localhost:3030/jsonstore/forecaster/locations')
        ).json();
        const resultObj = searchedLocation.find(location => location.name === searchedLocationName);
        // if typeof resultObj === undefined, then skip it, it is invalid location 
        return resultObj;
    }

    async function getCurrentForecast(searchedLocation) {
        const currentForecast = await (
            await fetch(`http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`)
        ).json();
        return currentForecast;
    }
    
    async function getTheNextThreeDaysForecast(searchedLocation) {
        const getTheNextThreeDaysForecast = await (
            await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${searchedLocation.code}`)
        ).json();
        return getTheNextThreeDaysForecast;
    }

    async function getWeatherDataForLocation(forecast) {
        const searchedLocation = await getLocationFromInput();
        [currentForecast, nextThreeDaysForecast] = await Promise.all([getCurrentForecast(searchedLocation), getTheNextThreeDaysForecast(searchedLocation)]);
        forecast['currentForecast'] = currentForecast;
        forecast['nextThreeDaysForecast'] = nextThreeDaysForecast;
    }
    
    function visualizeCurrentConditions(currentForecast) {
        // make the tab visible, together with adding the top layer element
        document.getElementById('forecast').style.display = "block";
        let forecastsNode = document.createElement('div');
        forecastsNode.classList.add("forecasts");
        document.getElementById('current').appendChild(forecastsNode);
    
        // add the condition symbol tag
        let conditionSymbolNode = document.createElement('span');
        conditionSymbolNode.classList.add('condition', 'symbol');
        conditionSymbolNode.textContent = symbolDictionary[currentForecast.forecast.condition];
        forecastsNode.appendChild(conditionSymbolNode);
    
        // add the condition info tag
        let conditionBaseNode = document.createElement('span');
        conditionBaseNode.classList.add('condition');
        forecastsNode.appendChild(conditionBaseNode);

        // create each one of the sub info portions to the condition base node
        let locationNode = document.createElement('span');
        locationNode.classList.add('forecast-data');
        locationNode.textContent = currentForecast.name;
        conditionBaseNode.appendChild(locationNode);

        let degreesNode = document.createElement('span');
        degreesNode.classList.add('forecast-data');
        degreesNode.textContent = `${currentForecast.forecast.low}${symbolDictionary['Degrees']}/${currentForecast.forecast.high}${symbolDictionary['Degrees']}`;
        conditionBaseNode.appendChild(degreesNode);

        let conditionInfoNode = document.createElement('span');
        conditionInfoNode.classList.add('forecast-data');
        conditionInfoNode.textContent = currentForecast.forecast.condition;
        conditionBaseNode.appendChild(conditionInfoNode);
    }

    function visualizeUpcomingDays(arrOfForecastForNextDays) {
        let divNode = document.createElement('div');
        divNode.classList.add('forecast-info'); // the holding div of each day
        for (const forecast of arrOfForecastForNextDays) {
            divNode.appendChild(createUpcomingDay(forecast));
        }
        document.getElementById('upcoming').appendChild(divNode); // append the whole section to the big div of the page
    }

    function createUpcomingDay(currentDayForecast) {
        let upcomingNode = document.createElement('span');
        upcomingNode.classList.add('upcoming');

        let symbolNode = document.createElement('span');
        symbolNode.classList.add('symbol');
        symbolNode.textContent = symbolDictionary[currentDayForecast.condition];

        let degreesNode = document.createElement('span');
        degreesNode.classList.add('forecast-data');
        degreesNode.textContent = `${currentDayForecast.low}${symbolDictionary['Degrees']}/${currentDayForecast.high}${symbolDictionary['Degrees']}`;

        let conditionInfoNode = document.createElement('span');
        conditionInfoNode.classList.add('forecast-data');
        conditionInfoNode.textContent = currentDayForecast.condition;

        upcomingNode.appendChild(symbolNode);
        upcomingNode.appendChild(degreesNode);
        upcomingNode.appendChild(conditionInfoNode);
        return upcomingNode;
    }

    async function processWeatherRequest() {
        let townForecast = {};
        await getWeatherDataForLocation(townForecast);
        // we have received the forecast, time to visualise the next day and the next 3 days
        visualizeCurrentConditions(townForecast.currentForecast);
        visualizeUpcomingDays(townForecast.nextThreeDaysForecast.forecast)
    }



    document.getElementById('submit').addEventListener('click', processWeatherRequest);
}

attachEvents();