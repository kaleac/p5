let canvasLength;
let locations;
let numCF;
let flipped;
let images;
let img;
let cardW;
let cardL;
let buttons;
let indices;
let vocab;
let cardsLeft;
let gameWon;
var firebackbutton;

var firecbutton;
/** need to match locations to flipped, images (shuffled)
*/
function setup() {
  canvasLength = 2000;
  locations = [];
  numCF = 0;
  flipped = new Map();
  buttons = new Map();
  indices = new Map();
  vocab = ['chinesefire', 'water', 'earth', '', 'fire', '', '', '', 'chineseearth', '', '', 'chinesewater', '', '', '', ''];
  cardsLeft = 16;
  gameWon = false;
  createCanvas(canvasLength, canvasLength);

  cardW = 40;
  cardL = 60;
  let x = (canvasLength / 5);
  for (i = x; i < canvasLength; i = i + x + 40) {
    for (j = x; j < canvasLength; j = j + x + 60) {
      let direction = [i - 15, j - 15];
      locations.push(direction);
    }
  }
  for (i = 0; i < locations.length; i++) {
    let word = vocab[i];
    let loc = locations[i];
    let x = loc[0];
    let y = loc[1];
    indices.set(word, i);

    let button = createImg('assets/back.png', word+' back', () => {button.size(10, AUTO)});
    button.position(x, y);
    button.mousePressed(x => flip(word));

    // add current button to buttons map
    buttons.set(word, button);
    flipped.set(word, false);
  }
}

function draw() {
  background(0);
  resizeCanvas(windowWidth, windowHeight);
  if (gameWon) {
    displayCongratulations();
  }
}

function flip(vocabWord) {
  if (nCF == 2) {
    // display msg
    displayMessage('only 2 cards can be flipped at a time :(');
    // how do i wipe this message after 1.5 seconds?
    return;
  }
  // remove whatever is at our vocab word right now
  let index = indices.get(vocabWord);
  let curButton = buttons.get(vocabWord);
  let loc = locations[index];
  let x = loc[0];
  let y = loc[1];
  let complement;
  if (vocabWord.slice(0, 7) == 'chinese') {
    complement = vocabWord.slice(7);
  } else {
    complement = 'chinese' + vocabWord;
  }
  // newButton = createImg('assets/chinesefire.png', vocabWord);
  newButton = createImg('assets/'+vocabWord+'.png', vocabWord);
  newButton.position(x, y);
  newButton.mousePressed(x => flipBack(vocabWord)); // replace flipBack with lambda
  flipped.set(vocabWord, true);
  if (nCF == 2) {
    // the matching card is also flipped
    if (flipped.get(complement)) {
      // remove newButton after waiting 2 seconds?
      complementButton = buttons.get(complement);
      newButton.remove();
      complementButton.remove();
      buttons.set(vocabWord, null);
      buttons.set(complement, null);
      flipped.set(vocabWord, null);
      flipped.set(complement, null);
      nCF = 0;
      cardsLeft -= 2;
      if (cardsLeft == 0) {
        gameWon = true;
      }
    }
  }
  curButton.remove();
  nCF++;
}

function flipBack(vocabWord) {
  let index = indices.get(vocabWord);
  let curButton = buttons.get(vocabWord);
  let loc = locations[index];
  let x = loc[0];
  let y = loc[1];
  nCF--;
  flipped.set(vocabWord, false);
  curButton.remove();
  backbutton = createImg('assets/back.jpg', vocabWord+' back');
  backbutton.position(x, y);
  backbutton.mousePressed(x => flip(vocabWord)); // replace flip with lambda
}

function displayCongratulations() {
  textSize(32);
  text('congrats! you just learned 8 chinese characters!', 10, 60);
  fill(0, 102, 153, 51);
}

function displayMessage(msg) {
  textSize(20);
  text(msg, 10, 60);
  fill(0, 102, 153, 51);
}
// function drawFireBack() {
//   let index = indices.get('fire');
//   let loc = locations[index];
//   let x = loc[0];
//   let y = loc[1];
//   nCF--;
//   firebackbutton = createImg('assets/back.jpg', 'fire back');
//   firebackbutton.position(x, y);
//   firebackbutton.mousePressed(flipFire);
// }
// function flipFireBack() {
//   firecbutton.remove();
//   drawFireBack();
//   nCF--;
// }

// function flipFire() {
//   let index = indices.get('fire');
//   let curButton = buttons.get('fire');
//   let loc = locations[index];
//   let x = loc[0];
//   let y = loc[1];
//   if (nCF == 2) {
//     return;
//   }
//
//   firecbutton = createImg('assets/chinesefire.png', 'chinese fire');
//   firecbutton.position(x, y);
//   firecbutton.mousePressed(flipFireBack);
//   flipped.set('firec', true);
//   if (nCF == 2) {
//     if (flipped.get('fire')) {
//       nCF = 0;
//       firecbutton.remove();
//       firebutton.remove();
//     }
//   }
//
//   curButton.remove();
//   firebackbutton.remove();
//   nCF++;
// }
// function flipCard() {
//
// }
//   if (keyIsPressed) {
//     for (int charIndex = 0; i < keys.length < i++) {
//       if (keys[charIndex] == key) {

//       }
//     }
  // }

// function cardClicked(x, y, )
// function keyPressed() {
//   if (value === 0) {
//     value = 255;
//   } else {
//     value = 0;
//   }
// }
