

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const optionsButton = document.getElementById("options-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameScreen = document.getElementById("game-screen");
    const optionsModal = document.getElementById("options-modal");
    const closeModal = document.querySelector(".close");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const soundToggle = document.getElementById("sound-toggle");

    let backgroundSound = new sound('sounds/background.mp3');
    backgroundSound.loop();
    backgroundSound.sound.volume = 0.2;

    // Load sound setting from localStorage
    if (localStorage.getItem("sound") === "off") {
        soundToggle.checked = false;
        backgroundSound.stop(); // Pause music if sound is off
    } else {
        soundToggle.checked = true;
        backgroundSound.play();
    }

    // Load Dark Mode preference from localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    } else darkModeToggle.checked = false;

    // Start button functionality - ask for user interaction to play music
    startButton.addEventListener("click", () => {

        welcomeScreen.style.display = "none";
        gameScreen.style.display = "block";
        generateClothingTabs();
    });

    // Show options modal
    optionsButton.addEventListener("click", () => {
        optionsModal.style.display = "block";
    });

    // Close modal when clicking "X"
    closeModal.addEventListener("click", () => {
        optionsModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === optionsModal) {
            optionsModal.style.display = "none";
        }
    });

    // Toggle Dark Mode
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Toggle Sound
    soundToggle.addEventListener("change", () => {
        if (soundToggle.checked) {
            localStorage.setItem("sound", "on");
            backgroundSound.play().catch((error) => {
                console.error("Autoplay blocked:", error);
            });
        } else {
            localStorage.setItem("sound", "off");
            backgroundSound.stop();
        }
    });
});
