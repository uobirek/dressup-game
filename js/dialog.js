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

function nextDialog() {
    if (typing) return;

    if (currentLine < dialogLines.length) {
        printLetterByLetter("msg", dialogLines[currentLine], 50);
        currentLine++;
    } else {
        document.getElementById("dialog-box").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dialog-box").addEventListener("click", nextDialog);
    nextDialog();
});
