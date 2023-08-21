function PrintMultiplicationTable(number) {
    const START_NUMBER = 1;
    const END_NUMBER = 10;

    for (let i = START_NUMBER; i <= END_NUMBER; i++)
        console.log(`${number} X ${i} = ${number * i}`);
}