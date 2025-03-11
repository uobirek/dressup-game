import { showScreen, screens } from "./ui.js";
import { showDialog } from "./dialog.js";
import { resetCharacter } from "./character.js";
import { calculateScore } from "./scoring-system.js";
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
buttons.start.addEventListener("click", () => showDialog(currentLevel));


buttons.nextDressup.addEventListener("click", finishDressup);
