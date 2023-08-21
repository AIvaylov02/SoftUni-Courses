function processArmies(input) {
    
    function addLeader(battleField, rawCmd) {
        const [leader, rest] = rawCmd.split(' arrives');
        battleField[leader] = {};
    }

    function removeLeader(battleField, rawCmd) {
        const [leader, rest] = rawCmd.split(' defeated');
        delete battleField[leader];
    }

    // function createArmy(armyName, personelCount) {
    //     let army = {};
    //     army[armyName] = personelCount;
    //     return army;
    // }

    function addMenToArmy(battleField, rawCmd) {
        const [armyName, personelToAdd] = rawCmd.split(' + ');
        const armyObjects = Object.values(battleField);
        for (const armiesOfLeader of armyObjects) {
            if (armiesOfLeader.hasOwnProperty(armyName)) {
                armiesOfLeader[armyName] += Number(personelToAdd);
                break;
            }
        }
    }

    function attachArmyToLeader(battleField, rawCmd) {
        const [leader, rest] = rawCmd.split(': ');
        if (!battleField.hasOwnProperty(leader))
            return;

        let [armyName, personelCount] = rest.split(', ');
        personelCount = Number(personelCount);
        // const army = createArmy(armyName, personelCount);
        battleField[leader][armyName] = personelCount;
    }
    
    function processInput(battleField, input) {
        for (const rawCmd of input) {
            if (rawCmd.includes(':')) { // leader to append army to
                attachArmyToLeader(battleField, rawCmd);
            } else if (rawCmd.includes('+')){ // add count to army if it exists
                addMenToArmy(battleField, rawCmd);
            } else { // 2 word commands
                
                if (rawCmd.includes(' defeated')) { // leader has been defeated 
                    removeLeader(battleField, rawCmd);
                } else { // a new leader emerges
                    addLeader(battleField, rawCmd);
                }
                
            }
        }
    }
    
    function appendArmyCountByLeader(battleField, leader) {
        if (!battleField.hasOwnProperty(leader)) // it is not required, but in production code it should provide a safeguard
            return;
        const leaderArmies = battleField[leader];
        let sum = 0;
        const personelCount = Object.values(leaderArmies);
        sum = personelCount.reduce((accumulator, currentValue) => accumulator + currentValue, sum);
        battleField[leader]['army count'] = sum; // note that leader is a string, it won-t affect the state of battlefield object
    }

    function calculateArmies(battleField) {
        const leaderNames = Object.keys(battleField);
        for (const leader of leaderNames) {
            appendArmyCountByLeader(battleField, leader);
        }
    }

    function printLeader(leader, armies, battleField) {
        // print the leader with his total army
        console.log(`${leader}: ${battleField[leader]['army count']}`);

        // sort his armies in descending order and print them
        const sortedLeaderArmies = Object.entries(armies)
        .filter(([armyName, personelCount]) => armyName != 'army count') // filter the 'helper' attribute when printing
        .sort(([armyNameA, personelCountA], [armyNameB, personelCountB]) => 
            personelCountB - personelCountA);
        for (const [armyName, personelCount] of sortedLeaderArmies) { // alternative would be to use forEach with a army printing function
            console.log(`>>> ${armyName} - ${personelCount}`);
        }
    }

    function printArmies(battleField) {
        calculateArmies(battleField);
        const sortedLeadersBattleField = Object.entries(battleField)
        .sort(([leaderA, aLeaderArmyObj], [leaderB, bLeaderArmyObj]) =>
        bLeaderArmyObj['army count'] - aLeaderArmyObj['army count']
        );
        for (const [leader, armies] of sortedLeadersBattleField) {
            printLeader(leader, armies, battleField);
        }
    }

    
    let battleField = {}; // will have leaders for keys and Obj<armyName, count> for value
    processInput(battleField, input);
    printArmies(battleField);
}

// TODO make the objects contain only name and value, no double name of armies

processArmies(['Rick Burr arrives', 'Fergus: Wexamp, 30245', 'Rick Burr: Juard, 50000', 
'Findlay arrives', 'Findlay: Britox, 34540', 'Wexamp + 6000', 
'Juard + 1350', 'Britox + 4500', 'Porter arrives', 'Porter: Legion, 55000', 
'Legion + 302', 'Rick Burr defeated', 'Porter: Retix, 3205']);

console.log('\n');
processArmies(['Rick Burr arrives', 'Findlay arrives', 'Rick Burr: Juard, 1500', 
'Wexamp arrives', 'Findlay: Wexamp, 34540', 'Wexamp + 340',
 'Wexamp: Britox, 1155', 'Wexamp: Juard, 43423']);