function changeClothes(type, item) {
    let character = document.getElementById("character");

    let layerIds = {
        hairBack: "hair-back",
        person: "person",  // Even though it doesn't change, it should be recognized
        bottom: "clothing-bottom",
        top: "clothing-top",
        hairFront: "hair-front"
    };

    // Remove old clothing of the same type
    let existingItem = document.getElementById(layerIds[type]);
    if (existingItem) {
        character.removeChild(existingItem);
    }

    // Create new item
    let newItem = document.createElement("img");
    newItem.src = "assets/dressup/" + item;
    newItem.id = layerIds[type];
    newItem.classList.add("center", "center-fit");

    // Set correct layering order
    let zIndexMap = {
        hairBack: 0,   // Hair back - behind everything
        person: 1,       // Body - should be above hairBack
        bottom: 2,     // Pants/skirt - below the top
        top: 3,        // Shirt - above the bottom
        hairFront: 4   // Hair front - in front of everything
    };

    newItem.style.position = "absolute";  // Needed for z-index to work
    newItem.style.zIndex = zIndexMap[type];

    character.appendChild(newItem);
}

function initCharacter() {
    let character = document.getElementById("character");

    // Check if the body already exists (to prevent duplicates)
    if (!document.getElementById("person")) {
        let body = document.createElement("img");
        body.src = "assets/dressup/body.png";
        body.id = "person";  // Use the same ID as in zIndexMap
        body.classList.add("center-fit");
        body.style.position = "relative";
        body.style.zIndex = "1"; // Body should be above hairBack

        character.appendChild(body);
    }
}

window.onload = initCharacter;
const dialogLines = [
    "Welcome to the dress-up game!",
    "Click on the buttons to choose your outfit.",
    "Try out different styles and have fun!",
    "Looking great! What will you wear next?",
    "You're a fashion star!",
];

let currentLine = 0;
let typing = false;
let interval;

// Function to type text letter by letter
function printLetterByLetter(destination, message, speed, callback) {
    let i = 0;
    document.getElementById(destination).innerHTML = "";

    typing = true;
    interval = setInterval(function () {
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            typing = false;
            if (callback) callback();
        }
    }, speed);
}

// Function to show next line of dialog
function nextDialog() {
    if (typing) return;

    if (currentLine < dialogLines.length) {
        printLetterByLetter("msg", dialogLines[currentLine], 50);
        currentLine++;
    } else {
        document.getElementById("dialog-box").style.display = "none";
    }
}

// Start the dialog when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dialog-box").addEventListener("click", nextDialog);
    nextDialog();
});

