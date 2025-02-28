document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameScreen = document.getElementById("game-screen");

    startButton.addEventListener("click", () => {
        welcomeScreen.style.display = "none"; // Hide welcome screen
        gameScreen.style.display = "block";   // Show game
    });
});
