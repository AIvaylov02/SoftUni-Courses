function create(words) {
   let documentNodeOfContent = document.getElementById('content');
   for (const word of words) {
      let contentNode = document.createElement('p');
      contentNode.textContent = word;
      contentNode.style.display = 'none';

      let divNode = document.createElement('div');
      divNode.appendChild(contentNode);
      divNode.addEventListener('click', displayContent);

      documentNodeOfContent.appendChild(divNode);
   }

   function displayContent(e) {
      const target = e.currentTarget;
      target.children[0].style.display = '';
   }
}