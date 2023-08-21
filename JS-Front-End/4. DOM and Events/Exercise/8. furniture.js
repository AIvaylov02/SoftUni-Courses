function solve() {
  
  document.getElementsByTagName('button')[0].addEventListener('click', generateItems);
  document.getElementsByTagName('button')[1].addEventListener('click', buyItems);
  
  // add event listener to generate button
  function generateItems() {
    const receivedFurniture = JSON.parse(document.querySelector("textarea").value);
    const tableBodyNode = document.getElementsByTagName('tbody')[0];
    
    function createImageNode(furniture) {
      const imageCellNode = document.createElement('td');
      const imageNode = document.createElement('img');
      imageNode.src = furniture.img;
      imageCellNode.appendChild(imageNode);
      return imageCellNode;
    }

    function createTextContentNode(furniture, furnitureAttribute) {
      const nameCellNode = document.createElement('td');
      const textContentNode = document.createElement('p');
      textContentNode.textContent = furniture[furnitureAttribute];
      nameCellNode.appendChild(textContentNode);
      return nameCellNode;
    }

    function createCheckboxNode(furniture) {
      const checkboxNode = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkboxNode.appendChild(checkbox);
      return checkboxNode;
    }

    function createNewFurnitureRowNode(furniture) {
      const imageCellNode = createImageNode(furniture);
      const nameCellNode = createTextContentNode(furniture, 'name');
      const priceNode = createTextContentNode(furniture, 'price');
      const decorationFactorNode = createTextContentNode(furniture, 'decFactor');
      const checkboxNode = createCheckboxNode(furniture);

      const newFurnitureNode = document.createElement('tr');
      newFurnitureNode.appendChild(imageCellNode);
      newFurnitureNode.appendChild(nameCellNode);
      newFurnitureNode.appendChild(priceNode);
      newFurnitureNode.appendChild(decorationFactorNode);
      newFurnitureNode.appendChild(checkboxNode);

      return newFurnitureNode;
    }

    for (const furniture of receivedFurniture) {
      tableBodyNode.appendChild(createNewFurnitureRowNode(furniture));
    }

  }

  // add event listener to buy button
  function buyItems() {
  
    function buyItem(row, buySummary) {
      const neededInfoNodes = row.getElementsByTagName('p');
      const name = neededInfoNodes[0].textContent;
      const price = Number(neededInfoNodes[1].textContent);
      const decFactor = Number(neededInfoNodes[2].textContent);

      buySummary.boughtFurniture.push(name);
      buySummary.totalPrice += price;
      buySummary.averageDecorationFactor += decFactor;
    }

    function buySelectedItems(buySummary) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      if (checkboxes.length === 0) { // nothing has been marked
        return false;
      }

      const convertedArr = Array.from(checkboxes);
      const selectedRows = convertedArr
      .map(checkbox => checkbox.parentElement)
      .map(cell => cell.parentElement);

      for (const row of selectedRows) {
        buyItem(row, buySummary);
      }

      buySummary.averageDecorationFactor /= buySummary.boughtFurniture.length;
      return true;
    }
    
    function convertBuyInfoToPrintableFormat(buySummary) {
      let result = `Bought furniture: ${buySummary.boughtFurniture.join(', ')}\n`;
      result += `Total price: ${buySummary.totalPrice.toFixed(2)}\n`;
      result += `Average decoration factor: ${buySummary.averageDecorationFactor}`;
      return result;
    }

    function showBoughtItemsOnPage(selectedItemsInfo) {
      document.getElementsByTagName('textarea')[1].textContent = selectedItemsInfo;
    }

    const buySummary = {
      boughtFurniture: [],
      totalPrice: 0,
      averageDecorationFactor: 0
    };

    if (!buySelectedItems(buySummary))
      return;
    const selectedItemsInfo = convertBuyInfoToPrintableFormat(buySummary);
    showBoughtItemsOnPage(selectedItemsInfo);

  }
  
}