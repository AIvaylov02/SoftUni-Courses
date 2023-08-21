window.addEventListener("load", solve)

function solve() {

  document.getElementById('next-btn').addEventListener('click', extractInformation);
  
  function extractInformation(e) {
    // select the nodes, together with their values
    const inputStudentNameNode = document.getElementById('student')
    const studentName = inputStudentNameNode.value;
    const inputUniversityNode = document.getElementById('university');
    const university = inputUniversityNode.value;
    const inputScoreNode = document.getElementById('score')
    const score = inputScoreNode.value;

    // if one is empty, than stop the event and wait for more info
    if (studentName === '' || university === '' || score === '') {
      return;
    }

    // empty the boxes
    inputStudentNameNode.value = '';
    inputUniversityNode.value = '';
    inputScoreNode.value = '';
    // disable the button
    e.currentTarget.disabled = true;   

    const nameNode = document.createElement('h4');
    nameNode.textContent = studentName;
    const universityNode = document.createElement('p');
    universityNode.textContent = `University: ${university}`;
    const scoreNode = document.createElement('p');
    scoreNode.textContent = `Score: ${score}`;
    
    const articleNode = document.createElement('article');
    articleNode.appendChild(nameNode);
    articleNode.appendChild(universityNode);
    articleNode.appendChild(scoreNode);

    const editButtonNode = document.createElement('button');
    editButtonNode.classList.add('action-btn', 'edit');
    editButtonNode.textContent = 'edit';
    const applyButtonNode = document.createElement('button');
    applyButtonNode.classList.add('action-btn', 'apply');
    applyButtonNode.textContent = 'apply';


    const listItemNode = document.createElement('li');
    listItemNode.classList.add('application');

    listItemNode.appendChild(articleNode);
    listItemNode.appendChild(editButtonNode);
    listItemNode.appendChild(applyButtonNode);

    const listNode = document.getElementById('preview-list');
    listNode.appendChild(listItemNode);



    const actionButtons = document.getElementsByClassName("action-btn");
   // edit button
   const editButton = actionButtons[0];
   editButton.addEventListener('click', editInfo); 

   // apply button
    const applyButton = actionButtons[1];
    applyButton.addEventListener('click', apply)

   function editInfo() {
    // put the info back to editing
    const inputStudentNameNode = document.getElementById('student');
    inputStudentNameNode.value = document.getElementsByTagName('h4')[0].textContent;

    const inputUniversityNode = document.getElementById('university');
    let universityInfo = document.getElementsByTagName('p')[0].textContent;
    let prefixLength = "University: ".length;
    universityInfo = universityInfo.substring(prefixLength) 
    inputUniversityNode.value = universityInfo;

    const inputScoreNode = document.getElementById('score')
    let scoreInfo = document.getElementsByTagName('p')[1].textContent;
    prefixLength = "Score: ".length;
    scoreInfo = scoreInfo.substring(prefixLength);
    inputScoreNode.value = Number(scoreInfo);

    // remove the item from the ul
    const listNode = document.getElementById('preview-list');
    const listItemNode = document.getElementsByClassName('application')[0];
    listNode.removeChild(listItemNode);

    // enable the next button
    document.getElementById('next-btn').disabled = false;
   }

   function apply() {
    const previewListNode = document.getElementById('preview-list');
    const listItemNode = document.getElementsByClassName('application')[0];
    previewListNode.removeChild(listItemNode);
    listItemNode.removeChild(listItemNode.getElementsByTagName('button')[0]);
    listItemNode.removeChild(listItemNode.getElementsByTagName('button')[0]);
    const candidatesListNode = document.getElementById('candidates-list');
    candidatesListNode.appendChild(listItemNode);

    // enable the next button
    document.getElementById('next-btn').disabled = false;
   }

  }

   
}
  