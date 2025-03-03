function generateClothingTabs() {
    const menu = document.querySelector(".clothes-menu");

    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab-container");

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("tab-content-container");

    Object.keys(clothingOptions).forEach((category, index) => {
        let tabButton = document.createElement("button");
        tabButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        tabButton.classList.add("tab-button");
        if (index === 0) tabButton.classList.add("active");
        tabButton.onclick = () => showTab(category);

        tabContainer.appendChild(tabButton);

        let section = document.createElement("div");
        section.classList.add("tab-content");
        section.id = `tab-${category}`;
        if (index !== 0) section.style.display = "none";

        for (let i = 1; i <= clothingOptions[category]; i++) {
            let button = createClothingButton(category, i);
            section.appendChild(button);
        }

        let removeButton = document.createElement("button");
        removeButton.textContent = `Remove ${category}`;
        removeButton.classList.add("remove-button");
        removeButton.onclick = () => changeClothes(category, "");
        section.appendChild(removeButton);

        contentContainer.appendChild(section);
    });

    menu.appendChild(tabContainer);
    menu.appendChild(contentContainer);
}

function createClothingButton(category, index) {
    let button = document.createElement("button");

    let previewImg = document.createElement("img");
    previewImg.src = `assets/dressup/${category}_${index}.png`;
    previewImg.classList.add("clothing-preview", category);

    let previewDiv = document.createElement("div");
    previewDiv.appendChild(previewImg);

    button.appendChild(previewDiv);
    makeDraggable(previewDiv, category, `${category}_${index}.png`);

    return button;
}

function resetTab(category) {
    let section = document.getElementById(`tab-${category}`);
    if (!section) return;

    section.querySelectorAll("button:not(.remove-button)").forEach(button => button.remove());

    for (let i = 1; i <= clothingOptions[category]; i++) {
        let button = createClothingButton(category, i);
        section.insertBefore(button, section.querySelector(".remove-button"));
    }
}
