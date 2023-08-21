function LoadingBar(percentDone) {
    const NUMBER_OF_PARTS_PER_INTERVAL = 10;
    let partsDone = percentDone / 10;
    let visualizedBar = `[${'%'.repeat(partsDone)}${'.'.repeat(NUMBER_OF_PARTS_PER_INTERVAL-partsDone)}]`;

    if (partsDone === 10) {
        console.log(`${percentDone}% Complete!`)
        console.log(visualizedBar);
    }
    else {
        console.log(`${percentDone}% ${visualizedBar}`);
        console.log('Still loading...');
    }
}

LoadingBar(30);
LoadingBar(50);
LoadingBar(100);