let canvasWidth = 500;//window.innerWidth*.8
let canvasHeight = 500;//window.innerHeight *.75

var drawing = null
var canvas

var database
var characters

var nameInput, instaInput, twitterInput;
var submitText;

const NUM_HEADS = NUM_SHIRTS = NUM_BOTTOMS = 10;
const CHOICE_DISPLAY_SIZE = 350

const ARROW_X_SIZE = 35
const ARROW_Y_SIZE = 50
const ARROW_GAP_SIZE = 20 //Gap in between arrows

const ARROW_LEFT_X = 320 //Left arrow Start
const ARROW_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE //Right arrow start

const HEAD_CHOICE_LEFT_Y = 160 //Left arrow for head Y pos
const SHIRT_CHOICE_LEFT_Y = 260 //Left arrow for shirt Y pos
const BOTTOM_CHOICE_LEFT_Y = 330 //Arrow for bottom Y pos

var headChoice = 0;
var shirtChoice = 1;
var bottomChoice = 0;

var heads = [];
var shirts = [];
var bottoms = [];
var arrowLeft, arrowRight

function preload() {
  for (let i = 0; i < NUM_HEADS; i++) {
    heads.push(loadImage('assets/heads/head_'+i+'.png'))
  }
  for (let i = 0; i < NUM_SHIRTS; i++) {
    shirts.push(loadImage('assets/shirts/shirt_'+i+'.png'))
  }
  for (let i = 0; i < NUM_BOTTOMS; i++) {
    bottoms.push(loadImage('assets/bottoms/bottom_'+i+'.png'))
  }

  arrowLeft = loadImage('assets/arrow_left.png')
  arrowRight = loadImage('assets/arrow_right.png')
}


