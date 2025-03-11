import { showScreen, screens } from "./ui.js";
import { currentLevel } from "./main.js";
/*** 🔹 Dialog System ***/
let currentLine = 0;
let typing = false;
let interval;


const levelDialogs = {
    1: ["Welcome to level 1! Let's dress up!"],
    2: ["Nice work! Ready for level 2?", "Try mixing and matching different styles!", "Can you create a bold look?"],
    3: ["Final level! Make it stylish!", "Show off your best fashion sense!", "You're a fashion star!"]
};
let levelThemeDiv = document.getElementById('level-theme');
const levelThemes = {
    1: "casual coffe date",
    2: "pijama party",
    3: "fancy",
};

// Typing effect
function printLetterByLetter(destination, message, speed, callback) {
    let i = 0;
    document.getElementById(destination).innerHTML = "";
    typing = true;
    interval = setInterval(() => {
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            typing = false;
            if (callback) callback();
        }
    }, speed);
}



export function showDialog(level) {
    console.log("Starting dialog for level:", level);
    currentLine = 0;
    nextDialog(level);
    showScreen(screens.dialog);

    document.getElementById("dialog-box").onclick = () => nextDialog(level);
}



export function nextDialog(level) {
    console.log("nextDialog called with level:", level);

    if (!level || !levelDialogs[level]) {
        console.error(`❌ Error: No dialog found for level ${level}`);
        return;
    }

    if (typing) return;

    if (currentLine < levelDialogs[level].length) {
        printLetterByLetter("dialog-text", levelDialogs[level][currentLine], 50);
        currentLine++;
    } else {
        console.log("✅ Finished dialog, moving to dress-up game.");
        showScreen(screens.game);
        levelThemeDiv.textContent = levelThemes[currentLevel];
        generateClothingTabs();


    }
}


document.getElementById("dialog-box").addEventListener("click", () => nextDialog(currentLevel));


