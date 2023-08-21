function solve() {
    const arriveButton = document.getElementById('arrive');
    const departButton = document.getElementById('depart');
    const InfoBox = document.querySelector('#info .info');

    let busStopInfo = {
        name: "",
        next: "depot"
    };

    function switchButtons() {
        if (arriveButton.disabled === true) {
            arriveButton.disabled = false;
            departButton.disabled = true;
        } else {
            arriveButton.disabled = true;
            departButton.disabled = false;
        }
    }

    function disableButtons() {
        arriveButton.disabled = true;
        departButton.disabled = true;
    }

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStopInfo.next}`)
        .then(returnedInfo => returnedInfo.json())
        .then(stopInfo => {
            busStopInfo = stopInfo;
            InfoBox.textContent = `Next stop ${busStopInfo.name}`;
            switchButtons();
        })
        .catch(() => {
            InfoBox.textContent = "Error";
            disableButtons();
        })
    }

    async function arrive() {
        InfoBox.textContent = `Arriving at ${busStopInfo.name}`
        switchButtons();
    }

    return {
        depart,
        arrive
    };
}

let result = solve();