function solve() {
  // extract the whole text and split it into an array
  const inputText = document.getElementById('input').value.split('.');
  // if element === '', skip it, but write the '.' symbol. Operation (input + '') leads to error(unwanted comma)
  

  // in order to pass by reference, we should use an object
  let sentenceTracker = {sentenceCounter: 0, newSentence: ''};

  // for of cycle doesn't work because we can't deal with the corner case of '.' at the final sentence. One could think that '..' 
  //could be a valid signal but what if they are part of the middle of the text as a valid sequence.
 
  // traverse the array and by each valid sentence % 3 === 0, add a new paragraph with the last 3 elements, corner case addition also
  const MAX_PARAGRAPH_SENTANCE_COUNT = 3;
  for (let i = 0; i < inputText.length - 1; i++) {
    let sentence = inputText[i];
    if (sentence === '') {
      sentenceTracker.newSentence += '.';
      continue;
    }

    sentenceTracker.newSentence = sentenceTracker.newSentence.concat(sentence + '.');
    sentenceTracker.sentenceCounter++;
    if (sentenceTracker.sentenceCounter === MAX_PARAGRAPH_SENTANCE_COUNT)
      attachTextToParagraphElement(sentenceTracker);
  }
  
  if (sentenceTracker.newSentence != '')
      attachTextToParagraphElement(sentenceTracker);

  function attachTextToParagraphElement(sentenceTracker) {
      let newNode = document.createElement('p');
      newNode.textContent = sentenceTracker.newSentence;
      document.getElementById('output').appendChild(newNode);

      sentenceTracker.sentenceCounter = 0;
      sentenceTracker.newSentence = '';
  }

}