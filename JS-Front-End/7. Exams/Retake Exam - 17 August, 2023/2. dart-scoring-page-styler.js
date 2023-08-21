window.addEventListener("load", solve);

function solve() {
  const inputNameNode = document.getElementById('player');
  const inputScoreNode = document.getElementById('score');
  const inputRoundNode = document.getElementById('round');

  const sureListNode = document.getElementById('sure-list');
  const scoreboardListNode = document.getElementById('scoreboard-list');

  const addDartScoreButton = document.getElementById('add-btn');
  addDartScoreButton.addEventListener('click', addDartScoreFromForm)

  const clearButtonNode = document.querySelector(".dart.title-dart.board > .clear");
  clearButtonNode.addEventListener('click', () => location.reload());

  // helper function to check if all inputs have been filled properly. Should receive the parameters for general solution
  function areInputsFilled() {
    const inputNameContent = inputNameNode.value;
    const inputScoreContent = inputScoreNode.value;
    const inputRoundContent = inputRoundNode.value;

    return !inputNameContent || !inputScoreContent || !inputRoundContent;
  }

  function alterTheInputValues(nameValue, scoreValue, roundValue) {
    inputNameNode.value = nameValue;
    inputScoreNode.value = scoreValue;
    inputRoundNode.value = roundValue;
  }

  function createListElement(name, score, round) {
    // create the Node that will parent all other values
    const listItemNode = document.createElement('li');
    listItemNode.classList.add('dart-item');

    // the articleNode which will hold each paragraph
    const articleNode = document.createElement('article');
    
    // create the inner node, set its value(convert it if needed to some special string) and append to article
    const nameNode = document.createElement('p');
    nameNode.textContent = name;
    articleNode.appendChild(nameNode);

    const scoreNode = document.createElement('p');
    scoreNode.textContent = `Score: ${score}`;
    articleNode.appendChild(scoreNode);
    
    const roundNode = document.createElement('p');
    roundNode.textContent = `Round: ${round}`;
    articleNode.appendChild(roundNode);
    listItemNode.appendChild(articleNode);

    // create the 2 buttons, add their classes and the event listners for each one of them

    const editButtonNode = document.createElement('button');
    editButtonNode.classList.add('btn', 'edit');
    editButtonNode.textContent = 'edit';
    editButtonNode.addEventListener('click', editPersonInformation)
    listItemNode.appendChild(editButtonNode);

    const confirmScoreButtonNode = document.createElement('button');
    confirmScoreButtonNode.classList.add('btn', 'ok');
    confirmScoreButtonNode.textContent = 'ok';
    confirmScoreButtonNode.addEventListener('click', addToScoreboard);
    listItemNode.appendChild(confirmScoreButtonNode);

    return listItemNode;
  }

  function addDartScoreFromForm(event) {
    if (!areInputsFilled)
      return;

    // extract the content and we can parse as we know everything is already valid
    const inputNameContent = inputNameNode.value;
    const inputScoreContent = Number(inputScoreNode.value);
    const inputRoundContent = Number(inputRoundNode.value);

    // nullify input nodes values
    alterTheInputValues('','','');

    // create HTML element
    const listItemNode = createListElement(inputNameContent, inputScoreContent, inputRoundContent);
    sureListNode.appendChild(listItemNode);

    // disable button
    event.currentTarget.disabled = true;
  }

  function transferContentFromListItemToInput(listItemNode) {
    const nodesToExtractFrom = Array.from(listItemNode.children[0].children);
    // we have an array of paragraphs, index it and extract info
    const name = nodesToExtractFrom[0].textContent;
    
    const rawScoreValue = nodesToExtractFrom[1].textContent;
    const score = Number(rawScoreValue.split('Score: ')[1]);
    // first element from splitting would be empty string the other will be the needed value;
    const rawRoundValue = nodesToExtractFrom[2].textContent;
    const round = Number(rawRoundValue.split('Round: ')[1]);

    // we have the needed content, time to parse it into each node collection
    alterTheInputValues(name, score, round);
  }

  function editPersonInformation(event) {
    const listItemNode = event.currentTarget.parentElement;
    // put the content into the input fields
    transferContentFromListItemToInput(listItemNode);
    // delete the information
    listItemNode.parentElement.removeChild(listItemNode);
    // enable add button
    addDartScoreButton.disabled = false;
  }

  function removeButtonsOfListItem(listItemNode) {
    const buttons = listItemNode.getElementsByTagName('button');
    // traverse the collection by removing each child of the buttons
    while (buttons.length > 0) {
      // because buttons is liveCollection, for of won't work as it skips always one index
      listItemNode.removeChild(buttons[0]);
    }
  }

  function addToScoreboard(event) {
    const listItemNode = event.currentTarget.parentElement;
    // remove the 2 buttons in the listItemNode
    removeButtonsOfListItem(listItemNode);
    // remove the itemNode from the sure-'list' ul
    listItemNode.parentElement.removeChild(listItemNode);
    // append it to the second
    scoreboardListNode.appendChild(listItemNode);
    // enable add button
    addDartScoreButton.disabled = false;
  }
}
  