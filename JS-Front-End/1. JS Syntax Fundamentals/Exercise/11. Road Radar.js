function IsWithinSpeedLimit(speed, area) {
    const MOTORWAY_SPEED_LIMIT = 130;
    const INTERSTATE_SPEED_LIMIT = 90;
    const CITY_SPEED_LIMIT = 50;
    const RESIDENTAL_SPEED_LIMIT = 20;

    speedLimit = RESIDENTAL_SPEED_LIMIT;
    switch (area) {
        case "motorway":
            speedLimit = MOTORWAY_SPEED_LIMIT;
            break;
        case "interstate":
            speedLimit = INTERSTATE_SPEED_LIMIT;
            break;
        case "city":
            speedLimit = CITY_SPEED_LIMIT;
            break;
    }

    if (speed <= speedLimit)
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    else {
        difference = speed - speedLimit;
        status = "speeding";

        if (difference > 40) {
            const SPEEDING_40_KM_OVERLIMIT = "reckless driving";
            status = SPEEDING_40_KM_OVERLIMIT;
        }
        else if (difference > 20) {
            const SPEEDING_UP_TO_40_KM = "excessive speeding";
            status = SPEEDING_UP_TO_40_KM;
        }
        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);        
    }
}