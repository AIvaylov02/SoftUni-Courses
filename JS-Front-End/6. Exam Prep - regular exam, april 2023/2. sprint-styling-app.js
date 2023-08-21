window.addEventListener('load', solve);

function solve() {
    // TODO:
    document.getElementById('create-task-btn').addEventListener('click', createSprint);
    document.getElementById('delete-task-btn').addEventListener('click', deleteArticlePermanently);

    function areAllFieldsFilled(titleContent, descriptionContent, labelContent, estimationContent, assignee) {
        return titleContent !== '' && 
        descriptionContent !== '' &&
        labelContent !== '' &&
        estimationContent != '' &&
        assignee != '';
    }

    function extractAllContent(nodeObj) {
        const titleContent = nodeObj['titleNode'].value;
        const descriptionContent = nodeObj['descriptionNode'].value;
        const labelContent = nodeObj['labelNode'].value;
        const estimationContent = nodeObj['estimationNode'].value;
        const assignee = nodeObj['assigneeNode'].value;

        if (!areAllFieldsFilled(titleContent, descriptionContent, labelContent, estimationContent, assignee))
            return {};
        return {
            'titleContent': titleContent,
            'descriptionContent': descriptionContent,
            'labelContent': labelContent,
            'estimationContent': Number(estimationContent),
            'assignee': assignee
        };
    }

    function getAllNodesToObj() {
        const titleNode = document.getElementById('title');
        const descriptionNode = document.getElementById('description');
        const labelNode = document.getElementById('label');
        const estimationNode = document.getElementById('points');
        const assigneeNode = document.getElementById('assignee');
        return {
            'titleNode': titleNode,
            'descriptionNode': descriptionNode,
            'labelNode': labelNode,
            'estimationNode': estimationNode,
            'assigneeNode': assigneeNode
        };
    }
    
    function emptyFields(nodeObj) {
        const hmtlNodes = Object.values(nodeObj);
        for (const node of hmtlNodes) {
            node.value = '';
        }
    }

    function switchFieldsEnabling(nodeObj, mode) {
        const hmtlNodes = Object.values(nodeObj);

        if (mode === 'disabled')
            mode = true;
        else
            mode = false;
        for (const node of hmtlNodes) {
            node.disabled = mode;
        }
    }

    function getNextTaskId() {
        return document.querySelectorAll('#tasks-section article').length + 1;
    }

    function recalculatePoints(mode, value) {
        const totalPointsNode = document.getElementById('total-sprint-points');
        const rawContent = totalPointsNode.textContent.trim();
        const rawPoints = rawContent.split('Total Points ')[1].split('pts')[0];
        let currentPoints = Number(rawPoints);
        if (mode === '-') {
            currentPoints -= value;
        } else {
            currentPoints += value;
        }
        totalPointsNode.textContent = `Total Points ${currentPoints}pts`;
    }


    function createSprint() {
        
        function visualizeInfo(sprintInfo) {
            const articleNode = document.createElement('article');
            articleNode.classList.add('task-card');
            articleNode.setAttribute('id', `task-${getNextTaskId()}`);
            // so far so good
            const divLabelNode = document.createElement('div');
            divLabelNode.classList.add('task-card-label');
            let labelContent = sprintInfo.labelContent;
        
            switch (labelContent) {
                case 'Feature':
                    divLabelNode.classList.add('feature');
                    break;
                case 'Low Priority Bug':
                    divLabelNode.classList.add('low-priority');
                    break;
                case 'High Priority Bug':
                    divLabelNode.classList.add('high-priority')
                    break;
            }

            const BUG_CODES = {
                'Feature': '&#8865',
                'Low Priority Bug': '&#9737',
                'High Priority Bug': '&#9888'
            };

            const labelIcon = BUG_CODES[labelContent];
            labelContent += ` ${labelIcon}`;
            divLabelNode.innerHTML = labelContent;
            articleNode.appendChild(divLabelNode);

            const headingNode = document.createElement('h3');
            headingNode.classList.add('task-card-title');
            headingNode.textContent = sprintInfo.titleContent;
            articleNode.appendChild(headingNode);

            const descriptionNode = document.createElement('p');
            descriptionNode.classList.add('task-card-description');
            descriptionNode.textContent = sprintInfo.descriptionContent;
            articleNode.appendChild(descriptionNode);

            const pointsNode = document.createElement('div');
            pointsNode.classList.add('task-card-points');
            pointsNode.textContent = `Estimated at ${sprintInfo.estimationContent} pts`;
            articleNode.appendChild(pointsNode);

            const assigneeNode = document.createElement('div');
            assigneeNode.classList.add('task-card-assignee');
            assigneeNode.textContent = `Assigned to: ${sprintInfo.assignee}`;
            articleNode.appendChild(assigneeNode);

            const buttonHolderNode = document.createElement('div');
            buttonHolderNode.classList.add('task-card-actions');
            const buttonNode = document.createElement('button');
            buttonNode.addEventListener('click', loadArticleForDeletion);
            buttonNode.textContent = 'Delete';
            buttonHolderNode.appendChild(buttonNode);
            articleNode.appendChild(buttonHolderNode);

            // place the article in the page
            document.getElementById('tasks-section').appendChild(articleNode);
            // add the points to the total
           recalculatePoints('+', sprintInfo.estimationContent);
        }

        const nodeObj = getAllNodesToObj();
        const sprintInfo = extractAllContent(nodeObj);
        if (Object.keys(sprintInfo).length === 0) // some fields are missing
            return;
        // else sprintInfo contains the needed content, while nodeObj holds the needed nodes
        emptyFields(nodeObj);
        visualizeInfo(sprintInfo);
    }

    function loadArticleForDeletion(event) {
        const targetArticle = event.currentTarget.parentElement.parentElement;
        // load the information of it to the form, dont remove it yet

        // parse all the information in the correct format for input
        const infoNodes = targetArticle.children;
        const featureContentRaw = infoNodes[0].textContent.split(' ');
        let featureContent;
        switch (featureContentRaw[0]) {
            case "Feature":
                featureContent = "Feature";
                break;
            case "Low":
                featureContent = "Low Priority Bug";
                break;
            case "High":
                featureContent = "High Priority Bug";
                break;
        }

        const titleContent = infoNodes[1].textContent;
        const detailsContent = infoNodes[2].textContent;
        let estimationContent = infoNodes[3].textContent;
        estimationContent = estimationContent.split('Estimated at ')[1].split(' pts')[0];
        estimationContent = Number(estimationContent);

        let assigneeContent = infoNodes[4].textContent;
        assigneeContent = assigneeContent.split('Assigned to: ')[1];


        // get the information in the input nodes and disable each one
        const inputNodes = getAllNodesToObj();
        inputNodes.titleNode.value = titleContent;
        inputNodes.descriptionNode.value = detailsContent;
        inputNodes.labelNode.value = featureContent;
        inputNodes.estimationNode.value = estimationContent;
        inputNodes.assigneeNode.value = assigneeContent;
        switchFieldsEnabling(inputNodes, 'disabled');
        
        // enable delete and disable create button
        document.getElementById('create-task-btn').disabled = true;
        document.getElementById('delete-task-btn').disabled = false;

        // load the hidden type with the id of the article
        const taskIdNode = document.getElementById('task-id');
        taskIdNode.value = targetArticle.getAttribute('id');
        taskIdNode.disabled = true;
        
    }

    function deleteArticlePermanently() {
        // get the element
        const taskId = document.getElementById('task-id').value;
        // delete the task from the dom tree
        const articleToRemove = document.getElementById(taskId);
        articleToRemove.parentElement.removeChild(articleToRemove);
        // clear the input fields
        const inputNodes = getAllNodesToObj();
        const pointsToRemove = Number(inputNodes.estimationNode.value);
        emptyFields(inputNodes);
        document.getElementById('task-id').value = '';
        // enable create and disable delete button
        document.getElementById('create-task-btn').disabled = false;
        document.getElementById('delete-task-btn').disabled = true;

        // enable fields
        switchFieldsEnabling(inputNodes, 'enabled');

        //recalculate points
        recalculatePoints('-', pointsToRemove);
    }
}