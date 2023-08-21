function printTableData(rawTable) {
    function parseRowToObject(rowInfo) {
        let splitInfo = rowInfo.split(' | ');
        let obj = {
            town: splitInfo[0],
            latitude: Number(splitInfo[1]).toFixed(2),
            longitude: Number(splitInfo[2]).toFixed(2),
        }

        return obj;
    }

    let objectArray = rawTable.map(parseRowToObject);
    objectArray.forEach(obj => console.log(obj));
}

printTableData(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']
);