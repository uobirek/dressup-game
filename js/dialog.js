import { showScreen, screens } from "./ui.js";
import { currentLevel } from "./main.js";
let currentLine = 0;
let typing = false;
let interval;


const levelDialogs = {
    1: [
        { text: "Penelope has a problem and I do too!", imageId: 1 },
        { text: "She has a closet full of clothes, but nothing to wear. So, she called on a fashion fairy. That's me!", imageId: 3 },
        { text: "But it's my first day on the job, and I have no idea what I'm doing. Can you help me out?", imageId: 2 },
        { text: "She's meeting friends at a coffee shop today, so she needs something cute but casual.", imageId: 1 },
        { text: "Oh, and no high heels! They’re planning a long walk after coffee.", imageId: 3 },
        { text: "Let's make sure she looks great! Ready to help?", imageId: 3 }
    ],
    2: [
        { text: "Hey, it's me again! You're the best, I'm learning so much from you.", imageId: 1 },
        { text: "This time, Penelope's got an algebra exam to study for.", imageId: 2 },
        { text: "Honestly, just thinking about it makes my head spin!", imageId: 2 },
        { text: "She'll be staying home, so we need to pick something comfy for her.", imageId: 1 },
        { text: "No shoes needed today, but a comfy pair of socks would be perfect!", imageId: 1 }

    ],
    3: [
        { text: "Thank you soooo much for all your help!", imageId: 1 },
        { text: "Now, let’s go for something fancy!", imageId: 3 },
        { text: "Penelope's going on a date tonight, and she wants to look amazing.", imageId: 3, },
        { text: "This is the final outfit of the day, so let's go all out! Don't forget some stunning jewelry.", imageId: 3, },
        { text: "Ready to make her shine?", imageId: 3, }


    ]
};

function getFairyImageById(imageId) {
    const imageMap = {
        1: "assets/fairy/dressup-fairy-default.png",
        2: "assets/fairy/dressup-fairy-sad.png",
        3: "assets/fairy/dressup-fairy-winky.png"
    };

    return imageMap[imageId] || imageMap[1];
}

let levelThemeDiv = document.getElementById('level-theme');
const levelThemes = {
    1: "coffee & walk",
    2: "study session",
    3: "fancy date",
};
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

const fairyImages = {
    1: "assets/fairy/dressup-fairy-default.png",
    2: "assets/fairy/dressup-fairy-sad.png",
    3: "assets/fairy/dressup-fairy-winky.png",
};

// Function to change the fairy image based on the current dialog line
function changeFairyImage(imagePath) {
    const fairyImage = document.getElementById("fairy").querySelector("img");

    fairyImage.src = imagePath;
}

export function nextDialog(level) {


    console.log("nextDialog called with level:", level);

    if (!level || !levelDialogs[level]) {
        console.error(`❌ Error: No dialog found for level ${level}`);
        return;
    }

    if (typing) return;

    if (currentLine < levelDialogs[level].length) {
        const currentDialog = levelDialogs[level][currentLine];
        const imagePath = getFairyImageById(currentDialog.imageId);
        changeFairyImage(imagePath);
        printLetterByLetter("dialog-text", currentDialog.text, 3, () => {

        });

        currentLine++;
    } else {
        console.log("✅ Finished dialog, moving to dress-up game.");
        showScreen(screens.game);
        levelThemeDiv.textContent = levelThemes[currentLevel];
        generateClothingTabs();
    }
}

document.getElementById("dialog-box").addEventListener("click", () => { playSound('button-click-sound'); nextDialog(currentLevel) });


