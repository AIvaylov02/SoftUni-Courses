function addItem() {
    let inputTextNode = document.getElementById('newItemText');
    let inputValueNode = document.getElementById('newItemValue');

    // take the values and clear the previous input parameters
    const newItemText = inputTextNode.value;
    const newItemValue = inputValueNode.value;
    inputTextNode.value = '';
    inputValueNode.value = '';
    //should empty input be even parsed? In this implementation it works, even though it shouldnt
    let newNode = document.createElement('option');
    newNode.textContent = newItemText;
    newNode.value = newItemValue;
    document.getElementById('menu').appendChild(newNode);
}