function setup() {
  const firebaseConfig = {
    apiKey: "AIzaSyC9A4gzSfdhHSGy0nO00oxGw7Sw1jmuWLA",
    authDomain: "metamii.firebaseapp.com",
    databaseURL: "https://metamii-default-rtdb.firebaseio.com",
    projectId: "metamii",
    storageBucket: "metamii.appspot.com",
    messagingSenderId: "878613733822",
    appId: "1:878613733822:web:2fb7b578d4bcc732d659ef"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig)
  database = firebase.database()
  characters = database.ref('characters')
  // ref.on('value', gotData, errData)
  console.log(app)

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvascontainer')
  background(200)

  createP();
  createSpan("What's your name? ");
  nameInput = createInput();
  createP();
  createSpan("Whats your Instagram @? ");
  instaInput = createInput();
  createP();
  createSpan("Whats your Twitter @? ");
  twitterInput = createInput();
  createP();
  submitButton = createButton("Create Character!");
  createP();
  submitButton.mouseClicked(submitData);
  submitText = createSpan("");

  //HEAD ARROWS
  // const HEAD_CHOICE_LEFT_X = 380
  image(arrowLeft, ARROW_LEFT_X, HEAD_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const HEAD_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, HEAD_CHOICE_RIGHT_X, HEAD_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)

  //SHIRT ARROWS
  // const SHIRT_CHOICE_LEFT_X = 380
  image(arrowLeft, ARROW_LEFT_X, SHIRT_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const SHIRT_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, SHIRT_CHOICE_RIGHT_X, SHIRT_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)

  //BOTTOM ARROWS
  // const BOTTOM_CHOICE_LEFT_X = 380
  image(arrowLeft, ARROW_LEFT_X, BOTTOM_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const BOTTOM_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, BOTTOM_CHOICE_RIGHT_X, BOTTOM_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
}

function mouseClicked() {

  //Head left arrow check
  if (mouseX >= ARROW_LEFT_X && mouseX <= ARROW_LEFT_X+ARROW_X_SIZE && mouseY >= HEAD_CHOICE_LEFT_Y && mouseY <= HEAD_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    headChoice -= 1
    if (headChoice < 0) {
      headChoice = NUM_HEADS-1
    }
  }
  //Head right arrow check
  if (mouseX >= ARROW_RIGHT_X && mouseX <= ARROW_RIGHT_X+ARROW_X_SIZE && mouseY >= HEAD_CHOICE_LEFT_Y && mouseY <= HEAD_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    headChoice += 1
    headChoice = headChoice % NUM_HEADS
  }

  //Shirt left arrow check
  if (mouseX >= ARROW_LEFT_X && mouseX <= ARROW_LEFT_X+ARROW_X_SIZE && mouseY >= SHIRT_CHOICE_LEFT_Y && mouseY <= SHIRT_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    shirtChoice -= 1
    if (shirtChoice < 0) {
      shirtChoice = NUM_SHIRTS-1
    }
  }
  //Shirt right arrow check
  if (mouseX >= ARROW_RIGHT_X && mouseX <= ARROW_RIGHT_X+ARROW_X_SIZE && mouseY >= SHIRT_CHOICE_LEFT_Y && mouseY <= SHIRT_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    shirtChoice += 1
    shirtChoice = shirtChoice % NUM_SHIRTS
  }

  //Bottom left arrow check
  if (mouseX >= ARROW_LEFT_X && mouseX <= ARROW_LEFT_X+ARROW_X_SIZE && mouseY >= BOTTOM_CHOICE_LEFT_Y && mouseY <= BOTTOM_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    bottomChoice -= 1
    if (bottomChoice < 0) {
      bottomChoice = NUM_BOTTOMS-1
    }
  }
  //Shirt right arrow check
  if (mouseX >= ARROW_RIGHT_X && mouseX <= ARROW_RIGHT_X+ARROW_X_SIZE && mouseY >= BOTTOM_CHOICE_LEFT_Y && mouseY <= BOTTOM_CHOICE_LEFT_Y+ARROW_Y_SIZE) {
    bottomChoice += 1
    bottomChoice = bottomChoice % NUM_BOTTOMS
  }
}

function draw() {
  background(200)
  image(bottoms[bottomChoice], 10, 50, CHOICE_DISPLAY_SIZE, CHOICE_DISPLAY_SIZE)
  image(shirts[shirtChoice], 10, 50, CHOICE_DISPLAY_SIZE, CHOICE_DISPLAY_SIZE)
  image(heads[headChoice], 10, 50, CHOICE_DISPLAY_SIZE, CHOICE_DISPLAY_SIZE)

  image(arrowLeft, ARROW_LEFT_X, HEAD_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const HEAD_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, HEAD_CHOICE_RIGHT_X, HEAD_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)

  //SHIRT ARROWS
  // const SHIRT_CHOICE_LEFT_X = 380
  image(arrowLeft, ARROW_LEFT_X, SHIRT_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const SHIRT_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, SHIRT_CHOICE_RIGHT_X, SHIRT_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)

  //BOTTOM ARROWS
  // const BOTTOM_CHOICE_LEFT_X = 380
  image(arrowLeft, ARROW_LEFT_X, BOTTOM_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
  const BOTTOM_CHOICE_RIGHT_X = ARROW_LEFT_X + ARROW_X_SIZE + ARROW_GAP_SIZE
  image(arrowRight, BOTTOM_CHOICE_RIGHT_X, BOTTOM_CHOICE_LEFT_Y, ARROW_X_SIZE, ARROW_Y_SIZE)
}

function gotData(data) {
  console.log("SUCCESSFULLY CONNECTED TO FIREBASE!")
  console.log(data)
}


function errData(err) {
  console.log("ERROR CONNECTING TO FIREBASE")
  console.log(err)
}

function submitData() {
  console.log("Submitted character!")
  if (nameInput.value() == "") {
    submitText.html("Please input a name!")
    return;
  }
  let creation = {
    name: nameInput.value(),
    customization: {
      headChoice: headChoice,
      shirtChoice: shirtChoice,
      bottomChoice: bottomChoice
    },
    socials: {
      instagram: instaInput.value(),
      twitter: twitterInput.value()
    },
    timestamp: -int(Date.now()/1000)
  }
  characters.push(creation, () => {
    console.log("Saved character!");
    submitText.html("Created Character!")
  });
}

