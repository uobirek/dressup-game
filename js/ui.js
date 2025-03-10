/*** 🔹 UI FUNCTIONS ***/

// Object storing screen elements
export const screens = {
    welcome: document.getElementById("welcome-screen"),
    dialog: document.getElementById("dialog-screen"),
    game: document.getElementById("game-screen"),
    stageComplete: document.getElementById("stage-complete-screen"),
};

// Function to switch screens
function showScreen(screen) {
    Object.values(screens).forEach(s => (s.style.display = "none"));
    screen.style.display = "block";
}

// Dark Mode Handling
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

export { showScreen };
