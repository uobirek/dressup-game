document.addEventListener("DOMContentLoaded", () => {
    /*** 🔹 DOM Elements ***/
    const screens = {
        welcome: document.getElementById("welcome-screen"),
        dialog: document.getElementById("dialog-screen"),
        game: document.getElementById("game-screen"),
        stageComplete: document.getElementById("stage-complete-screen"),
    };

    const buttons = {
        start: document.getElementById("start-button"),
        options: document.getElementById("options-button"),
        nextDialog: document.getElementById("next-dialog-button"),
        nextDressup: document.getElementById("next-dressup-button"),
        nextStage: document.getElementById("next-stage-button"),
    };

    const optionsModal = document.getElementById("options-modal");
    const closeModal = document.querySelector(".close");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const soundToggle = document.getElementById("sound-toggle");
    const dialogText = document.getElementById("dialog-text");

    /*** 🔹 Game Variables ***/
    let currentLevel = 1;
    const maxLevels = 3;

    /*** 🔹 Level-specific Dialog Lines ***/
    const levelDialogs = {
        1: [
            "Welcome to level 1! Let's dress up!"
        ],
        2: [
            "Nice work! Ready for level 2?",
            "Try mixing and matching different styles!",
            "Can you create a bold look?"
        ],
        3: [
            "Final level! Make it stylish!",
            "Show off your best fashion sense!",
            "You're a fashion star!"
        ]
    };

    let currentLine = 0;
    let typing = false;
    let interval;

    /*** 🔹 Sound Handling ***/
    let backgroundSound = new sound("sounds/background.mp3");
    backgroundSound.loop();
    backgroundSound.sound.volume = 0.2;

    // Load sound setting from localStorage
    if (localStorage.getItem("sound") === "off") {
        soundToggle.checked = false;
        backgroundSound.stop();
    } else {
        soundToggle.checked = true;
        backgroundSound.play();
    }

    /*** 🔹 Dark Mode Handling ***/
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    } else {
        darkModeToggle.checked = false;
    }

    /*** 🔹 Function to Switch Screens ***/
    function showScreen(screen) {
        Object.values(screens).forEach(s => (s.style.display = "none"));
        screen.style.display = "block";
    }

    /*** 🔹 Function to Start Dialog ***/
    document.getElementById("dialog-box").addEventListener("click", nextDialog);
    function showDialog() {
        currentLine = 0;
        nextDialog(); // Start first dialog line
        showScreen(screens.dialog);
    }

    /*** 🔹 Function for Letter-by-Letter Typing Effect ***/
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

    function nextDialog() {
        if (typing) return;

        if (currentLine < levelDialogs[currentLevel].length) {
            printLetterByLetter("dialog-text", levelDialogs[currentLevel][currentLine], 50);
            currentLine++;
        } else {
            showScreen(screens.game);
            generateClothingTabs();
        }
    }

    /*** 🔹 Function to Reset Character Before New Level ***/
    function resetCharacter() {
        let character = document.getElementById("character");
        Object.values(document.querySelectorAll("#character img")).forEach(img => {
            if (img.id !== "person") img.remove(); // Keep body, remove clothes
        });
    }

    /*** 🔹 Function to Move to Stage Complete ***/
    function finishDressup() {
        showScreen(screens.stageComplete);
        resetCharacter();
    }

    /*** 🔹 Function to Start Next Level or Finish Game ***/
    function nextStage() {
        if (currentLevel < maxLevels) {
            currentLevel++;
            showDialog();
        } else {
            alert("🎉 Congratulations! You finished the game!");
            currentLevel = 1;
            showScreen(screens.welcome);
        }
    }

    /*** 🔹 Event Listeners ***/
    buttons.start.addEventListener("click", showDialog);
    // buttons.nextDialog.addEventListener("click", nextDialog);
    buttons.nextDressup.addEventListener("click", finishDressup);
    buttons.nextStage.addEventListener("click", nextStage);

    // Options Modal Handling
    buttons.options.addEventListener("click", () => (optionsModal.style.display = "block"));
    closeModal.addEventListener("click", () => (optionsModal.style.display = "none"));
    window.addEventListener("click", (event) => {
        if (event.target === optionsModal) optionsModal.style.display = "none";
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", darkModeToggle.checked);
        localStorage.setItem("darkMode", darkModeToggle.checked ? "enabled" : "disabled");
    });

    // Sound Toggle
    soundToggle.addEventListener("change", () => {
        if (soundToggle.checked) {
            localStorage.setItem("sound", "on");
            backgroundSound.play().catch(err => console.error("Autoplay blocked:", err));
        } else {
            localStorage.setItem("sound", "off");
            backgroundSound.stop();
        }
    });
});
