//no need for a single solve function

const WEATHER_HISTORY_URL = 'http://localhost:3030/jsonstore/tasks/';

const inputLocationNode = document.getElementById('location');
const inputTemperatureNode = document.getElementById('temperature');
const inputDateNode = document.getElementById('date');

const listNode = document.getElementById('list');

const loadHistoryNode = document.getElementById('load-history');
loadHistoryNode.addEventListener('click', loadHistory);

const addWeatherNode = document.getElementById('add-weather');
addWeatherNode.addEventListener('click', addWeatherToServer);
const editWeatherNode = document.getElementById('edit-weather');
editWeatherNode.addEventListener('click', editWeatherAtServer);

let switchableElementId; // it will be used to hold the currently loaded element to be removed / patched

function createWeatherElement(weatherObject, id) {
    // we can extract location, temp, date
    const location = weatherObject.location;
    const date = weatherObject.date; // date is just a string
    const degrees = weatherObject.temperature;

    const containerNode = document.createElement('div');
    containerNode.classList.add('container');
    containerNode.setAttribute('data-weather-id', id); // load function attaches id's to the elements(if it is loaded on the page, then it stores its id key in the data attribute)

    const locationNode = document.createElement('h2');
    locationNode.textContent = location;
    containerNode.appendChild(locationNode);

    const dateNode = document.createElement('h3');
    dateNode.textContent = date;
    containerNode.appendChild(dateNode);

    const temperatureNode = document.createElement('h3');
    temperatureNode.setAttribute('id', 'celsius');
    temperatureNode.textContent = degrees;
    containerNode.appendChild(temperatureNode);

    const buttonsContainerNode = document.createElement('div');
    buttonsContainerNode.classList.add('buttons-container');

    const changeButtonNode = document.createElement('button');
    changeButtonNode.classList.add('change-btn');
    changeButtonNode.addEventListener('click', changeSelectedCityWeather)
    changeButtonNode.textContent = 'Change';
    buttonsContainerNode.appendChild(changeButtonNode);

    const deleteButtonNode = document.createElement('button');
    deleteButtonNode.classList.add('delete-btn');
    deleteButtonNode.addEventListener('click', removeSelectedCity);
    deleteButtonNode.textContent = 'Delete';
    buttonsContainerNode.appendChild(deleteButtonNode);
    
    containerNode.appendChild(buttonsContainerNode);
    return containerNode
}

async function loadHistory() {
    // clear the current state
    listNode.innerHTML = '';

    const rawServerInfoObject = 
    await (await fetch(WEATHER_HISTORY_URL))
    .json();

    const locationsWeatherHistoriesWithKeys = Object.entries(rawServerInfoObject); // array of pairs[id, obj]
    // create an html element and append it to the page for every location in the array, it will also add the id in the element
    for (const [id, weatherLocationHistory] of locationsWeatherHistoriesWithKeys) {
        const newWeatherElement = createWeatherElement(weatherLocationHistory, id);
        listNode.appendChild(newWeatherElement);
    }
}

function alterTheInputValues(locationValue, temperatureValue, dateValue) {
    inputLocationNode.value = locationValue;
    inputTemperatureNode.value = temperatureValue;
    inputDateNode.value = dateValue;
}

function addWeatherToServer() {
    // take the input, there are no validations required in the task
    const location = inputLocationNode.value;
    const temperature = inputTemperatureNode.value;
    const date = inputDateNode.value;

    // create an object
    const locationInfo = {
        location,
        temperature,
        date,
    };

    // clear the input fields
    alterTheInputValues('', '', '');

    // doesn't need to be async as all async operations are put at the end 
    // of the function, they will always complete in proper order

    // send a post request
    fetch(WEATHER_HISTORY_URL, {
        method: "POST",
        body: JSON.stringify(locationInfo),
        });
    
    // load the new data
    loadHistory();
}

function changeSelectedCityWeather(event) {
    // get the desired city info element
    const locationNode = event.currentTarget.parentElement.parentElement;
    // remove the target's city from the list
    locationNode.parentElement.removeChild(locationNode);
    // fill the input with city's info
    const name = locationNode.getElementsByTagName('h2')[0].textContent;
    const date = locationNode.getElementsByTagName('h3')[0].textContent;
    const degrees = locationNode.getElementsByTagName('h3')[1].textContent;
    switchableElementId = locationNode.getAttribute('data-weather-id');
    alterTheInputValues(name, degrees, date);
    // enable edit and disable add weather buttons
    editWeatherNode.disabled = false;
    addWeatherNode.disabled = true;
}

async function editWeatherAtServer() {
    const location = inputLocationNode.value;
    const temperature = inputTemperatureNode.value;
    const date = inputDateNode.value;

    // create an object
    const locationInfo = {
        location,
        temperature,
        date,
    };

    // send a put request with id
    const URL_TO_MODIFY = `${WEATHER_HISTORY_URL}${switchableElementId}`;
    await fetch(URL_TO_MODIFY, {
        method: "PUT",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(locationInfo),
        });

    // fetch the newly gotten items
    await loadHistory();

    // clean the inputs
    alterTheInputValues('', '', '');

    // disable edit and enable add weather buttons
    addWeatherNode.disabled = false;
    editWeatherNode.disabled = true;
}

async function removeSelectedCity(event) {
    // the removal will happen automatically when we delete then load the new values. No need for extra DOM operations
    const locationNode = event.currentTarget.parentElement.parentElement;
    switchableElementId = locationNode.getAttribute('data-weather-id');

    let result = await (await fetch(WEATHER_HISTORY_URL)).json();
    console.log(result);
    const URL_TO_MODIFY = `${WEATHER_HISTORY_URL}${switchableElementId}`;
    console.log(URL_TO_MODIFY);
    await fetch(URL_TO_MODIFY, {
        method: "delete",
        });
    result = await (await fetch(WEATHER_HISTORY_URL)).json();
    console.log(result);
    await loadHistory();
}