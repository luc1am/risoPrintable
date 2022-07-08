class Text{
  constructor(word, x,y){
    this.word = word;
    this.x = x;
    this.y = y;
  }
  display(){
    let textGraphic = createGraphics(width, height);
    textGraphic.fill(0);
    textGraphic.textStyle(BOLD);
    textGraphic.textFont('Helvetica');
    textGraphic.textAlign(CENTER, CENTER);
    textGraphic.textSize(20);
    textGraphic.text(this.word, this.x,this.y);
    pink.cutout(textGraphic);
    blue.cutout(textGraphic);
  }
}
let webcam;

//colors;
let pink;
let blue;
let black;

let input;
let butt;

let inword;

let words = [];

function setup() {
  createCanvas(595,842);
  background(255);
  webcam = createCapture(VIDEO);
  //webcam.size(height*(webcam.width/webcam.height), height*(webcam.height/webcam.width))
  webcam.hide();
  pink = new Riso("fluorescentpink");
  blue = new Riso("aqua");
  yellow = new Riso("black");
  //blue.fill(200);
  pink.fill(255);
  yellow.fill(255);
  input = createInput("type in");
  input.position(width+20, 100);
  butt = createButton("send");
  butt.position(width+20, 120);
  butt.mousePressed(sendWord);
}

function draw() {
  background(255);
  clearRiso();
  for (let i = 0; i< height+200; i+=10){
    blue.noFill();
    blue.stroke(255);
    blue.strokeWeight(3);

    blue.ellipse(width/2, height/2,i);
  }
  let halftoned= halftoneImage(webcam, "circle", 5);
  pink.image(halftoned, -(width/2),0, height*(webcam.width/webcam.height), height);
  blue.cutout(pink);



  if (mouseIsPressed){
    words.push(new Text(inword, mouseX, mouseY))
    // let textGraphic = createGraphics(width, height);
    // textGraphic.fill(0);
    // textGraphic.textStyle(BOLD);
    // textGraphic.textFont('Helvetica');
    // textGraphic.textAlign(CENTER, CENTER);
    // textGraphic.textSize(20);
    // textGraphic.text(inword, mouseX,mouseY);
    // pink.cutout(textGraphic);
    // blue.cutout(textGraphic);
  }
  for (let i = 0; i < words.length; i++){
    words[i].display();
  }
  drawRiso();

}

function sendWord(){
  inword = input.value();
  input.value('');
}

function keyTyped(){
  if (keyCode == ENTER){
    sendWord();
  }
}

// function mousePressed(){
//   if (mouseIsPressed){
//     let textGraphic = createGraphics(width, height);
//     textGraphic.fill(0);
//     textGraphic.textStyle(BOLD);
//     textGraphic.textFont('Helvetica');
//     textGraphic.textAlign(CENTER, CENTER);
//     textGraphic.textSize(20);
//     textGraphic.text(inword, mouseX,mouseY);
//     pink.cutout(textGraphic);
//     blue.cutout(textGraphic);
//   }
//
// }

function keyPressed(){
  if (keyCode == ESCAPE){
    exportRiso();
    //startListeningCatfis
  }
}
