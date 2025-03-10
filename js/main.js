import { showScreen, screens } from "./ui.js";
import { showDialog, nextDialog } from "./dialog.js";
import { resetCharacter } from "./character.js";
import { backgroundSound } from "./sounds.js";

/*** 🔹 DOM Elements ***/
const buttons = {
    start: document.getElementById("start-button"),
    options: document.getElementById("options-button"),
    nextDressup: document.getElementById("next-dressup-button"),
    nextStage: document.getElementById("next-stage-button"),
};

export let currentLevel = 1;
const maxLevels = 3;

/*** 🔹 Function to Move to Stage Complete ***/
function finishDressup() {
    showScreen(screens.stageComplete);
    resetCharacter();
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
buttons.start.addEventListener("click", () => showDialog(currentLevel));
buttons.nextStage.addEventListener("click", () => {
    if (currentLevel < maxLevels) {
        currentLevel++;
        showDialog(currentLevel);
    } else {
        alert("🎉 Congratulations! You finished the game!");
        currentLevel = 1;
        showScreen(screens.welcome);
    }
});

buttons.nextDressup.addEventListener("click", finishDressup);
buttons.nextStage.addEventListener("click", nextStage);
