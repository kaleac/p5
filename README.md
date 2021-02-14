### Chinese to Picture Matching Gamee
4x4 grid that tests 8 different Chinese characters: 

Variables:
- flipped = map button to boolean
- solution = map button to its matching button
- locations array, used in setup to place all the buttons
- buttons array = uses the back side of the cards as images
- have 16 different functions called drawChineseFire, drawFire to pass into each "backbutton"
- numCardsFlipped = int that is 0, 1, 2
- need 16 

Algo:
- place in all locations, a cardW x cardL sized photo of the back of the cards (use a button rectangle for now)
- when backbutton.mouseClicked() 

Syntax:

https://www.geeksforgeeks.org/map-in-javascript/
var map = new Map();
map.set
map.get


// this is called on mouseClicked
function draw____(imageStr) {
  if nCF == 2:
  // do nothing/display msg
  return
  nCF++
  // change the backbutton's image to whatever is in the ____ using
  button = createImage();
  if nCF == 2:
  
  // check if we have a match, set nCF back to 0
  backbutton.remove();
  button.remove();
  if nCF == 1:
  backbutton.remove();
  return
}

function reverseDraw() {
// remove the current button
// create a backbutton there again
}
To do:
- cardsLeft variable
- gameFinished boolean variable
- replace 2 flip functions with lambda
- replace flipBack with lambda
