import { showScreen, screens } from "./ui.js";
import { showDialog } from "./dialog.js";
import { resetCharacter } from "./character.js";
import { calculateScore } from "./scoring-system.js";
import { showOptions, closeOptions } from "./ui.js";
/*** 🔹 DOM Elements ***/
const buttons = {
    start: document.getElementById("start-button"),
    options: document.getElementById("options-button"),
    nextDressup: document.getElementById("next-dressup-button"),
    nextStage: document.getElementById("next-stage-button"),
    closeOptions: document.getElementById("close-options")
};


export let currentLevel = 1;
const maxLevels = 3;


/*** 🔹 Function to Move to Stage Complete ***/
function finishDressup() {
    let score = calculateScore(selectedClothes, currentLevel);

    showScreen(screens.stageComplete);
    showScoreScreen(score);

    // Change button behavior based on score
    if (score < minScore) {
        buttons.nextStage.textContent = "Retry Level"; // Change button text
        buttons.nextStage.onclick = retryLevel; // Set to retry
    } else {
        buttons.nextStage.textContent = "Next Level"; // Change button text
        buttons.nextStage.onclick = nextStage; // Set to move forward
    }

    resetCharacter();
}
function retryLevel() {
    showDialog(currentLevel); // Restart the same level
    resetCharacter(); // Reset dress-up choices
}

/*** 🔹 Function to Start Next Level or Finish Game ***/
function nextStage() {
    if (currentLevel < maxLevels) {
        currentLevel++;
        showDialog(currentLevel);
    } else {
        alert("🎉 Congratulations! You finished the game!");
        currentLevel = 1;
        showScreen(screens.welcome);
    }
}

/*** 🔹 Event Listeners ***/
buttons.start.addEventListener("click", () => {
    playSound('background-music');
    addSparkles();
    showDialog(currentLevel);
});

buttons.options.addEventListener("click", () => { showOptions(); })
buttons.nextDressup.addEventListener("click", finishDressup);
buttons.closeOptions.addEventListener("click", closeOptions);


const addSparkles = function () {
    let maxCount = (Math.random() * 99) + 10;

    for (let i = 0; i < maxCount; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("particle");

        let main = document.getElementById('dialog-screen');
        main.appendChild(sparkle);

        randomProperties(sparkle);
    }
};

const randomProperties = function (particle) {
    const left = Math.floor(Math.random() * (99 - 1)) + 1;
    particle.style.setProperty('--left', left + '%');

    const top = Math.floor(Math.random() * (99 - 1)) + 1;
    particle.style.setProperty('--top', top + '%');

    const size = Math.floor(Math.random() * (6 - 2)) + 2;
    particle.style.setProperty('--size', size + 'px');
    particle.style.setProperty('--blur', (size * 4) + 'px');
    particle.style.setProperty('--spread', (size) + 'px');

    const opacity = Math.random() + 0.1;
    particle.style.setProperty('--opacity', opacity);

    const duration = Math.floor(Math.random() * (800 - 300)) + 300;
    particle.style.setProperty('--duration', duration + 'ms');

    const delay = Math.floor(Math.random() * (1000 - 200)) + 200;
    particle.style.setProperty('--delay', delay + 'ms');

    const iteration = Math.floor(Math.random() * (15 - 3)) + 4;
    particle.style.setProperty('--iteration', iteration);
};

const removeSparkles = function () {
    let sparkle = document.getElementsByClassName('particle');

    for (let i = 0; i < sparkle.length; i++) {
        sparkle[i].parentNode.removeChild(sparkle[i])
    }
};