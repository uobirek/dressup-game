import { showScreen, screens } from "./ui.js";
import { currentLevel } from "./main.js";
/*** 🔹 Dialog System ***/
let currentLine = 0;
let typing = false;
let interval;


const levelDialogs = {
    1: [
        { text: "Penelope has a problem and I do too!", imageId: 1 },
        { text: "She has a full closet but nothing to wear, so she summoned a fashion fairy. That's me.", imageId: 3 },
        { text: "But it's my first day at job and I have no idea what to do. Can you help me?", imageId: 2 },
        { text: "She's going to a coffee shop today with friends, so she needs to wear something casual but cute.", imageId: 1 },
        { text: "And no high heels, because after coffee they're planning on a long walk!", imageId: 3 },
        { text: "Come on! Let's help her!", imageId: 3 }
    ],
    2: [
        { text: "It's me again! You're the best, I'm learning so much from you.", imageId: 1 },
        { text: "This time Penelope has to study for an algebra exam.", imageId: 2 },
        { text: "Even trying to think about it makes my head explode!", imageId: 2 },
        { text: "She's going to stay at home and needs to be comfy.", imageId: 1 },
        { text: "So no shoes needed! But a comfy pair of socks would be perfect.", imageId: 1 }

    ],
    3: [
        { text: "Thank you soooo much for all the help!", imageId: 1 },
        { text: "This time let's do something fancy!", imageId: 3 },
        { text: "Penelope's going on a date! She needs to look cute.", imageId: 3, },
        { text: "It's the final outfit for today, so let's do something extra! Remember to prepare some gorgeous jewellery.", imageId: 3, },
        { text: "Let's do it!", imageId: 3, }


    ]
};

function getFairyImageById(imageId) {
    const imageMap = {
        1: "assets/fairy/dressup-fairy-default.png", // Default image
        2: "assets/fairy/dressup-fairy-sad.png",     // Sad image
        3: "assets/fairy/dressup-fairy-winky.png"    // Winky image
    };

    return imageMap[imageId] || imageMap[1]; // Default to the first image if no match
}

let levelThemeDiv = document.getElementById('level-theme');
const levelThemes = {
    1: "coffee & walk",
    2: "study session",
    3: "fancy date",
};
//const typingSound = new sound('assets/sounds/typing-sound.mp3');
function printLetterByLetter(destination, message, speed, callback) {
    let i = 0;
    document.getElementById(destination).innerHTML = "";
    typing = true;
    interval = setInterval(() => {
        document.getElementById(destination).innerHTML += message.charAt(i);
        // typingSound.play();  // Play typing sound on each letter
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

    // Update the image source
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
        // Get the current dialog object for the line
        const currentDialog = levelDialogs[level][currentLine];
        const imagePath = getFairyImageById(currentDialog.imageId);
        changeFairyImage(imagePath);
        // Print the dialog text
        printLetterByLetter("dialog-text", currentDialog.text, 3, () => {
            // After printing the dialog, change the fairy image based on the imageId

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


