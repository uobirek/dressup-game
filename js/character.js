/*** 🔹 Character Handling ***/
export { resetCharacter };

function resetCharacter() {
    let character = document.getElementById("character");

    Object.values(document.querySelectorAll("#character img")).forEach(img => {
        if (!["person", "hair-back", "hair-front"].includes(img.id)) img.remove();
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

    if (!document.getElementById("hair-back")) {
        let hairBack = document.createElement("img");
        hairBack.src = "assets/dressup/hairBack_3.png";
        hairBack.id = "hair-back";
        hairBack.classList.add("center", "center-fit");
        hairBack.style.position = "absolute";
        hairBack.style.zIndex = 0;
        character.appendChild(hairBack);
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

