function setup() {
  // put setup code here
  createCanvas(400, 400);
  let green = '#210042';
  let color = '#188812'
  let value = green;
}

function draw() {
  // put drawing code here
  background(220);
  if (mouseClicked) {
    fill(value);
    triangle(30, 30, 58, 20, 86, 75);
  }
}