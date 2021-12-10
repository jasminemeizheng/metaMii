var verse
var database
var characterRef

CANV_WIDTH = 800
CANV_HEIGHT = CANV_WIDTH
NUM_CHARS_TO_DISPLAY = 500

const NUM_HEADS = NUM_SHIRTS = NUM_BOTTOMS = 10;
var heads = [];
var shirts = [];
var bottoms = []; 

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
}

function setup() {
    canvas = createCanvas(CANV_WIDTH, CANV_HEIGHT);
    canvas.parent('canvascontainer')

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
    console.log(app)
    
    database = firebase.database()
    characters = database.ref('scrapedCharacters')

    verse = new Verse(CANV_WIDTH, CANV_HEIGHT)
        
    verse.drawAllTiles()

    characters.orderByChild("timestamp").limitToFirst(NUM_CHARS_TO_DISPLAY).on('child_added', function(childSnapshot, prevChildKey) {
        newChar = new Character(childSnapshot.val(), heads, shirts, bottoms);
        verse.addCharacter(newChar)
        console.log("Got " + newChar.name + "'s character!")
    });
}

function draw() {
    verse.update()
}