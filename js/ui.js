/*** 🔹 UI FUNCTIONS ***/

export const screens = {
    welcome: document.getElementById("welcome-screen"),
    dialog: document.getElementById("dialog-screen"),
    game: document.getElementById("game-screen"),
    stageComplete: document.getElementById("stage-complete-screen"),
    options: document.getElementById("options-modal"),
};

function showScreen(screen) {
    Object.values(screens).forEach(s => (s.style.display = "none"));
    screen.style.display = "block";
}

const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
} else {
    darkModeToggle.checked = false;
}

darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);

    localStorage.setItem("darkMode", darkModeToggle.checked ? "enabled" : "disabled");
});


function showOptions() {
    screens.options.style.display = "block";
}
function closeOptions() {
    screens.options.style.display = "none";
}

export { showScreen, showOptions, closeOptions };
