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

    if (!item) return;

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
}

function initCharacter() {
    let character = document.getElementById("character");

    if (!document.getElementById("person")) {
        let body = document.createElement("img");
        body.src = "assets/dressup/body.png";
        body.id = "person";
        body.classList.add("center-fit");
        body.style.position = "relative";
        body.style.zIndex = "1";

        character.appendChild(body);
    }
}

window.onload = initCharacter;
