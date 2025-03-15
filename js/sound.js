// Function to play sound with toggle check
function playSound(soundId) {
    if (!localStorage.getItem("soundEnabled") || localStorage.getItem("soundEnabled") === "false") {
        return; // Stop function if sound is disabled
    }

    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
}

// Set audio volumes and prevent redundant variable declarations
document.addEventListener("DOMContentLoaded", function () {
    const soundToggle = document.getElementById("sound-toggle");
    const audioElements = document.querySelectorAll("audio");

    // Set initial volumes
    const volumeSettings = {
        "background-music": 0.2,
        "shiny-sound": 1.0, // Avoiding 1.4 as it's beyond normal volume range
        "click-sound": 0.7
    };

    audioElements.forEach(audio => {
        if (volumeSettings[audio.id] !== undefined) {
            audio.volume = volumeSettings[audio.id];
        }
    });

    // Load stored preference
    const soundEnabled = localStorage.getItem("soundEnabled") === "true";
    soundToggle.checked = soundEnabled;
    updateSoundState(soundEnabled);

    // Toggle event listener
    soundToggle.addEventListener("change", function () {
        localStorage.setItem("soundEnabled", soundToggle.checked);
        updateSoundState(soundToggle.checked);
    });

    function updateSoundState(enabled) {
        audioElements.forEach(audio => {
            audio.muted = !enabled;
        });
    }
});
