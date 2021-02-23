let canvasLength;
let locations;
let nCF;
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
let numFlips;
let wait;

var firecbutton;
/** need to match locations to flipped, images (shuffled)
*/
function setup() {
  // text
  // don't do until . .
  canvasLength = 700;
  locations = [];
  nCF = 0;
  flipped = new Map();
  buttons = new Map();
  indices = new Map();
  vocab = ['chinesefire', 'sun', 'chinesegold', 'wood', 'fire', 'mountain', 'chinesewood', 'chinesemoon', 'chineseearth', 'earth', 'water', 'chinesewater', 'gold', 'moon', 'chinesemountain', 'chinesesun'];
  cardsLeft = 16;
  gameWon = false;
  cardW = 80;
  cardL = 100;
  numFlips = 0;
  wait = false;
  createCanvas(canvasLength, canvasLength);
  // setTimeout(displayCongratulations, 3000);

  let x = (canvasLength / 5);
  for (let i = x - 30; i < canvasLength; i = i + x + 10) {
    for (j = x - 30; j < canvasLength; j = j + x + 10) {
      let direction = [i - 15, j - 15];
      locations.push(direction);
    }
  }
  for (let i = 0; i < locations.length; i++) {
    let word = vocab[i];
    let loc = locations[i];
    let x = loc[0];
    let y = loc[1];
    indices.set(word, i);
    let button = createImg('assets/back.png', word+' back', '', () => {button.size(cardW, cardL)});
    button.position(x, y);
    button.mousePressed(() => {flip(i)});

    // add current button to buttons map
    buttons.set(word, button);
    flipped.set(word, false);
  }
}

function draw() {
  background(255);
  resizeCanvas(windowWidth, windowHeight);
  if (!gameWon) {
    displayMessage('number of flips: \n'+numFlips, canvasLength, 4 * canvasLength/5, 16);
  }
  if (gameWon) {
    // CHANGE THIS TO DISPLAYMESSAGE
    //clear(); // trying to clear canvas
    sleep(800);
    displayCongratulations();
  }
}

function flip(i) {
  vocabWord = vocab[i];
  if (nCF == 2) {
    // displayMessage('only 2 cards can be flipped at a time :(', canvasLength/2, canvasLength, 16);
    // how do i wipe this message after 1.5 seconds?
    return;
  }
  nCF++;
  numFlips++;

  let curButton = buttons.get(vocabWord);
  curButton.remove();
  let loc = locations[i];
  let x = loc[0];
  let y = loc[1];
  let complement;
  if (vocabWord.slice(0, 7) == 'chinese') {
    console.log(vocabWord);
    complement = vocabWord.slice(7);
    console.log(complement);
  } else {
    complement = 'chinese' + vocabWord;
  }
  let newButton = createImg('assets/'+vocabWord+'.png', vocabWord, '', () => {newButton.size(cardW, cardL)});
  newButton.position(x, y);
  newButton.mousePressed(() => flipBack(i));
  flipped.set(vocabWord, true);
  buttons.set(vocabWord, newButton);
  if (nCF == 2) {
    // if the matching card is also flipped
    if (flipped.get(complement)) {
      complementButton = buttons.get(complement);
      console.log(vocabWord);
      console.log(vocabWord.length);
      setTimeout(() => {complementButton.remove(); newButton.remove();}, 800);
      console.log(complement);
      console.log(complement.length);
      buttons.set(vocabWord, null);
      buttons.set(complement, null);
      flipped.set(vocabWord, null);
      flipped.set(complement, null);
      nCF = 0;
      cardsLeft -= 2;
      if (cardsLeft == 0) {
        gameWon = true;
      }
      wait = true;
    }
  }
}

function flipBack(i) {
  vocabWord = vocab[i];
  let index = indices.get(vocabWord);
  let curButton = buttons.get(vocabWord);
  let loc = locations[index];
  let x = loc[0];
  let y = loc[1];
  nCF--;
  flipped.set(vocabWord, false);
  curButton.remove();
  backbutton = createImg('assets/back.png', vocabWord+' back', '', () => {backbutton.size(cardW, cardL)});
  backbutton.position(x, y);
  backbutton.mousePressed(() => flip(i));
  buttons.set(vocabWord, backbutton);
}

function displayCongratulations() {
  textSize(28);
  textFont('Monaco');
  text('\t\t\t\t\t\tcongrats!\nyou just learned 8 chinese characters!', canvasLength/2, canvasLength/2);
  fill(0, 102, 153);
}

function displayMessage(msg, x, y, size) {
  textSize(size);
  textFont('Monaco');
  text(msg, x, y);
  fill(0, 102, 153);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
