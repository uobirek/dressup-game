let selectedClothes = {};

function changeClothes(type, item) {
    let character = document.getElementById("character");

    let layerIds = {
        hairBack: "hair-back",
        person: "person",
        socks: "socks",
        shoes: "shoes",
        bottom: "bottom",
        top: "top",
        hairFront: "hair-front",
        accessory: "accessory"
    };

    if (!layerIds[type]) {
        console.error(`Unknown clothing type: ${type}`);
        return;
    }

    let existingItem = document.getElementById(layerIds[type]);
    if (existingItem) {
        existingItem.remove();
    }

    if (!item) {
        delete selectedClothes[type];
        return;
    }

    let newItem = document.createElement("img");
    newItem.src = `assets/dressup/${item}`;
    newItem.id = layerIds[type];
    newItem.classList.add("center", "center-fit");

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

    selectedClothes[type] = item;
}

function initCharacter() {
    let character = document.getElementById("character");

    Object.values(document.querySelectorAll("#character img")).forEach(img => {
        if (img.id !== "person") img.remove();
    });

    if (!document.getElementById("person")) {
        let body = document.createElement("img");
        body.src = "assets/dressup/body.png";
        body.id = "person";
        body.classList.add("center-fit");
        body.style.position = "relative";
        body.style.zIndex = "1";

        character.appendChild(body);
    }

    // Add default hair
    if (!document.getElementById("hair-back")) {
        console.log("no hair")
        let hairBack = document.createElement("img");
        hairBack.src = "assets/dressup/hairBack_3.png";
        hairBack.id = "hair-back";
        hairBack.classList.add("center", "center-fit");
        hairBack.style.position = "absolute";
        hairBack.style.zIndex = 0;

        character.appendChild(hairBack);
    } else {
        console.log("hair");
    }

    if (!document.getElementById("hair-front")) {
        let hairFront = document.createElement("img");
        hairFront.src = "assets/dressup/hairFront_1.png";
        hairFront.id = "hair-front";
        hairFront.classList.add("center", "center-fit");
        hairFront.style.position = "absolute";
        hairFront.style.zIndex = 6;

        character.appendChild(hairFront);
    }

    selectedClothes = {};
}

window.onload = initCharacter;



