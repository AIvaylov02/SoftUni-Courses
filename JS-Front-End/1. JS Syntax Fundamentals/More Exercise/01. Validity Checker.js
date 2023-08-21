function areAllValidDistance(x1, y1, x2, y2) {
    function validateDistance(x1, y1, x2, y2) {
        const xDifference = (x2 - x1) ** 2;
        const yDifference = (y2 - y1) ** 2;
        const distance = Math.sqrt((xDifference + yDifference));
        const intDistance = Math.floor(distance);
        const MY_EPSILON = 0.00000001;
        
        // take the number of the equation, floor it to int and then check if the abs(difference of the 2 results is smaller than a predefined Epsilon) 
        return Math.abs(distance - intDistance) < MY_EPSILON;
    }

    function printValidDistanceMessage(x1, y1, x2, y2) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
    }

    function printInvalidDistanceMessage(x1, y1, x2, y2) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    }

    (validateDistance(x1, y1, 0, 0)) ? printValidDistanceMessage(x1, y1, 0, 0) : printInvalidDistanceMessage(x1, y1, 0, 0);

    (validateDistance(x2, y2, 0, 0)) ? printValidDistanceMessage(x2, y2, 0, 0) : printInvalidDistanceMessage(x2, y2, 0, 0);

    (validateDistance(x1, y1, x2, y2)) ? printValidDistanceMessage(x1, y1, x2, y2) : printInvalidDistanceMessage(x1, y1, x2, y2);
}

areAllValidDistance(3, 0, 0, 4);
console.log('\n');
areAllValidDistance(2, 1, 1, 1);