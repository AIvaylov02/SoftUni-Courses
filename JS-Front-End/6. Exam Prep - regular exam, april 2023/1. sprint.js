function processSprint(arr) {

    function createTask(assignee, taskId, title, status, estimatedPoints) {
        return {
            'assignee': assignee,
            'taskId': taskId,
            'title': title,
            'status': status,
            'estimatedPoints': estimatedPoints
        }
    }

    function parseRow(arr, index, sprint) {
        const splitCmd = arr[index].split(':');
        const assignee = splitCmd[0];
        const taskId = splitCmd[1];
        const title = splitCmd[2];
        const status = splitCmd[3];
        const estimatedPoints = Number(splitCmd[4]);

        const task = createTask(assignee, taskId, title, status, estimatedPoints);

        if (!sprint.hasOwnProperty(assignee))
            sprint[assignee] = [];
        sprint[assignee].push(task);
    }

    function processInitialState(arr, sprint) {
        const initialCmdCount = Number(arr[0]);
        let index = 1;
        while (index <= initialCmdCount) {
            parseRow(arr, index, sprint);
            index++;
        }

        return index;
    }

    function addNewTaskToPerson(sprint, assignee, taskId, title, status, estimatedPoints) {
        const task = createTask(assignee, taskId, title, status, estimatedPoints);
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
        } else {
            sprint[assignee].push(task);
        }
    }

    function changeStatus(sprint, assignee, taskId, newStatus) {
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
            return;
        }

        const personTasksArr = sprint[assignee];
        const foundTask = personTasksArr.find((task) => task.taskId === taskId);
        if (typeof foundTask === 'undefined') { // no such task exists
            console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
        } else {
            foundTask.status = newStatus;
        }
    }

    function removeTask(sprint, assignee, index) {
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
            return;
        }

        if (index >= sprint[assignee].length || index < 0) {
            console.log("Index is out of range!");
        } else {
            sprint[assignee].splice(index, 1);
        }
    }

    function processNextCommands(arr, sprint, index) {
        const parser = {
            'Add New': addNewTaskToPerson,
            'Change Status': changeStatus,
            'Remove Task': removeTask
        }

        while (index < arr.length) {
            const splitRow = arr[index].split(':');
            const [cmd, ...rest] = splitRow;
            const assignee = rest[0];
            if (cmd === 'Remove Task') {
                const index = Number(rest[1]);
                parser[cmd](sprint, assignee, index);
            }
            else {
                const taskId = rest[1];
                let status = rest[2]; // if it is command for change
                if (cmd === 'Add New') {
                    const title = rest[2];
                    status = rest[3];
                    const estimatedPoints = Number(rest[4]);
                    parser[cmd](sprint, assignee, taskId, title, status, estimatedPoints);
                } else { // we need to change status
                    parser[cmd](sprint, assignee, taskId, status);
                }
            }

            index++;
        }
    }

    function calculateCategoryPoints(personTasksObjArr, pointsTracker) {
        for (const task of personTasksObjArr) {
            const taskStatus = task.status;
            pointsTracker[taskStatus] += task.estimatedPoints;
        }
    }

    function calculateSprintScores(sprint) {
        let pointsTracker = {
            'ToDo': 0,
            'In Progress': 0,
            'Code Review': 0,
            'Done': 0
        };
        
        const taskObjArrays = Object.values(sprint);
        for (const personTaskObjArr of taskObjArrays) {
            calculateCategoryPoints(personTaskObjArr, pointsTracker);
        }
        return pointsTracker;
    }

    function printSprintResult(pointsTracker) {
        console.log(`ToDo: ${pointsTracker['ToDo']}pts`);
        console.log(`In Progress: ${pointsTracker['In Progress']}pts`);
        console.log(`Code Review: ${pointsTracker['Code Review']}pts`);
        console.log(`Done Points: ${pointsTracker['Done']}pts`);

        const unfinishedTasksPoints = pointsTracker['ToDo'] + pointsTracker['In Progress'] + pointsTracker['Code Review'];
        const sprintResult = unfinishedTasksPoints <= pointsTracker['Done'] ? 'successful!' : 'unsuccessful...';
        console.log(`Sprint was ${sprintResult}`);
    }

    let sprint = {};
    let index = processInitialState(arr, sprint);
    processNextCommands(arr, sprint, index); // maybe works alright
    const pointsTracker = calculateSprintScores(sprint);
    printSprintResult(pointsTracker);

}

processSprint(['5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
    ]);
console.log('\n');

processSprint(['4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1222:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
]);