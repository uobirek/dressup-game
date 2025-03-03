// Define the sound class
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function () {
        this.sound.play();
    }

    this.stop = function () {
        this.sound.pause();
    }

    this.loop = function () {
        this.sound.loop = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const optionsButton = document.getElementById("options-button");
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameScreen = document.getElementById("game-screen");
    const optionsModal = document.getElementById("options-modal");
    const closeModal = document.querySelector(".close");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const soundToggle = document.getElementById("sound-toggle");

    // Initialize background sound using the custom sound class
    let backgroundSound = new sound('sounds/background.mp3');
    backgroundSound.loop(); // Set it to loop

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
    }

    // Start button functionality - ask for user interaction to play music
    startButton.addEventListener("click", () => {

        welcomeScreen.style.display = "none";
        gameScreen.style.display = "block";
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
            localStorage.setItem("darkMode", "enabled"); // Save preference
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled"); // Save preference
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
