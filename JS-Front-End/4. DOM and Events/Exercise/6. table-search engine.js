function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      clearPreviousResult();
      const searchedWord = retrieveNewWord();
      searchTableForMatches(searchedWord);
   }

   // clear the previous matches by going over the select matches
   function clearPreviousResult() {
      let previousMatches = document.getElementsByClassName('select');
      let convertedPreviousMatches = Array.from(previousMatches);
      for (let match of convertedPreviousMatches)
         match.classList.remove('select');
   }

   // take the input and clear the input cell
   function retrieveNewWord() {
      let inputField = document.getElementById('searchField');
      const searchedWord = inputField.value;
      inputField.value = '';
      return searchedWord;
   }

   // traverse the table, adding select to each result
   function searchTableForMatches(searchedWord) {
      let table = document.getElementsByClassName('container')[0];
      // if there is a cell with a match, select the whole row, keep in mind we have to traverse an HTML table
      for (let i = 1, row = table.rows[i];  i < table.rows.length - 1; i++, row = table.rows[i]) {
         for (let j = 0, col; col = row.cells[j]; j++) {
            if (col.textContent.includes(searchedWord)) {
               row.classList.add('select');
               break;
            }

         }
      }

   }

}