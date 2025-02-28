function changeClothes(type, item) {
    let character = document.getElementById("character");

    let layerIds = {
        hairBack: "hair-back",
        person: "person",
        socks: "clothing-socks",
        shoes: "clothing-shoes",
        bottom: "clothing-bottom",
        top: "clothing-top",
        hairFront: "hair-front",
        accessory: "accessory"
    };

    // Check if this clothing type exists in the layerIds map
    if (!layerIds[type]) {
        console.error(`Unknown clothing type: ${type}`);
        return;
    }

    // Remove old clothing of the same type
    let existingItem = document.getElementById(layerIds[type]);
    if (existingItem) {
        existingItem.remove();
    }

    // If the item is empty (""), we only remove and stop here
    if (!item) return;

    // Create new clothing item
    let newItem = document.createElement("img");
    newItem.src = `assets/dressup/${item}`;
    newItem.id = layerIds[type];
    newItem.classList.add("center", "center-fit");

    // Set correct layering order
    let zIndexMap = {
        hairBack: 0,
        person: 1,
        socks: 2,
        shoes: 3,
        bottom: 4,
        top: 5,
        hairFront: 6,
        accessory: 7
    };

    newItem.style.position = "absolute";
    newItem.style.zIndex = zIndexMap[type];

    character.appendChild(newItem);
}

function initCharacter() {
    let character = document.getElementById("character");

    // Check if the body already exists (to prevent duplicates)
    if (!document.getElementById("person")) {
        let body = document.createElement("img");
        body.src = "assets/dressup/body.png";
        body.id = "person";  // Use the same ID as in zIndexMap
        body.classList.add("center-fit");
        body.style.position = "relative";
        body.style.zIndex = "1"; // Body should be above hairBack

        character.appendChild(body);
    }
}

window.onload = initCharacter;
const dialogLines = [
    "Welcome to the dress-up game!",
    "Click on the buttons to choose your outfit.",
    "Try out different styles and have fun!",
    "Looking great! What will you wear next?",
    "You're a fashion star!",
];

let currentLine = 0;
let typing = false;
let interval;

// Function to type text letter by letter
function printLetterByLetter(destination, message, speed, callback) {
    let i = 0;
    document.getElementById(destination).innerHTML = "";

    typing = true;
    interval = setInterval(function () {
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            typing = false;
            if (callback) callback();
        }
    }, speed);
}

// Function to show next line of dialog
function nextDialog() {
    if (typing) return;

    if (currentLine < dialogLines.length) {
        printLetterByLetter("msg", dialogLines[currentLine], 50);
        currentLine++;
    } else {
        document.getElementById("dialog-box").style.display = "none";
    }
}

// Start the dialog when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dialog-box").addEventListener("click", nextDialog);
    nextDialog();
});


// Define clothing options with their ranges
const clothingOptions = {
    top: 7,
    bottom: 4,
    shoes: 3,
    socks: 3,
    hairBack: 3,
    hairFront: 2,
    accessory: 5,
};
// Function to dynamically generate clothing buttons
function generateClothingButtons() {
    const menu = document.querySelector(".clothes-menu"); // Select the menu container

    for (const category in clothingOptions) {
        let count = clothingOptions[category];

        // Create section header
        let sectionHeader = document.createElement("h3");
        sectionHeader.textContent = `Choose ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        let section = document.createElement("div");
        section.classList.add("clothing-category");
        section.appendChild(sectionHeader);

        // Generate buttons dynamically
        for (let i = 1; i <= count; i++) {
            let button = document.createElement("button");

            // Create the preview image element
            let previewImg = document.createElement("img");
            previewImg.src = `assets/dressup/${category}_${i}.png`; // Set the correct source path



            if (category === "top" || category === "hairBack" || category === "hairFront" || category === "accessory") {
                previewImg.classList.add("clothing-preview", category);
            } else if (category === "shoes" || category === "socks") {
                previewImg.classList.add("clothing-preview", category);
            } else {
                previewImg.classList.add("clothing-preview");  // Normal preview for other categories

            }

            // Create a new div to hold the image
            let previewDiv = document.createElement("div");
            previewDiv.appendChild(previewImg);

            // Append the preview image to the button
            button.appendChild(previewDiv);
            button.onclick = () => changeClothes(category, `${category}_${i}.png`);

            // Add the button to the menu
            section.appendChild(button);
        }
        // Create "Remove" button
        let removeButton = document.createElement("button");
        removeButton.textContent = `Remove ${category}`;
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => changeClothes(category, ""); // Empty string to remove item
        section.appendChild(removeButton);

        // Add section to the menu
        menu.appendChild(section);
    }
}


// Call function when page loads
document.addEventListener("DOMContentLoaded", generateClothingButtons);
