function changeClothes(type, item) {
    let character = document.getElementById("character");

    let layerIds = {
        hairBack: "hair-back",
        person: "person",  // Even though it doesn't change, it should be recognized
        bottom: "clothing-bottom",
        top: "clothing-top",
        hairFront: "hair-front"
    };

    // Remove old clothing of the same type
    let existingItem = document.getElementById(layerIds[type]);
    if (existingItem) {
        character.removeChild(existingItem);
    }

    // Create new item
    let newItem = document.createElement("img");
    newItem.src = "assets/dressup/" + item;
    newItem.id = layerIds[type];
    newItem.classList.add("center", "center-fit");

    // Set correct layering order
    let zIndexMap = {
        hairBack: 0,   // Hair back - behind everything
        person: 1,       // Body - should be above hairBack
        bottom: 2,     // Pants/skirt - below the top
        top: 3,        // Shirt - above the bottom
        hairFront: 4   // Hair front - in front of everything
    };

    newItem.style.position = "absolute";  // Needed for z-index to work
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
