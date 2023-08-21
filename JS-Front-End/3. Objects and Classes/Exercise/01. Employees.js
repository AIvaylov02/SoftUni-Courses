function registerEmployees(listOfNames) {
    function createEmployee(name) {
        return {employeeName: name, personalNum: name.length};
    }

    let employeesCardsVisualized = listOfNames.map((name) => {
        let employee = createEmployee(name);
        return `Name: ${employee.employeeName} -- Personal Number: ${employee.personalNum}`;
    });
    console.log(employeesCardsVisualized.join('\n'));
}

registerEmployees([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ]
    );