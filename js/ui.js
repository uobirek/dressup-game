/*** 🔹 UI FUNCTIONS ***/

// Object storing screen elements
export const screens = {
    welcome: document.getElementById("welcome-screen"),
    dialog: document.getElementById("dialog-screen"),
    game: document.getElementById("game-screen"),
    stageComplete: document.getElementById("stage-complete-screen"),
    options: document.getElementById("options-modal"),
};

// Function to switch screens
function showScreen(screen) {
    Object.values(screens).forEach(s => (s.style.display = "none"));
    screen.style.display = "block";
}

// Dark Mode Toggle Button
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Check if dark mode is enabled from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true; // If dark mode is enabled, make the checkbox checked
} else {
    darkModeToggle.checked = false; // If dark mode is disabled, ensure the checkbox is unchecked
}

// Event Listener for toggle change
darkModeToggle.addEventListener("change", () => {
    // Toggle the dark-mode class based on the checkbox state
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);

    // Save the user preference in localStorage (enabled or disabled)
    localStorage.setItem("darkMode", darkModeToggle.checked ? "enabled" : "disabled");
});


function showOptions() {
    screens.options.style.display = "block";
}
function closeOptions() {
    screens.options.style.display = "none";
}

export { showScreen, showOptions, closeOptions };
