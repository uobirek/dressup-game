const clothingOptions = {
    top: 7,
    bottom: 4,
    shoes: 3,
    socks: 3,
    hairBack: 3,
    hairFront: 2,
    accessory: 5,
};

function generateClothingButtons() {
    const menu = document.querySelector(".clothes-menu");

    for (const category in clothingOptions) {
        let count = clothingOptions[category];

        let sectionHeader = document.createElement("h3");
        sectionHeader.textContent = `Choose ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        let section = document.createElement("div");
        section.classList.add("clothing-category");
        section.appendChild(sectionHeader);

        for (let i = 1; i <= count; i++) {
            let button = document.createElement("button");

            let previewImg = document.createElement("img");
            previewImg.src = `assets/dressup/${category}_${i}.png`;

            previewImg.classList.add("clothing-preview", category);

            let previewDiv = document.createElement("div");
            previewDiv.appendChild(previewImg);

            button.appendChild(previewDiv);
            button.onclick = () => changeClothes(category, `${category}_${i}.png`);

            section.appendChild(button);
        }

        let removeButton = document.createElement("button");
        removeButton.textContent = `Remove ${category}`;
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => changeClothes(category, "");
        section.appendChild(removeButton);

        menu.appendChild(section);
    }
}

document.addEventListener("DOMContentLoaded", generateClothingButtons);
